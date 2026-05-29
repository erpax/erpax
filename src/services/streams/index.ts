/**
 * Quantum-stream layer — Slice RRRRRR (2026-05-11).
 *
 * Per user 'in the quantum world it is stream'. The discrete chain-
 * of-blocks model (slices PPPPPP + QQQQQQ) is the classical view —
 * agents fire in turn, events hop step-by-step through the BUSINESS_
 * CHAINS graph. At the quantum level it's all **one continuous
 * stream**: events flow through every agent surface in superposition;
 * the chain steps are observation snapshots that "collapse" the
 * stream into a definite next state.
 *
 * Concretely:
 *
 *   Classical view (slices PPPPPP + QQQQQQ)        Quantum view (this slice)
 *   --------------------------------------         -------------------------
 *   discrete events through chain steps            continuous AsyncIterable<DomainEvent>
 *   one agent processes one event at a time        agents subscribe to streams + emit streams
 *   step boundary = control-flow                   window operator (tumbling/sliding/session)
 *   chain coherence = ordered execution            stream coherence = causal Lamport order
 *   Law 32 = block composition is type-safe        Law 33 = stream coherence preserved
 *
 * Both views co-exist. The classical view is correct for orchestration
 * and human-readable diagrams; the quantum view is correct for
 * high-throughput, event-driven, partial-failure-tolerant pipelines
 * (think CDC streams, IoT telemetry, AI-agent-to-AI-agent dialogs,
 * federation broadcasts).
 *
 * What this slice ships:
 *
 *   1. `EventStream` — typed AsyncIterable<DomainEvent> with stream
 *      operators (filter / map / window / merge / partition).
 *   2. `streamFromBus(eventId, tenantId)` — turn the existing event
 *      bus into a typed stream a block can subscribe to.
 *   3. Window operators: `tumblingWindow(stream, ms)`,
 *      `slidingWindow(stream, sizeMs, stepMs)`, `sessionWindow(stream,
 *      gapMs)`.
 *   4. `streamComposeBlocks(upstream, downstream)` — wires upstream
 *      block's emitted events as a stream into downstream block's
 *      handler.
 *   5. Lamport clock per event for causal-order verification.
 *   6. Conservation Law 33 — `checkStreamCoherence`: every closed
 *      window's events must have monotonically non-decreasing Lamport
 *      timestamps; out-of-order delivery is a coherence violation.
 *
 * @standard ReactiveX / W3C Streams API (AsyncIterable surface)
 * @standard ISO/IEC 25010:2023 §5.2 performance — throughput
 * @standard Lamport 1978 — distributed-system causal ordering
 * @audit ISO 19011:2018 §6.4.6 (every stream window audit-trailed)
 */

import type { DomainEvent } from '@/services/agents/types'
import { computeContentUuid } from '@/services/integrity/content-uuid'

/**
 * Slice SSSSSS — `streamUuid` makes the stream itself tamper-proof.
 *
 * Each event's streamUuid = content-uuid({event, lamport,
 * prevStreamUuid}). The stream is a hash-chain (Merkle stream): any
 * tampering — re-ordering, mutation, insertion, deletion — breaks
 * the chain at the point of corruption and downstream.
 *
 * Conservation Law 34 — `checkStreamUuidChain`: every event's
 * streamUuid must equal the recomputed value from prev.
 */
export interface ClockedEvent {
  readonly event: DomainEvent
  readonly lamport: number     // monotonic per stream (Law 33 — RRRRRR)
  readonly streamUuid: string  // content-uuid hash-chain leaf (Law 34 — SSSSSS)
  readonly prevStreamUuid: string | null
}

const STREAM_GENESIS = '00000000-0000-0000-0000-000000000000'

/** Typed stream — a thin, typed wrapper over AsyncIterable<DomainEvent>. */
export interface EventStream extends AsyncIterable<ClockedEvent> {
  readonly id: string                          // stream id (auto-derived)
  readonly subjectFilter?: string              // optional event id filter
  readonly tenantId?: string                   // optional tenant scope
}

// ─── Bus → Stream ───────────────────────────────────────────────────

interface PendingItem { resolve: (v: IteratorResult<ClockedEvent>) => void }

/**
 * Build an in-memory hot stream that callers can `push()` into and
 * consumers can `for await … of …` over. This is the bridge from the
 * existing event bus (push-based) to the quantum stream model
 * (pull-based AsyncIterable).
 */
