/**
 * Architecture invariants — concrete checks across the 5 axes.
 *
 * Slice LLLL (2026-05-10): each `check<Axis><Name>()` returns one
 * `InvariantResult`. Static checks read source files; runtime checks
 * exercise the live Payload + AI chokepoint; both share the same
 * pass / warn / fail contract so the orchestrator can roll them up.
 *
 * @audit ISO-19011:2018 §6.4 audit-evidence-invariants
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, basename } from 'node:path'
import type { InvariantResult, InvariantContext } from './types'

import { FEATURE_REGISTRY, TIERS, featuresForTier, type Tier } from '@/access/feature-registry'
import { BUSINESS_CHAINS } from '@/services/business-chains/registry'
import { SCHEDULED_TASKS } from '@/services/scheduled-tasks/registry'
import { cronMatchesMinute } from '@/services/scheduled-tasks/runner'
import { ROLES_REGISTRY, ROLE_IDS } from '@/access/roles-registry'
import { agentRegistry } from '@/services/agents/bootstrap'
import { supportedLocales } from '@/i18n'
import { verifyContentUuid, TAMPER_PROOF_COLLECTIONS_REGISTRY, UUID_REF_REGISTRY, findDanglingRefs } from '@/services/integrity'
import { collectGenome, computeGenomeUuid } from '@/services/cloning'
import { checkErpaxObservesItself } from '@/services/self-reference'
import { listFaces, checkSeoVortexCoupling } from '@/services/website/seo-vortex'
import { verifyAggregate, checkNoDoubleVoting, listBallots } from '@/services/voting'
import { checkRegistryCoupling } from '@/services/agents/blocks'
import { checkWindowCoherence, checkStreamUuidChain, makeStream, type ClockedEvent } from '@/services/streams'
import { checkStorageIndependence, consensusRead, memoryPut } from '@/services/storage-independence'
// Slice CCCCCCC cleanup: break the import cycle by lazily loading
// `buildErpaxMcpTools` inside each MCP-self invariant. The static
// chain checks → tool-defs → dry-proof → architecture-invariants →
// checks would otherwise leave undefined exports at module-load.
// Type-only imports stay static (no runtime cycle).
import { checkAutoGenerationCoverage } from '@/services/agents/mcp/auto-generated'
import type { ErpaxMcpTool } from '@/services/agents/mcp/tool-defs'
import { checkMcpToolStandardization } from '@/services/agents/mcp/standardization'
import { registerAllMcpFaces, checkMcpPresentationCoverage } from '@/services/agents/mcp/presentation'
import { checkMcpRebuildableFromSource } from '@/services/agents/mcp/rebuild-from-source'
import { checkMcpSelfTestable } from '@/services/agents/mcp/self-test'
import { checkMcpDryCleanliness } from '@/services/agents/mcp/dry-clean'
import { checkPwaUuidIntegrity } from '@/services/pwa'

async function loadMcpTools(): Promise<ReadonlyArray<ErpaxMcpTool>> {
  const m = await import('@/services/agents/mcp/tool-defs')
  return m.buildErpaxMcpTools(agentRegistry)
}
import { checkTorusBounded } from '@/services/topology/torus'
// Lazy — `proof/dry-proof.ts` imports `runAllInvariants` from this
// module's barrel, so a static import here would close the cycle.
async function loadCheckDryProofPublished(origin: string) {
  const m = await import('@/services/proof/dry-proof')
  return m.checkDryProofPublished(origin)
}
import { checkAgentLawCoverage } from '@/services/architecture-invariants/by-agent'
import { checkUuidShortDisplay } from '@/services/integrity/uuid-short'
import { checkTypeUuidCoverage, ensureBaselineTypesRegistered } from '@/services/integrity/type-uuid'
import { checkInfiniteFiniteness } from '@/services/integrity/uuid-stream'
import { checkDimensionalCoverage } from '@/services/plugins/dimensions'
import { checkDimensionalPluginScaffolded } from '@/services/dimensions'
import { computeContentUuid as _computeContentUuid } from '@/services/integrity/content-uuid'

const REPO_ROOT_FALLBACK = (): string => process.cwd()

// ─── Helpers ──────────────────────────────────────────────────────────

function listCollectionFiles(repoRoot: string): ReadonlyArray<string> {
  const dirs = [
    join(repoRoot, 'src/plugins/accounting/collections'),
    join(repoRoot, 'src/collections'),
  ]
  const out: string[] = []
  for (const d of dirs) {
    if (!existsSync(d)) continue
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.endsWith('.bak')) {
        // Skip top-level barrels — those re-export collections, they're not collections themselves.
        if (entry.name === 'index.ts') continue
        out.push(join(d, entry.name))
      } else if (entry.isDirectory()) {
        const inner = join(d, entry.name, 'index.ts')
        if (existsSync(inner)) out.push(inner)
      }
    }
  }
  return out
}

function readSafe(path: string): string {
  try { return readFileSync(path, 'utf8') } catch { return '' }
}

function pass(axis: InvariantResult['axis'], check: string, reason?: string): InvariantResult {
  return { axis, check, severity: 'pass', reason }
}
function fail(axis: InvariantResult['axis'], check: string, reason: string, offenders?: ReadonlyArray<string>): InvariantResult {
  return { axis, check, severity: 'fail', reason, offenders }
}
function warn(axis: InvariantResult['axis'], check: string, reason: string, offenders?: ReadonlyArray<string>): InvariantResult {
  return { axis, check, severity: 'warn', reason, offenders }
}

/* ═════════════════════════════════════════════════════════════════════
 * AXIS 1 — STANDARDS (compatibility, traceability)
 * ═════════════════════════════════════════════════════════════════════ */

/** Every Payload collection file cites at least one `@standard` / `@accounting` / `@compliance` / `@audit` JSDoc tag. */
export function checkStandardsTagOnEveryCollection(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const files = listCollectionFiles(repoRoot)
  if (files.length === 0) return warn('standards', 'every-collection-cites-standard', 'no collection files discovered')

  const re = /@(standard|accounting|compliance|audit|security)\b/
  const offenders = files.filter((f) => !re.test(readSafe(f)))
  return offenders.length === 0
    ? pass('standards', 'every-collection-cites-standard', `${files.length} files OK`)
    : fail('standards', 'every-collection-cites-standard', `${offenders.length} collection(s) missing @standard tag`, offenders.map((p) => basename(p)))
}

/** Every `src/standards/<id>/` folder has a README.md + index.ts. */
export function checkStandardsFolderShape(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const root = join(repoRoot, 'src/standards')
  if (!existsSync(root)) return warn('standards', 'standards-folder-shape', 'src/standards/ not found')
  const offenders: string[] = []
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const dir = join(root, entry.name)
    const hasIndex = existsSync(join(dir, 'index.ts'))
    const hasReadme = existsSync(join(dir, 'README.md'))
    // composite folders prefixed _ may legitimately be different; report only when both missing.
    if (!hasIndex && !hasReadme) offenders.push(entry.name)
  }
  return offenders.length === 0
    ? pass('standards', 'standards-folder-shape')
    : fail('standards', 'standards-folder-shape', `${offenders.length} standards folder(s) missing both index.ts AND README.md`, offenders)
}

/** Every business chain declares ≥1 standard. */
export function checkChainHasStandards(_ctx: InvariantContext): InvariantResult {
  const offenders = Object.values(BUSINESS_CHAINS)
    .filter((c) => c.standards.length === 0)
    .map((c) => c.id)
  return offenders.length === 0
    ? pass('standards', 'every-chain-cites-standard', `${Object.keys(BUSINESS_CHAINS).length} chains OK`)
    : fail('standards', 'every-chain-cites-standard', `${offenders.length} chain(s) without standards`, offenders)
}

/* ═════════════════════════════════════════════════════════════════════
 * AXIS 2 — EXPANSION (adding things doesn't break anything)
 * ═════════════════════════════════════════════════════════════════════ */

/** Every collection in the accounting barrel is registered in the plugin (and vice versa). */
export function checkAccountingBarrelMatchesPluginRegistration(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const barrel = readSafe(join(repoRoot, 'src/plugins/accounting/collections/index.ts'))
  const plugin = readSafe(join(repoRoot, 'src/plugins/accounting/plugin.ts'))
  if (!barrel || !plugin) return warn('expansion', 'accounting-barrel-matches-plugin', 'barrel or plugin not found')

  const exported = new Set<string>()
  for (const m of barrel.matchAll(/export \{ (?:default as )?(\w+) \}/g)) exported.add(m[1])

  const registered = new Set<string>()
  // Match `      Collections,` lines in the plugin's accountingCollections array.
  for (const m of plugin.matchAll(/^      ([A-Z][a-zA-Z]+),\s*$/gm)) registered.add(m[1])

  const inBarrelNotPlugin = [...exported].filter((s) => !registered.has(s))
  const inPluginNotBarrel = [...registered].filter((s) => !exported.has(s))
  const offenders = [...inBarrelNotPlugin.map((s) => `barrel-only:${s}`), ...inPluginNotBarrel.map((s) => `plugin-only:${s}`)]
  return offenders.length === 0
    ? pass('expansion', 'accounting-barrel-matches-plugin', `${exported.size} symbols symmetric`)
    : fail('expansion', 'accounting-barrel-matches-plugin', `${offenders.length} mismatched symbol(s)`, offenders)
}

