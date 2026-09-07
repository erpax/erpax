---
name: animal
description: "Use when the individual living beast is the node — one identified animal carrying its class (cow/heifer/steer/calf), sex, purpose (dairy/meat/breeding), lifecycle stage, ear-tag identity, and biological-asset value. The member of a herd; the row IAS-41 measures and traceability tags."
atomPath: "vocabulary/animal"
coordinate: "vocabulary/animal · 1/base · 758225e5"
contentUuid: "135bc96b-4cb8-59a2-8d82-e9f6fe24a552"
diamondUuid: "c8ff3a4a-c2ea-8534-9c9a-85cfe9e598d0"
uuid: "758225e5-327c-80a8-a6f3-dd41a093fde4"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 53
standards: []
bindings: []
signatures:
  computationUuid: "44c8aa5e-ccc4-8cb5-88d1-5ab98434586f"
  stages:
    - stage: path
      stageUuid: "04682d3b-251f-87e6-ae7e-d957dc4660a9"
    - stage: trinity
      stageUuid: "20033922-c192-80c2-b220-6a126c92096d"
    - stage: boundary
      stageUuid: "bd90a491-40e9-8154-8498-aa33b30535d3"
    - stage: links
      stageUuid: "83deb471-7ccc-87d7-9343-a27685cc9933"
    - stage: horo
      stageUuid: "6f674815-3460-8a56-a3cb-9428c915de6c"
    - stage: seal
      stageUuid: "477d255f-fd32-8692-a273-d2d95bac9325"
    - stage: uuid
      stageUuid: "6f2d443a-ba78-871a-9c3b-ac447bbc5ac1"
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
