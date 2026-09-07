---
name: provisions
description: "Use when recognising or measuring uncertain liabilities — warranty, restructuring, onerous contracts, environmental remediation, decommissioning/ARO, litigation; tracking best-estimate vs discounted amount, reimbursement recovery, movement history (additions/reversals/unwinds), and §85 disclosure text. The IAS-37 provision register."
atomPath: "fiscal/periods/provisions"
coordinate: "fiscal/periods/provisions · 1/base · f82b4e6e"
contentUuid: "5d1b91d0-2e12-506f-85d7-8af4d2986caf"
diamondUuid: "4c852a98-e0b7-800a-819a-737753496796"
uuid: "f82b4e6e-d76a-8745-8f69-b111bd35b22a"
horo: 1
typography:
  partition: fiscal
  bondDegree: 22
standards:
  - "IFRS IAS-37 §14 recognition-of-provisions"
  - "IFRS IAS-37 §36 §37 §39 measurement-best-estimate"
  - "IFRS IAS-37 §66 §67 onerous-contracts"
  - "IFRS IAS-37 §70 §83 disclosure-requirements"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls liability-completeness"
  - "US-GAAP ASC-410 asset-retirement-obligations"
  - "US-GAAP ASC-450-20-25 loss-contingencies"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f56866d1-7627-80a5-aefa-a4941a0943d4"
  stages:
    - stage: path
      stageUuid: "f2aac0b4-6e02-8568-8500-cb93b2c469a2"
    - stage: trinity
      stageUuid: "fe9f23c7-21ab-8129-b76b-0f7ca763316a"
    - stage: boundary
      stageUuid: "c7a5c738-5d78-8f32-a69c-85f123a4210f"
    - stage: links
      stageUuid: "8e04cf04-80a8-84c9-b786-82c82119f96a"
    - stage: horo
      stageUuid: "e3781b2d-f30a-8701-be26-ceba26c752b7"
    - stage: seal
      stageUuid: "8f7090c4-3197-8f3a-9239-5f7be130c51f"
    - stage: uuid
      stageUuid: "346b6844-88ac-8bea-9254-383443fcefaa"
version: 2
---
# provisions

Provisions — IAS-37 §14 + ASC 450 mandatory liability disclosure.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IAS-37 §14 recognition-of-provisions
- IFRS IAS-37 §36 §37 §39 measurement-best-estimate
- IFRS IAS-37 §66 §67 onerous-contracts
- IFRS IAS-37 §70 §83 disclosure-requirements
- US-GAAP ASC-450-20-25 loss-contingencies
- US-GAAP ASC-410 asset-retirement-obligations
- ISO-19011:2018 audit-trail provision-evidence
- SOX §404 internal-controls liability-completeness
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[commitments/and/contingencies]] · [[internal/controls/audit/findings]] · [[accounting]] · [[transaction]].

**Law — [[law]]: a provision recognises a liability that is probable but uncertain in amount or timing — measured at best estimate (discounted where material), with every addition, reversal and unwind kept as movement history so the §85 disclosure is reconstructable, not asserted.**
