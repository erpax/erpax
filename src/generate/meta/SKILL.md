---
name: meta
description: "Use when reasoning about meta — builds the Next.js — title, description, Open Graph image — from the Payload document being rendered."
atomPath: "generate/meta"
coordinate: "generate/meta · 5/round · 59b7b0bd"
contentUuid: "f02b2446-a8c7-5836-b611-90d762c465de"
diamondUuid: "cf70a8e3-81b7-8d0a-aaa7-1614b3845c9c"
uuid: "59b7b0bd-676f-83f6-87fb-3bc7f2a2a9d4"
horo: 5
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
  computationUuid: "658cd027-3a06-85f2-8e69-06d3bd9efdfc"
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
      stageUuid: "5d1c310c-ebaa-87b2-8284-4009056ea339"
    - stage: seal
      stageUuid: "385817c8-d290-887a-bf7f-54c86a21d8f5"
    - stage: uuid
      stageUuid: "ad36ca2e-c8b8-866e-86a0-f7df9454019b"
version: 2
---
# generate/meta — a page's metadata is derived from the document, never typed twice

`generateMeta` builds the Next.js `Metadata` — title, description, Open Graph image — from the
Payload document being rendered. Image URLs are absolutised against the request origin, because
a relative URL in an Open Graph tag resolves against the consumer, not the page.


Composes: [[law]].
