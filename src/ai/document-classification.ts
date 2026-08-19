/**
 * AI Document Classification — classify an uploaded file as
 * invoice / contract / bank-statement / receipt / etc. so the admin
 * UI can route it to the correct collection upload form.
 *
 * Slice XXX (2026-05-10): wraps `callWorkersAi` for the
 * `ai_document_classification` feature.
 *
 * The kind→collection routing is DETERMINISTIC (DOCUMENT_KIND_COLLECTION),
 * not the model's free-text guess: a vision model asked for a collection
 * name hallucinates slugs that do not exist. The model decides the KIND;
 * the corpus decides where that kind is filed, from verified collection
 * slugs. And the returned kind is validated against DOCUMENT_KINDS before
 * it is trusted — the @security banner below promised ai-output-validation;
 * this is it.
 *
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @standard WCAG 2.1 AA (alt-text on classified images)
 * @security ISO-27002 §5.34 ai-output-validation
 * @compliance EU AI Act 2024 minimal-risk
 * @see ./cloudflare-ai.ts
 */

import type { PayloadRequest } from 'payload'
import { AI_AUTO_ACCEPT_ROUTING } from './confidence'
import { callWorkersAi, type WorkersAiBinding, type AiCallResult } from './cloudflare'

/**
 * Every document kind the classifier can return — the single source of truth.
 * The union type, the model's prompt enumeration, and the routing map all
 * derive from this array, so a new kind is added in exactly one place.
 */
export const DOCUMENT_KINDS = [
  'invoice',
  'bill',
  'receipt',
  'bank_statement',
  'contract',
  'purchase_order',
  'goods_receipt',
  'shipping_label',
  'customs_declaration',
  'id_document',
  'utility_bill',
  'unknown',
] as const

export type DocumentKind = (typeof DOCUMENT_KINDS)[number]

/**
 * Where each kind is filed — verified collection slugs (a missing collection
 * would be a routing dead-end worse than 'unknown'). A supplier bill and a
 * utility bill are booked as AP invoices; an id document is KYC evidence; a
 * shipping label documents a shipment.
 */
export const DOCUMENT_KIND_COLLECTION: Record<DocumentKind, string> = {
  invoice: 'invoices',
  bill: 'invoices',
  receipt: 'receipts',
  bank_statement: 'bank-statements',
  contract: 'contracts',
  purchase_order: 'purchase-orders',
  goods_receipt: 'goods-receipts',
  shipping_label: 'shipments',
  customs_declaration: 'customs-declarations',
  id_document: 'kyc-checks',
  utility_bill: 'invoices',
  unknown: 'media',
}

/** The collection a classified kind is routed to — deterministic, never guessed. */
export function collectionForKind(kind: DocumentKind): string {
  return DOCUMENT_KIND_COLLECTION[kind] ?? DOCUMENT_KIND_COLLECTION.unknown
}

/** Coerce a model-returned kind to a known one — unrecognised → 'unknown' (ai-output-validation). */
export function coerceDocumentKind(raw: unknown): DocumentKind {
  return (DOCUMENT_KINDS as readonly string[]).includes(raw as string) ? (raw as DocumentKind) : 'unknown'
}

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

const KIND_ENUM = DOCUMENT_KINDS.map((k) => `"${k}"`).join('|')

export async function classifyDocument(
  req: PayloadRequest,
  binding: WorkersAiBinding | undefined,
  input: DocumentClassificationInput,
  options: { sourceCollection?: string; sourceId?: string } = {},
): Promise<AiCallResult<DocumentClassificationOutput>> {
  const res = await callWorkersAi<DocumentClassificationOutput>(req, binding, {
    feature: 'ai_document_classification',
    model: '@cf/meta/llama-3.2-11b-vision-instruct',
    aiRiskClass: 'minimal',
    inputs: {
      messages: [
        {
          role: 'system',
          content: `Classify a document image. Output ONLY JSON: { "kind": ${KIND_ENUM}, "confidence": 0..1, "extractedTitle": string|null }.`,
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
    autoAcceptThreshold: AI_AUTO_ACCEPT_ROUTING, // 9/10 — routing decisions are reversible
  })
  if (!res.ok) return res
  // Validate the model's kind, then route it DETERMINISTICALLY — the model no
  // longer names the collection (it hallucinated slugs); the corpus does.
  const kind = coerceDocumentKind(res.output.kind)
  return { ...res, output: { ...res.output, kind, suggestedCollection: collectionForKind(kind) } }
}
