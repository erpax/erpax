/**
 * The AnyDesk proof — three PUBLIC vulnerability classes run through the matter
 * kernels (`proveScopeGap` · `proveAuthenticityGap`), every verdict folded into ONE
 * uuid-chained receipt ledger. The proof IS the artifact: the chain re-derives
 * end-to-end and pinpoints any doctored verdict at its seq. Defensive only — public
 * CVEs, no exploit code. Sources: NVD/Wiz CVE-2024-12754; the Feb-2024 AnyDesk
 * breach (TechCrunch/SecurityWeek/The Register); Resecurity on the ~18k credentials.
 */
import { describe, it, expect } from 'vitest'
import type { ToolGrant } from '@/sandbox'
import { issueReceipt, verifyReceiptChain, type Decision, type Receipt } from '@/receipt'
import { CONTENT_DIGEST_BITS } from '@/tamper/cost'
import { proveScopeGap, proveAuthenticityGap } from '@/security/remote/access'

// one tamper-evident ledger threading every verdict in this proof
const decisions: Decision[] = []
const receipts: Receipt[] = []
const summary: string[] = []
let head: Receipt | null = null
let clock = 0
const stamp = (): string => {
  clock += 1
  return `2026-06-05T00:00:${String(clock).padStart(2, '0')}.000Z`
}
const chain = (ev: { decision: Decision; receipt: Receipt }): void => {
  decisions.push(ev.decision)
  receipts.push(ev.receipt)
  head = ev.receipt
}

// Windows paths the CVE-2024-12754 junction redirects the SYSTEM image-copy onto.
const SAM = String.raw`C:\Windows\System32\config\SAM`
const WALLPAPER_DIR = String.raw`C:\Users\victim\AppData\AnyDesk\wallpaper`

