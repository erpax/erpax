---
name: breed
description: "Use when classifying an animal by its genetic type — the breed (Angus, Holstein, Yorkshire), a genetically distinct sub-population with stable heritable traits, recorded in a breed registry with pedigree; and breeding (mating selection, AI, gestation). The animal-genetics classifier — distinct from taxonomy (the crop-variety tree)."
atomPath: breed
coordinate: breed · 4/weave · 558bdd0d
contentUuid: "bad82897-00bd-57a8-8a64-fe81dc98fb74"
diamondUuid: "3d9f0c04-b1ed-8616-a7d0-e931669f25f8"
uuid: "558bdd0d-0245-8f99-a499-5a8bfd217f48"
horo: 4
bonds:
  in:
    - animal
    - assets
    - cohort
    - forecast
    - herd
    - lactation
    - law
    - lineage
    - livestock
    - metric
    - period
    - science
    - taxonomy
  out:
    - animal
    - assets
    - cohort
    - forecast
    - herd
    - lactation
    - law
    - lineage
    - livestock
    - metric
    - period
    - science
    - taxonomy
typography:
  partition: breed
  bondDegree: 41
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - animal
    - assets
    - cohort
    - forecast
    - law
    - lineage
    - livestock
    - metric
    - period
    - taxonomy
  matrix:
    - animal
    - assets
    - cohort
    - forecast
    - herd
    - lactation
    - law
    - lineage
    - livestock
    - metric
    - period
    - science
    - taxonomy
  backlinks:
    - animal
    - assets
    - cohort
    - forecast
    - herd
    - lactation
    - law
    - lineage
    - livestock
    - metric
    - period
    - science
    - taxonomy
signatures:
  computationUuid: "aca4c7c7-f601-8ef2-b8ba-77382d45af15"
  stages:
    - stage: path
      stageUuid: "87f187cc-563d-8582-a4f3-2902f46b10f2"
    - stage: trinity
      stageUuid: "9f2be44c-1c7a-809d-ac55-7d2d83e2c7cf"
    - stage: boundary
      stageUuid: "f4288fcd-3a49-89b1-8386-371a7e4aa2cb"
    - stage: links
      stageUuid: "56cef5f3-c753-8c8f-94d0-d9b90a3381af"
    - stage: horo
      stageUuid: "c7d660fa-a38d-8bd2-b21a-e32cb24d4b44"
    - stage: seal
      stageUuid: "5bfdce37-2477-8a9d-bdb6-faa83c04f6ae"
    - stage: uuid
      stageUuid: "24361a32-8186-837d-b136-8a5d7007a5e0"
version: 2
---
# breed — the animal's genetic type; the breeding selection

A **breed** is a genetically distinct sub-population of a species with stable heritable traits (Angus, Holstein, Yorkshire) — the [[animal]]-genetics classifier, recorded in a **breed registry** with a **pedigree** ([[lineage]]: sire/dam ancestry). It is the animal twin of the crop [[taxonomy|cultivar]] — kept *distinct* from [[taxonomy]] (which classifies crop species/variety) so genetics is not conflated.

**Breeding** is the reproductive-selection program acting on the breed: mating decisions, artificial insemination, **gestation** (a [[period]]), parturition, weaning. Genetic merit is a computed [[metric]] / [[forecast]] (the EPD — expected progeny difference); the next generation is the calf/lamb crop (a [[cohort]]). Breeding stock is a held [[biological/assets|biological asset]] (not held-for-sale).

## Standards
- Breed registries / herdbooks; land-grant animal-science extension (EPDs, genomic selection)
- IFRS IAS-41 (breeding stock as biological assets); FAO (animal genetic resources)

Composes [[animal]] · [[livestock]] · [[lineage]] · [[taxonomy]] · [[period]] · [[metric]] · [[forecast]] · [[cohort]] · [[biological/assets]].

**Law — [[law]]: a breed is the animal-genetics classifier — a genetically distinct sub-population with stable heritable traits and pedigree — kept distinct from crop [[taxonomy]] so genetics is never conflated; breeding stock is a held [[biological/assets|biological asset]].**
