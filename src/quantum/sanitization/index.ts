/**
 * quantum/sanitization — clean at the boundary, three ways.
 *
 * Append-only content-addressing forbids in-place mutation. Sanitization collapses
 * through the gate: input (harmonize untrusted data), redact (project a void view
 * for unauthorized readers), purge (crypto-shred the key → plaintext → void).
 * Every scrub emits an audited [[receipt]].
 *
 *   tsx src/quantum/sanitization/index.ts input
 *
 * @audit boundaries composed from memory/architecture + shred + receipt; never hand-asserted
 * @see ../../memory/architecture — ../../shred — ../../receipt — ./SKILL.md
 */
import { uuid, jcsCanonicalize } from '@/integrity'
import { sanitizeMemoryRecord, sanitizedMemoryUuid } from '@/memory/architecture'
import { erase, type ErasureOutcome } from '@/shred'
import { issueReceipt, type Decision, type Receipt } from '@/receipt'

/** The three boundary moves — each a collapse, never an in-place edit. */
export type SanitizeBoundary = 'input' | 'redact' | 'purge'

const DEFAULT_DENIED = ['email', 'phone', 'ssn', 'password', 'token', 'iban', 'jwt'] as const

/** Input boundary: accept untrusted data; collapse to harmonized content only. */
export function sanitizeInput<T extends Record<string, unknown>>(raw: T): Record<string, unknown> {
  return sanitizeMemoryRecord(raw)
}

/**
 * Redact boundary: project a sanitized view — PII keys become null (void in this
 * dimension) while the content-addressed original conceptually stays whole.
 */
export function redactProjection<T extends Record<string, unknown>>(
  record: T,
  deniedFields: readonly string[] = DEFAULT_DENIED,
): Record<string, unknown> {
  const denied = new Set(deniedFields)
  const walk = (value: unknown): unknown => {
    if (value === null || typeof value !== 'object') return value
    if (Array.isArray(value)) return value.map(walk)
    const obj = value as Record<string, unknown>
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(obj)) {
      out[k] = denied.has(k) ? null : walk(v)
    }
    return out
  }
  return walk(record) as Record<string, unknown>
}

/** Purge boundary: destroy the decryption key — honest erasure in a content-addressed store. */
export function purgeByKeyDestroy(uuidOverEnvelope = true): ErasureOutcome {
  return erase(uuidOverEnvelope)
}

/** Content-uuid of a scrub act — same boundary+sanitized ⇒ same receipt anchor. */
export function scrubContentUuid(boundary: SanitizeBoundary, sanitized: unknown): string {
  return uuid(jcsCanonicalize({ boundary, sanitized }))
}

/** Audited scrub receipt — authorized sanitization, never silent tamper. */
export function scrubReceipt(args: {
  readonly boundary: SanitizeBoundary
  readonly sanitized: unknown
  readonly actor: string
  readonly head: { readonly leafUuid: string; readonly seq: number } | null
  readonly timestampIso: string
}): Receipt {
  const contentUuid = scrubContentUuid(args.boundary, args.sanitized)
  const decision: Decision = {
    action: `sanitize:${args.boundary}`,
    actor: args.actor,
    outcome: 'allow',
    tier: 'scrub',
    capabilities: ['sanitize', contentUuid.slice(0, 8)],
  }
  return issueReceipt({
    decision,
    head: args.head,
    timestampIso: args.timestampIso,
  })
}

/** Full input scrub: sanitize → content-uuid → receipt chain link. */
export function scrubInput<T extends Record<string, unknown>>(args: {
  readonly raw: T
  readonly actor: string
  readonly head: { readonly leafUuid: string; readonly seq: number } | null
  readonly timestampIso: string
}): { readonly sanitized: Record<string, unknown>; readonly contentUuid: string; readonly receipt: Receipt } {
  const sanitized = sanitizeInput(args.raw)
  const contentUuid = sanitizedMemoryUuid(sanitized)
  return {
    sanitized,
    contentUuid,
    receipt: scrubReceipt({
      boundary: 'input',
      sanitized,
      actor: args.actor,
      head: args.head,
      timestampIso: args.timestampIso,
    }),
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const mode = (process.argv[2] ?? 'input') as SanitizeBoundary
  if (mode === 'purge') {
    const outcome = purgeByKeyDestroy(true)
    console.log(`quantum/sanitization — purge: keyDestroyed=${outcome.keyDestroyed} chainIntact=${outcome.chainIntact}`)
    process.exit(0)
  }
  const demo = scrubInput({
    raw: { atomPath: 'merge', email: 'user@example.com', kind: 'fact' },
    actor: 'agent:scrub',
    head: null,
    timestampIso: '2026-06-08T00:00:00.000Z',
  })
  const redacted = redactProjection(demo.sanitized)
  console.log(`quantum/sanitization — ${mode}`)
  console.log(`  contentUuid: ${demo.contentUuid}`)
  console.log(`  receipt: ${demo.receipt.leafUuid.slice(0, 8)}…`)
  console.log(`  redacted email: ${String(redacted.email)}`)
}
