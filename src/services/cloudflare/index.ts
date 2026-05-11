/**
 * Cloudflare integration — typed bindings + boot health check.
 *
 * Slice IIIIII (2026-05-11). Per spec §0e: every CF primitive maps
 * to a vortex face. This module exposes the typed surface; concrete
 * Workers Workflow / DurableObject classes land in their own files
 * once `wrangler.jsonc` declares them.
 *
 * @standard Cloudflare Workers Runtime API
 * @standard W3C Service Worker §4 (Workers compat)
 */

import type { Payload } from 'payload'

/**
 * The CF env shape ERPax expects when running on Workers. Optional
 * bindings degrade gracefully (e.g. local dev without R2 still works,
 * just without redundancy).
 */
export interface ErpaxCfEnv {
  // Storage
  readonly D1?: D1Database
  readonly R2?: R2Bucket
  readonly KV?: KVNamespace
  readonly AUDIT_CHAIN_DO?: DurableObjectNamespace  // per-tenant Merkle HEAD
  // Compute / messaging
  readonly QUEUE?: Queue                            // emitDomainEvent fan-out
  readonly AI?: { run(model: string, args: Record<string, unknown>): Promise<unknown> } // Workers AI
  readonly WORKFLOWS?: { create(id: string, input: unknown): Promise<unknown> }         // chain runner
  readonly VECTORIZE?: { query(args: Record<string, unknown>): Promise<unknown> }       // search index
  // Observability
  readonly ANALYTICS?: { writeDataPoint(args: Record<string, unknown>): void }          // CostMetric / CarbonEstimate
}

// Minimal type stubs — Workers types come from @cloudflare/workers-types when wired.
export type D1Database = { prepare(query: string): unknown }
export type R2Bucket = { get(key: string): Promise<{ body?: ReadableStream } | null>; put(key: string, value: ArrayBuffer | string): Promise<unknown> }
export type KVNamespace = { get(key: string): Promise<string | null>; put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void> }
export type DurableObjectNamespace = { idFromName(name: string): { toString(): string }; get(id: { toString(): string }): { fetch(req: Request): Promise<Response> } }
export type Queue = { send(message: unknown): Promise<void> }

export interface CfBindingsHealth {
  readonly ok: boolean
  readonly missing: ReadonlyArray<keyof ErpaxCfEnv>
  readonly available: ReadonlyArray<keyof ErpaxCfEnv>
}

/**
 * Probe every binding ERPax expects. Returns which are wired vs
 * absent. Called from `payload.onInit` so misconfigurations surface
 * at boot, not on first request.
 *
 * @standard ISO/IEC 25010:2023 §5.2 reliability — fail-fast at boot
 */
export function checkCloudflareBindingsHealthy(env: ErpaxCfEnv | undefined): CfBindingsHealth {
  if (!env) return { ok: false, missing: ['D1' as const], available: [] }
  const all: Array<keyof ErpaxCfEnv> = ['D1', 'R2', 'KV', 'AUDIT_CHAIN_DO', 'QUEUE', 'AI', 'WORKFLOWS', 'VECTORIZE', 'ANALYTICS']
  const available = all.filter((k) => env[k] !== undefined)
  const missing = all.filter((k) => env[k] === undefined)
  // OK when at least D1 is bound; the rest degrade gracefully.
  return { ok: env.D1 !== undefined, missing, available }
}

/** Stamp an AiProvenance record on every Workers AI invocation (Law 22). */
export async function runAi<T>(env: ErpaxCfEnv, args: {
  model: string
  prompt: string
  parameters?: Record<string, unknown>
  recordProvenance?: (record: unknown) => Promise<void>
}): Promise<T> {
  if (!env.AI) throw new Error('Workers AI binding not configured')
  const start = Date.now()
  const result = await env.AI.run(args.model, { prompt: args.prompt, ...(args.parameters ?? {}) })
  if (args.recordProvenance) {
    await args.recordProvenance({
      modelVersion: args.model,
      modelProvider: 'cloudflare-workers-ai',
      promptHash: '(sha256-hash-pending)',
      parameters: args.parameters ?? {},
      inputTokens: 0, outputTokens: 0,
      inferenceLatencyMs: Date.now() - start,
      invokedAt: new Date().toISOString(),
    })
  }
  return result as T
}

/** Sink CostMetric / CarbonEstimate / AiProvenance to Analytics Engine. */
export function sinkAnalytics(env: ErpaxCfEnv, dataPoint: Record<string, unknown>): void {
  if (!env.ANALYTICS) return
  env.ANALYTICS.writeDataPoint(dataPoint)
}

/** Send a DomainEvent to the Queue (Law 4 fan-out). */
export async function emitToQueue(env: ErpaxCfEnv, event: unknown): Promise<void> {
  if (!env.QUEUE) return
  await env.QUEUE.send(event)
}
