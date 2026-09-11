---
name: banner
description: Use when reasoning about banner — is the Payload definition and renders it. They are separate exports because typegen and the server config need the shape without dragging React into a context that cannot run it…
atomPath: "blocks/banner"
coordinate: "blocks/banner · 7/descent · 4514dcec"
contentUuid: "cc20d1e6-2f47-5680-9db9-246836769cf6"
diamondUuid: "bfb41250-91cf-8b4a-982f-a8a7fdcd950a"
uuid: "4514dcec-8fdf-82e7-8da5-e43efa13586b"
horo: 7
typography:
  partition: blocks
  bondDegree: 6
standards:
  - "W3C-HTML5"
  - "W3C-WAI-ARIA-1.2"
bindings: []
signatures:
  computationUuid: "dc853714-378c-86b1-88a4-9069d432d67f"
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
      stageUuid: "d18b0575-c8c9-8636-b451-0271be112ece"
    - stage: seal
      stageUuid: "412cc769-15fa-8a4b-814d-70b0d8880f32"
    - stage: uuid
      stageUuid: "256330f4-d8f7-8332-b42c-9dac3b7d5d0b"
version: 2
---
# blocks/banner — the block's shape and the block's rendering, named separately

`Banner` is the Payload definition and `BannerBlock` renders it. They are separate exports because
typegen and the server config need the shape without dragging React into a context that cannot run
it ([[blocks]]/config).

Composes: [[law]].
