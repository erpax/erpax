---
name: evidences
description: "Use when attaching or retrieving documentary evidence for audit work — PDF documents, bank statements, GL printouts, reconciliations, signed approvals, workpapers — with chain-of-custody log, confidentiality classification, retention schedule, and links to controls, control tests, samples, and findings. The ISA-500/PCAOB-AS-1105 audit-evidence register."
atomPath: "media/audit/evidences"
coordinate: "media/audit/evidences · 2/share · 31b7cce6"
contentUuid: "503fe681-97cb-55a4-bc89-b182aff12876"
diamondUuid: "1905a0ef-b3c6-8198-bdfe-bf5fa758dd0f"
uuid: "31b7cce6-3310-8b99-95d0-28baf8e3897f"
horo: 2
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
  computationUuid: "798fcf5d-0b8c-806c-8f35-e59c1209e99c"
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
      stageUuid: "5848e104-582a-82ef-a262-7234453f1ea1"
    - stage: seal
      stageUuid: "ee0b3925-ea4a-8133-9c29-aa94c5f5aad8"
    - stage: uuid
      stageUuid: "909a3328-e725-8db9-8b2d-bf7b61d4c126"
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
