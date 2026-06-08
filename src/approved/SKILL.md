---
name: approved
description: "Use when tracking approval state or flag — approved flag on invoice (boolean), approved amount (in multi-step approval workflows), approved by (user reference), approved at (date). Workflow checkpoint status value."
atomPath: approved
coordinate: approved · 7/descent · 7692544f
contentUuid: "dba73c72-5bfa-5dcd-a70f-385b3665814f"
diamondUuid: "732a1d05-abb8-80d0-9942-e99d0e672938"
uuid: "7692544f-c780-820c-9e9c-a0103f7ed57c"
horo: 7
bonds:
  in:
    - audit
    - fields
    - indication
    - instances
    - status
    - workflow
  out:
    - audit
    - fields
    - indication
    - instances
    - status
    - workflow
typography:
  partition: approved
  bondDegree: 18
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - audit
    - fields
    - status
  matrix:
    - audit
    - fields
    - indication
    - instances
    - status
    - workflow
  backlinks:
    - audit
    - fields
    - indication
    - instances
    - status
    - workflow
signatures:
  computationUuid: "45bf5a5c-4835-8364-9e37-4f3ec6c6a93a"
  stages:
    - stage: path
      stageUuid: "9abda392-37e3-8542-8f01-d4e493cc18b6"
    - stage: trinity
      stageUuid: "f1e0ffc1-77eb-855e-8d3f-0da26582fcba"
    - stage: boundary
      stageUuid: "fdf06e75-6146-872f-903a-dd6190518da8"
    - stage: links
      stageUuid: "e5a866dc-9125-86cf-b088-af1553311028"
    - stage: horo
      stageUuid: "5a95fb43-5bc5-8a18-b07a-022ce4869557"
    - stage: seal
      stageUuid: "ddc1861a-74cd-83b5-a64d-31d75677bd4b"
    - stage: uuid
      stageUuid: "169fef4b-2d0b-84a2-a867-13df6afac6da"
version: 2
---
# approved

Use when tracking approval state or flag — approved flag on invoice (boolean), approved amount (in multi-step approval workflows), approved by (user reference), approved at (date). Workflow checkpoint status value.

Composes: [[status]] · [[fields]] · [[audit]].
