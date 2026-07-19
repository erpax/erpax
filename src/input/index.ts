/**
 * input — the user is HELPED with every input the system can parse, analyse, or derive.
 *
 * The [[rules]]/ask law's second half: after the derivable is predefined, what the user DOES
 * type is parsed and analysed FOR them — a checksum caught at the keystroke, a normalised
 * form stored, a derivable twin (birthdate from ЕГН, country from IBAN) computed, never
 * re-asked. The census (2026-07-19, 762 text fields): 57 fields in nine help classes, and
 * every validator already existed in the corpus, unwired — isValidIban/normaliseIban
 * ([[iban]]), validateEgn/validateEik ([[bg]]/identifier), parseBgIban ([[iso]]/13616).
 *
 * ONE hook serves all: `inputHelpHook` walks a doc's fields BY NAME CLASS (declared, in the
 * open, arguable) — normalising what parses, refusing what fails its own checksum with the
 * reason named, deriving the twins. Wired once in a factory it covers every collection the
 * factory builds; per-collection wiring is one import.
 */
import type { CollectionBeforeValidateHook } from 'payload'
import { isValidIban, normaliseIban, extractIbanCountry } from '@/iban'
import { validateEgn, validateEik } from '@/bg/identifier'

export interface InputHelp {
  /** the normalised value to STORE (undefined ⇒ leave untouched) */
  readonly value?: string
  /** derived twins the user never types (e.g. ibanCountry) */
  readonly derived?: Readonly<Record<string, string>>
  /** the refusal, with its law — a checksum failure is caught at the write, not at the audit */
  readonly error?: string
}

const E164 = /^\+?[0-9 ()-]{6,20}$/
const BIC = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Help one value by its field-name class — pure, total, refusals carry the law's name. */
export function helpInput(field: string, raw: string): InputHelp {
  const v = raw.trim()
  if (!v) return {}
  if (/iban/i.test(field)) {
    const n = normaliseIban(v)
    if (!isValidIban(n)) return { error: `IBAN fails its ISO 13616 mod-97 checksum: ${v}` }
    const country = extractIbanCountry(n)
    return { value: n, ...(country ? { derived: { [`${field}Country`]: country } } : {}) }
  }
  if (/^egn$|personalid/i.test(field)) {
    const r = validateEgn(v)
    if (!r.valid) return { error: `ЕГН fails its checksum/date: ${v}` }
    return { value: v, ...(r.birthDate ? { derived: { birthDate: r.birthDate } } : {}) }
  }
  if (/eik|bulstat/i.test(field)) {
    return validateEik(v).valid ? { value: v } : { error: `ЕИК/БУЛСТАТ fails its checksum: ${v}` }
  }
  if (/bic|swift/i.test(field)) {
    const n = v.toUpperCase().replace(/\s+/g, '')
    return BIC.test(n) ? { value: n } : { error: `BIC is not ISO 9362 shaped: ${v}` }
  }
  if (/email/i.test(field)) {
    const n = v.toLowerCase()
    return EMAIL.test(n) ? { value: n } : { error: `email does not parse: ${v}` }
  }
  if (/phone|mobile|fax/i.test(field)) {
    const digits = v.replace(/[^0-9+]/g, '')
    return E164.test(v) ? { value: digits } : {}
  }
  if (/url|website/i.test(field)) {
    try {
      return { value: new URL(v.includes('://') ? v : `https://${v}`).toString() }
    } catch {
      return { error: `URL does not parse: ${v}` }
    }
  }
  return {}
}

/**
 * The ONE beforeValidate hook: every string field in the doc offered to helpInput; normalised
 * values and derived twins written back, the first refusal thrown with its law. Analysis, not
 * interrogation — the user types once, the system does the rest.
 */
export const inputHelpHook: CollectionBeforeValidateHook = ({ data }) => {
  if (!data || typeof data !== 'object') return data
  const doc = data as Record<string, unknown>
  for (const [field, raw] of Object.entries(doc)) {
    if (typeof raw !== 'string') continue
    const h = helpInput(field, raw)
    if (h.error) throw new Error(h.error)
    if (h.value !== undefined) doc[field] = h.value
    for (const [k, dv] of Object.entries(h.derived ?? {})) {
      if (doc[k] === undefined || doc[k] === null || doc[k] === '') doc[k] = dv
    }
  }
  return doc
}
