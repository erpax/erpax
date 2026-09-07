---
name: get
description: "Use when reading a cached document, global or redirect set under RFC 9110 §13 — the read side of the HTTP caching layer, one module per resource kind."
atomPath: "rfc/9110/get"
coordinate: "rfc/9110/get · 4/weave · 17d5e411"
contentUuid: "b0b22189-a351-5c46-a6be-011e3bc3bc8d"
diamondUuid: "8b4252bb-18f0-8ec9-bad2-467a69b4523a"
uuid: "17d5e411-b3e5-8cdf-99f0-076f8a085bcc"
horo: 4
typography:
  partition: rfc
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "b717d09d-eab4-8df5-988d-541c7f69d947"
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
      stageUuid: "fd590992-c3cd-8643-9259-e9b280ef9da2"
    - stage: seal
      stageUuid: "41be289b-09f9-865a-b5aa-16f648652afd"
    - stage: uuid
      stageUuid: "cf08fcb7-48bc-88b2-9d2b-89f0031e201d"
version: 2
---
# get

The **read** side of RFC 9110 §13 caching. Each member fetches one resource kind and caches it: `document` (a collection doc by slug), `globals` (a global by slug, per locale), `redirects` (the redirect set). They share a cache and differ only in what they address, which is why they are siblings rather than one module with a discriminator.

Composes: [[law]].
