import { describe, it, expect } from 'vitest'
import { installedToNode, mergeCatalogue, skillsForAgent, erpaxDomain, type InstalledSkill } from './merge'
import type { SkillNode } from './resolve'

const atom = (name: string): SkillNode => ({
  route: `/${name}/SKILL`, path: [name], name, description: `${name} root`,
  content: '', ancestors: [], siblings: [], children: [], related: [],
})

const BASE: SkillNode[] = [atom('horo'), atom('merge'), atom('train')]

const INSTALLED: InstalledSkill[] = [
  { domain: 'finance', name: 'reconciliation', description: 'Reconcile accounts.', contentUuid: 'uuid-recon' },
  { domain: 'human-resources', name: 'onboarding', description: 'Onboard a new hire.', contentUuid: 'uuid-onb' },
  { domain: 'sales', name: 'forecast', description: 'Weighted sales forecast.', contentUuid: 'uuid-fc' },
]

describe('merge — union the installed Claude catalogue into the erpax atom corpus', () => {
  it('wraps an installed skill as a content-addressed node, normalising the domain to the agent id', () => {
    const n = installedToNode({ domain: 'human-resources', name: 'onboarding', description: 'Onboard.', contentUuid: 'u' })
    expect(n.route).toBe('/hr/onboarding/SKILL') // human-resources → hr (the DomainAgent id)
    expect(n.path).toEqual(['hr', 'onboarding'])
    expect(n.ancestors).toEqual(['hr']) // links the leaf to its domain
    expect(n.content).toBe('Onboard.') // lean: the description, not a vendored body
    expect(n.contentUuid).toBe('u')
    expect(erpaxDomain('operations')).toBe('ops') // the alias table
    expect(erpaxDomain('finance')).toBe('finance') // unaliased passes through
  })

  it('is pure UNION when the corpora are complementary — atoms + installed leaves, sorted by route', () => {
    const merged = mergeCatalogue(BASE, INSTALLED)
    expect(merged).toHaveLength(BASE.length + INSTALLED.length) // no collisions ⇒ full union
    expect(merged.map((n) => n.route)).toEqual([...merged.map((n) => n.route)].sort()) // canonical order
    expect(merged.find((n) => n.route === '/finance/reconciliation/SKILL')).toBeTruthy()
    expect(merged.find((n) => n.route === '/horo/SKILL')).toBeTruthy() // the atom survives
  })

  it('dedups by route then by content-uuid (same address ⇒ one; same content ⇒ one)', () => {
    const dupRoute = mergeCatalogue(BASE, [...INSTALLED, { domain: 'finance', name: 'reconciliation', description: 'dup', contentUuid: 'other' }])
    expect(dupRoute.filter((n) => n.route === '/finance/reconciliation/SKILL')).toHaveLength(1) // same route ⇒ one

    const dupContent = mergeCatalogue(BASE, [...INSTALLED, { domain: 'finance', name: 'recon-alias', description: 'same bytes', contentUuid: 'uuid-recon' }])
    expect(dupContent.find((n) => n.route === '/finance/recon-alias/SKILL')).toBeUndefined() // same content-uuid ⇒ merged away
  })

  it('keeps the erpax atom canonical when an installed skill collides on route', () => {
    const collide: InstalledSkill[] = [{ domain: '', name: 'horo', description: 'a vendored horo', contentUuid: 'x' }]
    // installedToNode('', 'horo') → route '/horo/SKILL' (same as the atom)
    const merged = mergeCatalogue(BASE, collide)
    const horo = merged.find((n) => n.route === '/horo/SKILL')
    expect(horo?.description).toBe('horo root') // the atom wins — the root corpus is never overwritten
  })

  it('derives a DomainAgent’s competence from the merged index (never stored); excludes base atoms', () => {
    const merged = mergeCatalogue(BASE, INSTALLED)
    expect(skillsForAgent('hr', merged)).toEqual(['/hr/onboarding/SKILL']) // human-resources normalised to hr
    expect(skillsForAgent('finance', merged)).toEqual(['/finance/reconciliation/SKILL'])
    expect(skillsForAgent('horo', merged)).toEqual([]) // a root atom is not a domain skill
  })
})
