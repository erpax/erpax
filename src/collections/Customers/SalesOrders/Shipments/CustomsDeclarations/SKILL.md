---
name: customs-declarations
description: The customs-declarations collection — Customs Declarations — WCO HS-coded export/import declarations
---

# customs-declarations

[[shipments]] + [[items]] — WCO HS-coded export/import declarations structured via [[fields]], [[hooks]], and [[access]].

Collection shape: `index.ts` (schema + standards banners), `seed.ts` (opening data), `index.test.ts` (invariant checks).
One folder per collection ⇒ no scatter ⇒ no drift.

@standard ISO-8601-1:2019 date-time declaration-date
@standard ISO-3166-1:2020 country-codes country-of-origin
@standard ISO-4217:2015 currency-codes valuation-currency
@standard WCO HS Convention harmonised-system
@standard EU UCC Regulation 952/2013 union-customs-code
@standard WCO Data Model 3.x customs-data-elements
@audit ISO-19011:2018 audit-trail customs-evidence
@compliance EU UCC §6 customs-declaration
@compliance OECD BEPS Action 13 transfer-pricing-documentation
@security ISO-27001 A.5.23 cloud-service-tenant-isolation
