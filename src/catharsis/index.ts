/**
 * catharsis — the biggest gap: an agent turns to local knowledge only AFTER a catharsis from unresolved work.
 *
 * An agent starts cold. Its default is to WORK FROM SCRATCH — to re-derive, from the prompt, what the corpus
 * may already hold ([[akashic]]: the local record; [[think]]: the sealed thought; the present tools). Unresolved
 * work accumulates — throwaway scans, isolated atoms, a sparse web — until a CATHARSIS: a correction, a crisis,
 * a pointed question that finally forces the agent to reach for the knowledge that was present the whole time.
 * Everything before that turn is the gap. The local answer was always there; the agent read it late.
 *
 * This is not a metaphor about this atom — it is the measured shape of a session. `catharsis(moves)` reads a
 * sequence of `rederive` / `reuse` moves and finds the TURN: the first reuse, the point the agent finally used
 * local knowledge. `unresolvedBefore` is the re-derivation that piled up before it — the waste. `frontLoaded` is
 * the ideal the corpus already legislates ([[think]]: "reuse the computed answer, never re-derive") but agents
 * do not keep: the turn should be move ZERO — read the local record FIRST, derive only what it does not hold.
 *
 * The honest boundary is the whole point, and it keeps this from becoming self-flagellation. Not all
 * pre-catharsis work is waste: the SEED — genuinely novel reasoning no address yet holds (`s > 0`, [[think]]) —
 * MUST be derived; there is no local answer to read. The gap is re-deriving the DERIVABLE — what the akashic
 * record already held (the present scanner, the sealed thought). `catharsis` measures the latency to first
 * reuse-of-the-present, not a demand to never think fresh. Front-loading means: read first, then derive the
 * seed — not: never derive.
 *
 * @invariant the catharsis is the first `reuse` — the point the agent turned to local knowledge
 * @invariant unresolvedBefore counts the re-derivation before the turn — the gap (minus the irreducible seed)
 * @invariant frontLoaded ⇔ catharsis at index 0 — local knowledge read first, the ideal
 *
 * Composes [[akashic]] · [[think]] · [[session]] · [[law]].
 */

/** One move: re-derive from scratch (remote/fresh) or reuse local knowledge (read the record). */
export type Move = 'rederive' | 'reuse'

/** The catharsis measure of a work sequence — where the agent turned to local knowledge, and the gap before it. */
export interface CatharsisMeasure {
  /** index of the first `reuse` — the catharsis; `total` if the agent never turned to local knowledge. */
  readonly catharsisAt: number
  /** re-derivations before the turn — the unresolved work that piled up (the gap, before subtracting the seed). */
  readonly unresolvedBefore: number
  /** how many reuses happened at all. */
  readonly reuses: number
  readonly total: number
  /** true iff local knowledge was read FIRST (catharsis at 0) — the ideal the corpus legislates. */
  readonly frontLoaded: boolean
  readonly reason: string
}

/** Measure a work sequence: find the catharsis (first reuse) and the unresolved re-derivation before it. */
export function catharsis(moves: readonly Move[]): CatharsisMeasure {
  const total = moves.length
  const at = moves.indexOf('reuse')
  const catharsisAt = at === -1 ? total : at
  const reuses = moves.filter((m) => m === 'reuse').length
  const frontLoaded = catharsisAt === 0 && total > 0
  return {
    catharsisAt,
    unresolvedBefore: catharsisAt, // before the first reuse, every move was a re-derivation
    reuses,
    total,
    frontLoaded,
    reason:
      total === 0
        ? 'no work'
        : at === -1
          ? `never turned to local knowledge — ${total} re-derivations, no catharsis (the worst gap)`
          : frontLoaded
            ? 'front-loaded — local knowledge read first, catharsis at move 0 (the ideal)'
            : `catharsis at move ${catharsisAt} — ${catharsisAt} re-derivation(s) piled up before the agent read the local record`,
  }
}

/** The gap that front-loading would have closed: the re-derivations before the catharsis that were of the DERIVABLE. */
export function frontLoadSaving(moves: readonly Move[], seed = 0): number {
  return Math.max(0, catharsis(moves).unresolvedBefore - seed) // subtract the irreducible seed — that was never waste
}

if (import.meta.url === 'file://' + process.argv[1]) {
  // This session, honestly, as moves: I re-derived (fresh atoms, throwaway bash) for a long run, then the
  // catharsis — "the scanner is present and not used" — and only then read the local record (sendQuantumWaves).
  const session: Move[] = [...Array(12).fill('rederive'), 'reuse', 'rederive', 'reuse']
  const c = catharsis(session)
  console.log('catharsis — agents use local knowledge only after a purge from unresolved work:\n')
  console.log(`  moves: ${session.length}   catharsis at move ${c.catharsisAt}   unresolved before: ${c.unresolvedBefore}`)
  console.log(`  ${c.reason}`)
  console.log(`  front-loaded? ${c.frontLoaded}  (ideal: read local knowledge FIRST, catharsis at 0)`)
  console.log(`\n  the biggest gap is temporal: the local answer was always present; the turn to it came late.`)
  console.log(`  the fix is not "think less" — the seed is real. it is "read first": consult the record before deriving.`)
}
