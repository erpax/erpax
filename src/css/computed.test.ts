/**
 * computed — proof UI tokens are deterministic from diamond state.
 */
import { describe, it, expect } from 'vitest'
import {
  computedCssForUi,
  computedCssInjection,
  chromaOf,
  mixHex,
  SHADCN_TOKEN_KEYS,
} from '@/css/computed'
import { computeCssDiamond } from '@/css'

const SAMPLE_PATH = 'accounting/coa'
const SAMPLE_UUID = '826aff60-f962-578d-aaaf-8fb237567bea'

describe('computedCssForUi — diamond-derived tokens', () => {
  it('same surface ⇒ same token map', () => {
    const surface = { contentUuid: SAMPLE_UUID, path: SAMPLE_PATH, horo: 7, sealed: true, mode: 'light' as const }
    const a = computedCssForUi(surface)
    const b = computedCssForUi(surface)
    expect(a).toEqual(b)
  })

  it('content drift ⇒ different primary chroma', () => {
    const a = computedCssForUi({ contentUuid: SAMPLE_UUID })
    const b = computedCssForUi({ contentUuid: '826aff60-f962-578d-aaaf-8fb237567beb' })
    expect(a.primary).not.toBe(b.primary)
  })

  it('seal gap flips success toward warning', () => {
    const sealed = computedCssForUi({ path: 'css', sealed: true })
    const gap = computedCssForUi({ path: 'css', sealed: false })
    expect(sealed.success).not.toBe(gap.success)
    expect(gap.warning).toBeTruthy()
  })

  it('exports every shadcn token key', () => {
    const tokens = computedCssForUi({ path: 'ui' })
    for (const key of SHADCN_TOKEN_KEYS) {
      expect(tokens[key]).toMatch(/^#|^[\d.]+rem$/)
    }
  })

  it('injection includes Payload admin aliases', () => {
    const injection = computedCssInjection(computedCssForUi({ path: 'admin/ui' }))
    expect(injection['--background']).toBeTruthy()
    expect(injection['--theme-elevation-50']).toBeTruthy()
    expect(injection['--theme-success-100']).toBeTruthy()
  })

  it('chroma priority: uuid beats horo beats path', () => {
    const fromUuid = chromaOf({ contentUuid: SAMPLE_UUID, horo: 9, path: 'entropy' })
    const fromHoro = chromaOf({ horo: 9, path: 'entropy' })
    const fromPath = chromaOf({ path: 'entropy' })
    expect(fromUuid).not.toBe(fromHoro)
    expect(fromHoro).not.toBe(fromPath)
  })

  it('mixHex is deterministic', () => {
    expect(mixHex('#000000', '#ffffff', 0.5)).toBe('#808080')
  })
})

describe('computeCssDiamond + computed tokens snapshot', () => {
  it('globals.css diamond seals; tokens derive from path accounting', () => {
    const diamond = computeCssDiamond({ path: 'app/(frontend)/globals.css' })
    expect(diamond.seal.contentUuid).toMatch(/^[0-9a-f-]{36}$/)

    const tokens = computedCssForUi({
      path: SAMPLE_PATH,
      contentUuid: diamond.seal.contentUuid,
      horo: 7,
      sealed: true,
      mode: 'light',
    })

    expect({
      path: SAMPLE_PATH,
      stylesheetUuid: diamond.seal.contentUuid,
      primary: tokens.primary,
      accent: tokens.accent,
      success: tokens.success,
      radius: tokens.radius,
    }).toMatchInlineSnapshot(`
      {
        "accent": "#00aeef",
        "path": "accounting/coa",
        "primary": "#e23b3b",
        "radius": "0.675rem",
        "stylesheetUuid": "deafa5db-76f8-8742-ab5d-99ae1d647bf3",
        "success": "#2fb344",
      }
    `)
  })
})
