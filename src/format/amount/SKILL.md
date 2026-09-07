---
name: amount
description: "Use when reasoning about amount — renders integer cents as a fixed-two-decimal string; adds the code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers each doing it themselves…"
atomPath: "format/amount"
coordinate: "format/amount · 2/share · 1a146edf"
contentUuid: "29c973cd-8392-55a0-8205-ee047b9ec580"
diamondUuid: "f6e88083-d68b-8d88-849b-fc528f750c70"
uuid: "1a146edf-4cc5-8a36-8722-ab4d4358d8cd"
horo: 2
typography:
  partition: format
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "d0748d29-1171-89f6-ad6b-b656eeb6b945"
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
      stageUuid: "d2498798-927b-8115-b23b-58fb49b770e9"
    - stage: seal
      stageUuid: "6b128f60-4f8c-8301-875d-512d2cb31218"
    - stage: uuid
      stageUuid: "61cbf748-042e-829d-b018-93e4913dbf6e"
version: 2
---
# format/amount — money is integer cents in the system and a decimal string on the wire, converted in ONE place

`formatAmount` renders integer cents as a fixed-two-decimal string; `formatCurrency` adds the
code. Peppol UBL, ISO 20022, EDIFACT and SAF-T all need that wire form, and four serializers
each doing it themselves is four chances to round differently.

Composes: [[law]].
