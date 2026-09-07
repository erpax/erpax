---
name: plans
description: "Use when planning or tracking remediation of an audit finding or compliance gap — design/process/system/training/policy action steps with owner, target date, priority, budget, risk-of-delay, approval chain; COSO-2013 deficiency-remediation and SOX §404 control lifecycle. The remediation-plans improvement collection."
atomPath: "internal/controls/audit/findings/remediation/plans"
coordinate: "internal/controls/audit/findings/remediation/plans · 1/base · e046ebb5"
contentUuid: "d2ae960a-f96e-5d63-b3d8-3a120d67f340"
diamondUuid: "145c852b-8702-87af-9d8c-e87a38da5f3c"
uuid: "e046ebb5-749f-8852-ab4a-7a4d18eaa1b8"
horo: 1
typography:
  partition: internal
  bondDegree: 20
standards:
  - "COSO-2013"
  - "COSO-2013 deficiency-remediation"
  - "SOX §404 control-remediation"
bindings: []
signatures:
  computationUuid: "6666d29f-1f94-83c7-8766-aa7475c9d825"
  stages:
    - stage: path
      stageUuid: "e73a31c5-2fd5-8343-bebc-1f066e654659"
    - stage: trinity
      stageUuid: "146a7a58-6a4b-8dd0-a30f-6ebfcbd7649b"
    - stage: boundary
      stageUuid: "34ebd485-d066-8bd0-b6d6-89865cfc8b21"
    - stage: links
      stageUuid: "af6bef66-990d-88a8-ab52-1528c76b7de0"
    - stage: horo
      stageUuid: "c17d664c-661f-8fa9-9d36-634a20e1f7e6"
    - stage: seal
      stageUuid: "c9c10628-31eb-8d50-8331-4f831d3e4b98"
    - stage: uuid
      stageUuid: "1d2a480a-37b7-887f-a2c3-65e5f9ba7fb0"
version: 2
---
# remediation-plans

RemediationPlans.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- COSO-2013 deficiency-remediation
- SOX §404 control-remediation
- ISO-27001 A.10 improvement
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: a remediation plan is the corrective response to an audit finding or compliance gap — action steps each bearing owner, target date, priority and approval chain — that drives the deficiency back to a controlled state.**
