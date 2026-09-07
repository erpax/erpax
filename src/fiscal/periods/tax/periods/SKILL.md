---
name: periods
description: "Use when managing the tax-period workflow per jurisdiction — aligning tax filing deadlines with fiscal periods, documenting transfer-pricing adjustment counts, tracking readiness (pending-closing → adjustment-posted → tax-closed), and maintaining a tamper-proof audit chain for tax-authority compliance. The per-jurisdiction tax-period workflow node."
atomPath: "fiscal/periods/tax/periods"
coordinate: "fiscal/periods/tax/periods · 7/descent · 4863eb5d"
contentUuid: "3f7aaf77-8a6d-5480-984c-78baa4bcfd99"
diamondUuid: "1d969e50-4539-88ea-b6d7-560cc1655f35"
uuid: "4863eb5d-d3cb-852f-b361-9bf7153e31ff"
horo: 7
typography:
  partition: fiscal
  bondDegree: 39
standards:
  - "ISO-8601-1:2019 period-dates"
  - "ISO-8601-1:2019 period-dates`"
  - "OECD tax-period-coding"
  - "OECD-Transfer-Pricing"
  - "SAF-T"
  - "SAF-T OECD reporting-period"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "62be0c96-be35-86b9-b184-b0bce77d1869"
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
      stageUuid: "14147b67-c178-8767-85ed-cf75d6292d3d"
    - stage: seal
      stageUuid: "89401540-14bb-85b7-88eb-2f7ebb7d3a7f"
    - stage: uuid
      stageUuid: "dbf07d7a-a6dd-8661-9acf-560e09910c4b"
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
