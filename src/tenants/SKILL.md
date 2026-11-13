---
name: tenants
description: "Use when creating or scoping a tenant — the GDPR-controller boundary for all access, localization cascade (BCP-47/ECMA-402), accounting framework (IFRS/GAAP/fiscal-year), reporting currency (ISO 4217), and integration secrets (Stripe, Resend, MCP). The multi-tenant root entity and access-scope boundary."
atomPath: tenants
coordinate: "tenants · 1/base · 678100e2"
contentUuid: "a1dbf8fd-822f-5d9b-978a-64ef71b76bbd"
diamondUuid: "27729162-f59e-8e23-8ca4-d1017816d2bf"
uuid: "678100e2-912e-82bc-907d-5d65a8acf9c9"
horo: 1
typography:
  partition: tenants
  bondDegree: 21
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
  computationUuid: "b8a41233-ea23-8ac5-82ec-c0ae2e2f027d"
  stages:
    - stage: path
      stageUuid: "33e043c3-b509-89ba-a9b8-5d950475af94"
    - stage: trinity
      stageUuid: "bdba5720-bd44-866e-8308-28987a25317f"
    - stage: boundary
      stageUuid: "7f4287cf-35fa-86ae-bdeb-8ce4503a08d8"
    - stage: links
      stageUuid: "21bd4976-c86a-800a-bdb6-9075cd97f9cf"
    - stage: horo
      stageUuid: "324a3e04-b966-82ee-9e2f-0fdcc9cd313f"
    - stage: seal
      stageUuid: "f876a76d-ebcc-8b4d-af1e-988d265a722b"
    - stage: uuid
      stageUuid: "11f82bd3-a8ea-8592-bb8a-4dc49bfa599b"
version: 2
---
# tenants

Tenants — multi-tenant root entity (post-Slice-HHH the legacy "host" alias is fully retired).

Each tenant is a domain-scoped GDPR [[identity|controller]] and the access-boundary for all resource scoping. The collection defines the tenant's legal entity, localization cascades, accounting framework, currency, and integration secrets.

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

Composes domain · [[identity]] · [[proof]].
