---
name: periods
description: "Use when managing the tax-period workflow per jurisdiction — aligning tax filing deadlines with fiscal periods, documenting transfer-pricing adjustment counts, tracking readiness (pending-closing → adjustment-posted → tax-closed), and maintaining a tamper-proof audit chain for tax-authority compliance. The per-jurisdiction tax-period workflow node."
atomPath: "fiscal/periods/tax/periods"
coordinate: "fiscal/periods/tax/periods · 1/base · 80b08dd2"
contentUuid: "a69a80ca-b202-568f-8dbb-e0b5b705cf39"
diamondUuid: "e678e6e3-5581-8c4b-a4ea-89d61a7af7fa"
uuid: "80b08dd2-1c6c-88f6-a2fe-42da4f356ccb"
horo: 1
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
  computationUuid: "de152c1f-9e62-8cac-bb9a-fb796f2dad4a"
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
      stageUuid: "2c7b5528-91d1-80a5-801f-d970f862567b"
    - stage: seal
      stageUuid: "89401540-14bb-85b7-88eb-2f7ebb7d3a7f"
    - stage: uuid
      stageUuid: "a82ce066-8e6b-8ab9-8fa7-7a4e09ea7d51"
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
