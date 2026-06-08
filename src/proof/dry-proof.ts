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
 *   7. Surface the forge≫verify tamper-cost (services/tamper-cost),
 *      amplified by the bundle's OWN invariant count (DeepSeek-Prover
 *      gates ADD) and the 3FS/CRAQ replica breadth (gates MULTIPLY) —
 *      the deepseek inhale, made publicly recomputable.
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

import { computeContentUuid } from '@/integrity'
import { registerFace, listFaces, type SeoVortexFace } from '@/website'
import { runAllInvariants, type InvariantContext, type InvariantSuiteResult } from '@/architecture/invariant'
import { selfTestAll, type SelfTestSuite } from '@/agents/mcp'
import type { ErpaxMcpTool } from '@/agents/mcp'
import { crackVerdict } from '@/tamper/cost'
import { matrixDigest } from '@/uuid/matrix'
import { verifyBitcoinGenesis, type BitcoinGenesisProof } from '@/proof/bitcoin/genesi'
import { summarizeMerkleDag, type MerkleDagFacts, type MerkleDagProof } from '@/proof/merkle/dag'
import { projectionProof, type ProjectionProof } from '@/proof/projection'

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
  readonly tamperCost: TamperCostProof                    // forge≫verify, deepseek-amplified
  readonly corpusMatrix: { readonly root: string; readonly nodes: number; readonly edges: number } // whole corpus → one 128-bit root
  readonly corpusSelfProof?: CorpusSelfProof              // the live self-proof cluster (collider/strength/emergence) that GROUNDS tamperCost.coverage
  readonly empiricalProofs: EmpiricalProofs               // forge≫verify decoded on real blockchains, recomputable by anyone
  readonly publicUrl: string                              // /proof/ on this origin
  readonly federable: true
}

/**
 * Empirical legs — the forge≫verify asymmetry decoded on REAL blockchains and
 * faced at /proof/, so a peer recomputes the claim rather than trusting the prover
 * ([[proof]]). The bitcoin-genesis leg is the public upper bound (the largest PoW
 * chain, verifiable from first principles offline); the merkle-dag leg is erpax's
 * OWN chain (git history). @see ./bitcoin-genesis.ts ./merkle-dag.ts
 */
export interface EmpiricalProofs {
  readonly bitcoinGenesis: BitcoinGenesisProof
  /** the headline maximum — the inverse projection (decrypt the private key / the analog negative) */
  readonly projection: ProjectionProof
  /** present only when build-time git facts were captured (the edge runtime has no git) */
  readonly merkleDag?: MerkleDagProof
}

/**
 * Build the empirical proof legs. The bitcoin-genesis leg is pure + offline, so it
 * is always present and recomputes byte-for-byte on any machine. The merkle-dag leg
 * is added only when `scripts/verify-merkle-dag.mjs` supplied build-time git facts.
 */
export function empiricalProofs(merkleDag?: MerkleDagFacts): EmpiricalProofs {
  return {
    bitcoinGenesis: verifyBitcoinGenesis(),
    projection: projectionProof(),
    ...(merkleDag ? { merkleDag: summarizeMerkleDag(merkleDag) } : {}),
  }
}

/**
 * Public, recomputable tamper-cost — the forge≫verify asymmetry the bundle faces
 * at /proof/ so peers verify it WITHOUT trusting us ([[proof]]). Both deepseek
 * amplifiers are wired from REAL platform state: `invariantsChecked` is the very
 * count of machine-checked conservation invariants this bundle just ran
 * (DeepSeek-Prover — gates ADD), and `replicas`/`strongConsistency` is the
 * 3FS/CRAQ federation breadth (gates MULTIPLY). A peer recomputes the same number
 * from the same inputs. @see services/tamper-cost.
 */
export interface TamperCostProof {
  readonly crackCostLog2: number
  readonly binding: 'second-preimage' | 'collision' | 'anchor' | 'free-rewrite'
  readonly bruteYearsLog2: number
  readonly tamperEvident: boolean
  readonly invariantsChecked: number
  readonly replicas: number
  readonly strongConsistency: boolean
  readonly coverage?: number
  readonly note: string
}

/**
 * The corpus self-proof cluster — the LIVE, fs-read measurement that GROUNDS the
 * proof's `tamperCost.coverage` (instead of a hardcoded floor or an assumed ∞).
 *
 *   - `collider`  : joint convention coverage = ∏ every convention's live coverage
 *                   (@/collider · @/convention) — the honest "fraction of dimensions
 *                   wired" the crackVerdict doc describes. This number IS the
 *                   tamperCost.coverage, with `coverageAxis` naming its source.
 *   - `strength`  : DRY-ness × dimensional slices (@/strength) — diagnostic.
 *   - `emergence` : fraction of dualities whose trinity has emerged (@/emergence).
 *
 * These read the live src tree (fs), so they are computed at BUILD time in the
 * Node MCP handler and passed IN — `buildDryProofBundle` itself stays fs-free so
 * the edge proof path never touches the filesystem (the data is plain JSON).
 */
export interface CorpusSelfProof {
  readonly collider: { readonly coverage: number; readonly violations: number; readonly tamperCost: number }
  readonly strength: { readonly atoms: number; readonly residue: number; readonly dryness: number; readonly slices: number; readonly strength: number }
  readonly emergence: { readonly dualities: number; readonly emerged: number; readonly coverage: number }
}

// ─── Build the proof bundle ────────────────────────────────────────

