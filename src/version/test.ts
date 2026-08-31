import { describe, it, expect } from 'vitest'
import { corpusContentUuid, corpusSize, corpusVersion, versionMatchesCorpus } from '@/version'
import { SKILL_INDEX } from '@/skill/router'

describe('version — the corpus-derived, content-addressed version (skill-based, automatic)', () => {
  it('the corpus content-uuid is deterministic and uuid-shaped (same corpus ⇒ same id)', () => {
    const a = corpusContentUuid()
    const b = corpusContentUuid()
    expect(a).toBe(b) // re-derivable on any clone
    expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })

  it('the version carries semver + the corpus-uuid as build metadata, in BOTH index shapes', () => {
    // SKILL_INDEX is stubbed EMPTY in CI and every deploy by design — `.github/actions/setup`
    // defaults to `skill-index: stub` and calls the 68MB emit "local research only". So a bare
    // `size > 0` asserted something CI cannot satisfy, and this suite has been red since that
    // default landed (2026-07-28), inside a batch the wave runner never reached. Both shapes are
    // asserted instead: the stub is EXACTLY empty (a non-empty stub would be a contradiction) and
    // a full index has size — and the derived version shape must hold either way.
    expect(corpusSize()).toBe(SKILL_INDEX.length)
    if (SKILL_INDEX.length === 0) expect(corpusSize()).toBe(0)
    else expect(corpusSize()).toBeGreaterThan(0)
    const v = corpusVersion('1.0.0')
    expect(v).toMatch(/^1\.0\.0\+[0-9a-f]{8}$/) // SemVer 2.0.0 build metadata = the corpus-uuid
  })

  it('a version matches the corpus iff its build-metadata still equals the live corpus-uuid (no drift)', () => {
    expect(versionMatchesCorpus(corpusVersion('1.0.0'))).toBe(true) // derived now ⇒ matches
    expect(versionMatchesCorpus('1.0.0+00000000')).toBe(false) // stale/forged suffix ⇒ caught
    expect(versionMatchesCorpus('1.0.0')).toBe(false) // no build metadata ⇒ not corpus-pinned
  })
})
