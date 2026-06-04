/**
 * Law 11 — Causal provenance (W3C PROV).
 *
 * Slice ZZZZZ. Every value's history of CAUSE is recoverable, not just
 * its history of CHANGE. PROV ontology applied to AuditLeaf metadata.
 *
 * Beyond `audit-events` which records WHAT changed; provenance records
 * WHY (which upstream events caused this one).
 *
 * @standard W3C PROV-DM (Provenance Data Model)
 * @standard W3C PROV-O (PROV Ontology — RDF)
 */

import { computeContentUuid } from '@/integrity'
import type { CausalLink, Provenance } from '@/beyond/types'

const PROVENANCE_REGISTRY = new Map<string, Provenance>()

/** Record a causal link: this leaf was caused by these upstream uuids. */
export function recordCausalLink(args: {
  leafHash: string
  causedBy: ReadonlyArray<string>
  producedBy: string
  source?: string
}): void {
  const link: CausalLink = {
    causedBy: args.causedBy,
    producedBy: args.producedBy,
    atTime: new Date().toISOString(),
  }
  const existing = PROVENANCE_REGISTRY.get(args.leafHash)
  if (existing) {
    PROVENANCE_REGISTRY.set(args.leafHash, {
      causalChain: [...existing.causalChain, link],
      source: existing.source ?? args.source,
    })
  } else {
    PROVENANCE_REGISTRY.set(args.leafHash, {
      causalChain: [link],
      source: args.source,
    })
  }
}

/** Walk backwards from a leaf to its full causal ancestry. */
export function getCausalAncestry(leafHash: string, maxDepth = 100): ReadonlyArray<string> {
  const visited = new Set<string>()
  const queue: Array<{ hash: string; depth: number }> = [{ hash: leafHash, depth: 0 }]
  while (queue.length > 0) {
    const { hash, depth } = queue.shift()!
    if (visited.has(hash) || depth >= maxDepth) continue
    visited.add(hash)
    const prov = PROVENANCE_REGISTRY.get(hash); if (!prov) continue
    for (const link of prov.causalChain) {
      for (const upstream of link.causedBy) {
        if (!visited.has(upstream)) queue.push({ hash: upstream, depth: depth + 1 })
      }
    }
  }
  visited.delete(leafHash)   // exclude self
  return [...visited]
}

export function getProvenance(leafHash: string): Provenance | undefined {
  return PROVENANCE_REGISTRY.get(leafHash)
}

/** Compute a stable provenance-uuid for a value (links through to Law 8). */
export function provenanceUuid(prov: Provenance, tenantId: string): string {
  return computeContentUuid(prov as unknown as Record<string, unknown>, tenantId)
}

/** Test-only — never call in prod. */
export function __resetProvenanceRegistry(): void { PROVENANCE_REGISTRY.clear() }
