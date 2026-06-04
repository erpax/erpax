/**
 * publishSelf — wrap a GenomeBundle in a verifiable federation
 * envelope. Slice HHHHHH (2026-05-11). Per spec §0d.
 *
 * @standard W3C Activity Streams 2.0 (federated content envelope)
 * @standard NIST FIPS 204 ML-DSA (when sign fn provided)
 */

import { collectGenome, computeGenomeUuid, type GenomeBundle } from '@/cloning/genome'

export type GenomeScope = 'genome' | 'genome+state'

export interface GenomeSignature {
  readonly algorithm: string
  readonly publicKey: string
  readonly signatureB64: string
}

export interface GenomePublication {
  readonly bundleUuid: string
  readonly scope: GenomeScope
  readonly sourceDid: string
  readonly bundle: GenomeBundle
  readonly publishedAt: string
  /** When scope='genome+state', uri to the state snapshot (TTTTT cross-store). */
  readonly stateSnapshotUri?: string
  /** Optional source-instance signature (PQC per Law 18 when available). */
  readonly signature?: GenomeSignature
  /** Source's audit-chain Merkle root at publish time (Law 5 anchor). */
  readonly merkleAnchor?: string
}

export interface PublishSelfArgs {
  readonly tenantId: string
  readonly sourceDid: string
  readonly scope: GenomeScope
  /** Optional signer — receives the bundle bytes, returns a signature. */
  readonly sign?: (payload: GenomeBundle) => GenomeSignature
  /** Optional state-snapshot URI when scope='genome+state'. */
  readonly stateSnapshotUri?: string
  /** Optional Merkle root from the source's audit chain at publish time. */
  readonly merkleAnchor?: string
}

export function publishSelf(args: PublishSelfArgs): GenomePublication {
  const bundle = collectGenome({ tenantId: args.tenantId })
  const bundleUuid = computeGenomeUuid(bundle, args.tenantId)
  const signature = args.sign?.(bundle)
  return {
    bundleUuid,
    scope: args.scope,
    sourceDid: args.sourceDid,
    bundle,
    publishedAt: new Date().toISOString(),
    stateSnapshotUri: args.scope === 'genome+state' ? (args.stateSnapshotUri ?? '(pending TTTTT cross-store impl)') : undefined,
    signature,
    merkleAnchor: args.merkleAnchor,
  }
}
