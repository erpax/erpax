---
name: seed
description: "Use when seeding a tenant's opening chart-of-accounts + compliance posture from a (country × industry) template — INDUSTRY_TEMPLATES, the BG-NSS statutory chart, resolveTenantCompliance/getCuratedComplianceCountries. Derives every country fact from country-context; nothing is re-typed."
atomPath: seed
coordinate: seed · 7/descent · 94e11040
contentUuid: "5f5abeaa-bfcf-5009-9f9a-378483a75943"
diamondUuid: "041832bf-f00f-83bf-bcce-54b1483a9993"
uuid: "94e11040-4e20-8395-b296-27cd61a5fb20"
horo: 7
bonds:
  in:
    - accounting
    - akashic
    - aura
    - code
    - crop
    - cropplan
    - currency
    - empirical
    - endpoints
    - fractal
    - graft
    - holographic
    - identity
    - items
    - law
    - localize
    - manufacturing
    - measure
    - organic
    - planting
    - pollination
    - propagation
    - rootstock
    - spacing
    - standard
    - test
    - testing
    - transplant
    - variant
    - version
  out:
    - accounting
    - akashic
    - aura
    - code
    - crop
    - cropplan
    - currency
    - empirical
    - endpoints
    - fractal
    - graft
    - holographic
    - identity
    - items
    - law
    - localize
    - manufacturing
    - measure
    - organic
    - planting
    - pollination
    - propagation
    - rootstock
    - spacing
    - standard
    - test
    - testing
    - transplant
    - variant
    - version
typography:
  partition: seed
  bondDegree: 0
  neighbors: []
standards:
  - "9110 http-semantics seed-endpoint"
  - "BCP-47 language-tag locale-bundled-fixtures"
  - "ISO-19011:2018 audit-trail seed-runs"
  - "ISO-8601-1:2019 date-time"
bindings: []
neighbors:
  wikilink:
    - accounting
    - akashic
    - aura
    - code
    - crop
    - currency
    - fractal
    - holographic
    - identity
    - items
    - law
    - localize
    - manufacturing
    - measure
    - organic
    - planting
    - propagation
    - standard
    - transplant
    - variant
    - version
  matrix:
    - accounting
    - akashic
    - aura
    - code
    - crop
    - cropplan
    - currency
    - empirical
    - endpoints
    - fractal
    - graft
    - holographic
    - identity
    - items
    - law
    - localize
    - manufacturing
    - measure
    - organic
    - planting
    - pollination
    - propagation
    - rootstock
    - spacing
    - standard
    - test
    - testing
    - transplant
    - variant
    - version
  backlinks:
    - accounting
    - akashic
    - aura
    - code
    - crop
    - cropplan
    - currency
    - empirical
    - endpoints
    - fractal
    - graft
    - holographic
    - identity
    - items
    - law
    - localize
    - manufacturing
    - measure
    - organic
    - planting
    - pollination
    - propagation
    - rootstock
    - spacing
    - standard
    - test
    - testing
    - transplant
    - variant
    - version
signatures:
  computationUuid: "119976e9-3793-87d1-be34-3ae2f00021c4"
  stages:
    - stage: path
      stageUuid: "05e41cf0-e2fd-8003-93b3-15cc1f45e459"
    - stage: trinity
      stageUuid: "6717f03c-19f4-8c0d-8225-6e9b6e649b83"
    - stage: boundary
      stageUuid: "2d9e3b1c-18ab-85fa-ada6-6413c9e9f5d3"
    - stage: links
      stageUuid: "00c07e1c-d9ad-8ec0-9542-894b1e98bc06"
    - stage: horo
      stageUuid: "049ab9a9-1cdd-8d22-9476-d345b97d3edd"
    - stage: seal
      stageUuid: "db2dbc3f-0ffd-8b47-accd-6a6a18356632"
    - stage: uuid
      stageUuid: "dd033a8e-dcc8-8eb0-a0e7-06ca9bd1c9e3"
version: 2
---
# seed — the (country × industry) opening-books template

