---
name: groups
description: "Use when reasoning about groups — names the one-word parents that root vocabulary nests under, and derives each atom's admin group from its path prefix. decides membership."
atomPath: "navigation/groups"
coordinate: "navigation/groups · 2/share · c556bed9"
contentUuid: "5a5771c3-1ca2-5240-8d30-bbfeffc9a63c"
diamondUuid: "7ae39f37-d07b-82ff-89ab-d2f78e0b53d7"
uuid: "c556bed9-a3ef-83ff-8f1d-0a2d95f64219"
horo: 2
typography:
  partition: navigation
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "3b5e70eb-1944-85a4-8688-cc75c62bed39"
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
      stageUuid: "ad3be1e8-878d-8482-8824-70018283bd48"
    - stage: seal
      stageUuid: "0e2937a8-77c0-8866-8775-4ebc9bb189a3"
    - stage: uuid
      stageUuid: "69822b29-bcec-8234-8970-0ce17190c016"
version: 2
---
# navigation/groups — a flat vocabulary of thousands is not browsable, so the trie gets hubs

`NAV_HUBS` names the one-word parents that root vocabulary nests under, and `navPathsForGrouping`
derives each atom's admin group from its path prefix. `isNavHub` decides membership.

Nav, `admin.group` and the sidebar all read the same prefix tree, so a folder move re-groups the
UI without anyone editing a menu.

Composes: [[path]] · [[law]].
