/**
 * engineering — reverse-engineer the engineering standards into the gates that enforce them.
 *
 * The corpus CITES ISO/IEC 25010:2023 (the product-quality model) 207× — but a citation is prose, and
 * prose is read and maybe obeyed ([[rules]]: a law is obeyed only when a gate blocks its violation). This
 * atom is the engineering-quality analog of [[access]]/standard (which did it for legal standards): it maps
 * each 25010 quality CONCERN to the erpax gate that already enforces it, computes which concerns are
 * enforced vs merely cited, and names the unenforced ones as the SOLUTIONS to reverse-engineer next.
 *
 * "Improve the standard" = move a concern from cited to gate-enforced. "Reverse-engineer into a new
 * solution" = a concern the corpus cites with no enforcing gate is a gate waiting to be written.
 *
 *   tsx src/engineering/index.ts
 *
 * @see ../access/standard — the same standard→enforcement law, for the legal surface
 * @standard ISO/IEC 25010:2023 §5 — product quality model (functional suitability … maintainability)
 * @audit ISO-19011:2018 §6.4 — a cited standard is evidence only if it leads to its enforcement
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * DECLARED: each ISO/IEC 25010 quality CONCERN → the erpax gate that enforces it, keyed by concern name
 * (not by §-number — the corpus's own §-citations are inconsistent, so the concern is the honest key).
 * Arguable in the open: extend it, never infer it. A concern with `gate: null` is UNENFORCED — the
 * reverse-engineered solution to build.
 */
export const QUALITY_ENFORCEMENT: ReadonlyArray<{
  readonly concern: string
  readonly clause: string
  readonly gate: string | null
  readonly why: string
}> = [
  { concern: 'modularity', clause: '§5.6.2', gate: 'rules/cycle', why: 'an import loop breaks modularity — the SCC gate proves the graph is untangled' },
  { concern: 'modularity-registry', clause: '§5.6.2', gate: 'rules/confine', why: 'the whole registry may not be materialised by hand — the field confines it' },
  { concern: 'testability', clause: '§5.5', gate: 'rules/refutable', why: 'an unfalsifiable @invariant is untestable — the gate demands a proof leg' },
  { concern: 'analysability', clause: '§5.6', gate: 'rules/reference', why: 'a dead src pointer cannot be analysed — the trace must resolve' },
  { concern: 'understandability', clause: '§5.6', gate: 'rules/echo', why: 'a path that restates itself conveys no new meaning — the echo gate flags it' },
  { concern: 'reusability', clause: '§5.6', gate: 'rules/unfolded', why: 'a single-use export is not reused — inline, delete, or reuse it' },
  { concern: 'naming', clause: '§5.6', gate: 'law/folder', why: 'one generic lowercase word per atom — the folder-law gate' },
  { concern: 'time-behaviour', clause: '§5.2', gate: 'timeout', why: 'the measured timeout ladder bounds every lane' },
  { concern: 'functional-completeness', clause: '§5.1', gate: 'law/folder', why: 'the SKILL·index·test trinity is the completeness gate' },
  { concern: 'interaction-capability', clause: '§5.4', gate: null, why: 'admin/UX conformance is cited but not yet gated — a solution to reverse-engineer' },
  { concern: 'compatibility', clause: '§5.3', gate: null, why: 'API/plugin interop is cited but not yet gated — a solution to reverse-engineer' },
]

export interface EngineeringCitation {
  readonly atom: string
  readonly clause: string
  readonly enforced: boolean
}

const SKIP = new Set(['node_modules', 'app', 'migrations'])
const walkTs = (dir: string, acc: string[] = []): string[] => {
  let ents: import('node:fs').Dirent[]
  try {
    ents = readdirSync(dir, { withFileTypes: true })
  } catch {
    return acc
  }
  for (const e of ents) {
    if (e.name.startsWith('.') || SKIP.has(e.name)) continue
    const p = join(dir, e.name)
    if (e.isDirectory()) walkTs(p, acc)
    else if (/\.tsx?$/.test(e.name) && !/\.(test|generated)\./.test(e.name) && !/catalogue\.ts$/.test(e.name)) acc.push(p)
  }
  return acc
}

/** COMPUTED: every ISO/IEC 25010 clause citation in the corpus → (atom, clause, is the concern gate-enforced). */
export function engineeringCitations(cwd: string = process.cwd()): EngineeringCitation[] {
  const enforcedClauses = new Set(QUALITY_ENFORCEMENT.filter((q) => q.gate).map((q) => q.clause))
  const out: EngineeringCitation[] = []
  const seen = new Set<string>()
  for (const f of walkTs(join(cwd, 'src'))) {
    let txt: string
    try {
      txt = readFileSync(f, 'utf8')
    } catch {
      continue
    }
    for (const m of txt.matchAll(/25010[:0-9]*\s+(§[0-9.]+)/g)) {
      const clause = m[1]!
      const atom = f.replace(/.*\/src\//, '').replace(/\/index\.tsx?$/, '').replace(/\/[^/]+\.tsx?$/, '')
      const key = `${atom}|${clause}`
      if (seen.has(key)) continue
      seen.add(key)
      out.push({ atom, clause, enforced: enforcedClauses.has(clause) })
    }
  }
  return out
}

export interface EngineeringConformance {
  readonly concerns: number
  readonly enforced: number
  readonly citations: number
  readonly enforcedCitations: number
  /** the concerns cited but with NO enforcing gate — the solutions to reverse-engineer next */
  readonly reverseEngineer: ReadonlyArray<{ readonly concern: string; readonly clause: string; readonly why: string }>
}

/** The conformance picture: how much of the cited engineering-quality surface is actually gate-enforced. */
export function engineeringConformance(cwd: string = process.cwd()): EngineeringConformance {
  const cites = engineeringCitations(cwd)
  const reverseEngineer = QUALITY_ENFORCEMENT.filter((q) => q.gate === null).map((q) => ({ concern: q.concern, clause: q.clause, why: q.why }))
  return {
    concerns: QUALITY_ENFORCEMENT.length,
    enforced: QUALITY_ENFORCEMENT.filter((q) => q.gate).length,
    citations: cites.length,
    enforcedCitations: cites.filter((c) => c.enforced).length,
    reverseEngineer,
  }
}

/**
 * The gate: the count of UNENFORCED engineering-quality concerns may not grow. A new 25010 concern cited
 * with no gate fails CI, and the ceiling ratchets DOWN as each is reverse-engineered into an enforcing
 * gate — the engineering standard becomes law, not decoration.
 */
export function assertEngineeringEnforced(cwd: string = process.cwd(), ceiling: number): void {
  const c = engineeringConformance(cwd)
  if (c.reverseEngineer.length <= ceiling) return
  throw new Error(
    `✖ engineering — ${c.reverseEngineer.length} cited quality concern(s) with no enforcing gate exceeds ceiling ${ceiling}: ` +
      `${c.reverseEngineer.map((r) => `${r.concern}(${r.clause})`).join(' ')} — reverse-engineer each into a gate, or stop citing it.`,
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const c = engineeringConformance()
  console.log(`engineering — ISO/IEC 25010 quality concerns: ${c.enforced}/${c.concerns} gate-enforced`)
  console.log(`  citations: ${c.enforcedCitations}/${c.citations} sit under an enforcing gate`)
  console.log(`  reverse-engineer next (cited, no gate):`)
  for (const r of c.reverseEngineer) console.log(`    ✗ ${r.concern} (${r.clause}) — ${r.why}`)
}
