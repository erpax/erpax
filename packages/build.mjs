#!/usr/bin/env node
/**
 * Build one @erpax/<atom> workspace package from the live src tree.
 *
 * Usage: node packages/build.mjs <atom> | all
 *
 * Pipeline per package:
 *   1. esbuild bundles src/<atom>/index.ts → dist/index.js (ESM). `@/x` resolves
 *      into src/; every bare specifier stays external and is COMPUTED into the
 *      package's dependencies/peerDependencies from the root package.json.
 *   2. tsc emits declarations for the type closure → dist/types/** (rootDir src),
 *      then `@/x` specifiers in the emitted .d.ts are rewritten to relative paths.
 *   3. Ratchet: the runtime closure's atom count must not exceed
 *      package.json `erpax.closureCeiling` — entanglement growth fails closed.
 *
 * `@erpax/algebra` keeps its own dedicated build (MIT tier, hand-audited surface).
 */
import { build } from 'esbuild'
import { spawnSync } from 'node:child_process'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const packagesDir = dirname(fileURLToPath(import.meta.url))
const root = join(packagesDir, '..')
const rootPkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))

/** payload/next/react are host-provided — peers, never bundled deps. */
const PEERS = new Set(['payload', 'next', 'react', 'react-dom'])

function resolveAlias(spec) {
  const p = join(root, 'src', spec.slice(2))
  for (const c of [p, `${p}.ts`, `${p}.tsx`, join(p, 'index.ts'), join(p, 'index.tsx')]) {
    if (existsSync(c) && statSync(c).isFile()) return c
  }
  return null
}

async function buildOne(atom) {
  const pkgDir = join(packagesDir, atom)
  const pkgJsonPath = join(pkgDir, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf8'))
  const entry = join(root, 'src', atom, 'index.ts')
  const dist = join(pkgDir, 'dist')
  rmSync(dist, { recursive: true, force: true })

  const externals = new Set()
  const result = await build({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'es2022',
    outfile: join(dist, 'index.js'),
    metafile: true,
    logLevel: 'silent',
    plugins: [
      {
        name: 'erpax-alias-and-external',
        setup(b) {
          b.onResolve({ filter: /^@\// }, (args) => {
            const r = resolveAlias(args.path)
            return r ? { path: r } : { errors: [{ text: `unresolvable alias ${args.path}` }] }
          })
          b.onResolve({ filter: /^[^./]/ }, (args) => {
            externals.add(args.path)
            return { path: args.path, external: true }
          })
        },
      },
    ],
  })

  const closureFiles = Object.keys(result.metafile.inputs)
  const atoms = new Set(
    closureFiles
      .map((f) => relative(join(root, 'src'), join(root, f)))
      .filter((r) => !r.startsWith('..'))
      .map((r) => r.split('/')[0]),
  )
  const ceiling = pkg.erpax?.closureCeiling ?? 0
  if (atoms.size > ceiling) {
    throw new Error(
      `closure ratchet: ${atom} touches ${atoms.size} atoms > ceiling ${ceiling} — ` +
        `entanglement grew; cut the new edge or raise the ceiling in the same diff`,
    )
  }

  /*
   * THE BYTE RATCHET — because the atom count did not say what it costs.
   *
   * `@erpax/cloudflare` sits at its 73-atom ceiling and ships 5.8 MB, and a consumer calling the
   * simplest thing in it pays all of it. Measured, entry by entry:
   *
   *   @/cloudflare/constants alone          0 KB ·  1 atom
   *   kvGet · kvPut · r2Get · r2Put     5,836 KB · 73 atoms
   *   the whole face                    5,880 KB · 73 atoms
   *
   * One edge does it: `cloudflare/bindings.ts` imports `@/diamond`, which imports
   * `@/readme/compute`, which imports `@/rules` — the entire gate registry, and `typescript` with
   * it. Those diamond-derivation functions SCAN `src/` on disk, so they cannot run in a Worker at
   * all; the package's own runtime half pays 5.8 MB to carry tooling its target runtime cannot
   * execute. Cutting it is a face change (`bindingDiamond` and friends leaving the barrel), which
   * is a decision, not a build flag.
   *
   * So the size is a ratcheted FACT until then: it may fall freely and may not rise. An atom
   * ceiling counts entanglement; this counts what the entanglement weighs.
   */
  const sizeKb = Math.round(statSync(join(dist, 'index.js')).size / 1024)
  const sizeCeiling = pkg.erpax?.sizeCeilingKb ?? Number.POSITIVE_INFINITY
  if (sizeKb > sizeCeiling) {
    throw new Error(
      `size ratchet: ${atom} ships ${sizeKb}KB > ceiling ${sizeCeiling}KB — ` +
        `a consumer pays this on install; cut the edge or raise the ceiling in the same diff`,
    )
  }

  const allRootDeps = { ...rootPkg.devDependencies, ...rootPkg.dependencies }
  const deps = {}
  const peers = {}
  for (const e of [...externals].sort()) {
    if (e.startsWith('node:')) continue
    const name = e.startsWith('@') ? e.split('/').slice(0, 2).join('/') : e.split('/')[0]
    const version = allRootDeps[name]
    if (PEERS.has(name)) peers[name] = version ?? '*'
    else if (version) deps[name] = version
    else peers[name] = '*'
  }
  pkg.dependencies = Object.keys(deps).length ? deps : undefined
  pkg.peerDependencies = Object.keys(peers).length ? peers : undefined
  writeFileSync(pkgJsonPath, `${JSON.stringify(pkg, null, 2)}\n`)

  const typesDir = join(dist, 'types')
  const tsconfigPath = join(pkgDir, '.build.tsconfig.json')
  writeFileSync(
    tsconfigPath,
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'Bundler',
          jsx: 'react-jsx',
          declaration: true,
          emitDeclarationOnly: true,
          outDir: typesDir,
          rootDir: join(root, 'src'),
          baseUrl: root,
          paths: { '@/*': ['src/*'] },
          strict: true,
          skipLibCheck: true,
          noEmitOnError: false,
        },
        files: [entry],
      },
      null,
      2,
    ),
  )
  const tsc = spawnSync(join(root, 'node_modules/.bin/tsc'), ['-p', tsconfigPath], {
    stdio: 'pipe',
    encoding: 'utf8',
  })
  rmSync(tsconfigPath, { force: true })
  const typesOk = existsSync(join(typesDir, atom, 'index.d.ts'))
  if (typesOk) rewriteAliasInDts(typesDir)

  copyFileSync(join(root, 'LICENSE'), join(pkgDir, 'LICENSE'))
  const bytes = statSync(join(dist, 'index.js')).size
  return {
    atom,
    files: closureFiles.length,
    atoms: atoms.size,
    kb: Math.round(bytes / 1024),
    externals: externals.size,
    typesOk,
    tscNote: typesOk ? '' : (tsc.stdout || tsc.stderr || '').split('\n')[0],
  }
}

