import { describe, it, expect } from 'vitest'
import { atomCount, repoUrl } from './emit'

describe('plugins/emit — Claude plugin manifests', () => {
  it('reads repo identity from package.json or git', () => {
    expect(repoUrl()).toMatch(/^https?:\/\//)
  })

  it('counts live skill atoms under src/', () => {
    expect(atomCount()).toBeGreaterThan(0)
  })
})