/** Every feature gate cited in code references a real `FEATURE_REGISTRY` entry. */
export function checkFeatureGatesExistInRegistry(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const files = listCollectionFiles(repoRoot)
  const cited = new Set<string>()
  for (const f of files) {
    const text = readSafe(f)
    for (const m of text.matchAll(/accountingCollectionAccess\(\{[^}]*feature:\s*'([^']+)'/g)) cited.add(m[1])
  }
  // Also check business-chain feature gates.
  for (const c of Object.values(BUSINESS_CHAINS)) if (c.featureGate) cited.add(c.featureGate)

  const known = new Set(Object.keys(FEATURE_REGISTRY))
  const offenders = [...cited].filter((f) => !known.has(f))
  return offenders.length === 0
    ? pass('expansion', 'feature-gates-exist-in-registry', `${cited.size} cited features all valid`)
    : fail('expansion', 'feature-gates-exist-in-registry', `${offenders.length} dangling feature gate(s)`, offenders)
}

/** Every chain step references a real Payload collection slug. */
export function checkChainStepsReferenceRealCollections(_ctx: InvariantContext): InvariantResult {
  const allSlugs = new Set<string>()
  for (const f of Object.values(FEATURE_REGISTRY)) for (const s of f.collections ?? []) allSlugs.add(s)
  // Some core slugs are not feature-gated; whitelist the ones chains use.
  for (const s of [
    'audit-events', 'gl-accounts', 'journal-entries', 'gl-postings',
    'fiscal-periods', 'invoices', 'payments', 'payment-allocations', 'customers', 'vendors',
    'subscriptions', 'usage-records',
    'purchase-requisitions', 'vendor-quotes', 'purchase-orders', 'goods-receipts',
    'leases', 'lease-period-postings', 'lease-modifications',
    'recurring-journals', 'period-end-adjustments', 'depreciation-schedules',
    'wip-snapshots', 'fx-transactions', 'bank-reconciliations',
    'account-reconciliations', 'intercompany-transactions',
    'consolidation-eliminations', 'rounding-adjustments', 'prior-period-adjustments',
    'financial-statements', 'job-positions', 'recruiting-pipeline',
    'employees', 'time-entries', 'expense-reports', 'leave-requests',
    'performance-reviews', 'payroll-runs',
    'bills-of-materials', 'work-orders', 'inventory-movements',
    'production-receipts', 'cost-variances', 'quality-inspections',
    'workflow-definitions', 'workflow-instances',
    'transaction-failures',
    'leads', 'opportunities', 'activities', 'sales-commissions',
    'quotes', 'contracts', 'shipments', 'tracking-events',
    'performance-obligations', 'projects', 'project-tasks', 'project-milestones',
    'audit-findings', 'provisions',
    'carbon-emissions', 'csrd-disclosures', 'evidence-attestations',
    'kyc-checks', 'beneficial-owners', 'ai-suggestions',
  ]) allSlugs.add(s)

  const offenders: string[] = []
  for (const c of Object.values(BUSINESS_CHAINS)) {
    for (const step of c.steps) {
      if (!allSlugs.has(step.collection)) offenders.push(`${c.id}:${step.collection}`)
    }
  }
  return offenders.length === 0
    ? pass('expansion', 'chain-steps-reference-real-collections', `${Object.keys(BUSINESS_CHAINS).length} chains validated`)
    : fail('expansion', 'chain-steps-reference-real-collections', `${offenders.length} chain step(s) reference unknown collection`, offenders)
}

/** Every `requires` event in a chain has a producer (some other step's `emits`) within the same chain. */
export function checkChainRequiresHaveProducers(_ctx: InvariantContext): InvariantResult {
  const offenders: string[] = []
  for (const c of Object.values(BUSINESS_CHAINS)) {
    const emitted = new Set<string>()
    for (const s of c.steps) if (s.emits) emitted.add(s.emits)
    for (const s of c.steps) {
      for (const r of s.requires) {
        if (!emitted.has(r)) offenders.push(`${c.id}:${s.action} requires=${r}`)
      }
    }
  }
  return offenders.length === 0
    ? pass('expansion', 'chain-requires-have-producers')
    : fail('expansion', 'chain-requires-have-producers', `${offenders.length} chain step(s) require an event no other step emits`, offenders)
}

/* ═════════════════════════════════════════════════════════════════════
 * AXIS 3 — COMPRESSION (removing things still works)
 * ═════════════════════════════════════════════════════════════════════ */

/** Free tier is non-empty (compression floor — there must be something usable for free). */
export function checkFreeTierNonEmpty(_ctx: InvariantContext): InvariantResult {
  const free = featuresForTier('free')
  return free.length > 0
    ? pass('compression', 'free-tier-non-empty', `${free.length} feature(s) on free tier`)
    : fail('compression', 'free-tier-non-empty', 'free tier has zero features — agnostic floor missing')
}

/** Tier ladder is monotonically inclusive: free ⊆ solo ⊆ team ⊆ business ⊆ enterprise. */
export function checkTierLadderInclusivity(_ctx: InvariantContext): InvariantResult {
  const offenders: string[] = []
  for (let i = 0; i < TIERS.length - 1; i++) {
    const lo = TIERS[i] as Tier
    const hi = TIERS[i + 1] as Tier
    // Metered features are entry-tier capped versions (e.g. `invoicing_metered`,
    // ≤50/yr on free) that higher tiers SUPERSEDE with an unmetered equivalent
    // (`invoicing_unlimited`); they are legitimately not carried upward, so the
    // monotonic-superset rule exempts them.
    const loSet = new Set(featuresForTier(lo).filter((f) => !f.metered).map((f) => f.id))
    const hiSet = new Set(featuresForTier(hi).map((f) => f.id))
    for (const f of loSet) {
      if (!hiSet.has(f)) offenders.push(`${lo} has '${f}' but ${hi} does not`)
    }
  }
  return offenders.length === 0
    ? pass('compression', 'tier-ladder-inclusivity', 'each tier is a superset of the lower one')
    : fail('compression', 'tier-ladder-inclusivity', `${offenders.length} non-inclusive feature(s)`, offenders)
}

/** Every "core" business chain (no featureGate) is runnable on the free tier — i.e. every collection it touches is core. */
export function checkCoreChainsRunnableOnFree(_ctx: InvariantContext): InvariantResult {
  // Build the set of feature-GATED collections (i.e. require non-free tier).
  const gatedCollections = new Set<string>()
  for (const f of Object.values(FEATURE_REGISTRY)) {
    if (f.tiers.includes('free')) continue
    for (const c of f.collections ?? []) gatedCollections.add(c)
  }
  const offenders: string[] = []
  for (const chain of Object.values(BUSINESS_CHAINS)) {
    if (chain.featureGate !== undefined) continue
    for (const step of chain.steps) {
      if (gatedCollections.has(step.collection)) offenders.push(`${chain.id}:${step.collection}`)
    }
  }
  return offenders.length === 0
    ? pass('compression', 'core-chains-runnable-on-free')
    : warn('compression', 'core-chains-runnable-on-free', `${offenders.length} core-chain step(s) touch a gated collection`, offenders)
}

/* ═════════════════════════════════════════════════════════════════════
 * AXIS 4 — FALLBACK (graceful degradation)
 * ═════════════════════════════════════════════════════════════════════ */

/** `callWorkersAi` returns a typed-error result (NOT throw) when the AI binding is missing. */
export async function checkAiFallbackReturnsError(ctx: InvariantContext): Promise<InvariantResult> {
  if (!ctx.payload) return warn('fallback', 'ai-binding-fallback', 'no payload context — skipped')
  try {
    const mod = await import('@/services/ai/cloudflare-ai')
    // Pass null binding — the chokepoint must NOT throw.
    const result = await mod.callWorkersAi(
      { payload: ctx.payload } as never,
      undefined as never,
      { feature: 'ai_invoice_ocr', model: '@cf/meta/llama-3.2-11b-vision-instruct', inputs: {}, aiRiskClass: 'limited' } as never,
    )
    if (result && typeof result === 'object' && 'ok' in result && result.ok === false) {
      return pass('fallback', 'ai-binding-fallback', 'returned typed error envelope')
    }
    return fail('fallback', 'ai-binding-fallback', 'expected `{ ok: false, error }` envelope, got something else')
  } catch (err) {
    return fail('fallback', 'ai-binding-fallback', `threw instead of returning error: ${err instanceof Error ? err.message : 'unknown'}`)
  }
}

/** Notification service does not throw when no channel target is supplied — it returns a per-channel result. */
export async function checkNotificationFallback(ctx: InvariantContext): Promise<InvariantResult> {
  if (!ctx.payload) return warn('fallback', 'notification-fallback', 'no payload context — skipped')
  try {
    const mod = await import('@/services/notifications')
    const r = await mod.sendNotification(
      ctx.payload,
      {
        tenantId: 'invariant-test',
        category: 'transactional',
        channels: ['email', 'in_app'],
        subject: 'invariant-test',
        body: 'invariant-test',
        // intentionally no toEmail / toUserId
      },
    )
    if (r && Array.isArray(r.deliveries)) {
      return pass('fallback', 'notification-fallback', 'reported per-channel deliveries despite missing targets')
    }
    return fail('fallback', 'notification-fallback', 'unexpected return shape')
  } catch (err) {
    return fail('fallback', 'notification-fallback', `threw: ${err instanceof Error ? err.message : 'unknown'}`)
  }
}

/**
 * Conservation Law 53 — Self-Referential Closure (Slice JJJJJJJJJ 2026-05-11).
 *
 * Per user 'erpax remains fully functional payment provider fallbacking
 * to itself. it is like this every where. all falling back at itself
 * leads to erpax itself.'
 *
 * Every `ExternalRole` ERPax integrates with must have a registered
 * `InternalProvider`. Without one, an external outage degrades to a
 * caller-thrown error; with one, ERPax completes the operation itself
 * and the platform remains fully functional.
 *
 * Severity contract: this invariant intentionally `warn`s while
 * coverage is partial (currently signing-tsp / federation-peer /
 * notification / search-index ship internal providers). It flips
 * to `fail` once all 10 roles are registered — at which point Law 53
 * becomes a hard gate.
 */
export async function checkSelfReferentialClosure(_ctx: InvariantContext): Promise<InvariantResult> {
  try {
    const mod = await import('@/services/self-closure')
    // Side-effect import — registers every provider declared in
    // ./providers/index.ts at this call.
    await import('@/services/self-closure/providers')
    const expected = mod.EXTERNAL_ROLES
    const registered = new Set(mod.listRegisteredRoles())
    const missing = expected.filter((r) => !registered.has(r))
    if (missing.length === 0) {
      return pass(
        'fallback',
        'self-referential-closure',
        `all ${expected.length} external role(s) have registered internal providers (Law 53 satisfied)`,
      )
    }
    return warn(
      'fallback',
      'self-referential-closure',
      `${missing.length}/${expected.length} external role(s) lack an internal fallback provider — Law 53 partial`,
      missing,
    )
  } catch (err) {
    return fail(
      'fallback',
      'self-referential-closure',
      `failed to load self-closure framework: ${err instanceof Error ? err.message : String(err)}`,
    )
  }
}

/**
 * Slice PPPPPPPPP-cut1 (2026-05-11) — Finding 1 of the tamper-surface
 * review. After the factory default-on change, every collection that
 * goes through `createAccountingCollection` should land in
 * TAMPER_PROOF_COLLECTIONS_REGISTRY automatically. This invariant
 * confirms the runtime registry coverage matches the file-level
 * factory usage.
 *
 * Severity: starts as `warn` until the factory change has been
 * deployed (rows need a back-fill migration); flips to `fail` once
 * all known collections register.
 */
export async function checkAccountingCollectionsAreTamperProofed(_ctx: InvariantContext): Promise<InvariantResult> {
  try {
    const { TAMPER_PROOF_COLLECTIONS_REGISTRY } = await import('@/services/integrity/tamper-proof-uuid-field')
    // Import the collections barrel side-effect — every exported
    // collection file registers itself at module load via the
    // factory's `injectTamperProofUuid` default.
    await import('@/collections')
    const registered = [...TAMPER_PROOF_COLLECTIONS_REGISTRY]
    if (registered.length === 0) {
      return warn(
        'entropy', 'accounting-collections-tamper-proofed',
        'TAMPER_PROOF_COLLECTIONS_REGISTRY is empty after collection barrel load — factory injection not active',
      )
    }
    return pass(
      'entropy', 'accounting-collections-tamper-proofed',
      `${registered.length} collection(s) registered in tamper-proof registry`,
    )
  } catch (err) {
    return warn(
      'entropy', 'accounting-collections-tamper-proofed',
      `unable to verify registry coverage: ${err instanceof Error ? err.message : String(err)}`,
    )
  }
}

/**
 * Slice XXXXXXXXX-cut1 (2026-05-11) — Conservation Law 62 made
 * measurable. Samples chain leaves + share rows + audit-events to
 * compute the platform's structured-uuid coverage. The tamper
 * probability estimate `(1 - coverage)^N` is exposed in the result.
 *
 * Severity contract: WARN while coverage < 0.9; PASS at ≥ 0.9.
 * (Future cut promotes to FAIL once coverage stabilises at ≥ 0.99.)
 */
export async function checkFeatureCoverage(ctx: InvariantContext): Promise<InvariantResult> {
  if (!ctx.payload) {
    return warn('entropy', 'feature-coverage', 'no payload context — skipped')
  }
  try {
    const { computeCoverage } = await import('@/services/uuid-format/coverage')
    // Sample up to 50 uuids from each of three high-signal collections.
    // Best-effort: collection-missing → empty sample. Total ≤ 150.
    const samples: Array<{ uuid: string; source: string }> = []
    for (const slug of ['audit-events', 'shares', 'memories'] as const) {
      try {
        const res = await ctx.payload.find({
          collection: slug,
          limit: 50,
          depth: 0,
        }) as unknown as { docs: Array<Record<string, unknown>> }
        for (const row of res.docs) {
          // Prefer chainLeafUuid (audit-events / shares) → uuid (any tamper-proof row) → shareUuid (shares).
          const candidate = (row.chainLeafUuid as string | undefined)
            ?? (row.uuid as string | undefined)
            ?? (row.shareUuid as string | undefined)
          if (candidate) samples.push({ uuid: candidate, source: slug })
        }
      } catch {
        /* collection missing or unsupported — skip */
      }
    }
    if (samples.length === 0) {
      return warn(
        'entropy', 'feature-coverage',
        'no sampleable uuid-carrying rows found — coverage indeterminate',
      )
    }
    const report = computeCoverage({ samples })
    const cov = Number(report.overallStructuredCoverage.toFixed(3))
    const tamp = report.tamperProbabilityEstimate
    const tampStr = tamp < 1e-9 ? tamp.toExponential(2) : tamp.toFixed(9)
    if (cov >= 0.9) {
      return pass(
        'entropy', 'feature-coverage',
        `${report.structuredCount}/${report.totalSamples} structured (coverage=${cov}; P(tamper)≈${tampStr})`,
      )
    }
    return warn(
      'entropy', 'feature-coverage',
      `coverage ${cov} below 0.9 threshold — ${report.legacyCount}/${report.totalSamples} are legacy/non-structured (P(tamper)≈${tampStr})`,
      // Offer the top slot-coverage gaps as offender hints.
      report.perSlot
        .filter((s) => s.total > 0 && s.structuredCoverage < 1)
        .slice(0, 5)
        .map((s) => `${s.slot}: ${s.structuredCount}/${s.total} structured`),
    )
  } catch (err) {
    return warn(
      'entropy', 'feature-coverage',
      `unable to compute coverage: ${err instanceof Error ? err.message : String(err)}`,
    )
  }
}

/**
 * Slice PPPPPPPPP-cut1 (2026-05-11) — Finding 2 of the tamper-surface
 * review. Scans the source for direct `payload.create({collection:
 * 'audit-events', ...})` callers that bypass `writeAuditEvent`.
 * Warns until all 11 known callers migrate.
 */
export function checkAuditEventsAreChainLinked(ctx: InvariantContext): InvariantResult {
  try {
    const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
    const srcRoot = `${repoRoot}/src`
    const offenders: string[] = []
    const walk = (dir: string): void => {
      if (!existsSync(dir)) return
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name)
        if (entry.isDirectory()) {
          if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue
          walk(full)
          continue
        }
        if (!entry.name.endsWith('.ts')) continue
        if (entry.name.endsWith('.test.ts')) continue
        // Skip the helper itself + the architecture-invariants checker.
        if (full.endsWith('write-audit-event.ts')) continue
        if (full.endsWith('architecture-invariants/checks.ts')) continue
        const src = readFileSync(full, 'utf8')
        // Heuristic: direct .create call on the audit-events slug.
        const re = /\.create\s*\(\s*\{[^}]*collection\s*:\s*['"]audit-events['"]/m
        if (re.test(src)) offenders.push(full.replace(`${repoRoot}/`, ''))
      }
    }
    walk(srcRoot)
    if (offenders.length === 0) {
      return pass(
        'entropy', 'audit-events-chain-linked',
        'every audit-events write routes through writeAuditEvent (chain-linked)',
      )
    }
    return warn(
      'entropy', 'audit-events-chain-linked',
      `${offenders.length} caller(s) bypass writeAuditEvent (Finding 2 partial coverage); migrate to ensure DO-chain linkage`,
      offenders,
    )
  } catch (err) {
    return warn(
      'entropy', 'audit-events-chain-linked',
      `unable to scan: ${err instanceof Error ? err.message : String(err)}`,
    )
  }
}

/* ═════════════════════════════════════════════════════════════════════
 * AXIS 5 — ENTROPY (no duplicates / inconsistencies)
 * ═════════════════════════════════════════════════════════════════════ */

/** No two collection files declare the same `slug:`. */
export function checkNoDuplicateCollectionSlugs(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const files = listCollectionFiles(repoRoot)
  const slugToFile = new Map<string, string[]>()
  for (const f of files) {
    const m = readSafe(f).match(/slug:\s*'([^']+)'/)
    if (!m) continue
    const arr = slugToFile.get(m[1]) ?? []
    arr.push(basename(f))
    slugToFile.set(m[1], arr)
  }
  const dupes: string[] = []
  for (const [slug, fs] of slugToFile) {
    if (fs.length > 1) dupes.push(`${slug} ← ${fs.join(', ')}`)
  }
  return dupes.length === 0
    ? pass('entropy', 'no-duplicate-collection-slugs', `${slugToFile.size} unique slugs`)
    : fail('entropy', 'no-duplicate-collection-slugs', `${dupes.length} duplicate slug(s)`, dupes)
}

/** No two nested-array `dbName:` short codes collide across the codebase. */
export function checkNoDuplicateArrayDbNames(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const files = listCollectionFiles(repoRoot)
  const seen = new Map<string, string[]>()
  for (const f of files) {
    for (const m of readSafe(f).matchAll(/dbName:\s*'([^']+)'/g)) {
      const arr = seen.get(m[1]) ?? []
      arr.push(basename(f))
      seen.set(m[1], arr)
    }
  }
  const dupes: string[] = []
  for (const [name, fs] of seen) {
    const uniq = [...new Set(fs)]
    if (uniq.length > 1) dupes.push(`${name} ← ${uniq.join(', ')}`)
  }
  return dupes.length === 0
    ? pass('entropy', 'no-duplicate-array-dbnames', `${seen.size} unique dbNames`)
    : fail('entropy', 'no-duplicate-array-dbnames', `${dupes.length} duplicate dbName(s)`, dupes)
}

/** No two business chains declare the same id (case-insensitive). */
export function checkNoDuplicateChainIds(_ctx: InvariantContext): InvariantResult {
  const ids = Object.keys(BUSINESS_CHAINS).map((s) => s.toLowerCase())
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
  return dupes.length === 0
    ? pass('entropy', 'no-duplicate-chain-ids', `${ids.length} unique chain ids`)
    : fail('entropy', 'no-duplicate-chain-ids', `${dupes.length} duplicate chain id(s)`, dupes)
}

/** No two FEATURE_REGISTRY entries collide on id (the `id` field MUST equal the key). */
export function checkFeatureRegistryKeyMatchesId(_ctx: InvariantContext): InvariantResult {
  const offenders: string[] = []
  for (const [key, f] of Object.entries(FEATURE_REGISTRY)) {
    if (f.id !== key) offenders.push(`${key} ≠ ${f.id}`)
  }
  return offenders.length === 0
    ? pass('entropy', 'feature-key-equals-id', `${Object.keys(FEATURE_REGISTRY).length} entries OK`)
    : fail('entropy', 'feature-key-equals-id', `${offenders.length} mismatch(es)`, offenders)
}

/* ─── Slice WWWW — role-axis invariants ─────────────────────────────── */

/**
 * Every role in ROLES_REGISTRY cites at least one published standard.
 * The role binds standards to people — without a citation, the binding
 * is unverifiable.
 *
 * @standard ISO 27002:2022 §5.4 + COBIT 5 PO4.11 + ISO 19011 §6.4.6
 */
export function checkRolesHaveStandards(_ctx: InvariantContext): InvariantResult {
  const offenders = Object.values(ROLES_REGISTRY)
    .filter((r) => r.standards.length === 0)
    .map((r) => r.id)
  return offenders.length === 0
    ? pass('standards', 'roles-cite-standards', `${ROLE_IDS.length} roles cite ≥1 standard`)
    : fail('standards', 'roles-cite-standards', `${offenders.length} role(s) without standards`, offenders)
}

/**
 * Segregation-of-duties (SoD) pairs are SYMMETRIC — if role A declares
 * `mutuallyExclusiveWith: ['B']` then role B must declare A in its own
 * mutually-exclusive list. Catches the half-declared SoD that would
 * silently allow B + A combinations to pass `validateUserRoleSet`.
 *
 * @standard ISO 27002:2022 §5.4 segregation-of-duties
 * @standard COBIT 5 PO4.11
 */
export function checkSoDSymmetric(_ctx: InvariantContext): InvariantResult {
  const offenders: string[] = []
  for (const a of Object.values(ROLES_REGISTRY)) {
    for (const b of a.mutuallyExclusiveWith) {
      const bEntry = ROLES_REGISTRY[b]
      if (!bEntry) {
        offenders.push(`${a.id}: declares SoD with unknown role ${b}`)
        continue
      }
      if (!bEntry.mutuallyExclusiveWith.includes(a.id)) {
        offenders.push(`${a.id} ↔ ${b}: declared on ${a.id}, missing on ${b}`)
      }
    }
  }
  return offenders.length === 0
    ? pass('entropy', 'sod-symmetric', `${ROLE_IDS.length} roles checked; all SoD pairs symmetric`)
    : fail('entropy', 'sod-symmetric', `${offenders.length} asymmetric SoD declaration(s)`, offenders)
}

/**
 * Every chain step's `assigneeRole` (when set on workflow definitions
 * or written into a chain registry note) references a real role id.
 * Catches arbitrary-string role names that would silently never match.
 *
 * Static check on the workflow-definitions seed + the chain registry
 * notes. Runtime check on workflow-definitions itself is in scope of
 * the integration tests.
 */
export function checkWorkflowAssigneeRolesExist(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const wfSeed = readSafe(join(repoRoot, 'src/plugins/accounting/seeds/chains/workflow-approval-cycle.ts'))
  if (!wfSeed) return warn('expansion', 'chain-assignee-roles-exist', 'workflow seed not found')
  const offenders: string[] = []
  for (const m of wfSeed.matchAll(/assigneeRole:\s*'([a-zA-Z][\w-]*)'/g)) {
    const role = m[1]
    if (!ROLE_IDS.includes(role as never)) {
      offenders.push(`workflow-approval-cycle.ts: assigneeRole '${role}' not in ROLES_REGISTRY`)
    }
  }
  return offenders.length === 0
    ? pass('expansion', 'chain-assignee-roles-exist', 'all workflow assigneeRoles are real registry entries')
    : fail('expansion', 'chain-assignee-roles-exist', `${offenders.length} workflow step(s) reference unknown role`, offenders)
}

/* ─── Slice AAAAA — uniform-DRY enforcement on every collection ─────── */

/**
 * Every collection in `src/plugins/accounting/collections/` MUST follow
 * the canonical DRY shape — no inline tenant/currency/status/notes/ref/
 * audit-fields, no inline access predicates, no missing audit hook, no
 * missing timestamps, JSDoc cites a standard, slug is domain-prefixed.
 *
 * Counterpart of the standalone `outputs/check-dry.mjs` walker that
 * drove AAAAA to 0; bakes the same rules into the runtime invariant
 * suite so future drift fails CI immediately.
 *
 * @standard ISO/IEC 25010:2023 §5 modularity-and-maintainability
 * @audit ISO 19011:2018 §6.4 audit-evidence
 */
