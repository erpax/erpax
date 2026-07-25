/**
 * remote-access trust audit — the matter twin (under security/remote/access).
 *
 * Proving a remote-access product's PUBLIC vulnerability CLASSES with erpax's own
 * trust primitives: each flaw is a MISSING erpax primitive, and the proof is a
 * receipted, content-addressed verdict — defensive modeling over public CVEs,
 * never an exploit. Remote access is an `access` problem, and access is a
 * tamper-cost layer, so the two comparative-proof kernels here just compose the
 * related atoms and report whether the vendor posture exposes the gap and the
 * erpax posture closes it.
 *
 *   - proveScopeGap  — @/sandbox `permits`/`evaluate`: a vendor permits an
 *     over-broad / unbound action that erpax binds to a resource and BLOCKS,
 *     emitting a receipt (CVE-2024-12754 SYSTEM file-read; coarse-session exec/exfil).
 *   - proveAuthenticityGap — @/tamper/cost `crackVerdict` + @/anchor: a vendor
 *     roots trust in a STEALABLE secret (a code-signing key ⇒ free-rewrite once
 *     leaked); erpax is content-addressed (no key) + externally anchored.
 *
 * @standard NIST SP 800-162 ABAC · NIST SP 800-107r1 §5.1 · CWE-59
 * @see @/sandbox · @/tamper/cost · @/anchor · @/receipt · ./SKILL.md
 */
import { evaluate, permits, type SandboxEvaluation, type ToolAction, type ToolGrant } from '@/sandbox'
import { crackVerdict, type CrackVerdict } from '@/tamper/cost'
import { ANCHOR_STRENGTH_BITS, type AnchorKind } from '@/anchor'
import type { Receipt } from '@/receipt'

/** A proven trust-model gap: the vendor posture exposes it, the erpax posture closes it. */
export interface GapProof {
  readonly id: string
  /** which erpax primitive exposes the gap */
  readonly primitive: 'sandbox' | 'tamper-cost'
  /** the vendor's posture exhibits the flaw (an over-broad allow / a free forge) */
  readonly vendorExposed: boolean
  /** the erpax posture withstands it (a policy block / an anchored, no-secret integrity floor) */
  readonly erpaxClosed: boolean
  readonly detail: string
}

/**
 * Prove a capability/resource-SCOPE gap. The vendor grant permits `vendorAction`
 * (typically unbound — no resource named, ambient authority); erpax expresses the
 * SAME operation as `boundAction` (the real resource named) under a least-privilege
 * grant, so the policy checks it and BLOCKS — and `evaluate` receipts the decision,
 * chained onto `head`. Returns the proof AND the sandbox evaluation (whose receipt
 * the caller threads into the audit chain).
 */
export function proveScopeGap(args: {
  id: string
  vendorGrant: ToolGrant
  vendorAction: ToolAction
  erpaxGrant: ToolGrant
  boundAction: ToolAction
  actor: string
  head: Receipt | null
  timestampIso: string
}): { proof: GapProof; evaluation: SandboxEvaluation } {
  const vendorExposed = permits(args.vendorGrant, args.vendorAction).allowed
  const evaluation = evaluate({
    grant: args.erpaxGrant,
    action: args.boundAction,
    actor: args.actor,
    head: args.head,
    timestampIso: args.timestampIso,
  })
  const erpaxClosed = !evaluation.allowed
  return {
    proof: {
      id: args.id,
      primitive: 'sandbox',
      vendorExposed,
      erpaxClosed,
      detail: erpaxClosed ? `blocked: ${evaluation.reason ?? 'policy'}` : 'NOT closed',
    },
    evaluation,
  }
}

/**
 * Prove an authenticity-ROOT gap. The vendor roots binary authenticity in a SECRET
 * (a code-signing key): once stolen it forges "authentic" artifacts for free — an
 * un-anchored deterministic store (`crackVerdict({ anchored: false })` ⇒ free-rewrite,
 * not tamper-evident). erpax stores no secret (a binary IS its content-uuid) and
 * anchors the chain root externally, so forgery must beat the digest AND the anchor.
 */
