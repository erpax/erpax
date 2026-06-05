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
