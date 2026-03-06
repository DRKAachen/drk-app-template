# AI Rules (Canonical)

This file is the canonical, tool-agnostic AI guidance for this repository and apps generated from it.

## Core principles

- Keep code maintainable, readable, and secure.
- Prefer minimal dependency surface and well-maintained packages.
- Use SCSS/Sass for styling. Do not introduce Tailwind.
- Keep default template path CMS-agnostic; enable CMS/runtime integrations only when explicitly required.

## DSGVO/GDPR defaults

- Consider DSGVO/GDPR impact for any feature touching personal data or third-party services.
- Self-host fonts/assets by default; do not use Google Fonts CDN or similar external font CDNs.
- Gate non-essential cookies/storage/features behind user consent.
- If full compliance is disproportionately expensive, document residual risk and request explicit approval.

## Security

- Validate and sanitize untrusted input.
- Never hardcode or commit secrets/tokens.
- Avoid logging sensitive or personal data unless explicitly justified.

## Documentation discipline

Update docs when behavior changes, including:

- `README.md` for setup/usage/API changes.
- `.env.example` for env variable changes.
- Security/privacy docs when consent, cookies, headers, or data flows change.

## Cross-agent adoption

- Cursor: `.cursor/rules/*` are the executable rule set.
- Claude Code: `CLAUDE.md` mirrors and references this file.
- Generic agents: `AGENTS.md` mirrors and references this file.

If rules are updated, sync to generated apps:

`npm run sync:cursor-rules -- <target-app-path>`
