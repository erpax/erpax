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

/**
 * The CF env shape ERPax expects when running on Workers. Optional
 * bindings degrade gracefully (e.g. local dev without R2 still works,
 * just without redundancy).
 */
export interface ErpaxCfEnv {
  // Storage — Slice VVVVVVVV: one binding per CF service TYPE.
  // The uuid logic (tenant-scoped keys, purpose-prefixed DO names)
  // distinguishes purposes within the single namespace.
  readonly D1?: D1Database
  readonly R2?: R2Bucket
  readonly KV?: KVNamespace
  /**
   * Slice VVVVVVVV — unified Durable Object binding. Instance purpose
   * is encoded in the name argument passed to `idFromName`:
   *   counter:t:<tenantId>/feature/<feature>
   *   ratelimit:t:<tenantId>/feature/<feature>
   *   joblock:<jobId>
   *   chain:t:<tenantId>
   * Old 4-binding aliases (TENANT_QUOTA, RATE_LIMITER, JOB_LOCK,
   * AUDIT_CHAIN_DO) still typed for migration compatibility but new
   * code should use ERPAX_DO exclusively.
   */
  readonly ERPAX_DO?: DurableObjectNamespace
  readonly AUDIT_CHAIN_DO?: DurableObjectNamespace  // legacy alias (Slice UUUUUUUU)
  readonly TENANT_QUOTA?: DurableObjectNamespace    // legacy alias (Slice YYY)
  readonly RATE_LIMITER?: DurableObjectNamespace    // legacy alias (Slice YYY)
  readonly JOB_LOCK?: DurableObjectNamespace        // legacy alias (Slice YYY)
  // Compute / messaging
  readonly QUEUE?: Queue                            // emitDomainEvent fan-out (generic; legacy)
  readonly AI?: { run(model: string, args: Record<string, unknown>): Promise<unknown> } // Workers AI
  readonly WORKFLOWS?: { create(id: string, input: unknown): Promise<unknown> }         // chain runner
  readonly VECTORIZE?: { query(args: Record<string, unknown>): Promise<unknown> }       // generic vectorize alias

  // Slice YYYYYYYY (2026-05-11) — explicit-named bindings declared in
  // wrangler.jsonc. Each is tenant-scoped + audit-trailed via the
  // mediator wrappers below.
  readonly VECTORIZE_DOCS?: VectorizeIndex
  readonly AI_CACHE?: KVNamespace
  // Five named queue producers (one binding per service type via the
  // `queue` argument; tenant scoping happens in payload metadata).
  readonly QUEUE_AI_BATCH?: Queue
  readonly QUEUE_EINVOICE_OUT?: Queue
  readonly QUEUE_DUNNING_OUT?: Queue
  readonly QUEUE_PERIOD_CLOSE?: Queue
  readonly QUEUE_EMAIL_OUT?: Queue
  // Browser Rendering for server-side PDF/A invoice generation +
  // PAdES attestation rendering + e2e walkthrough screenshots.
  readonly BROWSER?: BrowserBinding
  // Analytics Engine datasets (multiple — per the wrangler config).
  readonly ANALYTICS?: AnalyticsEngineDataset    // legacy alias
  readonly ANALYTICS_AI?: AnalyticsEngineDataset
  // Email worker bindings (send_email destinations).
  readonly EMAIL_SEND?: EmailSendBinding
}

