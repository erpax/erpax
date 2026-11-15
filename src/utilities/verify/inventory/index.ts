/** verify/inventory — the kernel's verdict, turned into something a Worker can serve. THE BLOCK: a proof nobody can reach is prose. See SKILL.md. */
export const atomPath = 'verify/inventory' as const

/** One theorem, as the kernel reported it. */
export interface ProofEntry {
  readonly theorem: string
  readonly axioms: readonly string[]
  /** true when the kernel said "does not depend on any axioms". */
  readonly axiomFree: boolean
  /** true when `sorryAx` is among the axioms — a declared theorem with no proof behind it. */
  readonly stubbed: boolean
}

/** Parse `#print axioms` output. See SKILL.md. */
export function parseAxiomReport(out: string): ProofEntry[] {
  const entries: ProofEntry[] = []
  for (const line of out.split('\n')) {
    const free = /^'([^']+)' does not depend on any axioms/.exec(line)
    if (free) {
      entries.push({ theorem: free[1] as string, axioms: [], axiomFree: true, stubbed: false })
      continue
    }
    const dep = /^'([^']+)' depends on axioms: \[([^\]]*)\]/.exec(line)
    if (dep) {
      const axioms = (dep[2] ?? '').split(',').map((a) => a.trim()).filter(Boolean)
      entries.push({
        theorem: dep[1] as string,
        axioms,
        axiomFree: false,
        stubbed: axioms.includes('sorryAx'),
      })
    }
  }
  return entries
}

/** What the corpus can honestly say about its proofs, counted from the kernel's own report. */
export interface ProofCensus {
  readonly theorems: number
  readonly axiomFree: number
  readonly standardAxioms: number
  readonly stubbed: number
}

/**
 * Lean's foundation: the only axioms a verified theorem may rest on, each with what it means and the
 * theorem in Foundation.lean that the kernel reports as resting on exactly that axiom (which certifies
 * the meaning is the axiom). Anything else, a file's own `axiom` included, is an assumption with no
 * meaning here, and the census never counts it as proved.
 */
export const FOUNDATION = {
  propext: { meaning: 'two propositions that imply each other are equal', witness: 'Foundation.propext_meaning' },
  'Quot.sound': {
    meaning: 'related elements have the same class in a quotient; function extensionality follows',
    witness: 'Foundation.quot_sound_meaning',
  },
  'Classical.choice': {
    meaning: 'from a proof that a type is inhabited, an element of it; with the others, the excluded middle',
    witness: 'Foundation.choice_meaning',
  },
} as const satisfies Record<string, { meaning: string; witness: string }>

/** The axioms that have a meaning: the foundation, and nothing else. */
export const STANDARD_AXIOMS: ReadonlySet<string> = new Set(Object.keys(FOUNDATION))

/**
 * A theorem as an equation: what the kernel's own rules prove, plus each foundation axiom it rests on with
 * that axiom's meaning. An axiom-free theorem has nothing on the second side.
 */
export interface TheoremLink {
  readonly theorem: string
  readonly kernel: 'alone' | 'with axioms'
  readonly axioms: readonly { readonly axiom: string; readonly meaning: string; readonly witness: string }[]
}

/** Link a theorem to its axioms and their meanings; an axiom with no meaning has none to link. */
export const linkOf = (e: ProofEntry): TheoremLink => ({
  theorem: e.theorem,
  kernel: e.axiomFree ? 'alone' : 'with axioms',
  axioms: e.axioms
    .filter((a): a is keyof typeof FOUNDATION => a in FOUNDATION)
    .map((a) => ({ axiom: a, meaning: FOUNDATION[a].meaning, witness: FOUNDATION[a].witness })),
})

/** One line of a proof's journal entry. */
export interface Posting {
  readonly account: string
  readonly debit: number
  readonly credit: number
}

/** What backs a theorem when no axiom does: the kernel's own rules. */
export const KERNEL = 'kernel' as const
/** Credits no check accepts: a stub, or an axiom with no meaning in FOUNDATION. */
export const UNBACKED = 'unbacked' as const