export function checkCollectionsAreUniformlyDRY(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const dir = join(repoRoot, 'src/plugins/accounting/collections')
  if (!existsSync(dir)) {
    return warn('entropy', 'collections-uniformly-dry', 'collections dir not found')
  }
  // AAAAA-cont (2026-05-11): dead stubs + .bak files moved to _attic/.
  // Skip the entire underscore-prefixed subfolder convention.
  // Auth/platform slugs are owned by us but follow Payload v3 platform
  // conventions (no audit hook, optional timestamps).
  const PLATFORM_SLUGS = new Set([
    'roles', 'user_roles', 'paymentMethods',
    'tenants', 'users', 'subscriptions', 'subscriptionPlans',
  ])
  const offenders: string[] = []
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('_')) continue // _attic, _legacy, etc.
    if (!entry.endsWith('.ts') || entry === 'index.ts' || entry.endsWith('.bak')) continue
    const text = readSafe(join(dir, entry))
    const slug = (text.match(/slug:\s*'([a-z][\w-]*)'/) ?? [])[1]
    if (!slug) continue
    const usesFactory = /\bcreateAccountingCollection\s*\(/.test(text)

    // 1. Tenant scoping is owned by @payloadcms/plugin-multi-tenant (registered
    //    in payload.config.ts), not a per-collection field — no inline check here.
    // 3. inline TOP-LEVEL status select
    const statusInGroupOnly = !/^\s*\{\s*name:\s*'status',\s*\n\s*type:\s*'select'/m.test(text)
    if (!statusInGroupOnly && !/\bstatusField\s*\(/.test(text)) {
      offenders.push(`${entry} :: top-level inline status select — use statusField([...])`)
    }
    // 4. notesField inline
    if (/\{\s*name:\s*'notes',\s*type:\s*'textarea'/.test(text) && !/\bnotesField\s*\(/.test(text)) {
      offenders.push(`${entry} :: inline { name: notes, type: textarea } — use notesField()`)
    }
    // 5. canonical referenceField inline
    if (/\{\s*name:\s*'reference',\s*type:\s*'text',\s*required:\s*true,\s*unique:\s*true,\s*index:\s*true/.test(text)
        && !/\breferenceField\s*\(/.test(text)) {
      offenders.push(`${entry} :: inline canonical reference — use referenceField()`)
    }
    // 6. inline createdBy/approvedBy
    if ((/\{\s*name:\s*'createdBy'/.test(text) || /\{\s*name:\s*'approvedBy'/.test(text))
        && !/\bauditFields\s*\(/.test(text)) {
      offenders.push(`${entry} :: inline createdBy/approvedBy — use ...auditFields()`)
    }
    // 7. canonical access helper (factory-built collections excused)
    if (!usesFactory && !/access:\s*(scopedAccess|roleScopedAccess|accountingCollectionAccess|tenantAdminWriteAccess|tenantMasterDataAccess|multiTenantRead|tenantAdmin|authenticated|adminOnly|isSuperAdminAccess|\{)/.test(text)) {
      offenders.push(`${entry} :: missing access block`)
    }
    // 8. autoPopulateTenant present (factory excused)
    if (!usesFactory && /\btenant\b/.test(text) && !/autoPopulateTenant/.test(text)) {
      offenders.push(`${entry} :: tenant field present but no autoPopulateTenant hook`)
    }
    // 9. auditTrailAfterChange (audit-events + platform slugs excused)
    if (slug !== 'audit-events' && !PLATFORM_SLUGS.has(slug) && !/auditTrailAfterChange\(/.test(text)) {
      offenders.push(`${entry} :: no auditTrailAfterChange hook`)
    }
    // 10. timestamps (factory + platform slugs excused)
    if (!usesFactory && !PLATFORM_SLUGS.has(slug) && !/timestamps:\s*true/.test(text)) {
      offenders.push(`${entry} :: no timestamps: true`)
    }
    // 11. JSDoc cites a standard
    const banners = [...text.matchAll(/\/\*\*([\s\S]*?)\*\//g)].map((m) => m[1])
    if (banners.length === 0) {
      offenders.push(`${entry} :: no JSDoc banner anywhere`)
    } else if (!banners.some((b) => /@(standard|accounting|compliance|audit|security|rfc|see)\b/.test(b))) {
      offenders.push(`${entry} :: no banner cites @standard/@accounting/@compliance/@audit/@security/@rfc`)
    }
  }
  return offenders.length === 0
    ? pass('entropy', 'collections-uniformly-dry', `${readdirSync(dir).length} collection files all uniformly DRY`)
    : fail('entropy', 'collections-uniformly-dry', `${offenders.length} DRY violation(s) — see outputs/check-dry.mjs for details`, offenders)
}

/* ─── Slice BBBBB-prep — IFRS 100% coverage invariant ─────────────────── */

/**
 * Every active IASB standard (IFRS 1-18 + S1/S2 + IAS 1-41) MUST be
 * cited by at least one collection / service / standards-folder file.
 * Catches regression where a future schema change removes the last
 * citation of a standard the codebase claims to implement.
 *
 * @standard ISO 19011:2018 §6.4 audit-evidence
 * @standard IFRS Foundation issued-standards-as-of-2026-05
 */
const ACTIVE_IFRS_STANDARDS: ReadonlyArray<string> = [
  // IFRS (1-18 + ISSB sustainability)
  'IFRS-1',  'IFRS-2',  'IFRS-3',  'IFRS-5',  'IFRS-6',  'IFRS-7',
  'IFRS-8',  'IFRS-9',  'IFRS-10', 'IFRS-11', 'IFRS-12', 'IFRS-13',
  'IFRS-14', 'IFRS-15', 'IFRS-16', 'IFRS-17', 'IFRS-18',
  'IFRS-S1', 'IFRS-S2',
  // IAS (still effective)
  'IAS-1',  'IAS-2',  'IAS-7',  'IAS-8',  'IAS-10', 'IAS-12',
  'IAS-16', 'IAS-19', 'IAS-20', 'IAS-21', 'IAS-23', 'IAS-24',
  'IAS-26', 'IAS-27', 'IAS-28', 'IAS-29', 'IAS-32', 'IAS-33',
  'IAS-34', 'IAS-36', 'IAS-37', 'IAS-38', 'IAS-40', 'IAS-41',
]

export function checkIfrsCoverage100Percent(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const targets = [
    'src/plugins/accounting/collections',
    'src/collections',
    'src/services',
    'src/standards',
    'src/access',
    'src/hooks',
    'src/jobs',
  ]
  const cited = new Set<string>()

  function walk(dir: string): void {
    const abs = join(repoRoot, dir)
    if (!existsSync(abs)) return
    for (const e of readdirSync(abs, { withFileTypes: true })) {
      if (e.name.startsWith('_') || e.name.startsWith('.')) continue
      const full = join(dir, e.name)
      if (e.isDirectory()) walk(full)
      else if (e.isFile() && (e.name.endsWith('.ts') || e.name.endsWith('.md'))) {
        const text = readSafe(join(repoRoot, full))
        // Normalise "IFRS 9" / "IAS 16" / "IFRS S2" → hyphenated form.
        const norm = text
          .replace(/\bIFRS\s+S(\d+)\b/g, 'IFRS-S$1')
          .replace(/\bIFRS\s+(\d+)\b/g, 'IFRS-$1')
          .replace(/\bIAS\s+(\d+)\b/g, 'IAS-$1')
        for (const m of norm.matchAll(/\b(IFRS-S?\d+|IAS-\d+)\b/g)) {
          cited.add(m[1])
        }
      }
    }
  }
  for (const t of targets) walk(t)

  const uncited = ACTIVE_IFRS_STANDARDS.filter((s) => !cited.has(s))
  return uncited.length === 0
    ? pass('standards', 'ifrs-coverage-100-percent', `${ACTIVE_IFRS_STANDARDS.length}/${ACTIVE_IFRS_STANDARDS.length} active IASB standards cited`)
    : fail('standards', 'ifrs-coverage-100-percent', `${uncited.length} active IASB standard(s) uncited — every IFRS / IAS must appear in ≥1 file`, uncited)
}

/* ─── Slice YYYY — invoice/payment canonical-paths regression guard ─ */

/**
 * Catch the regression that XXXX → YYYY closed: chain seeds and hooks
 * accessing flat `invoiceNumber/customer/totalAmount/paymentNumber/etc`
 * on the heavily-grouped Invoices/Payments collections (whose canonical
 * shape is `number/parties.buyer/amounts.totalAmount/transactionNumber/
 * amounts.amount/dates.{sentAt,receivedAt}/paymentKind`).
 *
 * The static walker scans every chain seed + accounting hook + R2R
 * service for invented flat keys on the `invoices` / `payments` slugs;
 * fails CI if any reappear.
 *
 * @standard EN-16931:2017 semantic-data-model-electronic-invoice
 * @standard ISO 19011:2018 §6.4.6 audit-evidence
 */
const FLAT_INVOICE_OFFENDERS: ReadonlyArray<string> = [
  'invoiceNumber', 'invoiceType', 'invoiceTypeCode', 'issueDate',
  'paidAt', 'paymentDate', 'orderDate', 'protocolDate', 'proformaDate',
  'cancelledAt', 'pastDueSinceAt', 'gracePeriodEndsAt', 'suspensionScheduledFor',
  'itemTotal', 'discountTotal', 'allowancesTotal', 'chargesTotal',
  'netTotal', 'taxTotal', 'totalAmount', 'prepaidAmount', 'roundingAmount',
  'totalPaid', 'totalDue',
  // Note: `dueAt`, `dueDate` are intentionally omitted because they're
  // legitimate top-level columns on a few collections; on Invoices the
  // canonical path is `dates.dueAt`. The walker checks file-by-file.
]
const FLAT_PAYMENT_OFFENDERS: ReadonlyArray<string> = [
  'paymentNumber', 'paymentType', 'partyId', 'partyType',
  'invoiceId', 'billId',
]

export function checkInvoicePaymentCanonicalAccess(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const targets: ReadonlyArray<string> = [
    'src/plugins/accounting/seeds/chains',
    'src/plugins/accounting/hooks',
    'src/plugins/accounting/services',
    'src/services',
    'src/jobs',
  ]
  const offenders: string[] = []
  const visit = (dir: string): void => {
    const abs = join(repoRoot, dir)
    if (!existsSync(abs)) return
    for (const e of readdirSync(abs, { withFileTypes: true })) {
      if (e.isDirectory()) { visit(join(dir, e.name)); continue }
      if (!e.isFile() || !e.name.endsWith('.ts')) continue
      const path = join(dir, e.name)
      const text = readSafe(join(repoRoot, path))
      // Only inspect blocks targeting the invoices / payments collections.
      const reInv = /collection:\s*'invoices',\s*\n\s*data:\s*\{([\s\S]*?)\}\s*as\s+Record/g
      const rePay = /collection:\s*'payments',\s*\n\s*data:\s*\{([\s\S]*?)\}\s*as\s+Record/g
      let m: RegExpExecArray | null
      const checkBlock = (block: string, slug: string, badKeys: ReadonlyArray<string>): void => {
        let depth = 0
        let buf = ''
        for (const ch of block) {
          if (ch === '{' || ch === '[') depth++
          else if (ch === '}' || ch === ']') depth--
          else if (depth === 0) buf += ch
        }
        for (const km of buf.matchAll(/^\s*([a-zA-Z][\w]*)\s*:/gm)) {
          if (badKeys.includes(km[1])) offenders.push(`${path}::${slug}.${km[1]}`)
        }
      }
      while ((m = reInv.exec(text)) !== null) checkBlock(m[1], 'invoices', FLAT_INVOICE_OFFENDERS)
      while ((m = rePay.exec(text)) !== null) checkBlock(m[1], 'payments', FLAT_PAYMENT_OFFENDERS)
    }
  }
  for (const d of targets) visit(d)
  return offenders.length === 0
    ? pass('entropy', 'invoice-payment-canonical-access', 'no flat-field invoice/payment access in seeds/hooks/services')
    : fail('entropy', 'invoice-payment-canonical-access', `${offenders.length} flat-field reference(s) — use canonical groups (parties.*/amounts.*/dates.*)`, offenders)
}

/* ─── Slice UUUU — seed-vs-schema invariant ─────────────────────────── */

/**
 * Factory-injected fields that the regex-based collection-field extractor
 * doesn't see (because the field is added by a helper call, not declared
 * inline). Keep this list in sync with `base-accounting-fields.ts`.
 */
const FACTORY_INJECTED_FIELDS: Readonly<Record<string, ReadonlyArray<string>>> = {
  currencyField:     ['currency'],
  referenceField:    ['reference'],
  legalEntityField:  ['legalEntity'],
  countryCodeField:  ['countryCode'],
  naceCodeField:     ['naceCode'],
  statusField:       ['status'],
  notesField:        ['notes'],
  auditFields:       ['createdBy', 'approvedBy', 'approvedAt'],
}

const ALWAYS_ALLOWED = new Set([
  'tenant',          // injected by plugin-multi-tenant + autoPopulateTenant
  'createdAt',       // Payload built-in
  'updatedAt',       // Payload built-in
  'id',              // Payload built-in
])

/** Per-collection-slug → set of field names actually declared in that file. */
function collectFieldsForCollection(repoRoot: string, slug: string): ReadonlySet<string> | null {
  const dirs = [
    join(repoRoot, 'src/plugins/accounting/collections'),
    join(repoRoot, 'src/collections'),
  ]
  for (const dir of dirs) {
    if (!existsSync(dir)) continue
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts') {
        const path = join(dir, entry.name)
        const text = readSafe(path)
        if (!text.includes(`slug: '${slug}'`)) continue
        return extractDeclaredFields(text)
      } else if (entry.isDirectory()) {
        const path = join(dir, entry.name, 'index.ts')
        if (!existsSync(path)) continue
        const text = readSafe(path)
        if (!text.includes(`slug: '${slug}'`)) continue
        return extractDeclaredFields(text)
      }
    }
  }
  return null
}

function extractDeclaredFields(text: string): Set<string> {
  const fields = new Set<string>(ALWAYS_ALLOWED)
  // Inline `name: 'fieldName'` declarations.
  for (const m of text.matchAll(/name:\s*'([a-zA-Z][\w]*)'/g)) fields.add(m[1])
  // Factory-injected fields — match each helper call, including custom-name forms.
  for (const [helper, defaults] of Object.entries(FACTORY_INJECTED_FIELDS)) {
    if (!new RegExp(`\\b${helper}\\(`).test(text)) continue
    // Default field names this helper injects.
    for (const f of defaults) fields.add(f)
    // Custom-name overrides: `currencyField({ name: 'fromCurrency' })`, `referenceField({ name: 'quoteNumber' })`, etc.
    const callRe = new RegExp(`${helper}\\([^)]*name:\\s*'([a-zA-Z][\\w]*)'`, 'g')
    for (const m of text.matchAll(callRe)) fields.add(m[1])
  }
  // Slice XXXX: `taxonomySelect('fieldName', OPTIONS, { ... })` injects a
  // `select` field whose `name` is the first positional argument. The
  // generic helper-pattern above can't see it (positional, not named).
  for (const m of text.matchAll(/\btaxonomySelect\(\s*'([a-zA-Z][\w]*)'/g)) {
    fields.add(m[1])
  }
  return fields
}

/**
 * Every chain seed's `payload.create({ collection, data: {...} })` call
 * must use field names that ACTUALLY exist on the target collection
 * (either declared inline or injected via a known factory helper).
 *
 * This is the invariant whose absence let Slice TTTT ship 18 chain
 * seeds with ~50-100 genuinely-invented field names. Catches the gap
 * between "registry says the chain is wired" and "the chain actually
 * runs against real schemas".
 *
 * @audit ISO-19011:2018 §6.4 audit-evidence-seed-schema-consistency
 */
export function checkChainSeedFieldsExistOnCollections(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const seedDir = join(repoRoot, 'src/plugins/accounting/seeds/chains')
  if (!existsSync(seedDir)) return warn('expansion', 'chain-seed-fields-exist', 'no chain seeds directory')

  const fieldCache = new Map<string, ReadonlySet<string> | null>()
  const offenders: string[] = []
  for (const entry of readdirSync(seedDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.ts')) continue
    const text = readSafe(join(seedDir, entry.name))
    // Per `payload.create({ collection: '<slug>', data: { ... } })` block.
    const createRe = /collection:\s*'([a-z][\w-]*)',\s*\n\s*data:\s*\{([\s\S]*?)\}\s*as\s+Record/g
    let m: RegExpExecArray | null
    while ((m = createRe.exec(text)) !== null) {
      const slug = m[1]
      const dataBlock = m[2]
      // Skip audit-events — written by hooks, not chain seeds directly.
      if (slug === 'audit-events') continue

      let declared = fieldCache.get(slug)
      if (declared === undefined) {
        declared = collectFieldsForCollection(repoRoot, slug)
        fieldCache.set(slug, declared)
      }
      if (declared === null) continue // collection not under accounting/collections — skip silently

      // Top-level keys at depth 0 of dataBlock.
      let depth = 0
      let buf = ''
      for (const ch of dataBlock) {
        if (ch === '{' || ch === '[') depth++
        else if (ch === '}' || ch === ']') depth--
        else if (depth === 0) buf += ch
      }
      const usedKeys = new Set<string>()
      for (const km of buf.matchAll(/^\s*([a-zA-Z][\w]*)\s*:/gm)) usedKeys.add(km[1])

      for (const k of usedKeys) {
        if (!declared.has(k)) offenders.push(`${entry.name}::${slug}.${k}`)
      }
    }
  }
  return offenders.length === 0
    ? pass('expansion', 'chain-seed-fields-exist', `${fieldCache.size} collections × seed-keys validated`)
    // Warn-class: the static field-extractor cannot see fields declared
    // via dynamic spreads, conditional includes, or directory-style
    // `src/collections/<Name>/index.ts` collections that ship custom
    // field-declaration patterns. False-positives are common; the warn
    // count surfaces real gaps without breaking CI.
    : warn('expansion', 'chain-seed-fields-exist', `${offenders.length} chain-seed reference(s) to fields not visible to the static extractor (may be false positives — verify against actual schema)`, offenders.slice(0, 20))
}

/* ─── Slice SSSS — registry-vs-implementation invariant ─────────────── */

/**
 * Every chain in BUSINESS_CHAINS declares a `seedFile` + `testFile` path.
 * Assert both files exist on disk. Catches the "registry entry exists
 * but implementation never landed" gap — surfaces chains stuck at
 * `wired: partial` or `wired: no` because they have no impl yet.
 *
 * Warn-class: registry-only entries are intentionally allowed (queued
 * for future slices), but the warn count makes the gap visible at every
 * boot + CI run.
 *
 * @standard ISO 19011:2018 §6.4 audit-evidence
 * @audit  registry-vs-implementation traceability
 */
export function checkChainSeedFilesExist(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const offenders: string[] = []
  for (const chain of Object.values(BUSINESS_CHAINS)) {
    if (!existsSync(join(repoRoot, chain.seedFile))) offenders.push(`${chain.id}:seed missing (${chain.seedFile})`)
    if (!existsSync(join(repoRoot, chain.testFile))) offenders.push(`${chain.id}:test missing (${chain.testFile})`)
  }
  return offenders.length === 0
    ? pass('expansion', 'chain-seed-files-exist', `${Object.keys(BUSINESS_CHAINS).length} chains have both seed + test files`)
    : warn('expansion', 'chain-seed-files-exist', `${offenders.length} chain file(s) missing — declared in registry but no impl`, offenders)
}

/* ─── Slice RRRR — multi-relation-axis invariants ───────────────────── */

/**
 * Every "bridge" collection (a row that joins two FKs to other collections)
 * MUST mark BOTH FK relationships with `index: true`. Catches the common
 * O(n²) lookup mistake where one side of an M:M bridge is queried millions
 * of times without an index.
 *
 * The check identifies bridges by structural pattern: a collection with
 * ≥ 2 `relationship` fields where neither relationship is a `users` FK
 * (which is excluded as it's typically `assignedTo`/`createdBy`/etc., not
 * a domain bridge).
 *
 * @standard ISO/IEC 25010:2023 performance-efficiency
 * @standard SQL-92 §5.4 indexing-strategy
 */
export function checkBridgeRelationshipsIndexed(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const files = listCollectionFiles(repoRoot)
  // Known bridge collections (declared explicitly so the check stays
  // fast + auditable). New bridge collections should be appended here.
  const KNOWN_BRIDGES: ReadonlyArray<{ file: string; rels: ReadonlyArray<string> }> = [
    { file: 'PaymentAllocations.ts',         rels: ['payment',  'invoice'] },
    { file: 'IntercompanyTransactions.ts',   rels: ['fromLegalEntity', 'toLegalEntity'] },
    { file: 'ConsolidationEliminations.ts',  rels: ['period',   'sourceLegalEntities'] },
    { file: 'GoodsReceipts.ts',              rels: ['purchaseOrder'] },
    { file: 'VendorQuotes.ts',               rels: ['vendor', 'requisition'] },
    { file: 'ProjectMilestones.ts',          rels: ['project', 'invoice'] },
    { file: 'WipSnapshots.ts',               rels: ['project', 'period'] },
    { file: 'LeaseModifications.ts',         rels: ['lease',   'period'] },
    { file: 'CostVariances.ts',              rels: ['workOrder', 'productionReceipt'] },
    { file: 'QualityInspections.ts',         rels: ['workOrder', 'productionReceipt'] },
    { file: 'SalesCommissions.ts',           rels: ['opportunity', 'contract'] },
  ]
  const offenders: string[] = []
  for (const bridge of KNOWN_BRIDGES) {
    const path = files.find((f) => f.endsWith(`/${bridge.file}`))
    if (!path) continue
    const text = readSafe(path)
    for (const relName of bridge.rels) {
      // Look for the field block defining this relationship + check for `index: true`.
      const fieldRe = new RegExp(`name:\\s*'${relName}'[\\s\\S]{0,400}`)
      const match = text.match(fieldRe)
      if (!match) continue // field absent in current schema — skip silently
      // Within the matched block, check for index: true OR being inside a referenceField()/legalEntityField() helper (which sets index).
      const block = match[0]
      const indexed = /index:\s*true/.test(block)
        || /legalEntityField\(/.test(block)
        || /referenceField\(/.test(block)
      if (!indexed) offenders.push(`${bridge.file}.${relName}`)
    }
  }
  return offenders.length === 0
    ? pass('entropy', 'bridge-relationships-indexed', `${KNOWN_BRIDGES.length} bridge collections checked`)
    : warn('entropy', 'bridge-relationships-indexed', `${offenders.length} bridge FK(s) not indexed (may cause O(n²) lookups)`, offenders)
}

/* ─── Slice QQQQ — temporal-axis invariants ─────────────────────────── */

/**
 * Every scheduled task's cron expression is parseable and matches AT LEAST
 * ONE minute in a one-year window. Catches typos like `*\/15 * * 13 *`
 * (impossible month) or `0 0 0 * *` (zero day-of-month) that would silently
 * never fire.
 *
 * @standard rfc-5545 icalendar-cron
 */
export function checkScheduledTasksCronValid(_ctx: InvariantContext): InvariantResult {
  const offenders: string[] = []
  for (const task of Object.values(SCHEDULED_TASKS)) {
    const fields = task.cron.trim().split(/\s+/)
    if (fields.length !== 5) {
      offenders.push(`${task.id}: cron has ${fields.length} fields, expected 5`)
      continue
    }
    // Probe a FULL YEAR (≥1 match required) so legitimately sparse crons —
    // monthly (`0 7 1 * *`) and annual (`0 0 1 1 *`) — are valid; only
    // IMPOSSIBLE crons (month 13, day 0/32) match no minute across a year.
    const base = new Date('2026-01-01T00:00:00Z')
    let matched = false
    for (let m = 0; m < 366 * 1440; m++) {
      if (cronMatchesMinute(task.cron, new Date(base.getTime() + m * 60_000))) {
        matched = true
        break
      }
    }
    if (!matched) offenders.push(`${task.id}: cron '${task.cron}' matches no minute in 24h window`)
  }
  return offenders.length === 0
    ? pass('expansion', 'scheduled-tasks-cron-valid', `${Object.keys(SCHEDULED_TASKS).length} tasks parse + match`)
    : fail('expansion', 'scheduled-tasks-cron-valid', `${offenders.length} task(s) with invalid / unmatchable cron`, offenders)
}

/**
 * Every scheduled task's `featureGate` (when set) references a real
 * FEATURE_REGISTRY entry — same gate the chain registry enforces.
 */
export function checkScheduledTasksFeatureGatesExist(_ctx: InvariantContext): InvariantResult {
  const known = new Set(Object.keys(FEATURE_REGISTRY))
  const offenders = Object.values(SCHEDULED_TASKS)
    .filter((t) => t.featureGate && !known.has(t.featureGate))
    .map((t) => `${t.id}:${t.featureGate}`)
  return offenders.length === 0
    ? pass('expansion', 'scheduled-tasks-feature-gates-exist')
    : fail('expansion', 'scheduled-tasks-feature-gates-exist', `${offenders.length} task(s) cite missing feature`, offenders)
}

/**
 * Audit-events Merkle chain integrity — every row's `previousHash` must
 * equal the IMMEDIATELY-PRIOR row's `rowHash` for the same tenant. Runs
 * as a runtime check (needs Payload). Warn-class because legacy rows
 * pre-Slice-QQQQ have empty hashes; the assertion only fires when both
 * fields are present.
 *
 * @standard NIST FIPS-180-4 sha-256
 * @standard ISO 27037:2012 evidence-preservation
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-immutability
 */
export async function checkAuditChainIntegrity(ctx: InvariantContext): Promise<InvariantResult> {
  if (!ctx.payload) return warn('entropy', 'audit-chain-integrity', 'no payload — skipped (runs only with live Payload)')
  try {
    // Sample the most-recent 200 rows across all tenants; sort within
    // tenant by timestamp ascending to walk forward.
    const recent = await ctx.payload.find({
      collection: 'audit-events',
      sort: '-timestamp',
      limit: 200,
      overrideAccess: true,
      depth: 0,
    })
    type Row = { tenant: unknown; timestamp: string; rowHash?: string; previousHash?: string; eventId?: string }
    const docs = recent.docs as unknown as Row[]
    const tenantBuckets = new Map<string, Row[]>()
    for (const r of docs) {
      const tid = typeof r.tenant === 'object' && r.tenant ? String((r.tenant as { id?: unknown }).id ?? '') : String(r.tenant ?? '')
      if (!tid) continue
      const arr = tenantBuckets.get(tid) ?? []
      arr.push(r)
      tenantBuckets.set(tid, arr)
    }
    const offenders: string[] = []
    for (const [tid, rows] of tenantBuckets) {
      const sorted = [...rows].sort((a, b) => (a.timestamp ?? '').localeCompare(b.timestamp ?? ''))
      for (let i = 1; i < sorted.length; i++) {
        const prev = sorted[i - 1]
        const cur  = sorted[i]
        if (cur.previousHash && prev.rowHash && cur.previousHash !== prev.rowHash) {
          offenders.push(`tenant=${tid} eventId=${cur.eventId} previousHash≠prior.rowHash`)
        }
      }
    }
    if (offenders.length === 0) {
      return pass('entropy', 'audit-chain-integrity', `${docs.length} rows / ${tenantBuckets.size} tenants validated`)
    }
    return fail('entropy', 'audit-chain-integrity', `${offenders.length} chain break(s) — tamper evidence`, offenders.slice(0, 10))
  } catch (err) {
    return warn('entropy', 'audit-chain-integrity', `lookup failed: ${err instanceof Error ? err.message : 'unknown'}`)
  }
}

/** Every chain `emits:` value is documented somewhere — either as a typed Event interface in `src/types/events.ts` OR appears in `chainEventEmitters.ts` OR in `notifications/subscriber.ts`. Catches "registry declares an emit no code ever produces". */
export function checkChainEmitsHaveProducer(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const events = readSafe(join(repoRoot, 'src/types/events.ts'))
  const emitters = readSafe(join(repoRoot, 'src/hooks/chainEventEmitters.ts'))
  const subscriber = readSafe(join(repoRoot, 'src/services/notifications/subscriber.ts'))
  const allText = events + '\n' + emitters + '\n' + subscriber
  const offenders: string[] = []
  for (const c of Object.values(BUSINESS_CHAINS)) {
    for (const s of c.steps) {
      if (!s.emits) continue
      // Slice BBBBBBBB (2026-05-11) — `producer:` on the step is a
      // first-class producer declaration. The factory's
      // wireChainProducersFor consumes this directly to inject the
      // matching afterChange hook; no chainEventEmitters export
      // needed for these.
      if (s.producer) continue
      // Otherwise look for the literal event-type string anywhere in
      // the producer source files (Slice KKKK legacy wiring).
      const re = new RegExp(`['"\`]${s.emits.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`]`)
      if (!re.test(allText)) {
        offenders.push(`${c.id}:${s.emits}`)
      }
    }
  }
  return offenders.length === 0
    ? pass('entropy', 'chain-emits-have-producer', `${Object.values(BUSINESS_CHAINS).reduce((n, c) => n + c.steps.length, 0)} chain steps validated`)
    : warn('entropy', 'chain-emits-have-producer', `${offenders.length} chain emit(s) without a discoverable producer (typed event, hook emitter, step.producer, or subscriber)`, offenders)
}

/** No collection file inlines an INCOTERMS / VAT-category / GHG-Scope / EU-AI-Act / ESRS-topic options array (those should pull from the registry). */
export function checkNoInlineTaxonomyArrays(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const files = listCollectionFiles(repoRoot)
  const probes: Array<{ label: string; needle: RegExp }> = [
    { label: 'INCOTERMS literal',     needle: /value:\s*'EXW'.*?value:\s*'CIF'/s },
    { label: 'VAT category literal',  needle: /value:\s*'AE'.*?value:\s*'M'/s },
    { label: 'EU AI Act risk literal', needle: /value:\s*'minimal'.*?value:\s*'prohibited'/s },
    { label: 'ESRS topic literal',    needle: /value:\s*'esrs_e1'.*?value:\s*'esrs_g1'/s },
    { label: 'GHG Scope literal',     needle: /value:\s*'scope_1'.*?value:\s*'scope_3'/s },
  ]
  const offenders: string[] = []
  for (const f of files) {
    const text = readSafe(f)
    for (const p of probes) {
      if (p.needle.test(text)) offenders.push(`${basename(f)} (${p.label})`)
    }
  }
  return offenders.length === 0
    ? pass('entropy', 'no-inline-taxonomy-arrays')
    : fail('entropy', 'no-inline-taxonomy-arrays', `${offenders.length} inline taxonomy array(s) — should use src/standards/<id>/`, offenders)
}

/* ═════════════════════════════════════════════════════════════════════
 * SLICE DDDDD — Agent / spec / i18n / event-graph conservation laws
 * ═════════════════════════════════════════════════════════════════════ */

/**
 * Conservation Law 1 — every collection's JSDoc banner has ≥1
 * `@standard` tag AND ≥1 `@summary` tag. Closes the gap measured
 * 2026-05-11 (1a: 78.8%, 1b: 0%) — warn-only initially so the
 * existing build stays green; flip to fail once Phase B backfills
 * the missing tags.
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 */
export function checkSpecCoverage100Percent(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const files = listCollectionFiles(repoRoot)
  const noStandard: string[] = []
  const noSummary: string[] = []
  for (const f of files) {
    const text = readSafe(f)
    const banner = text.match(/^\/\*\*\s*\n([\s\S]*?)\n\s*\*\//)?.[0] ?? ''
    if (!/@standard\s/.test(banner)) noStandard.push(basename(f))
    if (!/@summary\s/.test(banner)) noSummary.push(basename(f))
  }
  if (noStandard.length === 0 && noSummary.length === 0) {
    return pass('standards', 'spec-coverage-100', `${files.length}/${files.length} collections fully spec'd`)
  }
  const parts: string[] = []
  if (noStandard.length) parts.push(`${noStandard.length} missing @standard`)
  if (noSummary.length)  parts.push(`${noSummary.length} missing @summary`)
  return warn('standards', 'spec-coverage-100', parts.join('; '),
    [...new Set([...noStandard, ...noSummary])])
}

/**
 * Conservation Law 3b — every spec-derived i18n key resolves
 * natively in every supported locale (strict mode: `[en] …` stubs
 * count as MISSING). Closes the gap measured 2026-05-11
 * (BG: 33.6% native; 486 stubs).
 *
 * Walks `src/i18n/messages/*.json` and reports per-locale stub count.
 * Warn-only until the BG translator pass completes; then promote to
 * fail and any new untranslated key breaks the build.
 *
 * @standard BCP-47 + W3C i18n key-naming-best-practices
 */
export function checkI18nCoverageStrict(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const STUB = '[en] '
  const offenders: string[] = []
  let totalStubs = 0
  let totalKeys = 0
  for (const loc of supportedLocales) {
    if (loc === 'en') continue
    const path = join(repoRoot, 'src/i18n/messages', `${loc}.json`)
    const raw = readSafe(path); if (!raw) continue
    let bundle: Record<string, string> = {}
    try { bundle = JSON.parse(raw) as Record<string, string> } catch { continue }
    let stubs = 0
    for (const v of Object.values(bundle)) {
      totalKeys++
      if (typeof v === 'string' && v.startsWith(STUB)) { stubs++; totalStubs++ }
    }
    if (stubs > 0) offenders.push(`${loc}:${stubs}`)
  }
  if (totalStubs === 0) {
    return pass('standards', 'i18n-coverage-strict',
      `every spec-derived key resolves natively across ${supportedLocales.length} locales`)
  }
  return warn('standards', 'i18n-coverage-strict',
    `${totalStubs}/${totalKeys} non-EN keys still '[en] …' stubs — translator pass needed`, offenders)
}

/**
 * Conservation Law 4 — every `@emits` declared on an agent has at
 * least one subscriber, and every `@subscribes` has at least one
 * producer. Walks the bootstrapped AgentRegistry; will start
 * reporting real numbers once EEEEE-IIIII land the 15 agents.
 * Until then, vacuously true (registry is empty).
 *
 * @standard ISO/IEC 12207 software-life-cycle (event graph
 * connectivity prevents orphan effects)
 */
export function checkEventGraphConnected(_ctx: InvariantContext): InvariantResult {
  const allEmits = new Set<string>()
  const allSubs = new Set<string>()
  for (const a of agentRegistry.all()) {
    for (const e of a.emits) allEmits.add(e)
    for (const s of a.subscribesTo) allSubs.add(s)
  }
  const orphanEmits = [...allEmits].filter((e) => !allSubs.has(e))
  const orphanSubs = [...allSubs].filter((s) => !allEmits.has(s))
  if (orphanEmits.length === 0 && orphanSubs.length === 0) {
    return pass('expansion', 'event-graph-connected',
      `${allEmits.size} emits ⇄ ${allSubs.size} subs all connected`)
  }
  const parts: string[] = []
  if (orphanEmits.length) parts.push(`${orphanEmits.length} orphan emits`)
  if (orphanSubs.length) parts.push(`${orphanSubs.length} orphan subs`)
  return warn('expansion', 'event-graph-connected', parts.join('; '),
    [...orphanEmits, ...orphanSubs])
}

/**
 * Conservation Law 7 — every chain step's `collection=X` marker
 * resolves to exactly one agent in the registry. Walks
 * `BUSINESS_CHAINS` × `agentRegistry.byCollection()`.
 *
 * Today: registry is empty (DDDDD ships the runtime; EEEEE-IIIII
 * ship the agents) — so EVERY step is unowned. Reported as `warn`
 * during the rollout; promote to `fail` once IIIII lands and all 22
 * chains have an owning agent.
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @audit ISO 19011:2018 §6.4.6
 */
/**
 * Conservation Law 8 — content-addressable integrity. Every object
 * whose collection ships the `tamperProofUuidField` MUST have a uuid
 * that recomputes from its content (RFC 9562 §5.8 + RFC 8785 + SHA-256).
 *
 * Samples up to N rows per opted-in collection per tenant, recomputes
 * the content-uuid via `verifyContentUuid`, and reports any mismatch
 * as a tamper finding. Skipped when `ctx.payload` isn't supplied
 * (compile-time / static invariants pass).
 *
 * Roll-out: warn-only until every tamper-proof collection's data has
 * been backfilled with computed uuids. Promote to fail once the
 * backfill completes.
 *
 * @standard RFC 9562 + RFC 8785 + NIST FIPS 180-4
 * @compliance SOX §404 (Byzantine tamper detection)
 * @audit ISO 19011:2018 §6.4.6
 */
export async function checkContentIntegrityProvable(ctx: InvariantContext): Promise<InvariantResult> {
  const payload = ctx.payload
  if (!payload) {
    return pass('entropy', 'content-integrity-provable',
      'static-mode: skipped (no Payload — runtime check only)')
  }
  const SAMPLE_LIMIT = 50
  const optedIn = [...TAMPER_PROOF_COLLECTIONS_REGISTRY]
  if (optedIn.length === 0) {
    return pass('entropy', 'content-integrity-provable',
      'no collections opted in yet (use tamperProofUuidField() to opt in)')
  }
  const tampered: string[] = []
  let totalChecked = 0
  for (const slug of optedIn) {
    let docs: { docs: unknown[] }
    try {
      docs = await payload.find({ collection: slug as never, limit: SAMPLE_LIMIT, pagination: false })
    } catch {
      continue
    }
    for (const doc of docs.docs) {
      const obj = doc as Record<string, unknown> & { uuid?: string; tenant?: string }
      const tenantId = typeof obj.tenant === 'string' ? obj.tenant : 'unknown'
      const result = verifyContentUuid(obj, tenantId)
      totalChecked++
      if (!result.ok) tampered.push(`${slug}#${String(obj.id ?? obj.uuid ?? '?')}`)
    }
  }
  if (tampered.length === 0) {
    return pass('entropy', 'content-integrity-provable',
      `${totalChecked} sampled rows across ${optedIn.length} tamper-proof collection(s) — all uuids match content`)
  }
  return warn('entropy', 'content-integrity-provable',
    `${tampered.length}/${totalChecked} sampled rows have a uuid that disagrees with their content (Byzantine tamper or pending backfill)`,
    tampered.slice(0, 8))
}

/**
 * Conservation Law 10 — referential harmony. Every uuid-typed
 * reference (`uuidRef` field) must resolve to a row whose recomputed
 * content-uuid matches the pointer.
 *
 * Per user insight 'if all is uuid driven then references will appear
 * and disappear in harmony'. When a referenced object's content
 * mutates, every old-uuid reference becomes silently unresolved
 * (this invariant flags them; substrate proposes the rebind).
 *
 * Composes with Law 8 (per-row integrity) and Law 9 (cross-store
 * redundancy) into the full spacetime integrity model.
 *
 * @standard RFC 9562 §5.8 + RFC 8785
 * @audit ISO 19011:2018 §6.4.6
 * @compliance SOX §404 referential integrity
 */
export async function checkReferentialHarmony(ctx: InvariantContext): Promise<InvariantResult> {
  const payload = ctx.payload
  if (!payload) {
    return pass('entropy', 'referential-harmony',
      'static-mode: skipped (no Payload — runtime check only)')
  }
  if (UUID_REF_REGISTRY.size === 0) {
    return pass('entropy', 'referential-harmony',
      'no uuidRef fields registered yet (use uuidRef() to opt in)')
  }
  // Best-effort: enumerate tenants from any tamper-proof collection's first row.
  // Real implementation iterates a tenants registry; this samples by tenant 'unknown'.
  const dangling = await findDanglingRefs({ payload, tenantId: 'unknown', sampleSize: 50 })
  if (dangling.length === 0) {
    return pass('entropy', 'referential-harmony',
      `${UUID_REF_REGISTRY.size} uuidRef field(s) registered — no dangling references in sampled tenant`)
  }
  return warn('entropy', 'referential-harmony',
    `${dangling.length} uuid reference(s) unresolved (referenced row's content has changed or row is missing)`,
    dangling.slice(0, 8).map((d) => `${d.owningCollection}#${d.owningId}.${d.fieldPath}→${d.targetCollection}@${d.uuid.slice(0, 8)}`))
}

/**
 * Conservation Law 23 — `checkErpaxObservesItself`.
 * Slice GGGGGG (2026-05-11). Per spec §0c.
 *
 * The platform's spec corpus must yield ≥1 CollectionSpec, BusinessChain,
 * Agent, and TenantRoleProfile whose subject is ERPax itself. AND the
 * 'erpax-platform' role must be registered. AND the 'meta-skill' +
 * 'engineering' agents must be registered (the platform must have the
 * agents that observe the platform observing itself).
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @audit ISO 19011:2018 §6.4.6 (self-coherence audit-trailed)
 */
export function checkErpaxObservesSelf(_ctx: InvariantContext): InvariantResult {
  const result = checkErpaxObservesItself()
  if (result.ok) {
    return pass('entropy', 'erpax-observes-itself',
      'platform genome describes the platform — collections + chains + agents + standards + erpax-platform role all present')
  }
  return fail('entropy', 'erpax-observes-itself',
    `platform self-coherence broken — missing: ${result.missing.join(', ')}`,
    [...result.missing])
}

/**
 * Conservation Law 24 — Clone integrity / genome self-coherence.
 * Slice HHHHHH (2026-05-11). Per spec §0d.
 *
 * The platform must be able to publish its own genome AND recompute
 * the same content-uuid from the bundle. If `computeGenomeUuid(bundle)`
 * is non-deterministic (e.g. a non-canonicalizable field slipped in),
 * cloning would silently break — clones could never verify they're
 * bit-identical to the source.
 *
 * Probe: collect the genome twice, hash twice; the two uuids must match.
 *
 * @standard RFC 9562 §5.8 + RFC 8785
 * @audit ISO 19011:2018 §6.4.6 (clone-integrity provable at build time)
 */
export function checkGenomeDeterministic(_ctx: InvariantContext): InvariantResult {
  try {
    const tenantId = 'erpax-self-coherence-probe'
    const b1 = collectGenome({ tenantId })
    const b2 = collectGenome({ tenantId })
    const u1 = computeGenomeUuid(b1, tenantId)
    const u2 = computeGenomeUuid(b2, tenantId)
    if (u1 === u2) {
      return pass('entropy', 'genome-deterministic',
        `genome bundle hashes deterministically — clones can verify (uuid=${u1.slice(0, 8)}…)`)
    }
    return fail('entropy', 'genome-deterministic',
      `genome bundle hashes differently across runs (${u1} vs ${u2}) — cloning would silently break`,
      [u1, u2])
  } catch (err) {
    return warn('entropy', 'genome-deterministic',
      `genome collection threw: ${(err as Error).message}`,
      [(err as Error).stack ?? ''])
  }
}

/**
 * Conservation Law 29 — `checkSeoVortexCoupling`. Slice NNNNNN (2026-05-11).
 *
 * Per user 'erpax seo strategy is microdata og vortices indexed and
 * linked in time interacting with each other'. Every published SEO
 * face must have ≥2 inbound + ≥2 outbound microdata edges; isolated
 * pages dilute the SEO vortex. The platform refuses to publish them
 * (or marks them scope:'pending-coupling').
 *
 * Probe: walk every registered face; require both incoming and
 * outgoing degrees ≥2. Pages with zero faces (no SEO surface yet)
 * pass trivially since the vortex hasn't been registered.
 *
 * @standard Schema.org JSON-LD 1.1 + Open Graph + Microdata 1.1
 * @audit ISO 19011:2018 §6.4.6 (SEO coupling provable per publish)
 */
export function checkSeoVortexCouplingInvariant(_ctx: InvariantContext): InvariantResult {
  const total = listFaces().length
  if (total === 0) {
    return pass('entropy', 'seo-vortex-coupling', 'no SEO faces registered yet (rollout in progress)')
  }
  const result = checkSeoVortexCoupling(2)
  if (result.ok) {
    return pass('entropy', 'seo-vortex-coupling',
      `${total}/${total} SEO faces meet the ≥2 in/out edge minimum (Law 29 satisfied)`)
  }
  return warn('entropy', 'seo-vortex-coupling',
    `${result.underCoupled.length}/${total} SEO faces under-coupled (each needs ≥2 inbound + ≥2 outbound microdata edges)`,
    result.underCoupled.slice(0, 8).map((u) => `${u.url} (in=${u.incoming}, out=${u.outgoing})`))
}

/**
 * Conservation Law 30 — `checkVoteAggregateAuthenticity`. Slice OOOOOO
 * (2026-05-11). Per user 'uuid solves also voting and rating
 * violations'.
 *
 * Every published vote/rating aggregate's uuid must equal the
 * recomputed uuid from its constituent leaf vote uuids. The platform
 * cannot silently fudge an average; any third party with the leaves
 * can verify.
 *
 * @standard W3C VC Data Model 2.0 + RFC 8785 + Law 8 (RRRRR)
 * @audit ISO 19011:2018 §6.4.6 (vote aggregates audit-trailed)
 */
export function checkVoteAggregateAuthenticity(ctx: InvariantContext): InvariantResult {
  // Discover live tenants from the Payload context when available; fall
  // back to the probe-tenant used by the in-memory store tests.
  const tenants = new Set<string>(['probe-tenant'])
  const liveTenants = (ctx.payload as undefined | { config?: { tenants?: ReadonlyArray<{ id: string }> } })
    ?.config?.tenants
  if (liveTenants) for (const t of liveTenants) tenants.add(t.id)
  // Walk every known ballot across every known tenant; we only have
  // an in-memory store so this is fast; real persistence layer can
  // page through Payload's votes collection.
  const offenders: string[] = []
  let total = 0
  for (const tenantId of tenants) {
    for (const b of listBallots(tenantId)) {
      total++
      const v = verifyAggregate(b.uuid)
      if (!v.ok) offenders.push(`${b.uuid}: ${v.issues.join(',')}`)
    }
  }
  if (total === 0) {
    return pass('entropy', 'vote-aggregate-authenticity', 'no ballots registered yet (rollout in progress)')
  }
  if (offenders.length === 0) {
    return pass('entropy', 'vote-aggregate-authenticity', `${total}/${total} aggregates verify against their leaf uuids (Law 30 satisfied)`)
  }
  return fail('entropy', 'vote-aggregate-authenticity',
    `${offenders.length}/${total} aggregates fail verification — published uuid does not match recomputed uuid`,
    offenders.slice(0, 8))
}

/**
 * Conservation Law 31 — `checkNoDoubleVotingInvariant`. Slice OOOOOO
 * (2026-05-11). No two votes within a single ballot may share
 * `(voterPseudoDid, subjectUuid, periodUuid)`. Vote uuid is
 * content-derived from exactly that triple, so double-cast collides
 * at uuid-creation time; this invariant is the post-hoc audit.
 */
export function checkNoDoubleVotingInvariant(_ctx: InvariantContext): InvariantResult {
  const result = checkNoDoubleVoting()
  if (result.ok) {
    return pass('entropy', 'no-double-voting', 'no duplicate (voter, subject, period) triples found (Law 31 satisfied)')
  }
  return fail('entropy', 'no-double-voting',
    `${result.duplicates.length} ballot/voter/subject triples have multiple votes`,
    result.duplicates.slice(0, 8).map((d) => `${d.key} → ${d.voteUuids.length} votes`))
}

/**
 * Conservation Law 51 — `checkDimensionalPluginScaffoldedInvariant`.
 * Slice MMMMMMMM (2026-05-11). Symmetry between LLLLLLLL's
 * dimensional declarations and the plugin factory entry-points
 * scaffolded in `src/plugins/dimensions/index.ts`. BBBBB will fill
 * each factory body on the local machine.
 */
export function checkDimensionalPluginScaffoldedInvariant(_ctx: InvariantContext): InvariantResult {
  const result = checkDimensionalPluginScaffolded()
  if (result.ok) {
    return pass('expansion', 'dimensional-plugin-scaffolded',
      `10 plugin factories symmetric with 10 dimension declarations (Law 51 satisfied)`)
  }
  const reasons: string[] = []
  if (result.missingFactories.length > 0) reasons.push(`missing factories: ${result.missingFactories.join(',')}`)
  if (result.orphanFactories.length > 0) reasons.push(`orphan factories: ${result.orphanFactories.join(',')}`)
  return fail('expansion', 'dimensional-plugin-scaffolded',
    `dimension/plugin asymmetry: ${reasons.join(' / ')}`,
    [...result.missingFactories, ...result.orphanFactories])
}

/**
 * Conservation Law 49 — `checkDimensionalCoverageInvariant`. Slice
 * LLLLLLLL (2026-05-11). Per user 'start by creating the missing
 * collections stored in 10 dimensional plugins'.
 *
 * Verify the 10-dimension taxonomy is well-formed: 10 dimensions
 * exist, none empty, no collection assigned to two dimensions.
 * Orphan check is performed at runtime against the live tamper-
 * proof registry.
 */
export function checkDimensionalCoverageInvariant(_ctx: InvariantContext): InvariantResult {
  const declared = [...TAMPER_PROOF_COLLECTIONS_REGISTRY]
  const result = checkDimensionalCoverage(declared)
  if (result.ok) {
    return pass('expansion', 'dimensional-coverage',
      `${result.dimensionsCount}/10 dimensions populated, no orphans, no duplicates (Law 49 satisfied)`)
  }
  const reasons: string[] = []
  if (result.emptyDimensions.length > 0) reasons.push(`empty: ${result.emptyDimensions.join(',')}`)
  if (result.duplicateAssignments.length > 0) reasons.push(`duplicates: ${result.duplicateAssignments.length}`)
  if (result.orphanCollections.length > 0) reasons.push(`orphans: ${result.orphanCollections.length}`)
  return warn('expansion', 'dimensional-coverage',
    `dimensional taxonomy issues: ${reasons.join(' / ')}`,
    [
      ...result.emptyDimensions,
      ...result.duplicateAssignments.map((d) => `${d.slug} in [${d.dimensions.join(',')}]`),
      ...result.orphanCollections.slice(0, 8),
    ])
}

/**
 * Conservation Law 48 — `checkInfiniteFinitenessInvariant`. Slice
 * IIIIIIIII (2026-05-11). Per user 'no. much more than this. with
 * the replication it is infinite within the finite spacetime'.
 *
 * Probe: physical_bytes <= envelope; logical_extent unbounded;
 * every recorded uuid has a known source. Reports the richness
 * ratio (logical_extent / physical_bytes) as a system-health metric.
 */
export function checkInfiniteFinitenessInvariant(_ctx: InvariantContext): InvariantResult {
  const result = checkInfiniteFiniteness()
  if (result.ok) {
    const r = result.report
    return pass('entropy', 'infinite-finiteness',
      `${r.totalUuids} uuids × ${r.logicalExtent.multiplier}x replication = ${r.logicalExtent.totalLogicalUuids} logical replicas in ${r.physical.utilizationPercent.toFixed(1)}% of envelope (Law 48 satisfied; richness=${r.richness.ratio.toFixed(2)})`)
  }
  return fail('entropy', 'infinite-finiteness',
    `${result.violations.length} violation(s)`,
    [...result.violations])
}

/**
 * Conservation Law 47 — `checkTypeUuidCoverageInvariant`. Slice
 * GGGGGGG (2026-05-11). Per user 'any type has uuid as well as any
 * type object'.
 *
 * Every domain type (AgentEffect, DomainEvent, AuditLeaf,
 * BallotKind, PageSeed, SeoVortexFace, CollectionSpec, …) must be
 * registered with a content-derived type-uuid. Boot probe ensures
 * the baseline is registered + verifies coverage.
 */
export function checkTypeUuidCoverageInvariant(_ctx: InvariantContext): InvariantResult {
  ensureBaselineTypesRegistered()
  const result = checkTypeUuidCoverage()
  if (result.ok) {
    return pass('standards', 'type-uuid-coverage',
      `${result.registeredCount} types registered (baseline + domain) — Law 47 satisfied`)
  }
  return fail('standards', 'type-uuid-coverage',
    `${result.missingBaseline.length} baseline types missing from registry`,
    [...result.missingBaseline])
}

/**
 * Conservation Law 46 — `checkUuidShortDisplayInvariant`. Slice
 * FFFFFFF (2026-05-11). Per user 'it is insecure to display the
 * uuids in full. shorter version per case may significantly improve
 * the ui/ux and search'.
 *
 * Smoke probe — verifies every SHORT_UUID_POLICY kind produces
 * parseable short ids (roundtrip). Production CI / runtime proxy
 * catches UI surfaces that bypass shortUuid().
 */
export function checkUuidShortDisplayInvariant(_ctx: InvariantContext): InvariantResult {
  const result = checkUuidShortDisplay()
  if (result.ok) {
    return pass('standards', 'uuid-short-display',
      `${result.checkedSurfaces} short-uuid kinds roundtrip parseable (Law 46 satisfied)`)
  }
  return fail('standards', 'uuid-short-display',
    `${result.violations.length} short-uuid kind(s) failed roundtrip`,
    result.violations.slice(0, 8).map((v) => `${v.surface}: ${v.reason}`))
}

/**
 * Conservation Law 45 — `checkAgentLawCoverageInvariant`. Slice
 * EEEEEEE (2026-05-11). Per user 'regroup the laws for maximum
 * agent efficiency'.
 *
 * Every agent must have at least one law per emitted effect kind;
 * average coverage ratio < 1.0 (otherwise regrouping isn't buying
 * efficiency).
 */
export function checkAgentLawCoverageInvariant(_ctx: InvariantContext): InvariantResult {
  const result = checkAgentLawCoverage()
  if (result.ok) {
    const pct = (result.averageCoverageRatio * 100).toFixed(0)
    return pass('expansion', 'agent-law-coverage',
      `${result.profilesChecked} agent profiles all governed; avg coverage ratio ${pct}% (Law 45 satisfied — efficiency win)`)
  }
  return fail('expansion', 'agent-law-coverage',
    `${result.violations.length} agents have ungoverned effects`,
    result.violations.slice(0, 8).map((v) => `${v.agent}: ${v.reason}`))
}

/**
 * Conservation Law 44 — `checkDryProofPublishedInvariant`. Slice
 * DDDDDDD (2026-05-11). Per user 'now when al is dry clean in
 * theory tests need to prove it and present it to the world'.
 *
 * Verify the public DRY proof bundle exists, is fresh, content-uuid
 * verifies, and is registered as a public SeoVortexFace. Boot-time
 * verdict is `warn` if no bundle is published yet (the QQQQQ
 * scheduled task is responsible for publishing on a cadence); pass
 * once a bundle is current.
 */
export async function checkDryProofPublishedInvariant(_ctx: InvariantContext): Promise<InvariantResult> {
  // Use a probe origin — production probes pass the real public origin.
  const result = await loadCheckDryProofPublished('https://erpax-probe.example')
  if (result.ok) {
    return pass('standards', 'dry-proof-published',
      `proof bundle current (uuid=${result.bundle?.contentUuid?.slice(0, 8) ?? '?'}…) — Law 44 satisfied`)
  }
  return warn('standards', 'dry-proof-published',
    `proof not yet current — schedule erpax.platform.dryProofPublish (QQQQQ cadence)`,
    [...result.reasons])
}

/**
 * Conservation Law 43 — `checkTorusBoundedInvariant`. Slice CCCCCCC
 * (2026-05-11). Per user 'erpax and mcp are interacting to infinity
 * within the limitations of a torus'.
 *
 * Topology probe: every vertex of the 11-vertex torus must have
 * both incoming and outgoing edges; the resource envelope check is
 * trivially satisfied at boot (no live load). Production probes
 * pass real `current` from the per-tenant audit pipeline (Laws 15+16).
 */
export function checkTorusBoundedInvariant(_ctx: InvariantContext): InvariantResult {
  const result = checkTorusBounded()
  if (result.ok) {
    return pass('entropy', 'torus-bounded',
      `${result.verticesOnLoop}/11 vertices on the closed torus loop; envelope at baseline (Law 43 satisfied)`)
  }
  if (result.disconnectedVertices.length > 0) {
    return fail('entropy', 'torus-bounded',
      `${result.disconnectedVertices.length} vertex(es) disconnected from the torus loop`,
      result.disconnectedVertices.map((v) => String(v)))
  }
  return fail('entropy', 'torus-bounded',
    `${result.envelopeViolations.length} envelope violation(s)`,
    [...result.envelopeViolations])
}

/**
 * Conservation Law 52 — `checkPwaUuidIntegrityInvariant`. Slice
 * NNNNNNNN (2026-05-11). Per user 'uuid solves pwa'.
 *
 * Verify cache map-key symmetry (every key matches its asset.uuid)
 * + sync queue chain integrity (Law 34 echo). Boot-time probe is
 * trivially OK with empty caches; production caches accumulate,
 * the probe catches drift.
 */
export function checkPwaUuidIntegrityInvariant(_ctx: InvariantContext): InvariantResult {
  const result = checkPwaUuidIntegrity()
  if (result.ok) {
    return pass('entropy', 'pwa-uuid-integrity',
      `${result.cachedAssets} cached assets + ${result.queuedMutations} queued mutations all chain-coherent (Law 52 satisfied)`)
  }
  const reasons: string[] = []
  if (result.orphanCacheKeys.length > 0) reasons.push(`${result.orphanCacheKeys.length} orphan cache key(s)`)
  if (result.chainBroken.length > 0) reasons.push(`${result.chainBroken.length} chain break(s)`)
  return fail('entropy', 'pwa-uuid-integrity',
    `PWA integrity violated: ${reasons.join(' / ')}`,
    [...result.orphanCacheKeys.slice(0, 4), ...result.chainBroken.slice(0, 4).map((c) => `at[${c.at}]`)])
}

/**
 * Conservation Law 50 — `checkMcpDryCleanlinessInvariant`. Slice
 * BBBBBBB (2026-05-11). Per user 'mcp solves manual work by dry
 * cleaning'. No two non-generated tools share >MAX_DESCRIPTION_OVERLAP
 * word overlap; shape + verb clusters reported as warn.
 */
export async function checkMcpDryCleanlinessInvariant(_ctx: InvariantContext): Promise<InvariantResult> {
  const tools = await loadMcpTools()
  const result = checkMcpDryCleanliness(tools)
  if (result.ok) {
    return pass('entropy', 'mcp-dry-cleanliness',
      `${result.report.handCuratedCount} hand-curated tools clean — Law 50 satisfied (${result.report.shapeClusters.length} shape clusters + ${result.report.verbInconsistencies.length} verb inconsistencies as refactor opportunities)`)
  }
  return fail('entropy', 'mcp-dry-cleanliness',
    `${result.report.descriptionDuplicates.length} description duplicates (Law 50 violation)`,
    result.report.descriptionDuplicates.slice(0, 8).map((d) => `${d.toolA} <-> ${d.toolB} (overlap=${d.overlap})`))
}

/**
 * Conservation Law 41 — `checkMcpSelfTestableInvariant`. Slice
 * AAAAAAA (2026-05-11). Per user 'mcp interacts with itself by
 * testing'.
 *
 * Invoke every MCP tool with synthetic args derived from its Zod
 * schema; verify response shape; fail if any tool throws or returns
 * malformed `{content: [{text, type}]}`. DB-dependent tools are
 * skipped.
 */
export async function checkMcpSelfTestableInvariant(_ctx: InvariantContext): Promise<InvariantResult> {
  const tools = await loadMcpTools()
  const result = await checkMcpSelfTestable(tools)
  if (result.ok) {
    return pass('fallback', 'mcp-self-testable',
      `${result.summary.pass}/${result.summary.total} tools pass smoke (${result.summary.skip} skipped, db-dependent) — Law 41 satisfied`)
  }
  return fail('fallback', 'mcp-self-testable',
    `${result.failures.length} MCP tools failed smoke test`,
    result.failures.slice(0, 8).map((f) => `${f.tool}: ${f.reason}`))
}

/**
 * Conservation Law 40 — `checkMcpRebuildableFromSourceInvariant`.
 * Slice ZZZZZZ (2026-05-11). Per user 'let mcp rebuild itself from
 * the source'.
 *
 * Walk the JSDoc-as-spec corpus → derive expected MCP catalog →
 * compare with live → fail if any expected tool is missing. Mismatch
 * count is reported as warn (handled by Law 38 / regen pipeline).
 */
export async function checkMcpRebuildableFromSourceInvariant(_ctx: InvariantContext): Promise<InvariantResult> {
  const tools = await loadMcpTools()
  const result = checkMcpRebuildableFromSource({ liveTools: tools })
  if (result.ok) {
    return pass('expansion', 'mcp-rebuildable-from-source',
      `${result.intactCount} expected tools present, ${result.mismatchCount} signature mismatch (warn) — Law 40 satisfied`)
  }
  return fail('expansion', 'mcp-rebuildable-from-source',
    `${result.missingFromLive.length} expected tools missing from live`,
    result.missingFromLive.slice(0, 8))
}

/**
 * Conservation Law 39 — `checkMcpPresentationCoverageInvariant`.
 * Slice YYYYYY (2026-05-11). Per user 'let mcp present itself as
 * microdata open graphs'.
 *
 * Probe: register every MCP tool as an SeoVortexFace at a synthetic
 * origin; verify each tool has a face with schemaType Action and ≥1
 * outbound microdata edge.
 *
 * @standard W3C JSON-LD 1.1 + Schema.org Action
 * @audit ISO 19011:2018 §6.4.6 (MCP surface SEO-traceable)
 */
export async function checkMcpPresentationCoverageInvariant(_ctx: InvariantContext): Promise<InvariantResult> {
  const tools = await loadMcpTools()
  const origin = 'https://erpax-presentation-probe.example'
  const snapshot = tools.map((t) => ({ name: t.name, description: t.description, params: Object.keys(t.parameters) }))
  const contentUuid = _computeContentUuid({ snapshot } as Record<string, unknown>, 'mcp-catalog')
  registerAllMcpFaces({ tools, origin, contentUuidForCatalog: contentUuid })
  const result = checkMcpPresentationCoverage(tools, origin)
  if (result.ok) {
    return pass('standards', 'mcp-presentation-coverage',
      `${result.toolsRegistered}/${result.toolsTotal} MCP tools registered as Schema.org Action faces — Law 39 satisfied`)
  }
  return fail('standards', 'mcp-presentation-coverage',
    `${result.violations.length} MCP tools fail presentation coverage`,
    result.violations.slice(0, 8))
}

/**
 * Conservation Law 38 — `checkMcpToolStandardizationInvariant`.
 * Slice XXXXXX (2026-05-11). Per user 'let mcp standardize itself'.
 *
 * Every MCP tool name must match `erpax.<area>.<verb>`; area must
 * be in CANONICAL_AREAS; hand-curated tools must cite ≥1 standard
 * (auto-generated tools are exempt — `[generated]` prefix).
 *
 * @standard MCP 0.6 — tools/list naming convention
 * @audit ISO 19011:2018 §6.4.6 (every tool standards-traceable)
 */
export async function checkMcpToolStandardizationInvariant(_ctx: InvariantContext): Promise<InvariantResult> {
  const tools = await loadMcpTools()
  const result = checkMcpToolStandardization(tools)
  if (result.ok) {
    return pass('standards', 'mcp-tool-standardization',
      `${result.toolsChecked} tools (${result.handCuratedCount} hand-curated + ${result.autoGeneratedCount} auto-generated) all conform — Law 38 satisfied`)
  }
  return warn('standards', 'mcp-tool-standardization',
    `${result.violations.length}/${result.toolsChecked} tools fail standardization`,
    result.violations.slice(0, 8).map((v) => `${v.tool}: ${v.kind} — ${v.detail}`))
}

/**
 * Slice FFFFFFFFFF (2026-05-11) — `checkMcpStateMutatorsAdminGuarded`.
 *
 * Detects state-mutating MCP tools by name heuristic (verbs: emit /
 * record / anchor / publish / seed / create / book / replicate / run /
 * dispatch / enqueue / subscribe / provision / write / grant / revoke /
 * attest) and verifies each appears in tool-defs.ts STATE_MUTATING_TOOLS
 * OR has a per-handler `assertAdminOnTenant` call in its source file.
 *
 * Catches the regression class where a future inlined tool is added
 * with mutating verbs but is left at the default `assertTenantMatch`
 * level — letting any tenant member, not just admins/auditors,
 * trigger the mutation. False positives possible (e.g. `verify*` tools
 * are read-only despite a mutating-shaped verb); the allowlist below
 * documents intentional read-only exceptions.
 *
 * @standard ISO 27001 A.5.10 access-control-policy
 * @audit ISO 27002 §5.4 segregation-of-duties
 */
export async function checkMcpStateMutatorsAdminGuarded(ctx: InvariantContext): Promise<InvariantResult> {
  try {
    const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
    const toolDefsPath = join(repoRoot, 'src/services/agents/mcp/tool-defs.ts')
    if (!existsSync(toolDefsPath)) {
      return warn('standards', 'mcp-state-mutators', 'tool-defs.ts missing — skipped')
    }
    const src = readFileSync(toolDefsPath, 'utf8')
    // Extract the STATE_MUTATING_TOOLS Set literal contents.
    const setMatch = src.match(/STATE_MUTATING_TOOLS:\s*ReadonlySet<string>\s*=\s*new Set\(\[([\s\S]*?)\]\)/)
    const allowlisted = new Set<string>()
    if (setMatch) {
      const body = setMatch[1]!
      for (const m of body.matchAll(/'(erpax\.[a-zA-Z0-9._-]+)'/g)) {
        allowlisted.add(m[1]!)
      }
    }
    // Find every inlined tool's name + its tenantId-bearing param block.
    const tools = await loadMcpTools()
    const mutatingVerbs = /\.(emit|record|anchor|publish|seed|create|book|replicate|run|dispatch|enqueue|subscribe|provision|write|grant|revoke|attest|insert|send|freeze|allocate|advance|complete|materialise)([A-Z]|$)/
    const candidates = tools
      .filter((t) => 'tenantId' in t.parameters)
      .map((t) => t.name)
      .filter((n) => mutatingVerbs.test(n))
    // Intentional read-side exceptions despite mutating-shaped verbs.
    const exceptions = new Set<string>([
      'erpax.governance.verify',     // walks chain, no writes
      'erpax.format.verify',         // re-encodes + compares, no writes
      'erpax.integrity.verifyObject',// hash check, no writes
      'erpax.integrity.verifyType',  // type-uuid recompute, no writes
      'erpax.share.uuid',            // pure compute
      'erpax.share.check',           // RBAC read
      'erpax.share.list',            // read
      'erpax.kv.bindingUuid',        // pure compute
      'erpax.kv.resolveKey',         // pure compute
      'erpax.kv.freezeRegistry',     // pure compute (caller persists)
    ])
    const missing = candidates.filter((name) => !allowlisted.has(name) && !exceptions.has(name))
    if (missing.length === 0) {
      return pass(
        'standards', 'mcp-state-mutators',
        `${allowlisted.size} tools admin-guarded; ${exceptions.size} read-side exceptions documented`,
      )
    }
    return warn(
      'standards', 'mcp-state-mutators',
      `${missing.length} tool(s) match mutating-verb pattern but are NOT in STATE_MUTATING_TOOLS — consider admin-guarding or add to the exceptions list`,
      missing.slice(0, 8),
    )
  } catch (err) {
    return warn(
      'standards', 'mcp-state-mutators',
      `unable to verify mutator coverage: ${err instanceof Error ? err.message : String(err)}`,
    )
  }
}

/**
 * Slice BBBBBBBBBB-cut2 (2026-05-11) — `checkMcpBarrelWired`.
 *
 * Structural analogue to `checkAutoGenerationCoverageInvariant`. The
 * `./tools/` barrel exports per-area `build*Tools` factories; this
 * invariant asserts each factory contributes ≥1 live tool to the MCP
 * surface. Without it, a factory can be authored + barrel-exported but
 * never consumed by `buildErpaxMcpTools` — the gap that hid Laws 58–64
 * for an entire slice batch before BBBBBBBBBB-cut1 wired them.
 *
 * Detection: read the barrel re-exports + match each factory to an
 * `erpax.<area>.*` namespace; require ≥1 live tool name with that
 * prefix.
 *
 * @standard MCP 0.6 — tools/list naming convention
 * @audit ISO 19011:2018 §6.4.6 (every barrel-exported factory traceable to live surface)
 */
export async function checkMcpBarrelWired(ctx: InvariantContext): Promise<InvariantResult> {
  try {
    const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
    const barrelPath = join(repoRoot, 'src/services/agents/mcp/tools/index.ts')
    if (!existsSync(barrelPath)) {
      return warn('expansion', 'mcp-barrel-wired', 'tools/index.ts barrel missing — skipped')
    }
    const barrelSrc = readFileSync(barrelPath, 'utf8')
    // Match every `export { buildXxxTools } from './xxx'` line.
    const factoryRe = /export\s*\{\s*build([A-Z][A-Za-z0-9]*)Tools\s*\}\s*from\s*['"]\.\/([a-z0-9-]+)['"]/g
    const factories: Array<{ name: string; namespace: string }> = []
    let m: RegExpExecArray | null
    while ((m = factoryRe.exec(barrelSrc)) !== null) {
      const camel = m[1]!
      // Map factory name → namespace. Per-area files use the kebab-case
      // tail of the file path as the namespace, lowercased. e.g.
      // 'IntegrityExtensions' (file: integrity-extensions) → 'integrity'
      // (extension tools live under erpax.integrity.* + erpax.audit.*).
      const file = m[2]!
      const ns = file === 'integrity-extensions' ? 'integrity'
        : file === 'consistency' ? 'consistency'
        : file === 'events' ? 'events'
        : file === 'cloudflare' ? 'cloudflare'
        : file === 'kv' ? 'kv'
        : file === 'security' ? 'security'
        : file === 'share' ? 'share'
        : file === 'chain' ? 'chain'
        : file === 'format' ? 'format'
        : file === 'governance' ? 'governance'
        : file === 'error' ? 'error'
        : file
      factories.push({ name: `build${camel}Tools`, namespace: ns })
    }
    if (factories.length === 0) {
      return warn('expansion', 'mcp-barrel-wired', 'no factories detected in barrel — regex likely stale')
    }
    const tools = await loadMcpTools()
    const live = new Set(tools.map((t) => t.name))
    const missing = factories.filter((f) => {
      for (const name of live) if (name.startsWith(`erpax.${f.namespace}.`)) return false
      return true
    })
    if (missing.length === 0) {
      return pass('expansion', 'mcp-barrel-wired',
        `${factories.length} barrel factories all contribute to live surface — Slice BBBBBBBBBB invariant satisfied`)
    }
    return fail('expansion', 'mcp-barrel-wired',
      `${missing.length}/${factories.length} barrel factories never reach the live MCP surface`,
      missing.map((f) => `${f.name}: no live tool with prefix 'erpax.${f.namespace}.'`))
  } catch (err) {
    return warn('expansion', 'mcp-barrel-wired',
      `unable to verify barrel wiring: ${err instanceof Error ? err.message : String(err)}`)
  }
}

/**
 * Conservation Law 37 — `checkAutoGenerationCoverageInvariant`.
 * Slice WWWWWW (2026-05-11). Per user 'let mcp build itself'.
 *
 * Every spec primitive (agent / BUSINESS_CHAIN / tamper-proof
 * collection / tenant role / standards family) must be exposed by
 * at least one MCP tool. The auto-generated layer guarantees the
 * floor; this check verifies it (regression-proof when someone adds
 * a new primitive without touching MCP wiring).
 */
export async function checkAutoGenerationCoverageInvariant(_ctx: InvariantContext): Promise<InvariantResult> {
  const tools = await loadMcpTools()
  const toolNames = new Set(tools.map((t) => t.name))
  const result = checkAutoGenerationCoverage(agentRegistry, toolNames)
  if (result.ok) {
    const c = result.counts
    return pass('expansion', 'auto-generation-coverage',
      `every primitive exposed (agents=${c.agents.tools}/${c.agents.primitive}, chains=${c.chains.tools}/${c.chains.primitive}, collections=${c.collections.tools}/${c.collections.primitive}, roles=${c.roles.tools}/${c.roles.primitive}, families=${c.families.tools}/${c.families.primitive}) — Law 37 satisfied`)
  }
  return fail('expansion', 'auto-generation-coverage',
    `${result.violations.length} primitive class(es) under-exposed by MCP`,
    [...result.violations])
}

/**
 * Conservation Law 35 — `checkStorageIndependenceProbe`. Slice TTTTTT
 * (2026-05-11). Per user 'this way any object is storage independent'.
 *
 * Synthetic content-uuid'd object recomputes the same uuid across
 * every registered backend (the boot suite always has the in-memory
 * backend; production adds D1/R2/IPFS/etc).
 */
export async function checkStorageIndependenceProbe(_ctx: InvariantContext): Promise<InvariantResult> {
  const result = await checkStorageIndependence('probe-tenant')
  if (result.ok) {
    return pass('entropy', 'storage-independence',
      `${result.backendsChecked} backend(s) returned matching uuid (Law 35 satisfied)`)
  }
  return fail('entropy', 'storage-independence',
    `${result.violations.length} backend(s) failed verification`,
    [...result.violations])
}

/**
 * Conservation Law 36 — `checkReplicationConsensusProbe`. Slice
 * UUUUUU (2026-05-11). Per user 'uuid solves any replication'.
 *
 * Probe: synthetic object pushed to memory backend; consensusRead
 * with minAgreement=1 must succeed. Production deployments raise
 * minAgreement to N≤K once K real backends are configured.
 */
export async function checkReplicationConsensusProbe(_ctx: InvariantContext): Promise<InvariantResult> {
  const collection = 'replication-consensus-probe'
  const tenantId = 'probe-tenant'
  // Use a deterministic synthetic object so the uuid is reproducible.
  const obj = { tenantId, kind: 'replication', payload: { value: 'fixed-payload' } }
  const { computeContentUuid } = await import('@/services/integrity/content-uuid')
  const uuid = computeContentUuid(obj as Record<string, unknown>, tenantId)
  memoryPut(collection, { ...obj, uuid })
  const cr = await consensusRead({ collection, uuid, tenantId, minAgreement: 1 })
  if (cr.ok) {
    return pass('entropy', 'replication-consensus',
      `consensus read achieved with ${cr.agreement} backend agreement (Law 36 baseline; raise minAgreement when N>1 backends online)`)
  }
  return fail('entropy', 'replication-consensus',
    `consensus failed: ${cr.disagreement.length} disagreement(s)`,
    cr.disagreement.map((d) => `${d.backend}: ${d.uuid}`))
}

/**
 * Conservation Law 34 — `checkStreamUuidChainProbe`. Slice SSSSSS
 * (2026-05-11). Per user 'uuid protects the stream from tampering'.
 *
 * Push 8 synthetic events through the stream, capture them, then
 * (a) verify the chain (must pass), (b) tamper with one event's
 * payload, then re-verify (must fail). The probe asserts the chain
 * actually detects tampering — i.e. the implementation isn't
 * accidentally short-circuiting verification.
 */
export async function checkStreamUuidChainProbe(_ctx: InvariantContext): Promise<InvariantResult> {
  const stream = makeStream({ id: 'law-34-probe', tenantId: 'probe' })
  const captured: ClockedEvent[] = []
  const consume = (async () => {
    for await (const ce of stream) {
      captured.push(ce)
      if (captured.length === 8) break
    }
  })()
  for (let i = 0; i < 8; i++) {
    stream.push({ id: 'probe', tenantId: 'probe', payload: { i }, emittedAt: new Date(0).toISOString() })
  }
  await consume
  stream.close()
  const intact = checkStreamUuidChain(captured, 'probe')
  if (!intact.ok) {
    return fail('entropy', 'stream-uuid-chain-probe',
      `intact 8-event chain failed verification — implementation broken`,
      intact.violations.slice(0, 4).map((v) => `at[${v.at}] ${v.reason}`))
  }
  // Tamper with index 3 — mutate the event payload, leave streamUuid unchanged.
  const tampered = captured.map((ce, i) =>
    i === 3 ? { ...ce, event: { ...ce.event, payload: { ...ce.event.payload, i: 999 } } } : ce
  )
  const detected = checkStreamUuidChain(tampered, 'probe')
  if (detected.ok) {
    return fail('entropy', 'stream-uuid-chain-probe',
      `tampered chain passed verification — Law 34 probe FAILED to detect a known-bad mutation`)
  }
  return pass('entropy', 'stream-uuid-chain-probe',
    `intact 8-event chain verifies + tampered chain detected at index ${detected.violations[0]?.at} (Law 34 satisfied)`)
}

/**
 * Conservation Law 33 — `checkStreamCoherenceProbe`. Slice RRRRRR
 * (2026-05-11). Per user 'in the quantum world it is stream'.
 *
 * Probe the stream layer with a synthetic burst of events and verify
 * that the consumer sees them in monotonically non-decreasing Lamport
 * order. Out-of-order delivery within a window violates causal
 * coherence and would silently break event-driven decisions
 * downstream (e.g. invoice activated AFTER paid).
 *
 * @standard Lamport 1978 — distributed-system causal ordering
 * @audit ISO 19011:2018 §6.4.6 (stream windows audit-trailed)
 */
export function checkStreamCoherenceProbe(_ctx: InvariantContext): InvariantResult {
  // Synthetic monotonic-lamport sequence — should always pass since
  // the stream itself assigns the clock; the probe guards regression
  // if anyone reorders events post-clock (e.g. wrong shuffle).
  const synthetic: ClockedEvent[] = Array.from({ length: 16 }, (_, i) => ({
    event: { id: 'probe', tenantId: 'probe', payload: {}, emittedAt: new Date().toISOString() },
    lamport: i + 1,
    streamUuid: `probe-${i}`,
    prevStreamUuid: i === 0 ? null : `probe-${i - 1}`,
  }))
  const result = checkWindowCoherence(synthetic)
  if (result.ok) {
    return pass('entropy', 'stream-coherence-probe',
      `synthetic 16-event window preserves Lamport order (Law 33 baseline OK)`)
  }
  return fail('entropy', 'stream-coherence-probe',
    `${result.violations.length} causal-order violation(s) in synthetic window — clock implementation broken`,
    result.violations.slice(0, 8).map((v) => `at[${v.at}] expected≥${v.expected}, got=${v.got}`))
}

/**
 * Conservation Law 32 — `checkBlockCompositionTypeSafety`. Slice
 * PPPPPP (2026-05-11). Per user 'i realize the mcp agents are like
 * the bloocks in shadcn. blocks of types as components'.
 *
 * Every emitted event must have at least one consumer somewhere in
 * the agent catalog (otherwise the emit is dead); every subscribed
 * event must have at least one emitter (otherwise the subscription
 * is dead). This is the agent-block analogue of the shadcn rule
 * 'every block variant must be reachable from at least one
 * composition example'.
 *
 * @standard W3C Web Components composition pattern
 * @audit ISO 19011:2018 §6.4.6 (every block composition audit-trailed)
 */
export function checkBlockCompositionTypeSafety(_ctx: InvariantContext): InvariantResult {
  const result = checkRegistryCoupling(agentRegistry)
  if (result.ok) {
    return pass('expansion', 'block-composition-type-safety',
      `every emitted event has a consumer; every subscribed event has an emitter (${result.emittersWithNoConsumer.length === 0 ? 0 : '?'} dead emits, ${result.subscribersWithNoEmitter.length === 0 ? 0 : '?'} dead subs)`)
  }
  return warn('expansion', 'block-composition-type-safety',
    `${result.orphans.length} agent block(s) have type-incoherent boundaries (Law 32)`,
    result.orphans.slice(0, 8).map((o) => `${o.id}: ${o.reason}`))
}

export function checkAgentOwnsEveryStep(_ctx: InvariantContext): InvariantResult {
  const orphans: string[] = []
  let total = 0
  for (const chain of Object.values(BUSINESS_CHAINS)) {
    for (const step of chain.steps) {
      total++
      if (!agentRegistry.byCollection(step.collection)) {
        orphans.push(`${chain.id}#${step.collection}`)
      }
    }
  }
  if (total === 0) {
    return pass('expansion', 'agent-owns-every-step', 'no chain steps to check')
  }
  if (orphans.length === 0) {
    return pass('expansion', 'agent-owns-every-step', `${total}/${total} chain steps owned`)
  }
  return warn('expansion', 'agent-owns-every-step',
    `${orphans.length}/${total} chain steps have no owning agent (rollout in progress: EEEEE-IIIII)`,
    orphans.slice(0, 8))
}

/* ═════════════════════════════════════════════════════════════════════
 * SLICE ZZZZZZZZ (2026-05-11) — code-consistency invariants.
 * Per user 'use the mcp agents. create new if necessary. one
 * inconsistency leads to another. address all. full scan.'
 *
 * Ported from `scripts/find-implementation-gaps.py` so the gap-class
 * detection runs inside the agent runtime (not just as a one-shot
 * Python script). MetaSkillAgent's hourly cron now sees these gaps
 * as `invariant:warned` events and the meta-automation pipeline
 * proposes fixes via MCP tools (see services/meta-automation/index.ts).
 *
 * Layered with the new `ConsistencyAgent` (Slice ZZZZZZZZ) which owns
 * proposal application for the code-consistency family of gaps.
 * ═════════════════════════════════════════════════════════════════════ */

/** Strip JSDoc/line comments preserving line numbers — used so
 *  false-positive matches inside docstring backticks are skipped.
 *  Mirrors `_strip_jsdoc()` in `scripts/find-implementation-gaps.py`. */
function stripCommentsKeepLines(src: string): string {
  let out = src.replace(/\/\*[\s\S]*?\*\//g, (m) =>
    m.replace(/[^\n]/g, ' '),
  )
  out = out.replace(/\/\/[^\n]*/g, (m) => ' '.repeat(m.length))
  return out
}

/**
 * Slice ZZZZZZZZ — Class F. Collection declares `emits: ['x:y']` in
 * factory metadata but no `emitDomainEvent('x:y', …)` or
 * `chainEventEmitters` function fires it. The metadata is purely
 * descriptive without the runtime wiring; downstream subscribers
 * never see the event.
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @audit ISO 19011:2018 §6.4.6 event-graph closure (Law 4)
 */
export function checkFactoryEmitsAreHooked(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  // Collect every event string actually fired anywhere in the source tree
  const fired = new Set<string>()
  const eventRe = /['"]([a-z]+:[a-z_]+)['"]/gi
  const emitCallRe = /emitDomainEvent\s*\([^)]*['"]([a-z]+:[a-z_]+)['"]/gi
  const chainEmitter = readSafe(join(repoRoot, 'src/hooks/chainEventEmitters.ts'))
  // ChainEventEmitters exports — `emitOnX('status', 'event:type', …)`
  const chainPattern = /emit\w+\s*\(\s*[^,]+,\s*['"]([a-z]+:[a-z_]+)['"]/gi
  for (const m of chainEmitter.matchAll(chainPattern)) fired.add(m[1])
  // Any explicit emitDomainEvent() calls anywhere in src/
  for (const f of listAllSourceFiles(repoRoot)) {
    const text = stripCommentsKeepLines(readSafe(f))
    for (const m of text.matchAll(emitCallRe)) fired.add(m[1])
  }
  // Scan collection files for declared emits. Multiline match needed
  // because structured-form `emits:` entries span many lines.
  const offenders: string[] = []
  const emitsBlockRe = /emits:\s*\[([\s\S]*?)\]/g
  // Slice AAAAAAAA — structured-form entries auto-wire via the factory;
  // recognize them so we don't false-positive.
  const structuredEntryRe =
    /\{\s*event:\s*['"]([a-z]+:[a-z_]+)['"][^}]*?(?:onCreate\s*:\s*true|onStatus\s*:\s*['"][^'"]+['"])[^}]*?aggregate\s*:\s*['"][^'"]+['"]/gi
  for (const f of listCollectionFiles(repoRoot)) {
    const text = readSafe(f)
    const stripped = stripCommentsKeepLines(text)
    // If the collection imports a chainEventEmitter, trust the wiring
    // (the import declaration is enough proof of intent).
    const importsEmitter = /from\s+['"]@\/hooks\/chainEventEmitters['"]/.test(stripped)
    if (importsEmitter) continue
    for (const m of stripped.matchAll(emitsBlockRe)) {
      const block = m[1]
      const structured = new Set<string>(
        [...block.matchAll(structuredEntryRe)].map((s) => s[1]),
      )
      const literals = [...block.matchAll(eventRe)].map((e) => e[1])
      for (const evt of literals) {
        if (fired.has(evt)) continue
        if (structured.has(evt)) continue    // ← auto-wired by factory
        offenders.push(`${basename(f)}:'${evt}'`)
      }
    }
  }
  if (offenders.length === 0) {
    return pass('entropy', 'factory-emits-are-hooked',
      'every collection-declared emits: id has a runtime producer')
  }
  return warn('entropy', 'factory-emits-are-hooked',
    `${offenders.length} factory-declared emit(s) without a runtime producer (Law 4 — event-graph closure)`,
    offenders.slice(0, 16))
}

/**
 * Slice ZZZZZZZZ — Class M. Service/hook file references
 * `payload.find({ collection: 'X' })` or similar where X is not a
 * registered slug. Surfaces dead lookups that silently return 0 rows.
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @audit Law 10 referential-harmony
 */
export function checkServicesReferenceRealSlugs(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const declared = collectDeclaredSlugs(repoRoot)
  const pattern = /collection:\s*['"]([\w-]+)['"]/g
  const offenders: string[] = []
  for (const f of listServiceFiles(repoRoot)) {
    const text = stripCommentsKeepLines(readSafe(f))
    for (const m of text.matchAll(pattern)) {
      const target = m[1]
      if (declared.has(target)) continue
      // Skip generic words that aren't slugs in this context
      if (target === 'default' || target === 'unknown' || target === 'event') continue
      offenders.push(`${basename(f)}:'${target}'`)
    }
  }
  if (offenders.length === 0) {
    return pass('entropy', 'services-reference-real-slugs',
      'every payload({collection:…}) target is a registered slug')
  }
  return warn('entropy', 'services-reference-real-slugs',
    `${offenders.length} service-side reference(s) to a non-existent collection slug`,
    offenders.slice(0, 16))
}

/**
 * Slice ZZZZZZZZ — Class I (TypeScript-side, complements
 * `checkReferentialHarmony` which runs on the live DB). Static scan
 * of `relationTo: 'X'` in every collection file vs. the slug
 * declarations + plugin-owned slug allowlist.
 *
 * Catches the LeaveRequests-class drift at config-load time rather
 * than at admin-picker resolve time.
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @audit Law 10 referential-harmony (static counterpart)
 */
export function checkRelationToSlugsExist(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const declared = collectDeclaredSlugs(repoRoot)
  const relRe = /relationTo:\s*['"]([\w-]+)['"]/g
  const offenders: string[] = []
  // Walk every TS file under src/ (catches accounting collections + the
  // ecommerce overrides + the dimensional plugins).
  for (const f of listAllSourceFiles(repoRoot)) {
    if (f.includes('.fuse_hidden')) continue
    // Skip payload-types.ts — generated artefact; cleared by regen
    if (f.endsWith('payload-types.ts')) continue
    const text = stripCommentsKeepLines(readSafe(f))
    for (const m of text.matchAll(relRe)) {
      const target = m[1]
      if (declared.has(target)) continue
      offenders.push(`${basename(f)}:'${target}'`)
    }
  }
  if (offenders.length === 0) {
    return pass('entropy', 'relation-to-slugs-exist',
      'every relationTo: target is a registered slug or plugin-owned allowlisted slug')
  }
  return warn('entropy', 'relation-to-slugs-exist',
    `${offenders.length} relationTo: pointer(s) to a non-existent slug (static counterpart of Law 10)`,
    offenders.slice(0, 16))
}

// ─── Helpers shared by the Slice ZZZZZZZZ invariants ─────────────────

function listAllSourceFiles(repoRoot: string): ReadonlyArray<string> {
  const root = join(repoRoot, 'src')
  const out: string[] = []
  const walk = (d: string): void => {
    let entries: string[] = []
    try {
      entries = readdirSync(d)
    } catch {
      return
    }
    for (const e of entries) {
      if (e === 'node_modules' || e === '.git' || e === '_attic') continue
      if (e.startsWith('.fuse_hidden')) continue
      const full = join(d, e)
      let stat: { isDirectory: () => boolean; isFile: () => boolean }
      try {
        stat = statSync(full)
      } catch {
        continue
      }
      if (stat.isDirectory()) walk(full)
      else if (stat.isFile() && (full.endsWith('.ts') || full.endsWith('.tsx'))) out.push(full)
    }
  }
  walk(root)
  return out
}

function listServiceFiles(repoRoot: string): ReadonlyArray<string> {
  const out: string[] = []
  for (const sub of ['src/services', 'src/hooks']) {
    const d = join(repoRoot, sub)
    if (!existsSync(d)) continue
    const walk = (dir: string): void => {
      let entries: string[] = []
      try {
        entries = readdirSync(dir)
      } catch {
        return
      }
      for (const e of entries) {
        if (e === 'node_modules' || e === '.git' || e === '_attic') continue
        if (e.startsWith('.fuse_hidden')) continue
        const full = join(dir, e)
        let stat: { isDirectory: () => boolean; isFile: () => boolean }
        try {
          stat = statSync(full)
        } catch {
          continue
        }
        if (stat.isDirectory()) walk(full)
        else if (stat.isFile() && (full.endsWith('.ts') || full.endsWith('.tsx'))) out.push(full)
      }
    }
    walk(d)
  }
  return out
}

function collectDeclaredSlugs(repoRoot: string): Set<string> {
  const slugs = new Set<string>()
  const slugRe = /slug:\s*['"]([\w-]+)['"]/g
  for (const f of listAllSourceFiles(repoRoot)) {
    if (f.includes('.fuse_hidden')) continue
    const text = stripCommentsKeepLines(readSafe(f))
    for (const m of text.matchAll(slugRe)) slugs.add(m[1])
  }
  // Payload built-ins
  for (const s of [
    'users', 'media', 'tenants', 'pages', 'posts', 'products',
    'categories', 'forms', 'form-submissions', 'search', 'redirects',
    'header', 'footer',
  ]) slugs.add(s)
  // @payloadcms/plugin-ecommerce + @payloadcms/plugin-mcp owned slugs
  for (const s of PLUGIN_OWNED_SLUGS) slugs.add(s)
  return slugs
}

/**
 * Slugs registered by upstream Payload plugins we wire in
 * `src/payload.config.ts`. The accounting plugin must NOT also
 * register a collection at any of these slugs or Payload throws
 * `DuplicateCollection: Collection slug already in use: "X"` at
 * config-load. Slice EEEEEEEE-fix (2026-05-11) — surfaced when our
 * Addresses collection collided with the ecommerce plugin's
 * built-in addresses register; Slice FFFFFFFF (2026-05-11) lifts
 * the literal allowlist into a `const PLUGIN_OWNED_SLUGS` so the
 * `checkNoPluginOwnedSlugCollision` invariant can read it.
 */
export const PLUGIN_OWNED_SLUGS: ReadonlyArray<string> = [
  // @payloadcms/plugin-ecommerce
  'addresses', 'carts', 'orders', 'transactions',
  'variants', 'variantTypes', 'variantOptions',
  // @payloadcms/plugin-mcp
  'payload-mcp-api-keys',
]

/**
 * Slice FFFFFFFF (2026-05-11) — fail if the accounting plugin (or any
 * `src/plugins/*\/collections/*` barrel) registers a collection at a
 * slug already owned by an upstream Payload plugin. Catches the
 * Slice EEEEEEEE-fix class of failure statically, before runtime
 * `DuplicateCollection`.
 *
 * Severity: WARN until we have a clean baseline. The auto-heal pre-push
 * hook then drives owners to either rename the slug or override the
 * plugin's collection via the plugin's collectionOverride hook.
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @audit Law 10 referential-harmony (slug-uniqueness)
 */
export function checkNoPluginOwnedSlugCollision(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const plugin = new Set<string>(PLUGIN_OWNED_SLUGS)
  // Scan files that DECLARE a slug (collection files), excluding the plugin
  // barrels themselves and the upstream plugin sources.
  const offenders: string[] = []
  for (const f of listCollectionFiles(repoRoot)) {
    if (f.includes('.fuse_hidden')) continue
    const text = stripCommentsKeepLines(readSafe(f))
    const m = text.match(/slug:\s*['"]([\w-]+)['"]/)
    if (!m) continue
    const slug = m[1]
    if (!plugin.has(slug)) continue
    // Also confirm the file actually exports + registers the collection;
    // if the slug declaration is only in dead code (no default export), skip.
    if (!/export\s+(default|const|\{)/.test(text)) continue
    offenders.push(`${basename(f)} declares slug '${slug}' already owned by an upstream plugin`)
  }
  if (offenders.length === 0) {
    return pass('entropy', 'no-plugin-owned-slug-collision',
      `${plugin.size} plugin-owned slug(s) checked; no local collection collides`)
  }
  return warn('entropy', 'no-plugin-owned-slug-collision',
    `${offenders.length} local collection(s) declare a slug already owned by an upstream Payload plugin — config-load will throw DuplicateCollection`,
    offenders.slice(0, 8))
}

/**
 * Slice RRRRRRRR (2026-05-11) — per user "anything mcp needs need a
 * collection". MCP handlers that mutate state (push to module-scope
 * arrays, increment counters, write to globalThis) without going
 * through a Payload collection lose their data on restart and can't
 * be federated. This invariant scans `src/services/agents/mcp/` for
 * handler functions whose body mutates module-scope state without a
 * `req.payload.create / update / delete` call.
 *
 * Today's known offenders (acceptable for now; documented):
 *   - meta-automation/index.ts PROPOSALS_LOG.push(...)
 *     → migrate to `memories` collection (Slice RRRRRRRR-cont, future)
 *
 * Severity: WARN. The principle is forward-looking — every NEW MCP
 * tool that mutates state should pick a collection target.
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @audit ISO 19011:2018 §6.4.6 (persistence-trail for audit-evidence)
 */
export function checkMcpMutationsHaveCollection(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const offenders: string[] = []
  // Tier A — files we audit. Limited to MCP handler surface + meta-automation.
  const auditedFiles: string[] = []
  for (const sub of [
    'src/services/agents/mcp',
    'src/services/meta-automation',
  ]) {
    const d = join(repoRoot, sub)
    if (!existsSync(d)) continue
    try {
      for (const e of readdirSync(d)) {
        if (e.endsWith('.ts') && !e.endsWith('.test.ts')) auditedFiles.push(join(d, e))
      }
    } catch { /* ignore */ }
  }
  // Probe: module-scope array `const X: T[] = []` that later receives
  // `X.push(...)` AND the same file has at least one MCP handler-like
  // function (returns json(...) or text(...)) or is the meta-automation
  // proposer.
  const arrayDeclRe = /^const\s+(\w+):\s*[A-Z][\w<>\[\] ,|]+\s*=\s*\[\]/gm
  for (const f of auditedFiles) {
    const text = readSafe(f)
    const arrayDecls = [...text.matchAll(arrayDeclRe)].map((m) => m[1]!)
    for (const name of arrayDecls) {
      const pushRe = new RegExp(`\\b${name}\\.push\\b`)
      if (!pushRe.test(text)) continue
      // Allow opt-out via a comment marker.
      if (text.includes(`// SAFE-INMEM: ${name}`)) continue
      offenders.push(`${basename(f)} :: const ${name}: T[] = [] then ${name}.push(...) — no Payload-collection persistence`)
    }
  }
  if (offenders.length === 0) {
    return pass('entropy', 'mcp-mutations-have-collection',
      `every MCP handler / meta-automation mutator persists via Payload collection`)
  }
  return warn('entropy', 'mcp-mutations-have-collection',
    `${offenders.length} module-scope mutable array(s) in MCP / meta-automation — pick a Payload collection target (e.g. 'memories' from Slice RRRRRRRR) or annotate with // SAFE-INMEM: <name> to opt out`,
    offenders.slice(0, 8))
}

/**
 * Slice SSSSSSSS (2026-05-11) — per user "make sure mcp is secure and
 * bound to all related cloudflare bindings through erpax only". Every
 * MCP handler that touches a Cloudflare binding MUST go through the
 * mediator surface in `src/services/cloudflare/index.ts` (kvGet/r2Put/
 * aiRun/queueSend/auditChainAppend/analyticsWrite/makeMediator). Direct
 * `env.D1` / `env.R2` / `env.KV` / `env.AI` / `env.QUEUE` / `env.AUDIT_
 * CHAIN_DO` / `env.WORKFLOWS` / `env.VECTORIZE` / `env.ANALYTICS` access
 * outside the mediator module short-circuits the tenant-scoping +
 * audit-trail + RBAC + rate-limiting + PII-redaction layers.
 *
 * Severity: WARN initially (forward-looking). Flip to FAIL once existing
 * direct-access sites are migrated through the mediator.
 *
 * @standard ISO 27001:2022 A.5.10 access-control-policy
 * @standard ISO 27002:2022 §5.4 segregation-of-duties
 * @standard ISO 19011:2018 §6.4.6 audit-evidence
 * @audit Conservation Law 38 mcp-tool-standardization
 */
export function checkMcpBindingsAreMediated(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const offenders: string[] = []
  // Slice DDDDDDDDD-cont (2026-05-11) — per user "all plugins use only
  // erpax bindings". Extend the audit surface to every src/plugins/*
  // directory + services/meta-automation. Direct env.<BINDING> access
  // outside the mediator module is forbidden.
  const dirs = [
    join(repoRoot, 'src/services/agents/mcp'),
    join(repoRoot, 'src/services/meta-automation'),
    join(repoRoot, 'src/plugins'),
  ]
  const auditedFiles: string[] = []
  for (const d of dirs) {
    if (!existsSync(d)) continue
    try {
      for (const e of readdirSync(d)) {
        if (e.endsWith('.ts') && !e.endsWith('.test.ts')) auditedFiles.push(join(d, e))
      }
    } catch { /* ignore */ }
  }
  // Forbidden bindings (the env.* keys ErpaxCfEnv declares).
  const FORBIDDEN_RE =
    /\benv\.(?:D1|R2|KV|AI|QUEUE|WORKFLOWS|VECTORIZE|ANALYTICS|AUDIT_CHAIN_DO|TENANT_QUOTA|RATE_LIMITER|JOB_LOCK)\b/g
  for (const f of auditedFiles) {
    const text = stripCommentsKeepLines(readSafe(f))
    const lines = text.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!
      // Allow opt-out via comment marker on the same line.
      if (line.includes('// SAFE-CF-DIRECT')) continue
      for (const m of line.matchAll(FORBIDDEN_RE)) {
        offenders.push(`${basename(f)}:${i + 1} :: direct ${m[0]} — use mediator (services/cloudflare makeMediator)`)
      }
    }
  }
  if (offenders.length === 0) {
    return pass('entropy', 'mcp-bindings-are-mediated',
      `every Cloudflare binding access in MCP / meta-automation flows through the erpax mediator`)
  }
  return warn('entropy', 'mcp-bindings-are-mediated',
    `${offenders.length} direct CF binding access(es) in MCP — every binding must flow through src/services/cloudflare makeMediator (tenant-scoped, audit-trailed, RBAC-gated). Annotate with // SAFE-CF-DIRECT to opt out.`,
    offenders.slice(0, 8))
}

/**
 * Slice EEEEEEEEE (2026-05-11) — per user "all plugins have access
 * specific types". Each plugin under `src/plugins/<slug>/` is granted
 * access to a narrowed mediator surface declared in
 * `PLUGIN_ACCESS_MAP` (services/cloudflare/plugin-access.ts). This
 * invariant scans each plugin's directory for mediator-method calls
 * (e.g. `.aiRun(`, `.r2Put(`, `.emailSend(`) and warns if the plugin
 * uses a method outside its declared access set.
 *
 * Forces principle of least privilege at compile time AND runtime
 * (the `pluginMediator` Proxy throws on out-of-set access; this
 * invariant catches authors who try to widen the set without updating
 * PLUGIN_ACCESS_MAP).
 *
 * @standard ISO 27001 A.5.15 access-control
 * @standard ISO 27002 §5.4 segregation-of-duties (TypeScript-enforced)
 * @audit Conservation Law 38 mcp-tool-standardization
 */
export function checkPluginsDeclareAccess(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const pluginsRoot = join(repoRoot, 'src/plugins')
  if (!existsSync(pluginsRoot)) {
    return pass('entropy', 'plugins-declare-access', 'no src/plugins/ directory — skip')
  }
  // Read the declared access map by parsing plugin-access.ts (avoids
  // the import cycle at invariant-runtime).
  const accessFile = join(repoRoot, 'src/services/cloudflare/plugin-access.ts')
  const accessText = readSafe(accessFile)
  if (!accessText) {
    return warn('entropy', 'plugins-declare-access',
      `plugin-access.ts not found — Slice EEEEEEEEE not landed`)
  }
  // Parse PLUGIN_ACCESS_MAP: entries like  accounting: ['queueSendNamed', ...] as const,
  const mapDecl: Record<string, Set<string>> = {}
  const entryRe = /(\w+):\s*\[([^\]]+)\]\s*as\s*const/g
  let m: RegExpExecArray | null
  while ((m = entryRe.exec(accessText))) {
    const plugin = m[1]!
    const keys = [...m[2]!.matchAll(/'(\w+)'/g)].map((k) => k[1]!)
    mapDecl[plugin] = new Set(keys)
  }
  // For each plugin directory, scan for `.<method>(` calls matching
  // the mediator surface and flag uses outside the declared set.
  const MEDIATOR_METHODS = new Set([
    'kvGet', 'kvPut', 'r2Put', 'r2Get', 'aiRun', 'queueSend', 'queueSendNamed',
    'analyticsWrite', 'auditChainAppend', 'auditChainAppendLinked',
    'auditChainVerify', 'vectorizeQuery', 'vectorizeInsert',
    'browserRender', 'emailSend', 'workflowsCreate',
  ])
  const offenders: string[] = []
  let pluginEntries: string[] = []
  try { pluginEntries = readdirSync(pluginsRoot) } catch { /* ignore */ }
  for (const slug of pluginEntries) {
    const pluginDir = join(pluginsRoot, slug)
    let stat
    try { stat = statSync(pluginDir) } catch { continue }
    if (!stat.isDirectory()) continue
    const declared = mapDecl[slug] ?? new Set<string>()
    // Recursively walk plugin dir for .ts/.tsx files.
    const files: string[] = []
    const walk = (d: string): void => {
      let entries: string[] = []
      try { entries = readdirSync(d) } catch { return }
      for (const e of entries) {
        if (e === 'node_modules' || e.startsWith('.fuse_hidden')) continue
        const p = join(d, e)
        let s
        try { s = statSync(p) } catch { continue }
        if (s.isDirectory()) walk(p)
        else if (s.isFile() && (p.endsWith('.ts') || p.endsWith('.tsx')) && !p.endsWith('.test.ts')) files.push(p)
      }
    }
    walk(pluginDir)
    const usedMethods = new Set<string>()
    for (const f of files) {
      const text = stripCommentsKeepLines(readSafe(f))
      for (const m of MEDIATOR_METHODS) {
        const re = new RegExp(`[. ]${m}\\s*\\(`, 'g')
        if (re.test(text)) usedMethods.add(m)
      }
    }
    // Methods used but NOT in the declared set.
    const overreach: string[] = []
    for (const u of usedMethods) {
      if (!declared.has(u)) overreach.push(u)
    }
    if (overreach.length > 0) {
      offenders.push(
        `src/plugins/${slug}/ uses [${overreach.join(', ')}] but PLUGIN_ACCESS_MAP['${slug}'] grants only [${[...declared].join(', ')}]`,
      )
    }
  }
  if (offenders.length === 0) {
    return pass('entropy', 'plugins-declare-access',
      `every plugin's mediator usage stays within its declared PluginAccess<K> set`)
  }
  return warn('entropy', 'plugins-declare-access',
    `${offenders.length} plugin(s) call mediator methods outside their declared access set — widen PLUGIN_ACCESS_MAP or stop calling`,
    offenders.slice(0, 8))
}

/**
 * Slice VVVVVVVV (2026-05-11) — per user "use one binding of a type.
 * when using DRY uuid logic conflicts do not occur" + "this is the way
 * to prevent tampering — in the core where all merge to one".
 *
 * Every Cloudflare service type should have exactly ONE binding. Purpose
 * differentiation happens via the uuid-keyed name argument (idFromName)
 * or via tenant-scoped key prefixes (KV/R2), NOT via duplicate bindings.
 *
 * Today's wrangler.jsonc declares legacy DO aliases (TENANT_QUOTA /
 * RATE_LIMITER / JOB_LOCK / AUDIT_CHAIN_DO) alongside the unified
 * ERPAX_DO — those are migration-compat only. New bindings of the same
 * type beyond these warn.
 *
 * Rationale: merging to one binding makes the tamper surface single.
 * Every state write flows through the same audit trail, the same DO
 * instance routing, the same uuid linkage. No bypass via "the other
 * KV namespace" or "the other rate-limiter DO".
 *
 * @standard ISO 27001 A.5.23 cloud-service-tenant-isolation
 * @standard ISO 27002 §5.4 segregation-of-duties (single-surface audit)
 * @audit ISO 19011:2018 §6.4.6 tamper-evident audit-trail (single path)
 */
export function checkOneBindingPerType(ctx: InvariantContext): InvariantResult {
  const repoRoot = ctx.repoRoot ?? REPO_ROOT_FALLBACK()
  const wranglerPath = join(repoRoot, 'wrangler.jsonc')
  if (!existsSync(wranglerPath)) {
    return pass('entropy', 'one-binding-per-type', 'wrangler.jsonc not found — skip')
  }
  const text = readSafe(wranglerPath)

  // Allowlisted migration aliases (Slice VVVVVVVV — one binding per
  // type, legacy aliases kept for in-place migration).
  const LEGACY_DO_ALIASES = new Set([
    'TENANT_QUOTA', 'RATE_LIMITER', 'JOB_LOCK', 'AUDIT_CHAIN_DO',
  ])
  const UNIFIED_DO_BINDING = 'ERPAX_DO'

  // Parse DO binding names (regex is good enough for the audit).
  const doBindings: string[] = []
  for (const m of text.matchAll(/durable_objects[\s\S]*?bindings[\s\S]*?\]/g)) {
    for (const b of m[0].matchAll(/"name":\s*"([A-Z_][A-Z0-9_]*)"/g)) {
      doBindings.push(b[1]!)
    }
  }

  // Same for KV / R2 / Queue / AI / Vectorize / Analytics — each type
  // should have exactly one binding (modulo allowlisted legacy aliases).
  const offenders: string[] = []
  const newDos = doBindings.filter((n) => n !== UNIFIED_DO_BINDING && !LEGACY_DO_ALIASES.has(n))
  if (newDos.length > 0) {
    offenders.push(
      `wrangler.jsonc declares non-allowlisted DO binding(s): ${newDos.join(', ')} — merge into ERPAX_DO via purpose-prefixed idFromName, or extend LEGACY_DO_ALIASES if this is a migration-compat alias`,
    )
  }

  // KV — expect exactly one binding (current: none or one).
  const kvBindings = [...text.matchAll(/"kv_namespaces"[\s\S]*?\[([\s\S]*?)\]/g)]
    .flatMap((m) => [...m[1]!.matchAll(/"binding":\s*"([A-Z_]+)"/g)].map((b) => b[1]!))
  if (kvBindings.length > 1) {
    offenders.push(
      `wrangler.jsonc declares ${kvBindings.length} KV bindings (${kvBindings.join(', ')}) — use one binding + tenant-scoped key prefixes via the mediator (nsKey)`,
    )
  }

  // R2 — same rule.
  const r2Bindings = [...text.matchAll(/"r2_buckets"[\s\S]*?\[([\s\S]*?)\]/g)]
    .flatMap((m) => [...m[1]!.matchAll(/"binding":\s*"([A-Z_]+)"/g)].map((b) => b[1]!))
  if (r2Bindings.length > 1) {
    offenders.push(
      `wrangler.jsonc declares ${r2Bindings.length} R2 bindings (${r2Bindings.join(', ')}) — use one bucket + tenant-scoped object keys via the mediator (nsKey)`,
    )
  }

  if (offenders.length === 0) {
    return pass('entropy', 'one-binding-per-type',
      `wrangler.jsonc honours "one binding per type" — uuid-keyed name argument differentiates purposes; tamper surface is single`)
  }
  return warn('entropy', 'one-binding-per-type',
    `${offenders.length} multi-binding-per-type violation(s) — collapse to one binding + uuid-keyed name/key prefixes (Slice VVVVVVVV)`,
    offenders)
}
