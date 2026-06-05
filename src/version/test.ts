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
