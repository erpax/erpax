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
export type { GeneratedChain, GeneratedChainStep, GenerateOptions } from './chain-registry-generator'
export { generateChains, renderChainAsTs } from './chain-registry-generator'

export type { GeneratedSeed } from './seed-generator'
export { generateSeed } from './seed-generator'

export type { GeneratedTest } from './test-generator'
export { generateTest } from './test-generator'

export type { EvidenceArtefact, WorkflowEvidence, EvidenceCorpus } from './evidence-collector'
export { collectEvidence } from './evidence-collector'

export type { GeneratedMultimedia, MultimediaManifest, PdfaEvidenceBlock, GenerateMultimediaOptions, Translator, StrictTranslationReporter } from './multimedia-generator'
export { generateMultimediaForWorkflow, generateAllMultimedia, chainIdForWorkflow, createStrictReporter } from './multimedia-generator'

export type { CollectionKeys, ChainKeys, WorkflowKeys } from './i18n-keys'
export { collectionKeys, chainKeys, chainStepKey, workflowKeys, workflowStepKey, defaultEnglishFor, humaniseSlug, isStub, STUB_PREFIX } from './i18n-keys'

export type { MissingKey, I18nAuditReport, Bundles } from './i18n-audit'
export { expectedKeys, auditI18n } from './i18n-audit'

export type { StubFillResult } from './i18n-stub-filler'
export { fillStubs } from './i18n-stub-filler'

export type { GeneratedTranslations } from './translation-generator'
export { generateTranslations, pluraliseEnglish } from './translation-generator'

export type { SpecTypeKind } from './spec-templates'
export { SPEC_TEMPLATES, templateKey, compose, allTemplateKeys } from './spec-templates'

export type { E2eSpecCorpus, E2eWorkflowSpec, E2eStep, UxGap, GapSeverity } from './e2e-spec-extractor'
export { extractE2eCorpus, parseE2eSpec } from './e2e-spec-extractor'

export type { GeneratedMarketingPage, MarketingPageOptions } from './marketing-page-generator'
export { generateMarketingPage, generateAllMarketingPages } from './marketing-page-generator'
