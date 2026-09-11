---
name: animal
description: "Use when the individual living beast is the node — one identified animal carrying its class (cow/heifer/steer/calf), sex, purpose (dairy/meat/breeding), lifecycle stage, ear-tag identity, and biological-asset value. The member of a herd; the row IAS-41 measures and traceability tags."
atomPath: "vocabulary/animal"
coordinate: "vocabulary/animal · 4/weave · d96396ea"
contentUuid: "b0f2e3aa-6d0e-5e91-8ea6-2d9532ebd080"
diamondUuid: "babbbd04-6fdf-8a1d-a491-0a275ac4a181"
uuid: "d96396ea-337d-80db-a17a-ab8ff23762b5"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 53
standards: []
bindings: []
signatures:
  computationUuid: "981321fa-2e54-8996-9dfa-5ebdc358accb"
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
      stageUuid: "ce46e45d-7e2c-8419-95e0-5de9245c1124"
    - stage: seal
      stageUuid: "477d255f-fd32-8692-a273-d2d95bac9325"
    - stage: uuid
      stageUuid: "922f6d67-ab2b-821b-a2c1-8d48fb83af09"
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
