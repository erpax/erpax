---
name: erasure
description: "Use when reasoning about erasure — Deleting a posted row breaks the ledger it belongs to. Crypto-shredding keeps the record and destroys the ability to read it: encrypts, decrypts while the key lives, and drops the…"
atomPath: "beyond/erasure"
coordinate: "beyond/erasure · 8/crest · cfea0818"
contentUuid: "0e1ffdd8-b5b6-54a5-a51d-5f13cb327d44"
diamondUuid: "26335d1c-a5ab-8188-b506-ca45cade69a9"
uuid: "cfea0818-9c68-8565-8a2f-137984a3901e"
horo: 8
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
  computationUuid: "68b83aaa-5ec3-8332-b891-d42e341de2fb"
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
      stageUuid: "af5c4775-d377-8f60-b6ae-f260aec8954f"
    - stage: seal
      stageUuid: "06b77714-6c76-8117-a3e7-75797b3c8433"
    - stage: uuid
      stageUuid: "18c8ef12-28fe-8391-b33a-ec2525767cae"
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
