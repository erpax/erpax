---
name: tenants
description: "Use when creating or scoping a tenant — the GDPR-controller boundary for all access, localization cascade (BCP-47/ECMA-402), accounting framework (IFRS/GAAP/fiscal-year), reporting currency (ISO 4217), and integration secrets (Stripe, Resend, MCP). The multi-tenant root entity and access-scope boundary."
atomPath: tenants
coordinate: "tenants · 2/share · 797b060d"
contentUuid: "5ee1667f-7bc7-5607-8d3a-c61396bfd388"
diamondUuid: "7aa1d25b-db2d-865c-a0d7-72a9ef15c14e"
uuid: "797b060d-a192-8a42-bc13-5c7a6b07e3f1"
horo: 2
typography:
  partition: tenants
  bondDegree: 25
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
  computationUuid: "64076d3c-fe88-801f-a327-3632cb5ec72b"
  stages:
    - stage: path
      stageUuid: "33e043c3-b509-89ba-a9b8-5d950475af94"
    - stage: trinity
      stageUuid: "bdba5720-bd44-866e-8308-28987a25317f"
    - stage: boundary
      stageUuid: "c78e179f-89e4-8046-8839-be66eb9c8ed8"
    - stage: links
      stageUuid: "7320a1d0-eb4d-8c1f-98d8-906ef700a45c"
    - stage: horo
      stageUuid: "a4fe1fc6-4cf6-8457-a90c-1bc1747a4098"
    - stage: seal
      stageUuid: "f876a76d-ebcc-8b4d-af1e-988d265a722b"
    - stage: uuid
      stageUuid: "c45e3c6b-8a37-83e9-890f-64c0bdb817b1"
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
