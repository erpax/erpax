---
name: animal
description: "Use when the individual living beast is the node — one identified animal carrying its class (cow/heifer/steer/calf), sex, purpose (dairy/meat/breeding), lifecycle stage, ear-tag identity, and biological-asset value. The member of a herd; the row IAS-41 measures and traceability tags."
atomPath: "vocabulary/animal"
coordinate: "vocabulary/animal · 2/share · 6b79bf5f"
contentUuid: "80abdf9b-b4de-53df-9e5c-433dc2b54203"
diamondUuid: "1d624c77-6a10-80de-b8e0-272724a08268"
uuid: "6b79bf5f-6947-8ede-a412-c453986bd6a1"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 53
standards: []
bindings: []
signatures:
  computationUuid: "85eb808a-711a-8ec4-991a-8b801c910674"
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
      stageUuid: "1aa92789-33ce-8a82-99df-e05b40a35ce7"
    - stage: seal
      stageUuid: "477d255f-fd32-8692-a273-d2d95bac9325"
    - stage: uuid
      stageUuid: "d01b4750-126c-889d-b316-f34b4f8ed00a"
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
