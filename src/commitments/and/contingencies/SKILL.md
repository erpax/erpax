---
name: contingencies
description: "Use when disclosing off-balance-sheet obligations in financial statement notes — capex commitments, purchase obligations, litigation, guarantees, performance bonds, tax disputes, insurance recoveries — with IAS-37 likelihood ladder and reclassification-to-provision workflow; IAS-37 §86-92 / ASC-440 / ASC-450 disclosure. The structured notes-disclosure register distinct from recognised provisions."
atomPath: "commitments/and/contingencies"
coordinate: "commitments/and/contingencies · 2/share · fe0fede4"
contentUuid: "16f52750-46ee-519f-83e9-7cd6dbb4485f"
diamondUuid: "82a4ee40-2c77-80df-8338-b46c07464014"
uuid: "fe0fede4-3fec-87a1-9b1e-e4fb231ec007"
horo: 2
typography:
  partition: commitments
  bondDegree: 31
standards:
  - "IFRS IAS-1 §112(c) other-disclosures"
  - "IFRS IAS-37 §10 contingent-liability-definition"
  - "IFRS IAS-37 §27-30 recognition-prohibition"
  - "IFRS IAS-37 §86-92 disclosure-requirements"
  - "IFRS IFRS-15 §B50 onerous-contract-disclosure"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls disclosure-completeness"
  - "US-GAAP ASC-440 commitments"
  - "US-GAAP ASC-450-20-50 loss-contingency-disclosure"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "5a9a0f93-9e1a-88ff-b6cb-56bdce3c3857"
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
      stageUuid: "84ab00ad-6a92-8eb1-8f1b-385f10e2e4e7"
    - stage: seal
      stageUuid: "3b9143ef-9e29-8e1d-94c5-ab71081921c7"
    - stage: uuid
      stageUuid: "bcf37bcc-11eb-8aa2-a4aa-9f11e4330aa7"
version: 2
---
# commitments-and-contingencies

Commitments & Contingencies — IAS-37 §27-92 + IFRS-15 §B50 mandatory.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`

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