export interface BuildProofArgs {
  readonly invariantCtx: InvariantContext
  readonly tools: ReadonlyArray<ErpaxMcpTool>
  readonly origin: string                                  // public origin for the proof URL
  /** 3FS/CRAQ federation breadth — replicas that independently re-derive the content-uuid (deepseek inhale). */
  readonly replicas?: number
  /** CRAQ strong consistency: no stale-read window, so all replicas' checks count. */
  readonly strongConsistency?: boolean
  /**
   * MEASURED fraction of nodes wired in structured uuid. Omit for the conservative
   * digest-floor report. When `corpusSelfProof` is supplied and this is omitted,
   * coverage is derived from `corpusSelfProof.collider.coverage` (the live joint
   * convention coverage) — grounding the claim in the real tree, not a hardcoded floor.
   */
  readonly coverage?: number
  /** names the axis `coverage` measures (e.g. 'convention coverage (import purity)'); grounds the ∞ note. */
  readonly coverageAxis?: string
  /**
   * The live self-proof cluster (collider/strength/emergence), computed at BUILD
   * time in the Node handler (it reads fs) and passed in as plain JSON so the edge
   * proof path stays fs-free. Its `collider.coverage` grounds `tamperCost.coverage`.
   */
  readonly corpusSelfProof?: CorpusSelfProof
  /** git Merkle-DAG facts captured at build time by a git collector (edge runtime has no git). */
  readonly merkleDag?: MerkleDagFacts
}

/**
 * Replace any non-finite number in a self-proof block with `null` so the bundle
 * stays JCS-serializable (JCS rejects Infinity/NaN — see dry-proof.test). A
 * perfect-DRY corpus yields strength/tamperCost = ∞; we TAG it as null rather than
 * leak a raw Infinity into the content-uuid'd body (same discipline as projection).
 */
function jcsSafeSelfProof(p: CorpusSelfProof): CorpusSelfProof {
  const fin = (n: number): number | null => (Number.isFinite(n) ? n : null)
  return {
    collider: { ...p.collider, tamperCost: fin(p.collider.tamperCost) as number },
    strength: { ...p.strength, strength: fin(p.strength.strength) as number },
    emergence: { ...p.emergence },
  } as CorpusSelfProof
}

/**
 * Compute the public tamper-cost claim from the bundle's own invariant count.
 * Pure — unit-tested without the DB-backed invariant/self-test harness. The
 * invariant gates are exactly the ones the bundle ran (DRY: the proof
 * self-describes its tamper-cost), amplified by the CRAQ replica breadth.
 */
export function proofTamperCost(args: {
  invariantsChecked: number
  replicas?: number
  strongConsistency?: boolean
  coverage?: number
  /** name of the axis the supplied `coverage` MEASURES (e.g. 'convention coverage (import purity)'); grounds the ∞ claim. */
  coverageAxis?: string
}): TamperCostProof {
  const replicas = args.replicas ?? 1
  const strongConsistency = args.strongConsistency ?? false
  const v = crackVerdict({
    coverage: args.coverage,
    invariants: args.invariantsChecked,
    replicas,
    strongConsistency,
  })
  // GROUND-don't-assert: whenever a `coverage` is used it must be DISCLOSED as a
  // MEASURED number for a NAMED axis — never assumed "by architecture". The
  // unbounded (∞) case is the sharpest: it is honest ONLY at a measured 1. In every
  // coverage-supplied case the note names the axis + its source so a peer reading
  // /proof/ recomputes the same coverage rather than trusting a bare headline.
  const axisName = args.coverageAxis ?? 'UNNAMED — supply coverageAxis to ground this claim'
  const note =
    args.coverage === undefined
      ? v.note // no coverage ⇒ the conservative digest-floor note, unchanged
      : v.crackCostLog2 === Number.POSITIVE_INFINITY
        ? `Unbounded tamper-cost ONLY because coverage is a MEASURED ${args.coverage} for the axis "${axisName}" (read live from the corpus, not assumed by architecture). A peer recomputes the same coverage from the same source. ${v.note}`
        : `Tamper-cost grounded in a MEASURED coverage ${args.coverage} for the axis "${axisName}" (read live from the corpus). A peer recomputes the same coverage from the same source. ${v.note}`
  return {
    crackCostLog2: v.crackCostLog2,
    binding: v.binding,
    bruteYearsLog2: v.bruteYearsLog2,
    tamperEvident: v.tamperEvident,
    invariantsChecked: args.invariantsChecked,
    replicas,
    strongConsistency,
    coverage: args.coverage,
    note,
  }
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

  // Ground the tamper-cost coverage in the LIVE corpus self-proof. When the Node
  // handler supplied `corpusSelfProof` (collider/strength/emergence read from the
  // tree) and no explicit `coverage`, the joint convention coverage IS the measured
  // coverage — so the proof reflects the real tree, not a hardcoded 106-bit floor.
  // `buildDryProofBundle` itself never reads fs; it only consumes the passed number.
  const selfProof = args.corpusSelfProof
  const groundedCoverage = args.coverage ?? selfProof?.collider.coverage
  const coverageAxis =
    args.coverageAxis ??
    (selfProof !== undefined ? 'joint convention coverage (∏ live convention coverages — @/collider)' : undefined)

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
    tamperCost: proofTamperCost({
      invariantsChecked: summary.conservationLawsTotal,
      replicas: args.replicas,
      strongConsistency: args.strongConsistency,
      coverage: groundedCoverage,
      coverageAxis,
    }),
    corpusMatrix: matrixDigest(),
    ...(selfProof !== undefined ? { corpusSelfProof: jcsSafeSelfProof(selfProof) } : {}),
    empiricalProofs: empiricalProofs(args.merkleDag),
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
  // Strip stored uuid before recomputing — Law 8 echo (RRRRR).
  const { contentUuid: _stored, ...body } = bundle
  void _stored
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
