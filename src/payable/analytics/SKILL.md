---
name: analytics
description: "Use when reasoning about analytics — Days Payable Outstanding, vendor performance and spend analysis over the bill set."
atomPath: "payable/analytics"
coordinate: "payable/analytics · 2/share · c584dc64"
contentUuid: "2654acdc-0bf0-5fd3-8608-17b2a0268529"
diamondUuid: "373852bc-1ac9-82e0-8a8b-2a3a1d5f5e4a"
uuid: "c584dc64-cbf4-8e05-9f70-f4d40e970e36"
horo: 2
typography:
  partition: payable
  bondDegree: 92
standards:
  - "IFRS IAS-37 provisions-contingent-liabilities"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei vendor-identification"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "US-GAAP ASC-405 liabilities"
bindings: []
signatures:
  computationUuid: "f04c8e4a-7ac8-8e25-82bb-c2168c5a7956"
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
      stageUuid: "837a3391-fd72-8711-902e-7c13117a6778"
    - stage: seal
      stageUuid: "904f4294-2a67-845a-ad77-54b69ee554f7"
    - stage: uuid
      stageUuid: "da57ff88-68d0-87c3-b790-b9bf9ce401b3"
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
