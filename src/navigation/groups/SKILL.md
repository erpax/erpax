---
name: groups
description: "Use when reasoning about groups — names the one-word parents that root vocabulary nests under, and derives each atom's admin group from its path prefix. decides membership."
atomPath: "navigation/groups"
coordinate: "navigation/groups · 5/round · 2ac3cc4e"
contentUuid: "1e07b850-dece-5b07-9042-abfb1207ee9e"
diamondUuid: "b48b7742-2c22-8535-be35-07dfb1071ebe"
uuid: "2ac3cc4e-9dcf-85a6-a359-a33d3ea93eb2"
horo: 5
typography:
  partition: navigation
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "f64828f9-824c-8d1c-baaf-5da4acc703fc"
  stages:
    - stage: path
      stageUuid: "8e1eb878-eb68-8033-9760-9e675fc91d23"
    - stage: trinity
      stageUuid: "ca84534e-5600-85f7-b1f4-cf684388b5ba"
    - stage: boundary
      stageUuid: "eb9479f9-113d-8c72-87bb-6e5298108846"
    - stage: links
      stageUuid: "d5f201fb-c0d4-890e-bddf-335b0330c3ff"
    - stage: horo
      stageUuid: "b1695744-d369-8484-ad2d-afac3fdf4462"
    - stage: seal
      stageUuid: "0e2937a8-77c0-8866-8775-4ebc9bb189a3"
    - stage: uuid
      stageUuid: "4aaa4a72-3782-86d2-b9d7-bdcb53d030a7"
version: 2
---
# navigation/groups — a flat vocabulary of thousands is not browsable, so the trie gets hubs

`NAV_HUBS` names the one-word parents that root vocabulary nests under, and `navPathsForGrouping`
derives each atom's admin group from its path prefix. `isNavHub` decides membership.

Nav, `admin.group` and the sidebar all read the same prefix tree, so a folder move re-groups the
UI without anyone editing a menu.

Composes: [[path]] · [[law]].
