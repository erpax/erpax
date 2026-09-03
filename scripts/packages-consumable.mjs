#!/usr/bin/env node
/**
 * packages-consumable — pack every @erpax/* package, install the tarballs into an empty
 * project, and IMPORT them. The thing a stranger does, done before they do it.
 *
 * `@erpax/algebra` shipped a dist that threw on the first line a consumer could write:
 *
 *     ERR_MODULE_NOT_FOUND  …/@erpax/algebra/dist/constants
 *
 * The build emitted `export … from './constants'` — a directory in the source tree and
 * nothing at all under Node ESM — because two child atoms were added after the build script
 * was written. Every gate in this repo was green: tsc passed, the closure ratchet passed, the
 * package built. Not one of them imported the ARTIFACT, and until something does, "it builds"
 * is the whole of what anybody knows.
 *
 *   node scripts/packages-consumable.mjs
 *
 * HONEST BOUNDARY: this proves each package LOADS and offers a non-empty face from a clean
 * install. It does not exercise behaviour — a package that imports and then throws on use
 * passes here. It closes the door that was standing open: shipping something nobody ever
 * installed.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const packagesDir = join(root, 'packages')

const packages = readdirSync(packagesDir).filter((n) => existsSync(join(packagesDir, n, 'package.json')))
if (packages.length === 0) {
  console.error('✖ no packages found')
  process.exit(1)
}

const work = mkdtempSync(join(tmpdir(), 'erpax-consumable-'))
writeFileSync(join(work, 'package.json'), `${JSON.stringify({ name: 'consumer', version: '1.0.0', type: 'module', private: true }, null, 2)}\n`)

const tarballs = []
const names = []
for (const p of packages) {
  const dir = join(packagesDir, p)
  const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'))
  if (!existsSync(join(dir, 'dist'))) {
    console.error(`✖ ${pkg.name} has no dist/ — build first (node packages/build.mjs all)`)
    process.exit(1)
  }
  execFileSync('npm', ['pack', '--pack-destination', work], { cwd: dir, stdio: 'ignore' })
  const tgz = readdirSync(work).find((f) => f.startsWith(pkg.name.replace('@', '').replace('/', '-')) && f.endsWith('.tgz'))
  if (!tgz) {
    console.error(`✖ ${pkg.name} produced no tarball`)
    process.exit(1)
  }
  tarballs.push(`./${tgz}`)
  names.push(pkg.name)
}

execFileSync('npm', ['install', ...tarballs, '--no-audit', '--no-fund'], { cwd: work, stdio: 'ignore' })

const probe = join(work, 'probe.mjs')
writeFileSync(
  probe,
  `const names = ${JSON.stringify(names)}
let bad = 0
for (const n of names) {
  try {
    const m = await import(n)
    const count = Object.keys(m).length
    if (count === 0) { console.log(\`✖ \${n} — imports, but offers NOTHING\`); bad++; continue }
    console.log(\`✓ \${n.padEnd(20)} \${count} export(s)\`)
  } catch (e) {
    console.log(\`✖ \${n.padEnd(20)} \${e.code ?? ''} \${String(e.message).split('\\n')[0]}\`)
    bad++
  }
}
process.exit(bad === 0 ? 0 : 1)
`,
)

const r = execFileSync('node', [probe], { cwd: work, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
process.stdout.write(r)
rmSync(work, { recursive: true, force: true })
console.log(`✔ ${names.length} package(s) install and import from a clean project`)
