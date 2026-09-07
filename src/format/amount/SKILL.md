---
name: amount
description: "Use when reasoning about amount — renders integer cents as a fixed-two-decimal string; adds the code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers each doing it themselves…"
atomPath: "format/amount"
coordinate: "format/amount · 7/descent · c80d9197"
contentUuid: "fa03ab85-2af0-5b03-8b9d-e75bb00154ef"
diamondUuid: "5fef031c-b4e8-8cdb-ad72-1151711f1bb9"
uuid: "c80d9197-ebc2-8e97-80d8-8097ab272dc7"
horo: 7
typography:
  partition: format
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "a02a9421-b371-868e-a656-346a1f286993"
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
      stageUuid: "fe76e4a5-ca9c-8b57-99c4-0eb84e4962e3"
    - stage: seal
      stageUuid: "6b128f60-4f8c-8301-875d-512d2cb31218"
    - stage: uuid
      stageUuid: "899a4db6-553e-869c-b396-971a9a850b90"
version: 2
---
# format/amount — money is integer cents in the system and a decimal string on the wire, converted in ONE place

`formatAmount` renders integer cents as a fixed-two-decimal string; `formatCurrency` adds the
code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers
each doing it themselves is four chances to round differently.

Composes: [[law]].
