---
name: taxonomy
description: "Use when classifying entities into a ranked hierarchy — the family→genus→species→cultivar ladder for crops, and the generic ranked-classification engine for any LOD @type tree. A node's type is its rank-chain; traits inherit down the ranks (the fractal parent-chain), so taxonomy is the dimension atom applied to kind."
atomPath: taxonomy
coordinate: "taxonomy · 2/share · ddd0d853"
contentUuid: "58acffd3-aed5-522c-9998-b2359ec2b983"
diamondUuid: "f5412ce9-9a4f-8f3f-9436-2dc70717ce1a"
uuid: "ddd0d853-fed1-81f8-bc97-6c95b5990aa3"
horo: 2
typography:
  partition: taxonomy
  bondDegree: 50
standards: []
bindings: []
signatures:
  computationUuid: "f0242e14-6028-8c78-ac8f-0a01200716ba"
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
      stageUuid: "6abc5a49-99d3-889f-b648-f8171a62daea"
    - stage: seal
      stageUuid: "4dace892-8e45-8eea-8244-66e0c89953d3"
    - stage: uuid
      stageUuid: "6157c1b6-6e03-8d94-b77a-52ac814f6797"
version: 2
---
# taxonomy — the ranked classification ladder

**taxonomy** is classification into a ranked hierarchy. For crops the ladder is **family → genus → species → [[variant|cultivar]]** (e.g. Solanaceae → *Solanum* → *S. lycopersicum* → 'Brandywine'); the binomial (genus + species) is the Latin identity. Traits **inherit down the ranks** — a pest of the [[family]] threatens every species under it — so a crop's place in the ladder predicts its pests, [[fertility]] needs, and [[rotation]] group.

Generically, taxonomy is the [[dimension]] atom applied to *kind*: a node's type **is its rank-chain**, its archetype the root — the same self-referential parent-chain [[dimension]] computes ([[fractal]]: each rank a level of the one parent field). So crop taxonomy and any LOD `@type` hierarchy are one engine; the rank is computed from the path ([[identity]]), never a flat enum. [[family]] is its load-bearing rung for [[agriculture]].

## Standards
- ICN (International Code of Nomenclature for algae, fungi, plants); ICNCP (cultivated plants — the *cultivar* rank)
- *Knott's Handbook for Vegetable Growers* — vegetable taxonomy; Linnaean binomial nomenclature

Composes [[agriculture]] · [[family]] · [[crop]] · [[variant]] · [[dimension]] · [[fractal]] · [[identity]] · [[rotation]] · [[fertility]].
