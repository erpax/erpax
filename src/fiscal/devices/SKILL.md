---
name: devices
description: "Use when registering or managing СУПТО fiscal hardware — each device carries an 8-digit ФУ number (first УНП segment), per-device currency and VAT tax groups, default operator and terminal for automated sales, and decommission lifecycle per Наредба Н-18. The fiscal-device registry."
atomPath: "fiscal/devices"
coordinate: "fiscal/devices · 5/round · a1630142"
contentUuid: "afca4fdd-c683-5b24-ba84-a72e0903b9e1"
diamondUuid: "04ce3cdb-9e3a-8950-abd0-e56495ba7fac"
uuid: "a1630142-67e9-8247-bace-55a5d34a3d3d"
horo: 5
typography:
  partition: fiscal
  bondDegree: 15
standards:
  - "BG Наредба-Н-18 §СУПТО fiscal-device-register"
  - "ISO-19011`"
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-27001:2022`"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "ec3bcef0-0f8c-8659-8159-83ed48cb8da4"
  stages:
    - stage: path
      stageUuid: "a0f624f9-21ab-8551-a545-65c4f6561d83"
    - stage: trinity
      stageUuid: "315e4d1e-60c9-8a56-99c2-4eadcff0e9c3"
    - stage: boundary
      stageUuid: "11206bbc-09c7-8036-9e9e-a241593c95a7"
    - stage: links
      stageUuid: "b89cacef-574a-8ad2-b69b-018b42c98951"
    - stage: horo
      stageUuid: "3de86415-545b-859c-856c-6edaec4bbb1a"
    - stage: seal
      stageUuid: "e3a2a81d-298e-8044-b3bb-4defee4d814c"
    - stage: uuid
      stageUuid: "80fe84f1-5b83-8693-909c-f6c4776ebc40"
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
