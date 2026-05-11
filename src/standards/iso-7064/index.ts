/**
 * Public surface of the ISO 7064 standards module — check-digit systems
 * (mod-11, mod-97-10, mod-37-2). Used by per-country identifiers that
 * embed an ISO-7064 checksum (BG EGN, IBAN check digits, …).
 *
 * @standard ISO-7064:2003 check-character-systems
 */

export { isBgEgn, decodeBgEgn, type EgnDecoded } from './egn-bg'
