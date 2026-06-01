---
name: tenants
description: The tenants collection — Tenants — multi-tenant root entity (post-Slice-HHH the legacy "host" alias is fully retired)
---

# tenants

Tenants — multi-tenant root entity (post-Slice-HHH the legacy "host" alias is fully retired).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-17442-1:2020 lei legal-entity-identifier
- ISO-3166-1:2020 country-codes alpha-2
- ISO-4217:2015 currency-codes default-currency
- BCP-47 language-tag default-locale
- GDPR Art.4(7) data-controller
- GDPR Art.30 records-of-processing-activities
- ISO-27001 A.5.23 information-security-for-cloud-services
- ISO-27002 §5.15 access-control
- SOC-2 CC6.1 logical-access-controls
- ISO-3166-1:2020 country-codes alpha-2 identity.country
- ISO-4217:2015 currency-codes alphabetic currency.reportingCurrency
- BCP-47 language-tag localization.defaultLocale
- ECMA-402 internationalization-api locale-cascade
- IFRS IAS-1 presentation-of-financial-statements per-tenant-framework
- ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-sandbox-config
- ISO-19011:2018 audit-trail config-change