/**
 * A theorem as a double-entry journal entry: debit the theorem, credit what backs it — the kernel alone
 * when it is axiom-free, otherwise each axiom it rests on (a stub or a foreign axiom credits UNBACKED).
 * Debits equal credits in every entry.
 */
export const journalOf = (e: ProofEntry): Posting[] => {
  const backing = e.axiomFree ? [KERNEL] : e.axioms.map((a) => (a in FOUNDATION ? a : UNBACKED))
  return [{ account: e.theorem, debit: backing.length, credit: 0 }, ...backing.map((account) => ({ account, debit: 0, credit: 1 }))]
}

/** The trial balance of a record: each backing account's credits, and the totals, which must agree. */
export const trialBalance = (entries: readonly ProofEntry[]) => {
  const credits: Record<string, number> = {}
  let debit = 0
  let credit = 0
  for (const line of entries.flatMap(journalOf)) {
    debit += line.debit
    credit += line.credit
    if (line.credit) credits[line.account] = (credits[line.account] ?? 0) + line.credit
  }
  return { credits, debit, credit, balanced: debit === credit }
}

/**
 * The axiom gate. A theorem may rest on an axiom only where it already did in the base record — recorded
 * debt, which may only shrink — or where it is a FOUNDATION witness, whose job is to rest on its axiom.
 * A new theorem resting on any axiom, or an old one resting on more than before, is a violation.
 */
export const axiomViolations = (
  base: Pick<ProofInventory, 'files'>,
  now: Pick<ProofInventory, 'files'>,
): { readonly theorem: string; readonly axioms: readonly string[] }[] => {
  const before = new Map(base.files.flatMap((f) => f.entries).map((e) => [e.theorem, new Set(e.axioms)]))
  const witnesses = new Set<string>(Object.values(FOUNDATION).map((f) => f.witness))
  return now.files
    .flatMap((f) => f.entries)
    .filter((e) => !witnesses.has(e.theorem))
    .flatMap((e) => {
      const added = e.axioms.filter((a) => !(before.get(e.theorem) ?? new Set()).has(a))
      return added.length ? [{ theorem: e.theorem, axioms: added }] : []
    })
}

/** Rests only on Lean's foundation axioms (and is not a stub). */
export const onFoundation = (e: ProofEntry): boolean => !e.axiomFree && !e.stubbed && e.axioms.every((a) => STANDARD_AXIOMS.has(a))

/** Rests on an axiom outside the foundation: an unchecked assumption. */
export const onForeignAxiom = (e: ProofEntry): boolean => !e.axiomFree && !e.stubbed && !onFoundation(e)

export function proofCensus(entries: readonly ProofEntry[]): ProofCensus {
  return {
    theorems: entries.length,
    axiomFree: entries.filter((e) => e.axiomFree).length,
    standardAxioms: entries.filter(onFoundation).length,
    stubbed: entries.filter((e) => e.stubbed).length,
  }
}

/** A census is only as good as its provenance: a stubbed theorem is never counted as proved. */
export const proved = (c: ProofCensus): number => c.axiomFree + c.standardAxioms

// ─── The seven Clay problems, as the kernel sees them ─────────────
// A Lean file says what it is ABOUT on a `Clay: <problem> <kind>` line of its header comment. This joins
// that declaration to the kernel's own report, so what the corpus has checked about each problem is
// counted, not described. Nothing here can make a problem solved: only a file declared `statement`, that
// compiled, with no stub, moves a problem into `claySettled`, and a tag is a DECLARATION, not proof that
// the Lean statement is the real one (a theorem can be a tautology: see Erpax.lean `one_law`). The fidelity
// of a `statement` file is a human review, and the list below is empty until someone writes one.

/** The Clay Millennium problems, by slug. */
export const CLAY = ['pnp', 'riemann', 'navier-stokes', 'yang-mills', 'hodge', 'bsd', 'poincare'] as const
export type ClayProblem = (typeof CLAY)[number]

