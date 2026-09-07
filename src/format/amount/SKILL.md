---
name: amount
description: "Use when reasoning about amount — renders integer cents as a fixed-two-decimal string; adds the code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers each doing it themselves…"
atomPath: "format/amount"
coordinate: "format/amount · 8/crest · 75d29231"
contentUuid: "33068ec5-4eeb-5e00-ba37-6d6aebbb3a4e"
diamondUuid: "50f469e5-7e0d-85e9-850d-ea43131c1eb1"
uuid: "75d29231-502f-8c49-8c78-3f470d6bd6b7"
horo: 8
typography:
  partition: format
  bondDegree: 65
standards: []
bindings: []
signatures:
  computationUuid: "8e9172e1-7d45-823d-bf85-ed60db630e72"
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
      stageUuid: "b80ffbc2-6034-808f-852a-a544067da0c7"
    - stage: seal
      stageUuid: "6b128f60-4f8c-8301-875d-512d2cb31218"
    - stage: uuid
      stageUuid: "55834901-824f-8498-b50f-307a7d43eae0"
version: 2
---
# format/amount — money is integer cents in the system and a decimal string on the wire, converted in ONE place

`formatAmount` renders integer cents as a fixed-two-decimal string; `formatCurrency` adds the
code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers
each doing it themselves is four chances to round differently.

Composes: [[law]].
