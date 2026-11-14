import type { Field } from 'payload'

/**
 * Unit of Measure — the physical-substance twin of `currencyField`.
 *
 * A measured quantity is `value` (number) + `unit` (UN/CEFACT Rec 20 code:
 * `KGM`/`MTR`/`LTR`/`HUR`/`H87`…), never a unit-baked name. A blank unit
 * routes to the dimensionless-count identity element **`C62`** ("one") —
 * the ISO-4217 `XXX` twin — never an ad-hoc `'pcs'` (the `measure` skill's
 * named anti-pattern). Pass `defaultValue` where a dimension other than
 * count is the sensible default (e.g. `KGM` for weight, `CMT` for length).
 *
 * @standard UN/CEFACT Recommendation 20 unit-of-measure-codes
 * @standard EN-16931 §BT-130 invoiced-quantity-unit-of-measure
 */
export const unitOfMeasureField = (
  opts: { name?: string; defaultValue?: string; required?: boolean; description?: string } = {},
): Field => ({
  name: opts.name ?? 'unitOfMeasure',
  type: 'text',
  defaultValue: opts.defaultValue ?? 'C62',
  ...(opts.required ? { required: true } : {}),
  admin: {
    description:
      opts.description ??
      'UN/CEFACT Rec 20 unit code (C62=one, KGM, MTR, LTR, HUR, H87=piece…). Blank ⇒ C62.',
  },
})
