/**
 * AI Suggestions — durable audit row per Cloudflare Workers AI inference.
 *
 * Slice WWW (2026-05-10): mandated by GDPR Art.22 + EU AI Act + ISO/IEC
 * 42001 + SOX §404 — every AI inference run on tenant data MUST produce
 * a durable, queryable record of: input prompt, model used, output, the
 * decision the human took (accepted / rejected / edited), and the
 * downstream record the suggestion was applied to. Without this, the
 * tenant has no Art.22(3) right-to-explain trail and the SOX auditor
 * has no evidence-of-control over AI-influenced decisions.
 *
 * Pairs with `src/services/ai/` (the inference entry-points) and the
 * `ai_*` feature flags in `FEATURE_REGISTRY` (per-plan entitlement).
 * Append-only on the AI side; humans add `humanDecision` + `appliedTo`
 * via the admin UI when they accept/reject the suggestion.
 *
 * @standard rfc-9562 uuid suggestion-id
 * @standard ISO-8601-1:2019 date-time inference-time
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @standard ISO/IEC 42001:2023 ai-management-system
 * @standard NIST AI-RMF-1.0 ai-risk-management-framework
 * @compliance GDPR Art.22 automated-individual-decision-making
 * @compliance GDPR Art.22(3) right-to-human-intervention
 * @compliance EU AI Act 2024 risk-classification + transparency
 * @compliance SOX §404 internal-controls ai-assisted-decision TOM-AI-01
 * @audit ISO-19011:2018 §6.4.6 audit-evidence ai-inference-trail
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27001 A.5.34 privacy-and-protection-of-pii
 * @security ISO-27002 §5.34 ai-output-validation
 * @see src/services/ai/
 * @see src/access/feature-registry.ts (ai_* features)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '../access/auth'
import { statusField, notesField, auditFields, taxonomySelect } from '../fields/base-accounting-fields'
import { EU_AI_ACT_RISK_OPTIONS } from '../standards/eu-ai-act'

const AiSuggestions: CollectionConfig = {
  slug: 'ai-suggestions',
  labels: { singular: 'AI Suggestion', plural: 'AI Suggestions' },
  admin: {
    useAsTitle: 'suggestionId',
    defaultColumns: ['suggestionId', 'feature', 'model', 'inferenceTime', 'humanDecision', 'status'],
    description:
      'Durable audit row per Cloudflare Workers AI inference. Required by GDPR Art.22(3) right-to-human-intervention + EU AI Act transparency + SOX §404 ai-assisted-decision evidence.',
  },
  // Reads tenant-scoped; writes admin-only (only the AI service writes,
  // and the human-decision update is gated on review role). No feature
  // gate on the COLLECTION itself — every tenant must see their AI trail
  // regardless of which AI features they're entitled to.
  access: accountingCollectionAccess(),
  fields: [
    { name: 'suggestionId', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'RFC 9562 UUID v4 — idempotency + cross-system correlation.', readOnly: true } },
    { name: 'feature', type: 'text', required: true, index: true,
      admin: { description: 'FEATURE_REGISTRY id (e.g. `ai_invoice_ocr`, `ai_sanctions_screening`).' } },
    { name: 'model', type: 'text', required: true, index: true,
      admin: { description: 'Cloudflare Workers AI model id (e.g. `@cf/meta/llama-3.1-8b-instruct`, `@cf/baai/bge-base-en-v1.5`).' } },
    { name: 'inferenceTime', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — when the inference was made.', readOnly: true } },
    {
      name: 'inputs',
      type: 'json',
      required: true,
      admin: { description: 'Input payload (sanitised — no raw PII when feature.privacyClass = `pii`). GDPR Art.5(1)(c) data minimisation applies.' },
    },
    {
      name: 'outputs',
      type: 'json',
      required: true,
      admin: { description: 'Raw model output. Stored for GDPR Art.22(3) explanation right + SOX evidence.' },
    },
    { name: 'confidence', type: 'number',
      admin: { description: 'Model confidence (0.0–1.0) when available. Drives the auto-accept threshold per feature.' } },
    taxonomySelect('aiRiskClass', EU_AI_ACT_RISK_OPTIONS, { required: true, defaultValue: 'limited', description: 'EU AI Act 2024 risk classification — drives downstream review intensity.' }),
    { name: 'sourceCollection', type: 'text', index: true,
      admin: { description: 'Slug of the collection the suggestion is FOR (e.g. `invoices`, `bank-transactions`, `kyc-checks`).' } },
    { name: 'sourceId', type: 'text', index: true,
      admin: { description: 'ID of the source row.' } },
    {
      name: 'humanDecision',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Accepted (applied as-is)', value: 'accepted' },
        { label: 'Edited + Accepted', value: 'edited' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Auto-Accepted (high-confidence)', value: 'auto_accepted' },
        { label: 'Escalated (high-risk review needed)', value: 'escalated' },
      ],
      admin: { description: 'GDPR Art.22(3) — human-in-the-loop decision. AI never auto-decides for high-risk class.' },
    },
    { name: 'decisionMaker', type: 'relationship', relationTo: 'users',
      admin: { description: 'Human who made the accept/reject decision (Art.22(3) right-to-human-intervention evidence).' } },
    { name: 'decisionAt', type: 'date',
      admin: { description: 'ISO 8601 — timestamp of the human decision.' } },
    { name: 'decisionRationale', type: 'textarea',
      admin: { description: 'Free-text rationale — required for `rejected` / `edited` / `escalated` outcomes.' } },
    { name: 'appliedTo', type: 'text',
      admin: { description: 'Reference to the downstream record the accepted suggestion was applied to (e.g. `journal-entries:42`).' } },
    {
      name: 'gateway',
      type: 'group',
      label: 'Cloudflare AI Gateway envelope',
      fields: [
        { name: 'gatewayId', type: 'text',
          admin: { description: 'AI Gateway routing id — for replay / cache lookup.' } },
        { name: 'cacheStatus', type: 'select', options: [
          { label: 'Miss (fresh inference)', value: 'miss' },
          { label: 'Hit (gateway-cached)', value: 'hit' },
          { label: 'Bypass', value: 'bypass' },
        ] },
        { name: 'tokensIn', type: 'number',
          admin: { description: 'Input tokens — drives metered billing per IFRS-15 §B16.' } },
        { name: 'tokensOut', type: 'number',
          admin: { description: 'Output tokens.' } },
        { name: 'latencyMs', type: 'number' },
        { name: 'usageRecord', type: 'relationship', relationTo: 'usage-records',
          admin: { description: 'Linked usage-record for metered AI billing (Slice VVV).' } },
      ],
    },
    statusField(
      [
        { label: 'Recorded (awaiting human decision)', value: 'recorded' },
        { label: 'Applied', value: 'applied' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Reversed', value: 'reversed' },
        { label: 'Quarantined (high-risk hold)', value: 'quarantined' },
      ],
      'recorded',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('ai-suggestions')],
  },
  timestamps: true,
}

export default AiSuggestions
