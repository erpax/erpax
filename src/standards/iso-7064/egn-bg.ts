/**
 * BG EGN (Единен граждански номер) — personal identifier with embedded
 * birth date, sex, sequence number, and ISO-7064 mod-11 check digit.
 *
 * Distinct from EIK (legal-entity Bulstat) and BG VAT (BG-prefixed). EGN
 * is the natural-person identifier referenced by:
 *   - Beneficial-owner records (AMLD-5 / Закон за мерките срещу изпирането на пари)
 *   - Employee payroll (НАП Декларация Образец 1)
 *   - KYC subjects on customer / vendor records
 *
 * EGN structure (10 digits, total):
 *
 *   YY MM DD SSS C
 *   ┬─ ┬─ ┬─ ┬── ┬
 *   │  │  │  │   └ check digit (mod-11 against weights below)
 *   │  │  │  └───── 3-digit sequence: even = male, odd = female
 *   │  │  └──────── 2-digit day  (01-31)
 *   │  └─────────── 2-digit month, encoded:
 *   │                 01-12  → 1900-1999
 *   │                 21-32  → 1800-1899 (legacy citizens born before 1900)
 *   │                 41-52  → 2000-2099
 *   └────────────── 2-digit year (last two of the year — disambiguated by month encoding)
 *
 * @standard BG ЕГН Закон за гражданската регистрация
 * @standard ISO-7064:2003 mod-11 check-digit
 * @standard ISO-8601-1:2019 date-time encoded-birth-date
 * @compliance AMLD-5 ubo-personal-identifier
 * @compliance GDPR Art.9 special-category-data
 * @audit ISO-19011:2018 audit-trail kyc-evidence
 * @see ../../config/country-specifics.ts (BG.taxIdFormats)
 */

const EGN_WEIGHTS = [2, 4, 8, 5, 10, 9, 7, 3, 6] as const

/**
 * Validate an EGN: shape + month-encoding + calendar-valid date + ISO-7064
 * mod-11 checksum. Returns false on any failure (no exceptions).
 */
export function isBgEgn(value: unknown): value is string {
  if (typeof value !== 'string') return false
  const s = value.trim()
  if (!/^\d{10}$/.test(s)) return false

  // Decode birth date — fail when the month encoding doesn't pin a century.
  const yy = Number(s.slice(0, 2))
  const mmRaw = Number(s.slice(2, 4))
  const dd = Number(s.slice(4, 6))
  let century: number
  let month: number
  if (mmRaw >= 1 && mmRaw <= 12) {
    century = 1900
    month = mmRaw
  } else if (mmRaw >= 21 && mmRaw <= 32) {
    century = 1800
    month = mmRaw - 20
  } else if (mmRaw >= 41 && mmRaw <= 52) {
    century = 2000
    month = mmRaw - 40
  } else {
    return false
  }
  const year = century + yy
  // Calendar round-trip: re-emit the date and check the day matches.
  const d = new Date(Date.UTC(year, month - 1, dd))
  if (
    d.getUTCFullYear() !== year ||
    d.getUTCMonth() !== month - 1 ||
    d.getUTCDate() !== dd
  ) {
    return false
  }

  // ISO-7064 mod-11 check digit.
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number(s[i]) * EGN_WEIGHTS[i]
  }
  const expected = sum % 11 === 10 ? 0 : sum % 11
  return Number(s[9]) === expected
}

export interface EgnDecoded {
  /** Decoded ISO-8601 birth date (`YYYY-MM-DD`). */
  readonly birthDate: string
  /** Decoded biological sex per the EGN sequence parity rule. */
  readonly sex: 'male' | 'female'
  /** 3-digit sequence number (within the same birth date). */
  readonly sequence: number
}

/**
 * Decode an EGN into birth-date / sex / sequence. Returns `null` when the
 * input fails `isBgEgn`. Caller MUST treat the returned data as GDPR
 * Art.9 special-category data.
 */
export function decodeBgEgn(value: unknown): EgnDecoded | null {
  if (!isBgEgn(value)) return null
  const s = value
  const yy = Number(s.slice(0, 2))
  const mmRaw = Number(s.slice(2, 4))
  const dd = Number(s.slice(4, 6))
  const century = mmRaw <= 12 ? 1900 : mmRaw <= 32 ? 1800 : 2000
  const month = mmRaw <= 12 ? mmRaw : mmRaw <= 32 ? mmRaw - 20 : mmRaw - 40
  const year = century + yy
  const sequence = Number(s.slice(6, 9))
  return {
    birthDate: `${year}-${String(month).padStart(2, '0')}-${String(dd).padStart(2, '0')}`,
    sex: sequence % 2 === 0 ? 'male' : 'female',
    sequence,
  }
}
