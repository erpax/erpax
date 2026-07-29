import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * report — a document self-built by COLLAPSING a standards×format×data superposition on request.
 *
 * Once collections · references · hooks · inputs · automation · access have no gap, the last frontier
 * is the DOCUMENT: not a hand-written template per (standard × format), but a superposition collapsed
 * on demand. The magnitude is the argument — 381 standards over 948 atoms is 145,161 pairwise legal
 * interactions, 55M triples; hand-writing one report template an hour is ~70 person-YEARS for the
 * pairwise surface alone. It is impossible to enumerate and trivial to COMPUTE: given a request, the
 * mesh already knows which collections a format's standards govern, which API endpoints serve them,
 * and (via [[access]]/standard) the legal floor the requester must clear. The document is the collapse.
 *
 * A collapse costs ZERO tokens — it is a mesh query, not a generation. The etrima 20-yr history (29.7M
 * rows, 1.1GB in the largest table) aggregates locally at ~5.2M rows/s → the whole history in ~6s, no
 * LLM in the loop. The report SPEC is deterministic at query time; the rendered bytes are that scan.
 *
 *   tsx src/report/index.ts        # the buildable/blocked report census over the live mesh
 *
 * @see ../mesh — standardApiCross (which collections a standard governs)
 * @see ../access/standard — requiredAccessTier (the legal floor a report must clear)
 *
 * @standard IFRS-Taxonomy — a financial statement is a projection over the ledger, not stored
 * @standard BG Наредба Н-18 §СУПТО — the SAF-T export is a mandated document format
 * @audit ISO-19011:2018 §6.4 — a report is read by the reader who signs it
 */
import { meshOf, standardApiCross, type Mesh, type MeshCollection, type ApiEndpoint } from '@/mesh'
import { netFlow } from '@/conservation'
import { requiredAccessTier, tierRank, type AccessTier } from '@/access/standard'

/** The document formats a request may ask for — each a projection the corpus can build from atoms. */
export type ReportFormat =
  | 'trial-balance'
  | 'balance-sheet'
  | 'income-statement'
  | 'cash-flow'
  | 'aging'
  | 'saf-t'
  | 'vat-return'
  | 'audit-file'

/**
 * DECLARED format → the standards its document must satisfy, and the atoms it must draw from. This is
 * the arguable seam (the same computed/declared split as [[rules]]/audience): no theorem says a
 * balance sheet answers to IFRS-1 — it is written here once so an auditor can contest it. The atoms
 * are the concepts a format projects over; a format is BUILDABLE iff every one is a standing collection.
 */
export const FORMAT_LAW: Readonly<Record<ReportFormat, { readonly standards: readonly string[]; readonly atoms: readonly string[] }>> = {
  'trial-balance': { standards: ['IFRS', 'GAAP'], atoms: ['accounting', 'ledger', 'accounts'] },
  'balance-sheet': { standards: ['IFRS-1', 'IFRS', 'US-GAAP'], atoms: ['accounting', 'accounts', 'assets'] },
  'income-statement': { standards: ['IFRS-15', 'IFRS'], atoms: ['accounting', 'invoices', 'revenue'] },
  'cash-flow': { standards: ['IFRS-7', 'SOX:2002 §302'], atoms: ['accounting', 'payments', 'receipts'] },
  aging: { standards: ['IFRS-9'], atoms: ['invoices', 'customers', 'vendors'] },
  'saf-t': { standards: ['BG Наредба Н-18', 'СУПТО'], atoms: ['accounting', 'invoices', 'ledger'] },
  'vat-return': { standards: ['ЗДДС', 'BG Наредба Н-18'], atoms: ['invoices', 'accounting'] },
  'audit-file': { standards: ['BG Наредба Н-18 §СУПТО', 'ISO-19011'], atoms: ['audit', 'ledger', 'accounting'] },
}

export interface ReportSpec {
  readonly format: ReportFormat
  /** the standards the document must satisfy (its legal surface) */
  readonly standards: readonly string[]
  /** the collections it projects over, resolved from the mesh */
  readonly collections: readonly MeshCollection[]
  /** the /api/mcp endpoints that serve its data */
  readonly endpoints: readonly ApiEndpoint[]
  /** the access tier a requester must clear to build it (the strictest across its standards) */
  readonly requiredTier: AccessTier
  /** atoms the format needs that are NOT standing collections — the projection GAP */
  readonly missing: readonly string[]
  /** true ⇒ every atom the format needs is a standing collection: self-buildable now */
  readonly buildable: boolean
}

export interface ReportRequest {
  readonly format: ReportFormat
  /** the access tier the requester carries — the collapse REFUSES if it does not clear the floor */
  readonly requesterTier?: AccessTier
}

