import { describe, it, expect } from 'vitest'
import { deriveRoute, deriveCompetencies, newSkills } from '@/derive'

describe('derive — skills derived from user content (the corpus grows from what users write)', () => {
  it('deriveRoute content-addresses a competency name; same name ⇒ same route (merge)', () => {
    expect(deriveRoute('Claims Triage')).toBe('/claims-triage/SKILL')
    expect(deriveRoute('  Financial Reconciliation!  ')).toBe('/financial-reconciliation/SKILL')
    expect(deriveRoute('Claims Triage')).toBe(deriveRoute('claims   triage')) // same skill ⇒ one node
    expect(deriveRoute('')).toBe('/SKILL')
  })

  it('deriveCompetencies dedups a job description into content-addressed routes', () => {
    const routes = deriveCompetencies(['Claims Triage', 'claims triage', 'Underwriting', ''])
    expect(routes).toEqual(['/claims-triage/SKILL', '/underwriting/SKILL']) // deduped, empty dropped
  })

  it('newSkills are the named skills the user content ADDS (not yet in the corpus)', () => {
    const derived = ['/claims-triage/SKILL', '/underwriting/SKILL']
    const corpus = ['/underwriting/SKILL', '/finance/reconciliation/SKILL']
    expect(newSkills(derived, corpus)).toEqual(['/claims-triage/SKILL']) // claims-triage is new — mint it
    expect(newSkills(derived, [...derived])).toEqual([]) // all present ⇒ nothing to mint
  })
})