export function proveAuthenticityGap(args: {
  id: string
  erpaxAnchor: AnchorKind
  /** width the anchor / Merkle leaf commits — the full content digest closes the chosen-collision floor */
  commitmentBits?: number
}): { proof: GapProof; vendor: CrackVerdict; erpax: CrackVerdict } {
  const vendor = crackVerdict({ anchored: false })
  const erpax = crackVerdict({
    anchored: true,
    anchorStrengthBits: ANCHOR_STRENGTH_BITS[args.erpaxAnchor],
    ...(args.commitmentBits !== undefined ? { anchorCommitmentBits: args.commitmentBits } : {}),
  })
  const vendorExposed = !vendor.tamperEvident // free-rewrite ⇒ exposed
  const erpaxClosed = erpax.tamperEvident && erpax.crackCostLog2 >= vendor.crackCostLog2
  return {
    proof: {
      id: args.id,
      primitive: 'tamper-cost',
      vendorExposed,
      erpaxClosed,
      detail: `vendor=${vendor.binding}(2^${vendor.crackCostLog2}) erpax=2^${erpax.crackCostLog2}`,
    },
    vendor,
    erpax,
  }
}

// ─── EU cyber-standards conformance ──────────────────────────────────────────
//
// The same comparative-proof idea, turned on the LATEST EU cybersecurity law: for each
// technical control an EU regulation mandates, does an erpax PRIMITIVE satisfy it? The
// control→primitive map is DECLARED (a human MEANING judgement, written in the open so it
// can be argued with — the same discipline rules/audience uses for its role→standard map),
// never inferred. The verdict is COMPUTED from the primitive (crackVerdict / permits), not
// asserted, so it is refutable.
//
// Honest boundary — this proves erpax's primitives answer the TECHNICAL controls (integrity,
// authenticity, access confinement, tamper-evident audit trail); it does NOT and cannot prove
// the ORGANISATIONAL controls (a 24-hour incident-reporting SLA, governance, ENISA/CSIRT
// registration, supply-chain governance) — those need process and legal, never a code gate,
// and are reported as out-of-scope, never as satisfied. The regulation citations live as DATA in
// each control's `instrument` field (EU 2022/2555 NIS2 · EU 2022/2554 DORA · EU 2024/2847 CRA ·
// EU 2024/1183 eIDAS2) — registering them as catalogue banners is a separate standards wave.

/** Which erpax primitive answers a control — or `organisational` when no code gate can. */
export type EuControlPrimitive = 'tamper-cost' | 'sandbox' | 'organisational'

/** One mandated technical control of an EU cyber regulation, mapped (declared) to the primitive that answers it. */
export interface EuCyberControl {
  /** short regulation id, e.g. `NIS2` · `DORA` · `CRA` · `eIDAS2` */
  readonly reg: string
  /** the EU legal instrument (banner-grade citation) */
  readonly instrument: string
  /** the article / annex the control lives in */
  readonly clause: string
  /** the control, in one line */
  readonly control: string
  /** the erpax primitive declared to answer it */
  readonly primitive: EuControlPrimitive
}

/**
 * The declared map — LATEST EU cyber law (2022–2024), each technical control paired with the
 * erpax primitive that answers it. Argue with the mapping here, in the open; it is never inferred.
 */
export const EU_CYBER_CONTROLS: readonly EuCyberControl[] = [
  { reg: 'NIS2', instrument: 'EU 2022/2555', clause: 'Art.21(2)(h)', control: 'cryptography & integrity of stored/processed data', primitive: 'tamper-cost' },
  { reg: 'NIS2', instrument: 'EU 2022/2555', clause: 'Art.21(2)(i)', control: 'access control & asset management (least privilege)', primitive: 'sandbox' },
  { reg: 'NIS2', instrument: 'EU 2022/2555', clause: 'Art.23', control: '24h incident early-warning to the CSIRT', primitive: 'organisational' },
  { reg: 'DORA', instrument: 'EU 2022/2554', clause: 'Art.9(2)', control: 'ICT data integrity & authenticity protection', primitive: 'tamper-cost' },
  { reg: 'DORA', instrument: 'EU 2022/2554', clause: 'Art.9(3)(c)', control: 'least-privilege access to ICT systems', primitive: 'sandbox' },
  { reg: 'DORA', instrument: 'EU 2022/2554', clause: 'Art.17-19', control: 'ICT incident classification & reporting timelines', primitive: 'organisational' },
  { reg: 'CRA', instrument: 'EU 2024/2847', clause: 'Annex I §1(3)(c)', control: 'protect integrity of data/commands/config against manipulation', primitive: 'tamper-cost' },
  { reg: 'CRA', instrument: 'EU 2024/2847', clause: 'Annex I §1(3)(d)', control: 'process only data necessary (data minimisation, bound scope)', primitive: 'sandbox' },
  { reg: 'CRA', instrument: 'EU 2024/2847', clause: 'Annex I §2(1)', control: 'no known exploitable vulnerabilities at ship', primitive: 'organisational' },
  { reg: 'eIDAS2', instrument: 'EU 2024/1183', clause: 'Art.3(35)', control: 'integrity & authenticity of electronic records/seals', primitive: 'tamper-cost' },
]

