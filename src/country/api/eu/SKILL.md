---
name: eu
description: "Use when reasoning about eu — Use for pan-EU authority APIs (VIES VAT validation, EU sanctions, Peppol directory, ECB rates) and the EU member-state registry — BG/DE/ES/FR/IT/NL/PL/PT/RO. The EU slice of the country-authority registry."
atomPath: "country/api/eu"
coordinate: "country/api/eu · 8/crest · 9864095b"
contentUuid: "a35fd1ad-7eb2-5221-b412-dfe2307571c4"
diamondUuid: "57dfaff6-262a-8da3-b41d-62af3e558650"
uuid: "9864095b-171e-8c03-a9fd-161936932247"
horo: 8
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
  computationUuid: "b045d3b4-8664-8c62-aab6-a874602c018e"
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
      stageUuid: "ccffd1c8-5c00-8afe-a053-5e3752f2f6e8"
    - stage: seal
      stageUuid: "fb2f6e47-8fba-8ad5-9ea2-3340d3ea4aec"
    - stage: uuid
      stageUuid: "bfaf0b89-7131-8758-aa8b-3370a8528969"
version: 2
---
# country/api/eu

The **eu** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
