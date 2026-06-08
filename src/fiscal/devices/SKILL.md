---
name: devices
description: "Use when registering or managing СУПТО fiscal hardware — each device carries an 8-digit ФУ number (first УНП segment), per-device currency and VAT tax groups, default operator and terminal for automated sales, and decommission lifecycle per Наредба Н-18. The fiscal-device registry."
atomPath: fiscal/devices
coordinate: fiscal/devices · 8/crest · fb8dc4c7
contentUuid: "fd46335b-7d42-5950-ae6d-7c5cb787da70"
diamondUuid: "1c954e34-e3ec-8ba8-860e-81b1f1e07a53"
uuid: "fb8dc4c7-4e50-8e37-8ce9-ab76f0358604"
horo: 8
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
  - "ISO-19011:2018 audit-trail"
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
  computationUuid: "6a9ec2fa-fda2-8503-9afe-9af6947a59ad"
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
      stageUuid: "9e56eefe-5525-892d-b427-f6348efacb5b"
    - stage: seal
      stageUuid: "e3a2a81d-298e-8044-b3bb-4defee4d814c"
    - stage: uuid
      stageUuid: "beb93e1c-f38e-8aae-99c6-5b0ef5993f3a"
version: 2
---
# fiscal-devices

Fiscal Devices (ФУ) — the registry of fiscal units a СУПТО tenant operates.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- BG Наредба-Н-18 §СУПТО fiscal-device-register
- ISO-19011:2018 audit-trail
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Operators]] · [[Sales]] · [[Terminals]].

**Law — [[law]]: every fiscal device carries a unique 8-digit ФУ number that anchors the first segment of every УНП it issues — the device identity is the root of the gapless sale-numbering chain Наредба Н-18 demands, and decommission is a lifecycle state, not a deletion.**
