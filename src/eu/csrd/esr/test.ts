import { describe, it, expect } from 'vitest'
import {
  ESRS_CATEGORIES,
  ESRS_CATEGORY_LABEL,
  ESRS_CATEGORY_OPTIONS,
  ESRS_TOPICS,
  ESRS_TOPIC_LABEL,
  ESRS_TOPIC_OPTIONS,
  ESRS_TOPIC_TO_CATEGORY,
  ESRS_MATERIALITY,
  ESRS_MATERIALITY_LABEL,
  ESRS_MATERIALITY_OPTIONS,
  ESRS_ASSURANCE_LEVELS,
  ESRS_ASSURANCE_LABEL,
  ESRS_ASSURANCE_OPTIONS,
  type EsrsCategory,
  type EsrsTopic,
} from '@/eu/csrd/esr'

// EU CSRD / ESRS — the 12 in-scope topic standards (FY2024), each rolling up
// to exactly one of the four ESRS categories, plus double-materiality and
// CSRD Art.34a assurance levels.
describe('eu/csrd/esr — ESRS topic taxonomy', () => {
  it('enumerates the four ESRS categories', () => {
    expect(ESRS_CATEGORIES).toEqual([
      'cross_cutting',
      'environmental',
      'social',
      'governance',
    ])
  })

  it('enumerates exactly the 12 in-scope topics', () => {
    expect(ESRS_TOPICS).toHaveLength(12)
    expect(ESRS_TOPICS).toContain('esrs_1')
    expect(ESRS_TOPICS).toContain('esrs_g1')
  })

  it('topics roll up 2 cross-cutting / 5 environmental / 4 social / 1 governance', () => {
    const counts: Record<EsrsCategory, number> = {
      cross_cutting: 0,
      environmental: 0,
      social: 0,
      governance: 0,
    }
    for (const t of ESRS_TOPICS) counts[ESRS_TOPIC_TO_CATEGORY[t]]++
    expect(counts).toEqual({
      cross_cutting: 2,
      environmental: 5,
      social: 4,
      governance: 1,
    })
  })

  it('every topic maps to a valid category', () => {
    for (const t of ESRS_TOPICS) {
      expect(ESRS_CATEGORIES).toContain(ESRS_TOPIC_TO_CATEGORY[t])
    }
    expect(ESRS_TOPIC_TO_CATEGORY['esrs_e1']).toBe('environmental')
    expect(ESRS_TOPIC_TO_CATEGORY['esrs_s4']).toBe('social')
    expect(ESRS_TOPIC_TO_CATEGORY['esrs_1']).toBe('cross_cutting')
  })

  it('every category and topic has a label and an option row', () => {
    for (const c of ESRS_CATEGORIES) expect(ESRS_CATEGORY_LABEL[c]).toBeTruthy()
    for (const t of ESRS_TOPICS) expect(ESRS_TOPIC_LABEL[t]).toBeTruthy()
    expect(ESRS_CATEGORY_OPTIONS).toHaveLength(ESRS_CATEGORIES.length)
    expect(ESRS_TOPIC_OPTIONS).toHaveLength(ESRS_TOPICS.length)
  })

  it('option rows pair each value with its label', () => {
    const t0: { label: string; value: EsrsTopic } = ESRS_TOPIC_OPTIONS[0]
    expect(t0).toEqual({ value: 'esrs_1', label: ESRS_TOPIC_LABEL['esrs_1'] })
  })

  it('exposes the ESRS 1 §3 double-materiality classes', () => {
    expect(ESRS_MATERIALITY).toEqual([
      'double_material',
      'impact_material',
      'financial_material',
      'not_material',
    ])
    expect(ESRS_MATERIALITY_OPTIONS).toHaveLength(ESRS_MATERIALITY.length)
    for (const m of ESRS_MATERIALITY) expect(ESRS_MATERIALITY_LABEL[m]).toBeTruthy()
  })

  it('exposes the CSRD Art.34a assurance levels', () => {
    expect(ESRS_ASSURANCE_LEVELS).toEqual([
      'not_assured',
      'limited_assurance',
      'reasonable_assurance',
      'self_declared',
    ])
    expect(ESRS_ASSURANCE_OPTIONS).toHaveLength(ESRS_ASSURANCE_LEVELS.length)
    for (const a of ESRS_ASSURANCE_LEVELS) expect(ESRS_ASSURANCE_LABEL[a]).toBeTruthy()
  })
})
