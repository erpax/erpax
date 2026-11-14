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

export function proofCensus(entries: readonly ProofEntry[]): ProofCensus {
  return {
    theorems: entries.length,
    axiomFree: entries.filter((e) => e.axiomFree).length,
    standardAxioms: entries.filter((e) => !e.axiomFree && !e.stubbed).length,
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
  [...source.matchAll(/^\s*Clay:\s+(\S+)\s+(\S+)/gm)].map((m) => ({ problem: m[1] as string, kind: m[2] as string }))

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
        standardAxioms: file.entries.filter((e) => !e.axiomFree && !e.stubbed).length,
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
  const { createHash } = await import('node:crypto')
  const { mkdtempSync, readdirSync, readFileSync, writeFileSync } = await import('node:fs')
  const { join } = await import('node:path')
  const { tmpdir } = await import('node:os')

  const LEAN = process.env.LEAN_BIN ?? '/opt/homebrew/bin/lean'
  const dir = join(process.cwd(), 'src/utilities/verify/lean')
  const names = readdirSync(dir).filter((f) => f.endsWith('.lean')).map((f) => f.replace(/\.lean$/, '')).sort()
  const out = mkdtempSync(join(tmpdir(), 'erpax-lean-'))
  const hash = createHash('sha256')
  for (const n of names) hash.update(readFileSync(join(dir, `${n}.lean`)))

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
    sourcesHash: hash.digest('hex').slice(0, 16),
    census: proofCensus(entries),
    files,
  }
  writeFileSync(join(process.cwd(), INVENTORY_PATH), `${JSON.stringify(inventory, null, 2)}\n`)
  console.log(`verify/inventory — ${inventory.census.theorems} theorem(s) · ${inventory.census.axiomFree} axiom-free · ${inventory.census.stubbed} stubbed · sources ${inventory.sourcesHash}`)
})()