`seed` is the tenant-bootstrap atom: given a **country** and an **industry archetype**, produce the opening **chart of accounts** + **compliance posture** a fresh tenant starts on. The law is **derive, never re-type** — `INDUSTRY_TEMPLATES` and `resolveTenantCompliance` read the live `country-context` (`resolveCountryContext` → `profile`/`specifics`/`apis`/`helpers`), so when a registry value changes (reporting currency, statutory chart reference, e-invoicing mandate, official-API kinds) every template picks it up automatically. An `IndustryTemplate` is `{ id, label, description, standards[], chartOfAccounts[], tenant, compliance }`; the `id` slug is the human key ([[code]]), the content-`uuid` ([[identity]]) the machine key; `label`/`description` are localizable ([[localize]]). Each `chartOfAccounts` covers all five IAS-1 §54 element types (asset · liability · equity · revenue · expense) with unique `accountNumber`s, and every `@standard`/`@accounting` banner is TRUE per [[standard]]. `BG_NSS_TEMPLATE` is the Bulgarian National statutory chart (`BG-NSS`) — the worked example, registered under `INDUSTRY_TEMPLATES['bg-nss']`.

**The law generalizes — skills compute their seeds.** A seed is a *function of its source*, never a declared constant: this skill's chart of accounts from `country-context`, the [[manufacturing]] efficiency calibration from the real `work_shifts` distribution (`computeCalibration(ETRIMA_EFFICIENCY)` — change the tenant or year and it recomputes), the competency catalogue from the skill corpus (`SKILL_INDEX`), the [[version]] from the corpus [[aura]]. The constants are never written down; they are computed from real data or the identity element (country `ZZ`, currency `XXX`), so a fresh clone reproduces the same seed — `derive, never re-type` at corpus scale.

**The agronomic seed is the same atom, [[fractal]] one scale down.** A plant **seed** is the minimal encoded starting state — genetics compressed into a propagule — that *germinates* into the whole [[crop]] ([[holographic]]: the whole recoverable from the part, the [[akashic]]-record law in a husk). Its trade attributes are a [[variant]] of the crop — **open-pollinated** breeds true and can be saved; **F1 hybrid** is vigorous but does not; **heirloom** is an old stable OP; **GMO / chemically-treated** seed is barred from [[organic]] — and its quality is a [[measure]]: **germination rate** (% that sprout) and **viability** (how long it keeps). The seed order is computed need − inventory ([[items]]); raising it into a field-ready start is [[propagation]] → [[transplant]]. DB-seed and plant-seed are one atom: the compressed starting state a system grows from.

Composes: [[accounting]] (chart of accounts, the accountable archetype), [[standard]] (IFRS IAS-1 §54, per-country statutory charts, EN-16931 e-invoicing), [[currency]] (ISO-4217 reporting currency), [[localize]] (per-locale label/description), [[identity]] (content-uuid template id), [[code]] (slug human key) · [[crop]] · [[planting]] · [[propagation]] · [[transplant]] · [[variant]] · [[organic]] · [[fractal]] · [[holographic]]. Lives next to [[accounting]] under `src/services/accounting/seeds/templates/`.

## The two surfaces
- **Static templates** (`INDUSTRY_TEMPLATES`, the `*_TEMPLATE` constants) — curated opening books per industry, country baked in at build via the builder that calls `resolveCountryContext(country)`.
- **Dynamic resolution** (`resolveTenantCompliance({ country, reportingCurrency? })`) — compute a posture for *any* country at runtime, honouring a per-tenant currency override and falling back to dynamic country-context for uncurated countries (`'ZZ'` ⇒ `statutoryChartReference: null`, mandate `false`, kinds `[]`-shaped).

## Common mistakes
- Re-typing a country fact (currency, statutory chart, mandate, API kinds) inline instead of deriving from `resolveCountryContext` — the template silently drifts from the registry.
- Using gl-accounts' `income` element where IAS-1 §54 says `revenue` — the seed vocabulary is the five IAS-1 element types, not the ledger's `type` enum.
- Hard-coding hyphenated API kinds (`business-registry`) — `CountryApiKind` is underscore-form (`business_registry`); kinds flow through unchanged.
- Putting `reportingCurrency` on the country `profile` — it is `profile.currency`; reporting currency is a tenant choice that *defaults to* the country currency, overridable per tenant.

**Law — [[law]]: a seed is the minimal encoded starting state a system grows from, derived never re-typed — the opening books computed from `country-context`, every constant a function of its source (real data or the identity element), so a fresh clone reproduces the same seed; the agronomic seed is the same atom one [[fractal]] scale down ([[holographic]]: the whole recoverable from the part).**
