/**
 * instrument — which tool answers which question, and how each one lies.
 *
 * Every wrong measurement in this corpus's history was the same shape: not a wrong answer, a
 * **wrong instrument** — or a right one trusted past its limit. The corpus already records the
 * consequences ([[rules]]/cycle: a regex over TypeScript was wrong in 115 of 6,203 files;
 * [[rules]]/prose: 1,261 → 15 as each false-positive class was removed). What it did not record is
 * the thing that would have PREVENTED them: a table saying, for a given question, which instrument
 * is authoritative and which one merely looks like it is.
 *
 * That gap is not academic. In one session an agent asked *"does the deploy bundle export this
 * class?"*, grepped the class name in the built worker, got `0`, and reported a production defect.
 * The bundle is **minified** — class names are mangled, so a name-grep over it answers nothing. The
 * only unmanglable evidence is the export tail, because a module's public export names ARE its
 * contract and no minifier may rename them. One line of the right instrument refuted a whole
 * finding.
 *
 * **The pattern in all of them: the wrong instrument does not error. It answers.** A grep returns
 * `0` as confidently as it returns `9`. A lint rule says "unused" in the same tone whether or not it
 * parsed the file. A summary of a page reads exactly like the page. Silence would be safe; a
 * confident wrong number is not.
 *
 * So the discipline is not "be careful" — that is prose. It is: **before measuring, name the
 * instrument and its failure mode.** `instrumentFor(question)` answers that, and every row below
 * was paid for.
 *
 * @law name the instrument before the measurement — a wrong instrument does not error, it answers,
 *      and a confident wrong number costs more than no number at all.
 * @invariant every row names a real failure mode and the instrument that settles it
 * @invariant an unknown question returns undefined, never a default instrument — guessing which
 *            tool applies is the very error this atom exists to prevent
 * @standard ISO-19011:2018 §6.4 — audit evidence: sufficient and appropriate, not merely available
 * @see ./SKILL.md -- ../local -- ../seeing -- ../rules/cycle
 */

/** A question about the corpus, the instrument that settles it, and the one that merely answers. */
export interface Instrument {
  /** the question, in the form someone actually asks it */
  readonly question: string
  /** the instrument that LOOKS authoritative */
  readonly wrong: string
  /** how it fails — always silently, always with a confident value */
  readonly failure: string
  /** the instrument that settles the question */
  readonly right: string
  /** why the right one is decisive, not merely better */
  readonly because: string
  /** true when this misreading actually occurred here, rather than being anticipated */
  readonly paid: boolean
}

/**
 * The register. DECLARED — no theorem derives "which tool answers which question" — but every row
 * marked `paid` is a misreading that actually happened in this repository, which is why the table
 * is evidence rather than advice.
 */
