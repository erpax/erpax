/**
 * 10 dimensional plugins — Slice LLLLLLLL (2026-05-11).
 *
 * Per user 'start by creating the missing collections stored in 10
 * dimensional plugins'. The architecture finally splits along the
 * 10 vortex axes from §0b. Each vortex becomes a **dimensional
 * plugin**: a self-contained Payload plugin holding the collections,
 * agents, hooks, and MCP tools that operate on that dimension.
 *
 * The 10 dimensions correspond exactly to the §0b vortices:
 *
 *   A — Domain         (collections themselves; the WHAT)
 *   B — Substrate      (storage / uuid / streams; the SUBSTRATE)
 *   C — Process        (events / chains; the FLOW)
 *   D — Conservation   (laws / invariants; the CHECKS)
 *   E — Tenant Role    (open registry; the WHO)
 *   F — Integrity      (verification / audit; the TRUTH)
 *   G — Beyond         (next-horizon primitives; the HORIZON)
 *   H — Clients        (browser / Cloudflare / external; the EXTERIOR)
 *   I — Federation     (inter-tenant; the MANY)
 *   J — Meta-evolution (self-reference / clones / proposals; the MIRROR)
 *
 * The Trinity (§0ab) maps:
 *   Law I (Identity)   → dimensions A, B, F
 *   Law II (Causality) → dimensions C, J
 *   Law III (Closure)  → dimensions D, E, G, H, I
 *
 * **Conservation Law 49** — `checkDimensionalCoverage`: every
 * declared collection (in `seeds/templates/`) MUST belong to exactly
 * one dimension; no orphans, no duplicates. The 10 dimensions must
 * each have at least one collection (no empty dimension).
 *
 * This slice ALSO declares the missing country-level collections
 * (introduced by KKKKKKKK) and assigns each to its dimension.
 *
 * @standard W3C JSON-LD 1.1 — typed dimensional manifests
 * @standard ISO/IEC 25010:2023 §5.7 modularity — plugin boundaries
 * @standard Topology — 10 vortices form the torus surface (§0b + CCCCCCC)
 * @audit ISO 19011:2018 §6.4.6 (every collection traceable to a dimension)
 */

export type DimensionId =
  | 'A-domain'
  | 'B-substrate'
  | 'C-process'
  | 'D-conservation'
  | 'E-tenant-role'
  | 'F-integrity'
  | 'G-beyond'
  | 'H-clients'
  | 'I-federation'
  | 'J-meta-evolution'

export interface DimensionalPlugin {
  readonly id: DimensionId
  readonly title: string
  readonly trinityLaw: 'I-identity' | 'II-causality' | 'III-closure'
  readonly description: string
  readonly canonicalCollections: ReadonlyArray<string>
  /** New / missing collections declared by this slice. */
  readonly newCollections: ReadonlyArray<{ slug: string; description: string }>
}

