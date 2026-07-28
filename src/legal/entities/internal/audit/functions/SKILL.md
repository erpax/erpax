---
name: functions
description: "Use when establishing or governing an internal audit department — charter management, CAE reporting line, audit committee linkage, annual audit plan, resource budgeting, and IIA IPPF/COSO alignment per IIA IPPF / ISO-19011 / SOX §404. The internal-audit-function governance collection."
atomPath: "legal/entities/internal/audit/functions"
coordinate: "legal/entities/internal/audit/functions · 2/share · 0a46419a"
contentUuid: "6d19204f-3e13-5c37-bbdb-91f0432419da"
diamondUuid: "8bf3a166-a5ff-842a-8051-e8ac73e267ed"
uuid: "0a46419a-0f19-8356-aaeb-8c24315f8092"
horo: 2
bonds:
  in:
    - audit
    - entities
    - findings
    - law
  out:
    - entities
    - findings
    - law
typography:
  partition: legal
  bondDegree: 9
  neighbors: []
standards:
  - "IIA IPPF international-professional-practices-framework"
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink:
    - findings
    - law
  matrix:
    - entities
    - findings
    - law
  backlinks:
    - entities
    - findings
    - law
signatures:
  computationUuid: "2d47e3d3-4142-8950-91ea-1e06261359f4"
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
      stageUuid: "e96b6924-1de8-80fb-ac19-b1f211ed5368"
    - stage: seal
      stageUuid: "05a0c87c-3dde-8b9f-af9f-8006de7e40f8"
    - stage: uuid
      stageUuid: "0b2cb985-2ed3-8d34-8383-747bb9203bed"
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
