---
name: get
description: "Use when reading a cached document, global or redirect set under RFC 9110 §13 — the read side of the HTTP caching layer, one module per resource kind."
atomPath: "rfc/9110/get"
coordinate: "rfc/9110/get · 7/descent · a810e31f"
contentUuid: "63bdb505-2d7f-5274-a4f2-ef9fa071efef"
diamondUuid: "53fae5f9-eba7-8740-908a-f0b6e7320e7a"
uuid: "a810e31f-1fc0-863b-bbf2-7294ec0e8297"
horo: 7
typography:
  partition: rfc
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "8418a050-a456-8923-8942-2ae021d452c9"
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
      stageUuid: "6e7c0793-edc2-8903-9543-6f869f7bc74e"
    - stage: seal
      stageUuid: "41be289b-09f9-865a-b5aa-16f648652afd"
    - stage: uuid
      stageUuid: "fc6562f2-dc02-82ea-b418-235695a087fd"
version: 2
---
# get

The **read** side of RFC 9110 §13 caching. Each member fetches one resource kind and caches it: `document` (a collection doc by slug), `globals` (a global by slug, per locale), `redirects` (the redirect set). They share a cache and differ only in what they address, which is why they are siblings rather than one module with a discriminator.

Composes: [[law]].
