---
name: provisions
description: "Use when recognising or measuring uncertain liabilities — warranty, restructuring, onerous contracts, environmental remediation, decommissioning/ARO, litigation; tracking best-estimate vs discounted amount, reimbursement recovery, movement history (additions/reversals/unwinds), and §85 disclosure text. The IAS-37 provision register."
atomPath: "fiscal/periods/provisions"
coordinate: "fiscal/periods/provisions · 8/crest · 36bd5a8d"
contentUuid: "18746a18-1a0c-5ceb-89ec-55d342b41ab5"
diamondUuid: "92153b90-949a-8dbf-8575-28efe8466303"
uuid: "36bd5a8d-c1a3-8933-80ec-9b994ff9bcdd"
horo: 8
typography:
  partition: fiscal
  bondDegree: 19
standards:
  - "IFRS IAS-37 §10 contingent-liability-definition"
  - "IFRS IAS-37 §14 recognition-of-provisions"
  - "IFRS IAS-37 §27-30 recognition-prohibition"
  - "IFRS IAS-37 §36 §37 §39 measurement-best-estimate"
  - "IFRS IAS-37 §66 §67 onerous-contracts"
  - "IFRS IAS-37 §70 §83 disclosure-requirements"
  - "IFRS IAS-37 §86-92 disclosure-requirements"
  - "IFRS IFRS-15 §B50 onerous-contract-disclosure"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls liability-completeness"
  - "US-GAAP ASC-410 asset-retirement-obligations"
  - "US-GAAP ASC-440 commitments"
  - "US-GAAP ASC-450-20-25 loss-contingencies"
  - "US-GAAP ASC-450-20-50 loss-contingency-disclosure"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "1ce1980c-4891-85bc-ac8f-60cae24d5175"
  stages:
    - stage: path
      stageUuid: "f2aac0b4-6e02-8568-8500-cb93b2c469a2"
    - stage: trinity
      stageUuid: "fe9f23c7-21ab-8129-b76b-0f7ca763316a"
    - stage: boundary
      stageUuid: "85bdec58-06be-8aae-ba69-f621db651151"
    - stage: links
      stageUuid: "8e04cf04-80a8-84c9-b786-82c82119f96a"
    - stage: horo
      stageUuid: "65c03723-c37b-8ba8-9a16-0ec95241c40d"
    - stage: seal
      stageUuid: "8f7090c4-3197-8f3a-9239-5f7be130c51f"
    - stage: uuid
      stageUuid: "181ddc34-4077-8912-847a-bf9b9f1f4eea"
version: 2
---
# provisions

Provisions — IAS-37 §14 + ASC 450 mandatory liability disclosure.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## One register, two stages

A commitment or contingency is the same obligation before it is recognised, so it is a status of
this row instead of a second collection: `disclosedStages()` are off the balance sheet,
`recognisedStages()` are on it, and the two lists never share a status.

- `kind` says what the row is — provision, commitment, contingent liability, contingent asset or
  guarantee — and the disclosure facts (category, counterparty, likelihood, maximum exposure,
  expected outflow, note text) sit beside the measurement facts.
- A disclosed row may leave `provisionType`, `period` and `bestEstimate` empty; a recognised
  one may not. That is a validation on the three fields, keyed on the status.
- `recognitionOwed(row)` — IAS-37 §14: true exactly for a disclosed contingent liability whose
  likelihood is probable or virtually certain. A commitment or a contingent asset is never owed
  recognition by likelihood.
- `withRecognitionDate(row, now)` — dates the row the first time it is recognised.
- `provisionPresets()` — the two saved lists.

**Honest boundary.** `recognitionOwed` reports the duty; it does not perform the move, and
nothing yet raises it to a reviewer. A contingency's single reimbursement figure now lives in the
`reimbursementExpected` group's amount.

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

Composes: commitments/and/contingencies · [[internal/controls/audit/findings]] · [[accounting]] · [[transaction]].

**Law — [[law]]: a provision recognises a liability that is probable but uncertain in amount or timing — measured at best estimate (discounted where material), with every addition, reversal and unwind kept as movement history so the §85 disclosure is reconstructable, not asserted.**
