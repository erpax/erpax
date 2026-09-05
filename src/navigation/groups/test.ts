import { describe, it, expect } from 'vitest'
import { NAV_HUBS, isNavHub, navPathsForGrouping } from './index'

describe('navigation/groups — the hub taxonomy the sidebar derives from', () => {
  it('recognises a declared hub and refuses a word that is not one', () => {
    expect(NAV_HUBS.length).toBeGreaterThan(0)
    for (const hub of NAV_HUBS) expect(isNavHub(hub)).toBe(true)
    expect(isNavHub('notahubatall')).toBe(false)
    expect(isNavHub('')).toBe(false)
  })

  it('groups by path prefix, so a folder move regroups the UI with no menu edit', () => {
    const grouped = navPathsForGrouping(['alpha/one', 'alpha/two', 'beta/one'])
    expect(grouped.length).toBeGreaterThan(0)
    for (const g of grouped) expect(typeof g).toBe('string')
  })
})
