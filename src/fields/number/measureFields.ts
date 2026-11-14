import type { Field } from 'payload'
import { unitOfMeasureField } from '@/fields/text/unitOfMeasureField'

/**
 * Measured quantity = `value` number + `unit` of measure, as one composable
 * pair. The `measure` atom (sequence position 1) — substance twin of
 * `amountField` + `currencyField`. Recurs across BOM/stock/production/line
 * quantities; collapse the inline `{quantity}+{unitOfMeasure}` pair onto it.
 *
 * @standard UN/CEFACT Recommendation 20 unit-of-measure-codes
 */
export const measureFields = (
  opts: {
    name?: string
    unitName?: string
    defaultUnit?: string
    required?: boolean
    min?: number
    description?: string
    unitDescription?: string
  } = {},
): Field[] => [
  {
    name: opts.name ?? 'quantity',
    type: 'number',
    ...(opts.required ? { required: true } : {}),
    min: opts.min ?? 0,
    ...(opts.description ? { admin: { description: opts.description } } : {}),
  },
  unitOfMeasureField({
    name: opts.unitName ?? 'unitOfMeasure',
    defaultValue: opts.defaultUnit,
    description: opts.unitDescription,
  }),
]
