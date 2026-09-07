---
name: plans
description: "Use when planning or tracking remediation of an audit finding or compliance gap — design/process/system/training/policy action steps with owner, target date, priority, budget, risk-of-delay, approval chain; COSO-2013 deficiency-remediation and SOX §404 control lifecycle. The remediation-plans improvement collection."
atomPath: "internal/controls/audit/findings/remediation/plans"
coordinate: "internal/controls/audit/findings/remediation/plans · 7/descent · eddbd975"
contentUuid: "c8f3bc15-1747-5003-803b-8ea37a7ba223"
diamondUuid: "2c56e2c2-cacd-80c8-a55f-4178928830b9"
uuid: "eddbd975-9e61-84df-8575-5977dfe702a8"
horo: 7
typography:
  partition: internal
  bondDegree: 20
standards:
  - "COSO-2013"
  - "COSO-2013 deficiency-remediation"
  - "SOX §404 control-remediation"
bindings: []
signatures:
  computationUuid: "ee164b15-3381-813f-8a75-13b82d241fc4"
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
      stageUuid: "16db21c5-1fc2-8aca-baba-e5847b3a7009"
    - stage: seal
      stageUuid: "c9c10628-31eb-8d50-8331-4f831d3e4b98"
    - stage: uuid
      stageUuid: "3aec3b88-327c-8a37-bec7-53ed1690c2c1"
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
