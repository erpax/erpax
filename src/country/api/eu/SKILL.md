---
name: eu
description: "Use when reasoning about eu — Use for pan-EU authority APIs (VIES VAT validation, EU sanctions, Peppol directory, ECB rates) and the EU member-state registry — BG/DE/ES/FR/IT/NL/PL/PT/RO. The EU slice of the country-authority registry."
atomPath: "country/api/eu"
coordinate: "country/api/eu · 1/base · 08e2128f"
contentUuid: "dc8cd46e-bad8-5503-92fb-9d1ce2fa5045"
diamondUuid: "1cc79727-867e-8741-91df-334a3d9b9c0d"
uuid: "08e2128f-1033-8fab-aa27-aba5b0ebf75b"
horo: 1
typography:
  partition: country
  bondDegree: 37
standards:
  - "IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "SDMX 2.1 statistical-data-and-metadata-exchange"
bindings: []
signatures:
  computationUuid: "dd5fd9b5-36d7-8b33-818c-fc0f414678ba"
  stages:
    - stage: path
      stageUuid: "0e91e2e6-4f18-8f2b-b22f-ad37f6314ab6"
    - stage: trinity
      stageUuid: "9640c0eb-9474-8e19-ad3e-ba95b1d8da9e"
    - stage: boundary
      stageUuid: "51c9c5d1-19eb-84ef-8cc4-de7c19a520b0"
    - stage: links
      stageUuid: "0da5ee87-4361-833c-b121-f75a97a1452a"
    - stage: horo
      stageUuid: "6698c0aa-a352-8920-95e3-45fe03bb4b45"
    - stage: seal
      stageUuid: "fb2f6e47-8fba-8ad5-9ea2-3340d3ea4aec"
    - stage: uuid
      stageUuid: "860009ee-bd10-8b6e-a382-25c1328e15e1"
version: 2
---
# country/api/eu

The **eu** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
