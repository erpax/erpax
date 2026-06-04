/**
 * Runtime guards for ISO 27002:2022 control ids.
 *
 * Accepts both the bare canonical form (`'5.23'`) and the prefixed
 * variants seen in JSDoc citations (`'A.5.23'`, `'§5.23'`, `'5.23'`).
 *
 * @standard ISO-27002:2022 information-security-controls
 * @standard ISO-27001:2022 isms-annex-a-controls
 * @see ./types.ts
 */

import type { Iso27002ControlId } from '@/iso/27002/types'

const KNOWN_IDS = new Set<Iso27002ControlId>([
  '5.4',
  '5.14',
  '5.15',
  '5.16',
  '5.17',
  '5.18',
  '5.23',
  '5.34',
  '8.2',
  '8.3',
  '8.5',
  '8.11',
  '8.15',
  '8.16',
  '8.20',
  '8.23',
  '8.24',
  '8.30',
])

/**
 * Strip the optional `A.` (ISO 27001 Annex A) or `§` (ISO 27002)
 * prefix and return the bare canonical id, or `null` if the input
 * doesn't match the catalog.
 */
export const parseIso27002ControlId = (s: unknown): Iso27002ControlId | null => {
  if (typeof s !== 'string') return null
  const stripped = s.trim().replace(/^(A\.|§)/, '')
  return KNOWN_IDS.has(stripped as Iso27002ControlId)
    ? (stripped as Iso27002ControlId)
    : null
}

/**
 * Type-narrowing guard for {@link Iso27002ControlId} (canonical form
 * only — strip prefixes via `parseIso27002ControlId` first if your
 * input is from a JSDoc citation).
 */
export const isIso27002ControlId = (s: unknown): s is Iso27002ControlId =>
  typeof s === 'string' && KNOWN_IDS.has(s as Iso27002ControlId)
