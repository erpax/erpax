---
name: amount
description: "Use when reasoning about amount — renders integer cents as a fixed-two-decimal string; adds the code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers each doing it themselves…"
atomPath: "format/amount"
coordinate: "format/amount · 5/round · b5115fb8"
contentUuid: "ba307eda-3810-5a8c-a189-3a3395132443"
diamondUuid: "213222bd-b248-8db6-bb31-40a73b2b61c5"
uuid: "b5115fb8-7c8c-89bf-9d04-98526c5570c0"
horo: 5
typography:
  partition: format
  bondDegree: 65
standards: []
bindings: []
signatures:
  computationUuid: "182732d9-d823-8c8e-8955-c3b4c74108ff"
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
      stageUuid: "3a3d0598-1ff5-84ed-9688-6ece73d8176d"
    - stage: seal
      stageUuid: "6b128f60-4f8c-8301-875d-512d2cb31218"
    - stage: uuid
      stageUuid: "f0b61009-0a06-8294-9ac0-c9778be804d2"
version: 2
---
# format/amount — money is integer cents in the system and a decimal string on the wire, converted in ONE place

`formatAmount` renders integer cents as a fixed-two-decimal string; `formatCurrency` adds the
code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers
each doing it themselves is four chances to round differently.

Composes: [[law]].
