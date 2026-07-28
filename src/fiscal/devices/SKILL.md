---
name: devices
description: "Use when registering or managing СУПТО fiscal hardware — each device carries an 8-digit ФУ number (first УНП segment), per-device currency and VAT tax groups, default operator and terminal for automated sales, and decommission lifecycle per Наредба Н-18. The fiscal-device registry."
atomPath: "fiscal/devices"
coordinate: "fiscal/devices · 5/round · b64ffd50"
contentUuid: "9c5c5b24-61d1-57bf-a946-c965ef5d2296"
diamondUuid: "cfa5e5b8-697f-87e2-9d90-d4bf2cfc8852"
uuid: "b64ffd50-a593-8244-b796-2fcb940c4890"
horo: 5
bonds:
  in:
    - law
    - operators
    - sales
    - supto
    - terminals
  out:
    - law
    - operators
    - sales
    - supto
    - terminals
typography:
  partition: fiscal
  bondDegree: 15
  neighbors: []
standards:
  - "BG Наредба-Н-18 §СУПТО fiscal-device-register"
  - "ISO-19011`"
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-27001:2022`"
  - "Naredba-N-18"
bindings: []
neighbors:
  wikilink:
    - law
    - operators
    - sales
    - terminals
  matrix:
    - law
    - operators
    - sales
    - supto
    - terminals
  backlinks:
    - law
    - operators
    - sales
    - supto
    - terminals
signatures:
  computationUuid: "147aad17-309e-85e1-bdca-956654c25862"
  stages:
    - stage: path
      stageUuid: "a0f624f9-21ab-8551-a545-65c4f6561d83"
    - stage: trinity
      stageUuid: "315e4d1e-60c9-8a56-99c2-4eadcff0e9c3"
    - stage: boundary
      stageUuid: "cea22235-f0cd-84f2-873b-ad217c62d359"
    - stage: links
      stageUuid: "b89cacef-574a-8ad2-b69b-018b42c98951"
    - stage: horo
      stageUuid: "47b20134-3220-8976-8c57-8d8af6937099"
    - stage: seal
      stageUuid: "e3a2a81d-298e-8044-b3bb-4defee4d814c"
    - stage: uuid
      stageUuid: "b536387d-6df3-85b4-911d-836a8238baea"
version: 2
---
# fiscal-devices

Fiscal Devices (ФУ) — the registry of fiscal units a СУПТО tenant operates.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO/IEC-27001:2022`
- `@standard ISO-19011`

- BG Наредба-Н-18 §СУПТО fiscal-device-register
- ISO-19011:2018 audit-trail
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Operators]] · [[Sales]] · [[Terminals]].

**Law — [[law]]: every fiscal device carries a unique 8-digit ФУ number that anchors the first segment of every УНП it issues — the device identity is the root of the gapless sale-numbering chain Наредба Н-18 demands, and decommission is a lifecycle state, not a deletion.**
