/**
 * Inter-tenant federation types — Slice AAAAAA.
 *
 * Two ERPax tenants (different orgs / instances) exchange data by
 * uuid; the receiver verifies content integrity independently,
 * without trusting the sender. Built on Laws 8 (content integrity),
 * 9 (cross-store), 10 (referential harmony).
 *
 * @standard W3C Activity Streams 2.0 (federated content envelope)
 * @standard W3C Linked Data Notifications (LDN)
 * @standard ActivityPub server-to-server protocol
 * @standard W3C Verifiable Credentials Data Model 2.0
 */

/** A row exported for federation, with all the metadata a peer needs to verify. */
export interface FederatedRow {
  /** Schema/version of this federation envelope. */
  readonly envelopeVersion: '1.0'
  /** The source tenant's id (URN-like, e.g. 'urn:erpax:tenant:acme-bank'). */
  readonly sourceTenant: string
  /** The collection slug at the source. */
  readonly sourceCollection: string
  /** The content-uuid (Law 8) — recomputable from the body. */
  readonly uuid: string
  /** The actual row content, JCS-canonicalizable. */
  readonly content: Record<string, unknown>
  /** ISO-8601 export timestamp. */
  readonly exportedAt: string
  /** Optional Merkle anchor — proves this row's audit trail at export time. */
  readonly merkleAnchor?: { rootHash: string; chainAnchorUri?: string }
  /** Optional source signature — sender's key (eIDAS qualified, ML-DSA, or plain ed25519). */
  readonly signature?: { algorithm: string; publicKey: string; signatureB64: string }
}

/** A trust declaration for a peer source. */
export interface TrustEntry {
  /** Peer tenant URN. */
  readonly peerTenant: string
  /** Trust level — strictest at top. */
  readonly trustLevel: 'verified-pqc-signed' | 'verified-classical-signed' | 'verified-content-only' | 'untrusted'
  /** Public key fingerprint to verify signatures against. */
  readonly publicKeyFingerprint?: string
  /** Collections we accept from this peer (empty = none). */
  readonly acceptedCollections: ReadonlyArray<string>
  /** Optional standards bundle the peer is certified for. */
  readonly certifiedStandards?: ReadonlyArray<{ body: string; id: string }>
}

/** Result of importing a federated row. */
export interface ImportResult {
  readonly ok: boolean
  /** Set when ok=false — the verification step that failed. */
  readonly failedAt?: 'envelope-shape' | 'content-uuid-mismatch' | 'untrusted-source' | 'collection-not-accepted' | 'signature-invalid' | 'duplicate-already-imported'
  readonly reason?: string
  /** Set when ok=true — the local id assigned to the imported row. */
  readonly localId?: string
}

/** A federation manifest — a peer publishes the list of uuids they're sharing. */
export interface FederationManifest {
  readonly publisherTenant: string
  readonly publishedAt: string
  readonly entries: ReadonlyArray<{
    readonly collection: string
    readonly uuid: string
    readonly mutability: 'immutable' | 'mutable'
    readonly latestVersion?: string
  }>
}
