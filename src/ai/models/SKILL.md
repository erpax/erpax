---
name: models
description: "Use when registering, routing, or auditing the AI model fallback catalog — provider/capability/tier per model, EU AI Act risk class, EU-hostable flag for data-residency, feature-guarded dispatch. The admin-editable expert-catalog the router dispatches over when the deterministic core cannot decide alone."
atomPath: ai/models
coordinate: ai/models · 4/weave · 50578fd2
contentUuid: "cb630b00-a155-5d7d-8b9d-7f2d8869ac38"
diamondUuid: "7490bc3a-393a-8749-87c7-895290204770"
uuid: "50578fd2-6188-8a15-9b43-250b8d32989d"
horo: 4
bonds:
  in:
    - access
    - ai
    - fields
    - hooks
    - identity
    - law
    - self
    - standard
    - suggestions
  out:
    - access
    - ai
    - fields
    - hooks
    - identity
    - law
    - self
    - standard
    - suggestions
typography:
  partition: ai
  bondDegree: 27
  neighbors: []
standards:
  - "EU AI Act 2024 risk-classification + transparency"
  - "EU-2024/1183"
  - "EU-2024/1620"
  - "EU-2024/1624"
  - "EU-AI-Act"
  - "EU-CSDDD-2024/1760"
  - "GDPR data-residency (`euHostable` — EU PoPs for EU tenants)"
  - "ISO-19011:2018 audit-trail model-catalogue-changes"
  - "RFC-4122"
  - "RFC-4122 §4.3 uuid (content-addressed model identity)"
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink:
    - access
    - ai
    - fields
    - hooks
    - identity
    - law
    - self
    - standard
    - suggestions
  matrix:
    - access
    - ai
    - fields
    - hooks
    - identity
    - law
    - self
    - standard
    - suggestions
  backlinks:
    - access
    - ai
    - fields
    - hooks
    - identity
    - law
    - self
    - standard
    - suggestions
signatures:
  computationUuid: "5e4e160a-f2d9-8995-baea-64b155992bc6"
  stages:
    - stage: path
      stageUuid: "e78584f2-055b-8136-92e8-38ff817ccfff"
    - stage: trinity
      stageUuid: "638b6bf8-f2e1-8a72-b402-c6e8694d6a5e"
    - stage: boundary
      stageUuid: "f207f784-6acc-88e2-9e19-76fe61705037"
    - stage: links
      stageUuid: "211843b7-f577-8a87-8c0f-63187698184e"
    - stage: horo
      stageUuid: "5be06f00-8b8c-8a67-9f13-a0427420a0ee"
    - stage: seal
      stageUuid: "53f68ebf-d345-83ca-9396-4f45c406b203"
    - stage: uuid
      stageUuid: "6108ec96-d55d-8c50-8692-2d9856c67d94"
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
- EU AI Act 2024 risk-classification + transparency
- RFC-4122 §4.3 uuid (content-addressed model identity)
- GDPR data-residency (`euHostable` / Cloudflare EU PoPs for EU tenants)
- ISO-19011:2018 audit-trail model-catalogue-changes
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[ai/suggestions]] · [[access]] · [[hooks]] · [[fields]] · [[standard]] · [[identity]].
See also: [[ai|cloudflare-ai]] (`callWorkersAi` — the single gated entrypoint that consumes the registry).
