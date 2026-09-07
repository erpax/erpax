---
name: analytics
description: "Use when reasoning about analytics — Days Payable Outstanding, vendor performance and spend analysis over the bill set."
atomPath: "payable/analytics"
coordinate: "payable/analytics · 7/descent · e0ec48b8"
contentUuid: "d26f2c79-fcf7-5690-aa9e-d929faad4e81"
diamondUuid: "88c3d096-dba1-8eb3-8d05-fe5ea22cf92e"
uuid: "e0ec48b8-360d-87b8-96a5-2f495b0c405e"
horo: 7
typography:
  partition: payable
  bondDegree: 58
standards:
  - "IFRS IAS-37 provisions-contingent-liabilities"
  - "ISO-17442-1:2020 lei vendor-identification"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "US-GAAP ASC-405 liabilities"
bindings: []
signatures:
  computationUuid: "4b3886ff-696d-8e9a-848f-46e9cc2911b1"
  stages:
    - stage: path
      stageUuid: "f671a977-1537-8908-ab6f-16ef15c4b933"
    - stage: trinity
      stageUuid: "37d5993c-98d9-8219-9fb3-49ee79ae9e3b"
    - stage: boundary
      stageUuid: "41cf3cf6-ac66-8832-ade1-b675352f5fef"
    - stage: links
      stageUuid: "3d03dfb8-9ddf-899c-9754-2be62abcbd2f"
    - stage: horo
      stageUuid: "eba8d936-9e31-8e2d-a783-2b8b1dfb1b4d"
    - stage: seal
      stageUuid: "904f4294-2a67-845a-ad77-54b69ee554f7"
    - stage: uuid
      stageUuid: "2783fd43-7ee6-8e9b-84b4-ec6dcf163154"
version: 2
---
# payable/analytics — vendor performance, DPO and spend

Days Payable Outstanding, vendor performance and spend analysis over the bill set.

DPO is the A/P mirror of DSO ([[receivable]]/analytics): the same shape asked of the other side of
the ledger. Neither is folded into the other, because the denominators differ — purchases versus
revenue — and a shared function would have to take that difference as a parameter anyway.

**Why it is a child atom.** It was `analytics.service.ts` beside the barrel. When [[payable]] gained
the SKILL its code always warranted, that folder became an ATOM — and matter at an atom root is a
stray sibling ([[rules]]): only the trinity lives beside a barrel. Nesting it is the lawful form, and
the parent re-exports it, so no caller changed.

**Honest boundary.** This computes; it does not decide. The inputs — rates, terms, thresholds — are
given by the caller or the tenant, and nothing here validates that they are the right ones.

Composes: [[payable]] · [[law]].

## Standards

- **US-GAAP ASC-405** — liabilities.
