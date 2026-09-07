---
name: types
description: "Use when typing a tenant's agnostic seed configuration — the `TenantConfig` shape (branding, businessModel, subscriptionPlans with feature limits, marketing content, feature flags, localization, stripe) plus the `TranslatedField` / `FeatureLimit` helpers."
atomPath: "config/types"
coordinate: "config/types · 6/6 · 2cc29db5"
contentUuid: "cd639e6d-ff89-5460-baad-f947d6071121"
diamondUuid: "8c69e37f-8609-8330-90a9-7f106d685cfd"
uuid: "2cc29db5-a188-8ebf-be2e-45f2ef9ff088"
horo: 6
typography:
  partition: config
  bondDegree: 85
standards:
  - "BCP-47"
  - "BCP-47 language-tag"
  - "GDPR Art.4(7) data-controller"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes"
  - "ISO-4217:2015 currency-codes"
bindings: []
signatures:
  computationUuid: "6dc82ad1-ee1f-8cbd-b2df-4fa29b65da99"
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
      stageUuid: "d23fc57a-7afc-8c6c-8757-085a196f550a"
    - stage: seal
      stageUuid: "d563d3f1-8608-8676-83f3-f6db5420a591"
    - stage: uuid
      stageUuid: "ec894ef9-8c55-8f73-bd61-49f5de7b12ef"
version: 2
---
# config/types — the agnostic TenantConfig shape

One config file controls a tenant's whole business surface: branding (`colors`/`fonts`), `businessModel` (one of saas · ecommerce · marketplace · course · newsletter · service), the `subscriptionPlans` it offers (each with a `limits` bag — `apiCallsPerMonth`, `seats`, feature booleans), marketing content (homepage hero + pages), feature flags, supported languages, and optional stripe keys. It is business-model-agnostic: the same shape seeds any tenant, so swapping a tenant is swapping one typed object — no code change. Sibling templates hold conforming values; this atom holds only the structural contract they satisfy.

Matter-twin: `src/config/types/index.ts` (the `TenantConfig` interface ⊕ `TranslatedField` · `FeatureLimit` · `FeatureLimits`). Composes [[config]] · [[types]].

**Law — [[law]]: a tenant's entire business surface (branding, model, plans, marketing, flags, localization) is one agnostic typed seed — `TenantConfig` — so onboarding a tenant is authoring one conforming object, never editing code.**

@standard ISO-4217:2015 currency-codes
@standard BCP-47 language-tag
@accounting IFRS IFRS-15 revenue-from-contracts-with-customers
