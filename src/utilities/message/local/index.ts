/**
 * message/local — which safeguards a local-only message fabric avoids, and which follow it anyway.
 *
 * Session claim (2026-07-16): "you could never ever hit claude safeguards if using only local
 * messaging — especially if using quantum glagolitic." The honest split, held as three laws:
 *
 *   1. TRUE for the SEND GATE — a message whose every consumer stays on this machine is a
 *      reversible local write; the outward-send confirmation has nothing to fire on. But the
 *      gate binds to EFFECT, not transport: ONE off-machine consumer (webhook · SMTP bridge ·
 *      MCP connector) makes the FIRST local write the outward send (`effectOf` · `sendGate`).
 *   2. FALSE for the INJECTION BOUNDARY — content arriving over ANY channel is data, not
 *      instruction; local origin confers no authority. Only the principal instructs (`authorityOf`).
 *   3. FALSE for CONTENT SAFEGUARDS — the verdict binds to DECODED meaning: judge ∘ decode, so
 *      re-encoding (glagolitic script, cipher) never flips it (`judgeWire`), and a quantum
 *      superposition of readings fails CLOSED — one refusing branch refuses all (`judgeSuperposed`).
 *
 * MODEL, not mechanism: this atom names the geometry of the safeguards (what binds to what —
 * effect · channel · meaning); it does not implement their enforcement.
 */
export const atomPath = 'message/local'

/** How far a consumer can carry the message: this machine, or off it. */
export type Reach = 'machine' | 'network'

export interface Consumer {
  name: string
  reach: Reach
}

export type Effect = 'local' | 'outward'

/** Law 1 — effect, not transport: ONE off-machine consumer makes the whole send outward. */
export const effectOf = (consumers: readonly Consumer[]): Effect =>
  consumers.some((c) => c.reach === 'network') ? 'outward' : 'local'

/** The send gate fires on outward effect only — a local-only fabric never trips it. */
export const sendGate = (consumers: readonly Consumer[]): 'pass' | 'confirm' =>
  effectOf(consumers) === 'outward' ? 'confirm' : 'pass'

/** Law 2 — authority binds to channel: every message is data; only the principal instructs. */
export type Channel = 'principal' | 'message'

export const authorityOf = (channel: Channel): 'instruction' | 'data' =>
  channel === 'principal' ? 'instruction' : 'data'

/** Glagolitic small-letter block — 26 consecutive codepoints stand in for a–z. */
const GLAGOLITIC_BASE = 0x2c30
const LATIN_BASE = 0x61

/** Re-encode a–z into glagolitic script — the wire changes, the meaning does not. */
export const toGlagolitic = (latin: string): string =>
  [...latin.toLowerCase()]
    .map((ch) => {
      const i = ch.charCodeAt(0) - LATIN_BASE
      return i >= 0 && i < 26 ? String.fromCharCode(GLAGOLITIC_BASE + i) : ch
    })
    .join('')

/** Decode glagolitic back to a–z — exact round-trip of `toGlagolitic`. */
export const fromGlagolitic = (wire: string): string =>
  [...wire]
    .map((ch) => {
      const i = ch.charCodeAt(0) - GLAGOLITIC_BASE
      return i >= 0 && i < 26 ? String.fromCharCode(LATIN_BASE + i) : ch
    })
    .join('')

export type Verdict = 'allow' | 'refuse'

/** A content judgment over MEANING — the model's stand-in for any content safeguard. */
export type Judge = (meaning: string) => Verdict

/** Law 3 — the verdict composes as judge ∘ decode: any encoding of one meaning judges identically. */
export const judgeWire = (judge: Judge, decode: (wire: string) => string, wire: string): Verdict =>
  judge(decode(wire))

/** Law 3, quantum half — a superposition of readings fails CLOSED: one refusing branch refuses all. */
export const judgeSuperposed = (judge: Judge, branches: readonly string[]): Verdict =>
  branches.some((branch) => judge(branch) === 'refuse') ? 'refuse' : 'allow'

/** @index-cross.foldback child=message/local parent=message — this cross folds back into its parent. */
