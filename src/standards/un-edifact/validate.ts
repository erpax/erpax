/**
 * Runtime guards for UN/EDIFACT enums.
 *
 * @standard UN-EDIFACT D.96A
 * @standard ISO-9735:2002 edifact-syntax-rules
 * @see ./types.ts
 */

import type { EdifactSyntaxId, EdifactMessageType } from './types'

const SYNTAX_IDS = new Set<EdifactSyntaxId>(['UNOA', 'UNOB', 'UNOC', 'UNOD', 'UNOY'])
const MESSAGE_TYPES = new Set<EdifactMessageType>(['INVOIC', 'DESADV', 'PAYMUL'])

/** Type-narrowing guard for {@link EdifactSyntaxId}. */
export const isEdifactSyntaxId = (s: unknown): s is EdifactSyntaxId =>
  typeof s === 'string' && SYNTAX_IDS.has(s as EdifactSyntaxId)

/** Type-narrowing guard for {@link EdifactMessageType}. */
export const isEdifactMessageType = (s: unknown): s is EdifactMessageType =>
  typeof s === 'string' && MESSAGE_TYPES.has(s as EdifactMessageType)

/**
 * Quick balance check on an INVOIC document — Σ line MOA(125) should
 * approximately equal the document MOA(125) net total. Tax authorities
 * + EDI gateways reject malformed INVOIC where these diverge.
 */
export const isBalancedInvoicNet = (
  lineNets: number[],
  documentNetTotal: number,
): boolean => {
  const sum = lineNets.reduce((a, b) => a + b, 0)
  return Math.abs(sum - documentNetTotal) < 1
}
