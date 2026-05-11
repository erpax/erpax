/**
 * Inter-tenant federation — barrel.
 *
 * Slice AAAAAA. The substrate that lets ERPax instances exchange
 * content-addressed rows with verification on receive (Law 8 + Law 23).
 *
 * Foundation for scope expansions: anchoring (BBBBBB), standards-as-
 * objects (CCCCCC), DIDs (DDDDDD), long-term archival (EEEEEE).
 *
 * @standard W3C Activity Streams 2.0 + ActivityPub + LDN
 * @standard W3C Verifiable Credentials Data Model 2.0
 */

export type { FederatedRow, TrustEntry, ImportResult, FederationManifest } from './types'
export { exportRow, importRow } from './exchange'
