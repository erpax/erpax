---
name: eu
description: "Use when reasoning about eu — Use for pan-EU authority APIs (VIES VAT validation, EU sanctions, Peppol directory, ECB rates) and the EU member-state registry — BG/DE/ES/FR/IT/NL/PL/PT/RO. The EU slice of the country-authority registry."
atomPath: "country/api/eu"
coordinate: "country/api/eu · 2/share · 521de6fe"
contentUuid: "7abcd4b2-f987-5563-bf11-79029bbeb2aa"
diamondUuid: "46090fa8-d703-8af2-8eaa-b77c0aeaad8b"
uuid: "521de6fe-9c6f-8a36-a1c4-61154cb4777d"
horo: 2
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
  computationUuid: "61bb49c4-8658-8862-a4ff-2488acba7f08"
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
      stageUuid: "b7376db6-0ca1-832d-a13d-bbf5ece4c9fd"
    - stage: seal
      stageUuid: "fb2f6e47-8fba-8ad5-9ea2-3340d3ea4aec"
    - stage: uuid
      stageUuid: "6967daf2-f4d1-82bb-b7c7-b310213d1342"
version: 2
---
# country/api/eu

The **eu** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
