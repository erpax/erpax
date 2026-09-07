---
name: analytics
description: "Use when reasoning about analytics — Days Payable Outstanding, vendor performance and spend analysis over the bill set."
atomPath: "payable/analytics"
coordinate: "payable/analytics · 7/descent · 47c3e995"
contentUuid: "6231003c-07e4-563a-9055-50882a3a17e1"
diamondUuid: "db09cc75-db7b-8a6d-bcdf-2b2313d3d373"
uuid: "47c3e995-984b-82ca-9cd9-181bdb97de19"
horo: 7
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
  computationUuid: "acc0e751-29a2-8365-a278-cce81c557081"
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
      stageUuid: "620fa0af-70ae-8d9b-b3cc-b6d78745260c"
    - stage: seal
      stageUuid: "904f4294-2a67-845a-ad77-54b69ee554f7"
    - stage: uuid
      stageUuid: "48d5a30c-4a0e-8644-b1ac-5f1fe460cfec"
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
