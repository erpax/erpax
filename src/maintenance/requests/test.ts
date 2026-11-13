import { describe, it, expect } from 'vitest'
import { requestsPreset, requestsWhere } from '@/maintenance/requests'
import MaintenanceWorkOrders, { maintenancePresets, requestStages, workStages } from '@/maintenance/work/orders'

// A maintenance request is no longer a collection: it is a work order before the work is planned.
describe('maintenance/requests — the reported stage of work orders', () => {
  it('selects the work orders still at a request stage', () => {
    expect(requestsWhere()).toEqual({ status: { in: ['new', 'triaged', 'on_hold', 'rejected', 'duplicate'] } })
  })

  it('is a saved list over work orders, and Work orders is its complement — no stage is in both', () => {
    expect(requestsPreset().relatedCollection).toBe('maintenance-work-orders')
    expect(maintenancePresets().map((p) => p.title)).toEqual(['Requests', 'Work orders'])
    expect(requestStages().filter((s) => workStages().includes(s))).toEqual([])
  })

  it('every request and work stage is a status the collection actually has', () => {
    const status = MaintenanceWorkOrders.fields.find((f) => 'name' in f && f.name === 'status') as { options?: { value: string }[] }
    const values = new Set(status.options!.map((o) => o.value))
    for (const s of [...requestStages(), ...workStages()]) expect(values.has(s), s).toBe(true)
  })

  it('keeps the request-only facts on the work order, and no longer points at a separate request', () => {
    const names = new Set(MaintenanceWorkOrders.fields.flatMap((f) => ('name' in f ? [f.name] : [])))
    for (const n of ['reportedBy', 'reportedByName', 'reportedByEmail', 'reportedAt', 'targetResolutionAt', 'photos', 'triagedBy', 'triagedAt', 'closedAt', 'closureNote']) expect(names.has(n), n).toBe(true)
    expect(names.has('request')).toBe(false)
  })

  it('carries every kind of work a request could name', () => {
    const type = MaintenanceWorkOrders.fields.find((f) => 'name' in f && f.name === 'workType') as { options?: { value: string }[] }
    const values = new Set(type.options!.map((o) => o.value))
    for (const v of ['corrective', 'preventive', 'predictive', 'improvement', 'compliance', 'safety', 'cleaning', 'move', 'other']) expect(values.has(v), v).toBe(true)
  })
})
