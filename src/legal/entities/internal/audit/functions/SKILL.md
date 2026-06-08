---
name: functions
description: "Use when establishing or governing an internal audit department — charter management, CAE reporting line, audit committee linkage, annual audit plan, resource budgeting, and IIA IPPF/COSO alignment per IIA IPPF / ISO-19011 / SOX §404. The internal-audit-function governance collection."
atomPath: legal/entities/internal/audit/functions
coordinate: legal/entities/internal/audit/functions · 2/share · b8c0e0aa
contentUuid: "3edb85f7-aef4-5971-b66c-e0380ad7ec54"
diamondUuid: "7eb336ea-8b1e-84e1-b9a6-e7bb505866b3"
uuid: "b8c0e0aa-6913-84db-90b8-56934ade626f"
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
  - "ISO-19011:2018 audit-programme"
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
  computationUuid: "eadf9efe-249a-8578-a8d5-bf2afd693bb8"
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
      stageUuid: "a1afe8db-c962-8729-baa3-39f93975035e"
    - stage: seal
      stageUuid: "05a0c87c-3dde-8b9f-af9f-8006de7e40f8"
    - stage: uuid
      stageUuid: "7dc98436-8c4f-85f4-acd7-d20e35dfa176"
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
