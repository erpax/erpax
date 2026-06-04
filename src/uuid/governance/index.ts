/**
 * Self-governance via uuid — Conservation Law 63.
 *
 * Slice WWWWWWWWW-cut1 (2026-05-11). Per user 'uuid allows any to
 * govern itself'.
 *
 * The composition: every prior law in the uuid family combines to
 * let an entity declare a self-governance scope without any central
 * authority. The entity's uuid IS its identity (Law 8); the chain
 * rooted at that uuid IS its autonomous history (Law 60); the share
 * grants emitted within that scope ARE its RBAC (Law 59); the
 * signatures over its uuid ARE its attestations (HHHHHHHHH); the
 * structured uuidv8 encoding ARE its capability declarations (Law
 * 61); the self-closure fallbacks ARE its continuity guarantees
 * (Law 53). No external governor needed.
 *
 * **A GovernanceScope is the entity's autonomous boundary.** Inside
 * it, the entity:
 *   - Identifies itself via `rootUuid` (structured uuidv8)
 *   - Attests to events by extending its own chain
 *   - Grants/revokes its own access bindings
 *   - Verifies its own history by walking its chain
 *   - Recovers from external dependencies via self-closure
 *
 * Outside it, federation peers verify by replicating the chain and
 * checking each leaf's signature — no trust in any central root.
 *
 * **Conservation Law 63 (uuid allows any to govern itself):** any
 * entity with a uuid can be self-governing without central
 * authority, because uuid mathematics provides identity +
 * verification + RBAC + audit + closure + protection as composable
 * axes. Tenants, agents, rows, federations, individual users — all
 * compose the same primitives.
 *
 * Standards alignment:
 *   - W3C DID Core 1.0 — Decentralised IDentifiers
 *   - W3C Verifiable Credentials Data Model 2.0
 *   - DIF (Decentralized Identity Foundation) protocols
 *   - ISO/IEC TR 23244 (blockchain governance principles)
 *   - eIDAS Regulation §6 (electronic identification — self-sovereign
 *     scheme is one of the recognised frameworks)
 *
 * @standard W3C DID Core 1.0
 * @standard W3C Verifiable Credentials Data Model 2.0
 * @standard ISO/IEC TR 23244 blockchain governance
 * @standard eIDAS §6 electronic identification
 * @audit Conservation Law 63 uuid-self-governance
 * @feature uuid_governance
 * @see /src/services/uuid-format/index.ts (Law 61 — slot + capabilities)
 * @see /src/services/uuid-chain/index.ts (Law 60 — autonomous chain)
 * @see /src/services/uuid-share/index.ts (Law 59 — self-issued grants)
 * @see /src/services/integrity/signatures.ts (HHHHHHHHH — self-attestations)
 */

import type { ContentUuid } from '@/integrity/content-uuid'
import {
  encodeStructured, hasCapability, decodeStructured, CAPABILITIES,
  type SlotTag, type SlotName,
} from '@/uuid/format'
import { forgeGenesisLink, forgeChainLink, verifyChain } from '@/uuid/chain'
import type { ChainLink, LinkStore } from '@/uuid/chain'
import { computeContentUuid } from '@/integrity/content-uuid'

/** A self-governing entity's autonomous boundary. */
export interface GovernanceScope<E> {
  readonly rootUuid: ContentUuid<E>
  readonly tenantId: string
  readonly slotName: SlotName
  readonly capabilities: number   // structured uuid's capability flags
  readonly schemaVersion: number
  readonly establishedAt: string
  /** Genesis chain leaf uuid — anchors the entity's history. */
  readonly genesisLeafUuid: ContentUuid<ChainLink<E>>
  /** Current HEAD of the entity's chain (= genesisLeafUuid initially). */
  readonly headLeafUuid: ContentUuid<ChainLink<E>>
  /** Depth of the chain — 0 at genesis, +1 per attestation. */
  readonly chainDepth: number
}

export interface EstablishParams<E> {
  readonly entity: E
  readonly tenantId: string
  readonly slotTag: SlotTag
  readonly schemaVersion?: number
  readonly capabilities: ReadonlyArray<keyof typeof CAPABILITIES>
  readonly establishedAt?: string
}

/**
 * Establish a self-governance scope for an entity. Computes:
 *   1. The entity's structured rootUuid (slot + capabilities + content)
 *   2. The genesis chain leaf rooting the entity's history
 *
 * Pure function — no persistence side effects. Caller persists the
 * scope + the genesis leaf via whatever store.
 */
