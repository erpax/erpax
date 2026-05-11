/**
 * AI Sanctions / PEP Fuzzy-Match — match a KYC subject's name +
 * country against the EU CFSP / UN / OFAC consolidated sanctions
 * lists with fuzzy / phonetic matching.
 *
 * Slice XXX (2026-05-10): wraps `callWorkersAi` for the
 * `ai_sanctions_screening` feature. **HIGH-RISK** per EU AI Act 2024
 * Annex III (access to essential services / migration / asylum) —
 * `aiRiskClass: 'high'` is hard-coded; the wrapper rejects any
 * caller that tries to override + NEVER auto-accepts (every match
 * goes to human review per FATF R.7).
 *
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @standard FATF R.7 sanctions-screening-obligations
 * @standard FATF R.12 politically-exposed-persons
 * @compliance EU CFSP consolidated-sanctions-list
 * @compliance EU AMLD5 §13(1)(d)
 * @compliance EU AI Act 2024 Annex III high-risk
 * @compliance GDPR Art.22 automated-individual-decision-making
 * @compliance GDPR Art.22(3) right-to-human-intervention
 * @see ./cloudflare-ai.ts
 */

import type { PayloadRequest } from 'payload'
import { callWorkersAi, type WorkersAiBinding, type AiCallResult } from './cloudflare-ai'

export interface SanctionsScreeningInput {
  readonly subjectId: string
  readonly subjectName: string
  /** ISO 3166-1 alpha-2. */
  readonly countryCode?: string
  readonly dateOfBirth?: string
  /** Sanctions / PEP entries to screen against (caller fetches the latest list). */
  readonly screenList: ReadonlyArray<{
    readonly listEntryId: string
    readonly fullName: string
    readonly aliases?: ReadonlyArray<string>
    readonly nationality?: string
    readonly dateOfBirth?: string
    readonly source: 'EU_CFSP' | 'UN' | 'OFAC' | 'PEP'
    readonly riskCategory?: string
  }>
}

export interface SanctionsScreeningOutput {
  /** Sorted matches (highest confidence first). Empty when no match found. */
  readonly matches: ReadonlyArray<{
    readonly listEntryId: string
    readonly confidence: number
    readonly matchReason: string
  }>
  readonly screenedAt: string // ISO 8601
}

export async function screenSubjectAgainstSanctions(
  req: PayloadRequest,
  binding: WorkersAiBinding | undefined,
  input: SanctionsScreeningInput,
): Promise<AiCallResult<SanctionsScreeningOutput>> {
  const listText = input.screenList
    .map(
      (e) =>
        `- id=${e.listEntryId} | source=${e.source} | name="${e.fullName}"` +
        (e.aliases?.length ? ` | aliases=${e.aliases.join(', ')}` : '') +
        (e.nationality ? ` | nat=${e.nationality}` : '') +
        (e.dateOfBirth ? ` | dob=${e.dateOfBirth}` : '') +
        (e.riskCategory ? ` | risk=${e.riskCategory}` : ''),
    )
    .join('\n')

  return callWorkersAi<SanctionsScreeningOutput>(req, binding, {
    feature: 'ai_sanctions_screening',
    model: '@cf/meta/llama-3.1-8b-instruct',
    // Sanctions screening is HIGH RISK under EU AI Act Annex III.
    // The wrapper enforces no-auto-accept regardless of autoAcceptThreshold.
    aiRiskClass: 'high',
    inputs: {
      messages: [
        {
          role: 'system',
          content: `You are a sanctions-screening assistant. Match a subject against a consolidated sanctions / PEP list using fuzzy + phonetic matching.
Output ONLY JSON: { "matches": [{ "listEntryId": string, "confidence": 0..1, "matchReason": string }], "screenedAt": ISO-8601 }.
Be CONSERVATIVE — false negatives are unacceptable. Include ANY plausible match (≥ 0.5 confidence). Never decide on behalf of the human; you suggest, the compliance officer decides.`,
        },
        {
          role: 'user',
          content: `Subject:
- name: "${input.subjectName}"
- country: ${input.countryCode ?? 'unknown'}
- DOB: ${input.dateOfBirth ?? 'unknown'}

Screening list (${input.screenList.length} entries):
${listText}`,
        },
      ],
    },
    sourceCollection: 'kyc-checks',
    sourceId: input.subjectId,
    // NEVER set autoAcceptThreshold for high-risk features. The wrapper
    // ignores it for aiRiskClass='high' anyway, but documenting the
    // intent here matches FATF R.7 (compliance officer must decide).
  })
}
