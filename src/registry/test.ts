import { describe, it, expect } from 'vitest'
import {
  publishStandard, resolveStandard,
  subscribeTenant, tenantSubscriptions,
  familyOf,
  addCitation, listCitations,
  declareConflict, listConflicts,
  declareSupersession, traceSupersession,
  checkStandardCitationsConsistent, checkStandardSupersessionsResolved,
  findSupersededSubscriptions,
} from '@/registry'

const UUID_V8_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// Standards-as-live-objects: each (body,id,version) is a uuid-keyed vortex;
// citations/conflicts/supersessions are the coupling forces between them.
describe('registry — standards as uuid-keyed live objects', () => {
  it('familyOf classifies bodies; unknown bodies default to iso', () => {
    expect(familyOf('IFRS')).toBe('ifrs-ias')
    expect(familyOf('ISO/IEC')).toBe('iso')
    expect(familyOf('EU')).toBe('eu-directive')
    expect(familyOf('NIST')).toBe('us-fed')
    expect(familyOf('RFC')).toBe('w3c-ietf')
    expect(familyOf('MCP')).toBe('cloudflare')
    expect(familyOf('OECD')).toBe('un-oecd-wco')
    expect(familyOf('SOMETHING-ELSE')).toBe('iso')
  })

  it('publishStandard content-addresses and resolveStandard round-trips', () => {
    const s = publishStandard({
      body: 'IFRS', id: 'IFRS-15', version: '2026',
      bodyText: 'Revenue from contracts with customers',
      publisherDid: 'did:erpax:t1:pub',
    })
    expect(s.uuid).toMatch(UUID_V8_RE)
    expect(s.publishedAt).toBeTruthy()
    expect(resolveStandard(s.uuid)).toEqual(s)
    expect(resolveStandard('not-a-real-uuid')).toBeUndefined()
  })

  it('subscribeTenant is idempotent per uuid', () => {
    const t = `tenant-${Math.random()}`
    subscribeTenant(t, 'u1')
    subscribeTenant(t, 'u1')
    subscribeTenant(t, 'u2')
    const subs = tenantSubscriptions(t)
    expect(subs).toContain('u1')
    expect(subs).toContain('u2')
    expect(subs.filter((s) => s === 'u1')).toHaveLength(1)
  })

  it('citations are bidirectional (outgoing/incoming)', () => {
    addCitation('A', 'B')
    expect(listCitations('A').outgoing).toContain('B')
    expect(listCitations('B').incoming).toContain('A')
  })

  it('conflicts are symmetric', () => {
    declareConflict('X', 'Y')
    expect(listConflicts('X')).toContain('Y')
    expect(listConflicts('Y')).toContain('X')
  })

  it('Law 27 — a tenant subscribed to a conflicting pair is flagged', () => {
    const t = `tenant-${Math.random()}`
    declareConflict('c1', 'c2')
    subscribeTenant(t, 'c1')
    subscribeTenant(t, 'c2')
    const res = checkStandardCitationsConsistent(t)
    expect(res.ok).toBe(false)
    expect(res.conflicts).toContainEqual({ a: 'c1', b: 'c2' })
  })

  it('a tenant with no conflicting subscriptions is consistent', () => {
    const t = `tenant-${Math.random()}`
    subscribeTenant(t, 'lone')
    expect(checkStandardCitationsConsistent(t).ok).toBe(true)
  })

  it('traceSupersession walks the chain; global edges apply everywhere', () => {
    declareSupersession({ oldUuid: 'v1', newUuid: 'v2', jurisdiction: 'global', effectiveDate: '2026-01-01' })
    declareSupersession({ oldUuid: 'v2', newUuid: 'v3', jurisdiction: 'global', effectiveDate: '2026-02-01' })
    const chain = traceSupersession('v1', 'DE')
    expect(chain.map((e) => e.newUuid)).toEqual(['v2', 'v3'])
  })

  it('Law 28 — a subscription whose uuid was superseded becomes pending', () => {
    const t = `tenant-${Math.random()}`
    declareSupersession({ oldUuid: 's-old', newUuid: 's-new', jurisdiction: 'global', effectiveDate: '2026-01-01' })
    subscribeTenant(t, 's-old')
    const res = checkStandardSupersessionsResolved(t, 'DE')
    expect(res.ok).toBe(false)
    expect(res.pending[0]).toMatchObject({ subscribedUuid: 's-old', latestUuid: 's-new', chainLength: 1 })
  })

  it('findSupersededSubscriptions proposes the rebind via supersedes link', () => {
    const t = `tenant-${Math.random()}`
    const oldStd = publishStandard({ body: 'ISO', id: 'ISO-1', version: '1', bodyText: 'a', publisherDid: 'did:erpax:t:p' })
    const newStd = publishStandard({ body: 'ISO', id: 'ISO-1', version: '2', bodyText: 'b', publisherDid: 'did:erpax:t:p', supersedes: oldStd.uuid })
    subscribeTenant(t, oldStd.uuid)
    expect(findSupersededSubscriptions(t)).toContainEqual({ oldUuid: oldStd.uuid, newUuid: newStd.uuid })
  })
})
