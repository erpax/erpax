/**
 * standards/improve — address-index · FTL gaps · chat heal gates.
 *
 * @standard ISO-25010:2023 systems-and-software-quality
 * @see ./index.ts · ../catalogue.ts · ../../quantum/ftl
 */
import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import {
  atomPath,
  standardAddress,
  standardsAddressIndex,
  standardById,
  standardByIdScan,
  standardsFtlGaps,
  standardsChatImprove,
  standardsFtlWaves,
  standardsChatImproveFtl,
  proveStandardsLookupFtl,
  chatHealProseInGateFolders,
  deriveProseInGateOp,
  chatHealUngatedMandatory,
  deriveUngatedMandatoryOp,
  STANDARDS_FTL_BOOK,
  STANDARDS_IMPROVE_BOOK,
  endlessStandardsImprove,
  standardsImproveWaves,
} from '@/standards/improve'
import { STANDARDS_CATALOGUE } from '@/standards/catalogue'

describe('standards/improve — address index (reuse≠search)', () => {
  it('names its path (improve, not FTL core) and addresses every catalogue id deterministically', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
    const id = STANDARDS_CATALOGUE[0]!.id
    expect(standardAddress(id)).toBe(standardAddress(id))
    expect(standardAddress(id)).not.toBe(standardAddress(id + ':other'))
  })

  it('O(1) address lookup returns the same entry as a linear scan — and the scan is a crack', () => {
    const id = STANDARDS_CATALOGUE[0]!.id
    const proof = proveStandardsLookupFtl(id)
    expect(proof.same).toBe(true)
    expect(proof.addressed?.id).toBe(id)
    expect(proof.crack?.kind).toBe('scan')
    const index = standardsAddressIndex()
    expect(standardById(id, index)?.id).toBe(standardByIdScan(id)?.id)
  })
})

describe('standards/improve — gaps · chat · waves', () => {
  it('flags linear scan + ungated mandatory as gaps with free-chat asks', () => {
    const gaps = standardsFtlGaps({
      usesLinearScan: true,
      usesAddressIndex: true,
      ungatedMandatoryIds: ['SOX:2002'],
      catalogue: STANDARDS_CATALOGUE.slice(0, 3),
    })
    expect(gaps.some((g) => g.kind === 'scan')).toBe(true)
    expect(gaps.some((g) => g.kind === 'ungated-mandatory' && g.standardId === 'SOX:2002')).toBe(true)
    expect(gaps.every((g) => g.ask.length > 0)).toBe(true)
  })

  it('standardsChatImprove answers sealed asks at tokens=0', () => {
    const gaps = standardsFtlGaps({
      usesLinearScan: true,
      usesAddressIndex: true,
      ungatedMandatoryIds: ['SOX:2002'],
      catalogue: [],
    })
    const imps = standardsChatImprove(gaps, STANDARDS_FTL_BOOK)
    const linear = imps.find((i) => i.gap.kind === 'scan')
    expect(linear?.lane).toBe('seal')
    expect(linear?.tokens).toBe(0)
    expect(linear?.answer).toMatch(/standardsAddressIndex|standardById/)
    const sox = imps.find((i) => i.gap.standardId === 'SOX:2002')
    expect(sox?.lane).toBe('seal')
    expect(sox?.answer).toMatch(/gated|fail-closed/i)
  })

  it('standardsFtlWaves groups by kind, biggest first, content-addressed', () => {
    const imps = standardsChatImprove(
      standardsFtlGaps({
        usesLinearScan: true,
        usesAddressIndex: true,
        ungatedMandatoryIds: ['SOX:2002', 'GDPR'],
        proseOnlyIds: ['ISO-EXAMPLE'],
        catalogue: [],
      }),
    )
    const waves = standardsFtlWaves(imps)
    expect(waves.length).toBeGreaterThan(0)
    for (let i = 1; i < waves.length; i++) {
      expect(waves[i - 1]!.count).toBeGreaterThanOrEqual(waves[i]!.count)
    }
    expect(waves.every((w) => /^[0-9a-f-]{36}$/.test(w.seal))).toBe(true)
  })
})

