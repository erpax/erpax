---
name: examples
description: "Use when seeding or referencing a self-contained tenant template — the business-model-agnostic example `TenantConfig`s (course-builder, newsletter, marketplace) and the `getConfigByBusinessModel` / `listExampleConfigs` accessors over them."
atomPath: config/examples
coordinate: config/examples · 9/unity · dd3d97ea
contentUuid: "00088232-e854-5996-8857-380aea58472f"
diamondUuid: "29130dc5-07ef-898d-be20-fc294db72fbb"
uuid: "dd3d97ea-e437-8fc4-b509-37a10fcb72f0"
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
  - "EU-Taxonomy-2020/852"
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
  computationUuid: "a714435d-0724-8475-b8b3-e76385a1f447"
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
      stageUuid: "85ae5cf1-b66a-8fd1-aa4a-fb91bbececdb"
    - stage: seal
      stageUuid: "fd1038ca-d232-8d6f-acda-dfe81563f936"
    - stage: uuid
      stageUuid: "01237754-7e32-829e-9bdd-4fda8cb85032"
version: 2
---
# config/examples — self-contained tenant templates

Concrete, business-model-agnostic seed configs that each conform to the `TenantConfig` contract: `courseBuilderConfig` (a course platform), `newsletterConfig` (a writer's newsletter, with a `null` = unlimited plan limit), and `marketplaceConfig` (a digital marketplace). Each is a complete tenant in one object — branding, subscription plans with feature limits, marketing homepage + pages, feature flags. They are templates, not the live config: an operator copies one and edits, proving the [[config]] shape seeds any business model with no code change. `getConfigByBusinessModel` looks one up by slug; `listExampleConfigs` returns them all.

Matter-twin: `src/config/examples/index.ts` (`courseBuilderConfig` ⊕ `newsletterConfig` · `marketplaceConfig` · `getConfigByBusinessModel` · `listExampleConfigs`, all typed by the `TenantConfig` from [[types]]). Composes [[config]] · [[types]].

**Law — [[law]]: every example tenant is a self-contained object that satisfies the one agnostic `TenantConfig` contract — the template seeds a working tenant by copy-and-edit, never by code change.**

@standard ISO-4217:2015 currency-codes
@standard BCP-47 language-tag
@accounting IFRS IFRS-15 revenue-from-contracts-with-customers