/**
 * What a file is about, as it declares:
 *   meta       proves what some argument CANNOT do (an obstruction); says nothing about the statement's truth
 *   partial    proves a true fragment or reduction of the statement
 *   statement  proves the problem's statement itself
 */
export const CLAY_KINDS = ['meta', 'partial', 'statement'] as const
export type ClayKind = (typeof CLAY_KINDS)[number]

export interface ClayWitness {
  readonly problem: ClayProblem
  readonly kind: ClayKind
  readonly file: string
  /** false = the kernel refused the file. */
  readonly compiled: boolean
  readonly theorems: number
  readonly axiomFree: number
  readonly standardAxioms: number
  readonly stubbed: number
}

/** The raw `Clay: <problem> <kind>` lines of one Lean source. */
export const clayTags = (source: string): Array<{ problem: string; kind: string }> =>
  [...source.matchAll(/^[ \t]*Clay:[ \t]+(\S+)[ \t]+(\S+)/gm)].map((m) => ({ problem: m[1] as string, kind: m[2] as string }))

/**
 * Every Lean file states what its theorems say about the seven Clay problems: one or more
 * `Clay: <problem> <kind>` lines, or `Clay: none` when they bear on none. A file that says nothing,
 * names an unknown problem or kind, or mixes `none` with a problem is an error the gate refuses —
 * so each theorem is verified against the Clay cases by the file that holds it.
 */
export const clayDeclarationErrors = (sources: Readonly<Record<string, string>>): string[] => {
  const errors: string[] = []
  for (const [file, source] of Object.entries(sources)) {
    const none = /^[ \t]*Clay:[ \t]+none[ \t]*$/m.test(source)
    const tags = clayTags(source)
    if (!none && tags.length === 0) errors.push(`${file}: no Clay declaration (Clay: <problem> <kind>, or Clay: none)`)
    if (none && tags.length > 0) errors.push(`${file}: declares Clay: none and a problem`)
    for (const t of tags) {
      if (!(CLAY as readonly string[]).includes(t.problem)) errors.push(`${file}: unknown Clay problem ${t.problem}`)
      if (!(CLAY_KINDS as readonly string[]).includes(t.kind)) errors.push(`${file}: unknown Clay kind ${t.kind}`)
    }
  }
  return errors
}

/** How the README names each problem in its Clay table. */
export const CLAY_LABEL: Readonly<Record<ClayProblem, string>> = {
  pnp: 'P vs NP',
  riemann: 'Riemann Hypothesis',
  'navier-stokes': 'Navier–Stokes',
  'yang-mills': 'Yang–Mills',
  hodge: 'Hodge',
  bsd: 'Birch–Swinnerton-Dyer',
  poincare: 'Poincaré',
}

/** The README cell for a problem's kernel witnesses: each file linked, with its kind and counts, or none. */
export const witnessCell = (witnesses: readonly ClayWitness[], problem: ClayProblem): string => {
  const mine = witnesses.filter((w) => w.problem === problem).sort((a, b) => a.file.localeCompare(b.file))
  if (mine.length === 0) return 'none'
  return mine.map((w) => `[\`${w.file}\`](src/utilities/verify/lean/${w.file}) — \`${w.kind}\`, ${w.theorems} theorems, ${w.stubbed} stubbed`).join(' · ')
}

/** The README sentence that quotes the sealed census. */
export const censusLine = (inventory: Pick<ProofInventory, 'sealedAt' | 'census' | 'files' | 'sourcesHash'>): string =>
  `Kernel report sealed ${inventory.sealedAt}: ${inventory.census.theorems} theorems, ${inventory.census.axiomFree} axiom-free, ${inventory.census.standardAxioms} on Lean's three standard axioms, ${inventory.census.stubbed} stubbed, ${inventory.files.length} files, sources \`${inventory.sourcesHash}\`.`

