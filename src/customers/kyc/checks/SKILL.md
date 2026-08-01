---
name: checks
description: "Use when performing AML / CDD screening on a customer, vendor, beneficial owner, or signatory — SDD/CDD/EDD level, identity documents, sanctions screening (OFAC/EU/UN), PEP check, risk rating, and FATF Recommendation 10 audit evidence. The AML customer-due-diligence collection."
atomPath: "customers/kyc/checks"
coordinate: "customers/kyc/checks · 1/base · 212e8848"
contentUuid: "00d0c39e-2693-5bea-b889-6320f3b6310e"
diamondUuid: "5501f691-9326-8dd0-a5df-e2204c13d27a"
uuid: "212e8848-56ba-8144-9ed3-aa8073380d91"
horo: 1
typography:
  partition: customers
  bondDegree: 15
standards:
  - "EU-AMLD-6 Directive-2018/1673 anti-money-laundering"
  - "EU-Regulation-2015/847 wire-transfers"
  - "FATF-Recommendation-10 customer-due-diligence"
  - "ISO/IEC-19794 biometric-data-interchange-formats"
  - "ISO/IEC-19794 biometric-data-interchange-formats`"
  - "USA-PATRIOT-Act §326 customer-identification-program"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "85fbf4ba-35a9-8d0a-8d59-5b409210ecf9"
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
      stageUuid: "b59d211a-810b-82ac-9743-60511d0cf929"
    - stage: seal
      stageUuid: "b7b5f3cc-402a-8e30-9f2a-638b3d56a416"
    - stage: uuid
      stageUuid: "1d82f60e-1013-884d-9042-1c76783814b2"
version: 2
---
# kyc-checks

KYC Checks — AML / Customer Due Diligence record per customer / vendor.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC-19794 biometric-data-interchange-formats`

- ISO/IEC-19794 biometric-data-interchange-formats
- FATF-Recommendation-10 customer-due-diligence
- EU-AMLD-6 Directive-2018/1673 anti-money-laundering
- USA-PATRIOT-Act §326 customer-identification-program
- EU-Regulation-2015/847 wire-transfers
- ISO-19011:2018 audit-trail kyc-evidence
- ISO-27001 A.5.34 privacy-and-pii

Composes: [[identity]] · [[party]] · [[standard]] · [[proof]].

**Law — [[law]]: due-diligence depth (SDD/CDD/EDD) must match the assessed risk rating, and no party clears until sanctions and PEP screening leave an auditable evidence trail.**
