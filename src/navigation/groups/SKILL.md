---
name: groups
description: "Use when reasoning about groups — names the one-word parents that root vocabulary nests under, and derives each atom's admin group from its path prefix. decides membership."
atomPath: "navigation/groups"
coordinate: "navigation/groups · 8/crest · 5dc13001"
contentUuid: "7d0f1cc2-5f89-5f89-b434-67c5f80ebc70"
diamondUuid: "5ade5e13-5700-803a-ba6a-d9bbc18f25bd"
uuid: "5dc13001-4415-8813-8482-80fe2b0e845b"
horo: 8
typography:
  partition: navigation
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "bb9063ed-9d29-8510-bf5d-b8c85bd624b0"
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
      stageUuid: "ccb98f74-cda9-8fe0-b810-bcafcee30a43"
    - stage: seal
      stageUuid: "0e2937a8-77c0-8866-8775-4ebc9bb189a3"
    - stage: uuid
      stageUuid: "7dbf110e-a3ac-8477-a3ac-4e969287d5ce"
version: 2
---
# navigation/groups — a flat vocabulary of thousands is not browsable, so the trie gets hubs

`NAV_HUBS` names the one-word parents that root vocabulary nests under, and `navPathsForGrouping`
derives each atom's admin group from its path prefix. `isNavHub` decides membership.

Nav, `admin.group` and the sidebar all read the same prefix tree, so a folder move re-groups the
UI without anyone editing a menu.

Composes: [[path]] · [[law]].
