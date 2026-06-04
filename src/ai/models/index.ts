/**
 * AI Models — the model catalog as erpax DATA (collections host any AI model).
 *
 * The model registry belongs IN Payload, not in a code constant: each model
 * erpax may fall back to is a row here — admin-editable, tenant-scopable,
 * content-uuid'd (contentUuidPlugin), taggable (taggablePlugin), versioned,
 * and audited like everything else. Inferences are already hosted in
 * `ai-suggestions` (every prompt/model/output/decision — total recall); this
 * is the experts catalog the router dispatches over.
 *
 * erpax is AI-self-sufficient first: the deterministic core decides whenever
 * it can; these models are the FALLBACK tier, invoked only when needed and
 * strictly to the law and the standards (EU AI Act risk class carried here;
 * `callWorkersAi` enforces the gate + per-tenant featureGuard + audit). The
 * cascade is `self → standard → deep` (see the `identity` skill, Totality).
 *
 * @standard EU AI Act 2024 risk-classification + transparency
 * @standard RFC-4122 §4.3 uuid (content-addressed model identity)
 * @compliance GDPR data-residency (`euHostable` — EU PoPs for EU tenants)
 * @audit ISO-19011:2018 audit-trail model-catalogue-changes
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./AiSuggestions.ts (every inference / message — total recall)
 * @see ../cloudflare-ai.ts (the gated, cached entrypoint)
 * @see ./service.ts (the model-id registry facet — `AI_MODELS` / `AiModelId`)
 */
import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { auditFields, notesField, taxonomySelect } from '@/base/accounting/field'
import { EU_AI_ACT_RISK_OPTIONS } from '@/eu/ai/act'

// Co-located service facet — the model-id registry the router dispatches over.
// Re-exported so `@/ai/models` resolves both the collection (default) and the
// registry constant/type from one folder address (one accountable object).
export { AI_MODELS, type AiModelId } from '@/ai/models/service'

const AiModels: CollectionConfig = {
  slug: 'ai-models',
  labels: { singular: 'AI Model', plural: 'AI Models' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'modelId', 'capability', 'tier', 'riskClass', 'status'],
    description:
      'Model catalog — the fallback experts the router dispatches over. Self-sufficient core decides first; AI strictly law/standards-gated.',
  },
  access: accountingCollectionAccess(),
  fields: [
    {
      name: 'modelId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Provider model id (e.g. @cf/deepseek-ai/deepseek-r1-distill-qwen-32b).' },
    },
    { name: 'name', type: 'text', required: true },
    {
      name: 'provider',
      type: 'select',
      defaultValue: 'cloudflare-workers-ai',
      options: [
        { label: 'Cloudflare Workers AI', value: 'cloudflare-workers-ai' },
        { label: 'OpenAI', value: 'openai' },
        { label: 'Anthropic', value: 'anthropic' },
        { label: 'DeepSeek (direct)', value: 'deepseek' },
        { label: 'Self-hosted', value: 'self-hosted' },
      ],
    },
    {
      name: 'capability',
      type: 'select',
      required: true,
      options: [
        { label: 'Reason / extract', value: 'reason' },
        { label: 'Vision / OCR', value: 'vision' },
        { label: 'Embed', value: 'embed' },
        { label: 'Rerank', value: 'rerank' },
      ],
      admin: { description: 'What the model is dispatched for.' },
    },
    {
      name: 'tier',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard (default fallback)', value: 'standard' },
        { label: 'Deep (heavy reasoning — only when needed)', value: 'deep' },
      ],
      admin: { description: 'Reasoning depth in the cascade (standard → deep).' },
    },
    taxonomySelect('riskClass', EU_AI_ACT_RISK_OPTIONS, {
      defaultValue: 'limited',
      description: 'EU AI Act 2024 risk class — enforced at the call gate.',
    }),
    {
      name: 'euHostable',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Can run on EU PoPs (GDPR data-residency for EU tenants).' },
    },
    {
      name: 'openWeights',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Open-weights (forkable / self-hostable / federatable).' },
    },
    { name: 'costPer1kInput', type: 'number', admin: { description: 'Cost lever — per 1k input tokens.' } },
    { name: 'costPer1kOutput', type: 'number', admin: { description: 'Cost lever — per 1k output tokens.' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      index: true,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Deprecated', value: 'deprecated' },
        { label: 'Disabled', value: 'disabled' },
      ],
    },
    ...auditFields(),
    notesField(),
  ],
  hooks: standardCollectionHooks('ai-models'),
  timestamps: true,
}

export default AiModels
