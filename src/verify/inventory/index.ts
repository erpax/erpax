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

// ─── The emitter ──────────────────────────────────────────────────────────────
// Runs where Lean exists (a developer, CI) and writes what the kernel said. The Worker never
// compiles anything; it serves this record. `sourcesHash` is the content address of the .lean
// files the run covered, so a record that no longer matches the sources is detectably stale
// rather than quietly wrong.

/** The emitted record, re-exported through this atom's FACE. See SKILL.md. */
export { default as INVENTORY } from '../lean/inventory.generated.json'

/** Where the emitted record lives — committed, because a Worker cannot regenerate it. */
export const INVENTORY_PATH = 'src/verify/lean/inventory.generated.json' as const

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
  const dir = join(process.cwd(), 'src/verify/lean')
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
