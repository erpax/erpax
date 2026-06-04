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

export type { GenomeBundle, CollectGenomeOptions } from '@/cloning/genome'
export { collectGenome, computeGenomeUuid } from '@/cloning/genome'

export type { GenomeScope, GenomeSignature, GenomePublication, PublishSelfArgs } from '@/cloning/publish'
export { publishSelf } from '@/cloning/publish'

export type { BootSuccess, BootFailure, BootOutcome } from '@/cloning/boot'
export { bootFromFederation } from '@/cloning/boot'

export type { CloneIntegrityResult } from '@/cloning/verify'
export { checkCloneIntegrity } from '@/cloning/verify'
