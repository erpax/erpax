---
name: meta
description: "Use when reasoning about meta — builds the Next.js — title, description, Open Graph image — from the Payload document being rendered."
atomPath: "generate/meta"
coordinate: "generate/meta · 4/weave · d1fb3af7"
contentUuid: "16e371ac-37d7-5054-84b9-c946f5080412"
diamondUuid: "69ac4129-17c2-839e-9087-57654941e289"
uuid: "d1fb3af7-99c0-8b9e-9675-5b0606c83cd7"
horo: 4
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
  computationUuid: "4fc0783a-5f8b-84d3-a5d3-8175b831a236"
  stages:
    - stage: path
      stageUuid: "707d489c-52d4-853a-856d-53dd15883d1b"
    - stage: trinity
      stageUuid: "924cd83c-daf5-8fdc-a8ea-1dbc33f122e8"
    - stage: boundary
      stageUuid: "6e3238ee-4e19-8faf-83e5-7a5cead72a18"
    - stage: links
      stageUuid: "fdc267fe-91ff-8137-ae64-5fd2633b48ae"
    - stage: horo
      stageUuid: "6e23320e-16ba-8f91-9e3b-566727292e87"
    - stage: seal
      stageUuid: "385817c8-d290-887a-bf7f-54c86a21d8f5"
    - stage: uuid
      stageUuid: "69465c8e-2da6-8809-b719-7a51c89fd1d3"
version: 2
---
# generate/meta — a page's metadata is derived from the document, never typed twice

`generateMeta` builds the Next.js `Metadata` — title, description, Open Graph image — from the
Payload document being rendered. Image URLs are absolutised against the request origin, because
a relative URL in an Open Graph tag resolves against the consumer, not the page.


Composes: [[law]].
