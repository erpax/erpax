---
name: signatures
description: "Use when reasoning about signatures — Signed content-uuid — digital signatures fold into the uuid family."
atomPath: "integrity/signatures"
coordinate: "integrity/signatures · 4/weave · ccf737b7"
contentUuid: "3f355eb0-26e4-548f-b7e4-b2bb260c6271"
diamondUuid: "f51369c5-d31e-803c-b5b2-9816ccd2bb6e"
uuid: "ccf737b7-b285-8953-8ea7-aec2e46a647d"
horo: 4
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
  computationUuid: "989892b2-cf78-8e9e-b5be-282a5db77efb"
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
      stageUuid: "367d02ce-34b7-8259-986a-c8f7f5095b5e"
    - stage: seal
      stageUuid: "3e732869-3b45-8b7e-a49d-9bf118fd64f4"
    - stage: uuid
      stageUuid: "57ada7d8-82d2-8eb2-a38b-d499635cb70f"
version: 2
---
# integrity/signatures

Signed content-uuid — digital signatures fold into the uuid family.

Extracted from `integrity/signatures.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[integrity]].
