---
name: animal
description: "Use when the individual living beast is the node — one identified animal carrying its class (cow/heifer/steer/calf), sex, purpose (dairy/meat/breeding), lifecycle stage, ear-tag identity, and biological-asset value. The member of a herd; the row IAS-41 measures and traceability tags."
atomPath: animal
coordinate: animal · 1/base · 53fdce4c
contentUuid: "55adc80d-47b4-515a-b385-e65a68664ce5"
diamondUuid: "4c567b2a-5d8f-84f2-999a-bcb001904677"
uuid: "53fdce4c-7c4c-828e-a367-7bac08984bd0"
horo: 1
bonds:
  in:
    - assets
    - breed
    - fodder
    - harvest
    - health
    - herd
    - id
    - identity
    - lactation
    - law
    - lineage
    - livestock
    - maturity
    - mortality
    - shelter
    - withdrawal
  out:
    - assets
    - breed
    - fodder
    - harvest
    - health
    - herd
    - id
    - identity
    - lactation
    - law
    - lineage
    - livestock
    - maturity
    - mortality
    - shelter
    - withdrawal
typography:
  partition: animal
  bondDegree: 54
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - assets
    - breed
    - harvest
    - health
    - herd
    - id
    - identity
    - lactation
    - law
    - lineage
    - livestock
    - maturity
    - mortality
    - withdrawal
  matrix:
    - assets
    - breed
    - fodder
    - harvest
    - health
    - herd
    - id
    - identity
    - lactation
    - law
    - lineage
    - livestock
    - maturity
    - mortality
    - shelter
    - withdrawal
  backlinks:
    - assets
    - breed
    - fodder
    - harvest
    - health
    - herd
    - id
    - identity
    - lactation
    - law
    - lineage
    - livestock
    - maturity
    - mortality
    - shelter
    - withdrawal
signatures:
  computationUuid: "c3c5a989-6294-8399-b7a5-c68f48029d28"
  stages:
    - stage: path
      stageUuid: "42a292bc-9713-8612-af7d-8969b90b238d"
    - stage: trinity
      stageUuid: "dee3bc87-d791-8884-b160-06135fe611f6"
    - stage: boundary
      stageUuid: "0be5401f-e18d-80b5-8776-dde3546813ef"
    - stage: links
      stageUuid: "f6d26117-412c-8ce3-9dbb-91c44e019121"
    - stage: horo
      stageUuid: "c38dd6b6-b0c6-8445-9e72-d6fc5268bea6"
    - stage: seal
      stageUuid: "1e4000fc-5fa5-8cf6-8189-9ee56ac79baa"
    - stage: uuid
      stageUuid: "4ccd962e-7cac-86c7-aacb-bc6076bc3f4a"
version: 2
---
# animal — the individual living beast; the member of a herd

An **animal** is one identified living beast — the member of a [[herd]] and the row a [[biological/assets|biological asset]] is measured on. It carries its **class** (cow/heifer/steer/bull/calf, ewe/ram/lamb, sow/boar/piglet, layer/broiler — an enum, not separate atoms), **sex**, **purpose** (dairy/meat/fiber/breeding), and **lifecycle [[maturity]] stage** (weaner → yearling → finished/lactating → cull). Its official ear-tag / RFID is its [[identity]] ([[id]]); its parentage is [[lineage]] (pedigree, sire/dam).

The animal is where the husbandry atoms attach: its [[health]] record (vaccination, the [[withdrawal]] embargo), its [[breed]], its [[lactation]] or finishing, and at [[harvest]] its produce (milk/wool/eggs) or carcass. Death is a [[mortality]] event that de-recognizes the asset. Held-for-sale vs breeding is a [[biological/assets]] classification (both stay IAS-41).

**Law — [[law]]: the individual identified beast is the node — one animal carrying its class/sex/purpose/lifecycle stage, keyed by its ear-tag/RFID [[identity]] — and it is the row a [[biological/assets]] asset is measured on and to which every husbandry atom attaches.**

## Standards
- USDA APHIS ADT (official animal ID, premises ID, traceability); IFRS IAS-41
- USDA AMS (animal classes); WOAH (animal health/welfare)

Composes [[livestock]] · [[herd]] · [[biological/assets]] · [[maturity]] · [[breed]] · [[lactation]] · [[health]] · [[withdrawal]] · [[harvest]] · [[mortality]] · [[identity]] · [[id]] · [[lineage]].
