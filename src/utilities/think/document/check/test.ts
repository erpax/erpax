import { describe, it, expect } from 'vitest'
import { leadCheckedKey, checkLead, checkLeadPage, conditionOf, isLeadSlug, subjectOf } from '@/utilities/think/document/check'

const run = (args: Record<string, unknown>) => checkLeadPage({ context: {}, ...args } as never)

describe('think/document/check — the lead definition', () => {
  it('splits what a lead is from what it waits for', () => {
    expect(subjectOf('drop the old tables — develop when Payload is improved')).toBe('drop the old tables')
    expect(conditionOf('drop the old tables — develop when Payload is improved')).toBe('Payload is improved')
  })

  it('accepts a sentence of work and refuses what is not one', () => {
    expect(checkLead('  drop the four tables left behind ')).toEqual({ ok: true, lead: 'drop the four tables left behind' })
    expect(checkLead('fix it').ok).toBe(false)
    expect(checkLead(undefined).ok).toBe(false)
  })
})

describe('think/document/check — Payload runs the check where the page is saved', () => {
  it('leaves a page that is not a lead alone, whatever it says', async () => {
    const data = { slug: 'pricing', title: 'x' }
    const context: Record<string, unknown> = {}
    expect(await checkLeadPage({ data, context } as never)).toBe(data)
    expect(context[leadCheckedKey()]).toBeUndefined()
    expect(isLeadSlug('leads')).toBe(false)
  })

  it('passes a lead that meets the definition and records the check in the hook context', async () => {
    const context: Record<string, unknown> = {}
    const data = { slug: 'leads-drop-the-tables-1234abcd', title: 'Drop', meta: { description: 'drop the four tables left behind' } }
    expect(await checkLeadPage({ data, context } as never)).toBe(data)
    expect(context[leadCheckedKey()]).toBe(true)
  })

  it('refuses a lead that does not, with the reason', async () => {
    expect(() => run({ data: { slug: 'leads-x-1', title: 'fix it' } })).toThrow(/Not a lead: a lead says what is to be done/)
    expect(() => run({ data: { slug: 'leads-x-1', title: 'A fine long title here', meta: { description: 'two\nlines of text here' } } })).toThrow(/one line/)
  })

  it('judges a partial update by the stored document, and checks once per request', async () => {
    expect(() => run({ data: { title: 'no' }, originalDoc: { slug: 'leads-x-1', title: 'old' } })).toThrow(/Not a lead/)
    expect(await run({ data: { title: 'no' }, originalDoc: { slug: 'leads-x-1' }, context: { [leadCheckedKey()]: true } })).toEqual({ title: 'no' })
  })
})
