---
name: debounce
description: "Use when reasoning about debounce — holds a changing value still for a delay before releasing it, so a search field issues one request when typing stops instead of one per character."
atomPath: "use/debounce"
coordinate: "use/debounce · 1/base · e3a67b83"
contentUuid: "ca5fc6b8-bf97-5c67-a599-8b100dd0ee57"
diamondUuid: "20ad599c-5056-8b30-b39c-518855d78e7c"
uuid: "e3a67b83-f5d9-8ec1-b18c-cdd4bc16f711"
horo: 1
typography:
  partition: use
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "ddf9b578-964f-8ec3-a82e-ba222f7cb533"
  stages:
    - stage: path
      stageUuid: "02dd7f72-8905-8752-a51e-7a6432b1f5a0"
    - stage: trinity
      stageUuid: "0c338a52-c47a-80d7-b5ea-a7250de22263"
    - stage: boundary
      stageUuid: "f9b39abc-9218-8d29-893c-902e947726db"
    - stage: links
      stageUuid: "655788bf-963d-8b82-90ec-6cada671016c"
    - stage: horo
      stageUuid: "955a27ea-d76c-8930-bfd9-e2b27325530e"
    - stage: seal
      stageUuid: "d3d1c463-6600-84ae-8431-b6a2d9641a73"
    - stage: uuid
      stageUuid: "573689f1-ad38-874a-9385-fbbbdd325c45"
version: 2
---
# use/debounce — the keystroke is not the query

`useDebounce` holds a changing value still for a delay before releasing it, so a search field
issues one request when typing stops instead of one per character. The timer is cleared on every
change and on unmount, so a component that disappears mid-type leaves nothing pending.

Composes: [[law]].
