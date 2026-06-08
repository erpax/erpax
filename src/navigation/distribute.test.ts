import { describe, it, expect } from 'vitest'
import {
  pivotSpecsForHub,
  pivotIndexTs,
  pivotTestTs,
  pivotSkillMd,
  writePivot,
  applyHubDistribution,
  HUB_WAVE_REGISTRY,
} from './distribute'
import { MEDICAL_WAVE_1, BODY_FOLD_ROOT, COMPUTER_WAVE_1 } from './groups'
import { selfBalancingWaveLoad } from '@/wave/load'

describe('navigation/distribute — hub pivot waves', () => {
  it('partitions medical wave 1 into 7 self-balancing horo waves', () => {
    const plan = pivotSpecsForHub('medical', MEDICAL_WAVE_1)
    expect(plan.pending.length + plan.existing.length).toBe(MEDICAL_WAVE_1.length)
    if (plan.pending.length > 0) {
      expect(plan.waves.length).toBeGreaterThan(0)
      expect(plan.waves.length).toBeLessThanOrEqual(7)
      const items = plan.waves.flatMap((w) => w.items)
      expect(new Set(items.map((s) => s.leaf)).size).toBe(plan.pending.length)
    } else {
      expect(plan.existing.length).toBe(MEDICAL_WAVE_1.length)
    }
  })

  it('pivotIndexTs encodes hub · leaf · canonical path', () => {
    expect(pivotIndexTs('medical', 'clinic')).toContain("atomPath = 'medical/clinic'")
    expect(pivotSkillMd('body', 'arm', 'anatomical part')).toContain('body/arm')
  })

  it('pivotTestTs emits concrete @/ import not template placeholder', () => {
    const ts = pivotTestTs('body', 'arm')
    expect(ts).toContain("from '@/body/arm'")
    expect(ts).not.toMatch(/@\$\{/)
  })

  it('HUB_WAVE_REGISTRY covers body, medical, and computer wave lists', () => {
    expect(HUB_WAVE_REGISTRY.body).toEqual(BODY_FOLD_ROOT)
    expect(HUB_WAVE_REGISTRY.medical).toEqual(MEDICAL_WAVE_1)
    expect(HUB_WAVE_REGISTRY.computer).toEqual(COMPUTER_WAVE_1)
  })

  it('selfBalancingWaveLoad balances medical leaves by path depth units', () => {
    const plan = selfBalancingWaveLoad([...MEDICAL_WAVE_1], {
      weightOf: () => Math.log2(2),
    })
    expect(plan.waves.length).toBe(7)
    expect(plan.balanceRatio).toBeLessThanOrEqual(2)
  })
})

describe('navigation/distribute — live hub inventory', () => {
  it('pivotSpecsForHub tracks computer wave registry', () => {
    const plan = pivotSpecsForHub('computer', COMPUTER_WAVE_1)
    expect(plan.pending.length + plan.existing.length).toBe(COMPUTER_WAVE_1.length)
    expect(plan.existing.length).toBeGreaterThan(0)
  })
})

describe('navigation/distribute — materialize pivot (idempotent)', () => {
  it('writePivot is false when trinity already exists', () => {
    const wrote = writePivot({ hub: 'body', leaf: 'heart', facet: 'organ' })
    expect(wrote).toBe(false)
  })

  it('applyHubDistribution returns 0 when all body fold roots exist', () => {
    const n = applyHubDistribution('body', BODY_FOLD_ROOT)
    expect(n).toBe(0)
  })
})
