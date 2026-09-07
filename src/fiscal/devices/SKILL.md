---
name: devices
description: "Use when registering or managing СУПТО fiscal hardware — each device carries an 8-digit ФУ number (first УНП segment), per-device currency and VAT tax groups, default operator and terminal for automated sales, and decommission lifecycle per Наредба Н-18. The fiscal-device registry."
atomPath: "fiscal/devices"
coordinate: "fiscal/devices · 8/crest · 5f212860"
contentUuid: "b76f69b7-45bd-5e3f-8623-4b1b8a497687"
diamondUuid: "330d51d0-3670-8ad9-b7f5-a195692d70d6"
uuid: "5f212860-1d1c-813d-b897-3fec20b477b1"
horo: 8
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
  computationUuid: "3e9ab889-edce-8ec4-be9d-7cfa6176967c"
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
      stageUuid: "538815c0-4a68-8761-a810-9ed1af29542c"
    - stage: seal
      stageUuid: "e3a2a81d-298e-8044-b3bb-4defee4d814c"
    - stage: uuid
      stageUuid: "171c0cee-ce7e-8763-b457-809c2a3694bf"
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
