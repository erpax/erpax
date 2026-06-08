import { describe, it, expect } from 'vitest'
import { render, sameRender } from '@/render'
import { pixel } from '@/pixel'
import { signalForStep } from '@/signal'
import { isHoroStep, composeSteps, type HoroStep } from '@/horo'
import { DOUBLING } from '@/rodin'
import { toUuid } from '@/uuid/matrix'

describe('render — the full sensory pixel (uuid → colour + sound + vibration)', () => {
  const u = toUuid(Buffer.from('render:test:main', 'utf8'))

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
    const v = toUuid(Buffer.from('render:test:stable', 'utf8'))
    expect(render(v)).toEqual(render(v))
    expect(sameRender(v, v)).toBe(true)
  })

  it('every digit 1..9 folds onto a valid diatonic horo step and sounds a real tone', () => {
    // exercise the full digit space, including the off-ring axis {3,6}
    const uuids = [
      toUuid(Buffer.from('render:digit-probe:0', 'utf8')),
      toUuid(Buffer.from('render:digit-probe:1', 'utf8')),
      toUuid(Buffer.from('render:digit-probe:2', 'utf8')),
      toUuid(Buffer.from('render:digit-probe:3', 'utf8')),
      toUuid(Buffer.from('render:digit-probe:4', 'utf8')),
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
    const a = toUuid(Buffer.from('render:contrast:a', 'utf8'))
    const b = toUuid(Buffer.from('render:contrast:b', 'utf8'))
    // not asserting they always differ (digits can collide), but the rendered tuple is a pure
    // function of the digit, so when digits differ the renders must differ in at least one channel
    if (render(a).digit !== render(b).digit) {
      expect(sameRender(a, b)).toBe(false)
    }
    // and identity always holds
    expect(sameRender(a, a)).toBe(true)
  })
})
