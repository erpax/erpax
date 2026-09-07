---
name: evidences
description: "Use when attaching or retrieving documentary evidence for audit work — PDF documents, bank statements, GL printouts, reconciliations, signed approvals, workpapers — with chain-of-custody log, confidentiality classification, retention schedule, and links to controls, control tests, samples, and findings. The ISA-500/PCAOB-AS-1105 audit-evidence register."
atomPath: "media/audit/evidences"
coordinate: "media/audit/evidences · 5/round · 5300dfe2"
contentUuid: "719ce749-f5ca-5e81-b337-bef15b7af8fc"
diamondUuid: "8d088651-8de5-8ef0-892d-2ac35b71e599"
uuid: "5300dfe2-e299-8a1b-af80-365cac0430ec"
horo: 5
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
  computationUuid: "bc6e92b7-60b1-8c79-8293-fea8d61be607"
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
      stageUuid: "8175cb90-38a5-8987-a84a-60ca065b7831"
    - stage: seal
      stageUuid: "ee0b3925-ea4a-8133-9c29-aa94c5f5aad8"
    - stage: uuid
      stageUuid: "713a6302-e7f2-8b76-8aa4-b9f911a552b0"
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
