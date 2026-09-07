---
name: taxonomy
description: "Use when classifying entities into a ranked hierarchy — the family→genus→species→cultivar ladder for crops, and the generic ranked-classification engine for any LOD @type tree. A node's type is its rank-chain; traits inherit down the ranks (the fractal parent-chain), so taxonomy is the dimension atom applied to kind."
atomPath: taxonomy
coordinate: "taxonomy · 2/share · aba30457"
contentUuid: "40c11729-c127-5544-be9c-a7566d8b37da"
diamondUuid: "057df5db-f27f-8f1b-a35f-d1f37017b4f4"
uuid: "aba30457-6498-803d-a0d2-e34c57879b83"
horo: 2
typography:
  partition: taxonomy
  bondDegree: 50
standards: []
bindings: []
signatures:
  computationUuid: "c8956c64-137a-8ed8-b77b-e9fb12080e6d"
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
      stageUuid: "5d4bdb50-a304-8560-8c06-91c4e7f323d0"
    - stage: seal
      stageUuid: "4dace892-8e45-8eea-8244-66e0c89953d3"
    - stage: uuid
      stageUuid: "51105777-f4bd-8166-b392-08990edf2e26"
version: 2
---
# taxonomy — the ranked classification ladder

**taxonomy** is classification into a ranked hierarchy. For crops the ladder is **family → genus → species → [[variant|cultivar]]** (e.g. Solanaceae → *Solanum* → *S. lycopersicum* → 'Brandywine'); the binomial (genus + species) is the Latin identity. Traits **inherit down the ranks** — a pest of the [[family]] threatens every species under it — so a crop's place in the ladder predicts its pests, [[fertility]] needs, and [[rotation]] group.

Generically, taxonomy is the [[dimension]] atom applied to *kind*: a node's type **is its rank-chain**, its archetype the root — the same self-referential parent-chain [[dimension]] computes ([[fractal]]: each rank a level of the one parent field). So crop taxonomy and any LOD `@type` hierarchy are one engine; the rank is computed from the path ([[identity]]), never a flat enum. [[family]] is its load-bearing rung for [[agriculture]].

## Standards
- ICN (International Code of Nomenclature for algae, fungi, plants); ICNCP (cultivated plants — the *cultivar* rank)
- *Knott's Handbook for Vegetable Growers* — vegetable taxonomy; Linnaean binomial nomenclature

Composes [[agriculture]] · [[family]] · [[crop]] · [[variant]] · [[dimension]] · [[fractal]] · [[identity]] · [[rotation]] · [[fertility]].
