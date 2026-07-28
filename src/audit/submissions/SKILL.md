---
name: submissions
description: "Use when building, submitting, or auditing Bulgarian Наредба Н-18 Приложение-38 standardised sales-audit files to НАП — period, self-checking header (count + control sum), submission status, НАП response, and the XML; never-deletable compliance trail. The BG fiscal-audit-file submission log."
atomPath: "audit/submissions"
coordinate: "audit/submissions · 7/descent · 949b782a"
contentUuid: "9727273b-fd56-5483-bead-c179ba8a2d86"
diamondUuid: "a8b80668-8802-866d-b90c-adf5b7531596"
uuid: "949b782a-36d1-8b75-b390-ba7922d9c392"
horo: 7
bonds:
  in:
    - access
    - accounting
    - audit
    - auth
    - fields
    - hooks
    - identity
    - proof
    - submission
    - supto
  out:
    - access
    - accounting
    - auth
    - fields
    - hooks
    - identity
    - proof
    - submission
    - supto
typography:
  partition: audit
  bondDegree: 27
  neighbors: []
standards:
  - "BG Наредба-Н-18 §Приложение-38 audit-file-submission-log"
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "ILO-C001"
  - "ISO-19011"
  - "ISO-19011`"
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-27001:2022`"
  - "Naredba-N-18"
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - auth
    - fields
    - hooks
    - identity
    - proof
  matrix:
    - access
    - accounting
    - auth
    - fields
    - hooks
    - identity
    - proof
    - submission
    - supto
  backlinks:
    - access
    - accounting
    - auth
    - fields
    - hooks
    - identity
    - proof
    - submission
    - supto
signatures:
  computationUuid: "f90b2215-5adb-821f-bd1a-9fc812fd77fa"
  stages:
    - stage: path
      stageUuid: "c41e6e01-f5ea-87c8-a1a3-680732a14cbd"
    - stage: trinity
      stageUuid: "f2d76183-c67c-8e53-87a8-3d5b10abd08a"
    - stage: boundary
      stageUuid: "5bea3ead-4960-83a6-b3b4-c3b70bbec247"
    - stage: links
      stageUuid: "f56cb43b-d0fe-8c87-8a37-e0b6635a5fbf"
    - stage: horo
      stageUuid: "9676bc43-8a1b-879b-83bf-b23c2f91ad2c"
    - stage: seal
      stageUuid: "66a610d5-fc38-8115-979f-9e7abda4df95"
    - stage: uuid
      stageUuid: "e7fc1781-e843-804c-936a-b94929791667"
version: 2
---
# audit-submissions

Audit Submissions — the evidence log of each Наредба Н-18 Приложение-38.

This collection uses [[access]] to enforce role-based read/create/update with permanent deletion disabled; [[auth]] to distinguish adminOrAccountant vs. read roles; [[fields]] for structured field definitions (statusField, auditFields); [[hooks]] for tenant auto-population and audit trail recording; [[identity]] for tenant isolation; [[proof]] as the immutable compliance trail; and [[accounting]] for accounting/sales submission workflows.

A CollectionConfig at `index.ts` (schema + standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) with one folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO/IEC-27001:2022`
- `@standard ISO-19011`

- BG Наредба-Н-18 §Приложение-38 audit-file-submission-log
- ISO-19011:2018 §6.4 audit-evidence
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation
