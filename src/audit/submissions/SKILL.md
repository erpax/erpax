---
name: submissions
description: "Use when building, submitting, or auditing Bulgarian Наредба Н-18 Приложение-38 standardised sales-audit files to НАП — period, self-checking header (count + control sum), submission status, НАП response, and the XML; never-deletable compliance trail. The BG fiscal-audit-file submission log."
atomPath: audit/submissions
coordinate: audit/submissions · 5/round · 0110258d
contentUuid: "d9eca5fd-bbb2-5914-be99-530908f771e5"
diamondUuid: "5e183a57-28e5-89c1-b6ee-0dc44e3eeaac"
uuid: "0110258d-a3f7-89cb-a952-515c086a07ed"
horo: 5
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
  - "ISO-19011:2018 §6.4 audit-evidence"
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
  computationUuid: "13cb7a02-ad66-8b53-92f5-e69fb27c6ae0"
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
      stageUuid: "2659f785-cb6d-8fae-9883-1ba6f213fd81"
    - stage: seal
      stageUuid: "66a610d5-fc38-8115-979f-9e7abda4df95"
    - stage: uuid
      stageUuid: "3a9252c6-58fc-819c-aca3-c60a574396e6"
version: 2
---
# audit-submissions

Audit Submissions — the evidence log of each Наредба Н-18 Приложение-38.

This collection uses [[access]] to enforce role-based read/create/update with permanent deletion disabled; [[auth]] to distinguish adminOrAccountant vs. read roles; [[fields]] for structured field definitions (statusField, auditFields); [[hooks]] for tenant auto-population and audit trail recording; [[identity]] for tenant isolation; [[proof]] as the immutable compliance trail; and [[accounting]] for accounting/sales submission workflows.

A CollectionConfig at `index.ts` (schema + standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) with one folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- BG Наредба-Н-18 §Приложение-38 audit-file-submission-log
- ISO-19011:2018 §6.4 audit-evidence
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation
