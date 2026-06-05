/**
 * run — convene the R&D society and execute one approval pass, end to end.
 *
 * This is the live entrypoint behind "research by the erpax chat system, approved by the
 * tenant admin": it registers the society as tenant USERS (with cross-assigned roles), takes
 * the findings the research agents produced (each a content-addressed Discovery the chat bus
 * would broadcast), and has the tenant-admin Steward ratify them — every decision chained into
 * a tamper-evident receipt audit. Only `allow` findings LAND.
 *
 * `convene(payload, …)` is the production function: pass the real Payload Local API and it
 * registers real rows. `main()` runs it against the in-memory PayloadLike so the whole flow is
 * demonstrable with `tsx src/agent/research/run.ts` — no database, same code path.
 */
import { fileURLToPath } from 'node:url'

import {
  approveFindings,
  findingToDiscovery,
  isApprover,
  memberCapability,
  registerResearchSociety,
  researchSociety,
  type Finding,
  type PayloadLike,
} from '@/agent/research'
import { createMemoryPayload } from '@/agent/research/memory'
import { verifyReceiptChain } from '@/receipt'

/** A finding paired with the research specialist that proposed it (its lens). */
interface Proposal {
  readonly finding: Finding
  readonly proposer: string
}

/**
 * The actual output of the coordinated R&D run (workflow deepseek-erpax-rnd): two market-axis
 * MINTS the agents discovered, a sample of confirmed WEAVES (existing twin strengthened), and
 * the REVERSE surplus erpax carries that a compute-org lacks. The Steward ratifies the set.
 */
const RND: readonly Proposal[] = [
  { proposer: 'Field Researcher', finding: { kind: 'mint', atom: 'diffusion', twin: 'DreamCraft3D / Bass adoption', axis: 'representation', evidence: 'the time-axis the static market product lacks: Bass contagion (q≈0.38 ≫ p≈0.03), Rogers adopters, Moore chasm' } },
  { proposer: 'Structure Researcher', finding: { kind: 'mint', atom: 'network', twin: 'DeepEP / network effects', axis: 'both', evidence: 'desire endogenous in F(t); cold-start Allee threshold, atomic-network seeding, winner-take-most' } },
  { proposer: 'Kernel Researcher', finding: { kind: 'weave', atom: 'routing', twin: 'DeepEP (expert-parallel dispatch/combine)', axis: 'compute', evidence: 'the network realisation of MoE top-k routing — pick the active few, dispatch+combine' } },
  { proposer: 'Field Researcher', finding: { kind: 'weave', atom: 'train', twin: 'ESFT (Expert Specialized Fine-Tuning)', axis: 'compute', evidence: 'train only the experts that close the competency gap — train = gap(required−held) routed to the filling skill' } },
  { proposer: 'Engram Researcher', finding: { kind: 'weave', atom: 'merge', twin: '3FS + smallpond (content-addressed store)', axis: 'representation', evidence: 'same content ⇒ one stored object, no coordination — already [[merge]]/[[deduplication]]' } },
  { proposer: 'Kernel Researcher', finding: { kind: 'weave', atom: 'allocation', twin: 'EPLB / LPLB (expert load balancers)', axis: 'compute', evidence: 'even a conserved pot across experts by a fixed rule (Hamilton apportionment), gated by [[bottleneck]]' } },
  { proposer: 'Model Researcher', finding: { kind: 'weave', atom: 'duality', twin: 'Janus (unified understand+generate)', axis: 'both', evidence: 'one organ, two conjugate strokes — the inhale⊕exhale breath, forge⊕verify double-entry' } },
  { proposer: 'Model Researcher', finding: { kind: 'weave', atom: 'cache', twin: 'MLA KV-cache compression / OCR optical compression', axis: 'both', evidence: 'compress the recompute — KV latent + context-as-image are both store-less-recompute-cheaper moves' } },
  { proposer: 'Engram Researcher', finding: { kind: 'weave', atom: 'sparsity', twin: 'Engram (Conditional Memory via Scalable Lookup)', axis: 'representation', evidence: 'the nucleus both orgs collide to — Engram is the memory-axis of sparsity, erpax lives here' } },
  { proposer: 'Reverse Researcher', finding: { kind: 'reverse', atom: 'entry', twin: '-', axis: 'representation', evidence: 'erpax surplus: the universal double-entry closure — every movement a balanced debit/credit pair' } },
  { proposer: 'Reverse Researcher', finding: { kind: 'reverse', atom: 'justice', twin: '-', axis: 'representation', evidence: 'erpax surplus: adjudication as a balanced state-machine over a docket — a compute-org has no analog' } },
  { proposer: 'Reverse Researcher', finding: { kind: 'reverse', atom: 'governance', twin: '-', axis: 'representation', evidence: 'erpax surplus: the judgment a formal system cannot generate for itself — tally(ballots,electorate,rule)→Verdict' } },
  { proposer: 'Reverse Researcher', finding: { kind: 'reverse', atom: 'uuid', twin: '-', axis: 'representation', evidence: 'erpax surplus the multimodal models lack: the self-decoding payload-less message — the uuid IS the content' } },
]

