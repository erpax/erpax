/**
 * Classify a tax-ID against the per-country regex registry — stamps a
 * type-label (e.g. "EIK / Bulstat", "VAT (BG)", "EIN", "GSTIN") on the
 * document so downstream code branches off a normalised label rather
 * than a free-form regex match.
 *
 * Hook-factory: pass the dotted paths of the tax-ID, country, and label
 * fields. Defaults match the canonical layout for top-level fields
 * (`taxId` / `country` / `taxIdType`); pass `'tax.vatNumber'` etc. for
 * nested groups (Customers / Vendors).
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @audit ISO-19011:2018 audit-trail tax-id-classification-evidence
 * @see ../config/country-specifics.ts
 */

import type { CollectionBeforeChangeHook } from 'payload'
import { classifyTaxId as classify } from '@/config/country/specifics'
import { readNested, writeNested } from '@/field/nested'

export function classifyTaxId(opts?: {
  taxIdField?: string
  countryField?: string
  labelField?: string
}): CollectionBeforeChangeHook {
  const taxIdField = opts?.taxIdField ?? 'taxId'
  const countryField = opts?.countryField ?? 'country'
  const labelField = opts?.labelField ?? 'taxIdType'
  return ({ data }) => {
    const d = data as Record<string, unknown>
    const taxId = readNested(d, taxIdField)
    const country = readNested(d, countryField)
    if (typeof taxId !== 'string' || typeof country !== 'string') return data
    const label = classify(country, taxId)
    if (label) writeNested(d, labelField, label)
    return data
  }
}
