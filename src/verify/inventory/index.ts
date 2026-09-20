/**
 * verify/inventory — the kernel's verdict, turned into something a Worker can serve.
 *
 * THE BLOCK: a proof nobody can reach is prose. The corpus proves its decisions in Lean, and the
 * only way to see that was to have Lean installed and run it — so the claim reached a reader as a
 * sentence, which is exactly what [[rules]]/refutable refuses. A Cloudflare Worker cannot run the
 * kernel: there is no Lean in a Worker, and there never will be.
 *
 * So the kernel runs where it can (a developer, CI) and EMITS what it found; the Worker serves the
 * emission. The honest consequence is stated in the payload itself: the reader is seeing a RECORD
 * of a kernel run, identified by the content hash of the sources it ran over. If the sources move,
 * the hash moves, and the record is stale by construction rather than by trust.
 *
 * Parsing is over `#print axioms` output, the kernel's own words — never over the .lean text, where
 * "no sorry" in a comment reads as a proof ([[rules]]/prose paid for that lesson, twice).
 */
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

/**
 * Parse `#print axioms` output. Two shapes and nothing else:
 *   'X' does not depend on any axioms
 *   'X' depends on axioms: [propext, Quot.sound]
 * A line in neither shape is NOT an entry — an unparsed line must never read as a proof.
 */
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

/** Where the emitted record lives — committed, because a Worker cannot regenerate it. */
export const INVENTORY_PATH = 'src/verify/lean/inventory.generated.json' as const

export interface ProofInventory {
  readonly sealedAt: string
  readonly lean: string
  readonly sourcesHash: string
  readonly census: ProofCensus
  readonly files: readonly { readonly file: string; readonly entries: readonly ProofEntry[] }[]
}

if (import.meta.url === `file://${process.argv[1]}`) {
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

  // Main imports the others, so it compiles last; every file is compiled before it is probed.
  const order = [...names.filter((n) => n !== 'Main'), ...names.filter((n) => n === 'Main')]
  const files: { file: string; entries: ProofEntry[] }[] = []
  for (const n of order) {
    try {
      execFileSync(LEAN, ['-o', join(out, `${n}.olean`), `${n}.lean`], { cwd: dir, env: { ...process.env, LEAN_PATH: out }, stdio: 'pipe' })
    } catch {
      // A file the kernel REFUSES contributes no theorems — never a silent pass.
      files.push({ file: `${n}.lean`, entries: [] })
      continue
    }
    const thms = readFileSync(join(dir, `${n}.lean`), 'utf8').split('\n').filter((l) => l.startsWith('theorem ')).map((l) => l.split(/\s+/)[1] ?? '')
    const ns = /^namespace (\S+)/m.exec(readFileSync(join(dir, `${n}.lean`), 'utf8'))?.[1]
    const probe = [`import ${n}`, ...thms.filter(Boolean).map((t) => `#print axioms ${ns ? `${ns}.` : ''}${t}`)].join('\n')
    writeFileSync(join(out, 'probe.lean'), probe)
    const report = execFileSync(LEAN, [join(out, 'probe.lean')], { cwd: dir, env: { ...process.env, LEAN_PATH: out }, encoding: 'utf8' })
    files.push({ file: `${n}.lean`, entries: parseAxiomReport(report) })
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
}
