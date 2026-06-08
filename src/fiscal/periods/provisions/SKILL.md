---
name: provisions
description: "Use when recognising or measuring uncertain liabilities — warranty, restructuring, onerous contracts, environmental remediation, decommissioning/ARO, litigation; tracking best-estimate vs discounted amount, reimbursement recovery, movement history (additions/reversals/unwinds), and §85 disclosure text. The IAS-37 provision register."
atomPath: fiscal/periods/provisions
coordinate: fiscal/periods/provisions · 2/share · b7643c83
contentUuid: "328d55e0-8d8d-5b66-84db-13ee409b47f1"
diamondUuid: "d3aa02fa-0418-8ab2-869e-0f9919734b95"
uuid: "b7643c83-b004-8ca8-a009-778fe71d4531"
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
  - "ISO-19011:2018 audit-trail provision-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls liability-completeness"
  - "US-GAAP ASC-410 asset-retirement-obligations"
  - "US-GAAP ASC-450-20-25 loss-contingencies"
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
  computationUuid: "3b0c22be-9e6b-837b-b204-5d9908cdfe7c"
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
      stageUuid: "45b37092-3ce6-8ff7-baa7-c017d8abf1bc"
    - stage: seal
      stageUuid: "8f7090c4-3197-8f3a-9239-5f7be130c51f"
    - stage: uuid
      stageUuid: "196b44c6-3276-82f8-aa3b-de87e1527d71"
version: 2
---
# provisions

Provisions — IAS-37 §14 + ASC 450 mandatory liability disclosure.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
