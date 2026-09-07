---
name: meta
description: "Use when reasoning about meta — builds the Next.js — title, description, Open Graph image — from the Payload document being rendered."
atomPath: "generate/meta"
coordinate: "generate/meta · 7/descent · f4b4ea83"
contentUuid: "835b05a3-c4ad-54a5-93e2-4cb87411c003"
diamondUuid: "91065e0f-24a9-8e34-a6cf-918006f29f37"
uuid: "f4b4ea83-461d-88c6-a918-f43ae82a5996"
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
  computationUuid: "d5822f06-5ca0-825d-a9ad-d3a70726b31d"
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
      stageUuid: "2cf6aa01-4a35-80a8-8fee-330e7e43e5c6"
    - stage: seal
      stageUuid: "385817c8-d290-887a-bf7f-54c86a21d8f5"
    - stage: uuid
      stageUuid: "848a47a7-142b-8e73-9dde-3dcf78a42174"
version: 2
---
# generate/meta — a page's metadata is derived from the document, never typed twice

`generateMeta` builds the Next.js `Metadata` — title, description, Open Graph image — from the
Payload document being rendered. Image URLs are absolutised against the request origin, because
a relative URL in an Open Graph tag resolves against the consumer, not the page.


Composes: [[law]].
