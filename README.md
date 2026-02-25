# DRK Site Template

Next.js template for DRK multi-site projects. Uses [@drk/design-system](../drk-design-system) for components, styles, and utilities.

## Setup

1. Copy this template to a new repo or use as reference.
2. Install dependencies (design system is linked locally via `file:../drk-design-system`; replace with `@drk/design-system` when using the published package):

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and set your Sanity project ID and dataset.
4. Ensure Merriweather fonts are in `public/fonts/` (see design system README for DSGVO-compliant self-hosting).

## Scripts

- `npm run dev` – Start Next.js dev server
- `npm run build` / `npm run start` – Build and run production
- `npm run sanity` – Start Sanity Studio dev server
- `npm run sanity:deploy` – Deploy Studio to sanity.studio

## Design system updates

When using the published package from GitHub Packages, enable [Dependabot](.github/dependabot.yml) or [Renovate](.renovaterc.json) to receive automated PRs when `@drk/design-system` is updated.
