<!-- CORE: agnostic -->
---
name: start
description: Orchestrate the implementation of an approved issue end-to-end — branch, plan-review, implement, code-review, verify, push. Use when the user says "start #N", "let's implement #N", or when the analyze plan has been approved.
---

# start

The orchestrator. Runs other skills in sequence, never skips a step.

## Preconditions

- The issue must have **either** a `status: ready` label **or** an
  `effort/E0`–`effort/E3` label applied. If both are absent the issue
  has not been triaged. Refuse and tell the human:

  > This issue has not been triaged. Run `/analyze #N` first to
  > classify effort and post a plan; then re-run `/start #N`.

  Rationale: skipping `/analyze` means there is no plan to review,
  which makes `code-review (plan)` operate on nothing and breaks the
  audit trail.
- The issue has an **approved plan** comment. Approval signal: a thumbs-up
  reaction from the issue owner, or a comment containing the literal word
  `approved` from a maintainer.
- The working tree is clean (`git status` empty).
- The default branch is `develop`. Pull latest before branching.

If any precondition fails, **stop** and tell the human exactly which one.

## Steps

1. **Move issue to In Progress.** Apply `status: in progress` and remove
   `status: ready`. If the repo variable `PROJECT_NUMBER` is set, also
   invoke the sidecar to mirror the move onto the Project v2 board:

   ```bash
   OWNER=$(gh repo view --json owner -q .owner.login)
   NUMBER=$(gh variable get PROJECT_NUMBER 2>/dev/null || echo "")
   if [ -n "$NUMBER" ]; then
     OWNER="$OWNER" NUMBER="$NUMBER" \
     REPO="$(gh repo view --json nameWithOwner -q .nameWithOwner)" \
     ISSUE="<this-issue-number>" STATUS="In Progress" \
       bash .github/scripts/project-status-set.sh
   fi
   ```

   `project-status.yml` does **not** handle this transition — it runs on
   PR events, and at this point in the flow there is no PR yet. The
   workflow takes over for `In Review` (PR open) and `Done` (PR merged).
   Label names are exact — see `AGENTS.md` → `Required labels`.
2. **Branch** from `origin/develop`:
   - Type prefix from the issue's `type/*` label (or asked, if absent):
     one of `feat`, `fix`, `docs`, `refactor`, `chore`, `test`.
   - Slug: kebab-case of the issue title, max 6 words.
   - Branch name: `<type>/<issue>-<slug>`.
3. **Plan review** — invoke `code-review` in `plan` mode against the
   approved plan. If `REQUEST CHANGES`, post the review on the issue, stop.
4. **Implement** — write code in logical commits. Each commit:
   - is Conventional (`<type>(<scope>): <subject>`),
   - keeps the tree green (lint + typecheck pass),
   - is small enough to review on its own.
5. **Code review** — invoke `code-review` in `code` mode. If
   `REQUEST CHANGES`, fix in new commits and re-run. Do not amend reviewed
   commits.
6. **Sync check** — if any of `CLAUDE.md`, `AGENTS.md`, or
   `.github/workflows/` changed, run `verify-sync`. If it fails, stop.
7. **Rebase** onto `origin/develop`. Resolve any conflicts in the PR
   description, not silently.
8. **Push** the branch. The `auto-pr.yml` workflow opens the PR.

## Post-push

- Confirm the PR was opened (poll `gh pr view <branch>` for up to 30s).
- Confirm `project-status.yml` moved the issue to In Review.
- Watch CI; if a check fails, fix it before tagging a reviewer.

## Hard rules

- Never push to `develop` or `main` directly.
- Never use `--force` or `--no-verify`.
- Never skip `code-review (plan)` — even for E0 changes inside `start`.
- If `start` is invoked on an issue without an approved plan, refuse and
  point the human at `analyze`.
