---
name: functions
description: "Use when establishing or governing an internal audit department — charter management, CAE reporting line, audit committee linkage, annual audit plan, resource budgeting, and IIA IPPF/COSO alignment per IIA IPPF / ISO-19011 / SOX §404. The internal-audit-function governance collection."
atomPath: "legal/entities/internal/audit/functions"
coordinate: "legal/entities/internal/audit/functions · 7/descent · 26d56612"
contentUuid: "92834d5c-42b6-5456-9a17-62c06abed9d7"
diamondUuid: "3558377c-ec91-84bd-98fc-ba4db707ef8b"
uuid: "26d56612-faac-8b75-ba33-bec0e609b009"
horo: 7
typography:
  partition: legal
  bondDegree: 9
standards:
  - "IIA IPPF international-professional-practices-framework"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "9de9b026-5f7e-81b1-aaa9-13fac15cfa84"
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
      stageUuid: "4a58caea-fc65-8666-a689-b4bfed2dd386"
    - stage: seal
      stageUuid: "05a0c87c-3dde-8b9f-af9f-8006de7e40f8"
    - stage: uuid
      stageUuid: "2cd35c4f-813a-80f7-8357-7395bf04c459"
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
