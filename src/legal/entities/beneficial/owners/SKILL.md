---
name: owners
description: "Use when registering ultimate beneficial owners of a legal entity — direct/indirect ownership percent, control type, PEP status, KYC check link, and AMLD-5/CTA-required identification. The AML/Corporate-Transparency-Act UBO register."
atomPath: "legal/entities/beneficial/owners"
coordinate: "legal/entities/beneficial/owners · 1/base · 96f98374"
contentUuid: "6c577da3-42c6-52ec-9238-388f3717f01e"
diamondUuid: "811d7cb0-e4f0-8445-9184-9e6a85df3eaf"
uuid: "96f98374-e9d6-8070-bc51-4421d5b80270"
horo: 1
typography:
  partition: legal
  bondDegree: 24
standards:
  - "EU-AMLD-5 Directive-2018/843 ubo-register"
  - "FATF-Recommendation-24 transparency-of-legal-persons"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei"
  - "ISO-17442-1:2020 lei`"
  - "US-CTA Corporate-Transparency-Act-2021 beneficial-ownership"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "624803ce-0f52-89cb-96fb-6b58ebded1c8"
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
      stageUuid: "605a29c6-b16f-843e-a7f1-6c66799c2cb8"
    - stage: seal
      stageUuid: "fc402a99-a20c-830c-bb58-783fdcbb271f"
    - stage: uuid
      stageUuid: "6ba0a997-ea11-81cf-824e-c68179142b07"
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
