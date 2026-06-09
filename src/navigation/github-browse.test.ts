import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { GITHUB_DIR_LIMIT, countSrcTopLevel, planVocabularyFold, vocabularyFoldCandidates } from './github-browse'
import { vocabularyFoldAlias, isVocabularyFolded } from './github-folded.generated'
import { toAtomPath } from '@/path'

describe('navigation/github-browse', () => {
  it('countSrcTopLevel reports dirs + files', () => {
    const c = countSrcTopLevel()
    expect(c.total).toBe(c.dirs + c.files)
  })

  it('plan targets below GitHub limit when over', () => {
    const plan = planVocabularyFold()
    expect(plan.targetBelow).toBe(GITHUB_DIR_LIMIT)
    if (plan.before.dirs > GITHUB_DIR_LIMIT) expect(plan.selected.length).toBeGreaterThan(0)
  })

  it('skips protected pivots', () => {
    const words = new Set(vocabularyFoldCandidates().map((c) => c.word))
    expect(words.has('law')).toBe(false)
    expect(words.has('path')).toBe(false)
  })

  it('path fold for sharded about', () => {
    if (!existsSync(join(process.cwd(), 'src/vocabulary/about'))) return
    expect(vocabularyFoldAlias('about')).toBe('vocabulary/about')
    expect(toAtomPath('about', 'fs')).toBe('vocabulary/about')
  })
})
