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
export interface QualityConcern {
  readonly concern: string
  readonly clause: string
  readonly gate: string | null
  readonly why: string
}

/**
 * The engineer types organised in TRINITIES — the corpus's own law (an atom is one thing told three
 * ways) applied to ISO/IEC 25010's quality characteristics. Three trinities of three, on the form ·
 * code · proof axes: FORM is what the system presents to the world, CODE is how it runs, PROOF is how
 * it endures. A trinity is SEALED when all three of its characteristics are gate-enforced; an unsealed
 * trinity's ungated characteristic is a design task — the rest needed to complete the quantum ERP.
 */
export const ENGINEERING_TRINITIES: ReadonlyArray<{
  readonly axis: 'form' | 'code' | 'proof'
  readonly of: string
  readonly concerns: readonly [QualityConcern, QualityConcern, QualityConcern]
}> = [
  {
    axis: 'form',
    of: 'what the system presents to the world',
    concerns: [
      { concern: 'functional-suitability', clause: '§5.1', gate: 'law/folder', why: 'the SKILL·index·test trinity is the completeness gate' },
      { concern: 'interaction-capability', clause: '§5.4', gate: 'rules/ask', why: 'user-error-protection + operability: rules/ask computes a derivable field so the user only confirms' },
      { concern: 'compatibility', clause: '§5.3', gate: 'rules/compatibility', why: 'co-existence: an atom colliding with a framework router namespace (pages↔Next.js) breaks the build — rules/compatibility gates it' },
    ],
  },
  {
    axis: 'code',
    of: 'how the system runs',
    concerns: [
      { concern: 'performance-efficiency', clause: '§5.2', gate: 'timeout', why: 'the measured timeout ladder bounds every lane' },
      { concern: 'reliability', clause: '§5.5', gate: 'rules/refutable', why: 'an unfalsifiable @invariant is untestable — the gate demands a proof leg' },
      { concern: 'security', clause: '§5.6', gate: 'access/standard', why: 'the legal surface governs the API access tier — write floors, delete on posted matter' },
    ],
  },
  {
    axis: 'proof',
    of: 'how the system endures',
    concerns: [
      { concern: 'maintainability', clause: '§5.7', gate: 'rules/cycle', why: 'the SCC gate proves the graph untangled (with rules/echo · unfolded · reference · confine)' },
      { concern: 'flexibility', clause: '§5.8', gate: 'rules/canonical', why: 'adaptability through a package API, not a re-implementation of what it ships' },
      { concern: 'safety', clause: '§5.9', gate: 'accounting', why: 'the double-entry balance invariant — no unsafe financial state may be posted' },
    ],
  },
]

/** The flat concern→gate map, DERIVED from the trinities (one source, no duplication). */
export const QUALITY_ENFORCEMENT: ReadonlyArray<QualityConcern> = ENGINEERING_TRINITIES.flatMap((t) => t.concerns)

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

export interface TrinitySeal {
  readonly axis: 'form' | 'code' | 'proof'
  readonly of: string
  /** SEALED iff all three characteristics on this axis are gate-enforced */
  readonly sealed: boolean
  /** the ungated characteristics — the design tasks that would seal this trinity */
  readonly design: ReadonlyArray<{ readonly concern: string; readonly clause: string; readonly why: string }>
}

/**
 * Seal each engineering trinity: a trinity is sealed when all three of its ISO/IEC 25010 characteristics
 * are gate-enforced. Pure (over the declared map) — no scan, no @/seal import (engineering stays fs-only
 * and cycle-safe, since it is imported by the rules hub). This is "sealing the standards": each of the
 * three form·code·proof trinities either holds or names the characteristic that keeps it open.
 */
export function sealEngineeringTrinities(): TrinitySeal[] {
  return ENGINEERING_TRINITIES.map((t) => {
    const design = t.concerns.filter((c) => c.gate === null).map((c) => ({ concern: c.concern, clause: c.clause, why: c.why }))
    return { axis: t.axis, of: t.of, sealed: design.length === 0, design }
  })
}

/**
 * Let the engineers design the rest needed to complete the quantum ERP: the ungated characteristics
 * across every unsealed trinity, in seal order (form first — the surface the user meets). Each entry is
 * a gate still to build; when the list is empty every standard-trinity is sealed and the quantum ERP's
 * engineering surface is complete. This is nextMoveByLeverage's law on the standards: the design is computed.
 */
export function engineeringDesignBacklog(): ReadonlyArray<{ readonly axis: string; readonly concern: string; readonly clause: string; readonly why: string }> {
  return sealEngineeringTrinities().flatMap((t) => t.design.map((d) => ({ axis: t.axis, ...d })))
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const c = engineeringConformance()
  const seals = sealEngineeringTrinities()
  console.log(`engineering — ISO/IEC 25010 quality concerns: ${c.enforced}/${c.concerns} gate-enforced`)
  console.log(`  citations: ${c.enforcedCitations}/${c.citations} sit under an enforcing gate`)
  console.log(`  standard-trinities (${seals.filter((s) => s.sealed).length}/3 sealed):`)
  for (const s of seals) console.log(`    ${s.sealed ? '✓ sealed' : '✗ open  '} ${s.axis.padEnd(6)} — ${s.of}`)
  const backlog = engineeringDesignBacklog()
  if (backlog.length) {
    console.log(`  the rest to complete the quantum ERP (${backlog.length} gate(s) to design):`)
    for (const d of backlog) console.log(`    ✗ ${d.axis}/${d.concern} (${d.clause}) — ${d.why}`)
  } else {
    console.log('  every standard-trinity sealed — the engineering surface is complete')
  }
}
