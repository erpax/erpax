import { describe, it, expect } from 'vitest'
import { exchange, type ExchangeRequest, type ExchangeGrant } from '@/exchange'

const patient = { domain: 'patient-ai', uuid: 'patient-uuid' }
const clinic = { domain: 'medicare-clinic', uuid: 'clinic-uuid' }
const TS = '2026-06-02T00:00:00.000Z'

const request = (over: Partial<ExchangeRequest> = {}): ExchangeRequest => ({
  from: patient,
  to: clinic,
  capability: 'read:appointments',
  fields: ['appointmentDate', 'prescriptionStatus', 'otherPatientData'],
  ...over,
})

describe('exchange — governed cross-domain data exchange with provenance', () => {
  it('gates the capability, sanitizes to releasable fields, and receipts the exchange', () => {
    const grant: ExchangeGrant = { capability: 'read:appointments', releasableFields: ['appointmentDate', 'prescriptionStatus'] }
    const r = exchange({ request: request(), grant, head: null, timestampIso: TS })
    expect(r.allowed).toBe(true)
    expect(r.released).toEqual(['appointmentDate', 'prescriptionStatus']) // otherPatientData stripped at the boundary
    expect(r.receipt.seq).toBe(0)
    expect(r.receipt.leafUuid).toMatch(/^[0-9a-f]{64}$/) // the provenance entry
  })

  it('blocks a capability the grant does not permit — and still receipts the denial', () => {
    const grant: ExchangeGrant = { capability: 'read:appointments', releasableFields: ['appointmentDate'] }
    const r = exchange({ request: request({ capability: 'write:appointments' }), grant, head: null, timestampIso: TS })
    expect(r.allowed).toBe(false)
    expect(r.released).toEqual([]) // nothing crosses the edge
    expect(r.receipt.leafUuid).toMatch(/^[0-9a-f]{64}$/) // the denial is provenance too
  })

  it('chains provenance across a multi-hop exchange (the chain merges across domains)', () => {
    const grant: ExchangeGrant = { capability: 'read:appointments', releasableFields: ['appointmentDate'] }
    const r0 = exchange({ request: request(), grant, head: null, timestampIso: TS })
    const r1 = exchange({ request: request({ from: clinic, to: patient }), grant, head: r0.receipt, timestampIso: TS })
    expect(r1.receipt.seq).toBe(1)
    expect(r1.receipt.prevLeafUuid).toBe(r0.receipt.leafUuid)
  })
})