/** What each problem asserts (its full name and statement), and what this corpus is missing toward it, named plainly. */
export const CLAY_STATEMENT: Readonly<Record<ClayProblem, { readonly name: string; readonly statement: string; readonly gap: string }>> = {
  pnp: {
    name: 'P vs NP',
    statement: 'Is P = NP? Whether every decision problem whose solution is VERIFIABLE in polynomial time is also SOLVABLE in polynomial time — i.e. whether the classes P and NP coincide.',
    gap: 'no separation is derived. The verify/derive asymmetry the fold exhibits is ONE instance of easy-to-check / hard-to-produce; a lower bound separating the classes is what is missing, and nothing here supplies one.',
  },
  riemann: {
    name: 'Riemann Hypothesis',
    statement: 'All non-trivial zeros of the Riemann zeta function lie on the critical line: ζ(s) = 0 with 0 < Re(s) < 1 ⟹ Re(s) = ½.',
    gap: 'the corpus touches the primes↔π link through ζ (ζ(2) = π²/6, the Euler product) but derives nothing about the location of the zeros. What is missing is any argument constraining Re(s) — the whole conjecture.',
  },
  'navier-stokes': {
    name: 'Navier–Stokes existence & smoothness',
    statement: 'For the 3D incompressible Navier–Stokes equations ∂u/∂t + (u·∇)u = −∇p + νΔu, ∇·u = 0, with smooth initial data: do smooth solutions exist for all time, or can they blow up in finite time?',
    gap: 'global regularity is a hard-analysis question about a PDE. The confinement analogy (handle the field, not each particle) is physical intuition, not an estimate; no a-priori bound is derived here.',
  },
  'yang-mills': {
    name: 'Yang–Mills existence & mass gap',
    statement: 'For a compact simple gauge group G, does a non-trivial quantum Yang–Mills theory exist on ℝ⁴ with a mass gap Δ > 0 — i.e. the lightest particle has strictly positive mass?',
    gap: 'no lens at all. Constructive QFT existence plus a positive spectral gap is outside anything this corpus computes; the "mass gap" wordplay to the void/axis is overlay, not physics.',
  },
  hodge: {
    name: 'Hodge Conjecture',
    statement: 'On a projective non-singular complex algebraic variety, every Hodge class (a rational cohomology class of type (p,p)) is a rational linear combination of the classes of algebraic cycles.',
    gap: 'no lens at all. Algebraic cycles and Hodge theory are outside the corpus; nothing here bears on the rationality of Hodge classes.',
  },
  bsd: {
    name: 'Birch–Swinnerton-Dyer',
    statement: 'For an elliptic curve E over ℚ, the order of vanishing of its L-function at s = 1 equals the rank of its Mordell–Weil group: ord₍ₛ₌₁₎ L(E, s) = rank E(ℚ).',
    gap: 'no lens at all. Elliptic curves and L-functions are outside the corpus; the rank↔order-of-vanishing identity is untouched by anything computed here.',
  },
  poincare: {
    name: 'Poincaré Conjecture',
    statement: 'Every simply-connected closed 3-manifold is homeomorphic to the 3-sphere: π₁(M) = 0 with M a closed 3-manifold ⟹ M ≅ S³.',
    gap: '_no open gap — proved externally (Grigori Perelman); this corpus records the status, it does not re-solve it_',
  },
}

/**
 * The README's Clay section, rendered from the record: the witness table, the settled list and the
 * census are computed, and each statement is the problem's own. `scripts/generate-repo.ts` writes it
 * into README.md, so the README cannot say anything about the kernel that the record does not.
 */
