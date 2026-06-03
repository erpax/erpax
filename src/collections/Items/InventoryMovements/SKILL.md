---
name: inventory-movements
description: The inventory-movements collection — Inventory Movements — every quantity change with source/destination
---

# inventory-movements

Inventory Movements — every quantity change with source/destination.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time movement-at posted-at
- ISO-3166-1:2020 country-codes via location
- IFRS IAS-2 §10 §36 inventories cost-formulas
- US-GAAP ASC-330 inventory cost-flow
- US-GAAP ASC-606 cogs-recognition
- ISO-19011:2018 audit-trail stock-ledger
- SOX §404 internal-controls inventory-cycle-count
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- IFRS IAS-2 §25 cost-formulas
- US-GAAP ASC-330-10-30 inventory-valuation

Composes: [[Items]] · [[WarehouseLocations]].
