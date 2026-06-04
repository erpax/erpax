---
name: legal-entities
description: Use when registering subsidiaries, associates, joint ventures or the group head for consolidation — legal name, LEI, registration number, functional/presentation currency, ownership %, consolidation method, and reporting framework. The IFRS-10 §B86 entity master distinct from DB tenants.
---

# legal-entities

Legal Entities — IFRS-10 §B86 group structure (distinct from `tenants`).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-3166-1:2020 country-codes
- ISO-4217:2015 currency-codes functional-currency
- ISO-17442-1:2020 lei legal-entity-identifier
- ISO-8601-1:2019 date-time effective-period
- IFRS IFRS-10 §B86 consolidation-procedures
- IFRS IFRS-12 §10 §11 §B4-B6 disclosure-of-interests-in-other-entities
- IFRS IAS-27 §9 separate-financial-statements (parent-only FS use this same legal-entity registry)
- IFRS IFRS-18 §9 §10 presentation-and-disclosure (effective 2027-01 — entity-level taxonomy)
- IFRS IAS-21 §9 functional-currency
- IFRS IAS-1 §138 disclosure-of-name-and-domicile
- US-GAAP ASC-810-10-45 consolidation
- US-GAAP ASC-280 segment-reporting
- OECD BEPS Action 13 master-file-entity-list
- EU DAC-6 reportable-cross-border-arrangements
- ISO-19011:2018 audit-trail entity-master
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[legal/entities/audit/committees]] · [[legal/entities/beneficial/owners]] · [[legal/entities/compliance/deadlines]] · [[Consolidations]] · [[legal/entities/disclosure/checklists]] · [[legal/entities/internal/audit/functions]] · [[legal/entities/management/assessment/icfrs]] · [[legal/entities/management/certifications]] · [[legal/entities/regulatory/reports]] · [[legal/entities/related/party/transactions]] · [[legal/entities/risk/registers]] · [[legal/entities/segment/reportings]] · [[legal/entities/debt/schedules]] · [[legal/entities/fiscal/calendars]] · [[legal/entities/transfer/pricing/files]].
