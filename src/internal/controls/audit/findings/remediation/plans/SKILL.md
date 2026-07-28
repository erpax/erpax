---
name: plans
description: "Use when planning or tracking remediation of an audit finding or compliance gap — design/process/system/training/policy action steps with owner, target date, priority, budget, risk-of-delay, approval chain; COSO-2013 deficiency-remediation and SOX §404 control lifecycle. The remediation-plans improvement collection."
atomPath: "internal/controls/audit/findings/remediation/plans"
coordinate: "internal/controls/audit/findings/remediation/plans · 7/descent · bec94f20"
contentUuid: "de93c5e9-7d7d-5ced-a1d0-d915a1a270a3"
diamondUuid: "f592997b-54cb-854b-b768-7497c6e8c2d2"
uuid: "bec94f20-4f43-8f72-aadf-284dd08706b2"
horo: 7
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
  computationUuid: "ca554d3a-612e-89a8-8e59-b8fa6d8fa02a"
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
      stageUuid: "0a30af29-f547-85bd-b283-99a37ef678db"
    - stage: seal
      stageUuid: "c9c10628-31eb-8d50-8331-4f831d3e4b98"
    - stage: uuid
      stageUuid: "60ebad66-5dc1-80b2-8526-3e1c12439f00"
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
