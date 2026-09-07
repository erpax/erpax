---
name: debounce
description: "Use when reasoning about debounce — holds a changing value still for a delay before releasing it, so a search field issues one request when typing stops instead of one per character."
atomPath: "use/debounce"
coordinate: "use/debounce · 4/weave · 2e3d5018"
contentUuid: "df7e6317-8935-57e7-a395-f204c6985014"
diamondUuid: "704f006a-7f36-86fa-b200-04559bcae04f"
uuid: "2e3d5018-8812-8076-8472-08eddd6e63f0"
horo: 4
typography:
  partition: use
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "405ff13c-0dc8-8f5d-babe-1a5477727124"
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
      stageUuid: "2cd989d7-a30b-8253-b88c-e8a41e80ad30"
    - stage: seal
      stageUuid: "d3d1c463-6600-84ae-8431-b6a2d9641a73"
    - stage: uuid
      stageUuid: "f4c8d75f-72c1-8d3e-8440-4ce65f825d29"
version: 2
---
# use/debounce — the keystroke is not the query

`useDebounce` holds a changing value still for a delay before releasing it, so a search field
issues one request when typing stops instead of one per character. The timer is cleared on every
change and on unmount, so a component that disappears mid-type leaves nothing pending.

Composes: [[law]].
