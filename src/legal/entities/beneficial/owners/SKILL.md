---
name: owners
description: "Use when registering ultimate beneficial owners of a legal entity — direct/indirect ownership percent, control type, PEP status, KYC check link, and AMLD-5/CTA-required identification. The AML/Corporate-Transparency-Act UBO register."
atomPath: "legal/entities/beneficial/owners"
coordinate: "legal/entities/beneficial/owners · 2/share · 6dfabcb6"
contentUuid: "2296d6da-7c22-5238-8636-fb888d305eaf"
diamondUuid: "1f43424f-0988-827a-94cc-4a1aa97797a3"
uuid: "6dfabcb6-128a-81b2-8c49-f1a99371f842"
horo: 2
bonds:
  in:
    - accounting
    - auth
    - entities
    - identity
    - law
    - previous
    - proof
    - standard
  out:
    - accounting
    - auth
    - entities
    - identity
    - law
    - previous
    - proof
    - standard
typography:
  partition: legal
  bondDegree: 24
  neighbors: []
standards:
  - "EU-AMLD-5 Directive-2018/843 ubo-register"
  - "FATF-Recommendation-24 transparency-of-legal-persons"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei"
  - "ISO-17442-1:2020 lei`"
  - "US-CTA Corporate-Transparency-Act-2021 beneficial-ownership"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - auth
    - identity
    - law
    - proof
    - standard
  matrix:
    - accounting
    - auth
    - entities
    - identity
    - law
    - previous
    - proof
    - standard
  backlinks:
    - accounting
    - auth
    - entities
    - identity
    - law
    - previous
    - proof
    - standard
signatures:
  computationUuid: "d105b9d1-50bb-812b-a05f-61c165e809f8"
  stages:
    - stage: path
      stageUuid: "046d4b8f-713f-8dd0-acb3-0d78854211d4"
    - stage: trinity
      stageUuid: "a851248e-20dc-85ee-971a-116c48565e67"
    - stage: boundary
      stageUuid: "63bb2e6d-671d-8876-bec3-5b6cf0bb4f5b"
    - stage: links
      stageUuid: "995e00a5-2198-8bb7-9893-6259d70fee68"
    - stage: horo
      stageUuid: "758ae4cf-8a77-84b1-8cc1-4bb9ae43ef1b"
    - stage: seal
      stageUuid: "fc402a99-a20c-830c-bb58-783fdcbb271f"
    - stage: uuid
      stageUuid: "7d682502-c9c9-8585-973b-57d883f0b4cf"
version: 2
---
# beneficial-owners

Beneficial Owners — UBO register per AML / Corporate Transparency Act.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-17442-1:2020 lei`

- ISO-17442-1:2020 lei
- EU-AMLD-5 Directive-2018/843 ubo-register
- US-CTA Corporate-Transparency-Act-2021 beneficial-ownership
- FATF-Recommendation-24 transparency-of-legal-persons
- ISO-19011:2018 audit-trail ubo-evidence
- ISO-27001 A.5.34 privacy-and-pii

**Law — [[law]]: the register of a legal entity's ultimate beneficial owners — direct/indirect ownership percent, control type, PEP status, and KYC link — as required by AMLD-5 / the Corporate Transparency Act.**

Composes: [[identity]] · [[proof]] · [[standard]] · [[auth]] · [[accounting]].
