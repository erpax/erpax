---
name: archival
description: "Use when pinning tenant content to long-term decentralized storage (IPFS, Arweave, Filecoin, R2-glacier) for regulatory long-retention rules — banks 10y, gov 30y, healthcare 50y, archives unlimited — pinning to every listed backend for defense-in-depth and verifying or recovering by receipt."
atomPath: archival
coordinate: "archival · 4/weave · d2938924"
contentUuid: "42020795-ceab-5d8d-ac77-9ae2ab38b05d"
diamondUuid: "abb17386-3f20-870e-97f7-6d321257c300"
uuid: "d2938924-964e-84a1-81fc-fda0ecdfba92"
horo: 4
typography:
  partition: archival
  bondDegree: 21
standards:
  - "Arweave Pay-Once-Store-Forever"
  - "Filecoin storage proofs (Spacegap / Spacetime)"
  - "W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid"
  - "W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "d1f6ef51-c7ec-8a95-a35b-d7fc01f050a7"
  stages:
    - stage: path
      stageUuid: "d3d18419-2856-8d1d-be61-c116e67f2795"
    - stage: trinity
      stageUuid: "9694abff-7df4-8909-912f-c30ad43b4201"
    - stage: boundary
      stageUuid: "f5bb205d-e229-8254-b3fc-d0f0102b6b29"
    - stage: links
      stageUuid: "a2abcb57-a970-8b6b-8516-8c3fd688d973"
    - stage: horo
      stageUuid: "2c9121af-1c3f-8e40-80d6-57bb057be2f5"
    - stage: seal
      stageUuid: "6cb5ad34-44ce-8321-aa0d-86c1e70a252c"
    - stage: uuid
      stageUuid: "a060edbc-02e0-8cfc-a660-7a70da887fb5"
version: 2
---
# archival — long-term decentralized archival (defense-in-depth pinning)

Long-retention pinning for tenants under regulatory rules that outlive in-platform redundancy: pin the same content to EVERY listed backend (IPFS CID v1, Arweave pay-once, Filecoin storage proofs, R2-glacier) so that at least one survives. `pinForRetention` swallows per-backend failures and returns only the receipts that succeeded — the caller checks the length. Each receipt is addressed by the [[content]]-uuid and verified or recovered through its own backend.

Matter-twin: `src/archival/index.ts` — `pinForRetention` · `tenantPins` · `verifyPinning`; types `ArchiveBackendId` · `PinReceipt` · `ArchiveBackend`. Keys every pin by the [[integrity]] content-[[uuid]]; the long-horizon partner of in-platform [[archive]] retention.

**Law — [[law]]: long-retention content is pinned to every backend for defense-in-depth — at least one must succeed, and a receipt verifies or recovers only through the backend that produced it.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid`

Composes: [[storage]] · [[tenant]].
