---
name: types
description: "Use when typing a tenant's agnostic seed configuration — the `TenantConfig` shape (branding, businessModel, subscriptionPlans with feature limits, marketing content, feature flags, localization, stripe) plus the `TranslatedField` / `FeatureLimit` helpers."
atomPath: "config/types"
coordinate: "config/types · 3/3 · a47d89f5"
contentUuid: "cabe8636-472c-54dc-aea3-3b6ca6982c30"
diamondUuid: "31b9ec9a-4f11-8fcc-b38b-3daadcb5c951"
uuid: "a47d89f5-22ac-8ba9-939d-1b6efe1dab98"
horo: 3
typography:
  partition: config
  bondDegree: 66
standards:
  - "BCP-47"
  - "BCP-47 language-tag"
  - "GDPR Art.4(7) data-controller"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes"
  - "ISO-4217:2015 currency-codes"
bindings: []
signatures:
  computationUuid: "a61df4fa-664d-889e-97ef-701c54fe1c3b"
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
      stageUuid: "a32d50fb-0b74-8d5a-b690-edfc5eee4cf7"
    - stage: seal
      stageUuid: "52444869-a2dd-8749-bf4f-7035de37ba99"
    - stage: uuid
      stageUuid: "db735446-d72f-8c35-8397-37d5b8818d38"
version: 2
---
# config/types — the agnostic TenantConfig shape

One config file controls a tenant's whole business surface: branding (`colors`/`fonts`), `businessModel` (one of saas · ecommerce · marketplace · course · newsletter · service), the `subscriptionPlans` it offers (each with a `limits` bag — `apiCallsPerMonth`, `seats`, feature booleans), marketing content (homepage hero + pages), feature flags, supported languages, and optional stripe keys. It is business-model-agnostic: the same shape seeds any tenant, so swapping a tenant is swapping one typed object — no code change. Sibling templates hold conforming values; this atom holds only the structural contract they satisfy.

Matter-twin: `src/config/types/index.ts` (the `TenantConfig` interface ⊕ `TranslatedField` · `FeatureLimit` · `FeatureLimits`). Composes [[config]] · [[types]].

**Law — [[law]]: a tenant's entire business surface (branding, model, plans, marketing, flags, localization) is one agnostic typed seed — `TenantConfig` — so onboarding a tenant is authoring one conforming object, never editing code.**

@standard ISO-4217:2015 currency-codes
@standard BCP-47 language-tag
@accounting IFRS IFRS-15 revenue-from-contracts-with-customers
