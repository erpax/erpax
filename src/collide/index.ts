/**
 * collide — the INHALE of development, DEFERRED. The DRY collapse that folds the
 * expansion back toward one (entropy down).
 *
 * `collide(a, b)` = merge two into one: take the two atoms' content-uuids and
 * fold them with the SINGLE canonical merge primitive (`@/uuid/matrix#merge` —
 * the v8 content-uuid collision). NOTHING is re-implemented here: the merge is
 * borrowed, the entropy reading is borrowed, the ring composition is borrowed.
 *
 * The breath: development (`@/development`) is the EXHALE — first expand, raise
 * entropy, add atoms. collide is the INHALE — fold the expansion back down. This
 * atom DEFINES the inhale but does NOT run it: `DEFERRED = true`, and `pending()`
 * reports the slack the deferred collapse will later remove. Collide LATER.
 *
 *   tsx src/collide/index.ts
 *
 * @audit collide is DEFINED here and DEFERRED — never applied to the live matrix in this atom
 * @see ./SKILL.md -- ../development (the exhale) -- ../uuid/matrix (the merge) -- ../entropy
 */
import { merge, nodeOf } from '@/uuid/matrix'
import { entropy } from '@/entropy'
import { composeSteps, isMergePoint, type HoroStep } from '@/horo'

/**
 * collide is the INHALE, and it is DEFERRED. First expand (development raises
 * entropy), collide later (the DRY collapse lowers it). This atom only DEFINES
 * the fold; flipping this would mean applying it now — which is out of scope.
 */
export const DEFERRED = true as const

/** A collision: two atoms (a, b) folded to one — the resulting content-uuid + the cardinality move 2 → 1. */
export interface Collision {
  readonly a: string
  readonly b: string
  /** The folded content-uuid (the one the pair becomes) — borrowed from `@/uuid/matrix#merge`. */
  readonly uuid: string
  /** The horo step the pair composes to (the ring move of the two positions). */
  readonly step: HoroStep
  /** A merge point ⟺ the composed step is 1 or 9 (a gateway between rings) — `@/horo#isMergePoint`. */
  readonly mergePoint: boolean
  /** Cardinality before / after — collide is ALWAYS 2 → 1 (the inhale: two into one). */
  readonly from: 2
  readonly to: 1
}

/**
 * collide(a, b) = merge two into one. The fold is the EXACT canonical merge of
 * the two atoms' content-uuids (`@/uuid/matrix#merge`), so it is order-sensitive
 * exactly as the collider is, content-addressed, and zero-entropy by
 * construction. Unknown atoms still collide (their NAME is hashed via merge of
 * NIL-shaped ids would lose meaning), so we resolve the real node uuid when the
 * atom exists and fall back to a deterministic name fold otherwise.
 *
 * DEFINED, not applied: calling this computes the fold; it does NOT write the
 * matrix, run the collider, or mutate any atom. The inhale is deferred.
 */
export function collide(a: string, b: string): Collision {
  const ua = uuidOfAtom(a)
  const ub = uuidOfAtom(b)
  const positionA = stepOfAtom(a)
  const positionB = stepOfAtom(b)
  const step = composeSteps(positionA, positionB)
  return {
    a,
    b,
    uuid: merge(ua, ub),
    step,
    mergePoint: isMergePoint(positionA, positionB),
    from: 2,
    to: 1,
  }
}

/** The content-uuid of an atom: its matrix node uuid, or a deterministic self-fold of the name when unknown. */
function uuidOfAtom(atom: string): string {
  const n = nodeOf(atom)
  if (n) return n.uuid
  // Deterministic fallback for a not-yet-minted atom: fold the lowercased name's
  // bytes through merge twice (name ⊕ name) so it is stable and content-addressed.
  const bytes = Buffer.from(atom.toLowerCase(), 'utf8')
  const hex = bytes.toString('hex').padEnd(32, '0').slice(0, 32)
  const seed = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  return merge(seed, seed)
}

/** A stable horo position for an atom — the digital-root of its name length lands it on the ring (never off-ring). */
function stepOfAtom(atom: string): number {
  return atom.length === 0 ? 9 : atom.length
}

/**
 * The slack the DEFERRED collide will later remove. collide is the inhale that
 * lowers entropy (2 → 1 removes a duplicated degree of freedom); `entropy()` is
 * the borrowed-disorder reading on the LIVE matrix RIGHT NOW (the expansion the
 * exhale produced). Because the inhale is deferred, this slack is still present
 * — it is exactly what a later collapse fuses out. Direction: down (the inhale).
 */
export function pending(): { slackNow: number; deferred: boolean; direction: 'down' } {
  return { slackNow: entropy(), deferred: DEFERRED, direction: 'down' }
}

/**
 * The cardinality law of the inhale, made explicit and checkable: collide always
 * folds two into one (Δ = -1). Returns the move for a pair — pure, deterministic,
 * no live state. This is the inhale's signature (development's exhale is +1).
 */
export function fold(): { from: 2; to: 1; delta: -1; breath: 'inhale'; deferred: boolean } {
  return { from: 2, to: 1, delta: -1, breath: 'inhale', deferred: DEFERRED }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = collide('development', 'collide')
  const p = pending()
  const f = fold()
  console.log('collide — the inhale of development, DEFERRED (' + (DEFERRED ? 'defined, not applied' : 'APPLIED') + '):')
  console.log('  collide(development, collide) → ' + c.uuid)
  console.log(
    '    ' + c.from + ' → ' + c.to + ' (' + f.breath + ', Δ' + f.delta + ')  step=' + c.step + '  mergePoint=' + c.mergePoint,
  )
  console.log(
    '  pending(): slackNow=' + p.slackNow.toFixed(4) + ' (borrowed disorder the deferred collapse will fuse out, direction ' + p.direction + ')',
  )
  console.log('  fold(): two → one is the inhale; first expand (development, +1), collide later (-1).')
}
