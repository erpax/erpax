/**
 * Derive `country` (ISO 3166-1 alpha-2) from an IBAN field on the document.
 * Idempotent — only writes when the destination field is empty AND the IBAN
 * parses. Hook-factory: pass dotted paths to support nested groups (e.g.
 * Vendors `bank.bankIban` → `bank.bankCountryCode`).
 *
 * Used by BankAccounts.beforeChange and any other collection that carries
 * an IBAN as the source of truth for the bank-side jurisdiction.
 *
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-3166-1:2020 country-codes alpha-2
 */

import type { CollectionBeforeChangeHook } from 'payload'
import { extractIbanCountry } from '@/iban'
import { readNested, writeNested } from '@/field/nested'

export function deriveCountryFromIban(opts?: {
  ibanField?: string
  countryField?: string
}): CollectionBeforeChangeHook {
  const ibanField = opts?.ibanField ?? 'iban'
  const countryField = opts?.countryField ?? 'country'
  return ({ data }) => {
    const d = data as Record<string, unknown>
    const iban = readNested(d, ibanField)
    if (typeof iban !== 'string' || iban.length === 0) return data
    const cc = extractIbanCountry(iban)
    if (!cc) return data
    const existing = readNested(d, countryField)
    if (typeof existing !== 'string' || existing.length === 0) {
      writeNested(d, countryField, cc)
    }
    return data
  }
}
