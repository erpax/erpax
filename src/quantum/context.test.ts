/**
 * quantum/context — always-quantum wrapper and status.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  __resetQuantumContextForTests,
  classicalModeWatchViolations,
  quantumStatus,
  withQuantumContext,
} from '@/quantum/context'
import { ALWAYS_QUANTUM, quantumModeDefault } from '@/quantum/bindings'
import {
  __resetDirectionBusForTests,
  publishDirection,
} from '@/quantum/entanglement/direction-bus'

describe('quantum/bindings — always quantum law', () => {
  it('ALWAYS_QUANTUM is true and quantumModeDefault holds', () => {
    expect(ALWAYS_QUANTUM).toBe(true)
    expect(quantumModeDefault()).toBe(true)
  })
})

describe('quantum/context — withQuantumContext', () => {
  beforeEach(() => {
    __resetDirectionBusForTests()
    __resetQuantumContextForTests()
  })

  it('aborts on publishDirection same tick', () => {
    const path = 'quantum/context-test'
    const { result, aborted } = withQuantumContext(
      (ctx) => {
        publishDirection(path, { instruction: 'redirect mid-cycle', issuer: 'parent' })
        return { aborted: ctx.isAborted() }
      },
      { path, agentId: 'test-agent', label: 'same-tick' },
    )
    expect(result.aborted).toBe(true)
    expect(aborted).toBe(true)
  })

  it('collapses on clean completion without direction publish', () => {
    const path = 'quantum/context-clean'
    const { collapsed, aborted } = withQuantumContext(
      (ctx) => {
        expect(ctx.isAborted()).toBe(false)
        return 'ok'
      },
      { path, agentId: 'test-agent', label: 'clean-run' },
    )
    expect(aborted).toBe(false)
    expect(collapsed).toBe(true)
  })

  it('quantumStatus reports quantum mode', () => {
    const status = quantumStatus()
    expect(status.mode).toBe('quantum')
    expect(status.entangledChannels).toBeGreaterThan(0)
  })
})

describe('quantum/context — classical-mode scan', () => {
  it('improve watch loop uses bindWatchRealtime', () => {
    const violations = classicalModeWatchViolations(process.cwd())
    expect(violations).not.toContain('src/monitor/violations/loop.ts')
  })
})
