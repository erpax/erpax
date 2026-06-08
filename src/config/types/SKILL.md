---
name: types
description: "Use when typing a tenant's agnostic seed configuration — the `TenantConfig` shape (branding, businessModel, subscriptionPlans with feature limits, marketing content, feature flags, localization, stripe) plus the `TranslatedField` / `FeatureLimit` helpers."
atomPath: config/types
coordinate: config/types · 9/unity · 38c73c81
contentUuid: "c93c5314-b711-5000-933a-58994a017af9"
diamondUuid: "6f9ce139-488a-86d2-8795-decff0426986"
uuid: "38c73c81-b5ec-858a-a7e0-70fc75fb5b83"
horo: 9
bonds:
  in:
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
  out:
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
typography:
  partition: config
  bondDegree: 66
  neighbors:
    - agent
standards:
  - "BCP-47"
  - "BCP-47 language-tag"
  - "EU-Taxonomy-2020/852"
  - "GDPR Art.4(7) data-controller"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei"
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
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
  backlinks:
    - chat
    - collapse
    - config
    - decompression
    - examples
    - gate
    - law
    - optimize
    - payload
    - recover
    - schema
    - society
    - sti
    - test
    - torus
    - trinity
    - types
    - vitepress
signatures:
  computationUuid: "93ed9be2-fd0d-8e1c-a8b3-1d2efaf0d526"
  stages:
    - stage: path
      stageUuid: "0c15b24d-92f2-8307-b5d1-8a7a70e28e96"
    - stage: trinity
      stageUuid: "2b12ed3d-8ba9-84d2-abd2-bbd9b34f11fd"
    - stage: boundary
      stageUuid: "12d3f48f-d278-8152-889a-9fdf95f35c27"
    - stage: links
      stageUuid: "0ddfdbf1-d37d-8240-9942-a08bbe524264"
    - stage: horo
      stageUuid: "5f489717-fed2-855c-82a3-bac8a44a211e"
    - stage: seal
      stageUuid: "52444869-a2dd-8749-bf4f-7035de37ba99"
    - stage: uuid
      stageUuid: "5d5bfab4-35fd-85fd-9a83-8de6a2bd79f3"
version: 2
---
# config/types — the agnostic TenantConfig shape

One config file controls a tenant's whole business surface: branding (`colors`/`fonts`), `businessModel` (one of saas · ecommerce · marketplace · course · newsletter · service), the `subscriptionPlans` it offers (each with a `limits` bag — `apiCallsPerMonth`, `seats`, feature booleans), marketing content (homepage hero + pages), feature flags, supported languages, and optional stripe keys. It is business-model-agnostic: the same shape seeds any tenant, so swapping a tenant is swapping one typed object — no code change. Sibling templates hold conforming values; this atom holds only the structural contract they satisfy.

Matter-twin: `src/config/types/index.ts` (the `TenantConfig` interface ⊕ `TranslatedField` · `FeatureLimit` · `FeatureLimits`). Composes [[config]] · [[types]].

**Law — [[law]]: a tenant's entire business surface (branding, model, plans, marketing, flags, localization) is one agnostic typed seed — `TenantConfig` — so onboarding a tenant is authoring one conforming object, never editing code.**

@standard ISO-4217:2015 currency-codes
@standard BCP-47 language-tag
@accounting IFRS IFRS-15 revenue-from-contracts-with-customers
