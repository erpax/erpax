---
name: examples
description: "Use when seeding or referencing a self-contained tenant template — the business-model-agnostic example `TenantConfig`s (course-builder, newsletter, marketplace) and the `getConfigByBusinessModel` / `listExampleConfigs` accessors over them."
atomPath: "config/examples"
coordinate: "config/examples · 9/unity · d26be1fc"
contentUuid: "7eb82cf5-e62e-58b7-9b52-8cb9427ab60f"
diamondUuid: "83f1d3a9-e8a6-854e-928a-52f45731ff96"
uuid: "d26be1fc-3ec6-8167-990a-f21cbf9f9723"
horo: 9
bonds:
  in:
    - config
    - law
    - types
  out:
    - config
    - law
    - types
typography:
  partition: config
  bondDegree: 9
  neighbors: []
standards:
  - "BCP-47"
  - "BCP-47 language-tag"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes"
  - "ISO-4217:2015 currency-codes"
bindings: []
neighbors:
  wikilink:
    - config
    - law
    - types
  matrix:
    - config
    - law
    - types
  backlinks:
    - config
    - law
    - types
signatures:
  computationUuid: "6e789a59-05a9-8f22-9cbc-1244f8b42259"
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
      stageUuid: "c813faa0-6531-8a6b-8c97-1cb2227e4334"
    - stage: seal
      stageUuid: "fd1038ca-d232-8d6f-acda-dfe81563f936"
    - stage: uuid
      stageUuid: "2698fc20-4d97-8b10-93ff-c09a921d37e9"
version: 2
---
# config/examples — self-contained tenant templates

Concrete, business-model-agnostic seed configs that each conform to the `TenantConfig` contract: `courseBuilderConfig` (a course platform), `newsletterConfig` (a writer's newsletter, with a `null` = unlimited plan limit), and `marketplaceConfig` (a digital marketplace). Each is a complete tenant in one object — branding, subscription plans with feature limits, marketing homepage + pages, feature flags. They are templates, not the live config: an operator copies one and edits, proving the [[config]] shape seeds any business model with no code change. `getConfigByBusinessModel` looks one up by slug; `listExampleConfigs` returns them all.

Matter-twin: `src/config/examples/index.ts` (`courseBuilderConfig` ⊕ `newsletterConfig` · `marketplaceConfig` · `getConfigByBusinessModel` · `listExampleConfigs`, all typed by the `TenantConfig` from [[types]]). Composes [[config]] · [[types]].

**Law — [[law]]: every example tenant is a self-contained object that satisfies the one agnostic `TenantConfig` contract — the template seeds a working tenant by copy-and-edit, never by code change.**

@standard ISO-4217:2015 currency-codes
@standard BCP-47 language-tag
@accounting IFRS IFRS-15 revenue-from-contracts-with-customers
