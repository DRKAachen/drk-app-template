# Agent Guidance

This repository keeps canonical cross-tool guidance in `AI_RULES.md` and executable Cursor rules in `.cursor/rules/`.

## Required behavior

- Load and follow `AI_RULES.md`.
- Load and follow matching rules from `.cursor/rules/`.
- Treat rules with `alwaysApply: true` as mandatory baseline constraints.
- Respect file-scoped rules via their `globs` patterns.

## Template propagation

- This is a template repository; generated apps should keep:
  - `AI_RULES.md`
  - `AGENTS.md`
  - `CLAUDE.md`
  - `.cursor/rules/`
- If a scaffolder skips dotfiles, run:
  - `npm run sync:cursor-rules -- <target-app-path>`

## Priority

When multiple instructions exist, follow system/developer constraints first, then `AI_RULES.md` and repository rules, then task-specific preferences.
