---
name: registers
description: "Use when cataloguing enterprise risks per legal entity — inherent and residual likelihood/impact scoring (COSO/ISO-31000), mitigating internal controls, risk appetite assessment, next-assessment scheduling, linked audit findings. The COSO ERM risk register."
atomPath: "legal/entities/risk/registers"
coordinate: "legal/entities/risk/registers · 4/weave · f82766ff"
contentUuid: "f5be7428-53cb-5d99-92bb-498dd87aed99"
diamondUuid: "4413fb60-efbe-8ef5-b0ee-413393bdc96e"
uuid: "f82766ff-f6a2-858c-b474-9408d4160d7e"
horo: 4
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
  computationUuid: "9bbac30a-4f3a-86e5-b3a7-c0d157b5a4d5"
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
      stageUuid: "4357c65f-0427-83a9-b599-705dd187e1c9"
    - stage: seal
      stageUuid: "8f8d087d-68f4-88eb-b8e0-57225203ebe5"
    - stage: uuid
      stageUuid: "1b77fb0f-e8fe-8633-bb88-d17d206c122b"
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
