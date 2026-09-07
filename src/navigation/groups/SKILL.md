---
name: groups
description: "Use when reasoning about groups — names the one-word parents that root vocabulary nests under, and derives each atom's admin group from its path prefix. decides membership."
atomPath: "navigation/groups"
coordinate: "navigation/groups · 2/share · e2ec5c12"
contentUuid: "6210e2c1-4653-5f20-a9f7-a70ab9b2d474"
diamondUuid: "4ea9bb0b-3d39-8746-b82a-dada076a334e"
uuid: "e2ec5c12-8058-8686-b1f5-354c45724f28"
horo: 2
typography:
  partition: navigation
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "f840208e-87aa-8072-ae6c-b48ba6156567"
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
      stageUuid: "b99ba497-e928-8a78-b373-ae87d3875f65"
    - stage: seal
      stageUuid: "0e2937a8-77c0-8866-8775-4ebc9bb189a3"
    - stage: uuid
      stageUuid: "70213b85-9c64-8e9e-95b6-af5ce3120560"
version: 2
---
# navigation/groups — a flat vocabulary of thousands is not browsable, so the trie gets hubs

`NAV_HUBS` names the one-word parents that root vocabulary nests under, and `navPathsForGrouping`
derives each atom's admin group from its path prefix. `isNavHub` decides membership.

Nav, `admin.group` and the sidebar all read the same prefix tree, so a folder move re-groups the
UI without anyone editing a menu.

Composes: [[path]] · [[law]].
