---
name: examples
description: "Use when seeding or referencing a self-contained tenant template — the business-model-agnostic example `TenantConfig`s (course-builder, newsletter, marketplace) and the `getConfigByBusinessModel` / `listExampleConfigs` accessors over them."
atomPath: "config/examples"
coordinate: "config/examples · 3/3 · 716dcc7b"
contentUuid: "8881f9b7-bd0d-54ae-99f5-f1cb857d56c7"
diamondUuid: "b181374f-b9a5-8540-b9d6-e8b2f89089f9"
uuid: "716dcc7b-4e9a-8c2a-a630-59ec575a87af"
horo: 3
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
  computationUuid: "19dd63eb-b781-8980-9ed1-b4a91bef0065"
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
      stageUuid: "bd778b48-6040-8b11-b894-2279e78f30bf"
    - stage: seal
      stageUuid: "f03d2605-b169-8723-80fc-2c01bfc14b48"
    - stage: uuid
      stageUuid: "ed7c36ea-3fe4-840c-b6c7-38261a5c80af"
version: 2
---
# config/examples — self-contained tenant templates

Concrete, business-model-agnostic seed configs that each conform to the `TenantConfig` contract: `courseBuilderConfig` (a course platform), `newsletterConfig` (a writer's newsletter, with a `null` = unlimited plan limit), and `marketplaceConfig` (a digital marketplace). Each is a complete tenant in one object — branding, subscription plans with feature limits, marketing homepage + pages, feature flags. They are templates, not the live config: an operator copies one and edits, proving the [[config]] shape seeds any business model with no code change. `getConfigByBusinessModel` looks one up by slug; `listExampleConfigs` returns them all.

Matter-twin: `src/config/examples/index.ts` (`courseBuilderConfig` ⊕ `newsletterConfig` · `marketplaceConfig` · `getConfigByBusinessModel` · `listExampleConfigs`, all typed by the `TenantConfig` from [[types]]). Composes [[config]] · [[types]].

**Law — [[law]]: every example tenant is a self-contained object that satisfies the one agnostic `TenantConfig` contract — the template seeds a working tenant by copy-and-edit, never by code change.**

@standard ISO-4217:2015 currency-codes
@standard BCP-47 language-tag
@accounting IFRS IFRS-15 revenue-from-contracts-with-customers
