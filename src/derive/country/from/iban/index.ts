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

export function deriveCountryFromIban(opts?: {
  ibanField?: string
  countryField?: string
}): CollectionBeforeChangeHook {
  const ibanField = opts?.ibanField ?? 'iban'
  const countryField = opts?.countryField ?? 'country'
  return ({ data }) => {
    const d = data as Record<string, unknown>
    const iban = readPath(d, ibanField)
    if (typeof iban !== 'string' || iban.length === 0) return data
    const cc = extractIbanCountry(iban)
    if (!cc) return data
    const existing = readPath(d, countryField)
    if (typeof existing !== 'string' || existing.length === 0) {
      writePath(d, countryField, cc)
    }
    return data
  }
}
