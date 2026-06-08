---
name: properties
description: "Use when recognising or remeasuring IAS 40 investment property — land or buildings held to earn rental income or capital appreciation — under the §30 fair-value or cost model election, with transfer-of-use triggers (§57–65) and IFRS 13 hierarchy classification. The IAS 40 investment-property register."
atomPath: properties/investment/properties
coordinate: properties/investment/properties · 8/crest · 1ea523fa
contentUuid: "8b8b3f04-47f9-55cd-b0c6-8981436dee65"
diamondUuid: "a1994066-8c79-8bd0-81ac-c7c124571841"
uuid: "1ea523fa-07e8-8c38-a453-0ac55b096b5f"
horo: 8
bonds:
  in:
    - investment
    - leases
    - orders
    - properties
    - requests
    - spaces
  out:
    - leases
    - orders
    - properties
    - requests
    - spaces
typography:
  partition: properties
  bondDegree: 23
  neighbors: []
standards:
  - "IAS-40"
  - "IFRS IAS-40 §30 measurement-model-election"
  - "IFRS IAS-40 §33 fair-value-model"
  - "IFRS IAS-40 §5 definition-investment-property"
  - "IFRS IAS-40 §56 cost-model"
  - "IFRS IAS-40 §57-§65 transfers-into-out-of-investment-property"
  - "IFRS IAS-40 §74 disclosure-requirements"
  - "IFRS IFRS-13 fair-value-input-hierarchy"
  - "IFRS-13"
  - "ISO 19011:2018 §6.4.6 audit-evidence-investment-property"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls"
  - "US-GAAP"
  - "US-GAAP ASC-360 long-lived-assets (no separate IP standard)"
bindings: []
neighbors:
  wikilink:
    - leases
    - measurements
    - properties
  matrix:
    - leases
    - orders
    - properties
    - requests
    - spaces
  backlinks:
    - leases
    - orders
    - properties
    - requests
    - spaces
signatures:
  computationUuid: "5f15e33b-06c8-82fc-9125-51329710470d"
  stages:
    - stage: path
      stageUuid: "5c7df80d-d17e-88f6-a07b-56ebd16cc71e"
    - stage: trinity
      stageUuid: "f21cb108-7698-8777-b532-f04aa973e193"
    - stage: boundary
      stageUuid: "3ea24609-2258-80eb-a657-7600c2166f8a"
    - stage: links
      stageUuid: "1e945e4a-aad5-8213-ae00-63cbfc908c63"
    - stage: horo
      stageUuid: "a083e8ad-cac7-8026-bab4-b2be0329aa19"
    - stage: seal
      stageUuid: "a0c41547-8fd1-8237-9f27-29ffddb2892c"
    - stage: uuid
      stageUuid: "056a41f0-ec5f-83e1-a548-c2b2152be2ed"
version: 2
---
# investment-properties

Investment Properties — IAS 40 land/buildings held to earn rental.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS IAS-40 §5 definition-investment-property
- IFRS IAS-40 §30 measurement-model-election
- IFRS IAS-40 §33 fair-value-model
- IFRS IAS-40 §56 cost-model
- IFRS IAS-40 §57-§65 transfers-into-out-of-investment-property
- IFRS IAS-40 §74 disclosure-requirements
- IFRS IFRS-13 fair-value-input-hierarchy
- US-GAAP ASC-360 long-lived-assets (no separate IP standard)
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time
- ISO 19011:2018 §6.4.6 audit-evidence-investment-property
- SOX §404 internal-controls
- ISO 27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Properties]] · [[Leases]] · [[fair/value/measurements]].
