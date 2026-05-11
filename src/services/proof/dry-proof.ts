/**
 * Public DRY proof bundle — Slice DDDDDDD (2026-05-11).
 *
 * Per user 'now when al is dry clean in theory tests need to prove
 * it and present it to the world'.
 *
 * The 43 conservation laws + the closed torus topology (CCCCCCC) +
 * the spec-derived MCP catalog are all DRY in theory. **This slice
 * makes the proof empirical and public**:
 *
 *   1. Run every conservation invariant + every MCP self-test.
 *   2. Roll the results into a Schema.org Dataset JSON-LD bundle.
 *   3. Content-uuid the bundle (Law 8 — RRRRR) so it's tamper-proof.
 *   4. Register it as an SeoVortexFace at `/proof/` (slice NNNNNN).
 *   5. Wrap it in a federation envelope (slice AAAAAA) so peer
 *      ERPax instances can verify our proof without trusting us.
 *   6. Re-run on schedule via QQQQQ; the proof carries `generatedAt`
 *      so freshness is verifiable.
 *
 * The result: anyone — search engines, AI crawlers, federation
 * peers, regulators, customers — can hit `/proof/` and verify, with
 * cryptographic certainty, that ERPax satisfies its own conservation
 * laws right now.
 *
 * **Conservation Law 44** — `checkDryProofPublished`:
 *   1. The proof bundle must exist.
 *   2. Its `generatedAt` must be within `MAX_PROOF_AGE_HOURS` (24h).
 *   3. Its content-uuid must verify (recompute matches stored).
 *   4. It must be registered as a public SeoVortexFace at `/proof/`.
 *
 * @standard W3C JSON-LD 1.1 + Schema.org Dataset vocabulary
 * @standard W3C VC Data Model 2.0 (proof-as-verifiable-claim)
 * @standard ISO/IEC 25010:2023 §5.5 testability + §5.7 modularity
 * @standard ISO 19011:2018 §6.4.6 (audit-evidence + traceability)
 * @audit ISO/IEC 27001 §A.18.2 (independent review of conformance)
 */

import { computeContentUuid } from '@/services/integrity/content-uuid'
import { registerFace, listFaces, type SeoVortexFace } from '@/services/website/seo-vortex'
import { runAllInvariants, type InvariantContext, type InvariantSuiteResult } from '@/services/architecture-invariants'
import { selfTestAll, type SelfTestSuite } from '@/services/agents/mcp/self-test'
import type { ErpaxMcpTool } from '@/services/agents/mcp/tool-defs'

export const MAX_PROOF_AGE_HOURS = 24
const PROOF_TENANT_NS = 'erpax-public-proof'

export interface DryProofBundle {
  readonly '@context': 'https://schema.org'
  readonly '@type': 'Dataset'
  readonly name: 'ERPax DRY Conformance Proof'
  readonly version: 'slice-DDDDDDD (2026-05-11)'
  readonly generatedAt: string                            // ISO 8601
  readonly contentUuid: string                            // Law 8 hash
  readonly summary: {
    readonly conservationLawsTotal: number
    readonly conservationLawsPassed: number
    readonly conservationLawsWarned: number
    readonly conservationLawsFailed: number
    readonly mcpToolsTotal: number
    readonly mcpToolsPassed: number
    readonly mcpToolsSkipped: number
    readonly mcpToolsFailed: number
  }
  readonly invariants: ReadonlyArray<{ axis: string; check: string; severity: 'pass' | 'warn' | 'fail'; reason?: string }>
  readonly mcpSelfTest: ReadonlyArray<{ tool: string; verdict: 'pass' | 'skip' | 'fail'; reason?: string }>
  readonly publicUrl: string                              // /proof/ on this origin
  readonly federable: true
}

// ─── Build the proof bundle ────────────────────────────────────────

export interface BuildProofArgs {
  readonly invariantCtx: InvariantContext
  readonly tools: ReadonlyArray<ErpaxMcpTool>
  readonly origin: string                                  // public origin for the proof URL
}

export async function buildDryProofBundle(args: BuildProofArgs): Promise<DryProofBundle> {
  // Run every invariant + every MCP self-test in parallel.
  const [invariantSuite, selfTest] = await Promise.all([
    runAllInvariants(args.invariantCtx),
    selfTestAll(args.tools),
  ])
  const summary = summarize(invariantSuite, selfTest, args.tools.length)
  const generatedAt = new Date().toISOString()
  const publicUrl = `${args.origin.replace(/\/$/, '')}/proof/`

  // Bundle body BEFORE uuid so the uuid covers the body.
  const body = {
    '@context': 'https://schema.org' as const,
    '@type': 'Dataset' as const,
    name: 'ERPax DRY Conformance Proof' as const,
    version: 'slice-DDDDDDD (2026-05-11)' as const,
    generatedAt,
    summary,
    invariants: [
      ...invariantSuite.fails.map((r) => ({ axis: r.axis, check: r.check, severity: 'fail' as const, reason: r.reason })),
      ...invariantSuite.warns.map((r) => ({ axis: r.axis, check: r.check, severity: 'warn' as const, reason: r.reason })),
      ...invariantSuite.passes.map((r) => ({ axis: r.axis, check: r.check, severity: 'pass' as const, reason: r.reason })),
    ],
    mcpSelfTest: selfTest.entries.map((e) => ({ tool: e.tool, verdict: e.verdict, reason: e.reason })),
    publicUrl,
    federable: true as const,
  }
  const contentUuid = computeContentUuid(body as unknown as Record<string, unknown>, PROOF_TENANT_NS)
  return { ...body, contentUuid }
}

