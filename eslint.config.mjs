import nextCoreVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/**
 * ESLint v9 flat config for Next.js + TypeScript.
 */
const config = [...nextCoreVitals, ...nextTypescript]

export default config
