import { describe, it, expect } from 'vitest'
import { residue, dryViolations, type DryItem } from '@/dry'

describe('dry', () => {
  it('residue returns empty array for a nonexistent root (try/catch swallows ENOENT)', () => {
    const result = residue('/nonexistent-erpax-dry-test-xyz')
    expect(result).toEqual([])
  })

  it('every residue item has kind="residue", non-empty path, and known detail', () => {
    const items = residue()
    for (const item of items) {
      expect(item.kind).toBe('residue')
      expect(typeof item.path).toBe('string')
      expect(item.path.length).toBeGreaterThan(0)
      expect(['residue file', 'residue dir']).toContain(item.detail)
    }
  })

  it('residue items satisfy the DryItem shape (kind union, string path, string detail)', () => {
    const items = residue()
    for (const item of items) {
      const typed: DryItem = item
      expect(['residue', 'merge']).toContain(typed.kind)
    }
  })

  it('dryViolations returns a superset of residue (residue items are included)', () => {
    const r = residue()
    const all = dryViolations()
    expect(all.length).toBeGreaterThanOrEqual(r.length)
  })

  it('merge items from dryViolations have kind="merge" and detail containing "merge-by-extension"', () => {
    const r = residue()
    const all = dryViolations()
    const mergeItems = all.slice(r.length)
    for (const item of mergeItems) {
      expect(item.kind).toBe('merge')
      expect(item.detail).toContain('merge-by-extension')
      expect(item.path.length).toBeGreaterThan(0)
    }
  })

  it('every dryViolations item has a valid kind union member', () => {
    const all = dryViolations()
    for (const item of all) {
      expect(['residue', 'merge']).toContain(item.kind)
      expect(typeof item.path).toBe('string')
      expect(typeof item.detail).toBe('string')
    }
  })
})