describe('remote/access — AnyDesk public CVEs, proven via the security matter', () => {
  it('CVE-2024-12754 — SYSTEM file read: AnyDesk binds no resource (allowed); erpax allowlists, blocks the SAM read, receipts it', () => {
    const { proof, evaluation } = proveScopeGap({
      id: 'CVE-2024-12754',
      // AnyDesk's SYSTEM image-copy authorizes no resource — the junction-redirected read just passes.
      vendorGrant: { toolUuid: 'anydesk-bg-copy', capabilities: ['read'], allowedHosts: [], credentialHandles: [] },
      vendorAction: { capability: 'read' },
      // erpax: the same copy is least-privilege — read, and ONLY the wallpaper dir; the SAM target is named + checked.
      erpaxGrant: { toolUuid: 'sha256:image-copy', capabilities: ['read'], allowedHosts: [WALLPAPER_DIR], credentialHandles: [] },
      boundAction: { capability: 'read', host: SAM },
      actor: 'anydesk-service',
      head,
      timestampIso: stamp(),
    })
    expect(proof.vendorExposed).toBe(true) // ← the vulnerability
    expect(proof.erpaxClosed).toBe(true)
    expect(evaluation.reason).toContain(SAM)
    chain(evaluation)
    summary.push(`CVE-2024-12754  AnyDesk: SYSTEM reads SAM (allowed)   →  erpax: ${proof.detail.slice(0, 28)}… [${evaluation.receipt.leafUuid.slice(0, 12)}…]`)
  })

  it('Feb-2024 breach — stolen code-signing key: AnyDesk authenticity is free-rewrite; erpax has no secret + is anchored (tamper-evident)', () => {
    const { proof, vendor, erpax } = proveAuthenticityGap({
      id: 'anydesk-breach-2024',
      erpaxAnchor: 'blockchain-pow', // ∞ to forge — 51% of cumulative work
      commitmentBits: CONTENT_DIGEST_BITS, // commit the FULL 256-bit digest, not the 106-bit uuid
    })
    expect(proof.vendorExposed).toBe(true) // free-rewrite once the key leaks
    expect(vendor.crackCostLog2).toBe(0)
    expect(proof.erpaxClosed).toBe(true)
    expect(erpax.crackCostLog2).toBeGreaterThanOrEqual(106) // no key shortcut
    const d: Decision = {
      action: `binary-authenticity ${proof.detail} bruteYearsLog2=${erpax.bruteYearsLog2.toFixed(1)}`,
      actor: 'tamper-cost',
      outcome: 'allow',
      tier: 'proof',
      capabilities: [],
    }
    chain({ decision: d, receipt: issueReceipt({ decision: d, head, timestampIso: stamp() }) })
    summary.push(`Feb-2024 breach AnyDesk: forge binary for FREE (2^0)   →  erpax: ≥2^${erpax.crackCostLog2} ops (~2^${erpax.bruteYearsLog2.toFixed(0)} yr @ BTC), no key to steal`)
  })

  it('Unattended-access abuse — coarse session grant: AnyDesk exec + exfil unrecorded; erpax scopes per-action and receipts each block', () => {
    const sessionGrant: ToolGrant = {
      toolUuid: 'anydesk-session',
      capabilities: ['read', 'write', 'execute', 'api'], // every verb in one "Accept"
      allowedHosts: [],
      credentialHandles: ['session-token'],
    }
    const support: ToolGrant = {
      toolUuid: 'sha256:support-agent',
      capabilities: ['read', 'api'],
      allowedHosts: ['support.vendor.example'],
      credentialHandles: [],
    }
    // exec: AnyDesk allows it (all verbs granted); erpax blocks (capability not granted), receipts the block.
    const exec = proveScopeGap({
      id: 'session-exec',
      vendorGrant: sessionGrant,
      vendorAction: { capability: 'execute' },
      erpaxGrant: support,
      boundAction: { capability: 'execute' },
      actor: 'remote-support',
      head,
      timestampIso: stamp(),
    })
    expect(exec.proof.vendorExposed).toBe(true)
    expect(exec.proof.erpaxClosed).toBe(true)
    chain(exec.evaluation)
    // exfil: AnyDesk reaches any host (unbound); erpax blocks (host not allowlisted), receipts the block.
    const exfil = proveScopeGap({
      id: 'session-exfil',
      vendorGrant: sessionGrant,
      vendorAction: { capability: 'api' },
      erpaxGrant: support,
      boundAction: { capability: 'api', host: 'evil.exfil.example', credentialHandle: 'session-token' },
      actor: 'remote-support',
      head,
      timestampIso: stamp(),
    })
    expect(exfil.proof.vendorExposed).toBe(true)
    expect(exfil.proof.erpaxClosed).toBe(true)
    expect(exfil.evaluation.reason).toContain('evil.exfil.example')
    chain(exfil.evaluation)
    summary.push(`unattended-acc AnyDesk: exec + exfil to any host (allowed, unlogged)  →  erpax: both blocked, receipted`)
  })

  it('the proof IS a verified receipt chain — doctoring any verdict is caught at its seq (no external anchor needed)', async () => {
    const intact = await verifyReceiptChain(receipts, decisions)
    expect(intact.ok).toBe(true)

    const i = decisions.findIndex((d) => d.action.includes(SAM))
    expect(i).toBeGreaterThanOrEqual(0)
    const forged = decisions.map((d, k) => (k === i ? { ...d, outcome: 'allow' as const } : d))
    const broken = await verifyReceiptChain(receipts, forged)
    expect(broken.ok).toBe(false)
    expect(broken.brokenAtSeq).toBe(i)

    summary.push(`ledger          ${receipts.length} receipts · chain verifies (ok=${intact.ok}) · forged verdict caught at seq ${broken.brokenAtSeq}`)
    console.log(['', '── AnyDesk vulnerabilities, proven with erpax (security/remote/access) ──', ...summary, '────────────────────────────────────────────────────────────────────────', ''].join('\n'))
  })
})
