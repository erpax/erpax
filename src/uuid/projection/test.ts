import { describe, it, expect } from 'vitest'
import {
  projectContent,
  localeContent,
  searchableText,
  contentMatches,
  uuidHsl,
  uuidColor,
  uuidCssVars,
  uuidInk,
  uuidInkContrast,
  uuidLuminance,
  project,
} from '@/uuid/projection'
import { join } from 'node:path'
import { algebraFloatPow, exactMax, exactMin } from '@/algebra'

describe('uuid-projection — the uuid singularity (content → uuid · search · locale · css)', () => {
  it('projectContent strips storage-managed fields — the ONE content definition', () => {
    const r = { id: '1', uuid: 'x', createdAt: 't', updatedAt: 't', name: 'Acme', amount: 42 }
    expect(projectContent(r)).toEqual({ name: 'Acme', amount: 42 })
  })

  it('localeContent collapses {en,bg} fields to one locale (per-locale content ⇒ per-locale uuid)', () => {
    const r = { title: { en: 'Invoice', bg: 'Фактура' }, amount: 10 }
    expect(localeContent(r, 'bg')).toEqual({ title: 'Фактура', amount: 10 })
    expect(localeContent(r, 'en')).toEqual({ title: 'Invoice', amount: 10 })
  })

  it('searchableText is every string/number leaf — localized values contribute every locale; ids excluded', () => {
    const r = { id: 'sys-id', title: { en: 'Hello', bg: 'Здравей' }, n: 7, nested: { note: 'deep' }, tags: ['a', 'b'] }
    const t = searchableText(r)
    for (const s of ['Hello', 'Здравей', '7', 'deep', 'a', 'b']) expect(t).toContain(s)
    expect(t).not.toContain('sys-id') // id is stripped (not content)
    expect(contentMatches(r, 'здравей')).toBe(true) // case-insensitive, any locale
    expect(contentMatches(r, 'zzz')).toBe(false)
    expect(contentMatches(r, '')).toBe(false)
  })

  it('uuidColor is deterministic and lands in a readable band — the visual facet', () => {
    const u = '0190a1b2-c3d4-8e5f-9012-3456789abcde'
    expect(uuidColor(u)).toBe(uuidColor(u))
    const { h, s, l } = uuidHsl(u)
    expect(h).toBeGreaterThanOrEqual(0)
    expect(h).toBeLessThan(360)
    expect(s).toBeGreaterThanOrEqual(55)
    expect(s).toBeLessThanOrEqual(89)
    expect(l).toBeGreaterThanOrEqual(38)
    expect(l).toBeLessThanOrEqual(61)
    expect(uuidColor(u)).toMatch(/^hsl\(\d+ \d+% \d+%\)$/)
    expect(uuidCssVars(u)['--uuid-color']).toBe(uuidColor(u))
    // distinct uuids ⇒ distinct hue (well-distributed)
    expect(uuidHsl('ffffffff-0000-8000-8000-000000000000').h).not.toBe(uuidHsl('00000000-0000-8000-8000-000000000000').h)
  })

  it('project radiates identity + search + colour from ONE content (DRY — same content ⇒ same everything)', () => {
    const r = { title: 'Acme', amount: 42 }
    const a = project(r, 'tenant-1')
    expect(a).toEqual(project({ ...r }, 'tenant-1')) // same content ⇒ same uuid, searchText, colour
    expect(a.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/) // uuidv8
    expect(a.searchText).toContain('Acme')
    expect(a.color).toBe(uuidColor(a.uuid))
    expect(project(r, 'tenant-2').uuid).not.toBe(a.uuid) // tenant-namespaced
  })
})

describe('uuid/projection — the ink is proven, not chosen', () => {
  // THE LEAN TWIN. src/verify/lean/Contrast.lean proves contrast-with-white times
  // contrast-with-black is 21 for every colour, so the better of the two can never be under 4.5.
  // This checks the twin over the WHOLE band the projection can produce, and READS the .lean file.
  it('every colour the projection can emit carries a legible ink — all 302,400 of them', () => {
    const lin = (c: number): number => (c <= 0.03928 ? c / 12.92 : algebraFloatPow((c + 0.055) / 1.055, 2.4))
    const lumOf = (h: number, s: number, l: number): number => {
      const sf = s / 100
      const lf = l / 100
      const a = sf * exactMin(lf, 1 - lf)
      const k = (n: number): number => (n + h / 30) % 12
      const ch = (n: number): number => lf - a * exactMax(-1, exactMin(k(n) - 3, exactMin(9 - k(n), 1)))
      return 0.2126 * lin(ch(0)) + 0.7152 * lin(ch(8)) + 0.0722 * lin(ch(4))
    }
    let worst = Infinity
    for (let h = 0; h < 360; h++)
      for (let s = 55; s < 90; s++)
        for (let l = 38; l < 62; l++) {
          const x = lumOf(h, s, l) + 0.05
          worst = exactMin(worst, exactMax(1.05 / x, x / 0.05))
        }
    expect(worst).toBeGreaterThanOrEqual(4.5)
  })

  it('the product identity the theorem rests on — 21, for every colour', () => {
    for (const u of ['00000000-0000-8000-8000-000000000000', 'ffffffff-ffff-8fff-8fff-ffffffffffff', 'deadbeef-1234-8abc-8def-0123456789ab']) {
      const x = uuidLuminance(u) + 0.05
      expect((1.05 / x) * (x / 0.05)).toBeCloseTo(21, 9)
    }
  })

  it('the chosen ink is the WINNING one, and it is in the vars', () => {
    const u = 'deadbeef-1234-8abc-8def-0123456789ab'
    const x = uuidLuminance(u) + 0.05
    expect(uuidInk(u)).toBe(1.05 / x > x / 0.05 ? '#ffffff' : '#000000')
    expect(uuidCssVars(u)['--uuid-ink']).toBe(uuidInk(u))
    expect(uuidInkContrast(u)).toBeGreaterThanOrEqual(4.5)
  })

  it('the Lean file proves every rule the ink relies on', async () => {
    const { readFileSync } = await import('node:fs')
    const lean = readFileSync(join(process.cwd(), 'src/verify/lean/Contrast.lean'), 'utf8')
    for (const name of [
      'some_ink_always_reads',
      'white_under_forces_black_reads',
      'crossover_is_where_the_choice_turns',
      'tight_point_clears_the_threshold',
      'darkest_takes_white',
      'lightest_takes_black',
      'the_whole_range_reads',
    ]) {
      expect(lean, `theorem ${name} missing from Contrast.lean`).toMatch(new RegExp(`^theorem ${name}\\b`, 'm'))
    }
  })
})
