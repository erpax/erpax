import { describe, it, expect } from 'vitest'
import * as barrel from './index'

describe('header/hook — the canonical entry point', () => {
  it('offers revalidateHeader, so an importer names the folder rather than a file inside it', () => {
    expect(Object.hasOwn(barrel, 'revalidateHeader')).toBe(true)
  })

  it('every member it offers is real — a barrel that re-exports nothing is a dead address', () => {
    const members = Object.values(barrel)
    expect(members.length).toBeGreaterThan(0)
    for (const m of members) expect(m === undefined).toBe(false)
  })
})
