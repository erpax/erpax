---
name: archival
description: "Use when pinning tenant content to long-term decentralized storage (IPFS, Arweave, Filecoin, R2-glacier) for regulatory long-retention rules — banks 10y, gov 30y, healthcare 50y, archives unlimited — pinning to every listed backend for defense-in-depth and verifying or recovering by receipt."
atomPath: archival
coordinate: "archival · 5/round · c47645b6"
contentUuid: "9ea1f427-bd26-596c-87fa-1546da937c98"
diamondUuid: "e75e3e6b-a662-8518-bfe4-ccb1dce7da64"
uuid: "c47645b6-c30c-8465-9ca9-be805d8b1b1e"
horo: 5
typography:
  partition: archival
  bondDegree: 24
standards:
  - "Arweave Pay-Once-Store-Forever"
  - "Filecoin storage proofs (Spacegap / Spacetime)"
  - "W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid"
  - "W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "875c8414-7676-8604-96f5-1c0921c91690"
  stages:
    - stage: path
      stageUuid: "d3d18419-2856-8d1d-be61-c116e67f2795"
    - stage: trinity
      stageUuid: "9694abff-7df4-8909-912f-c30ad43b4201"
    - stage: boundary
      stageUuid: "f5bb205d-e229-8254-b3fc-d0f0102b6b29"
    - stage: links
      stageUuid: "f0cd27dc-0269-802d-bf19-dbc015f56944"
    - stage: horo
      stageUuid: "59b93379-b6f9-88b1-8076-10317c1171e9"
    - stage: seal
      stageUuid: "6cb5ad34-44ce-8321-aa0d-86c1e70a252c"
    - stage: uuid
      stageUuid: "2426697a-a910-86f9-ba6b-a92e692c5083"
version: 2
---
# archival — long-term decentralized archival (defense-in-depth pinning)

Long-retention pinning for tenants under regulatory rules that outlive in-platform redundancy: pin the same content to EVERY listed backend (IPFS CID v1, Arweave pay-once, Filecoin storage proofs, R2-glacier) so that at least one survives. `pinForRetention` swallows per-backend failures and returns only the receipts that succeeded — the caller checks the length. Each receipt is addressed by the [[content]]-uuid and verified or recovered through its own backend.

Matter-twin: `src/archival/index.ts` — `pinForRetention` · `tenantPins` · `verifyPinning`; types `ArchiveBackendId` · `PinReceipt` · `ArchiveBackend`. Keys every pin by the [[integrity]] content-[[uuid]]; the long-horizon partner of in-platform [[archive]] [[retention]].

**Law — [[law]]: long-retention content is pinned to every backend for defense-in-depth — at least one must succeed, and a receipt verifies or recovers only through the backend that produced it.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid`

Composes: [[storage]] · [[tenant]].
