/**
 * ERPax cloning — barrel.
 *
 * Slice HHHHHH (2026-05-11). Per spec §0d 'ERPax clones itself':
 * mitosis as federation applied to the platform's own spec + state.
 *
 * Tested through src/services/cloning/{genome,publish,boot,verify}.test.ts.
 *
 * @standard W3C Verifiable Credentials Data Model 2.0
 * @audit ISO 19011:2018 §6.4.6 (clone provenance + Conservation Law 24)
 */

export type { GenomeBundle, CollectGenomeOptions } from './genome'
export { collectGenome, computeGenomeUuid } from './genome'

export type { GenomeScope, GenomeSignature, GenomePublication, PublishSelfArgs } from './publish'
export { publishSelf } from './publish'

export type { BootSuccess, BootFailure, BootOutcome } from './boot'
export { bootFromFederation } from './boot'

export type { CloneIntegrityResult } from './verify'
export { checkCloneIntegrity } from './verify'