export const claySection = (witnesses: readonly ClayWitness[], inventory: Parameters<typeof censusLine>[0]): string => {
  const settled = claySettled(witnesses)
  const settledText = settled.length ? settled.map((p) => CLAY_LABEL[p]).join(', ') : '**none**'
  return [
    '## How a Clay problem is verified here',
    '',
    'A Clay problem is verified by the **Lean kernel**, or it is not verified. Not by a deposit on Zenodo, not by a prose argument, and not by this README: this section only reports what the kernel has checked.',
    '',
    "1. **Declare.** Every Lean file in `src/utilities/verify/lean/` says what its theorems bear on, on a header line: `Clay: <problem> <kind>` — `meta` (proves what an argument *cannot* do), `partial` (a true fragment) or `statement` (the problem's own statement) — or `Clay: none`. CI refuses a file that declares nothing, so each theorem is placed against the Clay cases; a declaration is wrong when it overclaims and when it underclaims.",
    '2. **Check.** `tsx src/utilities/verify/inventory/index.ts` compiles every file with `lean` and records, for each theorem, the axioms the kernel says it rests on, in `inventory.generated.json`. `sorryAx` among them marks a stub, never a proof.',
    '3. **Count.** `clayWitnesses` joins the declarations to that report. `claySettled` lists the problems with a compiled, stub-free file declared `statement`. A refused or stubbed file never settles anything, and a mistyped tag throws instead of hiding.',
    "4. **Review.** A tag is a declaration, not proof that the Lean statement is the real one: a theorem can be a tautology. A `statement` file needs a human to read its statement against Clay's before it counts.",
    '',
    '| problem | kernel witnesses today |',
    '| --- | --- |',
    ...CLAY.map((p) => `| ${CLAY_LABEL[p]} | ${witnessCell(witnesses, p)} |`),
    '',
    `Settled by this corpus: ${settledText} (\`claySettled\` ${settled.length ? `lists ${settled.length}` : 'is empty'}). ${censusLine(inventory)} Recompute: \`tsx src/utilities/verify/inventory/index.ts\` · \`pnpm vitest run src/utilities/verify\`.`,
    '',
    '| problem | statement (algebraic) | the named gap |',
    '| --- | --- | --- |',
    ...CLAY.map((p) => `| **${CLAY_STATEMENT[p].name}** | ${CLAY_STATEMENT[p].statement} | ${CLAY_STATEMENT[p].gap} |`),
    '',
    'The **statement** is what the conjecture asserts — read it before anything this corpus says about it, so a lens can never be mistaken for the mathematics it points at. The **gap** is what is missing, named plainly: a gap you can argue with, rather than a mystery that hides its size.',
    '',
    "You do not solve one by asserting it. A problem moves here only when a Lean file declared `statement` compiles with no stub and its statement survives review; whether that is a solution at all is for the [Clay Institute's rules](https://www.claymath.org/millennium-problems/rules/), not for this repository.",
    '',
  ].join('\n')
}

/** What the kernel has checked about each problem: one witness per declaration, with its axiom footprint. */
export function clayWitnesses(inventory: Pick<ProofInventory, 'files'>, sources: Readonly<Record<string, string>>): ClayWitness[] {
  const out: ClayWitness[] = []
  for (const file of inventory.files) {
    for (const tag of clayTags(sources[file.file] ?? '')) {
      // a typo must not silently hide a declaration
      if (!(CLAY as readonly string[]).includes(tag.problem)) throw new Error(`${file.file}: "${tag.problem}" is not a Clay problem (${CLAY.join(', ')})`)
      if (!(CLAY_KINDS as readonly string[]).includes(tag.kind)) throw new Error(`${file.file}: "${tag.kind}" is not a kind (${CLAY_KINDS.join(', ')})`)
      out.push({
        problem: tag.problem as ClayProblem,
        kind: tag.kind as ClayKind,
        file: file.file,
        compiled: file.compiled,
        theorems: file.entries.length,
        axiomFree: file.entries.filter((e) => e.axiomFree).length,
        standardAxioms: file.entries.filter(onFoundation).length,
        stubbed: file.entries.filter((e) => e.stubbed).length,
      })
    }
  }
  return out
}

/** Problems with a compiled, stub-free Lean file that DECLARES it proves the statement itself. Empty today. */
export const claySettled = (witnesses: readonly ClayWitness[]): ClayProblem[] => [
  ...new Set(witnesses.filter((w) => w.kind === 'statement' && w.compiled && w.stubbed === 0 && w.theorems > 0).map((w) => w.problem)),
]

// ─── The emitter ──────────────────────────────────────────────────────────────
// Runs where Lean exists (a developer, CI) and writes what the kernel said. The Worker never
// compiles anything; it serves this record. `sourcesHash` is the content address of the .lean
// files the run covered, so a record that no longer matches the sources is detectably stale
// rather than quietly wrong.

