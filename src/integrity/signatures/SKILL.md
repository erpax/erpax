---
name: signatures
description: "Use when reasoning about signatures — Signed content-uuid — digital signatures fold into the uuid family."
atomPath: "integrity/signatures"
coordinate: "integrity/signatures · 2/share · 48be4baa"
contentUuid: "2a7417fe-12d9-5728-892b-b0f5462199c6"
diamondUuid: "88f355ec-369b-8412-ba7b-ec8db8b2e6bf"
uuid: "48be4baa-cfc0-8923-bfa7-697c0b10012a"
horo: 2
typography:
  partition: integrity
  bondDegree: 15
standards:
  - "ETSI EN 319 132-1 XAdES"
  - "ETSI EN 319 142-1 PAdES"
  - "EU-537/2014"
  - "EU-910/2014"
  - "ISO/IEC 27001 Annex A.10 cryptographic controls"
  - "NIST SP 800-57 §5.6 key-management lifecycles"
  - "NIST-SP-800-57"
  - RFC 7515 JSON Web Signature (alg names)
  - RFC 8032 EdDSA (Ed25519)
  - eIDAS
  - "eIDAS Regulation (EU) 910/2014 §3.12 qualified electronic signature"
bindings: []
signatures:
  computationUuid: "78fe908d-830c-8d0b-a31a-48539d4a0078"
  stages:
    - stage: path
      stageUuid: "001d4af1-efc3-81e0-bcde-faf9491f6676"
    - stage: trinity
      stageUuid: "479ff60b-aaca-83c5-959d-11fd991eb45e"
    - stage: boundary
      stageUuid: "4247823e-24f4-8a81-9cb6-f9b1e4e08852"
    - stage: links
      stageUuid: "5e96e3bc-9712-889c-8c83-dc594d99590a"
    - stage: horo
      stageUuid: "b6cb73d7-9c64-8bfd-927a-bb923e3f4e09"
    - stage: seal
      stageUuid: "3e732869-3b45-8b7e-a49d-9bf118fd64f4"
    - stage: uuid
      stageUuid: "70b9637a-3e22-891c-a373-2c8b70058c46"
version: 2
---
# integrity/signatures

Signed content-uuid — digital signatures fold into the uuid family.

Extracted from `integrity/signatures.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[integrity]].
