import { describe, it, expect } from 'vitest'
import { scanEducateGaps, selfEducateCycle } from './educate'
import { resetSecurityMonitorForTests } from '@/agent/security'
describe('educate', () => {
  it('scan', () => expect(scanEducateGaps(process.cwd()).gaps.length).toBeLessThanOrEqual(90))
  it('cycle', () => { resetSecurityMonitorForTests(); expect(selfEducateCycle({ batch: 5, dryRun: true }).wave.aborted).toBe(false) })
})
