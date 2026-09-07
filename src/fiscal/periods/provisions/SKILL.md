---
name: provisions
description: "Use when recognising or measuring uncertain liabilities — warranty, restructuring, onerous contracts, environmental remediation, decommissioning/ARO, litigation; tracking best-estimate vs discounted amount, reimbursement recovery, movement history (additions/reversals/unwinds), and §85 disclosure text. The IAS-37 provision register."
atomPath: "fiscal/periods/provisions"
coordinate: "fiscal/periods/provisions · 7/descent · 4bbdb7bf"
contentUuid: "e955ef3e-44c3-5feb-8aec-9526f23b14c6"
diamondUuid: "c71c3363-18ff-8043-9d46-b5c7dc6fa549"
uuid: "4bbdb7bf-7446-8e47-a255-ce5e20e54c57"
horo: 7
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
  computationUuid: "6647a09d-17fd-86d5-922e-d665ddedce53"
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
      stageUuid: "a4f02af5-06f7-8dfc-ba9b-ce0014803ea3"
    - stage: seal
      stageUuid: "8f7090c4-3197-8f3a-9239-5f7be130c51f"
    - stage: uuid
      stageUuid: "3552aebd-f608-845a-bb6d-f6ef18a04eeb"
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
