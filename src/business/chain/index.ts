/**
 * Business chains — barrel.
 *
 * Slice KKKK (2026-05-10): the 15 canonical chains live in
 * `./registry.ts`; the framework lives in the sibling files. Doc
 * generator at `./generate-docs.ts` produces `docs/BUSINESS_CHAINS.md`.
 */

export type { BusinessChain, BusinessChainRegistry, ChainStep, ChainStepProducer, SocraticCheck, ChainRunResult } from '@/business/chain/types'
export { BUSINESS_CHAINS, BUSINESS_CHAIN_IDS, chainsForCollection, chainsForFeature } from '@/business/chain/registry'
export { runChain, type ChainStepImpl, type ChainImpls } from '@/business/chain/run-chain'
export { createChainContext, teardownChainContext, type ChainContext, type ChainContextOptions } from '@/business/chain/chain-context'
// Slice BBBBBBBB (2026-05-11) — factory consumes this to auto-wire chain
// emit producers from BUSINESS_CHAINS (single source of truth for which
// `(collection, status) → event` pairs fire).
export { wireChainProducersFor } from '@/business/chain/wire-producers'
