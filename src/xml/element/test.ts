import { describe, expect, it } from 'vitest'
import { escapeAttrs, leaf, wrap } from '@/xml/element'

describe('xml/element — the primitives three serializers each wrote for themselves', () => {
  it('escapes attribute values and drops undefined ones', () => {
    expect(escapeAttrs({ currencyID: 'BGN', unit: undefined })).toBe(' currencyID="BGN"')
    expect(escapeAttrs({ note: 'a & b' })).toBe(' note="a &amp; b"')
    expect(escapeAttrs({ a: undefined })).toBe('')
  })

  // The absent value renders as '' rather than an empty tag, which is what lets a caller compose
  // optional fields inline. An empty <cbc:Note/> is a claim that the field is present and blank.
  it('renders a leaf, and renders NOTHING for an absent value', () => {
    expect(leaf('cbc:ID', 'INV-1')).toBe('<cbc:ID>INV-1</cbc:ID>')
    expect(leaf('cbc:Amount', 10, { currencyID: 'BGN' })).toBe('<cbc:Amount currencyID="BGN">10</cbc:Amount>')
    for (const v of [undefined, null, '']) expect(leaf('cbc:ID', v)).toBe('')
    expect(leaf('t', 0)).toBe('<t>0</t>') // zero is a value, not an absence
  })

  it('wraps non-empty children and collapses a wholly empty wrapper', () => {
    expect(wrap('cac:Party', leaf('a', 1), leaf('b', undefined))).toBe('<cac:Party>\n<a>1</a>\n</cac:Party>')
    expect(wrap('cac:Party', '', undefined, null)).toBe('')
  })

  // saf/t called leaf with two arguments and peppol/iso20022 with three. The generalised leaf is a
  // superset: with no attrs it emits exactly the two-argument form, byte for byte.
  it('the two-argument call is byte-identical to the arity saf/t used', () => {
    expect(leaf('TaxRegistrationNumber', 'BG123')).toBe('<TaxRegistrationNumber>BG123</TaxRegistrationNumber>')
  })
})
