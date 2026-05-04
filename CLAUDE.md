<!-- ADAPTER: claude -->
# frontendlab — Operating Guide

This file is the entry point for Claude Code in this repository. Keep it short
and current; deep detail belongs in the linked skills and in
[AGENTS.md](AGENTS.md).

## What this project is

- **Domain:** Frontendlab is a learning, research, and journaling space for modern
frontend development. It functions as both a lab and a public journal:
validating ideas, documenting processes, and sharing knowledge around
accessibility, internationalization, design systems, and reusable
components, scalable patterns, and robust workflows.
- **Stack:** Next.js 15 (App Router) + React 19 + TypeScript 5 on Node 22
- **Code language:** en
- **UI / user-facing language:** en, es, pt
- **Hosting / runtime:** Vercel
- **Data layer:** MongoDB

## Workflow at a glance

Issue → `analyze` → human-approved plan → `start` → `code-review (plan)` →
implement → `code-review (code)` → `verify-sync` → push → PR → merge to
`develop` → release PR to `main`.

Branching:

- `main` — production. Protected. Only release PRs from `develop` land here.
- `develop` — integration. Default branch. PRs from feature branches land here.
- Feature branches: `feat/<issue>-slug`, `fix/<issue>-slug`, `docs/<issue>-slug`,
  `refactor/<issue>-slug`, `chore/<issue>-slug`, `test/<issue>-slug`.

Commits: [Conventional Commits](https://www.conventionalcommits.org/).

> **Enforcement gap**: this template does not run commitlint or any
> hard pre-commit check. Conventional Commits is honored by author
> discipline plus human PR review. The only automated enforcement is
> `validate-release-pr.yml` (rejects closing keywords on develop → main
> PRs) and the regex-based filter in `generate-changelog.yml` (commits
> not matching `^(feat|fix|...): ` are silently dropped from the
> changelog). Authors writing `wip` or `update` commits will produce
> empty changelog entries.

## Skill index

Invoke these via natural language; the harness routes by description.

| Skill                                          | When to use                                              |
| ---------------------------------------------- | -------------------------------------------------------- |
| [analyze](.claude/skills/analyze.md)           | Triage an issue, classify E0–E3, post a plan.            |
| [start](.claude/skills/start.md)               | Begin implementation after plan approval.                |
| [code-review](.claude/skills/code-review.md)   | Review plan (pre-impl) or code (pre-merge).              |
| [deploy-pipeline](.claude/skills/deploy-pipeline.md) | Pre-deploy checklist for this stack.                     |
| [changelog-reporter](.claude/skills/changelog-reporter.md) | Append a date-based changelog entry on merge to develop. |
| [verify-sync](.claude/skills/verify-sync.md)   | Verify CLAUDE.md / AGENTS.md ↔ workflows are in sync.    |

## Project conventions

- **Lint:** `npm run lint`
- **Typecheck:** `npm run typecheck`
- **Test:** `npm test --if-present`
- **Build:** `npm run build`
- **Run dev:** `npm run dev`

Hot paths (read these before changing them): src, messages, public, .github

## Effort classification (E0–E3)

`analyze` classifies every issue:

- **E0** — direct guidance, no plan needed (typos, single-line fixes, doc tweaks).
- **E1** — short plan (≤5 bullets). Single file or small isolated change.
- **E2** — standard plan. Multi-file change within one domain.
- **E3** — full plan + business-impact section. Triggered for any issue
  touching: data migrations / schema changes, public API surface, cross-cutting infrastructure (i18n, logging, error handling), routing / URL structure, architectural refactors (build system, framework upgrades), dependency changes (new packages, major version bumps), secrets / credentials.

> The list above is editable. `analyze` reads it from this file on every
> invocation — no re-setup needed. Add new high-blast-radius areas as
> they emerge, remove ones that no longer apply.

## What to NOT do here

- Do not bypass `start` to commit directly. The orchestration enforces review.
- Do not change branch protections or CI workflows without an issue.
- Do not introduce dependencies without justifying them in the plan.

## Pointers

- [AGENTS.md](AGENTS.md) — flow definitions, skill specs, escalation rules.
- `.github/workflows/` — CI, auto-PR, project lifecycle, changelog, doc sync.
