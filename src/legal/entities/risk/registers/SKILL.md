---
name: registers
description: "Use when cataloguing enterprise risks per legal entity — inherent and residual likelihood/impact scoring (COSO/ISO-31000), mitigating internal controls, risk appetite assessment, next-assessment scheduling, linked audit findings. The COSO ERM risk register."
atomPath: "legal/entities/risk/registers"
coordinate: "legal/entities/risk/registers · 1/base · 1cfd8036"
contentUuid: "25faf37c-149e-5a42-87f1-6097d7be44ae"
diamondUuid: "d927394f-550a-8427-a223-0eab97ca98c2"
uuid: "1cfd8036-69cb-8f6b-965d-8778e852f837"
horo: 1
typography:
  partition: legal
  bondDegree: 13
standards:
  - "COSO ERM-2017 enterprise-risk-management"
  - "ISO-31000:2018 risk-management"
  - "ISO-31000:2018 risk-management`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7f731cb1-0d2e-89eb-a769-c1e8c0a94889"
  stages:
    - stage: path
      stageUuid: "e68bf044-b8e4-80d3-8755-3ed746a92fad"
    - stage: trinity
      stageUuid: "7783df25-cecf-8e6f-8850-39496fbd6975"
    - stage: boundary
      stageUuid: "55e0e96f-cb08-8b29-ab04-93c527cd28b8"
    - stage: links
      stageUuid: "897f3b1d-af72-8608-aead-21f5174d4e09"
    - stage: horo
      stageUuid: "dfb7e50d-c5f0-8243-aa7a-b0f1d232f9c5"
    - stage: seal
      stageUuid: "8f8d087d-68f4-88eb-b8e0-57225203ebe5"
    - stage: uuid
      stageUuid: "116960b5-8468-8e2b-9dd7-78c6db9d11b5"
version: 2
---
# risk-register

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: every enterprise risk is scored twice — inherent then residual likelihood×impact — with the mitigating controls between them, so residual risk is what survives the controls, measured against appetite, not a single ungoverned guess.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-31000:2018 risk-management`

- COSO ERM-2017 enterprise-risk-management
- ISO-31000:2018 risk-management
- ISO-27001 A.5.23 cloud-service-tenant-isolation
