/**
 * Наредба Н-18 / СУПТО — УНП (Уникален номер на продажба / Unique Sales Number).
 *
 * Format: `XXXXXXXX-ZZZZ-NNNNNNN`
 *   XXXXXXXX — 8-digit individual number of the fiscal device (ФУ), assigned
 *              by the manufacturer.
 *   ZZZZ     — 4-digit operator code (per the software's operator nomenclature).
 *   NNNNNNN  — 7-digit sequential sale number, formed SEPARATELY per fiscal
 *              device, ascending with step 1 (gapless), starting at 0000001.
 * Arabic numerals only; the two `-` delimiters are mandatory.
 *
 * Pure format / parse / validate / increment — no persistence. The stateful
 * per-device counter rides a `number`-skill sequence hook on the sales
 * collection; this module is the УНП's *content* (the standards-driven id
 * form — see the `identity` skill) and its *reverse* (`parseUnp` = decode).
 * It is the structured, self-describing, lookup-free face of a sale's identity,
 * mirroring the structured uuidv8 (decode the string ⇒ know its origin).
 *
 * @standard BG Наредба-Н-18 §СУПТО УНП unique-sales-number
 * @audit ISO-19011:2018 audit-trail (УНП ties order ↔ fiscal-receipt ↔ payment)
 * @see .claude/skills/supto/SKILL.md
 * @see .claude/skills/number/SKILL.md
 */

export interface UnpParts {
  /** 8-digit fiscal-device (ФУ) individual number. */
  readonly fiscalDeviceId: string
  /** 4-digit operator code. */
  readonly operatorCode: string
  /** 1..9_999_999 — the per-device sequential sale number. */
  readonly sequence: number
}

const FISCAL_DEVICE_RE = /^\d{8}$/
/** Canonical УНП shape: 8 digits · 4 digits · 7 digits, `-` delimited. */
export const UNP_RE = /^(\d{8})-(\d{4})-(\d{7})$/
export const UNP_FIRST_SEQUENCE = 1
export const UNP_MAX_SEQUENCE = 9_999_999

/** Build a УНП from its parts. Throws on out-of-range / malformed input. */
export function formatUnp(parts: {
  fiscalDeviceId: string
  operatorCode: string | number
  sequence: number
}): string {
  const { fiscalDeviceId } = parts
  if (!FISCAL_DEVICE_RE.test(fiscalDeviceId)) {
    throw new Error(`УНП: fiscal-device id must be exactly 8 digits, got '${fiscalDeviceId}'`)
  }
  const operator = String(parts.operatorCode).padStart(4, '0')
  if (!/^\d{4}$/.test(operator)) {
    throw new Error(`УНП: operator code must be ≤ 4 digits, got '${String(parts.operatorCode)}'`)
  }
  if (
    !Number.isInteger(parts.sequence) ||
    parts.sequence < UNP_FIRST_SEQUENCE ||
    parts.sequence > UNP_MAX_SEQUENCE
  ) {
    throw new Error(
      `УНП: sequence must be an integer in [${UNP_FIRST_SEQUENCE}, ${UNP_MAX_SEQUENCE}], got ${parts.sequence}`,
    )
  }
  return `${fiscalDeviceId}-${operator}-${String(parts.sequence).padStart(7, '0')}`
}

/** The reverse — determine + decode a УНП string into its parts. Throws if malformed. */
export function parseUnp(unp: string): UnpParts {
  const m = UNP_RE.exec(unp)
  if (!m) {
    throw new Error(`УНП: malformed '${unp}' (expected XXXXXXXX-ZZZZ-NNNNNNN, Arabic digits only)`)
  }
  return { fiscalDeviceId: m[1], operatorCode: m[2], sequence: Number(m[3]) }
}

/** True when `unp` is a structurally valid УНП. */
export function isValidUnp(unp: string): boolean {
  const m = UNP_RE.exec(unp)
  if (!m) return false
  const seq = Number(m[3])
  return seq >= UNP_FIRST_SEQUENCE && seq <= UNP_MAX_SEQUENCE
}

/** Gapless +1 — the next УНП for the same device/operator. Throws on overflow. */
export function incrementUnp(prev: string): string {
  const parts = parseUnp(prev)
  if (parts.sequence >= UNP_MAX_SEQUENCE) {
    throw new Error(`УНП: sequence overflow for device ${parts.fiscalDeviceId} (max ${UNP_MAX_SEQUENCE})`)
  }
  return formatUnp({ ...parts, sequence: parts.sequence + 1 })
}

/** The first УНП for a (device, operator) — the empty case routes to sequence 1 (totality). */
export function firstUnp(fiscalDeviceId: string, operatorCode: string | number): string {
  return formatUnp({ fiscalDeviceId, operatorCode, sequence: UNP_FIRST_SEQUENCE })
}
