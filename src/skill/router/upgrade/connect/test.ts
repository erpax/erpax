import { describe, it, expect } from 'vitest'
import { buildUpgradeContext } from './index'

describe('skill/router/upgrade/connect', () => {
  it('buildUpgradeContext returns a context with corpus leaves', () => {
    const ctx = buildUpgradeContext()
    expect(ctx.corpusLeaves.size).toBeGreaterThan(0)
    expect(typeof ctx.cwd).toBe('string')
  })
})
