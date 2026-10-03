---
name: meta
description: "Use when reasoning about meta — builds the Next.js — title, description, Open Graph image — from the Payload document being rendered."
atomPath: "generate/meta"
coordinate: "generate/meta · 7/descent · 699abf59"
contentUuid: "c1d7a067-54f9-50b9-aff7-8e54da922082"
diamondUuid: "bdf7ec8d-5cf1-893e-8c7f-04dccc665fa3"
uuid: "699abf59-9b96-8c9a-9836-ea76f984a209"
horo: 7
typography:
  partition: generate
  bondDegree: 3
standards:
  - "3986 §5.3 reference-resolution"
  - "OGP open-graph-protocol-1.0"
  - "RFC-3986"
  - "W3C-HTML5"
  - "W3C-HTML5 §4.2.5 meta-element"
bindings: []
signatures:
  computationUuid: "ba4044ca-e2f2-8a7a-b34a-100185451d93"
  stages:
    - stage: path
      stageUuid: "707d489c-52d4-853a-856d-53dd15883d1b"
    - stage: trinity
      stageUuid: "924cd83c-daf5-8fdc-a8ea-1dbc33f122e8"
    - stage: boundary
      stageUuid: "7e9c102a-1d10-82e2-a509-f319136db1fa"
    - stage: links
      stageUuid: "fdc267fe-91ff-8137-ae64-5fd2633b48ae"
    - stage: horo
      stageUuid: "bdf06fd2-d684-8645-aac6-7eb2c03fbc15"
    - stage: seal
      stageUuid: "385817c8-d290-887a-bf7f-54c86a21d8f5"
    - stage: uuid
      stageUuid: "98c99942-5b98-802f-a466-ab7efd438d9c"
version: 2
---
# generate/meta — a page's metadata is derived from the document, never typed twice

`generateMeta` builds the Next.js `Metadata` — title, description, Open Graph image — from the
Payload document being rendered. Image URLs are absolutised against the request origin, because
a relative URL in an Open Graph tag resolves against the consumer, not the page.


Composes: [[law]].
