---
name: periods
description: "Use when managing the tax-period workflow per jurisdiction — aligning tax filing deadlines with fiscal periods, documenting transfer-pricing adjustment counts, tracking readiness (pending-closing → adjustment-posted → tax-closed), and maintaining a tamper-proof audit chain for tax-authority compliance. The per-jurisdiction tax-period workflow node."
atomPath: "fiscal/periods/tax/periods"
coordinate: "fiscal/periods/tax/periods · 4/weave · 0b1defaa"
contentUuid: "2efb372e-04ef-5a1b-a5bb-de60ac1d8222"
diamondUuid: "7ab9d431-5c15-8811-ad7a-5c0529ef7dd4"
uuid: "0b1defaa-d4f9-88c4-b34b-a7c7fc17b95c"
horo: 4
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
  computationUuid: "537f0ba8-1e8e-847e-ac28-f20001a75450"
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
      stageUuid: "d62cdbc5-d92a-8617-8d35-15b3325cf907"
    - stage: seal
      stageUuid: "89401540-14bb-85b7-88eb-2f7ebb7d3a7f"
    - stage: uuid
      stageUuid: "328dc364-43e5-82a8-8d49-687cd1525cbb"
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
