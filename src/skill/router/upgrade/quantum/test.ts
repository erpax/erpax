import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect, beforeAll } from 'vitest'
import {
  parseQuantumSkill,
  generateQuantumSkill,
  upgradeQuantumSkillText,
  inferQuantumEnvironment,
  isQuantumSkillPath,
  collapseTriggersOf,
  entangledFieldsOf,
  mergeEntangledFields,
} from './index'
import { connectFrontmatter, buildUpgradeContext, upgradeSkillText, type UpgradeContext } from '../index'

const readSkill = (atomPath: string): string =>
  readFileSync(join(process.cwd(), 'src', atomPath, 'SKILL.md'), 'utf8')

describe('skill/router/upgrade/quantum — parseQuantumSkill', () => {
  it('extracts law, bonds, path account code, and environment from quantum/emr', () => {
    const md = readSkill('quantum/emr')
    const parsed = parseQuantumSkill(md)
    expect(parsed.atomPath).toBe('quantum/emr')
    expect(parsed.pathAccountCode).toBe('quantum/emr')
    expect(parsed.law).toMatch(/\[\[analog\]\] results/)
    expect(parsed.bonds.in).toContain('patient')
    expect(parsed.bonds.in).toContain('quantum')
    expect(parsed.collapseTriggers.some((t) => /Use when/i.test(t))).toBe(true)
    expect(parsed.environment.seal.analogResults).toBe(true)
    expect(parsed.environment.seal.pathFollow).toBe(true)
    expect(parsed.entangledFields.some((f) => f.field === 'neighbors.wikilink')).toBe(true)
  })

  it('extracts device collapse triggers and measurement boundary law', () => {
    const md = readSkill('quantum/device')
    const parsed = parseQuantumSkill(md)
    expect(parsed.pathAccountCode).toBe('quantum/device')
    expect(parsed.law).toMatch(/collapse what is physically real/)
    expect(parsed.environment.seal.analogResults).toBe(true)
    expect(collapseTriggersOf(md).some((t) => t.includes('measurement'))).toBe(true)
  })

  it('detects wikilink entanglement drift between frontmatter and body', () => {
    const fm = readSkill('quantum/emr').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
    const body = readSkill('quantum/emr').replace(/^---[\s\S]*?---\n?/, '')
    const fields = entangledFieldsOf(fm, body)
    const wikilink = fields.find((f) => f.field === 'neighbors.wikilink')
    expect(wikilink?.hookless).toBe(true)
    expect(wikilink?.partners.length).toBeGreaterThan(0)
  })

  it('merges collection registry fields when parsing invoices atom', () => {
    const md = readSkill('invoices')
    const parsed = parseQuantumSkill(md)
    expect(parsed.entangledFields.some((f) => f.field === 'invoices.number')).toBe(true)
    const numberField = parsed.entangledFields.find((f) => f.field === 'invoices.number')
    expect(numberField?.collapse).toContain('deriveInvoiceNumber')
    expect(numberField?.hookless).toBe(false)
  })
})

describe('skill/router/upgrade/quantum — parseQuantumSkill speech/writing', () => {
  it('infers speechResults seal for speech and writing partitions', () => {
    const speech = parseQuantumSkill(readSkill('speech'))
    const writing = parseQuantumSkill(readSkill('writing'))
    expect(speech.environment.seal.speechResults).toBe(true)
    expect(writing.environment.seal.speechResults).toBe(true)
    expect(speech.entangledFields.some((f) => f.field === 'text.prose')).toBe(true)
  })
})

