---
name: animal
description: "Use when the individual living beast is the node — one identified animal carrying its class (cow/heifer/steer/calf), sex, purpose (dairy/meat/breeding), lifecycle stage, ear-tag identity, and biological-asset value. The member of a herd; the row IAS-41 measures and traceability tags."
atomPath: "vocabulary/animal"
coordinate: "vocabulary/animal · 5/round · 293f2eb4"
contentUuid: "8784dbf6-8c7b-52b0-a33d-b342c842c311"
diamondUuid: "06c4e350-4814-8efc-bb46-3761c08a4afa"
uuid: "293f2eb4-c136-8d5f-b5f1-d2a0db52dea9"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "08e3b429-aa88-8440-b38f-f423a2f1b32f"
  stages:
    - stage: path
      stageUuid: "04682d3b-251f-87e6-ae7e-d957dc4660a9"
    - stage: trinity
      stageUuid: "20033922-c192-80c2-b220-6a126c92096d"
    - stage: boundary
      stageUuid: "b46f28b3-ad2c-84c5-aa62-2e8753da1de4"
    - stage: links
      stageUuid: "134265a2-9299-8c18-929d-13d7da219a4a"
    - stage: horo
      stageUuid: "130ea8e9-7b45-87bc-b29d-85e77b435d93"
    - stage: seal
      stageUuid: "477d255f-fd32-8692-a273-d2d95bac9325"
    - stage: uuid
      stageUuid: "6f735105-822f-8486-8706-6f3df410f4df"
version: 2
---
# animal — the individual living beast; the member of a herd

An **animal** is one identified living beast — the member of a [[herd]] and the row a [[biological/assets|biological asset]] is measured on. It carries its **class** (cow/heifer/steer/bull/calf, ewe/ram/lamb, sow/boar/piglet, layer/broiler — an enum, not separate atoms), **sex**, **purpose** (dairy/meat/fiber/breeding), and **lifecycle [[maturity]] stage** (weaner → yearling → finished/lactating → cull). Its official ear-tag / RFID is its [[identity]] ([[id]]); its parentage is [[lineage]] (pedigree, sire/dam).

The animal is where the husbandry atoms attach: its health record (vaccination, the withdrawal embargo), its [[breed]], its [[lactation]] or finishing, and at [[harvest]] its produce (milk/wool/eggs) or carcass. Death is a [[mortality]] event that de-recognizes the asset. Held-for-sale vs breeding is a [[biological/assets]] classification (both stay IAS-41).

**Law — [[law]]: the individual identified beast is the node — one animal carrying its class/sex/purpose/lifecycle stage, keyed by its ear-tag/RFID [[identity]] — and it is the row a [[biological/assets]] asset is measured on and to which every husbandry atom attaches.**

## Standards
- USDA APHIS ADT (official animal ID, premises ID, traceability); IFRS IAS-41
- USDA AMS (animal classes); WOAH (animal health/welfare)

Composes [[livestock]] · [[herd]] · [[biological/assets]] · [[maturity]] · [[breed]] · [[lactation]] · health · withdrawal · [[harvest]] · [[mortality]] · [[identity]] · [[id]] · [[lineage]].
