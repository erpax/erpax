---
name: contingencies
description: "Use when disclosing off-balance-sheet obligations in financial statement notes — capex commitments, purchase obligations, litigation, guarantees, performance bonds, tax disputes, insurance recoveries — with IAS-37 likelihood ladder and reclassification-to-provision workflow; IAS-37 §86-92 / ASC-440 / ASC-450 disclosure. The structured notes-disclosure register distinct from recognised provisions."
atomPath: commitments/and/contingencies
coordinate: commitments/and/contingencies · 7/descent · a0765a06
contentUuid: "26145d90-2995-58ef-97fd-459a9ed3f654"
diamondUuid: "05cc0740-23f7-834c-915c-44db0349792d"
uuid: "a0765a06-cfcc-8e03-9a22-cf685f918079"
horo: 7
bonds:
  in:
    - accounting
    - contingency
    - escrow
    - identity
    - law
    - proof
    - provision
    - provisions
    - standard
    - transaction
  out:
    - accounting
    - contingency
    - escrow
    - identity
    - law
    - proof
    - provision
    - provisions
    - standard
    - transaction
typography:
  partition: commitments
  bondDegree: 31
  neighbors: []
standards:
  - "IFRS IAS-1 §112(c) other-disclosures"
  - "IFRS IAS-37 §10 contingent-liability-definition"
  - "IFRS IAS-37 §27-30 recognition-prohibition"
  - "IFRS IAS-37 §86-92 disclosure-requirements"
  - "IFRS IFRS-15 §B50 onerous-contract-disclosure"
  - "ISO-19011:2018 audit-trail off-balance-sheet"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls disclosure-completeness"
  - "US-GAAP ASC-440 commitments"
  - "US-GAAP ASC-450-20-50 loss-contingency-disclosure"
bindings: []
neighbors:
  wikilink:
    - accounting
    - identity
    - law
    - proof
    - provisions
    - standard
    - transaction
  matrix:
    - accounting
    - contingency
    - escrow
    - identity
    - law
    - proof
    - provision
    - provisions
    - standard
    - transaction
  backlinks:
    - accounting
    - contingency
    - escrow
    - identity
    - law
    - proof
    - provision
    - provisions
    - standard
    - transaction
signatures:
  computationUuid: "b0d75666-039b-873f-a5a9-1a6b85e85858"
  stages:
    - stage: path
      stageUuid: "364be235-3d55-8a1a-8ce7-0d0931e13720"
    - stage: trinity
      stageUuid: "0713e8e0-586d-899e-b674-abe9eb0e5954"
    - stage: boundary
      stageUuid: "23da31db-04c9-8985-9729-aeb0b483504a"
    - stage: links
      stageUuid: "74b1942d-bbb2-8903-bce4-1e014af4329b"
    - stage: horo
      stageUuid: "68f45537-8dcf-88fb-984e-e0ab06837571"
    - stage: seal
      stageUuid: "3b9143ef-9e29-8e1d-94c5-ab71081921c7"
    - stage: uuid
      stageUuid: "84bcd790-5a94-880b-a3e3-8fdcaa49274d"
version: 2
---
# commitments-and-contingencies

Commitments & Contingencies — IAS-37 §27-92 + IFRS-15 §B50 mandatory.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IAS-37 §10 contingent-liability-definition
- IFRS IAS-37 §27-30 recognition-prohibition
- IFRS IAS-37 §86-92 disclosure-requirements
- IFRS IAS-1 §112(c) other-disclosures
- IFRS IFRS-15 §B50 onerous-contract-disclosure
- US-GAAP ASC-440 commitments
- US-GAAP ASC-450-20-50 loss-contingency-disclosure
- ISO-19011:2018 audit-trail off-balance-sheet
- SOX §404 internal-controls disclosure-completeness
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Provisions]] · [[accounting]] · [[transaction]] · [[proof]] · [[standard]] · [[identity]].

**Law — [[law]]: an off-balance-sheet obligation is disclosed in the notes under the IAS-37 likelihood ladder but recognition is prohibited until it crosses the probable+measurable threshold — at which point it reclassifies to a recognised provision, never the reverse silently.**
