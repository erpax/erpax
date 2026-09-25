import { describe, it, expect } from 'vitest'
import { checkMarketingTransparency, ERPAX_DEFAULT_VOICE } from './index'

const clean = { declaredStandards: [{ body: 'ISO/IEC', id: '25010' }], sourceTenant: 'erpax-platform' }

describe('website/marketing — the gate on the surface a prospect cannot check', () => {
  it('a grounded page from the platform tenant passes', () => {
    const r = checkMarketingTransparency({ ...clean, pageBody: 'erpax seals every atom through one content-uuid.' })
    expect(r.ok).toBe(true)
    expect(r.findings.filter((f) => f.severity === 'critical')).toEqual([])
  })

  it('blocks the over-claim this corpus just healed 41 times', () => {
    const r = checkMarketingTransparency({
      ...clean,
      pageBody: '<h1>erpax</h1><p>zero entropy ⇒ infinite tamper-cost.</p>',
    })
    expect(r.ok).toBe(false)
    expect(r.findings.map((f) => f.check)).toContain('over-claim-bare-implication')
  })

  it('reads through markup — a claim inside a tag is still a claim', () => {
    const r = checkMarketingTransparency({ ...clean, pageBody: '<em>zero</em> <b>entropy</b> ⇒ ∞ tamper-cost' })
    expect(r.findings.map((f) => f.check)).toContain('over-claim-bare-implication')
  })

  it('the QUALIFIED statement is what the corpus actually claims, and it passes', () => {
    const r = checkMarketingTransparency({
      ...clean,
      pageBody: 'Forge cost is min(−checks·log₂(1 − coverage), anchorBits) — finite, and unbounded only as coverage → 1.',
    })
    expect(r.findings.map((f) => f.check)).not.toContain('over-claim-bare-implication')
    expect(r.ok).toBe(true)
  })

  it('still blocks PII and a non-platform source tenant', () => {
    const pii = checkMarketingTransparency({ ...clean, pageBody: 'Contact real.person@customer.example for a demo.' })
    expect(pii.ok).toBe(false)
    const tenant = checkMarketingTransparency({ ...clean, sourceTenant: 'acme-ltd', pageBody: 'hello' })
    expect(tenant.findings.map((f) => f.check)).toContain('source-tenant-not-platform')
    // a documented synthetic tenant is allowed
    expect(checkMarketingTransparency({ ...clean, sourceTenant: 'synthetic-demo', pageBody: 'hello' }).ok).toBe(true)
  })

  it('the default voice is the plain one — the corpus does not market in superlatives', () => {
    expect(ERPAX_DEFAULT_VOICE).toBe('plain-precise')
  })
})