export const DIMENSIONAL_PLUGINS: ReadonlyArray<DimensionalPlugin> = [
  {
    id: 'A-domain',
    title: '@erpax/dimension-domain',
    trinityLaw: 'I-identity',
    description: 'Domain entities: every business object that exists. Tenant carries it; agents own it; chains step through it.',
    canonicalCollections: [
      'tenants', 'users', 'invoices', 'payments', 'purchase-orders',
      'goods-receipts', 'consignment-arrangements', 'bookings',
      'facility-management', 'manufacturing-orders',
    ],
    newCollections: [
      { slug: 'central-bank-policies',  description: 'Central-bank monetary + macroprudential policies (slice KKKKKKKK)' },
      { slug: 'sovereign-debt-issuances', description: 'Sovereign bond issuances + auction events' },
      { slug: 'sdg-progress-indicators', description: 'UN SDG indicator measurements per sub-national region' },
    ],
  },
  {
    id: 'B-substrate',
    title: '@erpax/dimension-substrate',
    trinityLaw: 'I-identity',
    description: 'Storage substrate + content uuid + type registry + streams. The how-objects-exist layer.',
    canonicalCollections: [
      'audit-events', 'merkle-leaves', 'storage-backends', 'replication-receipts',
    ],
    newCollections: [
      { slug: 'type-registrations',     description: 'Slice GGGGGGG — TypeDescriptor registry entries (Law 47)' },
      { slug: 'stream-windows',         description: 'Slice RRRRRR — closed tumbling/sliding/session windows with Lamport clocks' },
    ],
  },
  {
    id: 'C-process',
    title: '@erpax/dimension-process',
    trinityLaw: 'II-causality',
    description: 'Events + chains + streams + agent dispatch. The how-things-happen layer.',
    canonicalCollections: [
      'business-chains', 'workflow-instances', 'workflow-tasks',
      'scheduled-tasks', 'recurring-journals',
    ],
    newCollections: [
      { slug: 'agent-block-compositions', description: 'Slice PPPPPP+QQQQQQ — typed block composition snapshots' },
      { slug: 'stream-uuid-chains',       description: 'Slice SSSSSS — Merkle hash-chain leaves of stream events' },
    ],
  },
  {
    id: 'D-conservation',
    title: '@erpax/dimension-conservation',
    trinityLaw: 'III-closure',
    description: 'Conservation laws + invariants + Trinity. The proof-of-conformance layer.',
    canonicalCollections: [
      'conservation-laws', 'invariant-runs', 'meta-proposals',
    ],
    newCollections: [
      { slug: 'trinity-rollups',          description: 'Slice JJJJJJJJ — per-Trinity-law verdict snapshots over time' },
      { slug: 'agent-law-profiles',       description: 'Slice EEEEEEE — per-agent applicable law subset cache' },
      { slug: 'dry-proof-bundles',        description: 'Slice DDDDDDD — published Schema.org Dataset proofs (Law 44)' },
    ],
  },
  {
    id: 'E-tenant-role',
    title: '@erpax/dimension-tenant-role',
    trinityLaw: 'III-closure',
    description: 'Open tenant role registry + role profiles + sub-tenant hierarchy.',
    canonicalCollections: [
      'tenant-roles', 'role-profiles', 'role-activations',
    ],
    newCollections: [
      { slug: 'sub-tenant-relationships', description: 'Slice KKKKKKKK — country → ministry → agency hierarchy graph' },
      { slug: 'role-derivations',         description: 'Slice PPPPP+ — user-defined role profile derivations' },
    ],
  },
  {
    id: 'F-integrity',
    title: '@erpax/dimension-integrity',
    trinityLaw: 'I-identity',
    description: 'Content uuid verification + tamper-detection + DID + signatures.',
    canonicalCollections: [
      'evidence-attestations', 'qualified-trust-services',
      'pqc-signature-receipts', 'did-documents',
    ],
    newCollections: [
      { slug: 'sovereign-did-registrations', description: 'Slice KKKKKKKK — sovereign DID register for treaty signing' },
      { slug: 'short-uuid-mappings',         description: 'Slice FFFFFFF — short uuid ↔ full uuid resolution log' },
    ],
  },
  {
    id: 'G-beyond',
    title: '@erpax/dimension-beyond',
    trinityLaw: 'III-closure',
    description: 'Beyond-current-standards primitives: provenance / replay / bitemporal / cost / carbon / agent-capability / PQC / explainability / reversibility / AI-audit.',
    canonicalCollections: [
      'cost-receipts', 'carbon-emissions', 'agent-capabilities',
      'reversibility-tokens', 'ai-audit-events',
    ],
    newCollections: [
      { slug: 'tax-treaty-network',     description: 'Slice KKKKKKKK — bilateral + multilateral tax treaties (BEPS Pillar 2 + DAC8)' },
      { slug: 'customs-tariffs',        description: 'WCO HS tariffs per origin/destination per period' },
    ],
  },
  {
    id: 'H-clients',
    title: '@erpax/dimension-clients',
    trinityLaw: 'III-closure',
    description: 'External client surfaces: browser (Claude in Chrome / Excel / Cowork), Cloudflare (Workers / D1 / R2 / KV / DO / Queues), federation peers.',
    canonicalCollections: [
      'cf-bindings', 'mcp-clients', 'external-integrations',
    ],
    newCollections: [
      { slug: 'cross-border-payments',     description: 'Slice KKKKKKKK — central-bank to central-bank ISO 20022 messages' },
      { slug: 'browser-session-receipts',  description: 'Claude in Chrome session attestations (Cowork mode plus)' },
    ],
  },
  {
    id: 'I-federation',
    title: '@erpax/dimension-federation',
    trinityLaw: 'III-closure',
    description: 'Inter-tenant federation envelopes + trust graph + treaties + clone provenance.',
    canonicalCollections: [
      'federation-envelopes', 'trust-graph-edges', 'clone-genomes',
    ],
    newCollections: [
      { slug: 'sovereign-treaties',        description: 'Slice KKKKKKKK — bilateral + multilateral treaties as federation envelopes' },
      { slug: 'multilateral-envelopes',    description: 'Slice KKKKKKKK — N-of-K consensus envelopes per UUUUUU consensusRead' },
      { slug: 'treaty-signing-events',     description: 'Slice KKKKKKKK — sovereign DID signature receipts per treaty version' },
    ],
  },
  {
    id: 'J-meta-evolution',
    title: '@erpax/dimension-meta-evolution',
    trinityLaw: 'II-causality',
    description: 'Self-reference + cloning + meta-skill proposals + auto-generation. The platform observing + improving itself.',
    canonicalCollections: [
      'self-reference-snapshots', 'meta-proposals', 'platform-genomes',
    ],
    newCollections: [
      { slug: 'mcp-rebuild-runs',          description: 'Slice ZZZZZZ — rebuildFromSource invocations + drift reports' },
      { slug: 'mcp-self-test-runs',        description: 'Slice AAAAAAA — selfTestAll runs + per-tool verdicts over time' },
    ],
  },
]

