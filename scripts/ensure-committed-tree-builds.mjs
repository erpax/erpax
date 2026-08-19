#!/usr/bin/env node
/**
 * ensure-committed-tree-builds — bundle what you are PUSHING, not what you have.
 *
 * WHY THIS EXISTS: Cloudflare kept failing on pushes that were green locally, and
 * every time the cause was the same shape — the working tree and the committed tree
 * had diverged. The local tree is coherent; the clone CI builds is a partial slice
 * of an in-flight refactor. Two production breaks in one day:
 *
 *   Cannot find package '@/exact'                  ← the atom was never `git add`ed
 *   Multiple exports with the same name "PHYSICAL_FTL_DEFAULTS"
 *                                                  ← the FIX was uncommitted; the
 *                                                     broken version was committed
 *
 * Neither is visible locally: the files are on disk, and `tsx` (the dev loader)
 * tolerates a duplicate export that `esbuild` (the build) refuses. So the first place
 * the committed tree was ever actually built was Cloudflare — which makes the deploy
 * the discovery mechanism, and a deploy is a slow, public place to find a typo.
 *
 * This bundles a PRISTINE worktree of HEAD with the same bundler the real build uses.
 * It shares node_modules by symlink, so it costs ~1s, not an install.
 *
 * HONEST BOUNDARY: this proves the committed module graph RESOLVES and has no
 * duplicate/ambiguous exports — the whole class that broke us. It is not the full
 * Next build (no typegen, no RSC, no CSS pipeline), so it can still miss a
 * type-level or framework-level failure. It is the cheap 95%, not a CI replacement.
 *
 *   node scripts/ensure-committed-tree-builds.mjs
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, statSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { build } from 'esbuild'

const repo = process.cwd()
const git = (...a) => execFileSync('git', a, { cwd: repo, encoding: 'utf8' }).trim()

/** The app's real roots — every module the deploy actually pulls in starts here. */
const ENTRY_POINTS = ['src/payload.config.ts']

const work = mkdtempSync(join(tmpdir(), 'erpax-committed-'))
let added = false
try {
  // A detached worktree of HEAD == exactly what a fresh clone would see.
  git('worktree', 'add', '--detach', '--quiet', work, 'HEAD')
  added = true
  // Share the installed deps rather than reinstalling (seconds vs minutes).
  symlinkSync(join(repo, 'node_modules'), join(work, 'node_modules'), 'dir')

  const resolveAlias = (spec) => {
    const p = join(work, 'src', spec.slice(2))
    for (const c of [p, `${p}.ts`, `${p}.tsx`, join(p, 'index.ts'), join(p, 'index.tsx')]) {
      if (existsSync(c) && statSync(c).isFile()) return c
    }
    return null
  }

  const entries = ENTRY_POINTS.map((e) => join(work, e)).filter((e) => existsSync(e))
  if (entries.length === 0) {
    console.log('[ensure-committed-tree-builds] no entry points in HEAD — nothing to prove')
    process.exit(0)
  }

  const unresolved = []
  await build({
    entryPoints: entries,
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
    plugins: [
      {
        name: 'erpax-committed',
        setup(b) {
          // `@/x` must resolve INSIDE the committed tree — an atom that was never
          // committed fails here exactly as it fails in CI.
          b.onResolve({ filter: /^@\// }, (args) => {
            const r = resolveAlias(args.path)
            if (r) return { path: r }
            unresolved.push(`${args.path}  ← imported by ${args.importer.replace(work + '/', '')}`)
            return { path: args.path, external: true }
          })
          // node_modules + assets are the deploy's problem, not this gate's.
          b.onResolve({ filter: /^[^./]/ }, (args) => ({ path: args.path, external: true }))
          b.onResolve({ filter: /\.(css|scss|svg|png|jpe?g|webp)$/ }, (args) => ({ path: args.path, external: true }))
        },
      },
    ],
  })

  if (unresolved.length > 0) {
    console.error('[ensure-committed-tree-builds] ✗ the COMMITTED tree has unresolvable imports:\n')
    for (const u of [...new Set(unresolved)]) console.error(`   ${u}`)
    console.error('\n  These exist on your disk but not in the commit — `git add` them or drop the import.')
    process.exit(1)
  }

  console.log(
    `[ensure-committed-tree-builds] ✓ HEAD bundles clean (${entries.length} entry point(s)) — no duplicate exports, every @/ import resolves`,
  )
} catch (err) {
  const errors = err?.errors
  if (Array.isArray(errors) && errors.length > 0) {
    console.error('[ensure-committed-tree-builds] ✗ the COMMITTED tree does NOT build:\n')
    for (const e of errors.slice(0, 20)) {
      // esbuild reports paths relative to cwd, so they arrive as `../../..src/x` —
      // cut back to the repo-relative form the author actually recognises.
      const file = e.location?.file?.replace(/^.*?(?=src\/)/, '') ?? ''
      const at = file ? ` · ${file}:${e.location.line}` : ''
      console.error(`   ${e.text}${at}`)
    }
    console.error(
      '\n  This is what Cloudflare would hit. Your working tree may already contain the fix —' +
        '\n  if so, commit it; the clone only gets what git tracks.',
    )
    process.exit(1)
  }
  console.error('[ensure-committed-tree-builds] ✗ gate could not run:', err?.message ?? err)
  process.exit(1)
} finally {
  if (added) {
    try {
      execFileSync('git', ['worktree', 'remove', '--force', work], { cwd: repo, stdio: 'ignore' })
    } catch {
      /* fall through to rm */
    }
  }
  rmSync(work, { recursive: true, force: true })
}
