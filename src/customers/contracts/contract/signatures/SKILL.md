---
name: signatures
description: "Use when collecting or auditing e-signatures for contract execution — sequenced multi-party approval (legal→customer→company rep), eIDAS-compliant immutable signature records, provider verification URL, and fully-executed trigger for IFRS-15 §10 contract activation. The e-signature audit-trail collection."
atomPath: "customers/contracts/contract/signatures"
coordinate: "customers/contracts/contract/signatures · 4/weave · e0ca0920"
contentUuid: "f70a4cc7-3847-5c89-9533-be7d1af13fa8"
diamondUuid: "a3b29a06-c314-83ee-8786-f797844a4c5d"
uuid: "e0ca0920-dce9-8eb6-9acf-65d7f53b54c3"
horo: 4
typography:
  partition: customers
  bondDegree: 15
standards:
  - "ASC-606"
  - "EU-537/2014"
  - "EU-910/2014"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IFRS IFRS-15 §10 contract-with-customer"
  - "IFRS IFRS-15 §10 contract-with-customer`"
  - "IFRS IFRS-15 §23 contract-identification"
  - "IFRS IFRS-15 §23 contract-identification`"
  - "IFRS-15"
  - "ISO-8601-1:2019 date-time signature-timestamp"
  - "ISO-8601-1:2019 date-time signature-timestamp`"
  - SOX
  - "SOX §302 management-certification audit-trail"
  - "SOX §302 management-certification audit-trail`"
  - "US-GAAP"
  - "US-GAAP ASC-606-10-25-1 contract-existence"
  - eIDAS
  - "eIDAS Regulation (EU) 2014/910 electronic-signature"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "804ca249-878f-8b62-b2dc-f3bb4ba19a79"
  stages:
    - stage: path
      stageUuid: "00388273-3891-8d95-957c-5a9c6ad6eeef"
    - stage: trinity
      stageUuid: "0a78aa02-fa48-83be-b4aa-eb788d55e49b"
    - stage: boundary
      stageUuid: "0c0ff820-9e69-8d69-8d02-934b3baf1f48"
    - stage: links
      stageUuid: "915578ba-ae34-88a7-ac6d-44995cc4e3e9"
    - stage: horo
      stageUuid: "56e3b946-34c1-8aa9-945e-78abe5dce6fc"
    - stage: seal
      stageUuid: "573ccec1-dc40-85e4-94b4-2f077c905a57"
    - stage: uuid
      stageUuid: "6890fcf5-f065-8bd7-8da7-cb00662da9af"
version: 2
---
# contract-signatures

Contract Signatures — e-signature status & approval workflow audit trail.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IFRS-15 §10 contract-with-customer`
- `@standard IFRS IFRS-15 §23 contract-identification`
- `@standard SOX §302 management-certification audit-trail`
- `@standard ISO-8601-1:2019 date-time signature-timestamp`

- IFRS IFRS-15 §10 contract-with-customer
- IFRS IFRS-15 §23 contract-identification
- US-GAAP ASC-606-10-25-1 contract-existence
- SOX §302 management-certification audit-trail
- eIDAS Regulation (EU) 2014/910 electronic-signature
- ISO-8601-1:2019 date-time signature-timestamp
- GDPR Art.6(1)(b) lawful-basis-contract
- ISO-19011:2018 audit-trail e-signature-evidence

Composes: [[identity]] · [[proof]] · [[standard]] · [[transaction]].

**Law — [[law]]: parties sign in the required sequence and each signature record is immutable, so the contract activates only once it is fully executed.**
