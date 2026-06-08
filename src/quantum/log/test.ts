/**
 * quantum/log — append-only trail; length is forging difficulty.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { issueReceipt, type Decision } from '@/receipt'
import {
  forgingDifficultyLog2,
  logTamperCostLog2,
  appendOnlySeqHolds,
  verifyAgentTrail,
} from '@/quantum/log'

const decision = (over: Partial<Decision> = {}): Decision => ({
  action: 'deploy',
  actor: 'agent-uuid-1',
  outcome: 'allow',
  tier: 'Tier1',
  capabilities: ['read', 'api'],
  ...over,
})
const TS = '2026-06-08T12:00:00.000Z'

describe('quantum/log — forging difficulty rises with chain length', () => {
  it('genesis alone has zero marginal difficulty', () => {
    expect(forgingDifficultyLog2(0)).toBe(0)
    expect(forgingDifficultyLog2(1)).toBe(0)
  })

  it('each link after genesis adds ~log2(10) orders', () => {
    expect(forgingDifficultyLog2(2)).toBeCloseTo(Math.log2(10), 5)
    expect(forgingDifficultyLog2(5)).toBeCloseTo(4 * Math.log2(10), 5)
    expect(logTamperCostLog2(5)).toBe(forgingDifficultyLog2(5))
  })
})

describe('quantum/log — append-only agent trail', () => {
  it('appendOnlySeqHolds rejects gaps in seq', () => {
    const r0 = issueReceipt({ decision: decision(), head: null, timestampIso: TS })
    const r2 = issueReceipt({
      decision: decision({ action: 'x' }),
      head: r0,
      timestampIso: TS,
    })
    const r2gap = { ...r2, seq: 2 }
    expect(appendOnlySeqHolds([r0, r2gap])).toBe(false)
  })

  it('verifyAgentTrail verifies intact chain and reports forging difficulty', async () => {
    const d0 = decision({ action: 'read' })
    const d1 = decision({ action: 'deploy', outcome: 'block' })
    const r0 = issueReceipt({ decision: d0, head: null, timestampIso: TS })
    const r1 = issueReceipt({ decision: d1, head: r0, timestampIso: TS })
    const v = await verifyAgentTrail([r0, r1], [d0, d1])
    expect(v.ok).toBe(true)
    expect(v.chainLength).toBe(2)
    expect(v.forgingDifficultyLog2).toBe(forgingDifficultyLog2(2))
  })
})
