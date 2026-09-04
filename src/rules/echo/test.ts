import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { pathWords, echoes, assertNoNewEchoes, atomPath } from './index'

describe('rules/echo — a path that restates itself has not folded its meaning', () => {
  it('names its path', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).leaf)
  })

  it('splits a path into meaning-words — segments, hyphens, dots, camelCase', () => {
    expect(pathWords('src/gl/account/service/period-end-adjustment.ts')).toEqual(
      ['gl', 'account', 'service', 'period', 'end', 'adjustment'],
    )
    expect(pathWords('src/admin/ui/ComputedCssAdminRoot.tsx')).toContain('admin') // both the dir AND the name
  })

  it('drops trinity noise — index, test, tsx carry no meaning', () => {
    const w = pathWords('src/merge/index.ts')
    expect(w).toEqual(['merge'])
    expect(w).not.toContain('index')
  })

  // The finding: a word repeated within a path is the path saying the same thing twice — unfolded.
  it('the corpus really restates itself — compliance appears three times in one path', () => {
    const compliance = echoes().find((e) => e.path.includes('compliance/frameworks/compliance') && e.word === 'compliance')
    expect(compliance).toBeDefined()
    expect(compliance!.times).toBe(3)
  })

  it('does NOT flag the framework namespace — page/route under app/ are Next.js, not the corpus', () => {
    expect(echoes().some((e) => e.path.startsWith('src/app/'))).toBe(false)
  })

  it('the gate ratchets — fails only on getting worse', () => {
    const n = new Set(echoes().map((e) => e.path)).size
    expect(() => assertNoNewEchoes(process.cwd(), n)).not.toThrow()
    expect(() => assertNoNewEchoes(process.cwd(), n - 1)).toThrow(/restate a word/)
  })
})
