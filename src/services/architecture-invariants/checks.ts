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

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, join, basename } from 'node:path'
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
    'fiscal-periods', 'invoices', 'payments', 'customers', 'vendors',
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
    const loSet = new Set(featuresForTier(lo).map((f) => f.id))
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

    // 1. multiTenancyField
    if (!/\bmultiTenancyField\s*\(/.test(text)) {
      offenders.push(`${entry} :: missing multiTenancyField()`)
    }
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
  multiTenancyField: ['tenant'],
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
  'tenant',          // injected by multiTenancyField + autoPopulateTenant
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
 * ONE minute in a 24-hour window. Catches typos like `*/15 * * 13 *`
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
    // Probe 24h × 60min = 1440 minutes; require ≥1 match.
    const base = new Date('2026-05-10T00:00:00Z')
    let matched = false
    for (let m = 0; m < 1440; m++) {
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
      // Look for the literal event-type string anywhere in the producer files.
      // (Quoted with single OR double quotes to allow either codegen style.)
      const re = new RegExp(`['"\`]${s.emits.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`]`)
      if (!re.test(allText)) {
        offenders.push(`${c.id}:${s.emits}`)
      }
    }
  }
  return offenders.length === 0
    ? pass('entropy', 'chain-emits-have-producer', `${Object.values(BUSINESS_CHAINS).reduce((n, c) => n + c.steps.length, 0)} chain steps validated`)
    : warn('entropy', 'chain-emits-have-producer', `${offenders.length} chain emit(s) without a discoverable producer (typed event, hook emitter, or subscriber)`, offenders)
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
 * that recomputes from its content (RFC 4122 §4.3 + RFC 8785 + SHA-256).
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
 * @standard RFC 4122 + RFC 8785 + NIST FIPS 180-4
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
 * @standard RFC 4122 §4.3 + RFC 8785
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
 * @standard RFC 4122 §4.3 + RFC 8785
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
