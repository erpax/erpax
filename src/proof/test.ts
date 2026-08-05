import { describe, it, expect } from 'vitest'
import { runProofOfSystem } from './index'

describe('proof', () => {
  it('All proof layers pass', async () => {
    const report = await runProofOfSystem()
    expect(report.allPassed).toBe(true)
  })
})
