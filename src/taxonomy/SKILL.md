---
name: taxonomy
description: "Use when classifying entities into a ranked hierarchy — the family→genus→species→cultivar ladder for crops, and the generic ranked-classification engine for any LOD @type tree. A node's type is its rank-chain; traits inherit down the ranks (the fractal parent-chain), so taxonomy is the dimension atom applied to kind."
atomPath: taxonomy
coordinate: "taxonomy · 1/base · 9d2aaa81"
contentUuid: "0575d835-eda6-5248-abd5-7f33b43fd2e0"
diamondUuid: "d486423a-c021-8044-ace6-04b77c7554ba"
uuid: "9d2aaa81-22e7-83c2-b171-68d7a202e69f"
horo: 1
typography:
  partition: taxonomy
  bondDegree: 50
standards: []
bindings: []
signatures:
  computationUuid: "8183ffa7-0b82-83fa-bf28-9176d861713c"
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
      stageUuid: "c119e1f6-a6ae-8ec9-9746-f420b5396108"
    - stage: seal
      stageUuid: "4dace892-8e45-8eea-8244-66e0c89953d3"
    - stage: uuid
      stageUuid: "ba980b32-4bec-8ff2-9157-66e97bd952c5"
version: 2
---
# taxonomy — the ranked classification ladder

**taxonomy** is classification into a ranked hierarchy. For crops the ladder is **family → genus → species → [[variant|cultivar]]** (e.g. Solanaceae → *Solanum* → *S. lycopersicum* → 'Brandywine'); the binomial (genus + species) is the Latin identity. Traits **inherit down the ranks** — a pest of the [[family]] threatens every species under it — so a crop's place in the ladder predicts its pests, [[fertility]] needs, and [[rotation]] group.

Generically, taxonomy is the [[dimension]] atom applied to *kind*: a node's type **is its rank-chain**, its archetype the root — the same self-referential parent-chain [[dimension]] computes ([[fractal]]: each rank a level of the one parent field). So crop taxonomy and any LOD `@type` hierarchy are one engine; the rank is computed from the path ([[identity]]), never a flat enum. [[family]] is its load-bearing rung for [[agriculture]].

## Standards
- ICN (International Code of Nomenclature for algae, fungi, plants); ICNCP (cultivated plants — the *cultivar* rank)
- *Knott's Handbook for Vegetable Growers* — vegetable taxonomy; Linnaean binomial nomenclature

Composes [[agriculture]] · [[family]] · [[crop]] · [[variant]] · [[dimension]] · [[fractal]] · [[identity]] · [[rotation]] · [[fertility]].
