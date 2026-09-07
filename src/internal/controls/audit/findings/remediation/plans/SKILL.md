---
name: plans
description: "Use when planning or tracking remediation of an audit finding or compliance gap — design/process/system/training/policy action steps with owner, target date, priority, budget, risk-of-delay, approval chain; COSO-2013 deficiency-remediation and SOX §404 control lifecycle. The remediation-plans improvement collection."
atomPath: "internal/controls/audit/findings/remediation/plans"
coordinate: "internal/controls/audit/findings/remediation/plans · 5/round · 65a5e7b4"
contentUuid: "daa0cf35-18f1-5cb7-86db-a2039c7acd5f"
diamondUuid: "f0063ef4-558d-868a-adf1-bf6d37c2fcea"
uuid: "65a5e7b4-8d13-8c37-ad46-904a0b1df4e8"
horo: 5
typography:
  partition: internal
  bondDegree: 20
standards:
  - "COSO-2013"
  - "COSO-2013 deficiency-remediation"
  - "SOX §404 control-remediation"
bindings: []
signatures:
  computationUuid: "35b45538-b620-84a1-aec1-0683ff0ee62c"
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
      stageUuid: "48deda51-cfa7-8814-bfd1-985527357548"
    - stage: seal
      stageUuid: "c9c10628-31eb-8d50-8331-4f831d3e4b98"
    - stage: uuid
      stageUuid: "15a8f145-a165-8c70-8187-d33123d3411e"
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