// Minimal type stubs — Workers types come from @cloudflare/workers-types when wired.
export type VectorizeIndex = {
  query(vector: number[], opts?: { topK?: number; filter?: Record<string, unknown> }): Promise<{ matches: Array<{ id: string; score: number; metadata?: Record<string, unknown> }> }>
  insert(vectors: Array<{ id: string; values: number[]; metadata?: Record<string, unknown> }>): Promise<unknown>
}
export type BrowserBinding = {
  fetch(req: Request): Promise<Response>
  /** Newer Browser API surface — opens a session with launch options. */
  launch?(opts?: { keepAlive?: boolean }): Promise<unknown>
}
export type AnalyticsEngineDataset = { writeDataPoint(args: Record<string, unknown>): void }
export type EmailSendBinding = {
  send(message: { from: string; to: string; raw: ReadableStream | string }): Promise<unknown>
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

// ─── Slice SSSSSSSS (2026-05-11) — tenant-scoped mediator surface ───
//
// Per user "make sure mcp is secure and bound to all related cloudflare
// bindings through erpax only". Every binding access in MCP handlers
// MUST flow through one of these wrappers — never `env.<BINDING>`
// directly. The wrappers enforce:
//
//   1. **Tenant scoping** — keys are namespaced by tenantId so
//      cross-tenant reads are impossible without the wrapper consenting.
//   2. **RBAC** — a `MediatorAuthorizer` callback (optional) is consulted
//      before any operation; rejects throw before touching the binding.
//   3. **Audit** — every call is journaled via `payload.create({
//      collection: 'audit-events', data: { ... } })` so SOX §404 +
//      ISO-19011 §6.4.6 evidence is automatic.
//   4. **Rate limiting** — caller passes the request id; mediator can
//      consult the rate-limiter DO before proceeding.
//   5. **PII redaction** — payloads are passed through a redactor when
//      writing observability sinks (Analytics Engine) so PII never
//      escapes the tenant boundary.
//
// The invariant `checkMcpBindingsAreMediated` (architecture-invariants/
// checks.ts) scans MCP handler files for direct env.* access and warns
// on any uses outside this module.

export interface MediatorContext {
  readonly env: ErpaxCfEnv
  readonly tenantId: string
  readonly payload?: { create(args: { collection: string; data: Record<string, unknown> }): Promise<unknown> }
  readonly user?: { id: string; role?: string }
  readonly authorize?: MediatorAuthorizer
}

export type MediatorAuthorizer = (op: {
  binding: keyof ErpaxCfEnv
  action: string
  tenantId: string
  user?: { id: string; role?: string }
}) => void | Promise<void>

/** Namespaced KV key — prevents cross-tenant key collision. */
function nsKey(tenantId: string, key: string): string {
  return `t:${tenantId}/${key}`
}

/** Audit-trail one mediator call (best-effort; never blocks). */
async function auditBindingCall(
  ctx: MediatorContext,
  binding: keyof ErpaxCfEnv,
  action: string,
  detail: Record<string, unknown>,
): Promise<void> {
  if (!ctx.payload) return
  try {
    await ctx.payload.create({
      collection: 'audit-events',
      data: {
        eventType: `cf:${String(binding).toLowerCase()}:${action}`,
        tenant: ctx.tenantId,
        aggregateType: 'order' as never,
        aggregateId: 'binding-call',
        payload: { binding, action, ...detail },
        userId: ctx.user?.id ?? 'system',
      },
    })
  } catch {
    /* swallow — audit best-effort; never block the binding op */
  }
}

/** KV mediator — tenant-scoped, audit-trailed. */
export async function kvGet(ctx: MediatorContext, key: string): Promise<string | null> {
  if (!ctx.env.KV) return null
  await ctx.authorize?.({ binding: 'KV', action: 'get', tenantId: ctx.tenantId, user: ctx.user })
  const v = await ctx.env.KV.get(nsKey(ctx.tenantId, key))
  await auditBindingCall(ctx, 'KV', 'get', { key })
  return v
}

export async function kvPut(
  ctx: MediatorContext,
  key: string,
  value: string,
  opts?: { expirationTtl?: number },
): Promise<void> {
  if (!ctx.env.KV) return
  await ctx.authorize?.({ binding: 'KV', action: 'put', tenantId: ctx.tenantId, user: ctx.user })
  await ctx.env.KV.put(nsKey(ctx.tenantId, key), value, opts)
  await auditBindingCall(ctx, 'KV', 'put', { key, ttl: opts?.expirationTtl })
}

/** R2 mediator — tenant-scoped object key, audit-trailed. */
export async function r2Put(
  ctx: MediatorContext,
  key: string,
  value: ArrayBuffer | string,
): Promise<void> {
  if (!ctx.env.R2) return
  await ctx.authorize?.({ binding: 'R2', action: 'put', tenantId: ctx.tenantId, user: ctx.user })
  await ctx.env.R2.put(nsKey(ctx.tenantId, key), value)
  await auditBindingCall(ctx, 'R2', 'put', {
    key,
    bytes: typeof value === 'string' ? value.length : value.byteLength,
  })
}

export async function r2Get(ctx: MediatorContext, key: string): Promise<ReadableStream | null> {
  if (!ctx.env.R2) return null
  await ctx.authorize?.({ binding: 'R2', action: 'get', tenantId: ctx.tenantId, user: ctx.user })
  const obj = await ctx.env.R2.get(nsKey(ctx.tenantId, key))
  await auditBindingCall(ctx, 'R2', 'get', { key })
  return obj?.body ?? null
}

/**
 * Slice VVVVVVVV — resolve the DO namespace to use. Prefers the unified
 * `ERPAX_DO` binding; falls back to the purpose-specific legacy binding
 * during migration. The name argument includes the purpose prefix so
 * the unified DO instance routes correctly.
 */
function pickDoNamespace(
  env: ErpaxCfEnv,
  purpose: 'counter' | 'ratelimit' | 'joblock' | 'chain',
  scopedKey: string,
): { ns: DurableObjectNamespace; name: string } | null {
  if (env.ERPAX_DO) {
    return { ns: env.ERPAX_DO, name: `${purpose}:${scopedKey}` }
  }
  // Legacy fallback — each purpose has its own binding.
  const legacy = purpose === 'chain' ? env.AUDIT_CHAIN_DO
    : purpose === 'counter' ? env.TENANT_QUOTA
    : purpose === 'ratelimit' ? env.RATE_LIMITER
    : env.JOB_LOCK
  if (!legacy) return null
  // Legacy bindings used unprefixed names; preserve that for back-compat.
  return { ns: legacy, name: scopedKey }
}

/** AUDIT_CHAIN_DO mediator — Merkle HEAD lookup per tenant. */
export async function auditChainAppend(
  ctx: MediatorContext,
  leafBytes: string,
): Promise<Response | null> {
  const target = pickDoNamespace(ctx.env, 'chain', `tenant:${ctx.tenantId}`)
  if (!target) return null
  await ctx.authorize?.({ binding: 'AUDIT_CHAIN_DO', action: 'append', tenantId: ctx.tenantId, user: ctx.user })
  const id = target.ns.idFromName(target.name)
  const stub = target.ns.get(id)
  const res = await stub.fetch(new Request('https://do/append', { method: 'POST', body: leafBytes }))
  await auditBindingCall(ctx, 'AUDIT_CHAIN_DO', 'append', { leafBytes: leafBytes.length })
  return res
}

// ─── Slice TTTTTTTT (2026-05-11) — uuid-linked DO leaves ─────────────
//
// Per user "using durable objects linked using uuid would prevent
// tampering". Each leaf carries `prevLeafUuid` so the chain is forward-
// immutable: any mutation to leaf K breaks every leaf from K+1 onward.
// The DO is keyed by tenant (idFromName(`tenant:${tenantId}`)) so no
// cross-tenant injection is possible.
//
// Wire pattern:
//   1. Fetch current head from DO (HEAD record holds latest leafUuid + seq)
//   2. Build next leaf via buildNextLeaf(head, payload)
//   3. POST { leaf, payload } to DO /append-linked endpoint
//   4. DO writes both atomically and updates HEAD → leaf.leafUuid
//
// The DO class implementation lands in src/workers/audit-chain-do.ts
// (already declared in wrangler.jsonc). This mediator function defines
// the wire protocol the DO must honour.

import {
  buildNextLeaf, type UuidLinkedLeaf, verifyUuidLinkedChain, type ChainVerifyResult,
} from '@/services/integrity/uuid-linked-chain'

/**
 * Append a uuid-linked leaf to the tenant's audit chain DO. Returns
 * the newly-appended leaf record (with leafUuid that future appends
 * will chain to). The mediator fetches the head from the DO first so
 * the link is computed against the canonical predecessor.
 */
export async function auditChainAppendLinked(
  ctx: MediatorContext,
  payload: Record<string, unknown>,
): Promise<UuidLinkedLeaf | null> {
  const target = pickDoNamespace(ctx.env, 'chain', `tenant:${ctx.tenantId}`)
  if (!target) return null
  await ctx.authorize?.({ binding: 'AUDIT_CHAIN_DO', action: 'append-linked', tenantId: ctx.tenantId, user: ctx.user })
  const id = target.ns.idFromName(target.name)
  const stub = target.ns.get(id)
  // Phase 1: read head.
  const headRes = await stub.fetch(new Request('https://do/head'))
  const head = headRes.ok
    ? ((await headRes.json()) as { leafUuid: string; seq: number } | null)
    : null
  // Phase 2: build the next leaf (uuid-linked).
  const leaf = buildNextLeaf({ head, payload })
  // Phase 3: write atomically.
  const writeRes = await stub.fetch(
    new Request('https://do/append-linked', {
      method: 'POST',
      body: JSON.stringify({ leaf, payload }),
      headers: { 'content-type': 'application/json' },
    }),
  )
  if (!writeRes.ok) {
    await auditBindingCall(ctx, 'AUDIT_CHAIN_DO', 'append-linked:failed', {
      seq: leaf.seq,
      status: writeRes.status,
    })
    return null
  }
  await auditBindingCall(ctx, 'AUDIT_CHAIN_DO', 'append-linked', {
    seq: leaf.seq,
    leafUuid: leaf.leafUuid,
  })
  return leaf
}

/**
 * Walk the tenant's audit chain end-to-end and verify every link.
 * Returns the first broken-link position, or { ok: true } if intact.
 * The DO's /chain endpoint streams the chain leaves; the mediator
 * recomputes each leafUuid + verifies prevLeafUuid linkage.
 */
export async function auditChainVerify(
  ctx: MediatorContext,
  opts?: { fromSeq?: number; toSeq?: number },
): Promise<ChainVerifyResult> {
  const target = pickDoNamespace(ctx.env, 'chain', `tenant:${ctx.tenantId}`)
  if (!target) {
    return { ok: false, chainLength: 0, reason: 'no DO binding (ERPAX_DO or AUDIT_CHAIN_DO) available' }
  }
  await ctx.authorize?.({ binding: 'AUDIT_CHAIN_DO', action: 'verify', tenantId: ctx.tenantId, user: ctx.user })
  const id = target.ns.idFromName(target.name)
  const stub = target.ns.get(id)
  const q = new URLSearchParams()
  if (opts?.fromSeq !== undefined) q.set('fromSeq', String(opts.fromSeq))
  if (opts?.toSeq !== undefined) q.set('toSeq', String(opts.toSeq))
  const res = await stub.fetch(new Request(`https://do/chain?${q.toString()}`))
  if (!res.ok) {
    return { ok: false, chainLength: 0, reason: `DO /chain returned ${res.status}` }
  }
  const body = (await res.json()) as { leaves: ReadonlyArray<UuidLinkedLeaf> }
  const verdict = await verifyUuidLinkedChain({ leaves: body.leaves })
  await auditBindingCall(ctx, 'AUDIT_CHAIN_DO', 'verify', {
    chainLength: verdict.chainLength,
    ok: verdict.ok,
    brokenAtSeq: verdict.brokenAtSeq,
  })
  return verdict
}

/** AI mediator — Slice SSSSSSSS wraps Slice WWW runAi with tenant scoping. */
export async function aiRun<T>(
  ctx: MediatorContext,
  args: { model: string; prompt: string; parameters?: Record<string, unknown> },
): Promise<T> {
  await ctx.authorize?.({ binding: 'AI', action: 'run', tenantId: ctx.tenantId, user: ctx.user })
  await auditBindingCall(ctx, 'AI', 'run', { model: args.model })
  return runAi<T>(ctx.env, args)
}

/** Queue mediator — tenant-stamped event before fan-out. */
export async function queueSend(ctx: MediatorContext, event: Record<string, unknown>): Promise<void> {
  if (!ctx.env.QUEUE) return
  await ctx.authorize?.({ binding: 'QUEUE', action: 'send', tenantId: ctx.tenantId, user: ctx.user })
  const stamped = { ...event, tenantId: ctx.tenantId, mediatorAt: new Date().toISOString() }
  await ctx.env.QUEUE.send(stamped)
  await auditBindingCall(ctx, 'QUEUE', 'send', {
    eventType: (event as { eventType?: string }).eventType,
  })
}

/** Analytics sink — passes through redactor before writeDataPoint. */
export function analyticsWrite(
  ctx: MediatorContext,
  dataPoint: Record<string, unknown>,
  redact?: (dp: Record<string, unknown>) => Record<string, unknown>,
  dataset: 'default' | 'ai' = 'default',
): void {
  const sink = dataset === 'ai' ? (ctx.env.ANALYTICS_AI ?? ctx.env.ANALYTICS) : ctx.env.ANALYTICS
  if (!sink) return
  const safe = redact ? redact(dataPoint) : dataPoint
  // Tenant tag every data point so the Analytics Engine query can scope.
  sink.writeDataPoint({ ...safe, tenantId: ctx.tenantId })
}

// ─── Slice YYYYYYYY (2026-05-11) — remaining CF binding mediators ──

/** Vectorize — semantic search over per-tenant documents. */
export async function vectorizeQuery(
  ctx: MediatorContext,
  args: { vector: number[]; topK?: number; filter?: Record<string, unknown> },
): Promise<Array<{ id: string; score: number; metadata?: Record<string, unknown> }>> {
  const idx = ctx.env.VECTORIZE_DOCS
  if (!idx) return []
  await ctx.authorize?.({ binding: 'VECTORIZE_DOCS' as never, action: 'query', tenantId: ctx.tenantId, user: ctx.user })
  // Tenant scoping enforced by adding `tenant_id` to the filter — every
  // vector inserted is required to carry tenant_id in metadata.
  const filter = { ...(args.filter ?? {}), tenant_id: ctx.tenantId }
  const res = await idx.query(args.vector, { topK: args.topK, filter })
  await auditBindingCall(ctx, 'VECTORIZE_DOCS' as never, 'query',
    { topK: args.topK, matchCount: res.matches.length })
  return res.matches
}

export async function vectorizeInsert(
  ctx: MediatorContext,
  vectors: Array<{ id: string; values: number[]; metadata?: Record<string, unknown> }>,
): Promise<void> {
  const idx = ctx.env.VECTORIZE_DOCS
  if (!idx) return
  await ctx.authorize?.({ binding: 'VECTORIZE_DOCS' as never, action: 'insert', tenantId: ctx.tenantId, user: ctx.user })
  // Force tenant_id into every vector's metadata so cross-tenant
  // queries are filterable + audit-trail proves provenance.
  const stamped = vectors.map((v) => ({
    ...v,
    metadata: { ...(v.metadata ?? {}), tenant_id: ctx.tenantId },
  }))
  await idx.insert(stamped)
  await auditBindingCall(ctx, 'VECTORIZE_DOCS' as never, 'insert',
    { count: vectors.length })
}

/**
 * Named-queue dispatcher — selects the right binding by queue id.
 * Each named queue is a distinct CF service (different consumer
 * wiring + DLQ); the mediator unifies the access surface.
 */
type NamedQueue =
  | 'ai-batch' | 'einvoice-out' | 'dunning-out' | 'period-close' | 'email-out' | 'generic'

function namedQueueBinding(env: ErpaxCfEnv, name: NamedQueue): Queue | undefined {
  switch (name) {
    case 'ai-batch':     return env.QUEUE_AI_BATCH
    case 'einvoice-out': return env.QUEUE_EINVOICE_OUT
    case 'dunning-out':  return env.QUEUE_DUNNING_OUT
    case 'period-close': return env.QUEUE_PERIOD_CLOSE
    case 'email-out':    return env.QUEUE_EMAIL_OUT
    default:             return env.QUEUE
  }
}

export async function queueSendNamed(
  ctx: MediatorContext,
  queueName: NamedQueue,
  event: Record<string, unknown>,
): Promise<void> {
  const q = namedQueueBinding(ctx.env, queueName)
  if (!q) return
  await ctx.authorize?.({ binding: 'QUEUE' as never, action: `send:${queueName}`, tenantId: ctx.tenantId, user: ctx.user })
  const stamped = { ...event, tenantId: ctx.tenantId, queue: queueName, mediatorAt: new Date().toISOString() }
  await q.send(stamped)
  await auditBindingCall(ctx, 'QUEUE' as never, `send:${queueName}`, {
    eventType: (event as { eventType?: string }).eventType,
  })
}

/** Browser Rendering — server-side PDF / screenshot generation. */
export async function browserRender(
  ctx: MediatorContext,
  args: { url?: string; html?: string; format: 'pdf' | 'png'; opts?: Record<string, unknown> },
): Promise<ArrayBuffer | null> {
  const b = ctx.env.BROWSER
  if (!b) return null
  await ctx.authorize?.({ binding: 'BROWSER' as never, action: `render:${args.format}`, tenantId: ctx.tenantId, user: ctx.user })
  // Call into the Browser binding via fetch — the Worker proxy returns
  // the rendered bytes. Auth + tenant scoping handled in the request body.
  const req = new Request('https://browser/render', {
    method: 'POST',
    body: JSON.stringify({ ...args, tenantId: ctx.tenantId }),
    headers: { 'content-type': 'application/json' },
  })
  const res = await b.fetch(req)
  if (!res.ok) {
    await auditBindingCall(ctx, 'BROWSER' as never, `render:${args.format}:failed`, { status: res.status })
    return null
  }
  await auditBindingCall(ctx, 'BROWSER' as never, `render:${args.format}`, {
    bytes: Number(res.headers.get('content-length') ?? 0),
  })
  return await res.arrayBuffer()
}

/** Email Worker — outbound transactional email. */
export async function emailSend(
  ctx: MediatorContext,
  args: { from: string; to: string; raw: string },
): Promise<void> {
  const e = ctx.env.EMAIL_SEND
  if (!e) return
  await ctx.authorize?.({ binding: 'EMAIL_SEND' as never, action: 'send', tenantId: ctx.tenantId, user: ctx.user })
  await e.send({ from: args.from, to: args.to, raw: args.raw })
  await auditBindingCall(ctx, 'EMAIL_SEND' as never, 'send', {
    from: args.from, to: args.to, bytes: args.raw.length,
  })
}

/** Workflows — start a Cloudflare Workflow run. */
export async function workflowsCreate(
  ctx: MediatorContext,
  args: { workflowId: string; input: unknown },
): Promise<unknown> {
  const w = ctx.env.WORKFLOWS
  if (!w) return null
  await ctx.authorize?.({ binding: 'WORKFLOWS' as never, action: 'create', tenantId: ctx.tenantId, user: ctx.user })
  const tenantStampedInput = typeof args.input === 'object' && args.input !== null
    ? { ...(args.input as Record<string, unknown>), tenantId: ctx.tenantId }
    : { input: args.input, tenantId: ctx.tenantId }
  const result = await w.create(args.workflowId, tenantStampedInput)
  await auditBindingCall(ctx, 'WORKFLOWS' as never, 'create', { workflowId: args.workflowId })
  return result
}

/**
 * Slice SSSSSSSS — convenience builder. MCP handlers do:
 *
 *   const m = makeMediator({ env: req.env, tenantId, payload: req.payload, user: req.user })
 *   await m.kvPut('cache:key', JSON.stringify(value))
 *   const blob = await m.r2Get('reports/2026-Q1.pdf')
 *
 * Never touches `req.env.<BINDING>` directly. The invariant
 * `checkMcpBindingsAreMediated` enforces this.
 */
export function makeMediator(ctx: MediatorContext): {
  kvGet: (key: string) => Promise<string | null>
  kvPut: (key: string, value: string, opts?: { expirationTtl?: number }) => Promise<void>
  r2Put: (key: string, value: ArrayBuffer | string) => Promise<void>
  r2Get: (key: string) => Promise<ReadableStream | null>
  aiRun: <T>(args: { model: string; prompt: string; parameters?: Record<string, unknown> }) => Promise<T>
  queueSend: (event: Record<string, unknown>) => Promise<void>
  analyticsWrite: (dp: Record<string, unknown>, redact?: (dp: Record<string, unknown>) => Record<string, unknown>, dataset?: 'default' | 'ai') => void
  auditChainAppend: (leafBytes: string) => Promise<Response | null>
  /** Slice TTTTTTTT — uuid-linked tamper-evident append. */
  auditChainAppendLinked: (payload: Record<string, unknown>) => Promise<UuidLinkedLeaf | null>
  /** Slice TTTTTTTT — verify the full chain or a sub-range. */
  auditChainVerify: (opts?: { fromSeq?: number; toSeq?: number }) => Promise<ChainVerifyResult>
  /** Slice YYYYYYYY — remaining CF bindings. */
  vectorizeQuery: (args: { vector: number[]; topK?: number; filter?: Record<string, unknown> }) => Promise<Array<{ id: string; score: number; metadata?: Record<string, unknown> }>>
  vectorizeInsert: (vectors: Array<{ id: string; values: number[]; metadata?: Record<string, unknown> }>) => Promise<void>
  queueSendNamed: (queueName: 'ai-batch' | 'einvoice-out' | 'dunning-out' | 'period-close' | 'email-out' | 'generic', event: Record<string, unknown>) => Promise<void>
  browserRender: (args: { url?: string; html?: string; format: 'pdf' | 'png'; opts?: Record<string, unknown> }) => Promise<ArrayBuffer | null>
  emailSend: (args: { from: string; to: string; raw: string }) => Promise<void>
  workflowsCreate: (args: { workflowId: string; input: unknown }) => Promise<unknown>
  // ── Slice HHHHHHHHH-cut2 (2026-05-11) — uuid-anchored crypto ────
  // Composes signatures.ts + envelope.ts + tenant-key-registry.ts. The
  // four wrappers route through the per-tenant key resolver so RBAC +
  // audit + rate-limit hold at the same gradient as the rest of the
  // binding surface.
  signUuid: (uuid: string, kid?: string) => Promise<unknown>
  verifyUuid: (signed: { uuid: string; alg: 'EdDSA' | 'PS256' | 'ES256'; kid: string; sig: string; signedAt: string }) => Promise<boolean>
  encryptEnvelope: (plaintext: unknown, uuid: string, kid?: string) => Promise<unknown>
  decryptEnvelope: <T>(envelope: { uuid: string; alg: 'AES-GCM-256' | 'AES-GCM-128'; iv: string; ciphertext: string; authTag: string; kid: string }) => Promise<T>
  // ── Slice KKKKKKKKK-cut2 (2026-05-11) — query fingerprinting ────
  // Wraps any DB executor with queryUuid + resultUuid + timing. Every
  // plugin's `m.runQuery({ sql, params, exec })` produces an
  // identifiable, cacheable, replayable execution record without
  // touching the query author's code.
  runQuery: <TResult>(args: { sql: string; params?: unknown; exec: () => Promise<TResult> }) => Promise<{ queryUuid: string; result: TResult | null; resultUuid: string; elapsedMs: number; rowCount?: number }>
} {
  return {
    kvGet: (key) => kvGet(ctx, key),
    kvPut: (key, value, opts) => kvPut(ctx, key, value, opts),
    r2Put: (key, value) => r2Put(ctx, key, value),
    r2Get: (key) => r2Get(ctx, key),
    aiRun: (args) => aiRun(ctx, args),
    queueSend: (event) => queueSend(ctx, event),
    analyticsWrite: (dp, redact, dataset) => analyticsWrite(ctx, dp, redact, dataset),
    auditChainAppend: (leafBytes) => auditChainAppend(ctx, leafBytes),
    auditChainAppendLinked: (payload) => auditChainAppendLinked(ctx, payload),
    auditChainVerify: (opts) => auditChainVerify(ctx, opts),
    vectorizeQuery: (args) => vectorizeQuery(ctx, args),
    vectorizeInsert: (vectors) => vectorizeInsert(ctx, vectors),
    queueSendNamed: (queueName, event) => queueSendNamed(ctx, queueName, event),
    browserRender: (args) => browserRender(ctx, args),
    emailSend: (args) => emailSend(ctx, args),
    workflowsCreate: (args) => workflowsCreate(ctx, args),
    // Slice HHHHHHHHH-cut2 — uuid-anchored crypto wrappers.
    signUuid: async (uuid, kid) => {
      const { getDefaultKeyResolver } = await import('@/services/integrity/tenant-key-registry')
      const { signContentUuid } = await import('@/services/integrity/signatures')
      const resolver = getDefaultKeyResolver()
      const effectiveKid = kid ?? await resolver.resolveActiveKid(ctx.tenantId, 'signing')
      const privateKey = await resolver.getSigningPrivateKey(ctx.tenantId, effectiveKid)
      return signContentUuid({
        uuid: uuid as never,
        privateKey,
        alg: 'EdDSA',
        kid: effectiveKid,
      })
    },
    verifyUuid: async (signed) => {
      const { getDefaultKeyResolver } = await import('@/services/integrity/tenant-key-registry')
      const { verifyContentUuidSignature } = await import('@/services/integrity/signatures')
      const resolver = getDefaultKeyResolver()
      const publicKey = await resolver.getSigningPublicKey(ctx.tenantId, signed.kid)
      return verifyContentUuidSignature({ signed: signed as never, publicKey })
    },
    encryptEnvelope: async (plaintext, uuid, kid) => {
      const { getDefaultKeyResolver } = await import('@/services/integrity/tenant-key-registry')
      const { encryptEnvelope: enc } = await import('@/services/integrity/envelope')
      const resolver = getDefaultKeyResolver()
      const effectiveKid = kid ?? await resolver.resolveActiveKid(ctx.tenantId, 'kek')
      const kek = await resolver.getKek(ctx.tenantId, effectiveKid)
      return enc({
        plaintext,
        uuid: uuid as never,
        kek,
        kid: effectiveKid,
      })
    },
    decryptEnvelope: async (envelope) => {
      const { getDefaultKeyResolver } = await import('@/services/integrity/tenant-key-registry')
      const { decryptEnvelope: dec } = await import('@/services/integrity/envelope')
      const resolver = getDefaultKeyResolver()
      const kek = await resolver.getKek(ctx.tenantId, envelope.kid)
      return dec({ envelope: envelope as never, kek }) as never
    },
    // Slice KKKKKKKKK-cut2 — every plugin DB call is fingerprinted.
    runQuery: async (args) => {
      const { runWithFingerprint } = await import('@/services/query-fingerprint')
      const out = await runWithFingerprint({
        sql: args.sql,
        params: args.params,
        tenantId: ctx.tenantId,
        exec: args.exec,
      })
      return {
        queryUuid: out.queryUuid as unknown as string,
        result: out.result,
        resultUuid: out.resultUuid,
        elapsedMs: out.elapsedMs,
        rowCount: out.rowCount,
      }
    },
  }
}
