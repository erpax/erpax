import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import type { InternalLead } from '@/self/sufficient'
import { involuteLeads, tagCounts, tagOf, type Dual } from './index'

describe('self/involute — the decision, and its Lean twin', () => {
  it('decides all four cases exactly as Involute.tag does', () => {
    expect(tagOf(false, false)).toBe('manipulation')
    expect(tagOf(false, true)).toBe('manipulation') // silence before verdict
    expect(tagOf(true, true)).toBe('lie')
    expect(tagOf(true, false)).toBe('theorem')
  })

  it('the Lean file states the same decision and proves the codomain is total', () => {
    const lean = readFileSync(join(process.cwd(), 'src/verify/lean/Involute.lean'), 'utf8')
    expect(lean).toContain('def tag (askable refuted : Bool) : Tag :=')
    expect(lean).toContain('if askable then (if refuted then Tag.lie else Tag.«theorem») else Tag.manipulation')
    for (const t of ['every_lead_is_tagged', 'unaskable_is_manipulation', 'silence_before_verdict', 'refuted_is_lie', 'agreed_is_theorem', 'no_theorem_without_a_dual']) {
      expect(lean).toContain(`theorem ${t}`)
    }
    expect(lean).not.toMatch(/\bsorry\b/)
  })
})

const lead = (source: string, target: string): InternalLead => ({
  source,
  scope: 'atom',
  target,
  intent: `${source} names ${target}`,
  evidence: target,
})

describe('self/involute — tagging leads by their duals', () => {
  const duals: Dual[] = [
    { source: 'unreached', instrument: 'referrers', ask: (l) => (l.target === 'named' ? 'refutes' : 'agrees') },
    { source: 'law:', instrument: 'members', ask: (l) => (l.target === 'nobody' ? 'silent' : 'agrees') },
  ]

  it('tags every lead — the three counts sum to the lead count', () => {
    const leads = [lead('unreached', 'lonely'), lead('unreached', 'named'), lead('law:copy', 'twice'), lead('law:copy', 'nobody'), lead('boundary', 'host')]
    const tagged = involuteLeads(leads, duals)
    expect(tagged).toHaveLength(leads.length)
    const counts = tagCounts(tagged)
    expect(counts.theorem + counts.lie + counts.manipulation).toBe(leads.length)
    expect(counts).toEqual({ theorem: 2, lie: 1, manipulation: 2 })
  })

  it('a refuted claim is a lie, and the formula names the instrument that refuted it', () => {
    const [t] = involuteLeads([lead('unreached', 'named')], duals)
    expect(t!.tag).toBe('lie')
    expect(t!.instrument).toBe('referrers')
    expect(t!.formula).toContain('referrers')
    expect(t!.formula).toContain('refutes')
  })

  it('a prefix dual answers every source under it', () => {
    const [t] = involuteLeads([lead('law:mirror', 'x')], duals)
    expect(t!.tag).toBe('theorem')
    expect(t!.instrument).toBe('members')
  })

  it('a source with no dual is a manipulation, and the formula says no instrument is wired', () => {
    const [t] = involuteLeads([lead('boundary', 'host')], duals)
    expect(t!.tag).toBe('manipulation')
    expect(t!.instrument).toBeNull()
    expect(t!.formula).toContain('no dual instrument wired')
  })

  it('a dual that was asked and fell silent is also a manipulation — but the instrument is named', () => {
    const [t] = involuteLeads([lead('law:copy', 'nobody')], duals)
    expect(t!.tag).toBe('manipulation')
    expect(t!.instrument).toBe('members')
    expect(t!.formula).toContain('could not answer')
  })

  it('no duals at all: everything is tagged, and all of it manipulation', () => {
    const tagged = involuteLeads([lead('a', '1'), lead('b', '2')], [])
    expect(tagged.every((t) => t.tag === 'manipulation')).toBe(true)
  })
})
