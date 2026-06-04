import { describe, it, expect } from 'vitest'
import { actionRisk, routeModel, routeAction } from '@/routing'

describe('routing — size the model to the risk (enforcement is safety, not location)', () => {
  it('actionRisk: credential / high-risk verb / disharmony ⇒ high; mutation ⇒ medium; read ⇒ low', () => {
    expect(actionRisk({ capability: 'read' })).toBe('low')
    expect(actionRisk({ capability: 'api' })).toBe('medium')
    expect(actionRisk({ capability: 'execute' })).toBe('high')
    expect(actionRisk({ capability: 'read', touchesCredential: true })).toBe('high') // a credential lifts it
    expect(actionRisk({ capability: 'read', fightsHarmony: true })).toBe('high') // off the horo ring
  })

  it('routeModel: high → strong, medium → standard, low → local', () => {
    expect(routeModel('high')).toBe('strong')
    expect(routeModel('medium')).toBe('standard')
    expect(routeModel('low')).toBe('local')
  })

  it('routeAction: low-risk runs cheap/local (the gate makes it safe), high-risk reaches for strong', () => {
    expect(routeAction({ capability: 'read' })).toBe('local') // sovereign/local at no safety cost
    expect(routeAction({ capability: 'deploy' })).toBe('strong')
    expect(routeAction({ capability: 'api', touchesCredential: true })).toBe('strong')
  })
})
