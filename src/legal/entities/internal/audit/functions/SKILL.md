---
name: functions
description: "Use when establishing or governing an internal audit department — charter management, CAE reporting line, audit committee linkage, annual audit plan, resource budgeting, and IIA IPPF/COSO alignment per IIA IPPF / ISO-19011 / SOX §404. The internal-audit-function governance collection."
atomPath: "legal/entities/internal/audit/functions"
coordinate: "legal/entities/internal/audit/functions · 4/weave · ad077e1e"
contentUuid: "413181bf-2dd6-5759-b7f2-6a2a85b73932"
diamondUuid: "489d48be-afcf-8f7e-a171-92ec55169f1c"
uuid: "ad077e1e-db1d-8fa6-8c34-c68373465087"
horo: 4
typography:
  partition: legal
  bondDegree: 9
standards:
  - "IIA IPPF international-professional-practices-framework"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "1fce5488-3b74-89c0-a3fa-798c9f19b94b"
  stages:
    - stage: path
      stageUuid: "c0578220-f575-8cb2-a5e6-27166c67a53a"
    - stage: trinity
      stageUuid: "2a5d880a-b1cf-8522-b2a8-4ee9270df506"
    - stage: boundary
      stageUuid: "c971d9f2-68f2-85e2-875f-331771d751ff"
    - stage: links
      stageUuid: "b74519fa-53f1-83fe-89be-8d5656564b8c"
    - stage: horo
      stageUuid: "bbc27c4e-ec79-81c0-b6a2-21f49986b2b3"
    - stage: seal
      stageUuid: "05a0c87c-3dde-8b9f-af9f-8006de7e40f8"
    - stage: uuid
      stageUuid: "ff6c151b-a71a-8f7c-9a23-3a42eb006d93"
version: 2
---
# internal-audit-function

InternalAuditFunction.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IIA IPPF international-professional-practices-framework
- ISO-19011:2018 audit-programme
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[internal/controls/audit/findings]].

**Law — [[law]]: the internal-audit function is the independent assurance organ — a chartered CAE line reporting to the audit committee with its own annual plan, so control over the controls stays separate from those it audits.**
