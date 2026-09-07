---
name: examples
description: "Use when seeding or referencing a self-contained tenant template — the business-model-agnostic example `TenantConfig`s (course-builder, newsletter, marketplace) and the `getConfigByBusinessModel` / `listExampleConfigs` accessors over them."
atomPath: "config/examples"
coordinate: "config/examples · 3/3 · 47b88c8b"
contentUuid: "fa37ce14-4a1b-546d-ab3e-1ed13e1c7e26"
diamondUuid: "23e736e8-747f-84bd-992c-daa980e68f46"
uuid: "47b88c8b-9dd2-8d7a-849c-a65f6059d819"
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
  computationUuid: "f701d126-a3e9-8cfe-940a-f6de7adf20ab"
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
      stageUuid: "89ce8e47-7ca4-8b33-b92a-04b4161498c9"
    - stage: seal
      stageUuid: "f03d2605-b169-8723-80fc-2c01bfc14b48"
    - stage: uuid
      stageUuid: "14cc784b-bc71-8cca-93ac-14bd25325f4d"
version: 2
---
# config/examples — self-contained tenant templates

Concrete, business-model-agnostic seed configs that each conform to the `TenantConfig` contract: `courseBuilderConfig` (a course platform), `newsletterConfig` (a writer's newsletter, with a `null` = unlimited plan limit), and `marketplaceConfig` (a digital marketplace). Each is a complete tenant in one object — branding, subscription plans with feature limits, marketing homepage + pages, feature flags. They are templates, not the live config: an operator copies one and edits, proving the [[config]] shape seeds any business model with no code change. `getConfigByBusinessModel` looks one up by slug; `listExampleConfigs` returns them all.

Matter-twin: `src/config/examples/index.ts` (`courseBuilderConfig` ⊕ `newsletterConfig` · `marketplaceConfig` · `getConfigByBusinessModel` · `listExampleConfigs`, all typed by the `TenantConfig` from [[types]]). Composes [[config]] · [[types]].

**Law — [[law]]: every example tenant is a self-contained object that satisfies the one agnostic `TenantConfig` contract — the template seeds a working tenant by copy-and-edit, never by code change.**

@standard ISO-4217:2015 currency-codes
@standard BCP-47 language-tag
@accounting IFRS IFRS-15 revenue-from-contracts-with-customers
