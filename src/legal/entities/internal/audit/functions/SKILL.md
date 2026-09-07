---
name: functions
description: "Use when establishing or governing an internal audit department — charter management, CAE reporting line, audit committee linkage, annual audit plan, resource budgeting, and IIA IPPF/COSO alignment per IIA IPPF / ISO-19011 / SOX §404. The internal-audit-function governance collection."
atomPath: "legal/entities/internal/audit/functions"
coordinate: "legal/entities/internal/audit/functions · 8/crest · 816e5974"
contentUuid: "c89f6906-df40-5f70-819c-512a5cd5105a"
diamondUuid: "3f555e00-6fa2-80d9-9056-0ed5e5bf9653"
uuid: "816e5974-5654-852e-aaaa-1dccfd3811c9"
horo: 8
typography:
  partition: legal
  bondDegree: 9
standards:
  - "IIA IPPF international-professional-practices-framework"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "b9bce958-fea6-8b32-b6a0-e1b1ecfbc6a4"
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
      stageUuid: "dcee8038-a1c0-88ae-87b0-8768277fb902"
    - stage: seal
      stageUuid: "05a0c87c-3dde-8b9f-af9f-8006de7e40f8"
    - stage: uuid
      stageUuid: "715acc15-8a46-8a59-9200-c6ebc0fd534a"
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
