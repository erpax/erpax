---
name: actions
description: "Use when recording formal board-level decisions for a legal entity — resolutions, policy approvals, risk assessments, control enhancements, attestations, vote tallies, and related internal controls. The SOX §404 corporate-governance board-action register."
atomPath: legal/entities/board/actions
coordinate: legal/entities/board/actions · 2/share · 9ab09748
contentUuid: "91257312-4744-567a-8942-bbaa991356d1"
diamondUuid: "1fe5ea85-e124-8f4b-be7e-5341f1adb667"
uuid: "9ab09748-0aaf-85c2-8ae0-061156bc2a11"
horo: 2
bonds:
  in:
    - minutes
  out:
    - minutes
typography:
  partition: legal
  bondDegree: 3
  neighbors: []
standards:
  - "ISO-37000"
  - "ISO-37000:2021 governance-of-organizations"
  - "OECD G20 principles-of-corporate-governance"
  - SOX §404 governance
  - "US-CTA-2021"
bindings: []
neighbors:
  wikilink: []
  matrix:
    - minutes
  backlinks:
    - minutes
signatures:
  computationUuid: "54e2bd23-d138-8314-b2b7-5dbf2c588139"
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
      stageUuid: "8b923f71-fcbf-8c61-9cb6-11bc9edf6bf5"
    - stage: seal
      stageUuid: "3442bb75-3d8a-8bfd-8904-9df7c353f8c7"
    - stage: uuid
      stageUuid: "b4829fad-41ba-8ba8-845f-c2adcd230bd8"
version: 2
---
# board-actions

BoardActions.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- OECD G20 principles-of-corporate-governance
- SOX §404 governance
- ISO-37000:2021 governance-of-organizations
- ISO-27001 A.5.23 cloud-service-tenant-isolation
