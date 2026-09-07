---
name: debounce
description: "Use when reasoning about debounce — holds a changing value still for a delay before releasing it, so a search field issues one request when typing stops instead of one per character."
atomPath: "use/debounce"
coordinate: "use/debounce · 1/base · 52136760"
contentUuid: "2f1d673c-ab23-506c-ae2f-f3932cb5ea2c"
diamondUuid: "c5224288-f375-8d52-b4dc-f7f44df602c0"
uuid: "52136760-bbcf-88bb-81b4-160f09d593a4"
horo: 1
typography:
  partition: use
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "0820461c-904e-844f-b103-ffdcb50c7c6b"
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
      stageUuid: "560bdaed-2235-898d-af50-9c491afb9807"
    - stage: seal
      stageUuid: "d3d1c463-6600-84ae-8431-b6a2d9641a73"
    - stage: uuid
      stageUuid: "f9fe1904-6cdc-8b98-b8ad-fffcad67e96d"
version: 2
---
# use/debounce — the keystroke is not the query

`useDebounce` holds a changing value still for a delay before releasing it, so a search field
issues one request when typing stops instead of one per character. The timer is cleared on every
change and on unmount, so a component that disappears mid-type leaves nothing pending.

Composes: [[law]].
