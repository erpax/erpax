/**
 * port — proof the Rosetta mapping diamond is content-addressed.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { portDiamond, portMappingUuid } from '@/port'

describe('port — Rosetta diamond', () => {
  it('portMappingUuid is deterministic', () => {
    const a = portMappingUuid('rails', 'payload', 'invoices')
    const b = portMappingUuid('rails', 'payload', 'invoices')
    expect(a).toBe(b)
    expect(a).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('portDiamond folds stages into a stable computationUuid', () => {
    const a = portDiamond('activeadmin', 'payload', 'work-orders')
    const b = portDiamond('activeadmin', 'payload', 'work-orders')
    expect(a.computationUuid).toBe(b.computationUuid)
    expect(a.mappingUuid).toBe(b.mappingUuid)
    expect(a.stages.map((s) => s.stage)).toEqual(['map', 'seal', 'uuid'])
  })

  it('different atom paths ⇒ different mapping uuids', () => {
    const a = portMappingUuid('rails', 'payload', 'invoices')
    const b = portMappingUuid('rails', 'payload', 'payments')
    expect(a).not.toBe(b)
  })
})
