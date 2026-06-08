/**
 * quantum/mcp — corpus projection; gate every call.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { mcpCallGated, projectionMatchesCorpus } from '@/quantum/mcp'

describe('quantum/mcp — trust-native gate on every call', () => {
  it('mcpCallGated requires access · sandbox · receipt', () => {
    expect(mcpCallGated({ access: true, sandbox: true, receipt: true })).toBe(true)
    expect(mcpCallGated({ access: false, sandbox: true, receipt: true })).toBe(false)
  })
})

describe('quantum/mcp — tool surface is corpus projection', () => {
  it('projectionMatchesCorpus when live and corpus counts align', () => {
    expect(projectionMatchesCorpus(42, 42)).toBe(true)
    expect(projectionMatchesCorpus(42, 41)).toBe(false)
  })
})
