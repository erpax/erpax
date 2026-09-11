---
name: storage
description: "Use when reasoning about storage — Tenant-scoped KV, R2, Vectorize, and Durable Object mediators"
atomPath: "cloudflare/storage"
coordinate: "cloudflare/storage · 1/base · 20494b72"
contentUuid: "61a98dae-e4cb-5145-b3a2-131ddc3bac4d"
diamondUuid: "e24f3739-0b7e-8ba5-a91c-009e7e942918"
uuid: "20494b72-e8aa-8d48-bdd6-38725b92631e"
horo: 1
typography:
  partition: cloudflare
  bondDegree: 36
standards: []
bindings: []
signatures:
  computationUuid: "9ecbe991-a62e-8f7a-9967-f94648e7bbca"
  stages:
    - stage: path
      stageUuid: "7219ec81-f859-8802-859c-a27c698eebde"
    - stage: trinity
      stageUuid: "a7fe06ec-c54d-83fb-838d-ad35641c18f5"
    - stage: boundary
      stageUuid: "17861967-fcf5-8719-aaf6-a9db4d839a50"
    - stage: links
      stageUuid: "4a5d43bc-b86c-8079-b37b-fb28cdc0da16"
    - stage: horo
      stageUuid: "224702a2-993d-88ea-8206-0a1c6b506c29"
    - stage: seal
      stageUuid: "72ee8a39-65cd-8e41-95e9-04b6f6106176"
    - stage: uuid
      stageUuid: "402c5a21-05ee-82bc-8527-58cd9c044b50"
version: 2
---
# cloudflare/storage — storage operations

KV, R2, Vectorize, and Durable Object operations—all tenant-scoped and audit-trailed.

---

<sub>skeleton — run `pnpm erpax corpus refresh` to seal</sub>
