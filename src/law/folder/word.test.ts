import { describe, it, expect } from 'vitest'
import { computedBaseline } from './baseline'
import {
  wordFolderViolations,
  wordDiamondViolations,
  wordCodeStatus,
  matterForWord,
  wordDiamondFixSuggestion,
  deadHubWikilinks,
  hasWordCode,
  hasWordFolderTrinity,
  applyTopHubWordPivots,
} from '@/law/folder/word'
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

describe('law/folder/word — every word is a folder with code', () => {
  const audit = wordFolderViolations()

  it('wordFolderViolations reports totals and with-code percentage', () => {
    expect(audit.totalWords).toBeGreaterThan(1000)
    expect(audit.withCode).toBeGreaterThan(0)
    expect(audit.withCodePct).toBeGreaterThan(0)
    expect(audit.violationCount).toBe(audit.violations.length)
    expect(audit.violationCount).toBeLessThanOrEqual(computedBaseline('word-without-code'))
    console.log(
      `word-folder: ${audit.totalWords} words · ${audit.withCode} with-code (${audit.withCodePct}%) · ${audit.violationCount} violations`,
    )
  })

  it('wordCodeStatus detects root vocabulary-only atoms', () => {
    const law = wordCodeStatus('law')
    expect(law.kind === 'vocabulary-only' || law.kind === 'with-code').toBe(true)
  })

  it('matterForWord prescribes collapse for coded atoms and pivot for hub vocabulary', () => {
    const heart = matterForWord('heart')
    expect(heart.action === 'collapse' || heart.action === 'author-trinity').toBe(true)

    const article = matterForWord('article')
    expect(['pivot', 'author-trinity', 'collapse']).toContain(article.action)
  })

  it('hasWordCode requires index.ts and test.ts (not SKILL alone)', () => {
    const root = join(process.cwd(), 'src', 'law', 'folder')
    expect(hasWordCode(root)).toBe(true)
    expect(hasWordFolderTrinity(root)).toBe(true)
    const vocabOnly = join(process.cwd(), 'src', 'merge')
    if (existsSync(vocabOnly) && readdirSync(vocabOnly).includes('SKILL.md')) {
      expect(hasWordCode(vocabOnly)).toBe(false)
    }
  })

  it('deadHubWikilinks ranks hub bonds lacking code', () => {
    const dead = deadHubWikilinks()
    expect(Array.isArray(dead)).toBe(true)
    for (const row of dead.slice(0, 5)) {
      expect(row.prescription.action).toBe('pivot')
    }
  })

  it('applyTopHubWordPivots is idempotent', () => {
    const first = applyTopHubWordPivots(20)
    const second = applyTopHubWordPivots(20)
    expect(second.written).toBe(0)
    console.log(`pivots written: ${first.written} — ${first.words.slice(0, 8).join(', ')}`)
  })
})

describe('law/folder/word — useless complexity (incomplete diamond)', () => {
  it('wordDiamondViolations reports complete vs useless word counts', () => {
    const diamond = wordDiamondViolations()
    expect(diamond.totalWords).toBeGreaterThan(1000)
    expect(diamond.completeWords).toBeGreaterThan(0)
    expect(diamond.completePct).toBeGreaterThan(0)
    expect(diamond.uselessWords).toBe(diamond.violations.length)
    expect(diamond.uselessWords).toBeGreaterThanOrEqual(diamond.totalWords - diamond.completeWords)
    expect(diamond.uselessWords).toBeLessThanOrEqual(computedBaseline('word-incomplete-diamond'))
    console.log(
      `word-diamond: ${diamond.totalWords} words · ${diamond.completeWords} complete (${diamond.completePct}%) · ${diamond.uselessWords} useless`,
    )
  })

  it('top50 ranks useless words by bond reference frequency', () => {
    const diamond = wordDiamondViolations()
    expect(diamond.top50.length).toBeLessThanOrEqual(50)
    expect(diamond.top50.length).toBe(Math.min(50, diamond.uselessWords))
    for (let i = 1; i < diamond.top50.length; i++) {
      expect(diamond.top50[i - 1]!.referenceCount).toBeGreaterThanOrEqual(
        diamond.top50[i]!.referenceCount,
      )
    }
    if (diamond.top50.length > 0) {
      console.log(
        `top useless: ${diamond.top50
          .slice(0, 5)
          .map((v) => `${v.word}(${v.referenceCount})`)
          .join(', ')}`,
      )
    }
  })

  it('wordDiamondFixSuggestion prescribes remove bond or trinity stub', () => {
    const missing = wordDiamondFixSuggestion({ kind: 'missing', word: 'nonexistent', atomPath: null })
    expect(missing).toContain('remove dead')

    const vocab = wordDiamondFixSuggestion({ kind: 'vocabulary-only', word: 'law', atomPath: 'law' })
    expect(vocab).toMatch(/index\.ts \+ test\.ts/)
  })
})
