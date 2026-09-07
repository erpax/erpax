---
name: owners
description: "Use when registering ultimate beneficial owners of a legal entity — direct/indirect ownership percent, control type, PEP status, KYC check link, and AMLD-5/CTA-required identification. The AML/Corporate-Transparency-Act UBO register."
atomPath: "legal/entities/beneficial/owners"
coordinate: "legal/entities/beneficial/owners · 5/round · f1d42d03"
contentUuid: "9e73eaac-43de-518f-b424-3ee2711e012c"
diamondUuid: "b33792a3-ff1c-84bc-bba5-298eddb469a6"
uuid: "f1d42d03-67c2-8462-a6f9-dea0ca91feed"
horo: 5
typography:
  partition: legal
  bondDegree: 24
standards:
  - "EU-AMLD-5 Directive-2018/843 ubo-register"
  - "FATF-Recommendation-24 transparency-of-legal-persons"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei"
  - "ISO-17442-1:2020 lei`"
  - "US-CTA Corporate-Transparency-Act-2021 beneficial-ownership"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "c55d8bca-09d4-8f76-b471-d22c990f814a"
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
      stageUuid: "b64d4ea8-e3bb-826c-8be2-7d96d6836551"
    - stage: seal
      stageUuid: "fc402a99-a20c-830c-bb58-783fdcbb271f"
    - stage: uuid
      stageUuid: "72e63c2f-4b14-8333-bc2b-d6a25c510d1e"
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
