import { describe, expect, it } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { assertCommandsResolve, deadCommands } from '.'

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