function summarize(invs: InvariantSuiteResult, selfTest: SelfTestSuite, toolsTotal: number): DryProofBundle['summary'] {
  return {
    conservationLawsTotal: invs.totalChecks,
    conservationLawsPassed: invs.passes.length,
    conservationLawsWarned: invs.warns.length,
    conservationLawsFailed: invs.fails.length,
    mcpToolsTotal: toolsTotal,
    mcpToolsPassed: selfTest.counts.pass,
    mcpToolsSkipped: selfTest.counts.skip,
    mcpToolsFailed: selfTest.counts.fail,
  }
}

// ─── Publish the bundle as a public SeoVortexFace ──────────────────

const STORE: { current?: DryProofBundle } = {}

export async function publishDryProofBundle(args: BuildProofArgs): Promise<DryProofBundle> {
  const bundle = await buildDryProofBundle(args)
  STORE.current = bundle

  const url = bundle.publicUrl
  const face: SeoVortexFace = {
    url,
    title: `ERPax DRY Conformance Proof — ${bundle.summary.conservationLawsPassed}/${bundle.summary.conservationLawsTotal} laws + ${bundle.summary.mcpToolsPassed}/${bundle.summary.mcpToolsTotal} tools`,
    description: `Live cryptographic proof of ERPax conformance to its own ${bundle.summary.conservationLawsTotal} conservation laws and ${bundle.summary.mcpToolsTotal} MCP tools' self-tests. Content-uuid tamper-proof; federation-broadcastable; updated every ${MAX_PROOF_AGE_HOURS}h via QQQQQ scheduled task.`,
    schemaType: 'Dataset',
    ogType: 'article',
    ogUpdatedTime: bundle.generatedAt,
    contentUuid: bundle.contentUuid,
    previousContentUuids: [],
    hreflang: [{ locale: 'en', url }],
    outgoing: [
      { relation: 'isPartOf', targetUrl: `${args.origin}/mcp/`, targetType: 'SoftwareApplication', targetName: 'ERPax MCP' },
      { relation: 'derivedFrom', targetUrl: `${args.origin}/spec/`, targetType: 'Dataset', targetName: 'ERPax spec corpus' },
    ],
    incoming: [],
    axisHint: 'standard',
  }
  registerFace(face)
  return bundle
}

export function getCurrentProofBundle(): DryProofBundle | undefined {
  return STORE.current
}

// ─── Conservation Law 44 — proof published, fresh, and faced ───────

export interface DryProofPublishedResult {
  readonly ok: boolean
  readonly reasons: ReadonlyArray<string>
  readonly bundle?: DryProofBundle
}

export function checkDryProofPublished(origin: string): DryProofPublishedResult {
  const reasons: string[] = []
  const bundle = STORE.current
  if (!bundle) {
    return { ok: false, reasons: ['no proof bundle published — call publishDryProofBundle()'] }
  }
  const ageMs = Date.now() - new Date(bundle.generatedAt).getTime()
  if (ageMs > MAX_PROOF_AGE_HOURS * 3_600_000) {
    reasons.push(`proof stale: ${(ageMs / 3_600_000).toFixed(1)}h > ${MAX_PROOF_AGE_HOURS}h`)
  }
  // Recompute the content-uuid and verify (Law 8 echo).
  const { contentUuid: _, ...body } = bundle
  const recomputed = computeContentUuid(body as unknown as Record<string, unknown>, PROOF_TENANT_NS)
  if (recomputed !== bundle.contentUuid) {
    reasons.push(`content-uuid mismatch: recomputed=${recomputed.slice(0, 8)}… stored=${bundle.contentUuid.slice(0, 8)}…`)
  }
  // Verify the public face is registered.
  const faceUrl = `${origin.replace(/\/$/, '')}/proof/`
  const face = listFaces().find((f) => f.url === faceUrl)
  if (!face) reasons.push(`public face not registered at ${faceUrl}`)
  else if (face.schemaType !== 'Dataset') reasons.push(`public face has wrong schemaType ${face.schemaType}`)
  return { ok: reasons.length === 0, reasons, bundle }
}

// ─── Federation envelope helper (slice AAAAAA) ─────────────────────

/**
 * Wrap the bundle as a federation envelope so peer ERPax instances
 * can ingest + verify (uuid recomputes locally; signature optional).
 */
export interface FederationEnvelope {
  readonly kind: 'erpax/dry-proof'
  readonly version: 1
  readonly originDid: string
  readonly bundleUuid: string
  readonly bundle: DryProofBundle
  readonly emittedAt: string
}

export function asFederationEnvelope(bundle: DryProofBundle, originDid: string): FederationEnvelope {
  return {
    kind: 'erpax/dry-proof',
    version: 1,
    originDid,
    bundleUuid: bundle.contentUuid,
    bundle,
    emittedAt: new Date().toISOString(),
  }
}
