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

/*
 * The free core math, as FILES — and the child atoms are part of it.
 *
 * This shipped `index.ts` and `license.ts` only, while `src/algebra/index.ts` imports
 * `./constants` and `./operations`. The published dist therefore threw on IMPORT:
 *
 *     ERR_MODULE_NOT_FOUND  …/@erpax/algebra/dist/constants
 *
 * Nothing in the repo caught it because every test imports the SOURCE. A package's real
 * consumer imports the ARTIFACT, and until something does that, "it builds" is all anyone knows.
 */
const FREE = [
  { from: 'index.ts', to: 'index.ts' },
  { from: 'license.ts', to: 'license.ts' },
  { from: 'constants/index.ts', to: 'constants/index.ts' },
  { from: 'operations/index.ts', to: 'operations/index.ts' },
]

/**
 * Node ESM resolves no extensions: every relative specifier must name the file it means.
 * `./constants` is a directory in the source tree and nothing at all at runtime.
 */
const explicitEsm = (text) =>
  text
    .replace(/from '\.\/license'/g, "from './license.js'")
    .replace(/from '\.\/constants'/g, "from './constants/index.js'")
    .replace(/from '\.\/operations'/g, "from './operations/index.js'")
    .replace(/from '\.\.\/constants'/g, "from '../constants/index.js'")

rmSync(stage, { recursive: true, force: true })
rmSync(dist, { recursive: true, force: true })
mkdirSync(stage, { recursive: true })

for (const f of FREE) {
  const repoRel = `src/algebra/${f.from}`
  if (!isCoreMathPath(repoRel)) {
    console.error(`✖ not core math: ${repoRel}`)
    process.exit(1)
  }
  let text = readFileSync(join(srcAlgebra, f.from), 'utf8')
  if (f.from === 'index.ts') {
    text = text
      .replace(/\nexport \{\n  hostMathViolations[\s\S]*?\} from '\.\/host'\n/, '\n')
      .replace(/\nif \(import\.meta\.url === 'file:\/\/' \+ process\.argv\[1\]\) \{[\s\S]*$/m, '\n')
  }
  text = explicitEsm(text)
  if (/\bfrom ['"]@\//.test(text) || /\bfrom ['"]\.\/fold['"]/.test(text) || /\bfrom ['"]\.\/host['"]/.test(text)) {
    console.error(`✖ ${f.from} still imports merge-bound or host surface — refuse publish`)
    process.exit(1)
  }
  // A specifier that still names a directory would resolve here and throw for a consumer.
  const dangling = [...text.matchAll(/from '(\.[^']*)'/g)].map((m) => m[1]).filter((x) => !x.endsWith('.js'))
  if (dangling.length > 0) {
    console.error(`✖ ${f.from} has extensionless relative import(s): ${dangling.join(', ')} — Node ESM will not resolve them`)
    process.exit(1)
  }
  mkdirSync(dirname(join(stage, f.to)), { recursive: true })
  writeFileSync(join(stage, f.to), text)
}

const pkgJson = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'))
// ONE licence, every path — the tiered model is gone, so the source of truth is ERPAX_SPDX.
// This checked `CORE_MATH_SPDX`, which the relicense removed, so the build exited 1 on every
// invocation from that commit onward and the dist on disk has been stale ever since.
const licenseSrc = readFileSync(join(srcAlgebra, 'license.ts'), 'utf8')
const spdxMatch = licenseSrc.match(/ERPAX_SPDX = '([^']+)'/)
if (!spdxMatch || pkgJson.license !== spdxMatch[1]) {
  console.error(`✖ package.json license ${pkgJson.license} ≠ ERPAX_SPDX ${spdxMatch?.[1]}`)
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
      include: ['**/*.ts'],
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
