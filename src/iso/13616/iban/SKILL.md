---
name: iban
description: "Use when reasoning about iban — ISO 13616 IBAN validator with ISO 7064 mod-97 checksum."
atomPath: "iso/13616/iban"
coordinate: "iso/13616/iban · 4/weave · 14fa3fc6"
contentUuid: "c32a0250-7b1e-516b-b4ea-0d288c3c51dd"
diamondUuid: "f8a16206-5832-8ae1-bc02-aa8446465e1d"
uuid: "14fa3fc6-9e93-88de-8ccc-095b52056734"
horo: 4
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
  computationUuid: "b0a1afb0-c058-85f2-bb81-763e72c52007"
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
      stageUuid: "7b4d1934-5cc4-8d02-a9ce-5b4c70121e8d"
    - stage: seal
      stageUuid: "62d92e6a-81b4-85ee-b58b-bfaf011fae46"
    - stage: uuid
      stageUuid: "ae7b1453-c0ea-80ec-bded-b4235b904a37"
version: 2
---
# iso/13616/iban

ISO 13616 IBAN validator with ISO 7064 mod-97 checksum.

Extracted from `iso/13616/iban.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/13616]].
