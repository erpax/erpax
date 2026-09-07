---
name: registers
description: "Use when cataloguing enterprise risks per legal entity — inherent and residual likelihood/impact scoring (COSO/ISO-31000), mitigating internal controls, risk appetite assessment, next-assessment scheduling, linked audit findings. The COSO ERM risk register."
atomPath: "legal/entities/risk/registers"
coordinate: "legal/entities/risk/registers · 4/weave · c8fa6ee4"
contentUuid: "1d635b4b-30d1-5577-b26d-30813737864e"
diamondUuid: "371357dc-9dc5-89fe-8de2-0f058908e18e"
uuid: "c8fa6ee4-f620-83e2-bbd1-a40f5ce1537c"
horo: 4
typography:
  partition: legal
  bondDegree: 15
standards:
  - "COSO ERM-2017 enterprise-risk-management"
  - "ISO-31000:2018 risk-management"
  - "ISO-31000:2018 risk-management`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "5061217f-93a9-816b-8414-e4eca007953e"
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
      stageUuid: "6da345cc-7287-89b4-808d-6561345caa54"
    - stage: seal
      stageUuid: "8f8d087d-68f4-88eb-b8e0-57225203ebe5"
    - stage: uuid
      stageUuid: "3d789cac-ae4e-8f36-99f9-d076a97fa7d1"
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
