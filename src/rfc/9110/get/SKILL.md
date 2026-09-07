---
name: get
description: "Use when reading a cached document, global or redirect set under RFC 9110 §13 — the read side of the HTTP caching layer, one module per resource kind."
atomPath: "rfc/9110/get"
coordinate: "rfc/9110/get · 1/base · af54fe19"
contentUuid: "d853ca72-d085-5505-a1ba-d4d04f594ede"
diamondUuid: "6532f0e9-8ccd-85f5-88bd-b86bba3ad406"
uuid: "af54fe19-411b-8bd8-9c6e-24b5d1eb5ec4"
horo: 1
typography:
  partition: rfc
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "40120096-f009-8cd0-a8d9-872ae931c37a"
  stages:
    - stage: path
      stageUuid: "ba2553ce-d658-8057-a4a3-f22f775a7d82"
    - stage: trinity
      stageUuid: "86fbc195-349d-8e61-92be-476558d39567"
    - stage: boundary
      stageUuid: "49681f35-5cf6-8ebf-a545-31f68910f764"
    - stage: links
      stageUuid: "8506cc5e-8f33-868c-9284-f23e76365876"
    - stage: horo
      stageUuid: "4d2fb314-98c3-8f76-880d-cdc113c844c3"
    - stage: seal
      stageUuid: "41be289b-09f9-865a-b5aa-16f648652afd"
    - stage: uuid
      stageUuid: "13b9aa72-ccdf-87a8-a845-1724ddfa0a79"
version: 2
---
# get

The **read** side of RFC 9110 §13 caching. Each member fetches one resource kind and caches it: `document` (a collection doc by slug), `globals` (a global by slug, per locale), `redirects` (the redirect set). They share a cache and differ only in what they address, which is why they are siblings rather than one module with a discriminator.

Composes: [[law]].
