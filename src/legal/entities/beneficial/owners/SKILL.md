---
name: owners
description: "Use when registering ultimate beneficial owners of a legal entity — direct/indirect ownership percent, control type, PEP status, KYC check link, and AMLD-5/CTA-required identification. The AML/Corporate-Transparency-Act UBO register."
atomPath: legal/entities/beneficial/owners
coordinate: legal/entities/beneficial/owners · 7/descent · 9f25efe8
contentUuid: "4aaec23a-87e0-50a9-b073-1ae29e307dbe"
diamondUuid: "d512324c-44f9-8b3e-92e0-e449ff34b68c"
uuid: "9f25efe8-dbd3-8bd4-8e85-8f3ee16fad27"
horo: 7
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
  - "ISO-19011:2018 audit-trail ubo-evidence"
  - "US-CTA Corporate-Transparency-Act-2021 beneficial-ownership"
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
  computationUuid: "bc98d344-f2d3-81d9-9839-1377bfb1e780"
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
      stageUuid: "0a8bdbfc-42ef-8fce-a003-d3f203f9f329"
    - stage: seal
      stageUuid: "fc402a99-a20c-830c-bb58-783fdcbb271f"
    - stage: uuid
      stageUuid: "0ff65322-6210-86cf-ba69-a1b391094bd1"
version: 2
---
# beneficial-owners

Beneficial Owners — UBO register per AML / Corporate Transparency Act.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-17442-1:2020 lei
- EU-AMLD-5 Directive-2018/843 ubo-register
- US-CTA Corporate-Transparency-Act-2021 beneficial-ownership
- FATF-Recommendation-24 transparency-of-legal-persons
- ISO-19011:2018 audit-trail ubo-evidence
- ISO-27001 A.5.34 privacy-and-pii

**Law — [[law]]: the register of a legal entity's ultimate beneficial owners — direct/indirect ownership percent, control type, PEP status, and KYC link — as required by AMLD-5 / the Corporate Transparency Act.**

Composes: [[identity]] · [[proof]] · [[standard]] · [[auth]] · [[accounting]].
