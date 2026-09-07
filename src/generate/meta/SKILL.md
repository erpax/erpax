---
name: meta
description: "Use when reasoning about meta — builds the Next.js — title, description, Open Graph image — from the Payload document being rendered."
atomPath: "generate/meta"
coordinate: "generate/meta · 4/weave · 57e3aa03"
contentUuid: "a448fe98-c47a-50a1-b7a1-e6090a3ee015"
diamondUuid: "59334b86-4529-8ba4-896d-fdd369c2b67d"
uuid: "57e3aa03-b936-8787-a659-456db91c512b"
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
  computationUuid: "30e4d6f1-bdab-8037-9e68-e3542c91b7f1"
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
      stageUuid: "02b23f38-13a2-8b15-a26f-79d9b8e9e05e"
    - stage: seal
      stageUuid: "385817c8-d290-887a-bf7f-54c86a21d8f5"
    - stage: uuid
      stageUuid: "27ca601d-b128-8ab9-aaf8-84c6812f2e6c"
version: 2
---
# generate/meta — a page's metadata is derived from the document, never typed twice

`generateMeta` builds the Next.js `Metadata` — title, description, Open Graph image — from the
Payload document being rendered. Image URLs are absolutised against the request origin, because
a relative URL in an Open Graph tag resolves against the consumer, not the page.


Composes: [[law]].
