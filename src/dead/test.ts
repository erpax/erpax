import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { deadScripts } from './index'

describe('dead — the corpus names its own dead weight (the partner skill)', () => {
  it('a referenced script is live; an unreferenced one is dead', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-dead-'))
    try {
      mkdirSync(join(cwd, 'scripts'), { recursive: true })
      mkdirSync(join(cwd, 'src', 'atom'), { recursive: true })
      writeFileSync(join(cwd, 'scripts', 'used.mjs'), 'console.log(1)\n')
      writeFileSync(join(cwd, 'scripts', 'orphan.mjs'), 'console.log(2)\n')
      // an invoker names used.mjs; nothing names orphan.mjs
      writeFileSync(join(cwd, 'package.json'), JSON.stringify({ scripts: { setup: 'node scripts/used.mjs' } }))
      writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const x = 1\n')
      const dead = deadScripts(cwd)
      expect(dead).toContain('scripts/orphan.mjs')
      expect(dead).not.toContain('scripts/used.mjs')
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('a script imported by a .ts file counts as live', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-dead2-'))
    try {
      mkdirSync(join(cwd, 'src', 'loader'), { recursive: true })
      writeFileSync(join(cwd, 'src', 'loader', 'hook.mjs'), 'export default 1\n')
      writeFileSync(join(cwd, 'src', 'loader', 'index.ts'), `import h from './hook.mjs'\nexport const y = h\n`)
      expect(deadScripts(cwd)).toEqual([]) // hook.mjs is referenced by index.ts → live
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('a clean corpus (no scripts) has no dead weight', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-dead3-'))
    try {
      mkdirSync(join(cwd, 'src', 'a'), { recursive: true })
      writeFileSync(join(cwd, 'src', 'a', 'index.ts'), 'export const z = 1\n')
      expect(deadScripts(cwd)).toEqual([])
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})
