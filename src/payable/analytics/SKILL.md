---
name: analytics
description: "Use when reasoning about analytics — Days Payable Outstanding, vendor performance and spend analysis over the bill set."
atomPath: "payable/analytics"
coordinate: "payable/analytics · 4/weave · 5ac824ac"
contentUuid: "959498ed-1086-5a6d-9450-ed00a9282a6b"
diamondUuid: "33b438f4-46a3-8525-859e-79ceba960e99"
uuid: "5ac824ac-c5bf-8d73-99f3-bba0e330e177"
horo: 4
typography:
  partition: payable
  bondDegree: 92
standards:
  - "IFRS IAS-37 provisions-contingent-liabilities"
  - "ISO-17442-1:2020 lei vendor-identification"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "US-GAAP ASC-405 liabilities"
bindings: []
signatures:
  computationUuid: "e15440da-38e1-824e-a25f-1acaf1aade14"
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
      stageUuid: "3f741ff7-9685-812d-bc58-00e10ff054b4"
    - stage: seal
      stageUuid: "904f4294-2a67-845a-ad77-54b69ee554f7"
    - stage: uuid
      stageUuid: "f90164b3-0afa-8058-ada2-e50744cc4de7"
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
