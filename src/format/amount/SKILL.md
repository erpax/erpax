---
name: amount
description: "Use when reasoning about amount — renders integer cents as a fixed-two-decimal string; adds the code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers each doing it themselves…"
atomPath: "format/amount"
coordinate: "format/amount · 2/share · 34f31139"
contentUuid: "bccf1cf4-94f2-50f2-818b-85cb33422512"
diamondUuid: "7eddf4de-3906-81c9-b2f7-70bdc330dcd6"
uuid: "34f31139-c225-8a38-9e25-90015fc9c7e2"
horo: 2
typography:
  partition: format
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "fa24e4f2-e68f-8d30-ae48-75616464148c"
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
      stageUuid: "035818f8-8ff1-837d-b163-2d22e612a3f0"
    - stage: seal
      stageUuid: "6b128f60-4f8c-8301-875d-512d2cb31218"
    - stage: uuid
      stageUuid: "fc8f5a0e-71df-879f-a221-424ebdeb325d"
version: 2
---
# format/amount — money is integer cents in the system and a decimal string on the wire, converted in ONE place

`formatAmount` renders integer cents as a fixed-two-decimal string; `formatCurrency` adds the
code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers
each doing it themselves is four chances to round differently.

Composes: [[law]].
