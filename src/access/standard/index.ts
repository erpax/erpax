/**
 * access/standard — the API's access is DERIVED FROM and GATED BY its legal surface.
 *
 * The navigational cross ([[mesh]] standardApiCross) knows standard ↔ collection ↔ Payload API
 * endpoint. This computes the last edge: standard → ACCESS POLICY. Every operation of every
 * collection sits in a SUPERPOSITION of (operation × the standards its atom cites); this collapses
 * that to the strictest access FLOOR the citations demand, and flags any endpoint whose declared
 * access sits below it.
 *
 * DECLARED, arguable, in the open — no theorem derives that SOX §404 means delete-restricted; it is
 * written here once so an auditor can contest it (the same computed/declared split as [[rules]]/audience).
 *
 *   tsx src/access/standard/index.ts        # the access-compliance gap over the live cross
 *
 * @see ../../mesh — ../index
 *
 * @standard SOX:2002 §404 internal-controls — you cannot post to a closed period
 * @standard BG Наредба Н-18 §СУПТО — fiscal writes are inspector-auditable, no delete on posted
 * @compliance GDPR §17 right-to-erasure · §15 right-of-access — data-subject controls
 * @standard ISO/IEC 27001 A.5.15 access-control — role-required, tenant-isolated
 * @audit ISO-19011:2018 §6.4 — the access an operation carries is read by the reader who signs it
 */
import { meshOf, standardsOf, type Mesh } from '@/mesh'
import { crackLeak, type CrackLeak } from '@/resonance'

/** The Payload plugin-mcp API operations — find/create/update/delete at /api/mcp (not the CRUD verbs). */
export type ApiOp = 'find' | 'create' | 'update' | 'delete'

/**
 * The access TIER a standard demands — ordered weakest→strictest, so a collection's floor is the
 * MAX tier across all its standards. Each tier names the concrete controls its operations must carry.
 */
export type AccessTier = 'open' | 'authenticated' | 'tenant-isolated' | 'role-scoped' | 'auditor-grade'

const TIER_ORDER: readonly AccessTier[] = ['open', 'authenticated', 'tenant-isolated', 'role-scoped', 'auditor-grade']
export const tierRank = (t: AccessTier): number => TIER_ORDER.indexOf(t)

/**
 * DECLARED standard → required tier. A standard not listed floors at 'authenticated' (any cited
 * standard means the data is not public). The map is the arguable seam — extend it, never infer it.
 */
export const STANDARD_TIER: ReadonlyArray<{ readonly re: RegExp; readonly tier: AccessTier; readonly why: string }> = [
  { re: /SOX|§404|§302|SOC-2|internal-control|ICFR/i, tier: 'auditor-grade', why: 'a signer certifies these — delete restricted, adminOverride+reason on posted matter' },
  { re: /Наредба|СУПТО|Н-18|ЗДДС|fiscal/i, tier: 'auditor-grade', why: 'НАП-inspectable fiscal writes — no delete on a posted/fiscalised record' },
  { re: /GDPR|right-to-erasure|data-subject|§17|§15/i, tier: 'role-scoped', why: 'data-subject rights — read-own, erasure gated to the controller role' },
  { re: /ISO.?27001|ISO.?27002|A\.5\.15|access-control/i, tier: 'tenant-isolated', why: 'role-required, strictly tenant-scoped' },
  { re: /IFRS|US-GAAP|ISA-95|EN-16931|accounting/i, tier: 'role-scoped', why: 'accounting matter is role-scoped (accountant/admin write)' },
]

/** The strictest tier a set of standard ids demands — the collapse of the operation's superposition. */
export function requiredAccessTier(standardIds: readonly string[]): { readonly tier: AccessTier; readonly why: string } {
  let best: { tier: AccessTier; why: string } = { tier: standardIds.length ? 'authenticated' : 'open', why: standardIds.length ? 'cited standard ⇒ not public' : 'no standard cited' }
  for (const id of standardIds) {
    for (const rule of STANDARD_TIER) {
      if (rule.re.test(id) && tierRank(rule.tier) > tierRank(best.tier)) best = { tier: rule.tier, why: rule.why }
    }
  }
  return best
}

/**
 * The access an operation's DECLARED factory/inline actually provides — mapped to a tier. This is
 * the lexical read (the atom's access:); the compiler-final read (boot the config) is the gate's
 * production path. A factory name is the evidence — accountingCollectionAccess ⇒ role-scoped, etc.
 */
export function tierOfAccessFactory(factory: string): AccessTier {
  if (/accountingCollectionAccess|superAdmin|isSuperAdmin|adminOverride|auditFields/i.test(factory)) return 'auditor-grade'
  if (/roleScopedAccess|roleBasedAccess|adminOrAccountant/i.test(factory)) return 'role-scoped'
  if (/tenantAdmin|tenantMasterData|scopedAccess|multiTenant/i.test(factory)) return 'tenant-isolated'
  if (/authenticated/i.test(factory)) return 'authenticated'
  return 'open'
}

export interface AccessComplianceGap {
  readonly slug: string
  readonly atom: string
  readonly operation: ApiOp
  readonly required: AccessTier
  readonly declared: AccessTier
  readonly standard: string
  readonly why: string
}