export const INSTRUMENTS: readonly Instrument[] = [
  {
    question: 'does the deployed bundle export this class?',
    wrong: 'grep the class name in the built worker',
    failure: 'the bundle is MINIFIED — `class $ extends Y`. A name-grep returns 0 for a class that is present',
    right: "the bundle's export tail — `wrangler deploy --dry-run --outdir=…`, then read the trailing `export { … }`",
    because: "public export names are the module's contract; no minifier may rename them, so their presence is decisive and their absence is too",
    paid: true,
  },
  {
    question: 'is this build artifact the thing that ships?',
    wrong: 'read `.open-next/worker.js`',
    failure: "it is an INPUT to `worker.ts`, not the deploy artifact — code added by the wrangler entry is legitimately absent from it",
    right: 'follow `main` in `wrangler.jsonc`, then bundle THAT',
    because: 'the deploy path is defined by the config, not by whichever file was most recently written',
    paid: true,
  },
  {
    question: 'is this symbol used?',
    wrong: 'the lint report',
    failure: 'eslint reported two imports unused; both were called, and typecheck contradicted it one command later',
    right: 'the compiler — `tsc --noEmit`',
    because: 'a report is a CLAIM about the tree; the type checker resolves the tree itself',
    paid: true,
  },
  {
    question: 'does this prose cite code that exists?',
    wrong: 'a regex over the source',
    failure: 'wrong in 115 of 6,203 files — invented 4 import edges and missed 211',
    right: '`@/syntax` — `boundNames` / `commentsOf`, over `ts.createSourceFile`',
    because: 'the language has a grammar; a pattern that resembles it is a heuristic wearing a theorem’s clothes',
    paid: true,
  },
  {
    question: 'what does this external page say?',
    wrong: 'a web fetch',
    failure: "it returns a small model's RENDERING of the page; quoting it as verbatim contradicted a human, twice, with a clone on disk",
    right: 'the local clone — read the bytes',
    because: 'a rendering is a claim about a source, so quoting it is a claim about a claim ([[local]])',
    paid: true,
  },
  {
    question: 'how many atoms / commits / collections does the corpus have?',
    wrong: 'a count stated in a document',
    failure: 'a research roadmap said 845 commits and 3,175 atoms while the tree held 1,453 and 3,202 — 568 commits stale',
    right: 'count the tree, now',
    because: 'every corpus number here is computed at read time, so any written count is a snapshot with no expiry stamped on it',
    paid: true,
  },
  {
    question: 'is this standard actually cited by the code?',
    wrong: 'the catalogue count',
    failure: 'a loose id matcher made `/001/i` match `ISO 27001`, reporting 120 citations for a convention cited once',
    right: 'open the cited module and read its banner',
    because: 'a compliance count that OVER-reports manufactures assurance for whoever signs it',
    paid: true,
  },
  {
    question: 'did this generated proof prove anything?',
    wrong: 'the ledger score, or the generator’s own docstring',
    failure: 'the leftover generator emitted `toMatch(/\\bexport\\b/)` plus a sigil-class check — true of nearly every module — under a docstring reading "not an empty gaming test". It settled the ledger and re-ranked the next-step engine away, having proved nothing',
    right: 'read the assertions, and ask what deleting the claim would do',
    because: 'a test that cannot fail for the RIGHT reason is decoration; the metric moving is not evidence that the corpus improved',
    paid: true,
  },
  {
    question: 'is this ratchet ceiling too loose?',
    wrong: 'compare the ceiling to the live violation count',
    failure: 'the gap IS the design — mathCeiling scales live by the axis horo digit, so a ceiling 10× live is the formula, not slack. Three plan items were written against this misreading',
    right: 'call `mathCeiling(axis, live)` and `ratchetDown(axis, prior, live)` and see what would actually be emitted',
    because: 'a threshold is meaningless until you know the function that produced it; two numbers compared without their definition is arithmetic about nothing',
    paid: true,
  },
  {
    question: 'did the whole suite pass?',
    wrong: 'a green summary line',
    failure: 'the vitest setup swallowed a failed Payload boot — every `payload-integration` suite ran with no booted app and reported green',
    right: 'assert the precondition itself, and let it throw',
    because: 'a harness that swallows its own boot reports green forever ([[run]]/load)',
    paid: true,
  },
]

/** The instrument for a question, matched on its distinctive words. Unknown ⇒ undefined, never a default. */
export function instrumentFor(question: string): Instrument | undefined {
  const q = question.toLowerCase()
  return INSTRUMENTS.find((i) =>
    i.question
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((w) => w.length > 4)
      .some((w) => q.includes(w)),
  )
}

/** The misreadings that actually occurred here — evidence, as distinct from anticipation. */
export function paidFor(): readonly Instrument[] {
  return INSTRUMENTS.filter((i) => i.paid)
}

/**
 * Fail closed when a measurement is about to be taken with an instrument this register already
 * knows to be wrong for the question.
 *
 * @invariant naming the wrong instrument throws; naming an unregistered one does not — this
 *            register is not a whitelist, and pretending it were complete would be its own error
 */
export function assertInstrument(question: string, using: string): void {
  const known = instrumentFor(question)
  if (!known) return
  if (using.toLowerCase().includes(known.wrong.toLowerCase().split(' ')[0] ?? ' ')) {
    throw new Error(
      `instrument: "${using}" does not answer "${question}" — ${known.failure}. Use: ${known.right}`,
    )
  }
}

/** The register, rendered for the corpus landing page. */
export function renderInstrumentSection(): readonly string[] {
  const paid = paidFor()
  return [
    '## measuring this corpus — name the instrument first',
    '',
    `Every wrong measurement here was the same shape: not a wrong answer, a **wrong instrument** — or a right one trusted past its limit. **${paid.length} of the ${INSTRUMENTS.length} rows below were paid for in this repository**, not anticipated.`,
    '',
    'The pattern in all of them: **the wrong instrument does not error, it answers.** A grep returns `0` as confidently as it returns `9`. Silence would be safe; a confident wrong number is not.',
    '',
    '| question | instrument that ANSWERS | instrument that SETTLES |',
    '| --- | --- | --- |',
    // `right` often already contains backticks (a command, a symbol). Wrapping it again produces
    // nested fences that render as literal backticks — so wrap ONLY when it carries none.
    ...INSTRUMENTS.map((i) => {
      const settles = i.right.includes('`') ? i.right : `\`${i.right}\``
      return `| ${i.question} | ${i.wrong} — *${i.failure}* | ${settles} |`
    }),
    '',
    'Run it: `pnpm erpax instrument`.',
    '',
  ]
}

/* c8 ignore start -- CLI face: `pnpm erpax instrument` */
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(renderInstrumentSection().join('\n'))
}
/* c8 ignore stop */
