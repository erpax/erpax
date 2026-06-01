---
name: seed
description: Use when seeding a tenant's opening chart-of-accounts + compliance posture from a (country × industry) template — INDUSTRY_TEMPLATES, the BG-NSS statutory chart, resolveTenantCompliance/getCuratedComplianceCountries. Derives every country fact from country-context; nothing is re-typed.
---

# seed — the (country × industry) opening-books template

`seed` is the tenant-bootstrap atom: given a **country** and an **industry archetype**, produce the opening **chart of accounts** + **compliance posture** a fresh tenant starts on. The law is **derive, never re-type** — `INDUSTRY_TEMPLATES` and `resolveTenantCompliance` read the live `country-context` (`resolveCountryContext` → `profile`/`specifics`/`apis`/`helpers`), so when a registry value changes (reporting currency, statutory chart reference, e-invoicing mandate, official-API kinds) every template picks it up automatically. An `IndustryTemplate` is `{ id, label, description, standards[], chartOfAccounts[], tenant, compliance }`; the `id` slug is the human key ([[code]]), the content-`uuid` ([[identity]]) the machine key; `label`/`description` are localizable ([[localize]]). Each `chartOfAccounts` covers all five IAS-1 §54 element types (asset · liability · equity · revenue · expense) with unique `accountNumber`s, and every `@standard`/`@accounting` banner is TRUE per [[standard]]. `BG_NSS_TEMPLATE` is the Bulgarian National statutory chart (`BG-NSS`) — the worked example, registered under `INDUSTRY_TEMPLATES['bg-nss']`.

Composes: [[accounting]] (chart of accounts, the accountable archetype), [[standard]] (IFRS IAS-1 §54, per-country statutory charts, EN-16931 e-invoicing), [[currency]] (ISO-4217 reporting currency), [[localize]] (per-locale label/description), [[identity]] (content-uuid template id), [[code]] (slug human key). Lives next to [[accounting]] under `src/services/accounting/seeds/templates/`.

## The two surfaces
- **Static templates** (`INDUSTRY_TEMPLATES`, the `*_TEMPLATE` constants) — curated opening books per industry, country baked in at build via the builder that calls `resolveCountryContext(country)`.
- **Dynamic resolution** (`resolveTenantCompliance({ country, reportingCurrency? })`) — compute a posture for *any* country at runtime, honouring a per-tenant currency override and falling back to dynamic country-context for uncurated countries (`'ZZ'` ⇒ `statutoryChartReference: null`, mandate `false`, kinds `[]`-shaped).

## Common mistakes
- Re-typing a country fact (currency, statutory chart, mandate, API kinds) inline instead of deriving from `resolveCountryContext` — the template silently drifts from the registry.
- Using gl-accounts' `income` element where IAS-1 §54 says `revenue` — the seed vocabulary is the five IAS-1 element types, not the ledger's `type` enum.
- Hard-coding hyphenated API kinds (`business-registry`) — `CountryApiKind` is underscore-form (`business_registry`); kinds flow through unchanged.
- Putting `reportingCurrency` on the country `profile` — it is `profile.currency`; reporting currency is a tenant choice that *defaults to* the country currency, overridable per tenant.
