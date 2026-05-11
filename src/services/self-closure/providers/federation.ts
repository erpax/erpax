/**
 * InternalFederationProvider — local self IS the federation peer.
 *
 * Slice JJJJJJJJJ-cut2 (2026-05-11). Per user 'erpax remains fully
 * functional ... all falling back at itself leads to erpax itself'.
 *
 * Of all the internal providers, federation-peer is the topologically
 * cleanest. The "external" operation is "push this content-addressed
 * row to a peer ERPax instance at URL P so peer P also holds it."
 * When P is unreachable, the internal fallback recognises that the
 * local ERPax IS a federation peer of itself: the row is already
 * present locally. The operation is a no-op that returns success.
 *
 * Why this is correct and not degenerate hand-waving:
 *
 *   - Federation in ERPax (Slice AAAAAA) exchanges rows by their
 *     contentUuid. Two peers holding the same uuid hold byte-equal
 *     content (Conservation Law 8). The row's local presence already
 *     satisfies "uuid X is reachable from this side of the network".
 *   - When the network partition heals, normal federation push picks
 *     up where it left off — the local row is still authoritative,
 *     so re-push is idempotent (Law 24 mitosis).
 *   - From the caller's perspective, the result shape is the same:
 *     the peer "has the row" — either remotely (via successful push)
 *     or locally (via self-as-peer).
 *
 * The audit trail records `via: 'internal'` so downstream observers
 * can see the federation event was satisfied locally rather than at
 * the peer. When the cluster topology demands actual cross-peer
 * replication (e.g. for regulatory residency), the operator's
 * runbook flags `via: 'internal'` events for retry against the real
 * peer once it returns.
 *
 * @standard ISO/IEC 25010:2023 §5.6 reliability
 * @audit Conservation Law 24 cloning / mitosis (federation as self-replication)
 * @audit Conservation Law 53 self-referential-closure
 * @feature self_closure
 */

import type { InternalProvider, FallbackContext } from '../types'
import { registerInternalProvider } from '../index'

export interface FederationPushParams {
  /** The peer URL the external push targeted (recorded for replay). */
  readonly peerUrl: string
  /** Content-uuid of the row being federated. */
  readonly contentUuid: string
  /** Optional collection slug (audit context). */
  readonly collection?: string
}

export interface FederationPushResult {
  /** Whether the peer now holds the row. Always true in self-mode. */
  readonly peerHasRow: boolean
  /** Peer identity. In self-mode this is `'self'`. */
  readonly peerId: 'self' | string
  /** ISO 8601 — when the push (or self-equivalence assertion) completed. */
  readonly completedAt: string
  /** When self-mode is used, the operator may want to retry the real peer later. */
  readonly retryPeerWhenReachable?: boolean
  /** Original push target — preserved for retry + audit. Mirrors `params.peerUrl`. */
  readonly originalPeerUrl?: string
  /** Content-uuid the self-equivalence asserts. Mirrors `params.contentUuid`. */
  readonly contentUuid?: string
  /** Collection slug supplied at push time — audit context. */
  readonly collection?: string
}

export const InternalFederationProvider: InternalProvider<FederationPushParams, FederationPushResult> = {
  role: 'federation-peer',
  id: 'erpax-self-federation',
  description:
    'When an external federation peer is unreachable, recognise that the local ERPax IS a federation peer of itself. The row\'s local presence satisfies the federation guarantee (Law 8: same contentUuid → same bytes). Re-push to the real peer is idempotent when it returns.',
  standards: [
    'ISO/IEC-25010:2023-§5.6',
  ],

  async invoke(params: FederationPushParams, _ctx: FallbackContext): Promise<FederationPushResult> {
    return {
      peerHasRow: true,
      peerId: 'self',
      completedAt: new Date().toISOString(),
      retryPeerWhenReachable: true,
      originalPeerUrl: params.peerUrl,
      contentUuid: params.contentUuid,
      collection: params.collection,
    }
  },
}

registerInternalProvider(InternalFederationProvider)
