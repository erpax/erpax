---
name: eu
description: "Use when reasoning about eu — Use for pan-EU authority APIs (VIES VAT validation, EU sanctions, Peppol directory, ECB rates) and the EU member-state registry — BG/DE/ES/FR/IT/NL/PL/PT/RO. The EU slice of the country-authority registry."
atomPath: "country/api/eu"
coordinate: "country/api/eu · 4/weave · da3b22a6"
contentUuid: "7e63e5fb-edc5-550f-a4ce-7272c713470c"
diamondUuid: "0434183f-acbf-8a8d-ac27-5673db049e96"
uuid: "da3b22a6-bc9d-8118-b302-b5d5ff1d3448"
horo: 4
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
  computationUuid: "9564c9d4-0ded-8cc4-8cd4-704d38bb9c2d"
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
      stageUuid: "9fdab887-f11a-8755-ae20-a45a1607315c"
    - stage: seal
      stageUuid: "fb2f6e47-8fba-8ad5-9ea2-3340d3ea4aec"
    - stage: uuid
      stageUuid: "f7028c29-f481-8fb5-9257-8378506305a7"
version: 2
---
# country/api/eu

The **eu** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
