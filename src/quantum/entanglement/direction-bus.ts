/**
 * quantum/entanglement/direction-bus — immediate direction collapse for running agents.
 *
 * Parent coordinators publish a content-uuid sealed signal; workers subscribed on the
 * same path observe it synchronously (same tick) — no resume-wait. In-flight work
 * holds an interruptToken; publish bumps generation and invalidates stale tokens.
 *
 * @see ./SKILL.md · ../../agent/communication/SKILL.md
 */
import { computeContentUuid } from '@/integrity'
import { toAtomPath } from '@/path'

export const DIRECTION_COLLAPSE_EVENT = 'agent:direction:collapse' as const

export interface DirectionPayload {
  readonly instruction: string
  readonly issuer: string
  readonly issuedAt: string
  readonly agentId?: string
  readonly [key: string]: unknown
}

export interface SealedDirection {
  readonly path: string
  readonly seal: string
  readonly payload: DirectionPayload
  readonly generation: number
}

export interface InterruptToken {
  readonly path: string
  readonly agentId: string
  readonly token: string
  readonly generation: number
}

interface ChannelState {
  generation: number
  latest: SealedDirection | null
  subscribers: Set<(dir: SealedDirection) => void>
}

const channels = new Map<string, ChannelState>()

const channelOf = (path: string): ChannelState => {
  let ch = channels.get(path)
  if (!ch) {
    ch = { generation: 0, latest: null, subscribers: new Set() }
    channels.set(path, ch)
  }
  return ch
}

/** Atom path for improve-loop direction — derived from improve facet location. */
export const improveDirectionPath = (): string =>
  toAtomPath('src/monitor/violations/improve.ts', 'fs') || 'monitor/violations/improve'

/** Atom path for dry-clean cycle direction — parent may redirect mid-pass. */
export const cleanDirectionPath = (): string =>
  toAtomPath('src/apply/clean.ts', 'fs') || 'apply/clean'

/** Atom path for automate orchestration loop — parent may redirect mid-pass. */
export const automateDirectionPath = (): string =>
  toAtomPath('src/apply/automate/index.ts', 'fs') || 'apply/automate'

/** Seal and publish a direction collapse — notifies subscribers synchronously. */
export function publishDirection(
  path: string,
  payload: Omit<DirectionPayload, 'issuedAt'> & { readonly issuedAt?: string },
): SealedDirection {
  const ch = channelOf(path)
  const issuedAt = payload.issuedAt ?? new Date().toISOString()
  const generation = ch.generation + 1
  const body = { ...payload, issuedAt } as DirectionPayload
  const seal = computeContentUuid(
    { id: DIRECTION_COLLAPSE_EVENT, path, payload: body, generation },
    path,
  )
  const sealed: SealedDirection = { path, seal, payload: body, generation }
  ch.generation = generation
  ch.latest = sealed
  for (const handler of ch.subscribers) {
    handler(sealed)
  }
  return sealed
}

/** Subscribe to direction collapses on a path — handler runs in the publisher's tick. */
export function subscribeDirection(
  path: string,
  handler: (dir: SealedDirection) => void,
): () => void {
  const ch = channelOf(path)
  ch.subscribers.add(handler)
  return () => {
    ch.subscribers.delete(handler)
  }
}

/** Capture generation at work start — stale after the next publishDirection on this path. */
export function interruptTokenFor(path: string, agentId: string): InterruptToken {
  const ch = channelOf(path)
  const token = computeContentUuid(
    { id: 'agent:direction:token', path, agentId, generation: ch.generation },
    path,
  )
  return { path, agentId, token, generation: ch.generation }
}

/** True when a newer direction collapsed after this token was issued. */
export function isDirectionStale(token: InterruptToken): boolean {
  return channelOf(token.path).generation !== token.generation
}

/** Latest sealed direction on a path, if any. */
export function peekDirection(path: string): SealedDirection | null {
  return channelOf(path).latest
}

/** Active entangled direction channels (one per path with subscribers or history). */
export function entangledChannelCount(): number {
  return channels.size
}

/** Reset all channels — tests only. */
export function __resetDirectionBusForTests(): void {
  channels.clear()
}
