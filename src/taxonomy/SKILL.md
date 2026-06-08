---
name: taxonomy
description: "Use when classifying entities into a ranked hierarchy — the family→genus→species→cultivar ladder for crops, and the generic ranked-classification engine for any LOD @type tree. A node's type is its rank-chain; traits inherit down the ranks (the fractal parent-chain), so taxonomy is the dimension atom applied to kind."
atomPath: taxonomy
coordinate: taxonomy · 7/descent · 228481dc
contentUuid: "659908e1-3c86-5be0-b1c0-5ed0bc348914"
diamondUuid: "b102b20c-b366-8dbf-8cc1-7e03e9a95792"
uuid: "228481dc-cb5e-8745-9715-eccd45e6de8c"
horo: 7
bonds:
  in:
    - agriculture
    - aquaculture
    - breed
    - classification
    - crop
    - dimension
    - family
    - fertility
    - fractal
    - graft
    - hardiness
    - identity
    - rootstock
    - rotation
    - scion
    - variant
  out:
    - agriculture
    - aquaculture
    - breed
    - classification
    - crop
    - dimension
    - family
    - fertility
    - fractal
    - graft
    - hardiness
    - identity
    - rootstock
    - rotation
    - scion
    - variant
typography:
  partition: taxonomy
  bondDegree: 50
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - crop
    - dimension
    - family
    - fertility
    - fractal
    - identity
    - rotation
    - variant
  matrix:
    - agriculture
    - aquaculture
    - breed
    - classification
    - crop
    - dimension
    - family
    - fertility
    - fractal
    - graft
    - hardiness
    - identity
    - rootstock
    - rotation
    - scion
    - variant
  backlinks:
    - agriculture
    - aquaculture
    - breed
    - classification
    - crop
    - dimension
    - family
    - fertility
    - fractal
    - graft
    - hardiness
    - identity
    - rootstock
    - rotation
    - scion
    - variant
signatures:
  computationUuid: "32d7cb85-d106-808e-8c54-8ab67693d095"
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
      stageUuid: "175f1737-f804-85d8-8493-fbbd681a43c8"
    - stage: seal
      stageUuid: "e628deb0-c65c-8fdb-9cc6-2304e575e508"
    - stage: uuid
      stageUuid: "919d910b-9d34-890d-8f36-a88ce5cd4768"
version: 2
---
# taxonomy — the ranked classification ladder

**taxonomy** is classification into a ranked hierarchy. For crops the ladder is **family → genus → species → [[variant|cultivar]]** (e.g. Solanaceae → *Solanum* → *S. lycopersicum* → 'Brandywine'); the binomial (genus + species) is the Latin identity. Traits **inherit down the ranks** — a pest of the [[family]] threatens every species under it — so a crop's place in the ladder predicts its pests, [[fertility]] needs, and [[rotation]] group.

Generically, taxonomy is the [[dimension]] atom applied to *kind*: a node's type **is its rank-chain**, its archetype the root — the same self-referential parent-chain [[dimension]] computes ([[fractal]]: each rank a level of the one parent field). So crop taxonomy and any LOD `@type` hierarchy are one engine; the rank is computed from the path ([[identity]]), never a flat enum. [[family]] is its load-bearing rung for [[agriculture]].

## Standards
- ICN (International Code of Nomenclature for algae, fungi, plants); ICNCP (cultivated plants — the *cultivar* rank)
- *Knott's Handbook for Vegetable Growers* — vegetable taxonomy; Linnaean binomial nomenclature

Composes [[agriculture]] · [[family]] · [[crop]] · [[variant]] · [[dimension]] · [[fractal]] · [[identity]] · [[rotation]] · [[fertility]].
