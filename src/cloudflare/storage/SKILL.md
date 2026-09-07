---
name: storage
description: "Use when reasoning about storage — Tenant-scoped KV, R2, Vectorize, and Durable Object mediators"
atomPath: "cloudflare/storage"
coordinate: "cloudflare/storage · 1/base · f02217ce"
contentUuid: "aa5933c3-8ca6-55cb-9f78-4f739366f39f"
diamondUuid: "9cb576ac-307a-861d-9f6d-cc91b8a8441f"
uuid: "f02217ce-0455-886f-8596-f6d8e00bfe51"
horo: 1
typography:
  partition: cloudflare
  bondDegree: 36
standards: []
bindings: []
signatures:
  computationUuid: "f65cdc46-365f-8404-84b0-b1f021774d7b"
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
      stageUuid: "61e29ac8-3bf4-8ab1-9886-6c9a673ca6e4"
    - stage: seal
      stageUuid: "72ee8a39-65cd-8e41-95e9-04b6f6106176"
    - stage: uuid
      stageUuid: "06031935-c98c-8400-b9a0-5f2b81cdc1c1"
version: 2
---
# cloudflare/storage — storage operations

KV, R2, Vectorize, and Durable Object operations—all tenant-scoped and audit-trailed.

---

<sub>skeleton — run `pnpm erpax corpus refresh` to seal</sub>
