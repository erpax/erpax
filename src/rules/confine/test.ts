import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { plasmaTouches, assertConfined, atomPath } from './index'

const corpus = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-confine-'))
  for (const [p, t] of Object.entries(files)) { mkdirSync(join(cwd, p, '..'), { recursive: true }); writeFileSync(join(cwd, p), t) }
  return cwd
}

describe('rules/confine — the registry is handled by the field, not by holding every particle', () => {
  it('names its path', () => {
    expect(atomPath).toBe('confine')
  })

  // The exact shape that collapsed the boot: a namespace import of the whole registry, outside the config.
  it('flags a namespace import of @/collections outside the config', () => {
    const cwd = corpus({ 'src/agents/mcp/tool-defs.ts': "import * as all from '@/collections'\nexport const x = Object.values(all)" })
    const t = plasmaTouches(cwd)
    expect(t).toHaveLength(1)
    expect(t[0]!.file).toBe('src/agents/mcp/tool-defs.ts')
  })

  // A COMMENT describing the old code is DATA, not a touch — the grammar decides, not a text match.
  it('does NOT flag a comment that mentions the old import — parsed, not matched', () => {
    const cwd = corpus({ 'src/x/index.ts': "// This was `import * as allCollections from '@/collections'` before the fix\nexport const x = 1" })
    expect(plasmaTouches(cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the config and its barrel ARE the bottle — allowed to hold every collection', () => {
    const cwd = corpus({
      'src/payload.config.ts': "import * as all from '@/collections'\nexport default { collections: Object.values(all) }",
      'src/collections/test.ts': "import * as all from '@/collections'\nit('barrel', () => {})",
    })
    expect(plasmaTouches(cwd)).toHaveLength(0) // the bottle is not a touch
    rmSync(cwd, { recursive: true, force: true })
  })

  it('a NAMED import (a single collection) is fine — that is one particle, not the plasma', () => {
    const cwd = corpus({ 'src/x/index.ts': "import { Invoices } from '@/collections'\nexport const x = Invoices" })
    expect(plasmaTouches(cwd)).toHaveLength(0)
    rmSync(cwd, { recursive: true, force: true })
  })

  it('the live corpus is CONFINED — the boot fix holds, ceiling 0', () => {
    expect(() => assertConfined(process.cwd(), 0)).not.toThrow()
  })
})
