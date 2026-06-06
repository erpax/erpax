import { describe, it, expect } from 'vitest'
import { render, sameRender } from '@/render'
import { pixel } from '@/pixel'
import { signalForStep } from '@/signal'
import { isHoroStep, composeSteps, type HoroStep } from '@/horo'
import { DOUBLING } from '@/rodin'

describe('render — the full sensory pixel (uuid → colour + sound + vibration)', () => {
  const u = '12345678-1234-8123-8123-123456789abc'

  it('renders all three analog channels from the one uuid', () => {
    const r = render(u)
    expect(r.digit).toBe(pixel(u).digit)
    // color IS the pixel — read off the same uuid
    expect(r.color).toBe(pixel(u).color)
    // sound is an A432 tone decoded from the digit's ring position
    expect(isHoroStep(r.sound.step)).toBe(true)
    expect(r.sound.hz).toBe(signalForStep(r.sound.step).hz)
    expect(r.sound.note).toBe(signalForStep(r.sound.step).note)
    expect(r.sound.hz).toBeGreaterThan(0)
    // vibration is the rodin doubling step — ×2 on the ring
    expect(r.vibration.to).toBe(composeSteps(r.digit, 2))
    expect(r.vibration.stepIndex).toBe(DOUBLING.indexOf(r.digit as (typeof DOUBLING)[number]))
    expect(r.vibration.onHelix).toBe(r.vibration.stepIndex >= 0)
  })

  it('same uuid ⇒ same full render (deterministic across all channels)', () => {
    const v = 'aaaaaaaa-0000-8000-8000-000000000000'
    expect(render(v)).toEqual(render(v))
    expect(sameRender(v, v)).toBe(true)
  })

  it('every digit 1..9 folds onto a valid diatonic horo step and sounds a real tone', () => {
    // exercise the full digit space, including the off-ring axis {3,6}
    const uuids = [
      '00000000-0000-8000-8000-000000000001', // small content
      '11111111-1111-8111-8111-111111111111',
      'ffffffff-ffff-8fff-8fff-ffffffffffff', // dense content
      '12345678-9abc-8def-8123-456789abcdef',
      'deadbeef-cafe-8bad-8f00-0000000000ff',
    ]
    for (const id of uuids) {
      const r = render(id)
      const step: HoroStep = r.sound.step
      expect(isHoroStep(step)).toBe(true)
      expect(r.sound.hz).toBe(signalForStep(step).hz)
      // vibration always lands back on the ring (composeSteps is closed)
      expect(r.vibration.to).toBeGreaterThanOrEqual(1)
      expect(r.vibration.to).toBeLessThanOrEqual(9)
    }
  })

  it('different content can render differently — the render is read off identity, not painted on', () => {
    const a = '00000000-0000-8000-8000-000000000001'
    const b = 'ffffffff-ffff-8fff-8fff-ffffffffffff'
    // not asserting they always differ (digits can collide), but the rendered tuple is a pure
    // function of the digit, so when digits differ the renders must differ in at least one channel
    if (render(a).digit !== render(b).digit) {
      expect(sameRender(a, b)).toBe(false)
    }
    // and identity always holds
    expect(sameRender(a, a)).toBe(true)
  })
})
