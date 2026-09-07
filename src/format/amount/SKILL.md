---
name: amount
description: "Use when reasoning about amount — renders integer cents as a fixed-two-decimal string; adds the code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers each doing it themselves…"
atomPath: "format/amount"
coordinate: "format/amount · 8/crest · f18f5e43"
contentUuid: "57dd2a2d-9b07-5362-9064-4f49eeca560c"
diamondUuid: "148ce38d-75da-8901-8d01-e6af5ae91dd5"
uuid: "f18f5e43-97a1-895e-ad34-0fe0c1276679"
horo: 8
typography:
  partition: format
  bondDegree: 65
standards: []
bindings: []
signatures:
  computationUuid: "a8a0a6f5-b727-8152-9573-ae57af31c506"
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
      stageUuid: "d5d06bfd-0844-827a-9cf6-0e0aabeebd5e"
    - stage: seal
      stageUuid: "6b128f60-4f8c-8301-875d-512d2cb31218"
    - stage: uuid
      stageUuid: "38cea36f-a6f7-860d-b8e0-30d526a4b836"
version: 2
---
# format/amount — money is integer cents in the system and a decimal string on the wire, converted in ONE place

`formatAmount` renders integer cents as a fixed-two-decimal string; `formatCurrency` adds the
code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers
each doing it themselves is four chances to round differently.

Composes: [[law]].
