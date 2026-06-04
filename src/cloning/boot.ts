/**
 * bootFromFederation — ingest a published genome into a clone instance.
 * Slice HHHHHH (2026-05-11). Per spec §0d.
 *
 * Flow:
 *   1. Verify scope matches what the clone requested
 *   2. Run Conservation Law 24 checkCloneIntegrity (uuid recompute)
 *   3. Register every section into the clone's runtime registries
 *      (CollectionSpec / BUSINESS_CHAINS / AgentRegistry /
 *       TENANT_ROLE_PROFILES / erpaxMcpTools)
 *   4. Run all 23 invariants under the new genome (gates the boot)
 *   5. Activate the 'erpax-platform' role on the clone's self-tenant
 *      (slice GGGGGG)
 *   6. Return { cloneDid, bootedAt, divergencePoint }
 *
 * Sandbox mode: skip the actual mutations and run-invariants step;
 * just parse + verify + return what WOULD have been registered. Used
 * by the test suite to keep registry state pristine across cases.
 *
 * @standard W3C Verifiable Credentials Data Model 2.0
 * @audit ISO 19011:2018 §6.4.6 (clone provenance preserved)
 */

import { checkCloneIntegrity } from '@/cloning/verify'
import type { GenomePublication, GenomeScope } from '@/cloning/publish'

export interface BootResult {
  readonly ok: boolean
}

export type BootSuccess = {
  readonly ok: true
  readonly cloneDid: string
  readonly bootedAt: string
  readonly registered: {
    readonly collections: number
    readonly chains: number
    readonly agents: number
    readonly roles: number
    readonly mcpTools: number
    readonly standards: number
  }
  readonly divergencePoint: {
    readonly sourceDid: string
    readonly sourceMerkleAnchor?: string
    readonly bootedAt: string
  }
}

export type BootFailure = {
  readonly ok: false
  readonly failedAt: 'scope-mismatch' | 'integrity-check' | 'invariant-failed' | 'signature-invalid'
  readonly reason: string
}

export type BootOutcome = BootSuccess | BootFailure

export async function bootFromFederation(args: {
  publication: GenomePublication
  cloneTenantId: string
  cloneDid: string
  requireScope?: GenomeScope
  /** Skip the registry mutations — parse + verify only. Used in tests. */
  sandbox?: boolean
  verifySignature?: (pub: GenomePublication) => Promise<boolean>
}): Promise<BootOutcome> {
  const { publication, cloneTenantId, cloneDid } = args

  // 1. Scope check
  if (args.requireScope && args.requireScope !== publication.scope) {
    return {
      ok: false,
      failedAt: 'scope-mismatch',
      reason: `requested scope='${args.requireScope}' but publication scope='${publication.scope}'`,
    }
  }

  // 2. Optional signature verification
  if (args.verifySignature) {
    const sigOk = await args.verifySignature(publication)
    if (!sigOk) {
      return { ok: false, failedAt: 'signature-invalid', reason: 'publication signature did not verify' }
    }
  }

  // 3. Conservation Law 24 integrity check
  const integrity = checkCloneIntegrity({
    publication,
    cloneBundle: publication.bundle,
    cloneTenantId,
  })
  if (!integrity.ok) {
    return {
      ok: false,
      failedAt: 'integrity-check',
      reason: 'reason' in integrity ? integrity.reason : 'integrity check failed',
    }
  }

  const bootedAt = new Date().toISOString()
  const registered = {
    collections: publication.bundle.collections.length,
    chains: publication.bundle.chains.length,
    agents: publication.bundle.agents.length,
    roles: publication.bundle.roles.length,
    mcpTools: publication.bundle.mcpTools.length,
    standards: publication.bundle.standards.length,
  }

  if (args.sandbox) {
    // Sandbox: skip the registry mutations + run-invariants step.
    return {
      ok: true,
      cloneDid,
      bootedAt,
      registered,
      divergencePoint: {
        sourceDid: publication.sourceDid,
        sourceMerkleAnchor: publication.merkleAnchor,
        bootedAt,
      },
    }
  }

  // 4-6. Real boot: registry mutations + invariant run + role activation.
  // Implementation lands when the registries gain a `register*FromBundle()` API.
  // For now, sandbox mode is the only supported path; production boot is a
  // documented follow-up cut on the same primitive.
  return {
    ok: false,
    failedAt: 'invariant-failed',
    reason: 'Production boot path requires registry register*FromBundle APIs (follow-up cut). Use sandbox: true to validate the genome.',
  }
}
