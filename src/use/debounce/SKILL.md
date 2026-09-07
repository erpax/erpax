---
name: debounce
description: "Use when reasoning about debounce — holds a changing value still for a delay before releasing it, so a search field issues one request when typing stops instead of one per character."
atomPath: "use/debounce"
coordinate: "use/debounce · 8/crest · 80deaa57"
contentUuid: "2f90424d-0f3a-5bed-8f60-08ea16519673"
diamondUuid: "eb40de00-66c0-8499-9feb-0d0c6627bdae"
uuid: "80deaa57-4907-82df-86ed-c2d2a77ae867"
horo: 8
typography:
  partition: use
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "9a6ea53e-fdc0-8b52-ac9f-2c9ebd514811"
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
      stageUuid: "856a4a1c-69fa-87c5-8eee-819673096ee5"
    - stage: seal
      stageUuid: "d3d1c463-6600-84ae-8431-b6a2d9641a73"
    - stage: uuid
      stageUuid: "75c15afd-1732-8237-ab63-ed4fcc766832"
version: 2
---
# use/debounce — the keystroke is not the query

`useDebounce` holds a changing value still for a delay before releasing it, so a search field
issues one request when typing stops instead of one per character. The timer is cleared on every
change and on unmount, so a component that disappears mid-type leaves nothing pending.

Composes: [[law]].
