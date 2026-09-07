---
name: checks
description: "Use when performing AML / CDD screening on a customer, vendor, beneficial owner, or signatory — SDD/CDD/EDD level, identity documents, sanctions screening (OFAC/EU/UN), PEP check, risk rating, and FATF Recommendation 10 audit evidence. The AML customer-due-diligence collection."
atomPath: "customers/kyc/checks"
coordinate: "customers/kyc/checks · 1/base · 8d2109cb"
contentUuid: "8b612ee6-2fce-5194-9b60-f62b3444fef4"
diamondUuid: "40b33958-4e31-87a5-a3b5-c0f0083bfc4a"
uuid: "8d2109cb-f5ea-83fc-8d0f-e12ff2cd3b3e"
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
  computationUuid: "ad8b6fb9-fc94-8510-8a0a-2823b984e415"
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
      stageUuid: "081c79c8-1929-8900-be6b-a9bd6e0f8d11"
    - stage: seal
      stageUuid: "b7b5f3cc-402a-8e30-9f2a-638b3d56a416"
    - stage: uuid
      stageUuid: "0bb27a07-f817-82f1-8f33-9d1ab5b350bc"
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
