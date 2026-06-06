import { describe, it, expect } from 'vitest'
import { appCount, installable, offlineRoundtrip } from '@/quantum/pwa'

describe('quantum/pwa — the corpus as a PWA of quantum apps', () => {
  it('installable: every folder is a quantum app', () => {
    expect(installable()).toBe(true)
    expect(appCount()).toBeGreaterThan(0)
  })
  it('offline by content-address: a cached asset round-trips by its content-uuid', () => {
    expect(offlineRoundtrip('/x.json', '{"a":1}')).toBe(true)
  })
})
