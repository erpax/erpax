---
name: amount
description: "Use when reasoning about amount — renders integer cents as a fixed-two-decimal string; adds the code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers each doing it themselves…"
atomPath: "format/amount"
coordinate: "format/amount · 7/descent · 5ea63cf6"
contentUuid: "3778a983-a13b-57cf-a2aa-ad2c0738975a"
diamondUuid: "e430a98c-3549-86a0-8a50-2ad9481dea4e"
uuid: "5ea63cf6-b04b-81d8-b21b-26c8397e11f5"
horo: 7
typography:
  partition: format
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "12050ff1-b65d-842e-a99b-6e062d580b9a"
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
      stageUuid: "8e86df50-d25d-8cd9-a0ce-7e2ec8e632d1"
    - stage: seal
      stageUuid: "6b128f60-4f8c-8301-875d-512d2cb31218"
    - stage: uuid
      stageUuid: "c5aa2297-15d9-8a5f-afc1-9fc78d0bcab8"
version: 2
---
# format/amount — money is integer cents in the system and a decimal string on the wire, converted in ONE place

`formatAmount` renders integer cents as a fixed-two-decimal string; `formatCurrency` adds the
code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers
each doing it themselves is four chances to round differently.

Composes: [[law]].
