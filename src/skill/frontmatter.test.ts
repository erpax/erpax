import { describe, it, expect } from 'vitest'
import { checkSkillFrontmatter, NAME_FOLDER_EXCEPTIONS, HYPHENATED_FOLDER_GRANDFATHER } from './frontmatter'

describe('skill/frontmatter — atom naming gate', () => {
  it('passes on the live corpus', () => {
    const result = checkSkillFrontmatter()
    expect(result.ok).toBe(true)
    expect(result.files).toBeGreaterThan(0)
  })

  it('grandfather sets are explicit and bounded', () => {
    expect(NAME_FOLDER_EXCEPTIONS.size).toBeGreaterThan(0)
    expect(HYPHENATED_FOLDER_GRANDFATHER.size).toBe(6)
  })
})
