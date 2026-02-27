# DRK Site Template

Next.js template for DRK projects using the new DRK Design System architecture.

## Baseline (Default): UI-only

The default template is intentionally CMS-agnostic and only uses:

- `@drkaachen/design-system-ui`

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and adjust optional baseline values as needed.
3. Start development:

   ```bash
   npm run dev
   ```

### Fonts and DSGVO/GDPR

- `@drkaachen/design-system-ui` bundles Merriweather through `@fontsource/merriweather`.
- No manual `public/fonts/*` copy step is required anymore.
- Do not use external font CDNs by default.

## Scripts

- `npm run dev` – Start Next.js dev server
- `npm run build` / `npm run start` – Build and run production

## Optional: Sanity integration (not enabled by default)

Add Sanity only if your project requires CMS-backed content.

### 1) Install optional packages

```bash
npm install @drkaachen/content-sanity @drkaachen/next-site-runtime
npm install -D sanity @sanity/vision next-sanity
```

### 2) Optional middleware for multisite runtime

Create `middleware.ts`:

```ts
export { middleware, config } from '@drkaachen/next-site-runtime/middleware'
```

### 3) Optional site mapping

Use `getSiteByHostname` from `@drkaachen/content-sanity` and map the CMS result to the UI `SiteConfig` shape from `@drkaachen/design-system-ui` before passing it to UI components.

### 4) Optional env vars (only for Sanity-enabled projects)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
NEXT_PUBLIC_DEFAULT_SITE_HOSTNAME=
ALLOWED_SITE_HOSTNAMES=
```

`ALLOWED_SITE_HOSTNAMES` is recommended for hardened production setups.

## Dependency automation

Dependabot is configured to track:

- `@drkaachen/design-system-ui*`
- `@drkaachen/content-sanity*`
- `@drkaachen/next-site-runtime*`

## Private registry setup

For `@drkaachen/*` packages, keep scope registry configuration in `.npmrc` and provide the auth token via environment variable (never hardcode secrets).
