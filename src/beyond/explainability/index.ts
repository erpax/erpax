/**
 * Law 19 — Self-explainability. Slice ZZZZZ.
 *
 * Every business outcome (invoice posted, tax computed, credit
 * declined) ships with a generated natural-language explanation
 * citing the standards + chain steps + data sources. Per-locale
 * via spec-templates.
 *
 * @standard EU AI Act 2024/1689 Art. 13 (transparency for high-risk)
 * @standard XBRL inline-XBRL (machine-explainability of values)
 * @standard ISO/IEC 23053 AI-systems-with-machine-learning (explainability)
 */

import type { Explanation } from '@/beyond/types'

/**
 * Compose a natural-language explanation deterministically from
 * structured inputs. No LLM in this path — that would break Law 12
 * (deterministic replay). The text uses simple template substitution.
 */
export function autoExplain(args: {
  outcome: string                                  // e.g. "Invoice INV-2026-1234 posted"
  reason: string                                   // e.g. "Customer accepted quote QUO-2026-99"
  standardsCited: ReadonlyArray<{ body: string; id: string }>
  sources: ReadonlyArray<string>
  chainPath: ReadonlyArray<{ chainId: string; stepIndex: number }>
}): Explanation {
  const standardsLine = args.standardsCited
    .map((s) => `${s.body} ${s.id}`).join(', ')
  const chainLine = args.chainPath
    .map((p) => `${p.chainId}#${p.stepIndex}`).join(' → ')

  // EN narrative; non-EN locales get [en] stub markers (i18n strict mode catches them).
  const en = `${args.outcome}. Reason: ${args.reason}. ` +
    `Standards: ${standardsLine || '(none cited)'}. ` +
    `Chain path: ${chainLine || '(none)'}. ` +
    `Sources: ${args.sources.length} record(s).`

  return {
    text: { en, bg: `[en] ${en}` /* spec-template stubs the rest */ },
    standardsCited: args.standardsCited,
    sources: args.sources,
    chainPath: args.chainPath,
  }
}

/** Verify an explanation is non-trivial (not just empty placeholders). */
export function isExplanationComplete(exp: Explanation): boolean {
  if (Object.keys(exp.text).length === 0) return false
  if (exp.standardsCited.length === 0) return false
  return true
}
