/**
 * AI Document Classification — classify an uploaded file as
 * invoice / contract / bank-statement / receipt / etc. so the admin
 * UI can route it to the correct collection upload form.
 *
 * Slice XXX (2026-05-10): wraps `callWorkersAi` for the
 * `ai_document_classification` feature.
 *
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @standard WCAG 2.1 AA (alt-text on classified images)
 * @compliance EU AI Act 2024 minimal-risk
 * @see ./cloudflare-ai.ts
 */

import type { PayloadRequest } from 'payload'
import { callWorkersAi, type WorkersAiBinding, type AiCallResult } from './cloudflare-ai'

export type DocumentKind =
  | 'invoice'
  | 'bill'
  | 'receipt'
  | 'bank_statement'
  | 'contract'
  | 'purchase_order'
  | 'goods_receipt'
  | 'shipping_label'
  | 'customs_declaration'
  | 'id_document'
  | 'utility_bill'
  | 'unknown'

export interface DocumentClassificationInput {
  /** Base64-encoded image / PDF first-page render. */
  readonly imageBase64: string
  readonly languageHint?: string
}

export interface DocumentClassificationOutput {
  readonly kind: DocumentKind
  readonly confidence: number
  readonly suggestedCollection: string
  readonly extractedTitle?: string
}

export async function classifyDocument(
  req: PayloadRequest,
  binding: WorkersAiBinding | undefined,
  input: DocumentClassificationInput,
  options: { sourceCollection?: string; sourceId?: string } = {},
): Promise<AiCallResult<DocumentClassificationOutput>> {
  return callWorkersAi<DocumentClassificationOutput>(req, binding, {
    feature: 'ai_document_classification',
    model: '@cf/meta/llama-3.2-11b-vision-instruct',
    aiRiskClass: 'minimal',
    inputs: {
      messages: [
        {
          role: 'system',
          content: `Classify a document image. Output ONLY JSON: { "kind": "invoice"|"bill"|"receipt"|"bank_statement"|"contract"|"purchase_order"|"goods_receipt"|"shipping_label"|"customs_declaration"|"id_document"|"utility_bill"|"unknown", "confidence": 0..1, "suggestedCollection": string, "extractedTitle": string|null }.`,
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: `Classify. Language hint: ${input.languageHint ?? 'auto'}.` },
            { type: 'image_url', image_url: { url: `data:image/png;base64,${input.imageBase64}` } },
          ],
        },
      ],
    },
    sourceCollection: options.sourceCollection,
    sourceId: options.sourceId,
    autoAcceptThreshold: 0.9, // routing decisions are reversible — auto-accept high confidence
  })
}
