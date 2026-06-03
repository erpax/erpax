---
name: warehouse-locations
description: The warehouse-locations collection — Warehouse Locations — physical / logical stock locations
---

# warehouse-locations

Warehouse Locations — physical / logical stock locations.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-3166-1:2020 country-codes location-country
- ISO-3166-2:2020 subdivision-codes location-region
- ISO-6346:2022 freight-container-coding-and-marking
- EN-16931:2017 §BG-15 deliver-to-information
- IFRS IAS-2 inventories location-tracked
- US-GAAP ASC-330 inventory location-tracked
- ISO-19011:2018 audit-trail location-master-changes
- SOX §404 internal-controls inventory-segregation
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[ConsignmentArrangements]].
