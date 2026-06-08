---
name: registers
description: "Use when cataloguing enterprise risks per legal entity — inherent and residual likelihood/impact scoring (COSO/ISO-31000), mitigating internal controls, risk appetite assessment, next-assessment scheduling, linked audit findings. The COSO ERM risk register."
atomPath: legal/entities/risk/registers
coordinate: legal/entities/risk/registers · 1/base · bd8accfe
contentUuid: "cee3e5e0-d6b9-5fbf-9c79-c9e179bab8bb"
diamondUuid: "df26e356-f358-8679-98a8-26e152e1989f"
uuid: "bd8accfe-3b0c-80db-b84b-f9be7d65f966"
horo: 1
bonds:
  in:
    - entities
    - forcemajeure
    - indemnity
    - law
    - risk
  out:
    - entities
    - forcemajeure
    - indemnity
    - law
    - risk
typography:
  partition: legal
  bondDegree: 15
  neighbors: []
standards:
  - "COSO ERM-2017 enterprise-risk-management"
  - "ILO-C100"
  - "ISO-31000:2018 risk-management"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - entities
    - forcemajeure
    - indemnity
    - law
    - risk
  backlinks:
    - entities
    - forcemajeure
    - indemnity
    - law
    - risk
signatures:
  computationUuid: "b03995cd-7c12-86af-af76-85b419fb349c"
  stages:
    - stage: path
      stageUuid: "e68bf044-b8e4-80d3-8755-3ed746a92fad"
    - stage: trinity
      stageUuid: "7783df25-cecf-8e6f-8850-39496fbd6975"
    - stage: boundary
      stageUuid: "55e0e96f-cb08-8b29-ab04-93c527cd28b8"
    - stage: links
      stageUuid: "1e3e5f82-8b1d-86b0-b3c9-7be18c77ef76"
    - stage: horo
      stageUuid: "cd3338c9-6950-8b8d-be23-1b254088046a"
    - stage: seal
      stageUuid: "8f8d087d-68f4-88eb-b8e0-57225203ebe5"
    - stage: uuid
      stageUuid: "d4f76377-a2e0-8009-87c3-b30daf166d9d"
version: 2
---
# risk-register

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: every enterprise risk is scored twice — inherent then residual likelihood×impact — with the mitigating controls between them, so residual risk is what survives the controls, measured against appetite, not a single ungoverned guess.**

## Standards
- COSO ERM-2017 enterprise-risk-management
- ISO-31000:2018 risk-management
- ISO-27001 A.5.23 cloud-service-tenant-isolation
