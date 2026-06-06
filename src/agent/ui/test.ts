import { describe, it, expect } from 'vitest'
import { renderAtom, trained } from '@/agent/ui'
import { pixel } from '@/pixel'
import { componentPixel } from '@/component'
import { nodeOf } from '@/uuid/matrix'

describe('agent/ui — the trained UI agent', () => {
  it('renders any atom to its UI (render + page) from its content-uuid', () => {
    const ui = renderAtom('pixel')
    expect(ui).toBeTruthy()
    expect(ui!.uuid).toBe(nodeOf('pixel')!.uuid)
    expect(ui!.page.route).toContain('pixel')
    expect(ui!.render).toBeTruthy()
  })
  it('is trained on the whole corpus — every atom renders (coverage 1)', () => {
    const t = trained()
    expect(t.atoms).toBeGreaterThan(1000)
    expect(t.rendered).toBe(t.atoms)
    expect(t.coverage).toBe(1)
  })
  it('the component is wired to the atom — its colour IS the atom pixel (the whole layer reads one identity)', () => {
    const u = nodeOf('pixel')!.uuid
    expect(componentPixel(u).color).toBe(pixel(u).color)
  })
  it('an unknown atom has no UI', () => {
    expect(renderAtom('__not_an_atom__')).toBeUndefined()
  })
})
