/**
 * AI services barrel — every AI use-case + the canonical entry point.
 *
 * Slice XXX (2026-05-10): single import surface for the 9 AI
 * features. Per "no entropy" — never bypass `callWorkersAi`; every
 * use-case wrapper goes through it for the 5-gate enforcement
 * (entitlement, audit row, tenant scope, risk class, metering).
 *
 * @standard ISO/IEC 42001:2023 ai-management-system
 * @compliance GDPR Art.22(3) right-to-human-intervention
 * @compliance EU AI Act 2024 transparency-and-risk-classification
 * @see ./cloudflare-ai.ts
 */

export { detectPromptInjection, sanitisePiiForAi } from './ai-security'

// Canonical entry point — every AI inference goes through here.
export {
  callWorkersAi,
  type AiCallOptions,
  type AiCallResult,
  type WorkersAiBinding,
} from './cloudflare-ai'

// Per-feature thin wrappers (one per FEATURE_REGISTRY ai_* entry).
export { extractInvoiceFromScan, type InvoiceOcrInput, type InvoiceOcrOutput } from './invoice-ocr'
export { matchBankTransactionToInvoice, type BankMatchInput, type BankMatchOutput } from './bank-matching'
export { screenSubjectAgainstSanctions, type SanctionsScreeningInput, type SanctionsScreeningOutput } from './sanctions-screening'
export { detectJournalEntryAnomalies, type JournalEntryAnomalyInput, type JournalEntryAnomalyOutput } from './anomaly-detection'
export { classifyInvoiceLineTax, type TaxClassificationInput, type TaxClassificationOutput } from './tax-classification'
export { suggestHsCode, type HsCodeSuggestionInput, type HsCodeSuggestionOutput } from './hs-code-suggestion'
export { classifyDocument, type DocumentClassificationInput, type DocumentClassificationOutput, type DocumentKind } from './document-classification'
export { embedAndUpsertDocument, type EmbedDocumentInput, type EmbedDocumentOutput, type VectorizeBinding } from './embed-document'
export { semanticSearch, type SemanticSearchInput, type SemanticSearchOutput, type VectorizeQueryBinding } from './semantic-search'
export { summariseAuditTrail, type AuditSummarisationInput, type AuditSummarisationOutput } from './audit-summarisation'

// Industry problem → diamond remedy mapping (production failure modes).
export {
  AI_INDUSTRY_PROBLEMS,
  remedyFor,
  allProblems,
  groundToolCall,
  workflowCorrelationUuid,
  receiptAgentStep,
  convergeAgentArtifacts,
  cascadeDepthVerdict,
  groundOutputVerdict,
  humanGateVerdict,
  trustBoundaryVerdict,
  type AiIndustryProblem,
  type DiamondRemedy,
  type RemedyCoverage,
} from './industry'
