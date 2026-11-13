---
name: signatures
description: "Use when reasoning about signatures — Signed content-uuid — digital signatures fold into the uuid family."
atomPath: "integrity/signatures"
coordinate: "integrity/signatures · 7/descent · 40bdf069"
contentUuid: "7a7ed4cf-c44e-52c8-8af0-ad0ad6c3b1f2"
diamondUuid: "21f8ba38-7f0d-8e12-81ef-1dd449c73025"
uuid: "40bdf069-2314-8402-aaf9-bd8608554a3c"
horo: 7
typography:
  partition: integrity
  bondDegree: 12
standards:
  - "ETSI EN 319 132-1 XAdES"
  - "ETSI EN 319 142-1 PAdES"
  - "EU-537/2014"
  - "EU-910/2014"
  - "ISO-27001"
  - "ISO/IEC 27001 Annex A.10 cryptographic controls"
  - "ISO/IEC-27001:2022"
  - "NIST SP 800-57 §5.6 key-management lifecycles"
  - "NIST-SP-800-57"
  - RFC 7515 JSON Web Signature (alg names)
  - RFC 8032 EdDSA (Ed25519)
  - eIDAS
  - "eIDAS Regulation (EU) 910/2014 §3.12 qualified electronic signature"
bindings: []
signatures:
  computationUuid: "af8aa47e-269b-88ee-a959-ba190bc21a09"
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
      stageUuid: "647818c1-e9a6-8903-b0ca-efc8dfac2ef1"
    - stage: seal
      stageUuid: "3e732869-3b45-8b7e-a49d-9bf118fd64f4"
    - stage: uuid
      stageUuid: "c518d22b-7f4b-8e4a-8b2a-8a2044f7bf2c"
version: 2
---
# integrity/signatures

Signed content-uuid — digital signatures fold into the uuid family.

Extracted from `integrity/signatures.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[integrity]].
