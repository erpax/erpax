---
name: models
description: "Use when registering, routing, or auditing the AI model fallback catalog — provider/capability/tier per model, EU AI Act risk class, EU-hostable flag for data-residency, feature-guarded dispatch. The admin-editable expert-catalog the router dispatches over when the deterministic core cannot decide alone."
atomPath: "ai/models"
coordinate: "ai/models · 7/descent · 6b507ae3"
contentUuid: "7b2af127-f0b8-5cf3-88d3-eaa5a8dbab84"
diamondUuid: "17570577-6aa8-8086-a872-c05be0fcd616"
uuid: "6b507ae3-9f9b-8eb8-a017-f6355492c2e8"
horo: 7
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
  - "RFC-4122"
  - "RFC-4122 §4.3 uuid (content-addressed model identity)"
  - "RFC-4122 §4.3 uuid (content-addressed model identity)`"
  - "SOX §404 internal-controls"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "540b071f-01d7-845d-8c36-5c5aff2855de"
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
      stageUuid: "dbb20fbd-f0db-8247-b113-a7c8f0640bf9"
    - stage: seal
      stageUuid: "fe7a8370-28bb-8d23-9e5b-df34a5b131b6"
    - stage: uuid
      stageUuid: "64daf0e2-6810-821e-8299-2175776e58d5"
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

Composes: [[ai/suggestions]] · [[access]] · [[hooks]] · [[fields]] · [[standard]] · [[identity]].
See also: [[ai|cloudflare-ai]] (`callWorkersAi` — the single gated entrypoint that consumes the registry).
