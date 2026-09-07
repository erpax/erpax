---
name: signatures
description: "Use when collecting or auditing e-signatures for contract execution — sequenced multi-party approval (legal→customer→company rep), eIDAS-compliant immutable signature records, provider verification URL, and fully-executed trigger for IFRS-15 §10 contract activation. The e-signature audit-trail collection."
atomPath: "customers/contracts/contract/signatures"
coordinate: "customers/contracts/contract/signatures · 8/crest · 92ae2ab8"
contentUuid: "72503f71-16f7-513f-874a-580979c1e8a5"
diamondUuid: "0d10e922-f1b5-886f-8c11-298616baacee"
uuid: "92ae2ab8-2c58-8809-a314-6530b526018c"
horo: 8
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
  computationUuid: "0c12977c-e39d-8127-890e-c68804325298"
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
      stageUuid: "793317d8-1014-8ff7-8487-30c3152c85cc"
    - stage: seal
      stageUuid: "573ccec1-dc40-85e4-94b4-2f077c905a57"
    - stage: uuid
      stageUuid: "001caabf-b804-80d2-94f2-7dcc4b89e3f5"
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
