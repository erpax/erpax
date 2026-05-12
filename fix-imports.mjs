#!/usr/bin/env node
/**
 * Comprehensive import path fixer for Phase 11
 * Run from project root: node fix-imports.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const fixes = [
  // Fix relative imports to @/fields/accounting/
  {
    pattern: /from ['"]\.\.\/fields\/base-accounting-fields['"]/g,
    replacement: "from '@/fields/accounting/base-accounting-fields'",
    description: 'Fixing base-accounting-fields imports',
  },
  // Fix relative imports to @/services/accounting/utilities/
  {
    pattern: /from ['"]\.\.\/utilities\/period-lock['"]/g,
    replacement: "from '@/services/accounting/utilities/period-lock'",
    description: 'Fixing period-lock imports',
  },
  // Fix relative imports to @/services/accounting/utilities/index
  {
    pattern: /from ['"]\.\.\/utilities['"]/g,
    replacement: "from '@/services/accounting/utilities'",
    description: 'Fixing relative utilities imports',
  },
  // Fix relative imports in nested collections
  {
    pattern: /from ['"]\.\.\/\.\.\/\.\.\/hooks\//g,
    replacement: "from '@/hooks/",
    description: 'Fixing relative hook imports',
  },
  // Note: @/services/accounting/hooks now exists as a stub file
]

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir, { withFileTypes: true })
  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    if (file.isDirectory() && !file.name.startsWith('.')) {
      walkDir(fullPath, callback)
    } else if (file.isFile() && (file.name.endsWith('.ts') || file.name.endsWith('.tsx'))) {
      callback(fullPath)
    }
  }
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  let modified = false

  for (const fix of fixes) {
    if (fix.pattern.test(content)) {
      content = content.replace(fix.pattern, fix.replacement)
      modified = true
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8')
    return true
  }
  return false
}

console.log('🔧 Fixing all import paths in bulk...\n')

let fixedCount = 0
const srcDir = path.join(__dirname, 'src')

for (const fix of fixes) {
  console.log(`  ${fix.description}...`)
  let count = 0
  walkDir(srcDir, (filePath) => {
    if (fixFile(filePath)) {
      count++
    }
  })
  if (count > 0) {
    console.log(`    ✓ Fixed ${count} files`)
    fixedCount += count
  }
}

console.log(`\n✅ Import fixes complete! (${fixedCount} files modified)\n`)
console.log('Next steps:')
console.log('  1. Run: pnpm typecheck')
console.log('  2. Run: pnpm build')
console.log('  3. Run: pnpm dev')
