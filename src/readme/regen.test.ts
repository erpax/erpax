import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expandRegenScopes } from './regen'
import { corpusFoldRoot, readCorpusFoldReceipt, sealCorpusFold } from './compute'

describe('readme/regen — focused face regen', () => {
  it('expands a known atom scope', () => {
    const paths = expandRegenScopes(['readme'])
    expect(paths).toContain('readme')
  })
})

describe('readme — corpus quantum fold (content IS the key)', () => {
  const scratch = (): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-fold-'))
    mkdirSync(join(cwd, 'src', 'atom'), { recursive: true })
    writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const one = 1\n')
    return cwd
  }

  it('same tree ⇒ same root · changed input ⇒ different key', () => {
    const cwd = scratch()
    try {
      const a = corpusFoldRoot(cwd)
      expect(corpusFoldRoot(cwd)).toBe(a)
      writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const one = 2\n')
      expect(corpusFoldRoot(cwd)).not.toBe(a)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('seal → read round-trips · absent receipt is null', () => {
    const cwd = scratch()
    try {
      expect(readCorpusFoldReceipt(cwd)).toBeNull()
      const root = corpusFoldRoot(cwd)
      sealCorpusFold(root, 1, cwd)
      expect(readCorpusFoldReceipt(cwd)?.root).toBe(root)
      expect(readCorpusFoldReceipt(cwd)?.faces).toBe(1)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})
