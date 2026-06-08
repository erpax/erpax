import { describe, it, expect, afterEach } from 'vitest'
import { lookupAtomSkill, atomCatalogueLength, resetAtomCatalogueForTest } from './atom-catalogue-lazy'
import { loadSkillByAtomPath } from '@/skill/router/lazy-load'

const MINI_CATALOGUE = [
  { atom: 'agent', name: 'agent', description: 'test agent skill', path: 'agent' },
  { atom: 'cost', name: 'cost', description: 'test cost skill', path: 'cost' },
] as const

describe('agents/mcp — lazy atom catalogue', () => {
  afterEach(() => resetAtomCatalogueForTest())

  it('lookupAtomSkill resolves by atom leaf without loading generated file', () => {
    resetAtomCatalogueForTest(MINI_CATALOGUE)
    expect(lookupAtomSkill('agent')?.path).toBe('agent')
    expect(atomCatalogueLength()).toBe(2)
  })

  it('lazy skill fetch returns sealed excerpt for catalogue path', () => {
    resetAtomCatalogueForTest(MINI_CATALOGUE)
    const meta = lookupAtomSkill('agent')!
    const sealed = loadSkillByAtomPath(meta.path)
    expect(sealed).not.toBeNull()
    expect(sealed!.excerpt).toContain('name: agent')
    expect(sealed!.excerptChars).toBeLessThan(50_000)
  })
})
