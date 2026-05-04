<!-- CORE: agnostic -->
---
name: analyze
description: Triage a GitHub issue, classify it E0–E3, and post a sized plan as a comment. Use when the user says "analyze #N", "triage this issue", or pastes an issue URL and asks how to approach it.
---

# analyze

Read the issue, decide effort, post a plan. Do **not** create branches or
write code.

## Inputs

- Issue number or URL (required).
- Repo context: `CLAUDE.md`, `AGENTS.md`, recent commits if relevant.

## Output (one issue comment)

1. **Restatement** — one sentence in your own words.
2. **Effort** — `E0`, `E1`, `E2`, or `E3`, with a one-line reason.
3. **Plan** — sized per effort, see below.
4. **Open questions** — bullets, if any. Empty section if none.

Apply two labels:

- `effort/E0`, `effort/E1`, `effort/E2`, or `effort/E3` (one of).
- `status: ready` — signals "plan posted, awaiting human approval".

Both names must match exactly; the setup creates them verbatim.

If the repo variable `PROJECT_NUMBER` is set, also mirror the move onto
the Project v2 board:

```bash
OWNER=$(gh repo view --json owner -q .owner.login)
NUMBER=$(gh variable get PROJECT_NUMBER 2>/dev/null || echo "")
if [ -n "$NUMBER" ]; then
  OWNER="$OWNER" NUMBER="$NUMBER" \
  REPO="$(gh repo view --json nameWithOwner -q .nameWithOwner)" \
  ISSUE="<this-issue-number>" STATUS="Ready" \
    bash .github/scripts/project-status-set.sh
fi
```

`project-status.yml` only mirrors `In Review` and `Done` — it runs on PR
events, which don't exist yet at `analyze` time.

## Effort classification

| Level | Trigger                                                                            | Plan shape                                                                                          |
| ----- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| E0    | Typo, single-line fix, doc tweak, label rename, copy change.                       | No plan. One-paragraph guidance.                                                                    |
| E1    | Single file or two tightly coupled files. Clear, isolated.                         | ≤5 bullets: what, where, test.                                                                      |
| E2    | Multi-file within one domain. New endpoint, new component, refactor of one module. | Standard plan: goal, files, approach, test plan, rollback.                                          |
| E3    | Touches a domain in `data migrations / schema changes, public API surface, cross-cutting infrastructure (i18n, logging, error handling), routing / URL structure, architectural refactors (build system, framework upgrades), dependency changes (new packages, major version bumps), secrets / credentials`. Or: cross-cutting, public-API, data shape.   | Full plan + **Business impact** section + explicit risks + verification steps + rollback procedure. |

When unsure between two levels, pick the higher one.

### Keyword booster (soft signal)

When the issue title or body contains any of the following, lean toward
the higher level when in doubt:

- `breaking`, `breaking change`
- `security`, `vulnerability`, `CVE`
- `migration`, `migrate`
- `production data`, `prod data`
- `auth`, `authentication`, `authorization`
- `rollback`, `revert`

This is a **booster**, not a hard trigger — it pairs with the existing
"when unsure between two levels, pick the higher one" rule. It catches
issues where the diff is small but the context is risky.

## How to read the issue

- Title and body first.
- Linked issues / referenced PRs.
- Files mentioned by path or symbol — open and skim.
- Existing tests near those files — they tell you the shape of the seam.
- Comments thread — past decisions live there.

## Plan templates

### E1

```
**Plan**
- Change: <one sentence>
- File(s): <paths>
- Test: <how this gets verified>
```

### E2

```
**Plan**
- Goal: <outcome>
- Files: <paths>
- Approach: <2–4 bullets on the strategy>
- Test plan: <unit + any integration>
- Rollback: <how to undo if it goes wrong>
```

### E3

```
**Plan**
- Goal: <outcome>
- Business impact: <who/what is affected, severity, blast radius>
- Files: <paths>
- Approach: <ordered bullets>
- Risks: <bullets>
- Test plan: <unit, integration, manual checks>
- Rollback: <step-by-step>
- Verification post-deploy: <metrics, dashboards, log queries>
```

## Hard rules

- No branches. No code edits. No PRs. Only an issue comment + label.
- If the issue is unclear, ask in **Open questions** — do not invent the spec.
- If the change touches anything in `data migrations / schema changes, public API surface, cross-cutting infrastructure (i18n, logging, error handling), routing / URL structure, architectural refactors (build system, framework upgrades), dependency changes (new packages, major version bumps), secrets / credentials`, the level is E3 — even
  if the diff would be small.
