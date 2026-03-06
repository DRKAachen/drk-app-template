import fs from 'node:fs'
import path from 'node:path'

/**
 * Copies this template's AI guidance files into a target project.
 * Usage:
 *   npm run sync:cursor-rules -- <target-project-path>
 */
function main() {
  const targetArg = process.argv[2]
  if (!targetArg) {
    console.error('Usage: npm run sync:cursor-rules -- <target-project-path>')
    process.exit(1)
  }

  const sourceRulesDir = path.resolve('.cursor', 'rules')
  const targetRulesDir = path.resolve(targetArg, '.cursor', 'rules')
  const rootFilesToSync = ['AI_RULES.md', 'AGENTS.md', 'CLAUDE.md']

  if (!fs.existsSync(sourceRulesDir)) {
    console.error(`Source rules directory not found: ${sourceRulesDir}`)
    process.exit(1)
  }

  fs.mkdirSync(targetRulesDir, { recursive: true })
  fs.cpSync(sourceRulesDir, targetRulesDir, { recursive: true, force: true })

  for (const fileName of rootFilesToSync) {
    const sourcePath = path.resolve(fileName)
    const targetPath = path.resolve(targetArg, fileName)
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath)
    }
  }

  console.log(`AI guidance synced to: ${path.resolve(targetArg)}`)
}

main()