/** The emitted record, re-exported through this atom's FACE. See SKILL.md. */
export { default as INVENTORY } from '@/utilities/verify/lean/inventory.generated.json'

/** Where the emitted record lives — committed, because a Worker cannot regenerate it. */
export const INVENTORY_PATH = 'src/utilities/verify/lean/inventory.generated.json' as const

export interface ProofInventory {
  readonly sealedAt: string
  readonly lean: string
  readonly sourcesHash: string
  readonly census: ProofCensus
  /** `compiled: false` means the KERNEL REFUSED the file — never a file with nothing in it. */
  readonly files: readonly { readonly file: string; readonly compiled: boolean; readonly entries: readonly ProofEntry[] }[]
}

// Run as a script, the emitter runs the kernel and writes the record. It is wrapped in an async
// IIFE rather than using top-level await: this module is on the atom FACE (`@/verify` re-exports
// it), and a top-level await makes the whole face untransformable in a CJS context — the barrel
// added it to more import closures and every tsx entry that reached it died on the transform.
if (import.meta.url === `file://${process.argv[1]}`) void (async () => {
  const { execFileSync } = await import('node:child_process')
  const { sha256 } = await import('@/utilities/crypto')
  const { mkdtempSync, readdirSync, readFileSync, writeFileSync } = await import('node:fs')
  const { join } = await import('node:path')
  const { tmpdir } = await import('node:os')

  // `lean` on PATH: elan installs the version in /lean-toolchain, here and in CI.
  const LEAN = process.env.LEAN_BIN ?? 'lean'
  const dir = join(process.cwd(), 'src/utilities/verify/lean')
  const names = readdirSync(dir).filter((f) => f.endsWith('.lean')).map((f) => f.replace(/\.lean$/, '')).sort()
  const out = mkdtempSync(join(tmpdir(), 'erpax-lean-'))
  const sourcesDigest = sha256(...names.map((n) => readFileSync(join(dir, `${n}.lean`))))

  // DEPENDENCY ORDER, read from the files themselves. The first version compiled alphabetically
  // with Main special-cased, and Cross.lean — which imports Ftl, Release and Uuid — sorted BEFORE
  // them, so its imports did not exist yet, the kernel refused it, and the record said "0 theorems"
  // instead of "refused". A special case for one file is a guess about the graph; this reads it.
  const importsOf = (n: string): string[] =>
    [...readFileSync(join(dir, `${n}.lean`), 'utf8').matchAll(/^import (\S+)/gm)].map((m) => m[1] as string)
  const order: string[] = []
  const seen = new Set<string>()
  const visit = (n: string, stack: Set<string>): void => {
    if (seen.has(n) || stack.has(n)) return
    stack.add(n)
    for (const dep of importsOf(n)) if (names.includes(dep)) visit(dep, stack)
    stack.delete(n)
    seen.add(n)
    order.push(n)
  }
  for (const n of names) visit(n, new Set())
  const files: { file: string; compiled: boolean; entries: ProofEntry[] }[] = []

  for (const n of order) {
    try {
      execFileSync(LEAN, ['-o', join(out, `${n}.olean`), `${n}.lean`], { cwd: dir, env: { ...process.env, LEAN_PATH: out }, stdio: 'pipe' })
    } catch {
      // A file the kernel REFUSES is RECORDED as refused. Pushing it with no entries made a
      // refusal indistinguishable from an empty file — the silent pass this record exists to refuse.
      files.push({ file: `${n}.lean`, compiled: false, entries: [] })
      continue
    }
    const thms = readFileSync(join(dir, `${n}.lean`), 'utf8').split('\n').filter((l) => l.startsWith('theorem ')).map((l) => l.split(/\s+/)[1] ?? '')
    const ns = /^namespace (\S+)/m.exec(readFileSync(join(dir, `${n}.lean`), 'utf8'))?.[1]
    const probe = [`import ${n}`, ...thms.filter(Boolean).map((t) => `#print axioms ${ns ? `${ns}.` : ''}${t}`)].join('\n')
    writeFileSync(join(out, 'probe.lean'), probe)
    const report = execFileSync(LEAN, [join(out, 'probe.lean')], { cwd: dir, env: { ...process.env, LEAN_PATH: out }, encoding: 'utf8' })
    files.push({ file: `${n}.lean`, compiled: true, entries: parseAxiomReport(report) })
  }

  const entries = files.flatMap((f) => f.entries)
  const version = execFileSync(LEAN, ['--version'], { encoding: 'utf8' }).trim()
  const inventory: ProofInventory = {
    sealedAt: new Date().toISOString().slice(0, 10),
    lean: version,
    sourcesHash: sourcesDigest.toString('hex').slice(0, 16),
    census: proofCensus(entries),
    files,
  }
  const sources = Object.fromEntries(names.map((n) => [`${n}.lean`, readFileSync(join(dir, `${n}.lean`), 'utf8')]))
  // `--check` (CI): the kernel must accept every file with no stub, and the committed record must be
  // what this run produced. The date and the Lean build string are left out of the comparison.
  if (process.argv.includes('--check')) {
    const refused = files.filter((f) => !f.compiled).map((f) => f.file)
    const committed = JSON.parse(readFileSync(join(process.cwd(), INVENTORY_PATH), 'utf8')) as ProofInventory
    const verdict = (i: ProofInventory) => JSON.stringify({ sourcesHash: i.sourcesHash, census: i.census, files: i.files })
    const stale = verdict(committed) !== verdict(inventory)
    for (const file of refused) console.error(`  ${file}: the kernel refused it`)
    if (inventory.census.stubbed > 0) console.error(`  ${inventory.census.stubbed} theorem(s) rest on sorry`)
    const foreign = entries.filter(onForeignAxiom)
    const uncertified = Object.entries(FOUNDATION).filter(([axiom, { witness }]) => {
      const e = entries.find((x) => x.theorem === witness)
      return !e || e.axioms.length !== 1 || e.axioms[0] !== axiom
    })
    for (const [axiom, { witness }] of uncertified) console.error(`  ${witness} does not rest on exactly ${axiom}: the meaning is not certified`)
    for (const e of foreign) console.error(`  ${e.theorem}: rests on ${e.axioms.filter((a) => !STANDARD_AXIOMS.has(a)).join(', ')}, outside Lean's foundation`)
    if (stale) console.error(`  ${INVENTORY_PATH} is not what the kernel reports now`)
    // `--base <record>` (CI passes main's): no theorem may take on an axiom it did not rest on there.
    const clayErrors = clayDeclarationErrors(sources)
    for (const e of clayErrors) console.error(`  ${e}`)
    const baseAt = process.argv.indexOf('--base')
    const violations = baseAt > 0 ? axiomViolations(JSON.parse(readFileSync(process.argv[baseAt + 1] as string, 'utf8')) as ProofInventory, inventory) : []
    for (const v of violations) console.error(`  ${v.theorem}: rests on ${v.axioms.join(', ')} — prove it with the kernel's rules (cases, rfl, decide)`)
    if (refused.length || inventory.census.stubbed > 0 || foreign.length || uncertified.length || violations.length || clayErrors.length || stale) {
      console.error('\n✖ run `tsx src/utilities/verify/inventory/index.ts` and commit the record (the pre-commit hook regenerates the README from it)')
      process.exit(1)
    }
    const tb = trialBalance(entries)
    console.log(`✓ verify/inventory — ${inventory.census.theorems} theorem(s), every file accepted, record current`)
    console.log(`  debit ${tb.debit} = credit ${tb.credit}: ${Object.entries(tb.credits).map(([a, n]) => `${a} ${n}`).join(' · ')}`)
    return
  }
  writeFileSync(join(process.cwd(), INVENTORY_PATH), `${JSON.stringify(inventory, null, 2)}\n`)
  console.log(`verify/inventory — ${inventory.census.theorems} theorem(s) · ${inventory.census.axiomFree} axiom-free · ${inventory.census.stubbed} stubbed · sources ${inventory.sourcesHash}`)
})()
