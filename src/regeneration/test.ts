/**
 * regeneration — the proof, asserted. The organism regrows from its genome and
 * sutures its own wounds. See ./index.ts for the construction.
 */
import { describe, it, expect } from 'vitest'
import {
  regenerate,
  regrowsIdentically,
  survivesDestruction,
  seedDeterminesOrganism,
  gapsOf,
  isWhole,
  heal,
  healToWhole,
  regeneration,
  selfHealsAndRegenerates,
  type Web,
} from './index'

describe('regeneration — regrow from the genome', () => {
  it('the genome is a content-uuid (RFC 9562 §5.8 v8)', () => {
    expect(regenerate('seed')).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    )
  })

  it('same seed ⇒ identical organism, every time (deterministic regrowth)', () => {
    expect(regrowsIdentically('erpax')).toBe(true)
    expect(regrowsIdentically('a different seed')).toBe(true)
  })

  it('a derived artefact is never stored — destroy it, recompute from the seed', () => {
    expect(survivesDestruction('erpax — recompute it')).toBe(true)
  })

  it('the seed determines the organism — one perturbed bit ⇒ a different genome', () => {
    expect(seedDeterminesOrganism('erpax')).toBe(true)
    expect(regenerate('erpax')).not.toBe(regenerate('erpax '))
  })

  it('string and Buffer seeds of the same bytes regrow identically', () => {
    expect(regenerate('erpax')).toBe(regenerate(Buffer.from('erpax', 'utf8')))
  })
})

describe('regeneration — self-healing (the immune loop)', () => {
  const wounded: Web = { nodes: ['a', 'b'], links: { a: ['b', 'c'], b: ['d'] } }

  it('detects the wounds — dead links are the gap', () => {
    expect(gapsOf(wounded)).toEqual(['a→c', 'b→d'])
    expect(isWhole(wounded)).toBe(false)
  })

  it('a whole web has gap 0', () => {
    expect(isWhole({ nodes: ['a', 'b'], links: { a: ['b'], b: ['a'] } })).toBe(true)
    expect(gapsOf({ nodes: ['x'], links: {} })).toEqual([])
  })

  it('one suture strictly reduces the gap (monotone, never opens a wound)', () => {
    const before = gapsOf(wounded).length
    const after = gapsOf(heal(wounded)).length
    expect(after).toBeLessThan(before)
  })

  it('the loop converges to whole, monotonically, in finite steps', () => {
    const r = healToWhole(wounded)
    expect(r.whole).toBe(true)
    expect(r.monotone).toBe(true)
    expect(r.steps).toBe(2) // two wounds, two sutures
  })

  it('an already-whole web heals in zero steps', () => {
    const r = healToWhole({ nodes: ['a'], links: { a: [] } })
    expect(r).toEqual({ steps: 0, whole: true, monotone: true })
  })
})

describe('regeneration — the conjunction', () => {
  it('every computed claim is true', () => {
    const p = regeneration()
    for (const [k, v] of Object.entries(p)) expect(v, k).toBe(true)
  })

  it('erpax is ALIVE: it regenerates ⊕ heals', () => {
    expect(selfHealsAndRegenerates()).toBe(true)
  })
})
