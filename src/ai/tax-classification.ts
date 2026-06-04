/**
 * AI VAT Category-Code Suggestion — suggest the EN-16931 BT-151 VAT
 * category code (UN/CEFACT 5305 EU subset) for an invoice line based
 * on item description + country + B2B/B2C context.
 *
 * Slice XXX (2026-05-10): wraps `callWorkersAi` for the
 * `ai_tax_classification` feature.
 *
 * @standard EN-16931:2017 §BT-151 invoiced-item-vat-category-code
 * @standard UN/CEFACT 5305 duty-tax-fee-category-coded
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @compliance EU AI Act 2024 limited-risk
 * @see ./cloudflare-ai.ts
 */

import type { PayloadRequest } from 'payload'
import { callWorkersAi, type WorkersAiBinding, type AiCallResult } from '@/ai/cloudflare-ai'

export interface TaxClassificationInput {
  readonly invoiceLineId?: string
  readonly itemDescription: string
  /** ISO 3166-1 alpha-2 — seller country. */
  readonly sellerCountry: string
  /** ISO 3166-1 alpha-2 — buyer country. */
  readonly buyerCountry: string
  readonly buyerIsBusiness: boolean
  readonly buyerHasValidVatId: boolean
}

export interface TaxClassificationOutput {
  /** UN/CEFACT 5305 EU subset code. */
  readonly vatCategoryCode: 'S' | 'Z' | 'E' | 'AE' | 'K' | 'G' | 'O' | 'L' | 'M'
  readonly suggestedRate?: number
  readonly rationale: string
}

export async function classifyInvoiceLineTax(
  req: PayloadRequest,
  binding: WorkersAiBinding | undefined,
  input: TaxClassificationInput,
): Promise<AiCallResult<TaxClassificationOutput>> {
  return callWorkersAi<TaxClassificationOutput>(req, binding, {
    feature: 'ai_tax_classification',
    model: '@cf/meta/llama-3.1-8b-instruct',
    aiRiskClass: 'limited',
    inputs: {
      messages: [
        {
          role: 'system',
          content: `Suggest the EN-16931 BT-151 VAT category code (UN/CEFACT 5305 EU subset) for an invoice line.
Codes: S=standard, Z=zero-rated, E=exempt, AE=reverse-charge, K=intra-community-supply (Art.138), G=export-outside-EU (Art.146), O=out-of-scope, L=Canary IGIC, M=Ceuta/Melilla IPSI.
Output ONLY JSON: { "vatCategoryCode": "S"|"Z"|"E"|"AE"|"K"|"G"|"O"|"L"|"M", "suggestedRate": number|null, "rationale": string }.`,
        },
        {
          role: 'user',
          content: `Item: "${input.itemDescription}"
Seller country: ${input.sellerCountry}
Buyer country: ${input.buyerCountry}
Buyer is business: ${input.buyerIsBusiness}
Buyer has valid VAT ID: ${input.buyerHasValidVatId}`,
        },
      ],
    },
    sourceCollection: 'invoice-lines',
    sourceId: input.invoiceLineId,
    autoAcceptThreshold: 0.97, // very-high confidence only (tax misclassification has fines)
  })
}
