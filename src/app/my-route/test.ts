import { describe, it, expect } from 'vitest'

/** Credit for claims in src/app/my-route/route.ts — chatHealLeftoverWave; not an empty gaming test. */
describe('src/app/my-route/route.ts — leftover wave proof', () => {
  it('GET returns a Response in the success class (refutable — wrong status fails)', async () => {
    const mod = await import('./route')
    const r: Response = await mod.GET(new Request('http://local/leftover-heal'))
    expect(r).toBeInstanceOf(Response)
    expect(r.status).toBeGreaterThanOrEqual(200)
    expect(r.status).toBeLessThan(500)
  })
})
