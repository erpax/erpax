---
name: pivot
description: "Use when folder README models need cross-tab state statistics — axis × count tables and before/after comparisons for seal, balance, gravity, folder law, horo ring, and typography partitions; pure markdown projection for [[readme]]."
atomPath: pivot
coordinate: pivot · 2/share · 64bb5f4c
contentUuid: "b8bac0c0-a3d5-5def-99df-4c99ef99bb14"
diamondUuid: "90822a11-2f2a-8b9b-863b-d253935db1cd"
uuid: "64bb5f4c-a49b-81e3-a7d8-aca69ad0feff"
horo: 2
bonds:
  in:
    - analytics
    - balance
    - folder
    - gravity
    - horo
    - law
    - readme
    - seal
    - typography
  out:
    - analytics
    - balance
    - folder
    - gravity
    - horo
    - law
    - readme
    - seal
    - typography
typography:
  partition: pivot
  bondDegree: 29
  neighbors:
    - analytics
standards:
  - "ISO/IEC 25010:2023 §5.2.8 modularity — pure fns, no I/O"
  - "every count is derived from model fields, never hand-set"
bindings: []
neighbors:
  wikilink:
    - analytics
    - balance
    - folder
    - gravity
    - horo
    - law
    - readme
    - seal
    - typography
  matrix:
    - analytics
    - balance
    - folder
    - gravity
    - horo
    - law
    - readme
    - seal
    - typography
  backlinks:
    - analytics
    - balance
    - folder
    - gravity
    - horo
    - law
    - readme
    - seal
    - typography
signatures:
  computationUuid: "48bf500d-ed17-827a-a85f-06a4365bd42f"
  stages:
    - stage: path
      stageUuid: "673469fc-07e9-8993-85b6-5728bb6601fd"
    - stage: trinity
      stageUuid: "529df31d-746f-8f44-92a2-9dc10251cdef"
    - stage: boundary
      stageUuid: "64e6c98b-ffcc-8873-b4ac-c3b406717d43"
    - stage: links
      stageUuid: "6d343b1d-1396-8fb0-afba-a3264dc82c7e"
    - stage: horo
      stageUuid: "5b03a1ec-f665-8e98-9143-03e093179661"
    - stage: seal
      stageUuid: "f909b771-3451-8006-9026-53669f60ca78"
    - stage: uuid
      stageUuid: "8f9d28f1-91ff-81dc-a1fb-21c2625cc85c"
version: 2
---
# pivot — cross-tab state statistics for README models

**Pivot** folds many `FolderReadmeModel` rows into **axis × state** count tables — the spreadsheet cross-tab of corpus health. `pivotFolderStats` rolls seal / balance / gravity / name / trinity / horo / bond-degree / partition; `pivotFolderComparison` diffs two snapshots; `renderPivotMarkdown` projects tables into markdown for the root and per-folder README faces.

Composes [[readme]] · [[analytics]] · [[seal]] · [[balance]] · [[gravity]] · [[horo]] · [[law/folder]] · [[typography]].

**Law — [[law]]: corpus state statistics are cross-tabbed, never hand-counted — every cell is derived from folder README models and projected as markdown pivot tables with optional before/after comparison.**
