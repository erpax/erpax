---
name: actions
description: "Use when recording formal board-level decisions for a legal entity — resolutions, policy approvals, risk assessments, control enhancements, attestations, vote tallies, and related internal controls. The SOX §404 corporate-governance board-action register."
atomPath: "legal/entities/board/actions"
coordinate: "legal/entities/board/actions · 7/descent · 28e02d4a"
contentUuid: "2d840f90-a7f5-596f-ac3d-03bbeee46650"
diamondUuid: "648df8b0-8ef8-8b64-9729-9af721f67c88"
uuid: "28e02d4a-6e83-8655-a46a-6ec07f1afcce"
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
  computationUuid: "e932a7de-5653-849a-b0ad-e80ff022a659"
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
      stageUuid: "e0a0955b-55ab-8c47-b29d-5f4d9ed11bf4"
    - stage: seal
      stageUuid: "3442bb75-3d8a-8bfd-8904-9df7c353f8c7"
    - stage: uuid
      stageUuid: "4f38a863-ebe5-8528-b8c8-352e11227700"
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
