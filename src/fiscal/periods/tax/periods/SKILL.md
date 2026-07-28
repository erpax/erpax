---
name: periods
description: "Use when managing the tax-period workflow per jurisdiction — aligning tax filing deadlines with fiscal periods, documenting transfer-pricing adjustment counts, tracking readiness (pending-closing → adjustment-posted → tax-closed), and maintaining a tamper-proof audit chain for tax-authority compliance. The per-jurisdiction tax-period workflow node."
atomPath: "fiscal/periods/tax/periods"
coordinate: "fiscal/periods/tax/periods · 2/share · f5c660c2"
contentUuid: "a7fd4722-741d-58de-bc96-ee81396c9353"
diamondUuid: "56b6246c-42c2-8bdb-ad3b-dce1cb9b6e36"
uuid: "f5c660c2-f220-8b6a-936f-b2e45cc8ed5e"
horo: 2
bonds:
  in:
    - accounting
    - accrual
    - adjustments
    - events
    - law
    - periods
    - quota
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
    - share
    - shares
    - snapshots
typography:
  partition: fiscal
  bondDegree: 0
  neighbors: []
standards:
  - "ISO-8601-1:2019 period-dates"
  - "ISO-8601-1:2019 period-dates`"
  - "OECD tax-period-coding"
  - "OECD-Transfer-Pricing"
  - "SAF-T"
  - "SAF-T OECD reporting-period"
  - "— the instrument reads SKILL.md) -->"
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
    - share
    - shares
    - snapshots
signatures:
  computationUuid: "ef74f754-9510-83a0-882a-68322c14a036"
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
      stageUuid: "97597466-f22b-833b-8e7a-621495da9b92"
    - stage: seal
      stageUuid: "89401540-14bb-85b7-88eb-2f7ebb7d3a7f"
    - stage: uuid
      stageUuid: "13da3fe7-fbac-864b-8a9e-295ca9b647f4"
version: 2
---
# tax-periods

TaxPeriods Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 period-dates`

- OECD tax-period-coding
- SAF-T OECD reporting-period
- ISO-8601-1:2019 period-dates

**Law — [[law]]: a tax period is per-jurisdiction and advances pending-closing → adjustment-posted → tax-closed, aligned to the underlying [[fiscal/periods]] — transfer-pricing adjustments are counted and the transitions are kept as a tamper-proof chain for the tax authority, never reordered freely.**