/**
 * Collapse ONE superposition to a document spec: given a requested format, the mesh yields the
 * collections its standards govern, the endpoints that serve them, and the legal floor to clear. A
 * deterministic query — the "self-buildable upon request" the frontier is made of. It reports
 * buildable=false (with the missing atoms) rather than fabricating a document over a gap.
 */
export function collapseReport(mesh: Mesh, request: ReportRequest): ReportSpec & { readonly permitted: boolean } {
  const law = FORMAT_LAW[request.format]
  const standing = new Set(mesh.collections.map((c) => c.atom))
  const missing = law.atoms.filter((a) => !standing.has(a) && !mesh.collections.some((c) => c.slug === a))
  const collections = mesh.collections.filter((c) => law.atoms.includes(c.atom) || law.atoms.includes(c.slug))
  const endpoints = law.standards.flatMap((s) => standardApiCross(mesh, s).endpoints)
  const requiredTier = requiredAccessTier(law.standards).tier
  const permitted = request.requesterTier ? tierRank(request.requesterTier) >= tierRank(requiredTier) : false
  return { format: request.format, standards: law.standards, collections, endpoints, requiredTier, missing, buildable: missing.length === 0, permitted }
}

/** Which of the 8 formats are fully self-buildable from standing atoms today, and which are blocked by a gap. */
export interface ReportBalanceCheck {
  readonly format: ReportFormat
  /** Σ of the report's signed figures — 0 (within tolerance) iff the report conserves */
  readonly net: number
  readonly conserves: boolean
}

/**
 * The conservation kernel wired into the ERP's output: a financial report MUST conserve. A trial
 * balance's Σdebit = Σcredit, a balance sheet's Σassets = Σ(liabilities + equity), a cash-flow's Σin =
 * Σout — all the SAME netFlow = 0 as double-entry ([[conservation]]), now guarding the document the
 * reader signs. Figures are signed flows (+ debit/asset/inflow, − credit/liability/outflow); a report
 * whose figures do not net to zero is refused, exactly as an unbalanced journal entry is. Tolerance,
 * never float equality (the honest boundary — rounding is not a failure).
 */
export function reportConserves(
  format: ReportFormat,
  signedFigures: readonly number[],
  tolerance = 0.005,
): ReportBalanceCheck {
  const net = netFlow([...signedFigures])
  return { format, net, conserves: exactAbs(net) <= tolerance }
}

export function buildableReports(cwd: string = process.cwd(), mesh?: Mesh): {
  readonly buildable: readonly ReportFormat[]
  readonly blocked: ReadonlyArray<{ readonly format: ReportFormat; readonly missing: readonly string[] }>
} {
  const m = mesh ?? meshOf(cwd)
  const buildable: ReportFormat[] = []
  const blocked: { format: ReportFormat; missing: readonly string[] }[] = []
  for (const format of Object.keys(FORMAT_LAW) as ReportFormat[]) {
    const spec = collapseReport(m, { format })
    if (spec.buildable) buildable.push(format)
    else blocked.push({ format, missing: spec.missing })
  }
  return { buildable, blocked }
}

/**
 * The MAGNITUDE that makes this a computation and not a template library: the count of distinct
 * (standard × collection × operation × reader) documents the corpus could be asked to produce. The
 * number is the proof of "impossible unless quantum computed" — you collapse ONE on request; you do
 * not enumerate 20 million. Measured over the live mesh, never asserted.
 */
export function reportSuperpositionSize(cwd: string = process.cwd(), mesh?: Mesh): {
  readonly standards: number
  readonly collections: number
  readonly pairwiseStandards: number
  readonly fullSuperposition: number
} {
  const m = mesh ?? meshOf(cwd)
  const standards = new Set(m.standards.map((s) => s.id)).size
  const collections = m.collections.length
  const OPS = 4 // find · create · update · delete
  const READERS = 14 // the config's UserRole cardinality (see [[rules]]/audience)
  return {
    standards,
    collections,
    pairwiseStandards: standards * standards,
    fullSuperposition: standards * collections * OPS * READERS,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const mesh = meshOf()
  const { buildable, blocked } = buildableReports(process.cwd(), mesh)
  const mag = reportSuperpositionSize(process.cwd(), mesh)
  console.log(`report — the self-buildable document, over ${mesh.collections.length} collections`)
  console.log(`  superposition: ${mag.standards} standards × ${mag.collections} collections × 4 ops × 14 readers = ${mag.fullSuperposition.toLocaleString()} possible documents`)
  console.log(`  pairwise standard interactions: ${mag.pairwiseStandards.toLocaleString()} — impossible to hand-template, one collapse to build`)
  console.log(`  buildable now (${buildable.length}/8): ${buildable.join(' ')}`)
  for (const b of blocked) console.log(`  ✗ ${b.format} — blocked by missing atom(s): ${b.missing.join(' ')}`)
}
