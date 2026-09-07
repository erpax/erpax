---
name: models
description: "Use when registering, routing, or auditing the AI model fallback catalog — provider/capability/tier per model, EU AI Act risk class, EU-hostable flag for data-residency, feature-guarded dispatch. The admin-editable expert-catalog the router dispatches over when the deterministic core cannot decide alone."
atomPath: "ai/models"
coordinate: "ai/models · 5/round · d3eba555"
contentUuid: "202fbfad-c2d7-5b6f-b1c6-614ab0192b0b"
diamondUuid: "97ef4421-3c50-8974-af30-e04ca7032840"
uuid: "d3eba555-a61f-8b58-a169-438c9e4152d5"
horo: 5
typography:
  partition: ai
  bondDegree: 30
standards:
  - "EU AI Act 2024 risk-classification + transparency"
  - "EU-AI-Act"
  - "EU-CSDDD-2024/1760"
  - "GDPR data-residency (`euHostable` — EU PoPs for EU tenants)"
  - "RFC-4122"
  - "RFC-4122 §4.3 uuid (content-addressed model identity)"
  - "RFC-4122 §4.3 uuid (content-addressed model identity)`"
  - "SOX §404 internal-controls"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "1ce74e56-f697-8ee9-9f60-9b164294592c"
  stages:
    - stage: path
      stageUuid: "e78584f2-055b-8136-92e8-38ff817ccfff"
    - stage: trinity
      stageUuid: "638b6bf8-f2e1-8a72-b402-c6e8694d6a5e"
    - stage: boundary
      stageUuid: "f207f784-6acc-88e2-9e19-76fe61705037"
    - stage: links
      stageUuid: "bd46005a-7c0f-85f5-b2f9-f8915cbdaffd"
    - stage: horo
      stageUuid: "349f5c43-a445-8474-92c7-c037798e326c"
    - stage: seal
      stageUuid: "fe7a8370-28bb-8d23-9e5b-df34a5b131b6"
    - stage: uuid
      stageUuid: "91e18a2d-c00d-887a-aac7-03fa2f6efb75"
version: 2
---
# ai-models

AI Models — the model catalog as erpax DATA (collections host any AI model).

One accountable object, two coexisting facets in this single folder:

- **`index.ts`** — the Payload **collection** (`ai-models`, the matter): the
  admin-editable expert catalog the router dispatches over (provider / capability /
  tier per model, EU AI Act risk class, `euHostable` data-residency flag, cost levers,
  audit fields). Schema + standards banners. Default export.
- **`service.ts`** — the model-id **registry** facet (`AI_MODELS` / `AiModelId`): the
  single DRY place erpax names the Workers-AI model ids it may fall back to (reasoning,
  reasoningDeep, vision, embed, pdfVision). A model swap is one edit, not a grep.
  Re-exported from `index.ts`, so `@/ai/models` resolves both facets from one address.
- **`seed.ts`** (opening data) and **`index.test.ts`** (invariant checks) co-located.

One folder per object ⇒ no scatter ⇒ no drift. erpax is AI-self-sufficient first: the
deterministic core decides whenever it can; these models are the FALLBACK tier, invoked
only when needed and strictly to the law and the standards (`callWorkersAi` enforces the
gate + per-tenant featureGuard + audit).

**Law — [[law]]: the model catalog is one accountable folder with two facets (the admin-editable Payload collection + the DRY `AI_MODELS` registry) the router dispatches over only when the deterministic [[self]] cannot decide; a model swap is one edit, every fallback gated and audited by `callWorkersAi`.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard RFC-4122 §4.3 uuid (content-addressed model identity)`

- EU AI Act 2024 risk-classification + transparency
- RFC-4122 §4.3 uuid (content-addressed model identity)
- GDPR data-residency (`euHostable` / Cloudflare EU PoPs for EU tenants)
- ISO-19011:2018 audit-trail model-catalogue-changes
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[ai/suggestions]] · [[access]] · [[hooks]] · [[field]] · [[standard]] · [[identity]].
See also: [[ai|cloudflare-ai]] (`callWorkersAi` — the single gated entrypoint that consumes the registry).

Composes: [[ai]] · [[ai]] · [[vocabulary/model]].
