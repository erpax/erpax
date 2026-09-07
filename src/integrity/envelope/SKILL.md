---
name: envelope
description: "Use when reasoning about envelope — Envelope encryption keyed by content-uuid — the at-rest companion to `SignedUuid<T>`."
atomPath: "integrity/envelope"
coordinate: "integrity/envelope · 5/round · e335fc9e"
contentUuid: "0919022d-eb8f-5243-853c-5d49d94924f3"
diamondUuid: "13d28b75-7690-8f5e-849f-ee2e33c1a47a"
uuid: "e335fc9e-a989-835e-bfa0-d14fd87b5eca"
horo: 5
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
  computationUuid: "b284329f-45a2-87fd-abb4-5e7f2e146064"
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
      stageUuid: "1a021a0b-e8c4-8901-9a9c-c6b39d58b7dc"
    - stage: seal
      stageUuid: "415ba01a-7608-84cc-8ec6-821bca8b7c51"
    - stage: uuid
      stageUuid: "1a73b38c-bcec-85ce-8d52-2e7e43e51dc1"
version: 2
---
# integrity/envelope

Envelope encryption keyed by content-uuid — the at-rest companion to `SignedUuid<T>`.

Extracted from `integrity/envelope.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[integrity]].
