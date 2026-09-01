import { describe, it, expect } from 'vitest'
import { checkSkillFrontmatter, NAME_FOLDER_EXCEPTIONS, HYPHENATED_FOLDER_GRANDFATHER } from './index'

describe('skill/frontmatter — atom naming gate', () => {
  it('passes on the live corpus', () => {
    const result = checkSkillFrontmatter()
    expect(result.ok).toBe(true)
    expect(result.files).toBeGreaterThan(0)
  })

  it('grandfather sets are explicit and bounded — and the hyphen list has ratcheted to empty', () => {
    expect(NAME_FOLDER_EXCEPTIONS.size).toBeGreaterThan(0)
    // It held 6 hyphenated folders. Every one has since been renamed, so the exception list is
    // EMPTY and the gate now forbids a hyphenated atom folder outright — pinning the old count
    // made the suite fail on the SUCCESS of the renames. The set may only ever shrink; 0 is the
    // floor, and a new exception has to move this line to be added.
    expect(HYPHENATED_FOLDER_GRANDFATHER.size).toBe(0)
  })
})
