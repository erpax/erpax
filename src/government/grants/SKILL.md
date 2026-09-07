---
name: grants
description: "Use when recording or reporting public-sector grants, EU funds, or national subsidies — award, conditions, recognition method (deferred-income vs net-against-asset), clawback provisions, CSRD/BEPS traceability; IAS-20 §7-§39 + ASC 958-605. The government-grants IAS-20 register."
atomPath: "government/grants"
coordinate: "government/grants · 2/share · b1ed4457"
contentUuid: "85fc7147-46b8-5a93-aa3b-381f5e8bb516"
diamondUuid: "fb3f41ef-62c3-8361-bce4-17e5d7d1c71b"
uuid: "b1ed4457-0f20-875a-99a3-8440910fc591"
horo: 2
typography:
  partition: government
  bondDegree: 22
standards:
  - "EU CSRD ESRS 2 sbm-3 material-impacts (EU funds traceability)"
  - "IFRS IAS-20 §12 §13 income-or-asset-presentation"
  - "IFRS IAS-20 §17 §18 §28 §32 disclosure"
  - "IFRS IAS-20 §39 disclosure-government-assistance"
  - "IFRS IAS-20 §7 §8 §10 recognition"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "OECD BEPS Action 13 country-by-country (when grants ≥ threshold)"
  - "US-GAAP ASC-832 government-assistance-disclosure"
  - "US-GAAP ASC-958-605 contributions"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "a1c575de-b55a-8b97-83d7-05483d50e469"
  stages:
    - stage: path
      stageUuid: "2bb7f38f-4966-81c1-93cc-90dc05023fcb"
    - stage: trinity
      stageUuid: "599c5286-edc1-8e9a-b26f-00097d871b2a"
    - stage: boundary
      stageUuid: "72349bab-481a-800b-84c6-6b62430072ed"
    - stage: links
      stageUuid: "19d20619-ea59-8250-a52d-66611330fcca"
    - stage: horo
      stageUuid: "a003c69b-8d4c-8794-86ee-e817bcad0818"
    - stage: seal
      stageUuid: "fd6f4322-366a-832d-a044-b8f47fc13c52"
    - stage: uuid
      stageUuid: "e7f02ba6-98d9-88f1-8c40-f7a642815c19"
version: 2
---
# government-grants

Government Grants — IAS-20 + ASC 958-605 register of public-sector.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IAS-20 §7 §8 §10 recognition
- IFRS IAS-20 §12 §13 income-or-asset-presentation
- IFRS IAS-20 §17 §18 §28 §32 disclosure
- IFRS IAS-20 §39 disclosure-government-assistance
- US-GAAP ASC-958-605 contributions
- US-GAAP ASC-832 government-assistance-disclosure
- ISO-19011:2018 audit-trail grant-evidence
- EU CSRD ESRS 2 sbm-3 material-impacts (EU funds traceability)
- OECD BEPS Action 13 country-by-country (when grants ≥ threshold)
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Provisions]] · [[fixed/assets]] · [[accounting]] · [[proof]] · [[identity]] · [[standard]].

**Law — [[law]]: a government grant is recognized only as its attached conditions are met (IAS-20) by one of two presentations — deferred income or netted against the asset — and remains clawback-exposed, the public subsidy carried with full traceability.**
