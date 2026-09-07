---
name: signatures
description: "Use when collecting or auditing e-signatures for contract execution — sequenced multi-party approval (legal→customer→company rep), eIDAS-compliant immutable signature records, provider verification URL, and fully-executed trigger for IFRS-15 §10 contract activation. The e-signature audit-trail collection."
atomPath: "customers/contracts/contract/signatures"
coordinate: "customers/contracts/contract/signatures · 1/base · 58706d5f"
contentUuid: "f46acece-e758-5364-a4e0-983a1bcc5419"
diamondUuid: "f2d7d625-64fd-88a7-a138-00ea4a476b3a"
uuid: "58706d5f-e4ae-863b-ad7c-823fe4193d45"
horo: 1
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
  computationUuid: "fbe35802-0b5b-8307-b512-8eca36d45de9"
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
      stageUuid: "191c2192-9ef7-8d97-b51c-4e6cd31db694"
    - stage: seal
      stageUuid: "573ccec1-dc40-85e4-94b4-2f077c905a57"
    - stage: uuid
      stageUuid: "2377ce3b-ff6e-819e-ac19-87136425decb"
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
