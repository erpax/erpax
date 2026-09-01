/** proof — empirical proof bundle barrel. */
export type {
  DryProofBundle,
  EmpiricalProofs,
  TamperCostProof,
  CorpusSelfProof,
  BuildProofArgs,
  DryProofPublishedResult,
  FederationEnvelope,
} from './dry'
export {
  MAX_PROOF_AGE_HOURS,
  empiricalProofs,
  proofTamperCost,
  buildDryProofBundle,
  publishDryProofBundle,
  getCurrentProofBundle,
  checkDryProofPublished,
  asFederationEnvelope,
} from './dry'

export * from './projection'
