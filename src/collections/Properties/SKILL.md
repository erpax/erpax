---
name: properties
description: The properties collection — Properties — real-estate property master per ISO 41001 / ISO 55000
---

# properties

Properties — real-estate property master per ISO 41001 / ISO 55000.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-41001:2018 facility-management-management-systems
- ISO-41011:2017 facility-management-vocabulary
- ISO-41013:2017 facility-management-scope
- ISO-55000:2014 asset-management property-as-asset
- ISO-19650-1:2018 information-management-using-bim
- ISO-3166-1:2020 country-codes property-country
- ISO-3166-2:2020 subdivision-codes property-region
- NACE-Rev.2 economic-activity-of-occupants
- EN-15978:2011 sustainability-of-construction-works (when ESG-tracked)
- IFRS IAS-16 property-plant-and-equipment owned-property
- IFRS IFRS-16 §22 right-of-use-asset leased-property
- US-GAAP ASC-360 property-plant-and-equipment
- ISO-19011:2018 audit-trail property-master-changes
- SOX §404 internal-controls real-estate-portfolio
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[InvestmentProperties]] · [[Leases]] · [[Spaces]].
