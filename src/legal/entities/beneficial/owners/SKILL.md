---
name: owners
description: "Use when registering ultimate beneficial owners of a legal entity — direct/indirect ownership percent, control type, PEP status, KYC check link, and AMLD-5/CTA-required identification. The AML/Corporate-Transparency-Act UBO register."
atomPath: "legal/entities/beneficial/owners"
coordinate: "legal/entities/beneficial/owners · 5/round · b8bb48ba"
contentUuid: "6092fb64-5a7e-56d0-b0d0-f57e596cfc54"
diamondUuid: "b489a47c-93ea-8f43-91a6-55f3fb7462e4"
uuid: "b8bb48ba-5588-8b80-a932-ffa84b82e04f"
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
  computationUuid: "db32851b-5b90-81cb-b93f-c598a32d3149"
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
      stageUuid: "cd32aed9-3a4c-8920-a900-49750d28468c"
    - stage: seal
      stageUuid: "fc402a99-a20c-830c-bb58-783fdcbb271f"
    - stage: uuid
      stageUuid: "c580ce4c-47da-87c6-b78d-507f2fb3b933"
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
