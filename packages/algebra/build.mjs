#!/usr/bin/env node
/**
 * Build @erpax/algebra — free core math only.
 * Copies src/algebra/{index,license}.ts (strips host re-exports + CLI),
 * asserts isCoreMathPath, emits dist/ via tsc. Never packs fold (→ merge) or the app.
 */
import { spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const pkgDir = dirname(fileURLToPath(import.meta.url))
const root = join(pkgDir, '../..')
const srcAlgebra = join(root, 'src/algebra')
const stage = join(pkgDir, '.build')
const dist = join(pkgDir, 'dist')

/** Mirror of src/algebra/license.ts — keep build free of TS import. */
function isCoreMathPath(repoPath) {
  const n = repoPath.replace(/\\/g, '/').replace(/^\.\//, '')
  return n === 'src/algebra' || n.startsWith('src/algebra/')
}

const FREE = ['index.ts', 'license.ts']

rmSync(stage, { recursive: true, force: true })
rmSync(dist, { recursive: true, force: true })
mkdirSync(stage, { recursive: true })

for (const f of FREE) {
  const repoRel = `src/algebra/${f}`
  if (!isCoreMathPath(repoRel)) {
    console.error(`✖ not core math: ${repoRel}`)
    process.exit(1)
  }
  let text = readFileSync(join(srcAlgebra, f), 'utf8')
  if (f === 'index.ts') {
    text = text
      .replace(/\nexport \{\n  hostMathViolations[\s\S]*?\} from '\.\/host'\n/, '\n')
      .replace(/\nif \(import\.meta\.url === 'file:\/\/' \+ process\.argv\[1\]\) \{[\s\S]*$/m, '\n')
      .replace(/from '\.\/license'/g, "from './license.js'")
  }
  if (/\bfrom ['"]@\//.test(text) || /\bfrom ['"]\.\/fold['"]/.test(text) || /\bfrom ['"]\.\/host['"]/.test(text)) {
    console.error(`✖ ${f} still imports merge-bound or host surface — refuse publish`)
    process.exit(1)
  }
  writeFileSync(join(stage, f), text)
}

const pkgJson = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'))
const licenseSrc = readFileSync(join(srcAlgebra, 'license.ts'), 'utf8')
const spdxMatch = licenseSrc.match(/CORE_MATH_SPDX = '([^']+)'/)
if (!spdxMatch || pkgJson.license !== spdxMatch[1]) {
  console.error(`✖ package.json license ${pkgJson.license} ≠ CORE_MATH_SPDX ${spdxMatch?.[1]}`)
  process.exit(1)
}

writeFileSync(
  join(stage, 'tsconfig.json'),
  JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2022',
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
        declaration: true,
        outDir: dist,
        rootDir: stage,
        strict: true,
        skipLibCheck: true,
      },
      include: ['index.ts', 'license.ts'],
    },
    null,
    2,
  ),
)

const r = spawnSync(
  process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
  ['exec', 'tsc', '-p', join(stage, 'tsconfig.json')],
  { cwd: root, stdio: 'inherit' },
)
if (r.status !== 0) process.exit(r.status ?? 1)

console.log('✔ @erpax/algebra → dist/ (free core math only)')
