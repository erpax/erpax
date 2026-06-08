/**
 * Genome bundle — the platform's structural surface (spec + chains +
 * agents + roles + MCP tools + standards) collected as one verifiable
 * artifact. Slice HHHHHH (2026-05-11).
 *
 * Per spec §0d 'ERPax clones itself': the genome IS the platform's
 * DNA — a bit-identical instance can be booted from this bundle alone
 * (no source-tree dependency at boot time once it's serialised).
 *
 * @standard RFC 9562 §5.8 + RFC 8785 (genome-uuid is content-addressable)
 * @standard W3C PROV (genome carries source-instance lineage)
 */

import { computeContentUuid } from '@/integrity'
import { extractCorpus } from '@/spec/generator'
import { BUSINESS_CHAINS } from '@/business/chain'
import { agentRegistry, erpaxMcpTools } from '@/agent'
import { listTenantRoles } from '@/tenant/role'
import type { CollectionSpec, SpecStandard } from '@/spec/generator'

export interface GenomeBundle {
  readonly genomeVersion: '1.0'
  readonly publishedAt: string
  /** All collection specs (CCCCC SpecCorpus). */
  readonly collections: ReadonlyArray<{
    readonly slug: string
    readonly title: string
    readonly summaryText?: string
    readonly standardsCount: number
    readonly chainStepsCount: number
  }>
  /** All BUSINESS_CHAINS entries (id + steps + standards + featureGate). */
  readonly chains: ReadonlyArray<{
    readonly id: string
    readonly name?: string
    readonly stepsCount: number
    readonly standards: ReadonlyArray<string>
    readonly featureGate?: string
  }>
  /** Every registered DomainAgent (id + ownsCollections + subscribesTo + emits + cron). */
  readonly agents: ReadonlyArray<{
    readonly id: string
    readonly ownsCollections: ReadonlyArray<string>
    readonly subscribesTo: ReadonlyArray<string>
    readonly emits: ReadonlyArray<string>
    readonly cron?: string
  }>
  /** Every TenantRoleProfile (LLLLL+). */
  readonly roles: ReadonlyArray<{
    readonly id: string
    readonly inheritsFrom?: ReadonlyArray<string>
    readonly requiredStandardsCount: number
    readonly requiredCollectionsCount: number
    readonly requiredChainsCount: number
    readonly invariant: string
  }>
  /** Every MCP tool (name + description; handler is per-instance). */
  readonly mcpTools: ReadonlyArray<{
    readonly name: string
    readonly description: string
  }>
  /** Deduplicated union of every standard cited anywhere. */
  readonly standards: ReadonlyArray<SpecStandard>
}

export interface CollectGenomeOptions {
  readonly tenantId: string
  /** Override the source-tree walk (used in tests + custom deployments). */
  readonly corpus?: { collections: ReadonlyArray<CollectionSpec> }
}

export function collectGenome(opts: CollectGenomeOptions): GenomeBundle {
  // 1. Spec corpus — read from the source tree (or accept a pre-extracted one).
  const corpus = opts.corpus ?? extractCorpus(process.cwd())

  // 2. Standards — dedup-union across every CollectionSpec.
  const seen = new Set<string>()
  const standards: SpecStandard[] = []
  for (const c of corpus.collections) {
    for (const s of c.standards ?? []) {
      const k = `${s.body}/${s.id}`
      if (seen.has(k)) continue
      seen.add(k)
      standards.push(s)
    }
  }

  return {
    genomeVersion: '1.0',
    publishedAt: new Date().toISOString(),
    collections: corpus.collections.map((c) => ({
      slug: c.slug,
      title: c.title,
      summaryText: c.summaries[0]?.text,
      standardsCount: (c.standards ?? []).length,
      chainStepsCount: (c.chainSteps ?? []).length,
    })),
    chains: Object.values(BUSINESS_CHAINS).map((c) => ({
      id: c.id,
      name: (c as { name?: string }).name,
      stepsCount: (c as unknown as { steps?: unknown[] }).steps?.length ?? 0,
      standards: ((c as { standards?: ReadonlyArray<string> }).standards ?? []) as ReadonlyArray<string>,
      featureGate: (c as { featureGate?: string }).featureGate,
    })),
    agents: agentRegistry.all().map((a) => ({
      id: a.id,
      ownsCollections: a.ownsCollections,
      subscribesTo: a.subscribesTo,
      emits: a.emits,
      cron: a.cron,
    })),
    roles: listTenantRoles().map((r) => ({
      id: r.id,
      inheritsFrom: r.inheritsFrom,
      requiredStandardsCount: r.requiredStandards.length,
      requiredCollectionsCount: r.requiredCollections.length,
      requiredChainsCount: r.requiredChains.length,
      invariant: r.invariant,
    })),
    mcpTools: erpaxMcpTools.map((t) => ({
      name: t.name,
      description: t.description,
    })),
    standards,
  }
}

/**
 * Compute the genome's content-uuid. STRIPS `publishedAt` before
 * hashing because it's a wall-clock timestamp (would defeat
 * determinism — two runs would produce different uuids for the same
 * structural genome).
 */
export function computeGenomeUuid(bundle: GenomeBundle, tenantId: string): string {
  const { publishedAt: _publishedAt, ...rest } = bundle
  return computeContentUuid(rest as unknown as Record<string, unknown>, tenantId)
}