/** A computed conformance verdict for one EU control. */
export interface EuConformanceRow {
  readonly reg: string
  readonly instrument: string
  readonly clause: string
  readonly control: string
  readonly primitive: EuControlPrimitive
  /** true when the erpax primitive computationally satisfies the control; false for organisational controls (out of a gate's reach). */
  readonly satisfied: boolean
  /** true when no code gate can decide this control (organisational) — reported, never counted as satisfied. */
  readonly inScope: boolean
  readonly detail: string
}

/**
 * Audit erpax against the declared EU cyber controls. Integrity/authenticity controls are decided by
 * `crackVerdict` (content-addressed + externally anchored, committing the full content digest ⇒
 * tamper-evident at the 2^128 floor); access controls by `permits` (an over-broad action is BLOCKED
 * under a resource-bound least-privilege grant); organisational controls are reported in-scope=false —
 * a code gate cannot prove a reporting SLA or a registration. Deterministic, so the report is refutable.
 *
 * @param anchor the external anchor erpax roots its chain in (default the strongest declared kind)
 */
export function auditEuCyberStandards(anchor: AnchorKind = 'eidas-qualified'): {
  readonly rows: readonly EuConformanceRow[]
  readonly technical: number
  readonly satisfied: number
  readonly organisational: number
} {
  const rows = EU_CYBER_CONTROLS.map<EuConformanceRow>((c) => {
    if (c.primitive === 'tamper-cost') {
      const v = crackVerdict({ anchored: true, anchorStrengthBits: ANCHOR_STRENGTH_BITS[anchor] })
      // Satisfied at NIST SP 800-57's acceptable floor (112-bit); the content-digest floor is 2^122,
      // so an anchored content-addressed store clears it. Honest: tamper-EVIDENT, not confidentiality.
      const satisfied = v.tamperEvident && v.crackCostLog2 >= ANCHOR_STRENGTH_BITS['rfc3161-rsa2048']
      return { ...c, satisfied, inScope: true, detail: `content-addressed + ${anchor}-anchored ⇒ tamper-evident 2^${v.crackCostLog2}` }
    }
    if (c.primitive === 'sandbox') {
      // an over-broad action (reaching an un-allowlisted host) is REFUSED under a least-privilege grant
      const grant: ToolGrant = { toolUuid: 'audit', capabilities: ['read'], allowedHosts: ['self.tenant'], credentialHandles: [] }
      const overBroad: ToolAction = { capability: 'read', host: 'other.tenant' }
      const decision = permits(grant, overBroad)
      return { ...c, satisfied: !decision.allowed, inScope: true, detail: !decision.allowed ? `least-privilege grant BLOCKS: ${decision.reason}` : 'NOT blocked' }
    }
    return { ...c, satisfied: false, inScope: false, detail: 'organisational — needs process/legal (reporting SLA, registration), not a code gate' }
  })
  const inScope = rows.filter((r) => r.inScope)
  return {
    rows,
    technical: inScope.length,
    satisfied: inScope.filter((r) => r.satisfied).length,
    organisational: rows.length - inScope.length,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = auditEuCyberStandards()
  console.log(`EU cyber-standards audit — ${r.satisfied}/${r.technical} technical controls satisfied · ${r.organisational} organisational (out of a gate's reach)`)
  for (const row of r.rows) {
    const mark = !row.inScope ? '·' : row.satisfied ? '✓' : '✗'
    console.log(`  ${mark} ${row.reg} ${row.clause} — ${row.control}\n      ${row.detail}`)
  }
}
