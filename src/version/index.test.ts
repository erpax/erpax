import { describe, it, expect } from 'vitest'
import { corpusContentUuid, corpusSize, corpusVersion, versionMatchesCorpus } from '@/version'

describe('version — the corpus-derived, content-addressed version (skill-based, automatic)', () => {
  it('the corpus content-uuid is deterministic and uuid-shaped (same corpus ⇒ same id)', () => {
    const a = corpusContentUuid()
    const b = corpusContentUuid()
    expect(a).toBe(b) // re-derivable on any clone
    expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })

  it('the corpus has size, and the version carries semver + the corpus-uuid as build metadata', () => {
    expect(corpusSize()).toBeGreaterThan(0)
    const v = corpusVersion('1.0.0')
    expect(v).toMatch(/^1\.0\.0\+[0-9a-f]{8}$/) // SemVer 2.0.0 build metadata = the corpus-uuid
  })

  it('a version matches the corpus iff its build-metadata still equals the live corpus-uuid (no drift)', () => {
    expect(versionMatchesCorpus(corpusVersion('1.0.0'))).toBe(true) // derived now ⇒ matches
    expect(versionMatchesCorpus('1.0.0+00000000')).toBe(false) // stale/forged suffix ⇒ caught
    expect(versionMatchesCorpus('1.0.0')).toBe(false) // no build metadata ⇒ not corpus-pinned
  })
})

import { stableReleaseTag, isStableTag } from './index'

describe('stableReleaseTag — stable requires the WHOLE chain (gates ∧ build ∧ deploy)', () => {
  const ok = { gatesGreen: true, buildOk: true, deployOk: true }
  it('the full chain green ⇒ a stable, content-addressed tag', () => {
    const t = stableReleaseTag('1.2.3', ok)
    expect(t.version).toMatch(/^1\.2\.3\+[0-9a-f]{8}$/)
    expect(t.stable).toBe(true)
    expect(t.failed).toEqual([])
    expect(isStableTag(t)).toBe(true)
  })
  it('gates green but deploy FAILS ⇒ NOT stable (a release that ships nothing is not stable)', () => {
    const t = stableReleaseTag('1.2.3', { ...ok, deployOk: false })
    expect(t.stable).toBe(false)
    expect(t.failed).toEqual(['deploy'])
    expect(isStableTag(t)).toBe(false)
  })
  it('names every failed stage', () => {
    expect(stableReleaseTag('1.2.3', { gatesGreen: false, buildOk: false, deployOk: false }).failed).toEqual(['gates', 'build', 'deploy'])
  })
})
