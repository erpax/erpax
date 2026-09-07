---
name: get
description: "Use when reading a cached document, global or redirect set under RFC 9110 §13 — the read side of the HTTP caching layer, one module per resource kind."
atomPath: "rfc/9110/get"
coordinate: "rfc/9110/get · 2/share · 4d8cd821"
contentUuid: "37d93ab8-d638-587d-8969-7e8ac2a3dab5"
diamondUuid: "cbcb7343-8eaa-8ac6-aca1-f144e5123cd4"
uuid: "4d8cd821-be51-88f2-bf14-b3271e50531c"
horo: 2
typography:
  partition: rfc
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "a01d4ae1-70eb-8ca9-b436-55f6fee89f82"
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
      stageUuid: "ba56221c-ee46-8ce6-86cd-68acb8f3797d"
    - stage: seal
      stageUuid: "41be289b-09f9-865a-b5aa-16f648652afd"
    - stage: uuid
      stageUuid: "8a83b84d-00db-88fd-ae35-e9e07e263b41"
version: 2
---
# get

The **read** side of RFC 9110 §13 caching. Each member fetches one resource kind and caches it: `document` (a collection doc by slug), `globals` (a global by slug, per locale), `redirects` (the redirect set). They share a cache and differ only in what they address, which is why they are siblings rather than one module with a discriminator.

Composes: [[law]].
