---
name: actions
description: "Use when recording formal board-level decisions for a legal entity — resolutions, policy approvals, risk assessments, control enhancements, attestations, vote tallies, and related internal controls. The SOX §404 corporate-governance board-action register."
atomPath: "legal/entities/board/actions"
coordinate: "legal/entities/board/actions · 2/share · 69b4eb52"
contentUuid: "dbabf9bd-5a3f-5e17-88b9-c56013d4deaa"
diamondUuid: "7cdeb222-65ff-89ab-ae32-36c036106bd1"
uuid: "69b4eb52-d9cb-86aa-b125-179e1d152fe5"
horo: 2
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
  computationUuid: "5d51ad2e-6df7-8973-94f0-47a07f01ce44"
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
      stageUuid: "14671676-8a16-83ac-bada-8a74450a8809"
    - stage: seal
      stageUuid: "3442bb75-3d8a-8bfd-8904-9df7c353f8c7"
    - stage: uuid
      stageUuid: "57647558-02e0-87f2-b19b-b636a7bf8645"
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
