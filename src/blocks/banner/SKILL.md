---
name: banner
description: Use when reasoning about banner — is the Payload definition and renders it. They are separate exports because typegen and the server config need the shape without dragging React into a context that cannot run it…
atomPath: "blocks/banner"
coordinate: "blocks/banner · 8/crest · 45eb1b53"
contentUuid: "0bd1dc7f-b77f-53aa-a2d8-165ddb559ca8"
diamondUuid: "6f6e7228-830d-8599-97fc-82d5b11cad93"
uuid: "45eb1b53-2a09-831d-9290-f5c2919db8dd"
horo: 8
typography:
  partition: blocks
  bondDegree: 6
standards:
  - "W3C-HTML5"
  - "W3C-WAI-ARIA-1.2"
bindings: []
signatures:
  computationUuid: "a8664a92-3d9d-8ab9-b71a-008fc1703728"
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
      stageUuid: "490589f5-c6fd-8ca8-b326-c06fe8c589d5"
    - stage: seal
      stageUuid: "412cc769-15fa-8a4b-814d-70b0d8880f32"
    - stage: uuid
      stageUuid: "dca87be3-bd2e-863a-ac4e-86bf865cace2"
version: 2
---
# blocks/banner — the block's shape and the block's rendering, named separately

`Banner` is the Payload definition and `BannerBlock` renders it. They are separate exports because
typegen and the server config need the shape without dragging React into a context that cannot run
it ([[blocks]]/config).

Composes: [[law]].
