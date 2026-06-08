---
name: checks
description: "Use when performing AML / CDD screening on a customer, vendor, beneficial owner, or signatory — SDD/CDD/EDD level, identity documents, sanctions screening (OFAC/EU/UN), PEP check, risk rating, and FATF Recommendation 10 audit evidence. The AML customer-due-diligence collection."
atomPath: customers/kyc/checks
coordinate: customers/kyc/checks · 5/round · 9afe6471
contentUuid: "42a75fac-03de-579c-a717-1ad823de68d6"
diamondUuid: "800b863b-dceb-8811-9afe-d6f754b0cbab"
uuid: "9afe6471-627f-8fb9-9dc5-863e4c78713c"
horo: 5
bonds:
  in:
    - identity
    - law
    - party
    - proof
    - standard
  out:
    - identity
    - law
    - party
    - proof
    - standard
typography:
  partition: customers
  bondDegree: 15
  neighbors: []
standards:
  - "EU-AMLD-6 Directive-2018/1673 anti-money-laundering"
  - "EU-Regulation-2015/847 wire-transfers"
  - "FATF-Recommendation-10 customer-due-diligence"
  - "ISO-19011:2018 audit-trail kyc-evidence"
  - "ISO/IEC-19794 biometric-data-interchange-formats"
  - "USA-PATRIOT-Act §326 customer-identification-program"
bindings: []
neighbors:
  wikilink:
    - identity
    - law
    - party
    - proof
    - standard
  matrix:
    - identity
    - law
    - party
    - proof
    - standard
  backlinks:
    - identity
    - law
    - party
    - proof
    - standard
signatures:
  computationUuid: "2058dc96-b028-8b1c-9769-9ff466128d26"
  stages:
    - stage: path
      stageUuid: "423de8ab-f987-829c-9d4c-7b985d4e39d0"
    - stage: trinity
      stageUuid: "33ed5b90-a87b-8ba4-a07b-2fc102538967"
    - stage: boundary
      stageUuid: "54091852-5ba8-8420-b906-b9eb2773e5b0"
    - stage: links
      stageUuid: "b8999206-541f-83f6-bd21-98eea84521a5"
    - stage: horo
      stageUuid: "d6f89627-2caa-8e85-8a2a-57141f2fe241"
    - stage: seal
      stageUuid: "b7b5f3cc-402a-8e30-9f2a-638b3d56a416"
    - stage: uuid
      stageUuid: "5bb6796c-15d2-8208-a4e2-748cca787f93"
version: 2
---
# kyc-checks

KYC Checks — AML / Customer Due Diligence record per customer / vendor.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO/IEC-19794 biometric-data-interchange-formats
- FATF-Recommendation-10 customer-due-diligence
- EU-AMLD-6 Directive-2018/1673 anti-money-laundering
- USA-PATRIOT-Act §326 customer-identification-program
- EU-Regulation-2015/847 wire-transfers
- ISO-19011:2018 audit-trail kyc-evidence
- ISO-27001 A.5.34 privacy-and-pii

Composes: [[identity]] · [[party]] · [[standard]] · [[proof]].

**Law — [[law]]: due-diligence depth (SDD/CDD/EDD) must match the assessed risk rating, and no party clears until sanctions and PEP screening leave an auditable evidence trail.**
