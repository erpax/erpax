/**
 * quantum/bindings — attach-all senses; gate each call.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { ALWAYS_QUANTUM, bindingInventory, gatedBindingCallHolds, quantumModeDefault } from '@/quantum/bindings'
import { parseWranglerBindings } from '@/cloudflare'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

describe('quantum/bindings — attach-all inventory from live wrangler', () => {
  it('bindingInventory matches parseWranglerBindings names', () => {
    const text = readFileSync(join(process.cwd(), 'wrangler.jsonc'), 'utf8')
    const expected = parseWranglerBindings(text)
      .map((e) => e.bindingName)
      .sort()
    expect(bindingInventory()).toEqual(expected)
    expect(bindingInventory().length).toBeGreaterThan(0)
  })
})

describe('quantum/bindings — always quantum default', () => {
  it('quantumModeDefault is true (lawful ALWAYS_QUANTUM)', () => {
    expect(ALWAYS_QUANTUM).toBe(true)
    expect(quantumModeDefault()).toBe(true)
  })
})

describe('quantum/bindings — gate each call, not the binding list', () => {
  it('gatedBindingCallHolds requires access · broker · receipt', () => {
    expect(gatedBindingCallHolds({ access: true, broker: true, receipt: true })).toBe(true)
    expect(gatedBindingCallHolds({ access: false, broker: true, receipt: true })).toBe(false)
    expect(gatedBindingCallHolds({ access: true, broker: false, receipt: true })).toBe(false)
    expect(gatedBindingCallHolds({ access: true, broker: true, receipt: false })).toBe(false)
  })
})