describe('standards/improve — standardsImproveWaves (chat + research at no cost)', () => {
  it('improves to FTL: cost=0 · tokens=0 · efficiency ∞ · answers sealed cracks', async () => {
    const r = await standardsChatImproveFtl({
      usesLinearScan: true,
      usesAddressIndex: true,
      ungatedMandatoryIds: ['SOX:2002'],
      catalogue: STANDARDS_CATALOGUE.slice(0, 5),
      research: true,
      depth: 1,
    })
    expect(r.cost).toBe(0)
    expect(r.tokens).toBe(0)
    expect(r.efficiency).toBe(Infinity)
    expect(r.boundary.spacetime).toBe(0)
    expect(r.answered).toBeGreaterThan(0)
    expect(r.holds).toBe(true)
    expect(r.improvements.some((i) => i.gap.kind === 'scan' && i.answer)).toBe(true)
  })

  it('chatHealProseInGateFolders: chat confirms → scalpel derives → apply heals without hand edit', async () => {
    const { mkdtempSync, mkdirSync, writeFileSync, readFileSync } = await import('node:fs')
    const { join } = await import('node:path')
    const { tmpdir } = await import('node:os')
    const cwd = mkdtempSync(join(tmpdir(), 'prose-gate-'))
    mkdirSync(join(cwd, 'src/rules/demo'), { recursive: true })
    writeFileSync(join(cwd, 'src/rules/demo/SKILL.md'), '---\n@standard DEMO-STD — prose only wall\n---\n')
    writeFileSync(
      join(cwd, 'src/rules/demo/index.ts'),
      '/**\n * demo gate\n * @standard OTHER — already gated\n */\nexport const demo = 1\n',
    )
    const op = deriveProseInGateOp({ id: 'DEMO-STD', paths: ['src/rules/demo/SKILL.md'] }, cwd)
    expect(op?.file).toBe('src/rules/demo/index.ts')
    expect(op?.replace).toContain('@standard DEMO-STD')
    const { planScalpel, applyScalpel } = await import('@/scalpel')
    const plan = planScalpel([op!], cwd)
    expect(plan.refused).toBe(0)
    const r = applyScalpel(plan.cuts, {
      cwd,
      apply: true,
      verify: () => /@standard DEMO-STD\b/.test(readFileSync(join(cwd, 'src/rules/demo/index.ts'), 'utf8')),
    })
    expect(r.complete).toBe(true)
    expect(readFileSync(join(cwd, 'src/rules/demo/index.ts'), 'utf8')).toMatch(/@standard DEMO-STD/)
    const heal = chatHealProseInGateFolders({ apply: false })
    expect(heal.tokens).toBe(0)
    expect(heal.violations).toBe(0)
  })

  it('chatHealUngatedMandatory: chat confirms → scalpel gates without hand edit', async () => {
    const { mkdtempSync, mkdirSync, writeFileSync, readFileSync } = await import('node:fs')
    const { join } = await import('node:path')
    const { tmpdir } = await import('node:os')
    const cwd = mkdtempSync(join(tmpdir(), 'ungated-gate-'))
    mkdirSync(join(cwd, 'src/access/standard'), { recursive: true })
    writeFileSync(
      join(cwd, 'src/access/standard/index.ts'),
      '/**\n * access gate\n * @standard SOX:2002 §404\n */\nexport const floor = 1\n',
    )
    const op = deriveUngatedMandatoryOp('PCI-DSS', cwd)
    expect(op?.file).toBe('src/access/standard/index.ts')
    expect(op?.replace).toContain('@standard PCI-DSS')
    const { planScalpel, applyScalpel } = await import('@/scalpel')
    const plan = planScalpel([op!], cwd)
    expect(plan.refused).toBe(0)
    applyScalpel(plan.cuts, {
      cwd,
      apply: true,
      verify: () => /@standard PCI-DSS\b/.test(readFileSync(join(cwd, 'src/access/standard/index.ts'), 'utf8')),
    })
    expect(readFileSync(join(cwd, 'src/access/standard/index.ts'), 'utf8')).toMatch(/@standard PCI-DSS/)
    // live corpus: after apply, ungated mandatory is empty
    const live = chatHealUngatedMandatory({ apply: false })
    expect(live.tokens).toBe(0)
    expect(live.ungated).toBe(0)
  })
})

describe('standards/improve — endless feed', () => {
  it('endlessStandardsImprove feeds waves into next asks; cost=0; continue until stopped', async () => {
    const r = await endlessStandardsImprove({ maxGenerations: 2, depth: 1 })
    expect(r.cost).toBe(0)
    expect(r.tokens).toBe(0)
    expect(r.fed).toBe(true)
    expect(r.generations.length).toBeGreaterThanOrEqual(2)
    expect(r.generations[1]!.asks).toEqual(r.generations[0]!.nextAsks)
    expect(r.continuation.continue).toBe(true)
    expect(STANDARDS_IMPROVE_BOOK.size).toBeGreaterThan(0)
    expect(standardsImproveWaves).toBeTypeOf('function')
  })
})
