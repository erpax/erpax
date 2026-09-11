---
name: banner
description: Use when reasoning about banner — is the Payload definition and renders it. They are separate exports because typegen and the server config need the shape without dragging React into a context that cannot run it…
atomPath: "blocks/banner"
coordinate: "blocks/banner · 5/round · d16f72fd"
contentUuid: "72ea3c30-af7f-51f7-8057-872120815882"
diamondUuid: "bb5678a2-8a77-86d1-b2c3-29e66ebad38a"
uuid: "d16f72fd-733c-8b19-8b39-3740ed841a1b"
horo: 5
typography:
  partition: blocks
  bondDegree: 6
standards:
  - "W3C-HTML5"
  - "W3C-WAI-ARIA-1.2"
bindings: []
signatures:
  computationUuid: "37d498d1-f788-8a98-bc29-ad1446b56bb2"
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
      stageUuid: "aa2c2674-a6f3-8d5e-9241-b3fa39a44f35"
    - stage: seal
      stageUuid: "412cc769-15fa-8a4b-814d-70b0d8880f32"
    - stage: uuid
      stageUuid: "7d430ad2-ccd4-8a0a-82a2-df650c7809dd"
version: 2
---
# blocks/banner — the block's shape and the block's rendering, named separately

`Banner` is the Payload definition and `BannerBlock` renders it. They are separate exports because
typegen and the server config need the shape without dragging React into a context that cannot run
it ([[blocks]]/config).

Composes: [[law]].
