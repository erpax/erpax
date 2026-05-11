/**
 * EU AI Act 2024 — risk-class taxonomy.
 *
 * Regulation (EU) 2024/1689 — Art.5 (prohibited), Art.6 + Annex III (high),
 * Art.50 (limited / transparency), Art.53 (general-purpose AI). Each AI use
 * case in ERPax is classified into one of these classes; the
 * `cloudflare-ai.ts` chokepoint refuses inference for `prohibited` and
 * forces human-in-the-loop for `high`.
 *
 * @standard EU AI Act 2024 Regulation (EU) 2024/1689
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @standard ISO/IEC 42001:2023 ai-management-system
 * @standard NIST AI-RMF-1.0 ai-risk-management-framework
 * @compliance GDPR Art.22 automated-individual-decision-making
 */

/** Canonical EU AI Act risk classes (lowest to highest impact). */
export const EU_AI_ACT_RISK_CLASSES = ['minimal', 'limited', 'high', 'prohibited'] as const

export type EuAiActRiskClass = (typeof EU_AI_ACT_RISK_CLASSES)[number]

/** Human-readable label per risk class. */
export const EU_AI_ACT_RISK_LABEL: Readonly<Record<EuAiActRiskClass, string>> = {
  minimal:    'Minimal — no specific obligation (most ERP automations)',
  limited:    'Limited — Art.50 transparency / disclosure (e.g. chatbots, content gen)',
  high:       'High — Art.6 + Annex III (CV screening, credit scoring, sanctions screening, emotion recognition); requires risk management + human oversight',
  prohibited: 'Prohibited — Art.5 (social scoring, exploitative manipulation, real-time biometric ID); MUST refuse',
} as const

/** Payload select options. */
export const EU_AI_ACT_RISK_OPTIONS: ReadonlyArray<{ label: string; value: EuAiActRiskClass }> =
  EU_AI_ACT_RISK_CLASSES.map((value) => ({ label: EU_AI_ACT_RISK_LABEL[value], value }))

export const isEuAiActRiskClass = (value: unknown): value is EuAiActRiskClass =>
  typeof value === 'string' && (EU_AI_ACT_RISK_CLASSES as ReadonlyArray<string>).includes(value)

/**
 * Decision: should this risk class auto-accept (no human-in-the-loop)?
 * Per Art.14, high-risk AI MUST have human oversight; prohibited MUST refuse.
 */
export const canAutoAccept = (riskClass: EuAiActRiskClass): boolean =>
  riskClass === 'minimal' || riskClass === 'limited'
