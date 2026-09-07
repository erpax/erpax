---
name: actions
description: "Use when recording formal board-level decisions for a legal entity — resolutions, policy approvals, risk assessments, control enhancements, attestations, vote tallies, and related internal controls. The SOX §404 corporate-governance board-action register."
atomPath: "legal/entities/board/actions"
coordinate: "legal/entities/board/actions · 7/descent · b40ebcbc"
contentUuid: "c8926b20-404b-5094-943c-03a1a152e0c1"
diamondUuid: "d230da39-ed1b-80f2-a074-abb25d5b5606"
uuid: "b40ebcbc-c141-8e83-b4d9-efc3f69c9436"
horo: 7
typography:
  partition: legal
  bondDegree: 4
standards:
  - "ISO-37000"
  - "ISO-37000:2021 governance-of-organizations"
  - "ISO-37000:2021 governance-of-organizations`"
  - "OECD G20 principles-of-corporate-governance"
  - SOX §404 governance
  - "US-CTA-2021"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "607f612d-c26e-8448-8d3d-a24bbd351cb9"
  stages:
    - stage: path
      stageUuid: "426ec008-e521-82bc-b81b-202852ba3a15"
    - stage: trinity
      stageUuid: "ca3eb9ac-29d5-891b-82fd-4d3994297fd2"
    - stage: boundary
      stageUuid: "ffbefe58-c7ef-8306-8e73-33b81d91130f"
    - stage: links
      stageUuid: "e18fa1eb-43fe-82c5-869a-8cfbb67ba6a4"
    - stage: horo
      stageUuid: "ed50309c-c8b9-8f5b-8c51-437181dd283a"
    - stage: seal
      stageUuid: "3442bb75-3d8a-8bfd-8904-9df7c353f8c7"
    - stage: uuid
      stageUuid: "51b2cdd7-5bd4-8b30-867a-0f7cdc5796d9"
version: 2
---
# board-actions

BoardActions.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-37000:2021 governance-of-organizations`

- OECD G20 principles-of-corporate-governance
- SOX §404 governance
- ISO-37000:2021 governance-of-organizations
- ISO-27001 A.5.23 cloud-service-tenant-isolation
