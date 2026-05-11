/**
 * Decentralized Identity (DID) — Slice DDDDDD. Per spec scope expansion #4.
 *
 * Every tenant + every agent gets a DID document (W3C DID Core v1.0);
 * the DID document is itself a uuid-keyed content-addressed object.
 * Cross-instance identity portability via federation.
 *
 * @standard W3C DID Core v1.0 — https://www.w3.org/TR/did-core/
 * @standard W3C DID Specification Registries
 */

import { computeContentUuid } from '@/services/integrity'

const DID_METHOD = 'erpax'
const DID_RE = /^did:erpax:([0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i

export interface DIDDocument {
  readonly '@context': ReadonlyArray<string>
  readonly id: string                                       // 'did:erpax:<uuid>'
  readonly controller?: string                              // optional parent DID
  readonly verificationMethod: ReadonlyArray<{
    readonly id: string
    readonly type: string                                   // 'Ed25519VerificationKey2020' | 'Ml-Dsa-2024' (Law 18)
    readonly controller: string
    readonly publicKeyMultibase: string
  }>
  readonly authentication: ReadonlyArray<string>            // verification-method ids
  readonly assertionMethod: ReadonlyArray<string>
  readonly service?: ReadonlyArray<{
    readonly id: string
    readonly type: string                                   // 'ErpaxMcpEndpoint' | 'FederationGenome' | …
    readonly serviceEndpoint: string
  }>
}

const DID_REGISTRY = new Map<string, DIDDocument>()

export function isErpaxDid(did: string): boolean {
  return DID_RE.test(did)
}

export function createDid(args: {
  subject: Record<string, unknown>
  publicKeyMultibase: string
  serviceEndpoints?: DIDDocument['service']
}): DIDDocument {
  const uuid = computeContentUuid(args.subject, 'did-namespace')
  const id = `did:${DID_METHOD}:${uuid}`
  const doc: DIDDocument = {
    '@context': ['https://www.w3.org/ns/did/v1'],
    id,
    verificationMethod: [{
      id: `${id}#keys-1`,
      type: 'Ed25519VerificationKey2020',
      controller: id,
      publicKeyMultibase: args.publicKeyMultibase,
    }],
    authentication: [`${id}#keys-1`],
    assertionMethod: [`${id}#keys-1`],
    service: args.serviceEndpoints,
  }
  DID_REGISTRY.set(id, doc)
  return doc
}

export function resolveDid(did: string): DIDDocument | undefined {
  return DID_REGISTRY.get(did)
}

export function listDids(): ReadonlyArray<string> {
  return [...DID_REGISTRY.keys()]
}

/** Extract the uuid from a did:erpax:<uuid> identifier. */
export function uuidFromDid(did: string): string | undefined {
  return did.match(DID_RE)?.[1]
}
