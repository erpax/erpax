---
name: amount
description: "Use when reasoning about amount — renders integer cents as a fixed-two-decimal string; adds the code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers each doing it themselves…"
atomPath: "format/amount"
coordinate: "format/amount · 4/weave · 944dc1d2"
contentUuid: "5f80004c-3a1c-576f-ac63-5aa513167caa"
diamondUuid: "a95f3aac-e7b9-88e7-b9ed-4cd7f3fe1dc9"
uuid: "944dc1d2-49c8-8e43-801b-ee5cbd2eb8d0"
horo: 4
typography:
  partition: format
  bondDegree: 65
standards: []
bindings: []
signatures:
  computationUuid: "57c1aeb0-1ffe-82fe-a728-6e0c5e19bd14"
  stages:
    - stage: path
      stageUuid: "ebb76345-ef3e-8e5d-9a3e-3932d4168019"
    - stage: trinity
      stageUuid: "52ae069a-16d6-8db3-9d02-fc9811836817"
    - stage: boundary
      stageUuid: "6ac4d20e-eaa1-8b67-8d51-ceb5ccb57a41"
    - stage: links
      stageUuid: "fa583cf7-af18-825f-85e2-cf5aff8c2073"
    - stage: horo
      stageUuid: "fa18365d-54f0-84b0-9cef-8abc0b12c115"
    - stage: seal
      stageUuid: "6b128f60-4f8c-8301-875d-512d2cb31218"
    - stage: uuid
      stageUuid: "b72b4c9e-3354-89f0-ac00-b61ca7742c63"
version: 2
---
# format/amount — money is integer cents in the system and a decimal string on the wire, converted in ONE place

`formatAmount` renders integer cents as a fixed-two-decimal string; `formatCurrency` adds the
code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers
each doing it themselves is four chances to round differently.

Composes: [[law]].
