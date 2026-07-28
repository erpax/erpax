---
name: provisions
description: "Use when recognising or measuring uncertain liabilities — warranty, restructuring, onerous contracts, environmental remediation, decommissioning/ARO, litigation; tracking best-estimate vs discounted amount, reimbursement recovery, movement history (additions/reversals/unwinds), and §85 disclosure text. The IAS-37 provision register."
atomPath: "fiscal/periods/provisions"
coordinate: "fiscal/periods/provisions · 2/share · 026982e2"
contentUuid: "3377d31c-7740-54aa-b7c3-ba826f5f9321"
diamondUuid: "8d0dc773-5358-867f-b972-3d0816e81bae"
uuid: "026982e2-5201-82fd-89df-d4f0cc25c3b0"
horo: 2
bonds:
  in:
    - accounting
    - contingencies
    - findings
    - grants
    - law
    - liability
    - periods
    - transaction
  out:
    - accounting
    - contingencies
    - findings
    - grants
    - law
    - liability
    - transaction
typography:
  partition: fiscal
  bondDegree: 22
  neighbors: []
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
neighbors:
  wikilink:
    - accounting
    - contingencies
    - findings
    - law
    - transaction
  matrix:
    - accounting
    - contingencies
    - findings
    - grants
    - law
    - liability
    - transaction
  backlinks:
    - accounting
    - contingencies
    - findings
    - grants
    - law
    - liability
    - transaction
signatures:
  computationUuid: "7de39c30-a70f-80c0-967a-e70df38cd796"
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
      stageUuid: "733302b1-a965-86eb-b203-7ecdc689947e"
    - stage: seal
      stageUuid: "8f7090c4-3197-8f3a-9239-5f7be130c51f"
    - stage: uuid
      stageUuid: "2d579b71-8acf-8f3b-bd01-e89dcd147928"
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
