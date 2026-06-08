---
name: plans
description: "Use when planning or tracking remediation of an audit finding or compliance gap — design/process/system/training/policy action steps with owner, target date, priority, budget, risk-of-delay, approval chain; COSO-2013 deficiency-remediation and SOX §404 control lifecycle. The remediation-plans improvement collection."
atomPath: internal/controls/audit/findings/remediation/plans
coordinate: internal/controls/audit/findings/remediation/plans · 2/share · 09303185
contentUuid: "fe68c17b-7993-56e3-a3d9-2c30eb04d84a"
diamondUuid: "dc76b145-532a-864b-80b3-897cef11542c"
uuid: "09303185-e0b2-8dd8-9bcd-62a2f2eda195"
horo: 2
bonds:
  in:
    - access
    - accounting
    - commerce
    - fields
    - remediation
    - standard
    - subscriptions
  out:
    - access
    - accounting
    - commerce
    - fields
    - standard
    - subscriptions
typography:
  partition: internal
  bondDegree: 20
  neighbors: []
standards:
  - "COSO-2013"
  - "COSO-2013 deficiency-remediation"
  - "SOX §404 control-remediation"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - access
    - accounting
    - commerce
    - fields
    - standard
    - subscriptions
  backlinks:
    - access
    - accounting
    - commerce
    - fields
    - standard
    - subscriptions
signatures:
  computationUuid: "b35a6eda-84b4-88d1-a563-316e192ef520"
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
      stageUuid: "4f723537-8224-8c84-b294-227de069cba0"
    - stage: seal
      stageUuid: "c9c10628-31eb-8d50-8331-4f831d3e4b98"
    - stage: uuid
      stageUuid: "53c7ef0b-6f07-8152-8b85-c1f71b4c4d8b"
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
