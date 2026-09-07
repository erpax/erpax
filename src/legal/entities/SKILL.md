---
name: entities
description: "Use when registering subsidiaries, associates, joint ventures or the group head for consolidation — legal name, LEI, registration number, functional/presentation currency, ownership %, consolidation method, and reporting framework. The IFRS-10 §B86 entity master distinct from DB tenants."
atomPath: "legal/entities"
coordinate: "legal/entities · 2/share · db37ac9b"
contentUuid: "832cb42c-b00d-5a19-97c2-cd34fce087a0"
diamondUuid: "d2a8bbf0-106f-8423-abc8-2a261fcdf3bf"
uuid: "db37ac9b-bd6d-8225-a378-828e8ddf2d65"
horo: 2
typography:
  partition: legal
  bondDegree: 55
standards:
  - "COSO-2013"
  - "EU DAC-6 reportable-cross-border-arrangements"
  - "EU-2016/679"
  - "IAS-34"
  - "IFRS IAS-1 §138 disclosure-of-name-and-domicile"
  - "IFRS IAS-21 §9 functional-currency"
  - "IFRS IAS-27 §9 separate-financial-statements (parent-only FS use this same legal-entity registry)"
  - "IFRS IFRS-10 §B86 consolidation-procedures"
  - "IFRS IFRS-12 §10 §11 §B4-B6 disclosure-of-interests-in-other-entities"
  - "IFRS IFRS-18 §9 §10 presentation-and-disclosure (effective 2027-01 — entity-level taxonomy)"
  - "IFRS-3"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei legal-entity-identifier"
  - "ISO-17442-1:2020 lei legal-entity-identifier`"
  - "ISO-3166-1:2020 country-codes"
  - "ISO-3166-1:2020 country-codes`"
  - "ISO-37000"
  - "ISO-37301"
  - "ISO-4217:2015 currency-codes functional-currency"
  - "ISO-4217:2015 currency-codes functional-currency`"
  - "ISO-8601-1:2019 date-time effective-period"
  - "ISO-8601-1:2019 date-time effective-period`"
  - "OECD BEPS Action 13 master-file-entity-list"
  - "PCAOB-AS-2201"
  - "SAF-T"
  - SOX
  - "US-CTA-2021"
  - "US-GAAP"
  - "US-GAAP ASC-280 segment-reporting"
  - "US-GAAP ASC-810-10-45 consolidation"
  - XBRL
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "68224cbd-c850-8e6e-8e62-c02b7fa1254f"
  stages:
    - stage: path
      stageUuid: "071d9fef-2614-8839-9d03-543a4b7a547d"
    - stage: trinity
      stageUuid: "28bbb9ec-c166-800f-af36-4be70e4cb0ca"
    - stage: boundary
      stageUuid: "a3094202-aead-8514-94c0-a64c3e458589"
    - stage: links
      stageUuid: "03ed07a5-c813-8a30-a488-77547cc827ea"
    - stage: horo
      stageUuid: "be53d765-39dd-825d-a436-891637e1d6aa"
    - stage: seal
      stageUuid: "71a0e73d-173a-8a07-afaa-dd00c380f62d"
    - stage: uuid
      stageUuid: "bb19977a-18db-8591-8a9d-574202ec2e61"
version: 2
---
# legal-entities

Legal Entities — IFRS-10 §B86 group structure (distinct from `tenants`).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes`
- `@standard ISO-4217:2015 currency-codes functional-currency`
- `@standard ISO-17442-1:2020 lei legal-entity-identifier`
- `@standard ISO-8601-1:2019 date-time effective-period`

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
