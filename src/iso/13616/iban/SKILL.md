---
name: iban
description: "Use when reasoning about iban — ISO 13616 IBAN validator with ISO 7064 mod-97 checksum."
atomPath: "iso/13616/iban"
coordinate: "iso/13616/iban · 5/round · ede04299"
contentUuid: "d0be6815-f678-552e-b804-af5f099a6c51"
diamondUuid: "8a028704-ed19-8d44-8db2-bcbcec9e4639"
uuid: "ede04299-8c5a-89d2-a5b0-a0af0b2b2650"
horo: 5
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
  computationUuid: "92276fad-00c4-88d9-8bed-5dc661d66c88"
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
      stageUuid: "14ba0d30-e3f7-82f4-8492-76b6da4d4c96"
    - stage: seal
      stageUuid: "62d92e6a-81b4-85ee-b58b-bfaf011fae46"
    - stage: uuid
      stageUuid: "7bfa17e1-65f7-815b-83c2-f5b00729f3c0"
version: 2
---
# iso/13616/iban

ISO 13616 IBAN validator with ISO 7064 mod-97 checksum.

Extracted from `iso/13616/iban.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/13616]].
