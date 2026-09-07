---
name: amount
description: "Use when reasoning about amount — renders integer cents as a fixed-two-decimal string; adds the code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers each doing it themselves…"
atomPath: "format/amount"
coordinate: "format/amount · 1/base · 4854d741"
contentUuid: "1c5b4975-3ba8-536f-9a62-d21f08bcc2f8"
diamondUuid: "41c62bbb-6175-8faf-993d-b283f2916520"
uuid: "4854d741-1039-8b5b-bc33-586eaa486862"
horo: 1
typography:
  partition: format
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "3e4311ca-524c-8d4f-9047-0f8bc117a2e4"
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
      stageUuid: "dacb0fcc-82e2-88f1-8c18-a95f4932de32"
    - stage: seal
      stageUuid: "6b128f60-4f8c-8301-875d-512d2cb31218"
    - stage: uuid
      stageUuid: "c7d9ec84-9f91-8ee1-aade-5921206fca22"
version: 2
---
# format/amount — money is integer cents in the system and a decimal string on the wire, converted in ONE place

`formatAmount` renders integer cents as a fixed-two-decimal string; `formatCurrency` adds the
code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers
each doing it themselves is four chances to round differently.

Composes: [[law]].
