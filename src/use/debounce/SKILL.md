---
name: debounce
description: "Use when reasoning about debounce — holds a changing value still for a delay before releasing it, so a search field issues one request when typing stops instead of one per character."
atomPath: "use/debounce"
coordinate: "use/debounce · 7/descent · 6f251155"
contentUuid: "4c6174e6-0bdf-590d-8b2c-9fe475bd9dce"
diamondUuid: "c2e3dfe3-cef3-845f-8633-446a4d65b302"
uuid: "6f251155-60d4-8219-9988-80240767522c"
horo: 7
typography:
  partition: use
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "39efcc82-d942-8b08-be1d-9f5596486515"
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
      stageUuid: "fd8c0b97-3ebf-8fc9-a8b7-a83b637a9b71"
    - stage: seal
      stageUuid: "d3d1c463-6600-84ae-8431-b6a2d9641a73"
    - stage: uuid
      stageUuid: "2add8c3b-c2b4-8318-ab4e-3603f29544a3"
version: 2
---
# use/debounce — the keystroke is not the query

`useDebounce` holds a changing value still for a delay before releasing it, so a search field
issues one request when typing stops instead of one per character. The timer is cleared on every
change and on unmount, so a component that disappears mid-type leaves nothing pending.

Composes: [[law]].