function rewriteAliasInDts(typesDir) {
  const walk = (d) => {
    for (const e of readdirSync(d)) {
      const p = join(d, e)
      if (statSync(p).isDirectory()) walk(p)
      else if (e.endsWith('.d.ts')) {
        const text = readFileSync(p, 'utf8')
        const next = text.replace(/(['"])@\/([^'"]+)\1/g, (_m, q, spec) => {
          let rel = relative(dirname(p), join(typesDir, spec)).replace(/\\/g, '/')
          if (!rel.startsWith('.')) rel = `./${rel}`
          return `${q}${rel}${q}`
        })
        if (next !== text) writeFileSync(p, next)
      }
    }
  }
  walk(typesDir)
}

const target = process.argv[2]
if (!target) {
  console.error('usage: node packages/build.mjs <atom>|all')
  process.exit(1)
}
const targets =
  target === 'all'
    ? readdirSync(packagesDir).filter(
        (e) =>
          e !== 'algebra' &&
          statSync(join(packagesDir, e)).isDirectory() &&
          existsSync(join(packagesDir, e, 'package.json')),
      )
    : [target]

let failed = 0
for (const atom of targets) {
  try {
    const r = await buildOne(atom)
    console.log(
      `✓ @erpax/${r.atom} — ${r.files} files · ${r.atoms} atoms · ${r.kb}KB · ` +
        `${r.externals} externals · types ${r.typesOk ? 'OK' : `FAILED (${r.tscNote})`}`,
    )
    if (!r.typesOk) failed++
  } catch (err) {
    console.error(`✖ @erpax/${atom} — ${err.message.split('\n')[0]}`)
    failed++
  }
}
process.exit(failed ? 1 : 0)