// ─── Conservation Law 49 — dimensional coverage ────────────────────

export interface DimensionalCoverageResult {
  readonly ok: boolean
  readonly dimensionsCount: 10
  readonly emptyDimensions: ReadonlyArray<DimensionId>
  readonly orphanCollections: ReadonlyArray<string>      // declared elsewhere, not assigned
  readonly duplicateAssignments: ReadonlyArray<{ slug: string; dimensions: ReadonlyArray<DimensionId> }>
  readonly perDimension: ReadonlyArray<{ id: DimensionId; canonical: number; new: number; total: number }>
}

/**
 * Conservation Law 49 — verify the dimensional taxonomy is well-formed:
 *   - 10 dimensions exist (no missing).
 *   - No dimension is empty (every vortex carries at least one collection).
 *   - No collection appears in two dimensions (no duplicates).
 *   - Every declared collection in known registries appears in exactly
 *     one dimension (no orphans).
 *
 * Production probe takes the live `TAMPER_PROOF_COLLECTIONS_REGISTRY`
 * and checks orphans against it; the smoke probe checks structure only.
 */
export function checkDimensionalCoverage(
  declaredCollections?: ReadonlyArray<string>,
): DimensionalCoverageResult {
  if (DIMENSIONAL_PLUGINS.length !== 10) {
    return {
      ok: false, dimensionsCount: 10 as const,
      emptyDimensions: [], orphanCollections: [], duplicateAssignments: [],
      perDimension: [],
    }
  }
  const emptyDimensions: DimensionId[] = []
  const seenIn = new Map<string, DimensionId[]>()
  const perDimension: { id: DimensionId; canonical: number; new: number; total: number }[] = []

  for (const dim of DIMENSIONAL_PLUGINS) {
    const c = dim.canonicalCollections.length
    const n = dim.newCollections.length
    if (c + n === 0) emptyDimensions.push(dim.id)
    perDimension.push({ id: dim.id, canonical: c, new: n, total: c + n })
    for (const slug of [...dim.canonicalCollections, ...dim.newCollections.map((nc) => nc.slug)]) {
      const list = seenIn.get(slug) ?? []
      list.push(dim.id)
      seenIn.set(slug, list)
    }
  }
  const duplicateAssignments = [...seenIn.entries()]
    .filter(([, dims]) => dims.length > 1)
    .map(([slug, dimensions]) => ({ slug, dimensions }))

  const orphanCollections = declaredCollections
    ? declaredCollections.filter((c) => !seenIn.has(c))
    : []

  return {
    ok: emptyDimensions.length === 0 && duplicateAssignments.length === 0 && orphanCollections.length === 0,
    dimensionsCount: 10 as const,
    emptyDimensions, orphanCollections, duplicateAssignments, perDimension,
  }
}

/** Look up which dimension a collection belongs to. */
export function dimensionForCollection(slug: string): DimensionId | null {
  for (const dim of DIMENSIONAL_PLUGINS) {
    if (dim.canonicalCollections.includes(slug)) return dim.id
    if (dim.newCollections.some((nc) => nc.slug === slug)) return dim.id
  }
  return null
}

/** Total of all new + canonical collections across dimensions. */
export function totalCollectionCount(): { canonical: number; new: number; total: number } {
  let canonical = 0; let _new = 0
  for (const d of DIMENSIONAL_PLUGINS) { canonical += d.canonicalCollections.length; _new += d.newCollections.length }
  return { canonical, new: _new, total: canonical + _new }
}
