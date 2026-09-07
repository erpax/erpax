---
name: properties
description: "Use when recognising or remeasuring IAS 40 investment property — land or buildings held to earn rental income or capital appreciation — under the §30 fair-value or cost model election, with transfer-of-use triggers (§57–65) and IFRS 13 hierarchy classification. The IAS 40 investment-property register."
atomPath: "properties/investment/properties"
coordinate: "properties/investment/properties · 2/share · 59d673a5"
contentUuid: "a13e2185-0d28-5c10-bad3-618cb2e80038"
diamondUuid: "068c2954-8035-83a3-bc1c-71255740a865"
uuid: "59d673a5-d97a-8e14-a595-b10ffe2e016c"
horo: 2
typography:
  partition: properties
  bondDegree: 23
standards:
  - "IAS-40"
  - "IFRS IAS-40 §30 measurement-model-election"
  - "IFRS IAS-40 §30 measurement-model-election`"
  - "IFRS IAS-40 §33 fair-value-model"
  - "IFRS IAS-40 §33 fair-value-model`"
  - "IFRS IAS-40 §5 definition-investment-property"
  - "IFRS IAS-40 §5 definition-investment-property`"
  - "IFRS IAS-40 §56 cost-model"
  - "IFRS IAS-40 §56 cost-model`"
  - "IFRS IAS-40 §57-§65 transfers-into-out-of-investment-property"
  - "IFRS IAS-40 §57-§65 transfers-into-out-of-investment-property`"
  - "IFRS IAS-40 §74 disclosure-requirements"
  - "IFRS IAS-40 §74 disclosure-requirements`"
  - "IFRS IFRS-13 fair-value-input-hierarchy"
  - "IFRS IFRS-13 fair-value-input-hierarchy`"
  - "IFRS-13"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls"
  - "US-GAAP"
  - "US-GAAP ASC-360 long-lived-assets (no separate IP standard)"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3a57810d-9db6-85f8-a8e7-e99aaee431db"
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
      stageUuid: "ab63091a-81c4-8ed5-a76f-2e5d6b05cb58"
    - stage: seal
      stageUuid: "a0c41547-8fd1-8237-9f27-29ffddb2892c"
    - stage: uuid
      stageUuid: "913993d7-c8f6-8c48-aeac-4a8e8ae6ca70"
version: 2
---
# investment-properties

Investment Properties — IAS 40 land/buildings held to earn rental.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IAS-40 §5 definition-investment-property`
- `@standard IFRS IAS-40 §30 measurement-model-election`
- `@standard IFRS IAS-40 §33 fair-value-model`
- `@standard IFRS IAS-40 §56 cost-model`
- `@standard IFRS IAS-40 §57-§65 transfers-into-out-of-investment-property`
- `@standard IFRS IAS-40 §74 disclosure-requirements`
- `@standard IFRS IFRS-13 fair-value-input-hierarchy`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time`

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
