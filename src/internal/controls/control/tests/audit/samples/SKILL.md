---
name: samples
description: "Use when recording or reviewing individual sample items drawn for a control test — pass/fail results, exception categories, tested-by, amount; ISA-530 statistical-sampling evidence per control test execution. The audit-samples collection."
atomPath: "internal/controls/control/tests/audit/samples"
coordinate: "internal/controls/control/tests/audit/samples · 8/crest · ed57fb96"
contentUuid: "9c10704e-347a-599f-a901-fef38cba3a72"
diamondUuid: "606b6bad-c548-883c-84cf-1566f399a27f"
uuid: "ed57fb96-9bda-8f4f-870a-7cb29f5e0e81"
horo: 8
typography:
  partition: internal
  bondDegree: 6
standards:
  - "ISA-530"
  - "ISA-530 audit-sampling"
bindings: []
signatures:
  computationUuid: "b401bc5b-6e11-8ccb-96a9-d79332f7ed54"
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
      stageUuid: "7c26852b-d7af-8468-b218-e40c5e255420"
    - stage: seal
      stageUuid: "53659ce3-9718-8019-a8fc-9686be6ff4b6"
    - stage: uuid
      stageUuid: "7ee78eda-d1e7-83df-a440-4c2d55328f29"
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
