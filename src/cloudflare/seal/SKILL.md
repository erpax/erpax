---
name: seal
description: "Use when reasoning about seal — Cloudflare config sealing — content-uuid identity, decrypt only on proof."
atomPath: "cloudflare/seal"
coordinate: "cloudflare/seal · 1/base · dc160a8e"
contentUuid: "58249d45-d0c0-5125-8aa7-bd9bdf2862f6"
diamondUuid: "b021a73a-8d4d-8ee7-b212-0de13ced9c4c"
uuid: "dc160a8e-9fad-8080-9ad5-497a6d690537"
horo: 1
typography:
  partition: cloudflare
  bondDegree: 173
standards:
  - "CoE-108+"
  - "NIST SP-800-108 key-derivation-function"
  - "NIST SP-800-38D AES-GCM"
  - "NIST-SP-800-108"
  - "NIST-SP-800-38D"
  - "NIST-SP-800-63"
bindings: []
signatures:
  computationUuid: "f8449e17-cacc-8255-b576-a76581e45d7c"
  stages:
    - stage: path
      stageUuid: "26f371ef-55d0-8581-96d2-135e6cf9f2b1"
    - stage: trinity
      stageUuid: "e5b3d687-a519-8a6a-8801-d8c554c4be6a"
    - stage: boundary
      stageUuid: "0994cd09-55b3-8c07-8565-85ce6c76e895"
    - stage: links
      stageUuid: "5a8ca987-6a1d-86d6-bc5a-094a55f32779"
    - stage: horo
      stageUuid: "7e2c72e9-6895-83db-9dde-cb624da27354"
    - stage: seal
      stageUuid: "d4c9ff48-5412-8de0-9043-e84815909481"
    - stage: uuid
      stageUuid: "e5fc7072-473c-82d8-8281-24b9ff89e2eb"
version: 2
---
# cloudflare/seal

Cloudflare config sealing — content-uuid identity, decrypt only on proof.

Extracted from `cloudflare/seal.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[cloudflare]].
