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
import { classifyTaxId as classify } from '@/config/country-specifics'

function readPath(obj: Record<string, unknown>, path: string): unknown {
  let cur: unknown = obj
  for (const key of path.split('.')) {
    if (cur === null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[key]
  }
  return cur
}

function writePath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split('.')
  let cur: Record<string, unknown> = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]!
    const next = cur[k]
    if (next === null || typeof next !== 'object') cur[k] = {}
    cur = cur[k] as Record<string, unknown>
  }
  cur[parts[parts.length - 1]!] = value
}

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
    const taxId = readPath(d, taxIdField)
    const country = readPath(d, countryField)
    if (typeof taxId !== 'string' || typeof country !== 'string') return data
    const label = classify(country, taxId)
    if (label) writePath(d, labelField, label)
    return data
  }
}
