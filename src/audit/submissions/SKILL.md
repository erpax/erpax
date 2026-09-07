---
name: submissions
description: "Use when building, submitting, or auditing Bulgarian Наредба Н-18 Приложение-38 standardised sales-audit files to НАП — period, self-checking header (count + control sum), submission status, НАП response, and the XML; never-deletable compliance trail. The BG fiscal-audit-file submission log."
atomPath: "audit/submissions"
coordinate: "audit/submissions · 5/round · abb892ef"
contentUuid: "3e80ad27-03ef-57c4-aeee-5d495256e8d5"
diamondUuid: "b6df7781-cd69-8de1-b038-472ddff8ee63"
uuid: "abb892ef-e1fd-8b7c-adbd-c553f9037335"
horo: 5
typography:
  partition: audit
  bondDegree: 27
standards:
  - "BG Наредба-Н-18 §Приложение-38 audit-file-submission-log"
  - "ISO-19011"
  - "ISO-19011`"
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-27001:2022`"
  - "Naredba-N-18"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "de8d40cd-c0d8-8ed3-9d33-0be394ca4590"
  stages:
    - stage: path
      stageUuid: "c41e6e01-f5ea-87c8-a1a3-680732a14cbd"
    - stage: trinity
      stageUuid: "f2d76183-c67c-8e53-87a8-3d5b10abd08a"
    - stage: boundary
      stageUuid: "6e4d4a7a-6747-83a8-b9b7-b789bd376e67"
    - stage: links
      stageUuid: "2fe05e95-ee3c-861d-849f-a4fd25ca2523"
    - stage: horo
      stageUuid: "a4eed069-bd31-81b8-b19c-55d85a5ccce8"
    - stage: seal
      stageUuid: "c05b6749-8524-8c66-8d77-262e821bab5b"
    - stage: uuid
      stageUuid: "98bc9730-8181-8f09-b21f-b9f7195f820d"
version: 2
---
# audit-submissions

Audit Submissions — the evidence log of each Наредба Н-18 Приложение-38.

This collection uses [[access]] to enforce role-based read/create/update with permanent deletion disabled; [[auth]] to distinguish adminOrAccountant vs. read roles; [[field]] for structured field definitions (statusField, auditFields); [[hooks]] for tenant auto-population and audit trail recording; [[identity]] for tenant isolation; [[proof]] as the immutable compliance trail; and [[accounting]] for accounting/sales submission workflows.

A CollectionConfig at `index.ts` (schema + standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) with one folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO/IEC-27001:2022`
- `@standard ISO-19011`

- BG Наредба-Н-18 §Приложение-38 audit-file-submission-log
- ISO-19011:2018 §6.4 audit-evidence
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation
