import { describe, it, expect } from 'vitest'
import {
  competencyCatalogue,
  nodeToCompetency,
  resolveCompetency,
  isCompetencyRoute,
  competencyRouteOptions,
  TRANSVERSAL_ROOTS,
  type CorpusCompetency,
} from './competencies'
import type { SkillNode } from './resolve'

describe('skill-router/competencies — the competency taxonomy computed from the corpus', () => {
  it('the catalogue is non-empty and every competency is keyed by a content-addressed route', () => {
    const cat = competencyCatalogue()
    expect(cat.length).toBeGreaterThan(100) // the merged corpus (erpax atoms ∪ installed skills)
    for (const c of cat) {
      expect(c.skillRoute).toMatch(/^\//) // a route, the single identity
      expect(c.name.length).toBeGreaterThan(0)
      expect(c.status).toBe('active')
    }
    // routes are unique — the corpus is deduped (same address ⇒ one)
    const routes = cat.map((c) => c.skillRoute)
    expect(new Set(routes).size).toBe(routes.length)
  })

  it('nodeToCompetency projects the corpus node exactly as the old seed did (transversal vs skill)', () => {
    const root: SkillNode = { route: '/horo/SKILL', path: ['horo'], name: 'horo', description: 'the ring', content: '', ancestors: [], siblings: [], children: [], related: [], nav: [], group: 'horo' }
    const leaf: SkillNode = { route: '/finance/reconciliation/SKILL', path: ['finance', 'reconciliation'], name: 'reconciliation', description: 'match', content: '', ancestors: ['finance'], siblings: [], children: [], related: [], nav: ['finance'], group: 'finance' }
    expect(TRANSVERSAL_ROOTS.has('horo')).toBe(true)
    const r = nodeToCompetency(root)
    expect(r).toMatchObject({ skillRoute: '/horo/SKILL', reference: 'horo', subClassification: 'transversal', reusabilityLevel: 'transversal', maxProficiency: 7 })
    const l = nodeToCompetency(leaf)
    expect(l).toMatchObject({ skillRoute: '/finance/reconciliation/SKILL', subClassification: 'skill', reusabilityLevel: 'cross_sectoral' })
    // description falls back to the name when empty (the seed's `|| node.name`)
    expect(nodeToCompetency({ ...leaf, description: '' }).description).toBe('reconciliation')
  })

  it('resolveCompetency / isCompetencyRoute treat the corpus as the source of truth', () => {
    const sample: CorpusCompetency = competencyCatalogue()[0]
    expect(resolveCompetency(sample.skillRoute)).toEqual(sample)
    expect(isCompetencyRoute(sample.skillRoute)).toBe(true)
    expect(resolveCompetency('/not/a/real/route/SKILL')).toBeUndefined()
    expect(isCompetencyRoute('/not/a/real/route/SKILL')).toBe(false)
  })

  it('competencyRouteOptions are computed from the corpus (value = route), never hand-listed', () => {
    const opts = competencyRouteOptions()
    expect(opts.length).toBe(competencyCatalogue().length)
    for (const o of opts) {
      expect(o.value).toMatch(/^\//)
      expect(isCompetencyRoute(o.value)).toBe(true)
    }
  })
})