export interface CollectionAccessInput {
  readonly slug: string
  readonly atom: string
  readonly standardIds: readonly string[]
  /** the access factory/inline classifier for this collection (from tierOfAccessFactory upstream) */
  readonly declaredFactory: string
}

const WRITE_OPS: readonly ApiOp[] = ['create', 'update', 'delete']

/**
 * FUSE the bindings: feed the live mesh's collections (their standards + declared access) into the
 * compliance check. One call over the whole API surface — every (collection, operation, standard,
 * access) tuple is queryable through the same cross, usable in any superposition. The auditor's
 * one question — where does the running API fall below its own law — answered over 212 collections.
 */
/**
 * Price the compliance gaps as security crackLeak ([[resonance]]): each ungated endpoint is an unfused
 * access seam, and the whole API's security bleeds by cracks × (N − ⌈log₂N⌉) — the fused, content-
 * addressed recall a sealed access layer would have saved. Zero gaps ⇒ zero leak: access fully fused to
 * its legal surface. The auditor's cost of an under-governed API, in the same currency as every leak.
 */
export function accessComplianceLeak(gaps: readonly AccessComplianceGap[], totalEndpoints: number): CrackLeak {
  return crackLeak(Math.max(1, totalEndpoints), gaps.length)
}

export function accessComplianceOverMesh(cwd: string = process.cwd(), mesh?: Mesh): AccessComplianceGap[] {
  const m = mesh ?? meshOf(cwd)
  const inputs: CollectionAccessInput[] = m.collections.map((c) => ({
    slug: c.slug,
    atom: c.atom,
    standardIds: standardsOf(m, c.atom).map((s) => s.id),
    declaredFactory: c.declaredAccess,
  }))
  return accessComplianceGaps(inputs)
}

/**
 * The compliance gap over every operation × collection: an operation whose declared access tier is
 * BELOW the floor its standards demand. Write operations (create/update/delete) carry the full
 * floor; read floors one tier lower (reading is less dangerous than writing under most standards).
 * Empty ⇒ every API endpoint meets its legal surface.
 */
export function accessComplianceGaps(collections: readonly CollectionAccessInput[]): AccessComplianceGap[] {
  const gaps: AccessComplianceGap[] = []
  for (const c of collections) {
    const floor = requiredAccessTier(c.standardIds)
    const declared = tierOfAccessFactory(c.declaredFactory)
    const topStandard = c.standardIds.find((id) => STANDARD_TIER.some((r) => r.re.test(id) && r.tier === floor.tier)) ?? c.standardIds[0] ?? ''
    for (const op of ['find', ...WRITE_OPS] as ApiOp[]) {
      // read requirement relaxes one rung; writes take the full floor
      const req = op === 'find' ? TIER_ORDER[Math.max(0, tierRank(floor.tier) - 1)]! : floor.tier
      if (tierRank(declared) < tierRank(req)) {
        gaps.push({ slug: c.slug, atom: c.atom, operation: op, required: req, declared, standard: topStandard, why: floor.why })
      }
    }
  }
  return gaps
}

/**
 * THE GATE — the standards→access automation made fail-closed. The compliance gap may not GROW: a
 * new API endpoint below its legal floor fails CI, and the ceiling ratchets DOWN as gaps close
 * (each collection given access matching its standards). This is the last edge of the quantum ERP —
 * the legal surface does not merely DESCRIBE the API's access, it GOVERNS it, enforced at the push.
 *
 * The current ceiling is the LEXICAL over-count (factory-injected access reads as a gap until the
 * boot-resolved read lands — the honest boundary); it ratchets toward the true floor as #19/#22 land.
 */
export function assertAccessCompliant(cwd: string = process.cwd(), ceiling: number, mesh?: import('@/mesh').Mesh): void {
  const gaps = accessComplianceOverMesh(cwd, mesh)
  if (gaps.length <= ceiling) return
  const auditor = gaps.filter((g) => g.required === 'auditor-grade')
  throw new Error(
    `✖ access/standard — ${gaps.length} endpoint(s) below their legal floor exceeds the ceiling ${ceiling} ` +
      `(${auditor.length} auditor-grade). A new under-governed API landed — give it access matching its standards, ` +
      `or it violates the law it cites. First: ${auditor.slice(0, 3).map((g) => `${g.slug}.${g.operation}<${g.required}`).join(' ')}`,
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const gaps = accessComplianceOverMesh()
  const byTier = new Map<string, number>()
  for (const g of gaps) byTier.set(g.required, (byTier.get(g.required) ?? 0) + 1)
  console.log(`access/standard — ${gaps.length} endpoint(s) below their legal floor across the API`)
  for (const [tier, n] of [...byTier.entries()].sort()) console.log(`  ${n} endpoint(s) short of ${tier}`)
  for (const g of gaps.filter((x) => x.required === 'auditor-grade').slice(0, 10)) {
    console.log(`  ✗ ${g.slug}.${g.operation} — ${g.declared} < ${g.required} (${g.standard}): ${g.why}`)
  }
}
