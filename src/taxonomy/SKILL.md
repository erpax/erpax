---
name: taxonomy
description: "Use when classifying entities into a ranked hierarchy — the family→genus→species→cultivar ladder for crops, and the generic ranked-classification engine for any LOD @type tree. A node's type is its rank-chain; traits inherit down the ranks (the fractal parent-chain), so taxonomy is the dimension atom applied to kind."
atomPath: taxonomy
coordinate: "taxonomy · 2/share · 1fb5e2c8"
contentUuid: "ee590cce-2076-5e28-9887-8de771ba9849"
diamondUuid: "1a425f7b-e2f1-86e5-8a98-edccaaaa7618"
uuid: "1fb5e2c8-40d5-8da8-acda-7b97f8ddefe7"
horo: 2
typography:
  partition: taxonomy
  bondDegree: 50
standards: []
bindings: []
signatures:
  computationUuid: "54f15d7d-ea46-8eb8-9853-c10380a2a2fa"
  stages:
    - stage: path
      stageUuid: "3b73f3b7-0cf5-8cda-a064-4db5fe2f4ad0"
    - stage: trinity
      stageUuid: "0fbc4338-5ccc-8003-b948-eece40f33b14"
    - stage: boundary
      stageUuid: "994c98f2-b22b-8fc7-9b5d-898f47c8c780"
    - stage: links
      stageUuid: "5daffa8e-1703-840e-a9e7-670dd02f672a"
    - stage: horo
      stageUuid: "41983fe0-c6ba-8a34-9a38-b6e02fca447e"
    - stage: seal
      stageUuid: "4dace892-8e45-8eea-8244-66e0c89953d3"
    - stage: uuid
      stageUuid: "348fb053-64e7-83c6-bf46-53c00939ec3e"
version: 2
---
# taxonomy — the ranked classification ladder

**taxonomy** is classification into a ranked hierarchy. For crops the ladder is **family → genus → species → [[variant|cultivar]]** (e.g. Solanaceae → *Solanum* → *S. lycopersicum* → 'Brandywine'); the binomial (genus + species) is the Latin identity. Traits **inherit down the ranks** — a pest of the [[family]] threatens every species under it — so a crop's place in the ladder predicts its pests, [[fertility]] needs, and [[rotation]] group.

Generically, taxonomy is the [[dimension]] atom applied to *kind*: a node's type **is its rank-chain**, its archetype the root — the same self-referential parent-chain [[dimension]] computes ([[fractal]]: each rank a level of the one parent field). So crop taxonomy and any LOD `@type` hierarchy are one engine; the rank is computed from the path ([[identity]]), never a flat enum. [[family]] is its load-bearing rung for [[agriculture]].

## Standards
- ICN (International Code of Nomenclature for algae, fungi, plants); ICNCP (cultivated plants — the *cultivar* rank)
- *Knott's Handbook for Vegetable Growers* — vegetable taxonomy; Linnaean binomial nomenclature

Composes [[agriculture]] · [[family]] · [[crop]] · [[variant]] · [[dimension]] · [[fractal]] · [[identity]] · [[rotation]] · [[fertility]].
