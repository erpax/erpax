---
name: examples
description: "Use when seeding or referencing a self-contained tenant template — the business-model-agnostic example `TenantConfig`s (course-builder, newsletter, marketplace) and the `getConfigByBusinessModel` / `listExampleConfigs` accessors over them."
atomPath: "config/examples"
coordinate: "config/examples · 6/6 · 90aa0a24"
contentUuid: "55cc78d9-08b2-5aff-a2fc-25fb5bd984f1"
diamondUuid: "ef0dc615-d4a9-87e5-bb08-254a82cd1b99"
uuid: "90aa0a24-a665-8be4-9702-9f1b5ef150b6"
horo: 6
typography:
  partition: config
  bondDegree: 9
standards:
  - "BCP-47"
  - "BCP-47 language-tag"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes"
  - "ISO-4217:2015 currency-codes"
bindings: []
signatures:
  computationUuid: "1902b1e6-a16f-8b49-af55-9f573e4c9683"
  stages:
    - stage: path
      stageUuid: "6ed26be1-495e-8373-b7ba-52573f0457da"
    - stage: trinity
      stageUuid: "32eedc59-1100-8329-816a-b6e66ab7e8a7"
    - stage: boundary
      stageUuid: "c6c21727-8066-867a-9d0c-5fff9dbb8f74"
    - stage: links
      stageUuid: "373c7a9c-b072-85bb-8484-e2cd834b0717"
    - stage: horo
      stageUuid: "5a6ea3e2-872b-847c-ba02-2fe2275df490"
    - stage: seal
      stageUuid: "fd1038ca-d232-8d6f-acda-dfe81563f936"
    - stage: uuid
      stageUuid: "0eca8e53-9d70-8fcd-bccf-e70032f3cca1"
version: 2
---
# config/examples — self-contained tenant templates

Concrete, business-model-agnostic seed configs that each conform to the `TenantConfig` contract: `courseBuilderConfig` (a course platform), `newsletterConfig` (a writer's newsletter, with a `null` = unlimited plan limit), and `marketplaceConfig` (a digital marketplace). Each is a complete tenant in one object — branding, subscription plans with feature limits, marketing homepage + pages, feature flags. They are templates, not the live config: an operator copies one and edits, proving the [[config]] shape seeds any business model with no code change. `getConfigByBusinessModel` looks one up by slug; `listExampleConfigs` returns them all.

Matter-twin: `src/config/examples/index.ts` (`courseBuilderConfig` ⊕ `newsletterConfig` · `marketplaceConfig` · `getConfigByBusinessModel` · `listExampleConfigs`, all typed by the `TenantConfig` from [[types]]). Composes [[config]] · [[types]].

**Law — [[law]]: every example tenant is a self-contained object that satisfies the one agnostic `TenantConfig` contract — the template seeds a working tenant by copy-and-edit, never by code change.**

@standard ISO-4217:2015 currency-codes
@standard BCP-47 language-tag
@accounting IFRS IFRS-15 revenue-from-contracts-with-customers
