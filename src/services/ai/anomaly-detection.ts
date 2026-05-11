/**
 * AI Journal-Entry Anomaly Detection — flag JEs that deviate from the
 * tenant's historical posting pattern (round-amounts, off-hours,
 * unusual cost-centre, etc.) for SOX §404 review.
 *
 * Slice XXX (2026-05-10): wraps `callWorkersAi` for the
 * `ai_anomaly_detection` feature. Output is a list of
 * suspicion-flags with reasons; the auditor decides via the
 * ai-suggestions UI whether to investigate.
 *
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @audit ISO-19011:2018 §6.4.6 audit-evidence
 * @compliance SOX §404 internal-controls journal-entry-control TOM-JE-01
 * @compliance ISO 27002 §8.16 monitoring-activities
 * @compliance EU AI Act 2024 limited-risk
 * @see ./cloudflare-ai.ts
 */

import type { PayloadRequest } from 'payload'
import { callWorkersAi, type WorkersAiBinding, type AiCallResult } from './cloudflare-ai'

export interface JournalEntryAnomalyInput {
  readonly journalEntryId: string
  readonly entry: {
    readonly entryDate: string
    readonly description: string
    readonly totalDebit: number
    readonly totalCredit: number
    readonly userId: string
    readonly lineCount: number
  }
  /** Recent comparable JEs from the same tenant for baseline. */
  readonly historicalBaseline: ReadonlyArray<{
    readonly entryDate: string
    readonly description: string
    readonly totalDebit: number
    readonly userId: string
  }>
}

export interface JournalEntryAnomalyOutput {
  readonly anomalyScore: number // 0..1
  readonly flags: ReadonlyArray<{
    readonly kind: 'round_amount' | 'off_hours' | 'unusual_user' | 'unusual_account' | 'unusual_amount' | 'duplicate_suspect' | 'other'
    readonly severity: 'info' | 'warning' | 'critical'
    readonly description: string
  }>
}

export async function detectJournalEntryAnomalies(
  req: PayloadRequest,
  binding: WorkersAiBinding | undefined,
  input: JournalEntryAnomalyInput,
): Promise<AiCallResult<JournalEntryAnomalyOutput>> {
  return callWorkersAi<JournalEntryAnomalyOutput>(req, binding, {
    feature: 'ai_anomaly_detection',
    model: '@cf/meta/llama-3.1-8b-instruct',
    aiRiskClass: 'limited',
    inputs: {
      messages: [
        {
          role: 'system',
          content: `Detect anomalies in a posted journal entry vs. the tenant's recent posting baseline.
Output ONLY JSON: { "anomalyScore": 0..1, "flags": [{ "kind": "round_amount"|"off_hours"|..., "severity": "info"|"warning"|"critical", "description": string }] }.
Flag only what's statistically anomalous — don't repeat normal patterns.`,
        },
        {
          role: 'user',
          content: `Entry under review:
${JSON.stringify(input.entry, null, 2)}

Baseline (last ${input.historicalBaseline.length} JEs):
${JSON.stringify(input.historicalBaseline, null, 2)}`,
        },
      ],
    },
    sourceCollection: 'journal-entries',
    sourceId: input.journalEntryId,
    // Anomaly detection is review-only (no auto-action) — never auto-accept.
  })
}
