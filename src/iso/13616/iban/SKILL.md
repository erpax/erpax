---
name: iban
description: "Use when reasoning about iban — ISO 13616 IBAN validator with ISO 7064 mod-97 checksum."
atomPath: "iso/13616/iban"
coordinate: "iso/13616/iban · 8/crest · 446deb24"
contentUuid: "71266c54-0754-5ac7-b695-4b78846a3e6f"
diamondUuid: "756fa716-b38e-8266-9e41-ebb1e0e8c7bf"
uuid: "446deb24-0722-8a71-9ebd-2ae6953aafec"
horo: 8
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
  computationUuid: "a7f687df-a905-8bfe-ad20-eee11f2e28d9"
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
      stageUuid: "7f24ab65-0fdb-8ebb-a1bd-d939d6f3e95a"
    - stage: seal
      stageUuid: "62d92e6a-81b4-85ee-b58b-bfaf011fae46"
    - stage: uuid
      stageUuid: "06526583-fbca-8ce0-9fa3-4a83b6ad689e"
version: 2
---
# iso/13616/iban

ISO 13616 IBAN validator with ISO 7064 mod-97 checksum.

Extracted from `iso/13616/iban.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/13616]].
