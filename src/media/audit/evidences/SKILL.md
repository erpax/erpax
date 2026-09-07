---
name: evidences
description: "Use when attaching or retrieving documentary evidence for audit work — PDF documents, bank statements, GL printouts, reconciliations, signed approvals, workpapers — with chain-of-custody log, confidentiality classification, retention schedule, and links to controls, control tests, samples, and findings. The ISA-500/PCAOB-AS-1105 audit-evidence register."
atomPath: "media/audit/evidences"
coordinate: "media/audit/evidences · 8/crest · 8f111f11"
contentUuid: "24ecde29-579f-5814-90bb-c6ac8a76aee2"
diamondUuid: "b9cd670f-9166-894c-805d-27d29ea04062"
uuid: "8f111f11-6244-855c-9901-09b50f670ded"
horo: 8
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
  computationUuid: "a0881e05-cdce-8785-bdb8-b72460c47736"
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
      stageUuid: "5214b630-577d-8add-9a98-4b55e985b3ae"
    - stage: seal
      stageUuid: "ee0b3925-ea4a-8133-9c29-aa94c5f5aad8"
    - stage: uuid
      stageUuid: "ccfad6ac-3e86-8351-b68f-58e72b0d6c40"
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
