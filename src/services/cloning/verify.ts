/**
 * Conservation Law 24 — checkCloneIntegrity. Slice HHHHHH (2026-05-11).
 *
 * For every clone instance, the recomputed content-uuid of its
 * GenomeBundle MUST equal the publication's bundleUuid. If it doesn't,
 * the clone is not bit-identical — either ingestion failed or the
 * source published a divergent genome. Either way, the clone refuses
 * to accept the 'erpax-platform' role until reconciled.
 *
 * @standard RFC 9562 §5.8 + RFC 8785
 * @audit ISO 19011:2018 §6.4.6
 */

import { computeGenomeUuid, type GenomeBundle } from './genome'
import type { GenomePublication } from './publish'

export type CloneIntegrityResult =
  | { ok: true }
  | {
      ok: false
      expected: string
      actual: string
      reason: string
      divergentSections: ReadonlyArray<keyof GenomeBundle>
    }

const SECTIONS: ReadonlyArray<keyof GenomeBundle> = [
  'collections', 'chains', 'agents', 'roles', 'mcpTools', 'standards',
]

export function checkCloneIntegrity(args: {
  publication: GenomePublication
  cloneBundle: GenomeBundle
  cloneTenantId: string
}): CloneIntegrityResult {
  const expected = args.publication.bundleUuid
  const actual = computeGenomeUuid(args.cloneBundle, args.cloneTenantId)
  if (expected === actual) return { ok: true }

  // Pin down which sections diverged for actionable diagnostics.
  const divergent: Array<keyof GenomeBundle> = []
  for (const section of SECTIONS) {
    const a = JSON.stringify(args.publication.bundle[section])
    const b = JSON.stringify(args.cloneBundle[section])
    if (a !== b) divergent.push(section)
  }

  // Tenant-namespace mismatch shows up as 'no sections diverge but uuid differs'.
  const reason = divergent.length === 0
    ? `clone tenant namespace differs from source (clone tenantId='${args.cloneTenantId}'; source tenantId in publication = different)`
    : `clone bundle differs from published in sections: ${divergent.join(', ')}`

  return { ok: false, expected, actual, reason, divergentSections: divergent }
}
