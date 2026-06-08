---
name: evidences
description: "Use when attaching or retrieving documentary evidence for audit work — PDF documents, bank statements, GL printouts, reconciliations, signed approvals, workpapers — with chain-of-custody log, confidentiality classification, retention schedule, and links to controls, control tests, samples, and findings. The ISA-500/PCAOB-AS-1105 audit-evidence register."
atomPath: media/audit/evidences
coordinate: media/audit/evidences · 5/round · efd9b3a2
contentUuid: "473f7a3c-dcfa-595c-ad69-56e48958920e"
diamondUuid: "f7b3dd1c-4f32-868a-8e6d-ee0c9e1394fb"
uuid: "efd9b3a2-e566-81d4-8575-b4bacca98fb6"
horo: 5
bonds:
  in:
    - audit
    - law
    - samples
    - transactions
  out:
    - law
    - samples
    - transactions
typography:
  partition: media
  bondDegree: 9
  neighbors: []
standards:
  - "ILO-C105"
  - "ISA-500"
  - "ISA-500 audit-evidence"
  - "ISO-19011:2018 evidence"
  - "PCAOB AS-1105 audit-evidence"
  - "PCAOB-AS-1105"
bindings: []
neighbors:
  wikilink:
    - law
    - samples
  matrix:
    - law
    - samples
    - transactions
  backlinks:
    - law
    - samples
    - transactions
signatures:
  computationUuid: "60b9daf1-eed8-81e2-92b3-35ef9290acb0"
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
      stageUuid: "13e65e87-c3ea-827a-99f2-b0cfeecfeba8"
    - stage: seal
      stageUuid: "ee0b3925-ea4a-8133-9c29-aa94c5f5aad8"
    - stage: uuid
      stageUuid: "e3693339-1179-89a3-9165-78111a6bd610"
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
