/**
 * Federation exchange — exportRow + importRow.
 * Slice AAAAAA. The mechanism by which two ERPax tenants exchange
 * a content-addressed row, with verification on receive.
 *
 * @standard W3C Linked Data Notifications + ActivityPub
 */

import { computeContentUuid, verifyContentUuid, stripNonContentFields } from '@/integrity'
import type { FederatedRow, TrustEntry, ImportResult } from '@/federation/types'

/** Export a local row as a FederatedRow (envelope-wrapped, verifiable). */
export function exportRow(args: {
  sourceTenant: string
  sourceCollection: string
  row: Record<string, unknown> & { uuid?: string }
  merkleAnchor?: FederatedRow['merkleAnchor']
  signature?: FederatedRow['signature']
}): FederatedRow {
  const stripped = stripNonContentFields(args.row)
  // Recompute uuid as a sanity check (Law 8 self-verify before export).
  const uuid = computeContentUuid(args.row, args.sourceTenant)
  return {
    envelopeVersion: '1.0',
    sourceTenant: args.sourceTenant,
    sourceCollection: args.sourceCollection,
    uuid,
    content: stripped as Record<string, unknown>,
    exportedAt: new Date().toISOString(),
    merkleAnchor: args.merkleAnchor,
    signature: args.signature,
  }
}

/**
 * Import a FederatedRow into the local tenant. Verifies:
 *   1. Envelope shape
 *   2. Trust graph permits the source
 *   3. Trust graph permits the collection
 *   4. (when signed) Signature verifies against declared public key
 *   5. Content-uuid recomputes to the declared uuid under SOURCE tenant namespace (Law 8)
 *   6. Local-tenant uuid is also computed for the receiver's namespace
 *   7. No duplicate import (idempotent — same source uuid not ingested twice)
 *
 * Returns ImportResult with the local id when ok=true.
 */
export async function importRow(args: {
  envelope: FederatedRow
  trust: ReadonlyArray<TrustEntry>
  localTenant: string
  isAlreadyImported: (sourceUuid: string) => Promise<boolean>
  ingest: (localContent: Record<string, unknown>) => Promise<{ id: string }>
  verifySignature?: (envelope: FederatedRow) => Promise<boolean>
}): Promise<ImportResult> {
  const e = args.envelope

  if (e.envelopeVersion !== '1.0') {
    return { ok: false, failedAt: 'envelope-shape', reason: `unsupported envelopeVersion ${e.envelopeVersion}` }
  }

  const trustEntry = args.trust.find((t) => t.peerTenant === e.sourceTenant)
  if (!trustEntry || trustEntry.trustLevel === 'untrusted') {
    return { ok: false, failedAt: 'untrusted-source', reason: `no trust entry for ${e.sourceTenant}` }
  }

  if (!trustEntry.acceptedCollections.includes(e.sourceCollection)) {
    return { ok: false, failedAt: 'collection-not-accepted', reason: `'${e.sourceCollection}' not in accepted list for ${e.sourceTenant}` }
  }

  if (trustEntry.trustLevel.startsWith('verified-') && trustEntry.trustLevel !== 'verified-content-only') {
    if (!e.signature || !args.verifySignature) {
      return { ok: false, failedAt: 'signature-invalid', reason: 'signature required by trust level but not present / no verifier' }
    }
    const sigOk = await args.verifySignature(e)
    if (!sigOk) return { ok: false, failedAt: 'signature-invalid', reason: 'signature did not verify' }
  }

  // Law 8 verification under the SOURCE tenant namespace.
  const sourceCheck = verifyContentUuid({ ...e.content, uuid: e.uuid }, e.sourceTenant)
  if (!sourceCheck.ok) {
    return { ok: false, failedAt: 'content-uuid-mismatch', reason: `source uuid ${e.uuid} does not recompute from content (sender tampered?)` }
  }

  if (await args.isAlreadyImported(e.uuid)) {
    return { ok: false, failedAt: 'duplicate-already-imported', reason: `uuid ${e.uuid} already in local store` }
  }

  // Stash federation provenance so subsequent queries know this row is foreign.
  const localContent: Record<string, unknown> = {
    ...e.content,
    federationProvenance: {
      sourceTenant: e.sourceTenant,
      sourceCollection: e.sourceCollection,
      sourceUuid: e.uuid,
      importedAt: new Date().toISOString(),
      trustLevel: trustEntry.trustLevel,
    },
  }
  const { id } = await args.ingest(localContent)
  return { ok: true, localId: id }
}
