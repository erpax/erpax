---
name: periods
description: "Use when managing the tax-period workflow per jurisdiction — aligning tax filing deadlines with fiscal periods, documenting transfer-pricing adjustment counts, tracking readiness (pending-closing → adjustment-posted → tax-closed), and maintaining a tamper-proof audit chain for tax-authority compliance. The per-jurisdiction tax-period workflow node."
atomPath: "fiscal/periods/tax/periods"
coordinate: "fiscal/periods/tax/periods · 8/crest · c680d425"
contentUuid: "d7a67462-4579-5b23-9bd9-9e5e776e6c68"
diamondUuid: "f2eae909-29b6-8300-a374-1f1400b8c833"
uuid: "c680d425-6e54-8cc9-b4f9-03bced626c08"
horo: 8
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
  computationUuid: "83e2ea6d-ae52-8dcd-ad80-9ce17f1180fd"
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
      stageUuid: "12f2c0f5-e5e2-8a73-b021-f9366c59943e"
    - stage: seal
      stageUuid: "89401540-14bb-85b7-88eb-2f7ebb7d3a7f"
    - stage: uuid
      stageUuid: "4cc16815-5064-855b-b59a-4950abbb5029"
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
