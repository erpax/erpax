---
name: signatures
description: "Use when reasoning about signatures — Signed content-uuid — digital signatures fold into the uuid family."
atomPath: "integrity/signatures"
coordinate: "integrity/signatures · 2/share · 31f11ccd"
contentUuid: "54f4f152-bd51-589c-b47c-673a90b9f1ed"
diamondUuid: "2c9b93c9-4239-87b8-b932-c3cd94722484"
uuid: "31f11ccd-3a80-8510-b058-a14c5f51bcc6"
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
  computationUuid: "a3a77013-b811-8eb3-afd6-55ea27246253"
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
      stageUuid: "cd04965d-856e-817d-a6ef-7275d42863a1"
    - stage: seal
      stageUuid: "3e732869-3b45-8b7e-a49d-9bf118fd64f4"
    - stage: uuid
      stageUuid: "a01dcccd-c692-8882-85b9-4ea0b2c593eb"
version: 2
---
# integrity/signatures

Signed content-uuid — digital signatures fold into the uuid family.

Extracted from `integrity/signatures.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[integrity]].
