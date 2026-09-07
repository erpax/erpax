---
name: envelope
description: "Use when reasoning about envelope — Envelope encryption keyed by content-uuid — the at-rest companion to `SignedUuid<T>`."
atomPath: "integrity/envelope"
coordinate: "integrity/envelope · 4/weave · 750d06f2"
contentUuid: "c49487e4-df46-5005-a0ec-50bd1de83512"
diamondUuid: "d8b29147-7923-8318-8157-cc92eb538c18"
uuid: "750d06f2-d006-84c8-b2e3-d6824d306820"
horo: 4
typography:
  partition: integrity
  bondDegree: 6
standards:
  - "EU-2016/679"
  - GDPR Article 32(1)(a) encryption of personal data
  - HIPAA §164.312(a)(2)(iv) encryption of ePHI
  - "ISO/IEC 27001 Annex A.10.1.1 cryptographic-controls policy"
  - "ISO/IEC 27040 §6.7 storage security"
  - "NIST SP 800-38D AES-GCM"
  - "NIST SP 800-57 §5.6 key-management lifecycles"
  - "NIST-SP-800-38D"
  - "NIST-SP-800-57"
  - PCI DSS 4.0 §3.5 strong cryptography
  - RFC 5116 AEAD
  - RFC 5869 HKDF
bindings: []
signatures:
  computationUuid: "79c3d35b-617b-8d6a-a707-73a21ec8b2c0"
  stages:
    - stage: path
      stageUuid: "4a63ddd1-032a-8967-ba90-8c37316625a6"
    - stage: trinity
      stageUuid: "0b3e4bdd-5ca3-8bc5-b188-924115d7dc0c"
    - stage: boundary
      stageUuid: "09f6d385-0ae2-8d69-ac94-db1c9477e8b9"
    - stage: links
      stageUuid: "8996c9f7-4639-8dad-b11a-1afbdb080596"
    - stage: horo
      stageUuid: "3258bf00-7095-8103-900f-6bfba0435bb8"
    - stage: seal
      stageUuid: "415ba01a-7608-84cc-8ec6-821bca8b7c51"
    - stage: uuid
      stageUuid: "ea1d4112-febd-8c62-9f55-c63fcdcc7025"
version: 2
---
# integrity/envelope

Envelope encryption keyed by content-uuid — the at-rest companion to `SignedUuid<T>`.

Extracted from `integrity/envelope.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[integrity]].