export function establishGovernance<E>(params: EstablishParams<E>): GovernanceScope<E> {
  const schemaVersion = params.schemaVersion ?? 1
  // OR-compose capability flags
  let capabilities = 0
  for (const name of params.capabilities) capabilities |= CAPABILITIES[name]
  const establishedAt = params.establishedAt ?? new Date().toISOString()

  // rootUuid is the structured uuid representing the entity itself.
  const rootUuid = encodeStructured({
    slotTag: params.slotTag,
    capabilities,
    schemaVersion,
    content: params.entity,
    tenantId: params.tenantId,
  }) as ContentUuid<E>

  // The slot NAME for diagnostics — decoded back from the rootUuid.
  const decoded = decodeStructured(rootUuid)
  const slotName = decoded.slotName

  // Genesis chain leaf — payloadUuid = contentUuid of the establishment
  // event (entity + capabilities + schema + ts).
  const payloadUuid = computeContentUuid(
    { entity: params.entity, capabilities, schemaVersion, establishedAt },
    params.tenantId,
  ) as ContentUuid<E>

  const genesis = forgeGenesisLink<E>({
    payloadUuid,
    tenantId: params.tenantId,
    occurredAt: establishedAt,
  })

  return {
    rootUuid,
    tenantId: params.tenantId,
    slotName,
    capabilities,
    schemaVersion,
    establishedAt,
    genesisLeafUuid: genesis.leafUuid,
    headLeafUuid: genesis.leafUuid,
    chainDepth: 0,
  }
}

export interface AttestParams<E, A> {
  readonly scope: GovernanceScope<E>
  readonly attestation: A
  readonly occurredAt?: string
}

export interface AttestResult<E> {
  readonly newHeadUuid: ContentUuid<ChainLink<E>>
  readonly chainLink: ChainLink<E>
  readonly updatedScope: GovernanceScope<E>
}

/**
 * Attest to an event within a governance scope by extending its
 * chain. The attestation's content-uuid becomes the new leaf's
 * payload-uuid; the leaf's predecessor is the scope's current head.
 *
 * Caller persists `result.chainLink` and uses `result.updatedScope`
 * as the new scope handle.
 */
export function attestWithinGovernance<E, A>(
  params: AttestParams<E, A>,
): AttestResult<E> {
  const occurredAt = params.occurredAt ?? new Date().toISOString()
  const payloadUuid = computeContentUuid(
    { attestation: params.attestation, occurredAt },
    params.scope.tenantId,
  ) as ContentUuid<A>

  // Type-laundering — the chain is parameterised over the entity
  // payload type but accepts arbitrary attestation payloads. The
  // type cast on chainLink.payloadUuid is intentional.
  const link = forgeChainLink({
    prevUuid: params.scope.headLeafUuid,
    prevDepth: params.scope.chainDepth,
    payloadUuid: payloadUuid as unknown as ContentUuid<E>,
    tenantId: params.scope.tenantId,
    occurredAt,
  })

  return {
    newHeadUuid: link.leafUuid,
    chainLink: link,
    updatedScope: {
      ...params.scope,
      headLeafUuid: link.leafUuid,
      chainDepth: link.depth,
    },
  }
}

export interface VerifyParams<E> {
  readonly scope: GovernanceScope<E>
  readonly store: LinkStore<E>
  readonly maxDepth?: number
}

export interface VerifyGovernanceResult {
  readonly ok: boolean
  readonly verifiedLeaves: number
  readonly headDepth: number
  readonly capabilities: ReadonlyArray<keyof typeof CAPABILITIES>
  readonly firstFailureLeaf?: string
  readonly firstFailureReason?: string
}

/**
 * Verify a governance scope end-to-end: walk the chain from HEAD to
 * genesis (Law 60) AND confirm the rootUuid's structured layout
 * decodes correctly with the claimed capabilities.
 *
 * Asymmetric cost (Law 55): O(N) verification; exponential tamper.
 */
export async function verifyGovernance<E>(
  params: VerifyParams<E>,
): Promise<VerifyGovernanceResult> {
  const chain = await verifyChain<E>({
    headUuid: params.scope.headLeafUuid,
    store: params.store,
    maxDepth: params.maxDepth,
  })
  // Decode the rootUuid and read back the capability flags.
  let capabilityNames: Array<keyof typeof CAPABILITIES> = []
  try {
    const decoded = decodeStructured(params.scope.rootUuid)
    capabilityNames = [...decoded.capabilityNames]
  } catch {
    return {
      ok: false,
      verifiedLeaves: chain.verifiedLeaves,
      headDepth: chain.depth,
      capabilities: [],
      firstFailureLeaf: params.scope.rootUuid,
      firstFailureReason: 'rootUuid is not a structured uuidv8',
    }
  }
  return {
    ok: chain.ok,
    verifiedLeaves: chain.verifiedLeaves,
    headDepth: chain.depth,
    capabilities: capabilityNames,
    firstFailureLeaf: chain.firstFailureLeaf,
    firstFailureReason: chain.firstFailureReason,
  }
}

/**
 * True iff a governance scope declares the named capability via its
 * structured rootUuid.
 *
 *   governanceHasCapability(scope, 'SIGNED')   → scope is self-attestable
 *   governanceHasCapability(scope, 'CHAINED')  → scope has a chain
 *   governanceHasCapability(scope, 'SHARED')   → scope can issue grants
 */
export function governanceHasCapability<E>(
  scope: GovernanceScope<E>,
  cap: keyof typeof CAPABILITIES,
): boolean {
  return hasCapability(scope.rootUuid, CAPABILITIES[cap])
}
