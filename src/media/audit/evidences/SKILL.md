---
name: evidences
description: "Use when attaching or retrieving documentary evidence for audit work — PDF documents, bank statements, GL printouts, reconciliations, signed approvals, workpapers — with chain-of-custody log, confidentiality classification, retention schedule, and links to controls, control tests, samples, and findings. The ISA-500/PCAOB-AS-1105 audit-evidence register."
atomPath: "media/audit/evidences"
coordinate: "media/audit/evidences · 7/descent · 8cf0222b"
contentUuid: "312ca98b-12c9-54f7-bf50-655c84d68004"
diamondUuid: "42043bcd-29cb-8ed0-94e4-01c549c1c8f6"
uuid: "8cf0222b-8673-8289-9c72-7c5e44c036fb"
horo: 7
typography:
  partition: media
  bondDegree: 9
standards:
  - "ISA-500"
  - "ISA-500 audit-evidence"
  - "PCAOB AS-1105 audit-evidence"
  - "PCAOB-AS-1105"
bindings: []
signatures:
  computationUuid: "e0416d03-86f4-8a64-8d16-8b9df8449aac"
  stages:
    - stage: path
      stageUuid: "515581df-778c-8832-ab92-677924026d57"
    - stage: trinity
      stageUuid: "1f9aa328-0410-8003-a892-8ea2180f64ab"
    - stage: boundary
      stageUuid: "eca41126-79be-8e91-8a9f-8efdc85e1985"
    - stage: links
      stageUuid: "c1c1be08-5bcd-864f-ad87-afbfdb5a98e5"
    - stage: horo
      stageUuid: "b4709f6d-beef-8ec1-8429-95847917088c"
    - stage: seal
      stageUuid: "ee0b3925-ea4a-8133-9c29-aa94c5f5aad8"
    - stage: uuid
      stageUuid: "6e225c61-1430-82d6-bfb7-c005ad2ec995"
version: 2
---
# audit-evidence

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISA-500 audit-evidence
- PCAOB AS-1105 audit-evidence
- ISO-19011:2018 evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[internal/controls/control/tests/audit/samples]].

**Law — [[law]]: a piece of audit-evidence is documentary support (PDF, statement, workpaper, signed approval) carried with its chain-of-custody, confidentiality classification and retention schedule, and linked to the control, test, sample or finding it supports (ISA-500 / PCAOB AS-1105).**
