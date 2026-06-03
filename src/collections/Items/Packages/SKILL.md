---
name: packages
description: The packages collection — Packages — logistic handling units (pallet / carton / case …) with SSCC
---

# packages

Packages — logistic handling units (pallet / carton / case …) with SSCC.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- GS1 General Specifications AI(00) SSCC serial-shipping-container-code
- ISO/IEC 15459-1:2014 unique-identification transport-units
- GS1 Logistic Label
- ISO-8601-1:2019 date-time
- UN/CEFACT Recommendation 21 packaging-codes
- ISO-19011:2018 audit-trail packing-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[collections]] · [[fields]] · [[access]] · [[hooks]] · [[accounting]] · [[standard]].