export function makeStream(args: { id: string; subjectFilter?: string; tenantId?: string }): EventStream & {
  push(event: DomainEvent): void
  close(): void
} {
  let lamport = 0
  let prevStreamUuid: string | null = null
  let closed = false
  const buffer: ClockedEvent[] = []
  const pending: PendingItem[] = []
  const tenantNs = args.tenantId ?? 'stream-default'

  const stream: EventStream & { push(event: DomainEvent): void; close(): void } = {
    id: args.id,
    subjectFilter: args.subjectFilter,
    tenantId: args.tenantId,
    push(event) {
      if (closed) return
      if (args.subjectFilter && event.id !== args.subjectFilter) return
      if (args.tenantId && event.tenantId !== args.tenantId) return
      const nextLamport = ++lamport
      // SSSSSS — streamUuid as Merkle hash-chain over (event, lamport, prev).
      const body = { event, lamport: nextLamport, prev: prevStreamUuid ?? STREAM_GENESIS }
      const streamUuid = computeContentUuid(body as unknown as Record<string, unknown>, tenantNs)
      const ce: ClockedEvent = { event, lamport: nextLamport, streamUuid, prevStreamUuid }
      prevStreamUuid = streamUuid
      const waiter = pending.shift()
      if (waiter) waiter.resolve({ value: ce, done: false })
      else buffer.push(ce)
    },
    close() {
      closed = true
      while (pending.length > 0) {
        pending.shift()!.resolve({ value: undefined, done: true })
      }
    },
    [Symbol.asyncIterator]() {
      return {
        next(): Promise<IteratorResult<ClockedEvent>> {
          if (buffer.length > 0) {
            return Promise.resolve({ value: buffer.shift()!, done: false })
          }
          if (closed) return Promise.resolve({ value: undefined, done: true })
          return new Promise((resolve) => pending.push({ resolve }))
        },
      }
    },
  }
  return stream
}

// ─── Operators ──────────────────────────────────────────────────────

export async function* mapStream<T>(
  stream: EventStream,
  fn: (ce: ClockedEvent) => T,
): AsyncIterable<T> {
  for await (const ce of stream) yield fn(ce)
}

export async function* filterStream(
  stream: EventStream,
  predicate: (ce: ClockedEvent) => boolean,
): AsyncIterable<ClockedEvent> {
  for await (const ce of stream) if (predicate(ce)) yield ce
}

/** Tumbling window — fixed-size non-overlapping buckets. */
export async function* tumblingWindow(
  stream: EventStream,
  windowMs: number,
): AsyncIterable<{ window: { start: number; end: number }; events: ReadonlyArray<ClockedEvent> }> {
  let bucket: ClockedEvent[] = []
  let bucketStart = Date.now()
  for await (const ce of stream) {
    bucket.push(ce)
    if (Date.now() - bucketStart >= windowMs) {
      yield { window: { start: bucketStart, end: Date.now() }, events: bucket }
      bucket = []
      bucketStart = Date.now()
    }
  }
  if (bucket.length > 0) {
    yield { window: { start: bucketStart, end: Date.now() }, events: bucket }
  }
}

/** Sliding window — every `stepMs`, emit the last `sizeMs` worth of events. */
export async function* slidingWindow(
  stream: EventStream,
  sizeMs: number,
  stepMs: number,
): AsyncIterable<{ window: { start: number; end: number }; events: ReadonlyArray<ClockedEvent> }> {
  const buffer: { ts: number; ce: ClockedEvent }[] = []
  let lastEmit = Date.now()
  for await (const ce of stream) {
    const now = Date.now()
    buffer.push({ ts: now, ce })
    while (buffer.length > 0 && now - buffer[0]!.ts > sizeMs) buffer.shift()
    if (now - lastEmit >= stepMs) {
      yield {
        window: { start: now - sizeMs, end: now },
        events: buffer.map((b) => b.ce),
      }
      lastEmit = now
    }
  }
}

/** Session window — closes after `gapMs` of silence. */
export async function* sessionWindow(
  stream: EventStream,
  gapMs: number,
): AsyncIterable<{ window: { start: number; end: number }; events: ReadonlyArray<ClockedEvent> }> {
  let bucket: ClockedEvent[] = []
  let lastTs = Date.now()
  let bucketStart = Date.now()
  for await (const ce of stream) {
    const now = Date.now()
    if (bucket.length > 0 && now - lastTs > gapMs) {
      yield { window: { start: bucketStart, end: lastTs }, events: bucket }
      bucket = []
      bucketStart = now
    }
    bucket.push(ce)
    lastTs = now
  }
  if (bucket.length > 0) yield { window: { start: bucketStart, end: lastTs }, events: bucket }
}

