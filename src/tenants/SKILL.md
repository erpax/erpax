---
name: tenants
description: "Use when creating or scoping a tenant — the GDPR-controller boundary for all access, localization cascade (BCP-47/ECMA-402), accounting framework (IFRS/GAAP/fiscal-year), reporting currency (ISO 4217), and integration secrets (Stripe, Resend, MCP). The multi-tenant root entity and access-scope boundary."
atomPath: tenants
coordinate: "tenants · 2/share · c1c72914"
contentUuid: "e7990eb1-5879-50ee-b691-a46fb13b7497"
diamondUuid: "a40beaf2-43f8-8935-b7d1-0ca8108be5e6"
uuid: "c1c72914-4452-8c95-8fd8-49df2640cb21"
horo: 2
typography:
  partition: tenants
  bondDegree: 23
standards:
  - "BCP-47 language-tag default-locale"
  - "BCP-47 language-tag localization.defaultLocale"
  - "ECMA-402"
  - "ECMA-402 internationalization-api locale-cascade"
  - "GDPR Art.30 records-of-processing-activities"
  - "GDPR Art.4(7) data-controller"
  - "IFRS IAS-1 presentation-of-financial-statements per-tenant-framework"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei legal-entity-identifier"
  - "ISO-17442-1:2020 lei legal-entity-identifier`"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO-3166-1:2020 country-codes alpha-2 identity.country"
  - "ISO-3166-1:2020 country-codes alpha-2 identity.country`"
  - "ISO-3166-1:2020 country-codes alpha-2`"
  - "ISO-4217:2015 currency-codes alphabetic currency.reportingCurrency"
  - "ISO-4217:2015 currency-codes alphabetic currency.reportingCurrency`"
  - "ISO-4217:2015 currency-codes default-currency"
  - "ISO-4217:2015 currency-codes default-currency`"
  - "SOC-2 CC6.1 logical-access-controls"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "5fb8e3f6-5dd0-89cb-8367-aeb29865664a"
  stages:
    - stage: path
      stageUuid: "33e043c3-b509-89ba-a9b8-5d950475af94"
    - stage: trinity
      stageUuid: "bdba5720-bd44-866e-8308-28987a25317f"
    - stage: boundary
      stageUuid: "c78e179f-89e4-8046-8839-be66eb9c8ed8"
    - stage: links
      stageUuid: "39ec08ed-3cbe-8995-ae51-f5de4a5f5cce"
    - stage: horo
      stageUuid: "13750473-f7fa-8ffb-a26b-7c1c8e4847cf"
    - stage: seal
      stageUuid: "f876a76d-ebcc-8b4d-af1e-988d265a722b"
    - stage: uuid
      stageUuid: "ba579aa9-f9e1-871e-9e0e-b9f205125a15"
version: 2
---
# tenants

Tenants — multi-tenant root entity (post-Slice-HHH the legacy "host" alias is fully retired).

Each tenant is a [[domain]]-scoped GDPR [[identity|controller]] and the access-boundary for all resource scoping. The collection defines the tenant's legal entity, localization cascades, accounting framework, currency, and integration secrets.

## Multi-tenant sandbox configuration

Per-tenant Payload config (scoped via `config.*`) mirrors the deployment-level shape: `identity` (country, legal name, tax registration), `localization` (locale cascade per ECMA-402 and BCP-47), `currency` (reporting currency per ISO 4217), and `accounting` (framework + fiscal calendar per IFRS IAS-1). The **international-first cascade** resolves field values in precedence order: document field → tenant override → country-derived default → deployment default. Any ISO 3166-1 alpha-2 country and ISO 4217 currency is accepted; the curated `COUNTRY_PROFILES` / `SUPPORTED_CURRENCIES` cohorts ship explicit adapters; tenants outside these sets use regex-shape validation and inherit the framework-free fallback.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-17442-1:2020 lei legal-entity-identifier`
- `@standard ISO-3166-1:2020 country-codes alpha-2`
- `@standard ISO-4217:2015 currency-codes default-currency`
- `@standard ISO-3166-1:2020 country-codes alpha-2 identity.country`
- `@standard ISO-4217:2015 currency-codes alphabetic currency.reportingCurrency`


**Identity & localization:**
- ISO-17442-1:2020 (lei legal-entity-identifier)
- ISO-3166-1:2020 (country-codes alpha-2, `identity.country`)
- ISO-4217:2015 (currency-codes alphabetic, `currency.reportingCurrency`)
- BCP-47 (language-tag, `localization.defaultLocale`)
- ECMA-402 (internationalization-api locale-cascade)

**Governance & compliance:**
- GDPR Art.4(7) (data-controller)
- GDPR Art.30 (records-of-processing-activities)
- IFRS IAS-1 (presentation-of-financial-statements per-tenant-framework, `accounting.standard`)

**Security & audit:**
- ISO-27001 A.5.23 (information-security-for-cloud-services, cloud-service-tenant-isolation via `config`)
- ISO-27002 §5.15 (access-control)
- ISO-19011:2018 (audit-trail for config-change)
- SOC-2 CC6.1 (logical-access-controls)

Composes [[domain]] · [[identity]] · [[proof]].
