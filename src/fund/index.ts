import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import ts from 'typescript'
import { payloadInterfaces } from '@/rules/collapse'

/**
 * fund — can a funded project actually be run here, in any domain?
 *
 * @see ./SKILL.md
 */

/** An edge in the collection graph: `from` carries a field whose type reaches `to`. */
export interface CollectionEdge {
  readonly from: string
  readonly to: string
  readonly field: string
}

export interface CollectionGraph {
  /** slug → interface name, as the live config generated it. */
  readonly ifaceOfSlug: ReadonlyMap<string, string>
  readonly edges: readonly CollectionEdge[]
  /** slug → how many OTHER collections can point at it. */
  readonly inDegree: ReadonlyMap<string, number>
}

/** Registry types, not data: they restate every collection and would make every table look reachable. */
const isRegistryInterface = (name: string): boolean =>
  name === 'Config' || name.endsWith('Select') || name.endsWith('_select') || name === 'PayloadLockedDocument'

/**
 * The collection graph, PARSED from the types Payload generated out of the live config.
 *
 * Edges are read from each member's TYPE text, tokenised on word boundaries, so every spelling a
 * relationship takes is caught by one rule: `(string | null) | Project`, `(string | Project)[]`, and
 * the polymorphic `{ relationTo: 'projects'; value: string | Project }` all reach `Project`, while
 * `ProjectTask` is a different token and never counts as an edge to `Project`.
 */
