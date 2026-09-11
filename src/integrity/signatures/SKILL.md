---
name: signatures
description: "Use when reasoning about signatures — Signed content-uuid — digital signatures fold into the uuid family."
atomPath: "integrity/signatures"
coordinate: "integrity/signatures · 2/share · 8fdebf60"
contentUuid: "fcc265bd-2af0-5a8d-94f5-3205ccc41563"
diamondUuid: "cee39315-8c06-8928-9383-dcfbe2258c2f"
uuid: "8fdebf60-f781-825e-a8fd-06e352d3b8b4"
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
  computationUuid: "7d33697f-1ac8-8c36-b787-a9cc7bde1ea0"
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
      stageUuid: "0d075e11-15e2-8fcc-9500-fc1b2dde6b40"
    - stage: seal
      stageUuid: "3e732869-3b45-8b7e-a49d-9bf118fd64f4"
    - stage: uuid
      stageUuid: "41c1b3d8-730a-8680-9d8f-2d43393ca2a4"
version: 2
---
# integrity/signatures

Signed content-uuid — digital signatures fold into the uuid family.

Extracted from `integrity/signatures.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[integrity]].
