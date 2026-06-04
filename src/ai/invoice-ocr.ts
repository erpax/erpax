/**
 * AI Invoice / Receipt OCR — extract EN-16931 BT/BG fields from a
 * PDF or image scan via Cloudflare Workers AI.
 *
 * Slice XXX (2026-05-10): thin wrapper over `callWorkersAi` for the
 * `ai_invoice_ocr` feature. Output is the AI's structured JSON for
 * the canonical EN-16931 fields; humans review via the
 * `ai-suggestions` UI before applying to a real `invoices` row
 * (GDPR Art.22(3)).
 *
 * @standard EN-16931:2017 semantic-invoice-model
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @compliance GDPR Art.5(1)(c) data-minimisation
 * @compliance GDPR Art.22(3) right-to-human-intervention
 * @compliance EU AI Act 2024 limited-risk-transparency
 * @see ./cloudflare-ai.ts
 */

import type { PayloadRequest } from 'payload'
import { callWorkersAi, type WorkersAiBinding, type AiCallResult } from '@/ai/cloudflare-ai'

export interface InvoiceOcrInput {
  /** Base64-encoded PDF or image bytes (PII-stripped at upload time). */
  readonly imageBase64: string
  /** Optional language hint (BCP-47, e.g. `bg-BG`, `en-US`). */
  readonly languageHint?: string
}

/**
 * Subset of EN-16931 BT/BG fields the OCR target. Keep narrow — every
 * field returned is one row in the human-review UI.
 */
export interface InvoiceOcrOutput {
  readonly invoiceNumber?: string         // BT-1
  readonly invoiceDate?: string           // BT-2 (ISO 8601)
  readonly currency?: string              // BT-5
  readonly sellerName?: string            // BT-27
  readonly sellerVatId?: string           // BT-31
  readonly buyerName?: string             // BT-44
  readonly buyerVatId?: string            // BT-48
  readonly subtotal?: number              // BT-109 (cents)
  readonly taxAmount?: number             // BT-110 (cents)
  readonly totalAmount?: number           // BT-112 (cents)
  readonly lines?: ReadonlyArray<{
    readonly description?: string         // BT-153
    readonly quantity?: number            // BT-129
    readonly unitPrice?: number           // BT-146 (cents)
    readonly amount?: number              // BT-131 (cents)
    readonly taxRate?: number             // BT-152
  }>
}

const PROMPT = `Extract these EN-16931 invoice fields as JSON:
- invoiceNumber, invoiceDate (ISO 8601), currency (ISO 4217)
- sellerName, sellerVatId, buyerName, buyerVatId
- subtotal, taxAmount, totalAmount (in cents)
- lines: [{ description, quantity, unitPrice, amount, taxRate }]
Return ONLY the JSON object. Use null for fields you cannot read with confidence.`

export async function extractInvoiceFromScan(
  req: PayloadRequest,
  binding: WorkersAiBinding | undefined,
  input: InvoiceOcrInput,
  options: { sourceCollection?: string; sourceId?: string } = {},
): Promise<AiCallResult<InvoiceOcrOutput>> {
  return callWorkersAi<InvoiceOcrOutput>(req, binding, {
    feature: 'ai_invoice_ocr',
    model: '@cf/meta/llama-3.2-11b-vision-instruct',
    aiRiskClass: 'limited', // EU AI Act limited-risk (transparency required)
    inputs: {
      messages: [
        { role: 'system', content: PROMPT },
        {
          role: 'user',
          content: [
            { type: 'text', text: `Extract invoice fields. Language hint: ${input.languageHint ?? 'auto'}.` },
            { type: 'image_url', image_url: { url: `data:image/png;base64,${input.imageBase64}` } },
          ],
        },
      ],
    },
    sourceCollection: options.sourceCollection,
    sourceId: options.sourceId,
    autoAcceptThreshold: 0.95, // very-high confidence auto-applies; below threshold human reviews
  })
}
