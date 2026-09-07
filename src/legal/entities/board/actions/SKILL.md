---
name: actions
description: "Use when recording formal board-level decisions for a legal entity — resolutions, policy approvals, risk assessments, control enhancements, attestations, vote tallies, and related internal controls. The SOX §404 corporate-governance board-action register."
atomPath: "legal/entities/board/actions"
coordinate: "legal/entities/board/actions · 7/descent · f9df28c7"
contentUuid: "dcc6246d-696a-5314-a9e3-a6b54afcd1e5"
diamondUuid: "84ce9856-3017-8d1f-a412-b0ead224d6bd"
uuid: "f9df28c7-376f-8723-92b9-b1f38a0c6bd3"
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
  computationUuid: "f0bde698-7feb-84a9-8b90-9907841520bd"
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
      stageUuid: "3c57c537-aae1-85ca-9d42-175e62288d61"
    - stage: seal
      stageUuid: "3442bb75-3d8a-8bfd-8904-9df7c353f8c7"
    - stage: uuid
      stageUuid: "711b98b9-5f15-8dba-9f13-1aab3b9c6204"
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