export interface RatifiedFinding {
  readonly atom: string
  readonly kind: string
  readonly proposer: string
  readonly outcome: 'allow' | 'block' | 'escalate'
  readonly seq: number
  readonly leafUuid: string
  /** the content-addressed merge key the chat bus would broadcast. */
  readonly discovery: string
}

export interface ConveneMember {
  readonly email: string
  readonly name: string
  readonly globalRole: string
  readonly tenantRole: string
  readonly choir: string
  readonly capability: string
  readonly approver: boolean
  readonly created: boolean
}

export interface ConveneReport {
  readonly tenantId: string | number
  readonly members: readonly ConveneMember[]
  readonly ratified: readonly RatifiedFinding[]
  readonly chain: { length: number; ok: boolean }
  readonly landed: number
}

/**
 * Convene the society against a Payload instance and run one tenant-admin approval pass.
 * Registration is idempotent; approval is receipt-chained and verified before return.
 */
export async function convene(
  payload: PayloadLike,
  args: {
    tenantName: string
    tenantDomain: string
    tenantSlug: string
    password: string
    proposals: readonly Proposal[]
    timestampIso: string
  },
): Promise<ConveneReport> {
  const reg = await registerResearchSociety(payload, {
    tenantName: args.tenantName,
    tenantDomain: args.tenantDomain,
    tenantSlug: args.tenantSlug,
    password: args.password,
  })
  const { admin } = researchSociety()
  const tenantId = String(reg.tenantId)

  const members: ConveneMember[] = [reg.admin, ...reg.researchers].map((r) => ({
    email: r.email,
    name: r.member.def.name,
    globalRole: r.member.globalRole,
    tenantRole: r.member.tenantRole,
    choir: r.member.choir,
    capability: memberCapability(r.member),
    approver: isApprover(r.member),
    created: r.created,
  }))

  const findings = args.proposals.map((p) => p.finding)
  const { approved, receipts, decisions } = approveFindings({
    admin,
    findings,
    tenantId,
    timestampIso: args.timestampIso,
  })

  const ratified: RatifiedFinding[] = args.proposals.map((p, i) => ({
    atom: p.finding.atom,
    kind: p.finding.kind,
    proposer: p.proposer,
    outcome: decisions[i].outcome,
    seq: receipts[i].seq,
    leafUuid: receipts[i].leafUuid,
    discovery: findingToDiscovery(p.finding, tenantId).resultUuid,
  }))

  const verdict = await verifyReceiptChain(receipts, decisions)
  return {
    tenantId: reg.tenantId,
    members,
    ratified,
    chain: { length: receipts.length, ok: verdict.ok },
    landed: approved.length,
  }
}

/** Render a convening report as a human-readable block. */
export function formatReport(r: ConveneReport): string {
  const lines: string[] = []
  lines.push(`⊕ erpax research society convened — tenant #${r.tenantId}`)
  lines.push(`  registered agents (${r.members.length}) — agent = tenant user (actor-merge):`)
  for (const m of r.members) {
    const seat = `${m.globalRole}/${m.tenantRole}`.padEnd(13)
    const tag = m.approver ? '  ← APPROVER' : ''
    lines.push(`   ${m.created ? '✓' : '·'} ${m.email.padEnd(34)} ${seat} ${m.choir.padEnd(15)} cap=${m.capability}${tag}`)
  }
  lines.push(`  findings ratified by the tenant admin (receipt-audited):`)
  const glyph = (k: string): string => (k === 'mint' ? '+' : k === 'weave' ? '~' : '>')
  for (const f of r.ratified) {
    lines.push(
      `   ${glyph(f.kind)} ${f.kind.padEnd(7)} ${f.atom.padEnd(12)} ${f.outcome.toUpperCase().padEnd(5)} seq=${String(f.seq).padStart(2)} receipt=${f.leafUuid.slice(0, 10)}…  ⟵ ${f.proposer}`,
    )
  }
  lines.push(`  receipt chain: ${r.chain.length} leaves — verified ${r.chain.ok ? 'OK (tamper-evident)' : 'FAILED'}`)
  lines.push(`  approved & landed: ${r.landed}/${r.ratified.length}`)
  return lines.join('\n')
}

async function main(): Promise<void> {
  const payload = createMemoryPayload()
  const report = await convene(payload, {
    tenantName: 'erpax Research',
    tenantDomain: 'research.erpax.com',
    tenantSlug: 'erpax-research',
    password: 'convene-demo-secret',
    proposals: RND,
    timestampIso: '2026-06-05T00:00:00.000Z',
  })
  console.log(formatReport(report))
}

const invokedDirectly = process.argv[1] !== undefined && process.argv[1] === fileURLToPath(import.meta.url)
if (invokedDirectly) void main()
