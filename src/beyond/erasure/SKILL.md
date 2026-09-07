---
name: erasure
description: "Use when reasoning about erasure — Deleting a posted row breaks the ledger it belongs to. Crypto-shredding keeps the record and destroys the ability to read it: encrypts, decrypts while the key lives, and drops the…"
atomPath: "beyond/erasure"
coordinate: "beyond/erasure · 2/share · fa7d0cf7"
contentUuid: "69a11d53-f7ed-5269-8c43-df810c520a1b"
diamondUuid: "50767844-1f3c-800e-a719-bf1e434445da"
uuid: "fa7d0cf7-4f9e-80b4-a296-05e7f61df0f9"
horo: 2
typography:
  partition: beyond
  bondDegree: 3
standards:
  - "GDPR Art. 17 right-to-erasure (irrevocable via key destruction)"
  - "ISO 27040 §6.3 cryptographic-erasure"
  - "NIST SP 800-88 Rev.1 media-sanitization (cryptographic erase)"
  - "NIST-SP-800-63"
bindings: []
signatures:
  computationUuid: "9b094676-bd90-8f8c-a3fc-6a023383b6ac"
  stages:
    - stage: path
      stageUuid: "0b58141e-f59d-83a7-8578-65876bf6ab08"
    - stage: trinity
      stageUuid: "6790c5ff-3676-8ef6-8764-5b54f24f136f"
    - stage: boundary
      stageUuid: "2dc05447-e612-85d3-a311-e7e0bb7dec09"
    - stage: links
      stageUuid: "f2efc885-5475-8efe-a568-d87328d22bc8"
    - stage: horo
      stageUuid: "3666908e-0113-89da-a112-586135b86d1b"
    - stage: seal
      stageUuid: "06b77714-6c76-8117-a3e7-75797b3c8433"
    - stage: uuid
      stageUuid: "621af682-b9f0-87a2-a0e7-fd2bd84be491"
version: 2
---
# beyond/erasure — a right-to-erasure request is met by losing the KEY, never the record

Deleting a posted row breaks the ledger it belongs to. Crypto-shredding keeps the record and
destroys the ability to read it: `seal` encrypts, `open` decrypts while the key lives, and
`shred` drops the key from the `KeyVault` so the `SealedRecord` becomes permanently opaque.

The accounting stays balanced and the audit chain stays continuous, because nothing was
removed — only rendered unreadable. That is what makes erasure compatible with an immutable
ledger at all.

**Honest boundary.** This proves the key is gone from the vault; it does not prove no copy of
the plaintext was taken elsewhere before the seal.

Composes: [[law]].
