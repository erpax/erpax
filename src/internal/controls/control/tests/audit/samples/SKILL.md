---
name: samples
description: "Use when recording or reviewing individual sample items drawn for a control test — pass/fail results, exception categories, tested-by, amount; ISA-530 statistical-sampling evidence per control test execution. The audit-samples collection."
atomPath: "internal/controls/control/tests/audit/samples"
coordinate: "internal/controls/control/tests/audit/samples · 2/share · 42bc5864"
contentUuid: "f916fe60-344f-5de6-b807-dcf42de33f00"
diamondUuid: "02d3b2ed-3a3e-835c-9c73-1bfa935d3fa6"
uuid: "42bc5864-9226-80d4-9867-39237f354175"
horo: 2
bonds:
  in:
    - audit
    - evidences
    - law
  out:
    - evidences
    - law
typography:
  partition: internal
  bondDegree: 6
  neighbors: []
standards:
  - "ISA-530"
  - "ISA-530 audit-sampling"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - evidences
    - law
  backlinks:
    - evidences
    - law
signatures:
  computationUuid: "3d9585df-8a3b-84d9-89ad-1685ecfb9c77"
  stages:
    - stage: path
      stageUuid: "7fe16e09-6749-898c-9f28-36d98497c640"
    - stage: trinity
      stageUuid: "6ab0600c-1324-83c4-84ec-fdb8c76ec91e"
    - stage: boundary
      stageUuid: "7fa0ce1d-5128-8ca4-8c2f-01216982e5e5"
    - stage: links
      stageUuid: "9a9bfa8d-19f0-83f2-844a-e2c433f26a39"
    - stage: horo
      stageUuid: "005d534c-b0cd-857e-98c8-fc160a765cef"
    - stage: seal
      stageUuid: "53659ce3-9718-8019-a8fc-9686be6ff4b6"
    - stage: uuid
      stageUuid: "258f349b-105e-8bf8-acb2-3ce68e8b0225"
version: 2
---
# audit-samples

AuditSamples.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISA-530 audit-sampling
- ISO-19011:2018 sampling-methodology
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: an audit sample is one item drawn for a control test, carrying its pass/fail result, exception category, tester and amount — the ISA-530 per-item evidence that rolls up into the test's deviation rate.**
