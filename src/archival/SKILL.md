---
name: archival
description: "Use when pinning tenant content to long-term decentralized storage (IPFS, Arweave, Filecoin, R2-glacier) for regulatory long-retention rules — banks 10y, gov 30y, healthcare 50y, archives unlimited — pinning to every listed backend for defense-in-depth and verifying or recovering by receipt."
atomPath: archival
coordinate: "archival · 2/share · ca755751"
contentUuid: "4357bdd7-21f7-59fc-ac6c-d367414de302"
diamondUuid: "aef6e225-bbe6-87df-9294-093a1fcf1449"
uuid: "ca755751-307d-83ec-b36e-4010c8875f5f"
horo: 2
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
  computationUuid: "c8246ecd-f87d-86c0-8c51-3a2902714f1b"
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
      stageUuid: "dd754c71-ab6b-89b8-af0b-b3131609b0ef"
    - stage: seal
      stageUuid: "6cb5ad34-44ce-8321-aa0d-86c1e70a252c"
    - stage: uuid
      stageUuid: "6a3cb2d5-cec0-8368-b13e-7bda28ee26fe"
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
