---
name: banner
description: Use when reasoning about banner — is the Payload definition and renders it. They are separate exports because typegen and the server config need the shape without dragging React into a context that cannot run it…
atomPath: "blocks/banner"
coordinate: "blocks/banner · 5/round · 515c8759"
contentUuid: "ad5855c5-6bd7-5e31-92f0-dc982d19bba3"
diamondUuid: "8517a512-f0b9-82e8-80f3-bdfd59d37958"
uuid: "515c8759-9ff3-820a-ba07-b06804b2629b"
horo: 5
typography:
  partition: blocks
  bondDegree: 6
standards:
  - "W3C-HTML5"
  - "W3C-WAI-ARIA-1.2"
bindings: []
signatures:
  computationUuid: "8a08c68d-c982-8d14-88a7-23011a48b502"
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
      stageUuid: "e83ff783-256d-8e87-8f97-1904c5a80b8f"
    - stage: seal
      stageUuid: "412cc769-15fa-8a4b-814d-70b0d8880f32"
    - stage: uuid
      stageUuid: "c3f84627-c05d-8bd6-b3f6-d02640bdc05b"
version: 2
---
# blocks/banner — the block's shape and the block's rendering, named separately

`Banner` is the Payload definition and `BannerBlock` renders it. They are separate exports because
typegen and the server config need the shape without dragging React into a context that cannot run
it ([[blocks]]/config).

Composes: [[law]].
