---
name: erasure
description: "Use when reasoning about erasure — Deleting a posted row breaks the ledger it belongs to. Crypto-shredding keeps the record and destroys the ability to read it: encrypts, decrypts while the key lives, and drops the…"
atomPath: "beyond/erasure"
coordinate: "beyond/erasure · 5/round · 8593517d"
contentUuid: "66069b07-ec13-5de7-9a3e-6f1a1dd63695"
diamondUuid: "8018e6fd-732d-8c33-b87b-9617a9d360e0"
uuid: "8593517d-fcdd-8715-b2cb-897c7667baf7"
horo: 5
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
  computationUuid: "492256fa-973f-8f56-867c-69e447cf0b78"
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
      stageUuid: "7042f7e0-9104-8ebd-b074-f7fc79991484"
    - stage: seal
      stageUuid: "06b77714-6c76-8117-a3e7-75797b3c8433"
    - stage: uuid
      stageUuid: "60a66d69-8406-8e9b-8112-0fc2f63e4a36"
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
