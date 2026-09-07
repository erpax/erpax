---
name: groups
description: "Use when reasoning about groups — names the one-word parents that root vocabulary nests under, and derives each atom's admin group from its path prefix. decides membership."
atomPath: "navigation/groups"
coordinate: "navigation/groups · 1/base · 9c932e63"
contentUuid: "2447bbcf-a1e8-53fb-b09e-da5f64e2f935"
diamondUuid: "05cb3527-7910-820f-b974-1f7ad36a4bad"
uuid: "9c932e63-7049-8131-8b00-e03ca6a391f8"
horo: 1
typography:
  partition: navigation
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "d3dbcecd-1161-82ad-a2b7-03271b665627"
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
      stageUuid: "dc31cc5b-76d0-88b3-b888-f4d5acf6224a"
    - stage: seal
      stageUuid: "0e2937a8-77c0-8866-8775-4ebc9bb189a3"
    - stage: uuid
      stageUuid: "0b64cd29-7b76-8452-b6eb-ae16aa06462e"
version: 2
---
# navigation/groups — a flat vocabulary of thousands is not browsable, so the trie gets hubs

`NAV_HUBS` names the one-word parents that root vocabulary nests under, and `navPathsForGrouping`
derives each atom's admin group from its path prefix. `isNavHub` decides membership.

Nav, `admin.group` and the sidebar all read the same prefix tree, so a folder move re-groups the
UI without anyone editing a menu.

Composes: [[path]] · [[law]].
