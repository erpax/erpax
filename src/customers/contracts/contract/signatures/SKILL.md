---
name: signatures
description: "Use when collecting or auditing e-signatures for contract execution — sequenced multi-party approval (legal→customer→company rep), eIDAS-compliant immutable signature records, provider verification URL, and fully-executed trigger for IFRS-15 §10 contract activation. The e-signature audit-trail collection."
atomPath: customers/contracts/contract/signatures
coordinate: customers/contracts/contract/signatures · 2/share · c370de75
contentUuid: "1a702011-33f2-52b3-a432-1e6dfbbdd889"
diamondUuid: "93cfbad7-a0a6-85b9-8146-e83a4474349a"
uuid: "c370de75-cd3c-82ed-9083-126ea94f20aa"
horo: 2
bonds:
  in:
    - contract
    - contracts
    - identity
    - law
    - proof
    - signature
    - standard
    - transaction
  out:
    - contracts
    - identity
    - law
    - proof
    - signature
    - standard
    - transaction
typography:
  partition: customers
  bondDegree: 21
  neighbors: []
standards:
  - "ASC-606"
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IFRS IFRS-15 §10 contract-with-customer"
  - "IFRS IFRS-15 §23 contract-identification"
  - "IFRS-15"
  - "ISO-19011:2018 audit-trail e-signature-evidence"
  - "ISO-8601-1:2019 date-time signature-timestamp"
  - SOX
  - "SOX §302 management-certification audit-trail"
  - "US-GAAP"
  - "US-GAAP ASC-606-10-25-1 contract-existence"
  - eIDAS
  - "eIDAS Regulation (EU) 2014/910 electronic-signature"
bindings: []
neighbors:
  wikilink:
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - contracts
    - identity
    - law
    - proof
    - signature
    - standard
    - transaction
  backlinks:
    - contracts
    - identity
    - law
    - proof
    - signature
    - standard
    - transaction
signatures:
  computationUuid: "a95a924f-d719-8ccc-a515-33897e357863"
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
      stageUuid: "f2e2a4fe-747f-88eb-8637-9e7b70a7bb93"
    - stage: seal
      stageUuid: "573ccec1-dc40-85e4-94b4-2f077c905a57"
    - stage: uuid
      stageUuid: "bf12181b-fcdd-84e7-8f93-9cb9dfd93b23"
version: 2
---
# contract-signatures

Contract Signatures — e-signature status & approval workflow audit trail.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
