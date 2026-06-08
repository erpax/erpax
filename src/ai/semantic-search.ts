/**
 * AI Semantic Search — query the per-tenant Vectorize namespace for
 * documents semantically similar to a query string.
 *
 * Slice XXX (2026-05-10): wraps `callWorkersAi` (for the query
 * embedding) + Vectorize `query()` (for the nearest-neighbour
 * lookup). The Vectorize query MUST filter on `tenant_id` metadata
 * to enforce ISO 27001 A.5.23 tenant isolation.
 *
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @compliance EU AI Act 2024 minimal-risk
 * @see ./embed-document.ts
 * @see ./cloudflare-ai.ts
 */

import type { PayloadRequest } from 'payload'
import { callWorkersAi, type WorkersAiBinding, type AiCallResult } from './cloudflare-ai'

export interface VectorizeQueryBinding {
  query(
    vector: ReadonlyArray<number>,
    options?: {
      topK?: number
      filter?: Record<string, string | number | boolean>
      returnMetadata?: boolean
    },
  ): Promise<{
    matches: ReadonlyArray<{
      id: string
      score: number
      metadata?: Record<string, unknown>
    }>
  }>
}

export interface SemanticSearchInput {
  readonly query: string
  readonly topK?: number
  /** Optional collection filter (e.g. only `invoices`). */
  readonly collectionFilter?: string
}

export interface SemanticSearchOutput {
  readonly matches: ReadonlyArray<{
    readonly id: string
    readonly score: number
    readonly collection?: string
    readonly sourceId?: string
  }>
}

export async function semanticSearch(
  req: PayloadRequest,
  ai: WorkersAiBinding | undefined,
  vectorize: VectorizeQueryBinding | undefined,
  input: SemanticSearchInput,
): Promise<AiCallResult<SemanticSearchOutput>> {
  const tenantsArr = (req.user as unknown as { tenants?: Array<{ tenant?: number | string }> } | undefined)?.tenants
  const tenantRef = tenantsArr?.[0]?.tenant
  const tenantId = String(tenantRef ?? '')

  // Embed the query text via callWorkersAi (audit row + entitlement check).
  const embedResult = await callWorkersAi<{ embedding?: ReadonlyArray<number> }>(req, ai, {
    feature: 'ai_semantic_search',
    model: '@cf/baai/bge-base-en-v1.5',
    aiRiskClass: 'minimal',
    inputs: { text: [input.query] },
    sourceCollection: input.collectionFilter,
  })

  if (!embedResult.ok) {
    return embedResult as unknown as AiCallResult<SemanticSearchOutput>
  }
  if (!vectorize) {
    return { ok: false, error: 'no_ai_binding', message: 'Vectorize binding not configured' }
  }
  const vec = embedResult.output?.embedding
  if (!Array.isArray(vec)) {
    return { ok: false, error: 'inference_failed', message: 'embedding result missing values' }
  }

  // Per-tenant filter — non-negotiable per ISO 27001 A.5.23.
  const filter: Record<string, string | number | boolean> = { tenant_id: tenantId }
  if (input.collectionFilter) filter.collection = input.collectionFilter

  const result = await vectorize.query(vec, {
    topK: input.topK ?? 10,
    filter,
    returnMetadata: true,
  })

  return {
    ok: true,
    suggestionId: embedResult.suggestionId,
    output: {
      matches: result.matches.map((m) => ({
        id: m.id,
        score: m.score,
        collection: typeof m.metadata?.collection === 'string' ? m.metadata.collection : undefined,
        sourceId: typeof m.metadata?.source_id === 'string' ? m.metadata.source_id : undefined,
      })),
    },
    humanDecision: 'auto_accepted', // search results don't require human review
  }
}
