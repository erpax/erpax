---
name: submissions
description: "Use when building, submitting, or auditing Bulgarian Наредба Н-18 Приложение-38 standardised sales-audit files to НАП — period, self-checking header (count + control sum), submission status, НАП response, and the XML; never-deletable compliance trail. The BG fiscal-audit-file submission log."
atomPath: "audit/submissions"
coordinate: "audit/submissions · 5/round · 063f5962"
contentUuid: "7b422535-1f05-5e35-87b7-cc4e22fe9819"
diamondUuid: "47f79b32-6b0f-8def-87ae-93d2dfe43f91"
uuid: "063f5962-1920-819d-8bfa-1f74322fdfc8"
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
  computationUuid: "377b613d-43c1-8f55-aec0-6b0f173f6402"
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
      stageUuid: "f8f066fa-a675-8542-acea-ebd2606e9d2f"
    - stage: seal
      stageUuid: "66a610d5-fc38-8115-979f-9e7abda4df95"
    - stage: uuid
      stageUuid: "ffe5a7cd-19eb-858f-bacc-5c58134e6da1"
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
