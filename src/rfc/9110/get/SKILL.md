---
name: get
description: "Use when reading a cached document, global or redirect set under RFC 9110 §13 — the read side of the HTTP caching layer, one module per resource kind."
atomPath: "rfc/9110/get"
coordinate: "rfc/9110/get · 1/base · bcb3552c"
contentUuid: "162e343f-60eb-5c61-9c94-60ec65c6baa3"
diamondUuid: "dbe1dfbb-6b4a-87b3-83cb-3c9f805b1a63"
uuid: "bcb3552c-2054-8b49-86b1-6b9354c7e1fb"
horo: 1
typography:
  partition: rfc
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "47b9e581-c70b-8b40-abe4-6f2851302d89"
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
      stageUuid: "a967aa17-9021-88e7-91d7-7b87389b03c2"
    - stage: seal
      stageUuid: "41be289b-09f9-865a-b5aa-16f648652afd"
    - stage: uuid
      stageUuid: "864187b7-5020-80cf-8197-8b11667c5344"
version: 2
---
# get

The **read** side of RFC 9110 §13 caching. Each member fetches one resource kind and caches it: `document` (a collection doc by slug), `globals` (a global by slug, per locale), `redirects` (the redirect set). They share a cache and differ only in what they address, which is why they are siblings rather than one module with a discriminator.

Composes: [[law]].
