---
name: submissions
description: "Use when building, submitting, or auditing Bulgarian Наредба Н-18 Приложение-38 standardised sales-audit files to НАП — period, self-checking header (count + control sum), submission status, НАП response, and the XML; never-deletable compliance trail. The BG fiscal-audit-file submission log."
atomPath: "audit/submissions"
coordinate: "audit/submissions · 7/descent · cb5d391f"
contentUuid: "4ce0f2dd-2860-5596-aa72-92bfa91ad36b"
diamondUuid: "ef1d6cf2-bd26-8ddc-b9b7-6ebca38319d9"
uuid: "cb5d391f-3bfe-87a9-8652-0e50c5f1ae73"
horo: 7
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
  computationUuid: "70656f32-87a5-8943-8b18-c2fa8fe30f20"
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
      stageUuid: "5aeeaa4f-4af1-8a1b-a128-052928ac7592"
    - stage: seal
      stageUuid: "c05b6749-8524-8c66-8d77-262e821bab5b"
    - stage: uuid
      stageUuid: "34c81295-de76-8d83-a5e3-f59b122bc867"
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
