# Claude Code Instructions

Follow `AI_RULES.md` as the canonical policy for this repository.

## Required behavior

- Read and apply `AI_RULES.md` before implementing changes.
- Respect `.cursor/rules/` files when they provide stricter or file-scoped guidance.
- Preserve template architecture defaults:
  - UI-only baseline
  - optional Sanity/runtime integration
  - SCSS/Sass only
  - DSGVO/GDPR-aware defaults

## In case of conflict

If task constraints conflict with `AI_RULES.md`, call out the risk explicitly and request user confirmation before proceeding.
