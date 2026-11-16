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

/** The README sentence that quotes the sealed census. */
export const censusLine = (inventory: Pick<ProofInventory, 'sealedAt' | 'census' | 'files' | 'sourcesHash'>): string =>
  `Kernel report sealed ${inventory.sealedAt}: ${inventory.census.theorems} theorems, ${inventory.census.axiomFree} axiom-free, ${inventory.census.standardAxioms} on Lean's three standard axioms, ${inventory.census.stubbed} stubbed, ${inventory.files.length} files, sources \`${inventory.sourcesHash}\`.`

/** A Markdown table cell: a pipe in the text (`|0⟩`, `^24 || >=26`) would end the cell, so pipes are escaped, and
 * backslashes first, or a value ending in one would undo the escape. */
export const cell = (text: string): string => text.replace(/\\/g, '\\\\').replace(/\|/g, '\\|')

export const LEAN_DIR = 'src/utilities/verify/lean'
const leanLink = (file: string, line?: number): string => `${LEAN_DIR}/${file}${line ? `#L${line}` : ''}`

/** A Lean file's own statement: the first paragraph of its header comment (`Name — what it proves.`). */
export const leanTitle = (source: string): string => {
  const header = /^\/-\s*\n([\s\S]*?)-\//.exec(source)?.[1] ?? ''
  return (header.split(/\n\s*\n/)[0] ?? '').split('\n').map((line) => line.trim()).join(' ').trim()
}

/** Each theorem's 1-based line in its source. */
export const theoremLines = (source: string): Map<string, number> => {
  const lines = new Map<string, number>()
  source.split('\n').forEach((line, i) => {
    const m = /^theorem\s+(\S+)/.exec(line)
    if (m) lines.set(m[1] as string, i + 1)
  })
  return lines
}

/**
 * The README's Clay section, from the record and the Lean files' own words: each problem's witnesses,
 * linked, each described by its file's first sentence; the settled list; the census. Nothing in it is
 * written by hand.
 */
export const claySection = (witnesses: readonly ClayWitness[], inventory: Parameters<typeof censusLine>[0], sources: Readonly<Record<string, string>>): string => {
  const settled = claySettled(witnesses)
  return [
    '## Clay',
    '',
    '| problem | witness | kind | theorems | stubbed | the file says |',
    '| --- | --- | --- | ---: | ---: | --- |',
    ...CLAY.flatMap((p) => {
      const mine = witnesses.filter((w) => w.problem === p).sort((a, b) => a.file.localeCompare(b.file))
      if (mine.length === 0) return [`| ${CLAY_LABEL[p]} | none | | | | |`]
      return mine.map((w) => `| ${CLAY_LABEL[p]} | [\`${w.file}\`](${leanLink(w.file)}) | \`${w.kind}\` | ${w.theorems} | ${w.stubbed} | ${cell(leanTitle(sources[w.file] ?? ''))} |`)
    }),
    '',
    `settled: ${settled.length ? settled.map((p) => CLAY_LABEL[p]).join(', ') : '**none**'} (\`claySettled\`)`,
    '',
    censusLine(inventory),
    '',
  ].join('\n')
}

/**
 * The README's proof index: every Lean file, linked, with its own first sentence, its Clay declaration
 * and its counts; and under each, every theorem linked to its line with the axioms the kernel reported.
 */
export const proofIndex = (inventory: Pick<ProofInventory, 'files' | 'sealedAt' | 'census' | 'sourcesHash'>, sources: Readonly<Record<string, string>>): string => {
  const files = [...inventory.files].sort((a, b) => a.file.localeCompare(b.file))
  const rows = files.map((f) => {
    const source = sources[f.file] ?? ''
    const clay = clayTags(source).map((tag) => `${tag.problem} ${tag.kind}`).join(', ') || 'none'
    const free = f.entries.filter((e) => e.axiomFree).length
    return `| [\`${f.file}\`](${leanLink(f.file)}) | ${cell(leanTitle(source))} | ${clay} | ${f.entries.length} | ${free} | ${f.compiled ? 'accepted' : 'refused'} |`
  })
  const details = files.map((f) => {
    const lines = theoremLines(sources[f.file] ?? '')
    const items = f.entries.map((e) => {
      const name = e.theorem.split('.').pop() as string
      const axioms = e.stubbed ? 'stubbed' : e.axiomFree ? 'axiom-free' : e.axioms.join(', ')
      return `- [\`${e.theorem}\`](${leanLink(f.file, lines.get(name))}) · ${axioms}`
    })
    return [`<details><summary>${f.file} · ${f.entries.length} theorems</summary>`, '', ...items, '', '</details>'].join('\n')
  })
  return ['## Proofs', '', censusLine(inventory), '', '| file | the file says | Clay | theorems | axiom-free | kernel |', '| --- | --- | --- | ---: | ---: | --- |', ...rows, '', ...details, ''].join('\n')
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
  const dir = join(process.cwd(), LEAN_DIR)
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
