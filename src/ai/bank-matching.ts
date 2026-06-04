/**
 * AI Bank-Transaction → Invoice Matching — semantic match of a bank
 * transaction's `RmtInf.Ustrd` (free-text remittance information)
 * against open invoices in the same tenant.
 *
 * Slice XXX (2026-05-10): wraps `callWorkersAi` for the
 * `ai_bank_matching` feature. Replaces the brittle reference-only
 * `bank-reconciliation.service.ts` exact-string match with a
 * fuzzy/semantic match that handles "INV 2026/03 - April quote" →
 * `INV-2026-03`.
 *
 * @standard ISO 20022 camt.053 §Ntry.RmtInf.Ustrd
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @accounting IFRS IAS-7 §44 reconciliation
 * @compliance EU AI Act 2024 limited-risk
 * @see ./cloudflare-ai.ts
 */

import type { PayloadRequest } from 'payload'
import { callWorkersAi, type WorkersAiBinding, type AiCallResult } from '@/ai/cloudflare-ai'

export interface BankMatchInput {
  readonly bankTransactionId: string
  readonly remittanceInformation: string
  readonly amount: number
  readonly currency: string
  readonly counterpartyName?: string
  /** Candidate open invoices to match against (caller pre-filters by tenant + amount range). */
  readonly candidates: ReadonlyArray<{
    readonly invoiceId: string
    readonly invoiceNumber: string
    readonly customerName: string
    readonly outstandingAmount: number
  }>
}

export interface BankMatchOutput {
  /** Suggested matching invoice id, or null if no confident match. */
  readonly invoiceId: string | null
  /** Match confidence 0.0–1.0. */
  readonly confidence: number
  /** Free-text rationale for the human reviewer. */
  readonly rationale: string
}

export async function matchBankTransactionToInvoice(
  req: PayloadRequest,
  binding: WorkersAiBinding | undefined,
  input: BankMatchInput,
): Promise<AiCallResult<BankMatchOutput>> {
  const candidatesText = input.candidates
    .map((c) => `- id=${c.invoiceId}, invoice#=${c.invoiceNumber}, customer="${c.customerName}", outstanding=${c.outstandingAmount} ${input.currency}`)
    .join('\n')

  return callWorkersAi<BankMatchOutput>(req, binding, {
    feature: 'ai_bank_matching',
    model: '@cf/meta/llama-3.1-8b-instruct',
    aiRiskClass: 'limited',
    inputs: {
      messages: [
        {
          role: 'system',
          content: `Match a bank transaction to one of the candidate open invoices.
Output ONLY JSON: { "invoiceId": string|null, "confidence": 0..1, "rationale": string }.
Match only when amount AND remittance info AND counterparty all align.`,
        },
        {
          role: 'user',
          content: `Bank transaction:
- amount: ${input.amount} ${input.currency}
- remittance: "${input.remittanceInformation}"
- counterparty: "${input.counterpartyName ?? 'unknown'}"

Candidates:
${candidatesText}`,
        },
      ],
    },
    sourceCollection: 'bank-transactions',
    sourceId: input.bankTransactionId,
    // Bank matching auto-accepts very high confidence ONLY (downstream
    // payment-allocation creation is reversible, so the risk is low).
    autoAcceptThreshold: 0.92,
  })
}
