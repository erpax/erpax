---
name: registers
description: "Use when cataloguing enterprise risks per legal entity — inherent and residual likelihood/impact scoring (COSO/ISO-31000), mitigating internal controls, risk appetite assessment, next-assessment scheduling, linked audit findings. The COSO ERM risk register."
atomPath: "legal/entities/risk/registers"
coordinate: "legal/entities/risk/registers · 8/crest · 6233c773"
contentUuid: "cec0c087-31e1-56c1-9f80-fdc3826da839"
diamondUuid: "4f2ffa99-747a-8c1d-8475-ca185914f645"
uuid: "6233c773-3180-876d-99a1-6c671e3fc9be"
horo: 8
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
  - "ISO-31000:2018 risk-management`"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "737ef9a8-28bd-81d1-8bcf-317d75e25448"
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
      stageUuid: "1c276efa-eb77-8701-afef-2d47df027293"
    - stage: seal
      stageUuid: "8f8d087d-68f4-88eb-b8e0-57225203ebe5"
    - stage: uuid
      stageUuid: "8ea1033d-faac-8d41-a81e-983d439855c7"
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
