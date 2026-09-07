---
name: eu
description: "Use when reasoning about eu — Use for pan-EU authority APIs (VIES VAT validation, EU sanctions, Peppol directory, ECB rates) and the EU member-state registry — BG/DE/ES/FR/IT/NL/PL/PT/RO. The EU slice of the country-authority registry."
atomPath: "country/api/eu"
coordinate: "country/api/eu · 4/weave · 07bdf62a"
contentUuid: "531217db-b7ab-578f-9747-8884d55f9d59"
diamondUuid: "ed4ff26e-86b5-8f04-aaee-94adbf515754"
uuid: "07bdf62a-0a90-8c1c-b2e9-97e09aab7607"
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
  computationUuid: "83e92af6-2bcc-809a-8f2c-0182186cb81c"
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
      stageUuid: "3cdba1e1-9b46-8600-851a-63dc4c17e6b4"
    - stage: seal
      stageUuid: "fb2f6e47-8fba-8ad5-9ea2-3340d3ea4aec"
    - stage: uuid
      stageUuid: "26740c49-3154-877a-8062-0258cac39fe2"
version: 2
---
# country/api/eu

The **eu** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