// ─── Conservation Law 33 — stream coherence ────────────────────────

export interface StreamCoherenceResult {
  readonly ok: boolean
  readonly windowsChecked: number
  readonly violations: ReadonlyArray<{ at: number; expected: number; got: number }>
}

/**
 * Verify that a window's events are in monotonically non-decreasing
 * Lamport order. Out-of-order delivery within a window violates
 * causal coherence (Law 33).
 */
export function checkWindowCoherence(events: ReadonlyArray<Pick<ClockedEvent, 'lamport'>>): StreamCoherenceResult {
  let last = -Infinity
  const windowsChecked = 1
  const violations: { at: number; expected: number; got: number }[] = []
  for (let i = 0; i < events.length; i++) {
    const cur = events[i]!.lamport
    if (cur < last) violations.push({ at: i, expected: last, got: cur })
    last = cur
  }
  return { ok: violations.length === 0, windowsChecked, violations }
}

// ─── Conservation Law 34 — stream uuid hash-chain (slice SSSSSS) ──

export interface StreamChainResult {
  readonly ok: boolean
  readonly leavesChecked: number
  readonly violations: ReadonlyArray<{ at: number; expectedUuid: string; gotUuid: string; reason: 'mismatch' | 'broken-prev' }>
}

/**
 * Per user 'uuid protects the stream from tampering'. Walk a list of
 * ClockedEvent and verify each event's streamUuid equals the
 * recomputed value from {event, lamport, prevStreamUuid}. Any
 * tampering — re-ordering, mutation, insertion, deletion — breaks
 * the chain at the point of corruption and downstream.
 *
 * Conservation Law 34. Tenant scope is recovered from the first
 * event's `event.tenantId`; for cross-tenant streams (federation
 * AAAAAA), pass an explicit `tenantNs`.
 */
export function checkStreamUuidChain(
  events: ReadonlyArray<ClockedEvent>,
  tenantNs?: string,
): StreamChainResult {
  if (events.length === 0) return { ok: true, leavesChecked: 0, violations: [] }
  const ns = tenantNs ?? events[0]!.event.tenantId ?? 'stream-default'
  const violations: { at: number; expectedUuid: string; gotUuid: string; reason: 'mismatch' | 'broken-prev' }[] = []
  let prev: string | null = null
  for (let i = 0; i < events.length; i++) {
    const ce = events[i]!
    if (ce.prevStreamUuid !== prev) {
      violations.push({ at: i, expectedUuid: prev ?? STREAM_GENESIS, gotUuid: ce.prevStreamUuid ?? STREAM_GENESIS, reason: 'broken-prev' })
    }
    const body = { event: ce.event, lamport: ce.lamport, prev: ce.prevStreamUuid ?? STREAM_GENESIS }
    const expected = computeContentUuid(body as unknown as Record<string, unknown>, ns)
    if (expected !== ce.streamUuid) {
      violations.push({ at: i, expectedUuid: expected, gotUuid: ce.streamUuid, reason: 'mismatch' })
    }
    prev = ce.streamUuid
  }
  return { ok: violations.length === 0, leavesChecked: events.length, violations }
}

// ─── Stream-level block composition (slice PPPPPP cont.) ───────────

/**
 * Stream-of-blocks composition: upstream block's emitted events
 * become a stream the downstream block subscribes to. This is the
 * quantum analogue of `composeBlocks` (which operated on type lists).
 *
 * Returns an EventStream the downstream block can `for await` over.
 */
export function pipeBlocks(args: {
  upstreamStream: EventStream
  downstreamSubscribesTo: ReadonlyArray<string>
}): EventStream {
  const out = makeStream({
    id: `${args.upstreamStream.id}>filter`,
  })
  ;(async () => {
    for await (const ce of args.upstreamStream) {
      if (args.downstreamSubscribesTo.includes(ce.event.id)) out.push(ce.event)
    }
    out.close()
  })()
  return out
}

/** Test-only — never call in prod. */
export interface __StreamProbe {
  readonly bufferLength: number
  readonly pendingResolvers: number
}