export function collectionGraph(cwd: string = process.cwd()): CollectionGraph {
  // ONE parse of the booted config, shared with [[rules]]/collapse. This was a byte-identical
  // copy of that visitor until [[rules]]/copy addressed both bodies to the same hash.
  const { ifaceOfSlug, ifaces } = payloadInterfaces(cwd)

  const slugOfIface = new Map([...ifaceOfSlug].map(([slug, iface]) => [iface, slug]))
  const edges: CollectionEdge[] = []
  for (const [fromSlug, fromIface] of ifaceOfSlug) {
    const i = ifaces.get(fromIface)
    if (!i || isRegistryInterface(fromIface)) continue
    for (const m of i.members) {
      if (!ts.isPropertySignature(m) || !m.type) continue
      const field = m.name!.getText().replace(/['"?]/g, '')
      const seen = new Set<string>()
      for (const token of m.type.getText().match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? []) {
        const toSlug = slugOfIface.get(token)
        if (toSlug === undefined || toSlug === fromSlug || seen.has(toSlug)) continue
        seen.add(toSlug)
        edges.push({ from: fromSlug, to: toSlug, field })
      }
    }
  }

  const inDegree = new Map<string, number>([...ifaceOfSlug.keys()].map((s) => [s, 0]))
  for (const e of edges) inDegree.set(e.to, (inDegree.get(e.to) ?? 0) + 1)
  return { ifaceOfSlug, edges, inDegree }
}

/**
 * A booted table nothing can point at — writable, never joinable.
 *
 * Rows can be created and listed, and that is the whole of it: no cost, document, milestone or
 * report can be ATTRIBUTED to one, because no field anywhere reaches it. An orphan is not an unused
 * table; it is a table whose rows cannot participate in anything the corpus computes.
 */
export function orphanCollections(cwd: string = process.cwd()): string[] {
  const g = collectionGraph(cwd)
  return [...g.inDegree].filter(([, n]) => n === 0).map(([slug]) => slug).sort()
}

/** The award itself — every other stage is judged by whether it can reach this table. */
const AWARD_SLUG = 'government-grants' as const

/** The award's slug, as behaviour rather than a published literal ([[matrix]]/constants-audit). */
export const awardSlug = (): string => AWARD_SLUG

/**
 * Every collection that can reach `to` by following relationship fields, transitively.
 *
 * ATTRIBUTION is an outbound question, and reading it as an inbound one is how the first version of
 * this gate reported the right verdict for the wrong reason. A milestone belongs to a project because
 * the MILESTONE carries the reference; nothing points back at it, and its in-degree of 0 says nothing
 * about whether it is attributable. `journal-entries` meanwhile has 43 collections pointing at it and
 * still reaches no award. In-degree measures how often a table is CITED; attribution asks what a row
 * can NAME as the thing it belongs to.
 */
export function canReach(to: string, cwd: string = process.cwd()): ReadonlySet<string> {
  const g = collectionGraph(cwd)
  const out = new Map<string, string[]>()
  for (const e of g.edges) out.set(e.from, [...(out.get(e.from) ?? []), e.to])
  const reaches = new Set<string>()
  const seen = new Set<string>()
  const walk = (slug: string): boolean => {
    if (reaches.has(slug)) return true
    if (seen.has(slug)) return false
    seen.add(slug)
    const hit = (out.get(slug) ?? []).some((next) => next === to || walk(next))
    if (hit) reaches.add(slug)
    return hit
  }
  for (const slug of g.ifaceOfSlug.keys()) {
    seen.clear()
    walk(slug)
  }
  return reaches
}

/**
 * The stages a FUNDER imposes on a project, and the booted table that would serve each.
 *
 * DECLARED, in the open, so it can be argued with — no theorem derives that a grant-funded project
 * must report periodically; a funding agreement does, and that is a fact about the world rather than
 * about this corpus ([[rules]]/audience makes the same split for role→standard).
 *
 * `attributable` marks a stage whose whole purpose is to be ATTACHED to the award. Existence is not
 * enough there: a table that cannot name the award it belongs to fails the stage even though it booted.
 */
const STAGES: readonly {
  readonly stage: string
  readonly slug: string
  readonly attributable: boolean
  readonly why: string
}[] = [
  { stage: 'award', slug: 'government-grants', attributable: false, why: 'the funding instrument itself' },
  { stage: 'budget', slug: 'budget-planning', attributable: true, why: 'planned spend against the award' },
  { stage: 'procure', slug: 'purchase-orders', attributable: true, why: 'spending the money lawfully' },
  { stage: 'execute', slug: 'project-milestones', attributable: true, why: 'the work the award pays for' },
  { stage: 'account', slug: 'journal-entries', attributable: true, why: 'cost capture, eligible vs not' },
  // NOT `audit-reports`: that is the SOX/consolidation artefact, and it read as SERVED only because
  // it reaches the award transitively once projects carry one. A funder's report is a different
  // document with a different deadline and a different reader — but it is the SAME SHAPE as a
  // regulatory filing (entity · period · due date · submission · status · feedback), so it is a ROW
  // in `regulatory-reports` under reportType `grant-report`, never a table of its own.
  { stage: 'report', slug: 'regulatory-reports', attributable: true, why: 'the periodic report the funder requires' },
  { stage: 'audit', slug: 'audit-evidence', attributable: true, why: "the funder's trail, and claw-back defence" },
  // NOT `contracts`: those are CUSTOMER contracts. An award's settlement is recorded on the award —
  // its own status walks awarded → active → conditions_met → fully_recognised → repayable → repaid.
  { stage: 'close', slug: 'government-grants', attributable: false, why: "settlement, on the award's own lifecycle" },
]

/** The declared lifecycle, as behaviour rather than a published literal. */
export const fundedStages = (): typeof STAGES => STAGES

export interface StageVerdict {
  readonly stage: string
  readonly slug: string
  /** Did the table boot at all? */
  readonly booted: boolean
  /** Can a row here name the award it belongs to, however many hops away? */
  readonly reachesAward: boolean
  readonly served: boolean
  readonly reason: string
}

/** Every stage, judged against the live config. */
export function fundedSpine(cwd: string = process.cwd()): StageVerdict[] {
  const g = collectionGraph(cwd)
  const reaching = canReach(AWARD_SLUG, cwd)
  return STAGES.map(({ stage, slug, attributable }) => {
    const booted = g.ifaceOfSlug.has(slug)
    const reachesAward = reaching.has(slug)
    const served = booted && (!attributable || reachesAward)
    const reason = !booted
      ? 'no such collection in the live config'
      : attributable && !reachesAward
        ? `no relationship path to ${AWARD_SLUG} — a row here cannot name the award it belongs to`
        : 'served'
    return { stage, slug, booted, reachesAward, served, reason }
  })
}

/**
 * Usability is a PRODUCT, never a percentage.
 *
 * A funded project runs end to end or it does not run: a hole at any stage stops the whole lifecycle,
 * and it stops it identically in every domain. Reporting "7 of 8 stages" as 87% would describe a
 * project that cannot be delivered as nearly deliverable.
 */
export function spineComplete(cwd: string = process.cwd()): boolean {
  return fundedSpine(cwd).every((s) => s.served)
}

/** Fails closed on a stage that cannot carry an award. */
export function assertFundedSpine(cwd: string = process.cwd(), ceiling: number): void {
  const broken = fundedSpine(cwd).filter((s) => !s.served)
  if (broken.length <= ceiling) return
  throw new Error(
    `✖ fund — ${broken.length} funded-project stage(s) cannot carry an award (ceiling ${ceiling}):\n` +
      broken.map((s) => `  ${s.stage.padEnd(8)} ${s.slug.padEnd(20)} ${s.reason}`).join('\n'),
  )
}

export interface Blocker {
  readonly kind: 'unreachable-award' | 'required-counterparty'
  readonly slug: string
  readonly detail: string
}

/**
 * Relationship fields a collection REQUIRES — a row cannot exist without them.
 *
 * Read from the generated types' optionality (`customer: string | Customer` vs `customer?:`), which
 * is Payload's own answer for `required: true`. This is the second blocker, independent of the graph:
 * `projects.customer` is required, so a grant-funded project must invent a customer to be saved at
 * all — the funder is not a customer, and recording one as such falsifies the row.
 */
export function requiredRelationships(slug: string, cwd: string = process.cwd()): string[] {
  const file = join(cwd, 'src/payload-types.ts')
  const text = readFileSync(file, 'utf8')
  const src = ts.createSourceFile(file, text, ts.ScriptTarget.ESNext, true)
  const g = collectionGraph(cwd)
  const iface = g.ifaceOfSlug.get(slug)
  if (iface === undefined) return []
  const targets = new Set(g.edges.filter((e) => e.from === slug).map((e) => e.field))
  const out: string[] = []
  const visit = (n: ts.Node): void => {
    if (ts.isInterfaceDeclaration(n) && n.name.text === iface) {
      for (const m of n.members) {
        if (!ts.isPropertySignature(m) || m.questionToken) continue
        const field = m.name!.getText().replace(/['"]/g, '')
        if (targets.has(field)) out.push(field)
      }
    }
    ts.forEachChild(n, visit)
  }
  visit(src)
  return out
}

/**
 * Everything standing between this corpus and a funded project — computed, in one list.
 *
 * The list is short and that is the finding: this is not a domain gap. Both blockers sit in the
 * spine, so they stop a funded project in agriculture exactly as they stop one in software, and no
 * amount of domain modelling moves either.
 */
export function awardBlockers(cwd: string = process.cwd()): Blocker[] {
  const out: Blocker[] = []
  const g = collectionGraph(cwd)
  if (g.ifaceOfSlug.has(AWARD_SLUG) && g.edges.every((e) => e.to !== AWARD_SLUG)) {
    out.push({
      kind: 'unreachable-award',
      slug: AWARD_SLUG,
      detail: `no collection has a field reaching ${AWARD_SLUG}: it points out (${g.edges.filter((e) => e.from === AWARD_SLUG).length} edges) and nothing points in`,
    })
  }
  for (const field of requiredRelationships('projects', cwd)) {
    const to = g.edges.find((e) => e.from === 'projects' && e.field === field)?.to
    if (to === 'customers') {
      out.push({
        kind: 'required-counterparty',
        slug: 'projects',
        detail: `projects.${field} → ${to} is REQUIRED, so a project funded by a grant cannot be saved without inventing a customer`,
      })
    }
  }
  return out
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const spine = fundedSpine()
  const orphans = orphanCollections()
  const g = collectionGraph()
  const reaching = canReach(AWARD_SLUG)
  console.log(`fund — ${g.ifaceOfSlug.size} collections · ${g.edges.length} edges · ${orphans.length} orphan(s)`)
  console.log(`${reaching.size} collection(s) can reach ${AWARD_SLUG}`)
  console.log(`funded-project spine complete: ${spineComplete()}\n`)
  for (const s of spine) {
    console.log(`  ${(s.served ? '✓' : '✗')} ${s.stage.padEnd(8)} ${s.slug.padEnd(20)} ${s.reason}`)
  }
  console.log(`\nblockers (${awardBlockers().length}) — what stops a funded project, in EVERY domain:`)
  for (const b of awardBlockers()) console.log(`    ${b.kind}  ${b.detail}`)
  console.log(`\norphan collections (${orphans.length}) — writable, never joinable:`)
  for (const o of orphans) console.log(`    ${o}`)
}
