---
name: erasure
description: "Use when reasoning about erasure — Deleting a posted row breaks the ledger it belongs to. Crypto-shredding keeps the record and destroys the ability to read it: encrypts, decrypts while the key lives, and drops the…"
atomPath: "beyond/erasure"
coordinate: "beyond/erasure · 4/weave · b1a48ffa"
contentUuid: "ed3a8b41-df4c-5bcc-a5f8-f161c559731b"
diamondUuid: "f261c1e4-a44f-85b3-bdcd-8a6df95eb5fb"
uuid: "b1a48ffa-02e9-84dc-b6ba-b86a8aada72f"
horo: 4
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
  computationUuid: "7eaf7677-38d5-8215-b53e-b6c6a0cf7ee7"
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
      stageUuid: "bcd7279b-83b5-8f03-87ae-314ceba656ad"
    - stage: seal
      stageUuid: "06b77714-6c76-8117-a3e7-75797b3c8433"
    - stage: uuid
      stageUuid: "e557d67c-07b1-843e-81e0-60c665848bb1"
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
