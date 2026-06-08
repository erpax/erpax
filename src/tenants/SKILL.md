---
name: tenants
description: "Use when creating or scoping a tenant — the GDPR-controller boundary for all access, localization cascade (BCP-47/ECMA-402), accounting framework (IFRS/GAAP/fiscal-year), reporting currency (ISO 4217), and integration secrets (Stripe, Resend, MCP). The multi-tenant root entity and access-scope boundary."
atomPath: tenants
coordinate: tenants · 5/round · ca9ff8fd
contentUuid: "02fcbda7-fdfd-59c8-8769-1f06de044804"
diamondUuid: "2c2c2077-08c3-8acc-9d7e-be5062cb3ba3"
uuid: "ca9ff8fd-b0f1-86d0-bb20-9113c8bf5b75"
horo: 5
bonds:
  in:
    - agent
    - coordinate
    - domain
    - identity
    - memos
    - proof
    - tenant
    - transactions
  out:
    - agent
    - coordinate
    - domain
    - identity
    - memos
    - proof
    - tenant
    - transactions
typography:
  partition: tenants
  bondDegree: 0
  neighbors: []
standards:
  - "BCP-47 language-tag default-locale"
  - "BCP-47 language-tag localization.defaultLocale"
  - "ECMA-402"
  - "ECMA-402 internationalization-api locale-cascade"
  - "GDPR Art.30 records-of-processing-activities"
  - "GDPR Art.4(7) data-controller"
  - "IFRS IAS-1 presentation-of-financial-statements per-tenant-framework"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei legal-entity-identifier"
  - "ISO-19011:2018 audit-trail config-change"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO-3166-1:2020 country-codes alpha-2 identity.country"
  - "ISO-4217:2015 currency-codes alphabetic currency.reportingCurrency"
  - "ISO-4217:2015 currency-codes default-currency"
  - "SOC-2 CC6.1 logical-access-controls"
bindings: []
neighbors:
  wikilink:
    - domain
    - identity
    - proof
  matrix:
    - agent
    - coordinate
    - domain
    - identity
    - memos
    - proof
    - tenant
    - transactions
  backlinks:
    - agent
    - coordinate
    - domain
    - identity
    - memos
    - proof
    - tenant
    - transactions
signatures:
  computationUuid: "01dd683e-3c5a-846c-af0f-575590159a51"
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
      stageUuid: "367efea7-1aa6-8ea7-b5db-62ceee1fd94a"
    - stage: seal
      stageUuid: "3c3ae493-5fb3-874c-ae7e-2c88bbb4cbb6"
    - stage: uuid
      stageUuid: "00316104-cc99-8305-9ecf-7baa9dd48c2b"
version: 2
---
# tenants

Tenants — multi-tenant root entity (post-Slice-HHH the legacy "host" alias is fully retired).

Each tenant is a [[domain]]-scoped GDPR [[identity|controller]] and the access-boundary for all resource scoping. The collection defines the tenant's legal entity, localization cascades, accounting framework, currency, and integration secrets.

## Multi-tenant sandbox configuration

Per-tenant Payload config (scoped via `config.*`) mirrors the deployment-level shape: `identity` (country, legal name, tax registration), `localization` (locale cascade per ECMA-402 and BCP-47), `currency` (reporting currency per ISO 4217), and `accounting` (framework + fiscal calendar per IFRS IAS-1). The **international-first cascade** resolves field values in precedence order: document field → tenant override → country-derived default → deployment default. Any ISO 3166-1 alpha-2 country and ISO 4217 currency is accepted; the curated `COUNTRY_PROFILES` / `SUPPORTED_CURRENCIES` cohorts ship explicit adapters; tenants outside these sets use regex-shape validation and inherit the framework-free fallback.

## Standards

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
