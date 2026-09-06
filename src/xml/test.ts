import { describe, expect, it } from 'vitest'
import { escapeAttrs, escapeXml, leaf, wrap } from '@/xml'

describe('xml — the barrel', () => {
  it('offers escape and element through one face', () => {
    expect(escapeXml('x&y')).toBe('x&amp;y')
    expect(escapeAttrs({ currencyID: 'BGN' })).toBe(' currencyID="BGN"')
    expect(wrap('a', leaf('b', 'x&y'))).toBe('<a>\n<b>x&amp;y</b>\n</a>')
  })

  // leaf escapes its own value. A caller that escapes first gets &amp;amp; — the barrel exists so
  // the two layers are read together and that mistake is visible.
  it('leaf escapes once — pre-escaping is double-escaping', () => {
    expect(leaf('b', escapeXml('x&y'))).toBe('<b>x&amp;amp;y</b>')
  })
})
