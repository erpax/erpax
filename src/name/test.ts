import { describe, it, expect } from 'vitest'
import { uuidOfName, exists, samePath } from '@/name'

describe('name — the naming law (name ≡ path ≡ uuid)', () => {
  it('the name IS the path IS the uuid — uuidOfName is deterministic', () => {
    const u = uuidOfName('deploy')
    expect(u).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(uuidOfName('deploy')).toBe(u)
  })
  it('once you name it, it exists', () => {
    expect(exists('anything')).toBe(true)
    expect(exists('')).toBe(false)
  })
  it('even an empty folder folds — uuidOfName is total (content-independent)', () => {
    expect(uuidOfName('a-folder-with-no-files-at-all')).toMatch(/^[0-9a-f]{8}-/)
    expect(exists('a-folder-with-no-files-at-all')).toBe(true)
  })
  it('name ≡ path: the chain cannot break — same name same node, different names different', () => {
    expect(samePath('work', 'work')).toBe(true)
    expect(samePath('work', 'orders')).toBe(false)
  })
})
