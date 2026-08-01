/**
 * readme/orientation — is the front page an ORIENTATION, or only a census?
 *
 * erpax's README projects measurements: 3,191 atoms, 37,824 bonds, entropy tables, dependency
 * dumps. A reader learns the corpus's SIZE and nothing about what to do. Measured 2026-08-01 it
 * mentioned `constitution`, `millennium`, `Clay`, `inverted` and `reflect` exactly **zero** times,
 * and named no first command.
 *
 * The criteria below are not invented. They are DERIVED from the sibling portal
 * (https://ceccec.psg.bg), which solves the same problem for the same corpus family and does eight
 * things this README does not — it opens with what the thing IS and a paste-a-link input, names
 * runnable commands, publishes its census, states its Clay position as `claySolvedByThisFold=0`,
 * disclaims the exotic-device claim (`NOT a QPU`), and carries Reproducibility · Limitations · Receipt
 * sections. Deriving the bar from a working example rather than from taste is the point: the
 * comparison is checkable, and anyone may argue with the source rather than with an opinion.
 *
 * A front page is the corpus's own [[rules]]/audience problem: a page addressed to someone who
 * already knows is addressed to nobody. And it is Law 5 ([[constitution]]) — a served result with no
 * recompute path a newcomer can run is offered for belief.
 *
 * @law a front page orients or it is a census — it says what the thing IS, gives a first command,
 *      publishes its numbers, states its open problems honestly, and names its limits.
 * @invariant the score is |met| / |criteria| ∈ [0,1], computed from the text, never hand-set
 * @invariant every criterion carries the sibling-page evidence it was derived from
 * @see ./SKILL.md -- ../ -- ../../rules/audience -- ../../constitution
 */

/** One orientation criterion, with the evidence it was derived from. */
export interface Criterion {
  readonly id: string
  /** what a reader gets when this is met */
  readonly gives: string
  /** the sibling-page feature this was derived from — the bar is cited, not asserted */
  readonly derivedFrom: string
  readonly met: (text: string) => boolean
}

const has = (text: string, ...needles: readonly (string | RegExp)[]): boolean =>
  needles.some((n) => (typeof n === 'string' ? text.toLowerCase().includes(n.toLowerCase()) : n.test(text)))

/**
 * The eight, each derived from something the sibling portal does. Declared in the open so the bar
 * can be argued with — the same split [[rules]]/audience makes between computed and declared.
 */
export const ORIENTATION_CRITERIA: readonly Criterion[] = [
  {
    id: 'identity',
    gives: 'what this IS, in the first screen',
    derivedFrom: '"Double Torus — 740 proven theorems you can check yourself" opens the page',
    met: (t) => has(t.split('\n').slice(0, 12).join('\n'), /^>\s*\S/m, 'is a', 'is the'),
  },
  {
    id: 'first-command',
    gives: 'one command a newcomer can run right now',
    derivedFrom: 'npm install · npm run check:types · npm run docs:build are named on the page',
    // NOT anchored on whitespace: a README writes commands in backticks (`pnpm erpax doctor`), so a
    // `(^|\s)` anchor misses the normal case entirely. This predicate had that bug and its own test
    // caught it — distrust the instrument before the tree.
    met: (t) => /(pnpm|npm|npx)\s+[a-z][a-z0-9:._-]*/i.test(t),
  },
  {
    id: 'census',
    gives: 'the numbers, so the claim is sized',
    derivedFrom: '740 theorems · 30 pages · 54 sections are published on the page',
    met: (t) => /\d{3,}/.test(t),
  },
  {
    id: 'sequence',
    gives: 'the sequence — the corpus’s ordering principle',
    derivedFrom: 'a "Sequence Discovery Realised" section',
    met: (t) => has(t, 'sequence') && /1[\\/·, ]?2[\\/·, ]?4[\\/·, ]?8/.test(t),
  },
  {
    id: 'inversion',
    gives: 'the sequence reflected — that the ring has a mirror',
    derivedFrom: '"Angle · Polarity" and the fold sections',
    met: (t) => has(t, 'invert', 'inverted', 'reflect', 'mirror', 'polarity'),
  },
  {
    id: 'quantum-usable',
    gives: 'how to USE the quantum computer, not that it exists',
    derivedFrom: 'npm run quantum:qpu-cpu — an invocation, beside "QPU ≡ CPU/GPU"',
    // the invocation may have words between the runner and `quantum` (`pnpm erpax quantum status`),
    // so match a command LINE containing it, not an adjacent token — the same backtick bug as above
    met: (t) => /(pnpm|npm|npx|tsx)[^\n`]*quantum/i.test(t),
  },
  {
    id: 'open-problems',
    gives: 'the Clay position, stated rather than omitted',
    derivedFrom: 'a "Clay Millennium Problems" section carrying claySolvedByThisFold=0',
    met: (t) => has(t, 'millennium', 'clay'),
  },
  {
    id: 'limits',
    gives: 'the honest boundary — what this does NOT do',
    derivedFrom: 'explicit Limitations and Reproducibility sections; the "NOT a QPU" disclaimer',
    met: (t) => has(t, 'honest boundary', 'limitation', 'does not', 'not a proof', 'never claims'),
  },
]

export interface OrientationVerdict {
  readonly met: readonly string[]
  readonly missing: readonly string[]
  /** |met| / |criteria| — computed from the text, never supplied */
  readonly score: number
}

/** Score a front page against the derived bar. Nothing is hand-set; every criterion reads the text. */
export function orientationScore(text: string): OrientationVerdict {
  const met = ORIENTATION_CRITERIA.filter((c) => c.met(text))
  const missing = ORIENTATION_CRITERIA.filter((c) => !c.met(text))
  return {
    met: met.map((c) => c.id),
    missing: missing.map((c) => c.id),
    score: met.length / ORIENTATION_CRITERIA.length,
  }
}

/** What a page must add to orient — the fix list, each with what a reader would gain. */
export function orientationGaps(text: string): readonly { readonly id: string; readonly gives: string }[] {
  return ORIENTATION_CRITERIA.filter((c) => !c.met(text)).map((c) => ({ id: c.id, gives: c.gives }))
}

/**
 * Fail closed on a front page that orients LESS than before. The ceiling is a floor here — the score
 * may not fall — which is the ratchet run in the honest direction for a quantity that should rise.
 */
export function assertOrients(text: string, floor: number): void {
  const v = orientationScore(text)
  if (v.score < floor) {
    throw new Error(
      `readme/orientation: score ${v.score.toFixed(3)} < floor ${floor} — missing: ${v.missing.join(', ')}`,
    )
  }
}
