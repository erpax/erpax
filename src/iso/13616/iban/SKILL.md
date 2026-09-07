---
name: iban
description: "Use when reasoning about iban — ISO 13616 IBAN validator with ISO 7064 mod-97 checksum."
atomPath: "iso/13616/iban"
coordinate: "iso/13616/iban · 2/share · 6330613a"
contentUuid: "d82180f4-72b9-5f1d-a010-5c6eda5aaa83"
diamondUuid: "d18eb6f6-d030-8c46-884e-90d7d339ba8c"
uuid: "6330613a-02be-8a05-97d8-8478c82959fb"
horo: 2
typography:
  partition: iso
  bondDegree: 6
standards:
  - "EU-2003/88/EC"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 §6 verification"
  - "ISO-7064"
  - "ISO-7064:2003 check-character-systems mod-97-10"
  - "ISO-7064:2003 mod-97-10"
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "c10c3b97-eef2-851d-9ff3-da084162e8ac"
  stages:
    - stage: path
      stageUuid: "1aa780ba-84f8-8bf3-9e42-3b94b7966a8d"
    - stage: trinity
      stageUuid: "0e300398-4487-8546-9fb6-405b11fe6ab6"
    - stage: boundary
      stageUuid: "534c35ad-0525-806d-a9c9-c432a4eb0da7"
    - stage: links
      stageUuid: "3cf21d70-6106-8c12-86cb-c77552aeb5b0"
    - stage: horo
      stageUuid: "26fa80b1-22c3-80ef-b271-c7a05048d8a6"
    - stage: seal
      stageUuid: "62d92e6a-81b4-85ee-b58b-bfaf011fae46"
    - stage: uuid
      stageUuid: "1f0e2c69-5818-8ff6-b46b-4bb9e18c3b33"
version: 2
---
# iso/13616/iban

ISO 13616 IBAN validator with ISO 7064 mod-97 checksum.

Extracted from `iso/13616/iban.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/13616]].
