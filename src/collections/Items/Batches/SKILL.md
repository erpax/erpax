---
name: batches
description: The batches collection — Batches — lot / batch traceability with genealogy (one-up / one-down)
---

# batches

Batches — lot / batch traceability with genealogy (one-up / one-down).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO 9001:2015 §8.5.2 identification-and-traceability
- ISO 22005:2007 feed-and-food-chain-traceability
- GS1 General Specifications AI(10) batch/lot AI(17) expiry AI(11) production-date
- EU Regulation 178/2002 Art 18 one-step-back-one-step-forward
- FDA 21 CFR 211.122 211.130 pharma-lot-control
- IATF 16949:2016 §8.5.2.1 automotive-traceability
- ISO-8601-1:2019 date-time manufacture-expiry-dates
- IFRS IAS-2 §23-§27 cost-formula-specific-identification
- ISO-19011:2018 audit-trail lot-genealogy-evidence
- SOX §404 internal-controls traceability-control TOM-TRACE-01
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[QualityInspections]] · [[collections]] · [[fields]] · [[accounting]] · [[standard]].
