---
name: functions
description: "Use when establishing or governing an internal audit department — charter management, CAE reporting line, audit committee linkage, annual audit plan, resource budgeting, and IIA IPPF/COSO alignment per IIA IPPF / ISO-19011 / SOX §404. The internal-audit-function governance collection."
atomPath: "legal/entities/internal/audit/functions"
coordinate: "legal/entities/internal/audit/functions · 4/weave · 4b833a71"
contentUuid: "d1710033-8396-56a2-8fba-4a2b59bef81c"
diamondUuid: "8ed88ebd-691b-83a6-af85-39f70fcf85f6"
uuid: "4b833a71-b78a-8fc9-8e23-b377757611f3"
horo: 4
typography:
  partition: legal
  bondDegree: 9
standards:
  - "IIA IPPF international-professional-practices-framework"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "2963360a-abfe-8e93-a9bd-61f2740dc00b"
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
      stageUuid: "48e658e1-c8ee-8d78-9310-c98e78157ab7"
    - stage: seal
      stageUuid: "05a0c87c-3dde-8b9f-af9f-8006de7e40f8"
    - stage: uuid
      stageUuid: "aad233f0-4a39-8791-b33d-fbadb9605e45"
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
