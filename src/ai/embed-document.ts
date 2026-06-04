/**
 * AI Document Embedding — produce a 768-dim vector for a document
 * (invoice text / contract / journal-entry description) and upsert
 * into the per-tenant Vectorize namespace.
 *
 * Slice XXX (2026-05-10): wraps `callWorkersAi` for the
 * `ai_semantic_search` feature (embedding side). Pairs with
 * `semantic-search.ts` (query side). Per ISO 27001 A.5.23 the
 * `tenant_id` lives in vector metadata; cross-tenant queries are
 * filtered out at query time.
 *
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @compliance EU AI Act 2024 minimal-risk
 * @see ./semantic-search.ts
 * @see ./cloudflare-ai.ts
 */

import type { PayloadRequest } from 'payload'
import { callWorkersAi, type WorkersAiBinding, type AiCallResult } from '@/ai/cloudflare-ai'

export interface VectorizeBinding {
  upsert(vectors: ReadonlyArray<{
    id: string
    values: ReadonlyArray<number>
    metadata?: Record<string, string | number | boolean>
  }>): Promise<unknown>
}

export interface EmbedDocumentInput {
  /** Stable id for the source row (e.g. `invoices:42`). */
  readonly sourceKey: string
  /** Text to embed (PII-stripped). */
  readonly text: string
  readonly sourceCollection: string
  readonly sourceId: string
}

export interface EmbedDocumentOutput {
  /** 768-dim embedding from `@cf/baai/bge-base-en-v1.5`. */
  readonly embedding: ReadonlyArray<number>
}

/**
 * Generate the embedding via Workers AI + upsert into the per-tenant
 * Vectorize namespace. Returns the inference result (with audit row);
 * the caller can read `result.output.embedding` to verify.
 */
export async function embedAndUpsertDocument(
  req: PayloadRequest,
  ai: WorkersAiBinding | undefined,
  vectorize: VectorizeBinding | undefined,
  input: EmbedDocumentInput,
): Promise<AiCallResult<EmbedDocumentOutput>> {
  const tenantsArr = (req.user as unknown as { tenants?: Array<{ tenant?: number | string }> } | undefined)?.tenants
  const tenantRef = tenantsArr?.[0]?.tenant
  const tenantId = String(tenantRef ?? '')

  // First — generate embedding (via callWorkersAi → audit row, etc.).
  const result = await callWorkersAi<EmbedDocumentOutput>(req, ai, {
    feature: 'ai_semantic_search',
    model: '@cf/baai/bge-base-en-v1.5',
    aiRiskClass: 'minimal',
    inputs: { text: [input.text] },
    sourceCollection: input.sourceCollection,
    sourceId: input.sourceId,
  })

  // Second — upsert into Vectorize (only when AI inference succeeded
  // AND vectorize binding is present). The tenant_id metadata is what
  // makes this multi-tenant safe.
  if (result.ok && vectorize && tenantId) {
    try {
      const vec = (result.output as { embedding?: ReadonlyArray<number> })?.embedding
      if (vec && Array.isArray(vec)) {
        await vectorize.upsert([
          {
            id: input.sourceKey,
            values: vec,
            metadata: {
              tenant_id: tenantId,
              collection: input.sourceCollection,
              source_id: input.sourceId,
            },
          },
        ])
      }
    } catch (e) {
      req.payload.logger.warn({ err: e }, `[ai] Vectorize upsert failed for ${input.sourceKey}`)
    }
  }

  return result
}
