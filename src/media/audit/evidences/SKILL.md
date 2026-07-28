---
name: evidences
description: "Use when attaching or retrieving documentary evidence for audit work — PDF documents, bank statements, GL printouts, reconciliations, signed approvals, workpapers — with chain-of-custody log, confidentiality classification, retention schedule, and links to controls, control tests, samples, and findings. The ISA-500/PCAOB-AS-1105 audit-evidence register."
atomPath: "media/audit/evidences"
coordinate: "media/audit/evidences · 7/descent · d735f20e"
contentUuid: "d708d988-0840-559f-b3bd-a2870692cb9b"
diamondUuid: "9ca6049a-70e4-8249-bfd2-24c7953945cd"
uuid: "d735f20e-16e8-8374-ad44-7bfebfacb822"
horo: 7
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
  computationUuid: "c6fffc9d-7079-8739-889f-7a839e1a21c8"
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
      stageUuid: "cf457db6-5ec8-81e5-a070-f1f385a4b4a1"
    - stage: seal
      stageUuid: "ee0b3925-ea4a-8133-9c29-aa94c5f5aad8"
    - stage: uuid
      stageUuid: "f71508e6-4045-8280-bf68-7a175290ee93"
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
