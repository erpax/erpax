---
name: iban
description: "Use when reasoning about iban — ISO 13616 IBAN validator with ISO 7064 mod-97 checksum."
atomPath: "iso/13616/iban"
coordinate: "iso/13616/iban · 1/base · 75634965"
contentUuid: "ed660762-ca94-508b-a8aa-11bb0e72c164"
diamondUuid: "93e8f2c2-1ae8-8266-8fec-8e7e946b54a2"
uuid: "75634965-a262-853e-9c80-ecb71dc0b326"
horo: 1
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
  computationUuid: "f795c902-69e0-8083-af1a-e245236966ff"
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
      stageUuid: "1eb94ec9-c9db-8571-9c3d-034fc98a26d8"
    - stage: seal
      stageUuid: "62d92e6a-81b4-85ee-b58b-bfaf011fae46"
    - stage: uuid
      stageUuid: "4a3bbf6a-b33d-89af-902f-5588726b4805"
version: 2
---
# iso/13616/iban

ISO 13616 IBAN validator with ISO 7064 mod-97 checksum.

Extracted from `iso/13616/iban.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[iso/13616]].
