---
name: debounce
description: "Use when reasoning about debounce — holds a changing value still for a delay before releasing it, so a search field issues one request when typing stops instead of one per character."
atomPath: "use/debounce"
coordinate: "use/debounce · 8/crest · 61c45da6"
contentUuid: "c663eb9d-8474-5455-861f-c0612ec3548a"
diamondUuid: "9e32af1d-1c83-8256-9be7-cf58256d8b86"
uuid: "61c45da6-b04f-85eb-84d3-84dfe7f6db74"
horo: 8
typography:
  partition: use
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "f5a3469f-9161-8cec-8609-0aca68603827"
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
      stageUuid: "378f5466-3c4a-8dec-89c1-b36c8c3d69f4"
    - stage: seal
      stageUuid: "d3d1c463-6600-84ae-8431-b6a2d9641a73"
    - stage: uuid
      stageUuid: "3ce97e3a-36b5-8046-99bd-c516b5288221"
version: 2
---
# use/debounce — the keystroke is not the query

`useDebounce` holds a changing value still for a delay before releasing it, so a search field
issues one request when typing stops instead of one per character. The timer is cleared on every
change and on unmount, so a component that disappears mid-type leaves nothing pending.

Composes: [[law]].
