---
name: periods
description: "Use when managing the tax-period workflow per jurisdiction — aligning tax filing deadlines with fiscal periods, documenting transfer-pricing adjustment counts, tracking readiness (pending-closing → adjustment-posted → tax-closed), and maintaining a tamper-proof audit chain for tax-authority compliance. The per-jurisdiction tax-period workflow node."
atomPath: fiscal/periods/tax/periods
coordinate: fiscal/periods/tax/periods · 5/round · 36c65d7d
contentUuid: "2dd9dbb9-513f-5a19-b6a1-1e24f3a7a016"
diamondUuid: "54a0e57e-b1c7-81a5-a230-b99bf37a89ac"
uuid: "36c65d7d-6be8-881d-983e-c353a84a9526"
horo: 5
bonds:
  in:
    - accounting
    - accrual
    - adjustments
    - events
    - law
    - periods
    - quota
    - rest
    - share
    - shares
    - snapshots
    - tax
  out:
    - accounting
    - accrual
    - adjustments
    - events
    - law
    - periods
    - quota
    - rest
    - share
    - shares
    - snapshots
typography:
  partition: fiscal
  bondDegree: 0
  neighbors: []
standards:
  - "ISO-8601-1:2019 period-dates"
  - "OECD tax-period-coding"
  - "OECD-Transfer-Pricing"
  - "SAF-T"
  - "SAF-T OECD reporting-period"
bindings: []
neighbors:
  wikilink:
    - law
    - periods
  matrix:
    - accounting
    - accrual
    - adjustments
    - events
    - law
    - periods
    - quota
    - rest
    - share
    - shares
    - snapshots
  backlinks:
    - accounting
    - accrual
    - adjustments
    - events
    - law
    - periods
    - quota
    - rest
    - share
    - shares
    - snapshots
signatures:
  computationUuid: "af419147-1ef4-8167-b2a5-973bddeff355"
  stages:
    - stage: path
      stageUuid: "1f065327-e346-86c8-838a-83be125eb5fc"
    - stage: trinity
      stageUuid: "5c4f97cb-b2eb-84ce-becd-0adb903b2e54"
    - stage: boundary
      stageUuid: "979e678b-62b5-80a2-8d02-1e48064c3704"
    - stage: links
      stageUuid: "40693600-f29d-86b6-a592-683b1d030126"
    - stage: horo
      stageUuid: "0b69b9c9-451a-8b27-9c07-e55748bc7e04"
    - stage: seal
      stageUuid: "89401540-14bb-85b7-88eb-2f7ebb7d3a7f"
    - stage: uuid
      stageUuid: "3c773636-8f1a-8f81-85b0-46a14c09c790"
version: 2
---
# tax-periods

TaxPeriods Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- OECD tax-period-coding
- SAF-T OECD reporting-period
- ISO-8601-1:2019 period-dates

**Law — [[law]]: a tax period is per-jurisdiction and advances pending-closing → adjustment-posted → tax-closed, aligned to the underlying [[fiscal/periods]] — transfer-pricing adjustments are counted and the transitions are kept as a tamper-proof chain for the tax authority, never reordered freely.**
