/**
 * bg-identifiers — the entry gate for Bulgarian society into erpax.
 *
 * Every BG natural person is keyed by an ЕГН (ЕдинеН ГражданскИ Номер), every
 * legal entity by an ЕИК/БУЛСТАТ. erpax cannot onboard a citizen, a company, a
 * municipality (община) or a ministry without validating these — so this is
 * where the Bulgarian horo joins. Pure, official checksum algorithms (testable,
 * no PII): the ЕГН additionally decodes the birth date and sex; the ЕИК runs
 * the two-stage БУЛСТАТ checksum (9-digit base, optional 13-digit branch).
 *
 * @standard ЕГН regulation (Наредба РД-02-20-9/2012 on the population register)
 * @standard БУЛСТАТ register law (Закон за регистър БУЛСТАТ) — ЕИК checksum
 * @standard ISO-7064 check-character-systems (the modulo family these implement)
 */

const EGN_WEIGHTS = [2, 4, 8, 5, 10, 9, 7, 3, 6]

export interface EgnResult {
  valid: boolean
  birthDate?: string
  sex?: 'male' | 'female'
  reason?: string
}

/** Validate an ЕГН and decode its birth date + sex (the number IS the identity). */
export function validateEgn(egn: string): EgnResult {
  if (!/^\d{10}$/.test(egn)) return { valid: false, reason: 'ЕГН must be exactly 10 digits' }
  const d = egn.split('').map(Number)
  let year = 1900 + d[0] * 10 + d[1]
  let month = d[2] * 10 + d[3]
  if (month >= 41 && month <= 52) { year += 100; month -= 40 } // born 2000-2099
  else if (month >= 21 && month <= 32) { year -= 100; month -= 20 } // born 1800-1899
  const day = d[4] * 10 + d[5]
  const dt = new Date(Date.UTC(year, month - 1, day))
  if (
    month < 1 || month > 12 || day < 1 || day > 31 ||
    dt.getUTCFullYear() !== year || dt.getUTCMonth() !== month - 1 || dt.getUTCDate() !== day
  ) {
    return { valid: false, reason: 'ЕГН encodes an invalid birth date' }
  }
  let sum = 0
  for (let i = 0; i < 9; i++) sum += d[i] * EGN_WEIGHTS[i]
  let check = sum % 11
  if (check === 10) check = 0
  if (check !== d[9]) return { valid: false, reason: 'ЕГН checksum mismatch' }
  return {
    valid: true,
    birthDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    sex: d[8] % 2 === 0 ? 'male' : 'female',
  }
}

const mod11Two = (digits: number[], w1: number[], w2: number[]): number => {
  let s = 0
  for (let i = 0; i < w1.length; i++) s += digits[i] * w1[i]
  let c = s % 11
  if (c !== 10) return c
  s = 0
  for (let i = 0; i < w2.length; i++) s += digits[i] * w2[i]
  c = s % 11
  return c === 10 ? 0 : c
}

export interface EikResult {
  valid: boolean
  reason?: string
}

/** Validate an ЕИК/БУЛСТАТ (9-digit legal-entity base, optional 13-digit branch). */
export function validateEik(eik: string): EikResult {
  if (!/^\d{9}$/.test(eik) && !/^\d{13}$/.test(eik)) {
    return { valid: false, reason: 'ЕИК must be 9 or 13 digits' }
  }
  const d = eik.split('').map(Number)
  const c9 = mod11Two(d.slice(0, 8), [1, 2, 3, 4, 5, 6, 7, 8], [3, 4, 5, 6, 7, 8, 9, 10])
  if (c9 !== d[8]) return { valid: false, reason: 'ЕИК 9-digit checksum mismatch' }
  if (eik.length === 9) return { valid: true }
  const c13 = mod11Two(d.slice(8, 12), [2, 7, 3, 5], [4, 9, 5, 7])
  if (c13 !== d[12]) return { valid: false, reason: 'ЕИК 13-digit branch checksum mismatch' }
  return { valid: true }
}
