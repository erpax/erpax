---
name: plans
description: "Use when planning or tracking remediation of an audit finding or compliance gap — design/process/system/training/policy action steps with owner, target date, priority, budget, risk-of-delay, approval chain; COSO-2013 deficiency-remediation and SOX §404 control lifecycle. The remediation-plans improvement collection."
atomPath: "internal/controls/audit/findings/remediation/plans"
coordinate: "internal/controls/audit/findings/remediation/plans · 1/base · 2dec94e4"
contentUuid: "e96d84df-1bab-5864-967d-eaaccd2edbd9"
diamondUuid: "8c93b9f8-08e8-8934-aa5d-9bbf66e8a999"
uuid: "2dec94e4-8366-88fa-b027-90d9985da89f"
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
  computationUuid: "9388b453-1a5a-8f4a-852d-c63b9274dee0"
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
      stageUuid: "dfc1c450-0b8b-86e2-9991-21ffb2f5d900"
    - stage: seal
      stageUuid: "c9c10628-31eb-8d50-8331-4f831d3e4b98"
    - stage: uuid
      stageUuid: "fdbc97aa-0887-84f2-ac7f-913b2ea9cce5"
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
