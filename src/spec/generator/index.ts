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
} from '@/spec/generator/types'

export { extractFileSpec, extractCorpus } from '@/spec/generator/extractor'
export type { GeneratedChain, GeneratedChainStep, GenerateOptions } from '@/spec/generator/chain-registry-generator'
export { generateChains, renderChainAsTs } from '@/spec/generator/chain-registry-generator'

export type { GeneratedSeed } from '@/spec/generator/seed-generator'
export { generateSeed } from '@/spec/generator/seed-generator'

export type { GeneratedTest } from '@/spec/generator/test-generator'
export { generateTest } from '@/spec/generator/test-generator'

export type { EvidenceArtefact, WorkflowEvidence, EvidenceCorpus } from '@/spec/generator/evidence-collector'
export { collectEvidence } from '@/spec/generator/evidence-collector'

export type { GeneratedMultimedia, MultimediaManifest, PdfaEvidenceBlock, GenerateMultimediaOptions, Translator, StrictTranslationReporter } from '@/spec/generator/multimedia-generator'
export { generateMultimediaForWorkflow, generateAllMultimedia, chainIdForWorkflow, createStrictReporter } from '@/spec/generator/multimedia-generator'

export type { CollectionKeys, ChainKeys, WorkflowKeys } from '@/spec/generator/i18n-keys'
export { collectionKeys, chainKeys, chainStepKey, workflowKeys, workflowStepKey, defaultEnglishFor, humaniseSlug, isStub, STUB_PREFIX } from '@/spec/generator/i18n-keys'

export type { MissingKey, I18nAuditReport, Bundles } from '@/spec/generator/i18n-audit'
export { expectedKeys, auditI18n } from '@/spec/generator/i18n-audit'

export type { StubFillResult } from '@/spec/generator/i18n-stub-filler'
export { fillStubs } from '@/spec/generator/i18n-stub-filler'

export type { GeneratedTranslations } from '@/spec/generator/translation-generator'
export { generateTranslations, pluraliseEnglish } from '@/spec/generator/translation-generator'

export type { SpecTypeKind } from '@/spec/generator/spec-templates'
export { SPEC_TEMPLATES, templateKey, compose, allTemplateKeys } from '@/spec/generator/spec-templates'

export type { E2eSpecCorpus, E2eWorkflowSpec, E2eStep, UxGap, GapSeverity } from '@/spec/generator/e2e-spec-extractor'
export { extractE2eCorpus, parseE2eSpec } from '@/spec/generator/e2e-spec-extractor'

export type { GeneratedMarketingPage, MarketingPageOptions } from '@/spec/generator/marketing-page-generator'
export { generateMarketingPage, generateAllMarketingPages } from '@/spec/generator/marketing-page-generator'
