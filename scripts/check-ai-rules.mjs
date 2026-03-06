import fs from 'node:fs'
import path from 'node:path'

const requiredRootFiles = ['AI_RULES.md', 'AGENTS.md', 'CLAUDE.md']
const requiredCursorRuleFiles = [
  'core-standards.mdc',
  'dsgvo-privacy.mdc',
  'frontend-styling.mdc',
  'git-conventions.mdc',
  'typescript-strictness.mdc',
  'docs-before-push.mdc',
  'npm-version-bump.mdc',
  'template-rule-propagation.mdc',
]

const forbiddenPatterns = [
  { label: 'Tailwind directive', regex: /@tailwind\s+/ },
  { label: 'Google Fonts CDN', regex: /fonts\.(googleapis|gstatic)\.com/i },
  { label: 'Hardcoded GitHub token', regex: /(ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})/ },
]

const textFileExtensions = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.md',
  '.mdc',
  '.yml',
  '.yaml',
  '.scss',
  '.css',
  '.env',
  '.example',
])

const ignoredDirectories = new Set(['.git', '.next', 'node_modules', '.cursor/projects'])

function exists(relativePath) {
  return fs.existsSync(path.resolve(relativePath))
}

function walkFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relPath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/')
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) {
        continue
      }
      walkFiles(fullPath, files)
      continue
    }
    const ext = path.extname(entry.name)
    if (textFileExtensions.has(ext) || entry.name.endsWith('.env.example')) {
      files.push({ fullPath, relPath })
    }
  }
  return files
}

function run() {
  const errors = []

  for (const file of requiredRootFiles) {
    if (!exists(file)) {
      errors.push(`Missing required guidance file: ${file}`)
    }
  }

  for (const file of requiredCursorRuleFiles) {
    const rulePath = path.join('.cursor', 'rules', file)
    if (!exists(rulePath)) {
      errors.push(`Missing required Cursor rule file: ${rulePath.replace(/\\/g, '/')}`)
    }
  }

  if (!exists('package.json')) {
    errors.push('Missing package.json')
  } else {
    const pkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'))
    const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }
    if (allDeps.tailwindcss || allDeps['@tailwindcss/postcss']) {
      errors.push('Tailwind dependency detected in package.json')
    }
  }

  const files = walkFiles(process.cwd())
  for (const file of files) {
    const content = fs.readFileSync(file.fullPath, 'utf8')
    for (const pattern of forbiddenPatterns) {
      if (pattern.regex.test(content)) {
        errors.push(`${pattern.label} found in ${file.relPath}`)
      }
    }
  }

  if (errors.length > 0) {
    console.error('AI rule checks failed:')
    for (const error of errors) {
      console.error(`- ${error}`)
    }
    process.exit(1)
  }

  console.log('AI rule checks passed.')
}

run()
