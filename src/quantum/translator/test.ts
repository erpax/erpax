import { describe, it, expect } from 'vitest'
import { collapse, meaningIsUnique, areTranslations } from '@/quantum/translator'

// Translation as quantum collapse to the content-uuid interlingua: surface forms collapse
// to one meaning eigenstate, and meaning obeys no-cloning (one uuid per concept).
describe('quantum/translator — translation as collapse to the meaning eigenstate', () => {
  it('collapse is deterministic — a surface form collapses to one meaning-uuid', () => {
    expect(collapse('merge')).toBe(collapse('merge'))
    expect(collapse('merge')).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('no-cloning of meaning holds (each concept has exactly one uuid)', () => {
    expect(meaningIsUnique()).toBe(true)
  })
  it('forms collapsing to the same eigenstate are translations', () => {
    expect(areTranslations('merge', 'merge')).toBe(true)
    expect(areTranslations('merge', 'gravity')).toBe(false)
  })
})
