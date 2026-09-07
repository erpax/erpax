---
name: archival
description: "Use when pinning tenant content to long-term decentralized storage (IPFS, Arweave, Filecoin, R2-glacier) for regulatory long-retention rules — banks 10y, gov 30y, healthcare 50y, archives unlimited — pinning to every listed backend for defense-in-depth and verifying or recovering by receipt."
atomPath: archival
coordinate: "archival · 1/base · 814446aa"
contentUuid: "4cb28bd4-5b79-5e2f-8b55-c82a1e0ee981"
diamondUuid: "a7e4732d-7f9d-8d13-99f5-4d67ae6e7450"
uuid: "814446aa-fa3d-8285-bac6-48ee249705f5"
horo: 1
typography:
  partition: archival
  bondDegree: 12
standards:
  - "Arweave Pay-Once-Store-Forever"
  - "Filecoin storage proofs (Spacegap / Spacetime)"
  - "W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid"
  - "W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "20817c51-da18-8da9-a555-cfa9489d33cf"
  stages:
    - stage: path
      stageUuid: "d3d18419-2856-8d1d-be61-c116e67f2795"
    - stage: trinity
      stageUuid: "9694abff-7df4-8909-912f-c30ad43b4201"
    - stage: boundary
      stageUuid: "f5bb205d-e229-8254-b3fc-d0f0102b6b29"
    - stage: links
      stageUuid: "b0987b09-f814-88e6-bd98-9a3bcf075d82"
    - stage: horo
      stageUuid: "e542f0cc-be68-8096-a68a-6e28f6b1d798"
    - stage: seal
      stageUuid: "6cb5ad34-44ce-8321-aa0d-86c1e70a252c"
    - stage: uuid
      stageUuid: "7bd86639-4808-8884-950d-827577d2e41e"
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
