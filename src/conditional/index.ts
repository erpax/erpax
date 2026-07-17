/**
 * conditional — anything unprovable, folded, may prove another thing.
 *
 * [[rules]]/refutable catches the LIE: an unfalsifiable ASSERTION, stated as fact, forbidding nothing. This
 * atom is its honest complement — the unprovable used HONESTLY. An unprovable HYPOTHESIS H, folded into an
 * implication, yields a PROVEN theorem `H ⇒ Y`: the implication is provable even when H is not. That is not
 * a lie; it is a REDUCTION, and it is the structure of all of cryptography.
 *
 * The corpus already lives on one. [[tamper]]/cost says the content-address costs 2^61 to forge — but
 * nobody has PROVEN SHA-256 is collision-resistant (it is an assumption, possibly unprovable). What IS
 * proven is the implication:
 *
 *   IF finding a collision costs 2^(bits/2)   (the unproven hypothesis, disclosed)
 *   THEN the tamper-cost is 2^(bits/2)         (the theorem — arithmetic, follows unconditionally)
 *
 * The unprovable, folded, proves the conditional. The whole security of the corpus is a chain of these, and
 * the ONLY dishonesty possible is to state Y as a bare fact while hiding H. So this makes H a first-class,
 * DISCLOSED object: `given(H).proves(Y, test)` records that Y holds under H, tests the IMPLICATION (which is
 * real), and keeps H visible as the assumption — exactly what an auditor demands (disclose your assumptions;
 * SOX §302 is a certification about what a statement RESTS on).
 *
 * The difference from a lie is one bit: an unfalsifiable claim asserts Y and hides that it rests on nothing;
 * a conditional theorem asserts H ⇒ Y and NAMES H. Same unprovable core, opposite honesty.
 *
 * HONEST BOUNDARY — this proves the IMPLICATION, never the HYPOTHESIS. `H ⇒ Y` being a theorem says nothing
 * about whether H is true; if SHA-256 falls, every Y folded on it falls with it, and the disclosure is what
 * lets you SEE that in advance instead of discovering it. Disclosure is not proof; it is the precondition of
 * honest proof.
 *
 * Run: `tsx src/conditional/index.ts`
 *
 * @standard ISO-19011:2018 §6.4 — evidence: a conditional finding names its condition
 *
 * Composes [[rules]]/refutable · [[tamper]] · [[merge]] · [[law]].
 */

/** Canonical atom path. */
export const atomPath = 'conditional' as const

/** A theorem that holds ONLY under an unproven hypothesis — the honest use of the unprovable. */
export interface ConditionalTheorem<T> {
  /** The unprovable (or merely unproven) hypothesis — DISCLOSED, never hidden. This is the whole point. */
  readonly hypothesis: string
  /** The consequence Y that follows from H. */
  readonly consequence: string
  /** The implication `H ⇒ Y`, evaluated: this IS a theorem, independent of whether H is true. */
  readonly value: T
}

/** A folded hypothesis, awaiting the thing it proves. `given(H).proves(Y, ⇒)` — the unprovable, disclosed. */
export function given(hypothesis: string): {
  proves: <T>(consequence: string, imply: () => T) => ConditionalTheorem<T>
} {
  return {
    proves: (consequence, imply) => ({ hypothesis, consequence, value: imply() }),
  }
}

/**
 * The corpus's real folded assumptions — each an unprovable H yielding a proven Y. This is the DISCLOSURE:
 * everything the corpus's security rests on that nobody has proven, stated in the open so it can be argued
 * with and so that if an H falls, every Y under it is visibly known to fall.
 *
 * @invariant every entry names its hypothesis — a consequence with no disclosed condition is not conditional,
 *   it is either a theorem or a lie ([[rules]]/refutable)
 */
export const FOLDED_ASSUMPTIONS: ReadonlyArray<{ readonly hypothesis: string; readonly consequence: string }> = [
  {
    hypothesis: 'SHA-256 is collision-resistant (unproven — no proof exists that collisions require ~2^128 work)',
    consequence: 'the content-address forge floor is 2^(digestBits/2); the fold dedups and tamper-evidences ([[tamper]])',
  },
  {
    hypothesis: 'integer factorisation has no classical polynomial algorithm (unproven — P vs NP open)',
    consequence: 'RSA-based anchoring (RFC 3161 TSA) holds at its key strength; the anchor is a real floor',
  },
  {
    hypothesis: 'no large fault-tolerant quantum computer exists yet (an empirical assumption, not a theorem)',
    consequence: "Shor does not factor the anchor's key today; the post-quantum window is open, not closed",
  },
] as const

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('conditional — the unprovable, folded honestly:\n')
  for (const a of FOLDED_ASSUMPTIONS) {
    console.log(`  IF   ${a.hypothesis}`)
    console.log(`  THEN ${a.consequence}\n`)
  }
  const t = given('finding a SHA-256 collision costs 2^(b/2)').proves('tamper-cost is 2^(b/2)', () => 122 / 2)
  console.log(`example: ${t.hypothesis}\n  ⇒ ${t.consequence} = 2^${t.value}  (the IMPLICATION is proven; H is not)`)
}
