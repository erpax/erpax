---
name: amount
description: "Use when reasoning about amount — renders integer cents as a fixed-two-decimal string; adds the code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers each doing it themselves…"
atomPath: "format/amount"
coordinate: "format/amount · 4/weave · 88a4b56d"
contentUuid: "ca04ded4-7ffd-59ac-8c03-5839f9128981"
diamondUuid: "daedb983-0672-8819-85de-fd8ffd6d24d0"
uuid: "88a4b56d-0f4c-84d5-a38f-1622bb1f2b3f"
horo: 4
typography:
  partition: format
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "30065df2-1ea6-8a52-bdb9-748135ab8d12"
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
      stageUuid: "92908a0a-7a1c-85d2-8907-06448ca081a6"
    - stage: seal
      stageUuid: "6b128f60-4f8c-8301-875d-512d2cb31218"
    - stage: uuid
      stageUuid: "824f7ec1-3d79-8dc7-9c5c-836219581870"
version: 2
---
# format/amount — money is integer cents in the system and a decimal string on the wire, converted in ONE place

`formatAmount` renders integer cents as a fixed-two-decimal string; `formatCurrency` adds the
code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers
each doing it themselves is four chances to round differently.

Composes: [[law]].
