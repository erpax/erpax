---
name: report
description: "Use when a document (balance sheet, SAF-T, VAT return, audit file) must be produced — a report is a standards×format×data superposition collapsed on request, computed not hand-templated, and legislation floors it stricter than any standard."
atomPath: report
coordinate: "report · 8/crest · 6d7a13d5"
contentUuid: "231cf749-4a3f-5be6-9fc0-240b892cc981"
diamondUuid: "1b6baa85-1213-8763-b836-9e0866b92c66"
uuid: "6d7a13d5-caa5-8ba7-949b-10cd895bcd9a"
horo: 8
typography:
  partition: report
  bondDegree: 18
standards:
  - "BG Наредба Н-18"
  - "BG Наредба Н-18 §СУПТО"
  - "BG Наредба Н-18 §СУПТО — the SAF-T export is a mandated document format"
  - GAAP
  - IFRS
  - "IFRS-1"
  - "IFRS-15"
  - "IFRS-7"
  - "IFRS-9"
  - "IFRS-Taxonomy — a financial statement is a projection over the ledger, not stored"
  - "ISO-19011"
  - "Naredba-N-18"
  - "SAF-T"
  - "SOX:2002 §302"
  - "US-GAAP"
  - ЗДДС
  - СУПТО
bindings: []
signatures:
  computationUuid: "ee7fbfbd-a699-862c-9d40-f4aa63a41b3a"
  stages:
    - stage: path
      stageUuid: "f9222e81-bcee-896b-8db2-b6c29cbc5138"
    - stage: trinity
      stageUuid: "54865574-6d46-8b87-90a0-8f60690ed347"
    - stage: boundary
      stageUuid: "c35c7278-42f5-81a0-b896-3e2df4b46acf"
    - stage: links
      stageUuid: "39a22e73-b812-837c-9897-3751f5885a6d"
    - stage: horo
      stageUuid: "0ebe179e-4a19-8239-bdfc-bbf7f2705780"
    - stage: seal
      stageUuid: "6db5432b-6b25-8f6e-9602-a8aa5c89e4ff"
    - stage: uuid
      stageUuid: "a3441dfc-a432-8a72-9fc4-7ace7713442e"
version: 2
---
# report — the document is a superposition collapsed on request, never a hand-written template

Once collections · references · hooks · inputs · automation · access have **no gap**, the last frontier is the **document**. And a document is not a template you write once per (standard × format) — the magnitude forbids it:

| | count (2026-07-24) |
| --- | ---: |
| distinct `@standard` ids | 381 |
| atoms | 948 |
| **pairwise standard interactions** (S²) | **145,161** |
| triple interactions (S³) | 55,306,341 |
| full superposition (standards × collections × 4 ops × 14 readers) | **20,226,528** |

At one hand-written report template per hour, the **pairwise** surface alone is **~70 person-years**. It is impossible to enumerate and trivial to **compute**: the mesh already knows which collections a format's standards govern ([[mesh]] `standardApiCross`), which endpoints serve them, and the legal floor the requester must clear ([[access]]/standard). **The document IS the collapse** — `collapseReport(mesh, request)` yields the spec deterministically, at zero tokens.

## Legislation floors it stricter than any standard

The standards are strict; **legislation is stricter**. A balance sheet answers to IFRS; a SAF-T export answers to **BG Наредба Н-18** — national law, which is why `saf-t`, `vat-return` and `audit-file` require the **top** `auditor-grade` tier, above every international standard. This is not a special case bolted on: [[access]]/standard already ranks `Наредба · СУПТО · ЗДДС` at `auditor-grade` (the maximum), so when a standard and a statute both bind a document, **the statute wins by construction** — the floor is the MAX across the citations, and legislation sits at the ceiling of that order.

## Computed at no token cost

A collapse is a mesh query, not a generation. The etrima 20-year factory history — **29.7M rows, 1.1GB in the largest table** — aggregates locally at **~5.2M rows/s**, the whole history in **~6 seconds, no LLM in the loop**. The report SPEC is deterministic at query time; the rendered bytes are that local scan. Analysis of two decades of real ERP data costs **zero tokens** — it is Postgres on localhost, and that is the point of computing rather than prompting.

**Honest boundary.** `collapseReport` proves a document is **buildable** — every atom its format needs is a standing collection — and names the **missing** atoms when it is not (the projection gap: some statutory report builders are not yet atoms). It builds the SPEC (collections · endpoints · legal floor · access), never asserts the rendered document is **correct** — that is the data scan's job. And `FORMAT_LAW` is **declared**, arguable in the open (the [[rules]]/audience split): no theorem says a balance sheet answers to IFRS-1; it is written once so an auditor can contest it.

**Law — [[law]]: a document is a superposition of its standards, its data and its reader, collapsed on request — never a template hand-written per interaction. Legislation floors the collapse stricter than any standard, and the collapse refuses rather than fabricate over a gap.**

## Standards

- **IFRS Taxonomy** — a financial statement is a projection over the ledger, never stored.
- **BG Наредба Н-18 §СУПТО** — the SAF-T export is a mandated, inspectable document format.
- **ISO-19011:2018 §6.4** — a report is read by the reader who signs it.

Composes: [[mesh]] · [[access]]/standard · [[rules]]/audience · [[law]].