describe('skill/router/upgrade/quantum — generateQuantumSkill', () => {
  let ctx: UpgradeContext

  beforeAll(() => {
    ctx = buildUpgradeContext()
  }, 120_000)

  it('emits signatures, horo, quantum block, and content-uuid footer', () => {
    const raw = readSkill('quantum/emr')
    const fm = connectFrontmatter('quantum/emr', raw, ctx)
    const parsed = parseQuantumSkill(raw)
    const generated = generateQuantumSkill({
      connected: fm,
      title: 'quantum/emr — the health-state snapshot chain',
      bodyProse: parsed.body.split('\n\n')[1] ?? parsed.body,
      law: parsed.law ?? 'test law',
      see: ['patient', 'analog', 'snapshot'],
      matterTwin:
        'Matter-twin: `src/quantum/emr/index.ts` — `analogResults` · `reconstructAt` · `EmrObservation` · `AnalogResult`.',
      audit: 'pure chain invariants; never hand-asserted clinical records',
    })
    expect(generated).toContain('signatures:')
    expect(generated).toContain('horo:')
    expect(generated).toContain('quantum:')
    expect(generated).toContain('  superposition:')
    expect(generated).toContain('  collapse:')
    expect(generated).toContain('    analogResults: true')
    expect(generated).toMatch(/content-uuid `[0-9a-f-]{36}` · account `quantum\/emr`/)
    const reparsed = parseQuantumSkill(generated)
    expect(reparsed.signatures?.stages.map((s) => s.stage)).toEqual([
      'path',
      'trinity',
      'boundary',
      'links',
      'horo',
      'seal',
      'uuid',
    ])
  }, 120_000)

  it('generate → parse round-trip preserves law and path account', () => {
    const raw = readSkill('quantum/device')
    const fm = connectFrontmatter('quantum/device', raw, ctx)
    const parsed = parseQuantumSkill(raw)
    const generated = generateQuantumSkill({
      connected: fm,
      title: 'quantum/device — the measurement instrument',
      bodyProse: parsed.body.replace(/^# .+\n\n/, '').split('**Law')[0]!.trim(),
      law: parsed.law ?? 'device law',
    })
    const round = parseQuantumSkill(generated)
    expect(round.pathAccountCode).toBe('quantum/device')
    expect(round.law).toBe(parsed.law)
    expect(round.environment.seal.signatures?.computationUuid).toBe(fm.signatures.computationUuid)
  }, 120_000)
})

describe('skill/router/upgrade/quantum — upgradeQuantumSkillText zero-entropy', () => {
  let ctx: UpgradeContext

  beforeAll(() => {
    ctx = buildUpgradeContext()
  }, 120_000)

  it('is idempotent on quantum/emr after first upgrade', () => {
    const raw = readSkill('quantum/emr')
    const fm = connectFrontmatter('quantum/emr', raw, ctx)
    const once = upgradeQuantumSkillText(raw, fm)
    const twice = upgradeQuantumSkillText(once, connectFrontmatter('quantum/emr', once, ctx))
    expect(twice).toBe(once)
  }, 120_000)

  it('quantum upgrade differs from generic upgrade by quantum block + footer', () => {
    const raw = readSkill('quantum/emr')
    const fm = connectFrontmatter('quantum/emr', raw, ctx)
    const generic = upgradeSkillText(raw, fm)
    const quantum = upgradeQuantumSkillText(raw, fm)
    expect(quantum).toContain('quantum:')
    expect(quantum).toMatch(/content-uuid `[0-9a-f-]{36}` · account `quantum\/emr`/)
    expect(generic).not.toContain('quantum:')
  }, 120_000)

  it('isQuantumSkillPath matches partition and path prefix', () => {
    expect(isQuantumSkillPath('quantum/emr', 'quantum')).toBe(true)
    expect(isQuantumSkillPath('quantum', 'quantum')).toBe(true)
    expect(isQuantumSkillPath('skill/router', 'skill')).toBe(false)
    expect(
      inferQuantumEnvironment('quantum/mcp', {
        collapseTriggers: ['gate'],
        bonds: { in: ['sandbox'], out: ['receipt'] },
        signatures: null,
        contentUuid: null,
      }).seal.sandbox,
    ).toBe(true)
  })
})
