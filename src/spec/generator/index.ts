/**
 * Spec generator — barrel.
 *
 * Slice CCCCC (2026-05-11): the JSDoc-as-spec pipeline. The extractor
 * parses every collection's leading JSDoc banner into a `CollectionSpec`;
 * downstream generators (chain registry, feature registry, seed file,
 * test file, marketing page, README, admin-UI description, audit-evidence
 * PDF/A pack, slice ledger) consume that shape.
 *
 * @standard ISO/IEC 25010:2023 §5 modularity-and-maintainability
 * @audit ISO 19011:2018 §6.4 audit-evidence-spec-traceability
 */

export type {
  CollectionSpec, SpecCorpus, SpecStandard, SpecChainStep, SpecFeature,
  SpecRole, SpecEmit, SpecSubscribe, SpecExample, SpecInvariant,
  SpecUseCase, SpecSummary, SpecSlice, SpecCron, SpecSee,
} from './types'

export { extractFileSpec, extractCorpus } from './extractor'
export type { GeneratedChain, GeneratedChainStep, GenerateOptions } from './chain'
export { generateChains, renderChainAsTs } from './chain'

export type { GeneratedSeed } from './seed'
export { generateSeed } from './seed'

export type { GeneratedTest } from './scaffold'
export { generateTest } from './scaffold'

export type { EvidenceArtefact, WorkflowEvidence, EvidenceCorpus } from './collector'
export { collectEvidence } from './collector'

export type { GeneratedMultimedia, MultimediaManifest, PdfaEvidenceBlock, GenerateMultimediaOptions, Translator, StrictTranslationReporter } from './multimedia'
export { generateMultimediaForWorkflow, generateAllMultimedia, chainIdForWorkflow, createStrictReporter } from './multimedia'

export type { CollectionKeys, ChainKeys, WorkflowKeys } from './keys'
export { collectionKeys, chainKeys, chainStepKey, workflowKeys, workflowStepKey, defaultEnglishFor, humaniseSlug, isStub, STUB_PREFIX } from './keys'

export type { MissingKey, I18nAuditReport, Bundles } from './audit'
export { expectedKeys, auditI18n } from './audit'

export type { StubFillResult } from './filler'
export { fillStubs } from './filler'

export type { GeneratedTranslations } from './translation'
export { generateTranslations, pluraliseEnglish } from './translation'

export type { SpecTypeKind } from './templates'
export { SPEC_TEMPLATES, templateKey, compose, allTemplateKeys } from './templates'

export type { E2eSpecCorpus, E2eWorkflowSpec, E2eStep, UxGap, GapSeverity } from './e2e'
export { extractE2eCorpus, parseE2eSpec } from './e2e'

export type { GeneratedMarketingPage, MarketingPageOptions } from './marketing'
export { generateMarketingPage, generateAllMarketingPages } from './marketing'

export { translatePredicate, generateChainTestFromRegistry } from './scaffold'
