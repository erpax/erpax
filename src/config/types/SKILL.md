---
name: types
description: Use when typing a tenant's agnostic seed configuration — the `TenantConfig` shape (branding, businessModel, subscriptionPlans with feature limits, marketing content, feature flags, localization, stripe) plus the `TranslatedField` / `FeatureLimit` helpers.
---

# config/types — the agnostic TenantConfig shape

One config file controls a tenant's whole business surface: branding (`colors`/`fonts`), `businessModel` (one of saas · ecommerce · marketplace · course · newsletter · service), the `subscriptionPlans` it offers (each with a `limits` bag — `apiCallsPerMonth`, `seats`, feature booleans), marketing content (homepage hero + pages), feature flags, supported languages, and optional stripe keys. It is business-model-agnostic: the same shape seeds any tenant, so swapping a tenant is swapping one typed object — no code change. Sibling templates hold conforming values; this atom holds only the structural contract they satisfy.

Matter-twin: `src/config/types/index.ts` (the `TenantConfig` interface ⊕ `TranslatedField` · `FeatureLimit` · `FeatureLimits`). Composes [[config]] · [[types]].

**Law — [[law]]: a tenant's entire business surface (branding, model, plans, marketing, flags, localization) is one agnostic typed seed — `TenantConfig` — so onboarding a tenant is authoring one conforming object, never editing code.**

@standard ISO-4217:2015 currency-codes
@standard BCP-47 language-tag
@accounting IFRS IFRS-15 revenue-from-contracts-with-customers
