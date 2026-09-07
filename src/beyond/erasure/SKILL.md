---
name: erasure
description: "Use when reasoning about erasure — Deleting a posted row breaks the ledger it belongs to. Crypto-shredding keeps the record and destroys the ability to read it: encrypts, decrypts while the key lives, and drops the…"
atomPath: "beyond/erasure"
coordinate: "beyond/erasure · 7/descent · a48b65e3"
contentUuid: "20aa5882-9fec-56c8-b99a-7397a56ba35b"
diamondUuid: "38a5e99d-8bbb-802b-871f-c756f61d264a"
uuid: "a48b65e3-2056-8eb0-913e-6621e46ddc7e"
horo: 7
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
  computationUuid: "8df7f7eb-9d1f-886a-9ce8-80b1ab332e87"
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
      stageUuid: "c4740ac7-cf1f-8162-86f9-1bd6462b1289"
    - stage: seal
      stageUuid: "06b77714-6c76-8117-a3e7-75797b3c8433"
    - stage: uuid
      stageUuid: "36a4e3f5-d61e-80ad-a493-8380f2f47041"
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
