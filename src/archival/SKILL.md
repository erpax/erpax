---
name: archival
description: "Use when pinning tenant content to long-term decentralized storage (IPFS, Arweave, Filecoin, R2-glacier) for regulatory long-retention rules — banks 10y, gov 30y, healthcare 50y, archives unlimited — pinning to every listed backend for defense-in-depth and verifying or recovering by receipt."
atomPath: archival
coordinate: archival · 2/share · 5ac9e205
contentUuid: "ca46abba-50f2-5a84-96c3-3a3c413c8750"
diamondUuid: "d42fbac0-9c64-8aff-b04b-a72d65be9167"
uuid: "5ac9e205-cd35-86e6-972a-ebb346a88284"
horo: 2
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
  - Filecoin storage proofs (Spacegap / Spacetime)
  - "W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid"
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
  computationUuid: "49da0059-5b3c-8be2-88af-b560fcb45497"
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
      stageUuid: "217745c5-7bb6-8b58-9dfe-9da3af2f84a9"
    - stage: seal
      stageUuid: "5073cf48-05e5-8075-bf90-8d025d34db71"
    - stage: uuid
      stageUuid: "3edc0039-f73a-87ec-b434-910d881fb973"
version: 2
---
# archival — long-term decentralized archival (defense-in-depth pinning)

Long-retention pinning for tenants under regulatory rules that outlive in-platform redundancy: pin the same content to EVERY listed backend (IPFS CID v1, Arweave pay-once, Filecoin storage proofs, R2-glacier) so that at least one survives. `pinForRetention` swallows per-backend failures and returns only the receipts that succeeded — the caller checks the length. Each receipt is addressed by the [[content]]-uuid and verified or recovered through its own backend.

Matter-twin: `src/archival/index.ts` — `pinForRetention` · `tenantPins` · `verifyPinning`; types `ArchiveBackendId` · `PinReceipt` · `ArchiveBackend`. Keys every pin by the [[integrity]] content-[[uuid]]; the long-horizon partner of in-platform [[archive]] [[retention]].

**Law — [[law]]: long-retention content is pinned to every backend for defense-in-depth — at least one must succeed, and a receipt verifies or recovers only through the backend that produced it.**
