---
name: actions
description: "Use when recording formal board-level decisions for a legal entity — resolutions, policy approvals, risk assessments, control enhancements, attestations, vote tallies, and related internal controls. The SOX §404 corporate-governance board-action register."
atomPath: "legal/entities/board/actions"
coordinate: "legal/entities/board/actions · 7/descent · dbad62ee"
contentUuid: "4f538521-48c2-5407-b67b-53de1778af5e"
diamondUuid: "3ae4bae0-7ac0-8f4a-9619-a984e997ed73"
uuid: "dbad62ee-5a12-8a4c-b402-831d3f88f7f8"
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
  computationUuid: "b80294c8-70f2-83b6-8493-fcf15bf11c69"
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
      stageUuid: "e777375b-921d-86c2-a686-a19a00717a4c"
    - stage: seal
      stageUuid: "3442bb75-3d8a-8bfd-8904-9df7c353f8c7"
    - stage: uuid
      stageUuid: "b668acd9-e825-8116-86c5-6db514523d04"
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
