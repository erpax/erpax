---
name: banner
description: Use when reasoning about banner — is the Payload definition and renders it. They are separate exports because typegen and the server config need the shape without dragging React into a context that cannot run it…
atomPath: "blocks/banner"
coordinate: "blocks/banner · 1/base · bec17b57"
contentUuid: "6dc99d97-58c5-5990-aab3-9e801fefed3f"
diamondUuid: "47125fee-f3b5-8b38-a5fc-5da6f3ab5e4b"
uuid: "bec17b57-d1f1-850e-be85-10f45e64754c"
horo: 1
typography:
  partition: blocks
  bondDegree: 6
standards:
  - "W3C-HTML5"
  - "W3C-WAI-ARIA-1.2"
bindings: []
signatures:
  computationUuid: "55b38a76-a17a-8128-9b0e-a212d5b8a7ab"
  stages:
    - stage: path
      stageUuid: "4f4e9ac7-3535-8f5a-9302-2135be1ee4a9"
    - stage: trinity
      stageUuid: "6d137004-867b-8803-8118-8470b03ab7e2"
    - stage: boundary
      stageUuid: "8df780a1-887d-8c28-8d09-96418887fa9a"
    - stage: links
      stageUuid: "9d2d75c1-2100-8be6-9f95-d9aca457ed29"
    - stage: horo
      stageUuid: "dbd5c43b-baf7-8ac8-9b6e-a9f1bc7f1603"
    - stage: seal
      stageUuid: "412cc769-15fa-8a4b-814d-70b0d8880f32"
    - stage: uuid
      stageUuid: "61b09d7c-f45c-8908-bd52-e73e4c6b4416"
version: 2
---
# blocks/banner — the block's shape and the block's rendering, named separately

`Banner` is the Payload definition and `BannerBlock` renders it. They are separate exports because
typegen and the server config need the shape without dragging React into a context that cannot run
it ([[blocks]]/config).

Composes: [[law]].
