import { describe, expect, it } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { assertCommandsResolve, deadCommands, deadLoaderPaths, assertLoaderPathsResolve } from '.'

const repo = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-command-'))
  for (const [rel, body] of Object.entries(files)) {
    const p = join(root, rel)
    mkdirSync(join(p, '..'), { recursive: true })
    writeFileSync(p, body)
  }
  return root
}

const PKG = (scripts: Record<string, string>) => JSON.stringify({ name: 'x', scripts }, null, 2)

describe('rules/command', () => {
  it('catches the SPAWN-ARRAY form — the exact shape that failed open here', () => {
    // scripts/confirm.mjs spawned ['exec', 'tsx', 'src/confirm/matter.ts'] after that file became a
    // child atom. No shell-style scan sees a path inside an argument array, and the hook died with
    // ERR_MODULE_NOT_FOUND on every edit — exit 1, which does not block. A gate that reports zero
    // must be shown to fire on the defect it exists for.
    const root = repo({
      'package.json': PKG({ confirm: 'node scripts/confirm.mjs' }),
      'scripts/confirm.mjs': `spawnSync('pnpm', ['exec', 'tsx', 'src/confirm/matter.ts'])\n`,
    })
    const dead = deadCommands(root)
    expect(dead).toHaveLength(1)
    expect(dead[0]!.target).toBe('src/confirm/matter.ts')
    expect(dead[0]!.reachedBy).toEqual(['package.json', 'scripts/confirm.mjs'])
  })

  it('follows the chain — an entry names a script that names another', () => {
    const root = repo({
      'package.json': PKG({ a: 'node scripts/a.mjs' }),
      'scripts/a.mjs': `run('scripts/b.mjs')\n`,
      'scripts/b.mjs': `run('src/gone.ts')\n`,
    })
    const [d] = deadCommands(root)
    expect(d!.reachedBy).toEqual(['package.json', 'scripts/a.mjs', 'scripts/b.mjs'])
  })

  it('does NOT flag a path nothing runs — reachability is the whole scope', () => {
    // The corpus holds ~140 dead executable path literals; most are completed one-shot migrations
    // naming files they deleted. A file nothing runs cannot fail open, because it never runs.
    const root = repo({
      'package.json': PKG({ a: 'node scripts/live.mjs' }),
      'scripts/live.mjs': `run('src/here.ts')\n`,
      'src/here.ts': 'export const x = 1\n',
      'scripts/orphan.mjs': `run('src/long-gone.ts')\n`,
    })
    expect(deadCommands(root)).toEqual([])
  })

  it('does NOT flag a COMMENT naming a path', () => {
    const root = repo({
      'package.json': PKG({ a: 'node scripts/a.mjs' }),
      'scripts/a.mjs': `/** Mirror of src/algebra/license.ts — keep the build free of a TS import. */\nrun()\n`,
    })
    expect(deadCommands(root)).toEqual([])
  })

  it('does NOT invent a file by stopping mid-extension', () => {
    // `packages/released.json` matched as `packages/released.js` before the trailing guard existed —
    // the same shape a sibling lost three findings to today.
    const root = repo({
      'package.json': PKG({ a: 'node scripts/a.mjs' }),
      'scripts/a.mjs': `const MANIFEST = 'packages/released.json'\n`,
      'packages/released.json': '{}\n',
    })
    expect(deadCommands(root)).toEqual([])
  })

  it('does NOT flag a shell path behind a [ -f ] guard — that is a conditional', () => {
    const root = repo({
      '.husky/pre-push': `if [ -f src/maybe/index.ts ]; then node src/maybe/index.ts; fi\n`,
    })
    expect(deadCommands(root)).toEqual([])
  })

  it('zero is a theorem — it throws on one and passes on none', () => {
    const bad = repo({
      'package.json': PKG({ a: 'node scripts/a.mjs' }),
      'scripts/a.mjs': `run('src/gone.ts')\n`,
    })
    expect(() => assertCommandsResolve(bad)).toThrow(/command — 1 path/)
    expect(() => assertCommandsResolve(repo({ 'package.json': PKG({}) }))).not.toThrow()
  })

  it('every path this repo actually runs resolves', () => {
    expect(deadCommands(process.cwd())).toEqual([])
  })
})

/**
 * The runtime-loader population — the one that rotted because neither gate covered it.
 *
 * `deadCommands` scopes itself to what CI, the hooks and package.json reach and delegates a `.ts`
 * module's paths to [[rules]]/reference, which reads prose and comments. A path inside a string
 * literal handed to `requireFromHere` was in neither, so `consistency/apply` pointed thirteen
 * references at a dissolved `src/services/` tree and only the Next dev build ever said so.
 */
describe('rules/command — a runtime loader must point at something that exists', () => {
  const tree = (files: Record<string, string>): string => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-loader-'))
    for (const [rel, body] of Object.entries(files)) {
      const full = join(root, rel)
      mkdirSync(join(full, '..'), { recursive: true })
      writeFileSync(full, body)
    }
    return root
  }

  it('catches the exact shape that rotted — a join()ed literal inside requireFromHere', () => {
    const root = tree({
      'src/a/index.ts':
        "const requireFromHere = createRequire(import.meta.url)\n" +
        "export const load = (repoRoot: string) =>\n" +
        "  requireFromHere(join(repoRoot, 'src/services/agents/bootstrap.ts'))\n",
    })
    try {
      const dead = deadLoaderPaths(root)
      expect(dead).toHaveLength(1)
      expect(dead[0]!.target).toBe('src/services/agents/bootstrap.ts')
      expect(dead[0]!.loader).toBe('requireFromHere')
      expect(dead[0]!.line).toBe(3)
      expect(() => assertLoaderPathsResolve(root)).toThrow(/no such file/)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('catches a dynamic import() too', () => {
    const root = tree({ 'src/a/index.ts': "export const f = () => import('src/gone/x.ts')\n" })
    try {
      expect(deadLoaderPaths(root).map((d) => d.loader)).toEqual(['import'])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('a path that EXISTS is never a finding', () => {
    const root = tree({
      'src/a/index.ts': "export const f = () => require('src/b/real.ts')\n",
      'src/b/real.ts': 'export const real = 1\n',
    })
    try {
      expect(deadLoaderPaths(root)).toEqual([])
      expect(() => assertLoaderPathsResolve(root)).not.toThrow()
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('a comment naming a dead path is not a call — the grammar excludes prose for free', () => {
    const root = tree({
      'src/a/index.ts':
        "// once: requireFromHere('src/services/agents/bootstrap.ts')\n" +
        "/** and here too: require('src/services/gone.ts') */\nexport const f = 1\n",
    })
    try {
      expect(deadLoaderPaths(root)).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('an INTERPOLATED path names a family, not a file, and is never judged', () => {
    const root = tree({
      'src/a/index.ts': 'export const f = (area: string) => require(`src/gone/${area}/x.ts`)\n',
    })
    try {
      expect(deadLoaderPaths(root)).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('the live corpus has none, and zero is a theorem', () => {
    expect(deadLoaderPaths()).toEqual([])
    expect(() => assertLoaderPathsResolve()).not.toThrow()
  }, 300_000)
})
