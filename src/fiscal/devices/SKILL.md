---
name: devices
description: "Use when registering or managing СУПТО fiscal hardware — each device carries an 8-digit ФУ number (first УНП segment), per-device currency and VAT tax groups, default operator and terminal for automated sales, and decommission lifecycle per Наредба Н-18. The fiscal-device registry."
atomPath: "fiscal/devices"
coordinate: "fiscal/devices · 8/crest · caaaccdf"
contentUuid: "b8f1d023-a223-59d5-a47b-feb649a9d3c0"
diamondUuid: "197e1c81-c93c-8fc2-b422-efa171fa11d0"
uuid: "caaaccdf-7b6f-80a0-a117-6ffc40408954"
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
  computationUuid: "c270c240-f955-84cc-bcaa-0650ce2fcc3f"
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
      stageUuid: "4240cd65-b653-8297-a342-315ee3b8601c"
    - stage: seal
      stageUuid: "e3a2a81d-298e-8044-b3bb-4defee4d814c"
    - stage: uuid
      stageUuid: "83a42821-da19-828a-8a10-d7e18f3f886c"
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
