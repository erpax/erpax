---
name: registers
description: "Use when cataloguing enterprise risks per legal entity — inherent and residual likelihood/impact scoring (COSO/ISO-31000), mitigating internal controls, risk appetite assessment, next-assessment scheduling, linked audit findings. The COSO ERM risk register."
atomPath: "legal/entities/risk/registers"
coordinate: "legal/entities/risk/registers · 1/base · 5f94d9a3"
contentUuid: "3d68f74d-450d-557d-8961-585f58f31b3d"
diamondUuid: "cf7b23d5-71ad-8be5-8856-0ac3d6e3b780"
uuid: "5f94d9a3-cb3d-8cdf-8015-f589dd3ef0e4"
horo: 1
typography:
  partition: legal
  bondDegree: 12
standards:
  - "COSO ERM-2017 enterprise-risk-management"
  - "ISO-31000:2018 risk-management"
  - "ISO-31000:2018 risk-management`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "d0ca6edc-9da2-87fc-ba18-272844b251ad"
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
      stageUuid: "88db1051-fcec-86c1-b7c1-d45e76485231"
    - stage: seal
      stageUuid: "8f8d087d-68f4-88eb-b8e0-57225203ebe5"
    - stage: uuid
      stageUuid: "9853e42e-f625-8ee2-ad18-e995ee5144ca"
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
