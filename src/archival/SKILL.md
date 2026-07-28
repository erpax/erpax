---
name: archival
description: "Use when pinning tenant content to long-term decentralized storage (IPFS, Arweave, Filecoin, R2-glacier) for regulatory long-retention rules — banks 10y, gov 30y, healthcare 50y, archives unlimited — pinning to every listed backend for defense-in-depth and verifying or recovering by receipt."
atomPath: archival
coordinate: "archival · 7/descent · 9597dd0c"
contentUuid: "158e889a-9f09-5079-959c-02572e758a4a"
diamondUuid: "3dc7aa02-41f7-8c73-a7c3-d0b0e2c6de1c"
uuid: "9597dd0c-9038-8793-ae24-772515abcca5"
horo: 7
bonds:
  in:
    - archive
    - content
    - integrity
    - law
    - retention
    - uuid
  out:
    - archive
    - content
    - integrity
    - law
    - retention
    - uuid
typography:
  partition: archival
  bondDegree: 18
  neighbors: []
standards:
  - "Arweave Pay-Once-Store-Forever"
  - "Filecoin storage proofs (Spacegap / Spacetime)"
  - "W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid"
  - "W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - archive
    - content
    - integrity
    - law
    - retention
    - uuid
  matrix:
    - archive
    - content
    - integrity
    - law
    - retention
    - uuid
  backlinks:
    - archive
    - content
    - integrity
    - law
    - retention
    - uuid
signatures:
  computationUuid: "32cf0b33-0b62-89ce-bcf6-bd1b71469670"
  stages:
    - stage: path
      stageUuid: "d3d18419-2856-8d1d-be61-c116e67f2795"
    - stage: trinity
      stageUuid: "9694abff-7df4-8909-912f-c30ad43b4201"
    - stage: boundary
      stageUuid: "f5bb205d-e229-8254-b3fc-d0f0102b6b29"
    - stage: links
      stageUuid: "b2714d20-3b7c-8693-a59e-97d5f03e3f03"
    - stage: horo
      stageUuid: "11f1a852-7b4b-8010-943f-d6628cfb1d61"
    - stage: seal
      stageUuid: "6cb5ad34-44ce-8321-aa0d-86c1e70a252c"
    - stage: uuid
      stageUuid: "eb0f6246-2355-8fb4-b575-7710f118a313"
version: 2
---
# archival — long-term decentralized archival (defense-in-depth pinning)

Long-retention pinning for tenants under regulatory rules that outlive in-platform redundancy: pin the same content to EVERY listed backend (IPFS CID v1, Arweave pay-once, Filecoin storage proofs, R2-glacier) so that at least one survives. `pinForRetention` swallows per-backend failures and returns only the receipts that succeeded — the caller checks the length. Each receipt is addressed by the [[content]]-uuid and verified or recovered through its own backend.

Matter-twin: `src/archival/index.ts` — `pinForRetention` · `tenantPins` · `verifyPinning`; types `ArchiveBackendId` · `PinReceipt` · `ArchiveBackend`. Keys every pin by the [[integrity]] content-[[uuid]]; the long-horizon partner of in-platform [[archive]] [[retention]].

**Law — [[law]]: long-retention content is pinned to every backend for defense-in-depth — at least one must succeed, and a receipt verifies or recovers only through the backend that produced it.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid`
