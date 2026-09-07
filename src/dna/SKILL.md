---
name: dna
description: "Use when reasoning about inheritance in erpax — an atom's genome is its parent_id chain encoded in the uuid chain; ancestry is entangled into identity (change an ancestor and every descendant's uuid changes), so lineage is tamper-evident by architecture."
atomPath: dna
coordinate: "dna · 4/weave · 44222bb4"
contentUuid: "f28d9703-08f8-5cd0-867a-5540d5e3fba8"
diamondUuid: "5b0372de-b29c-8b03-96da-197e41f3157a"
uuid: "44222bb4-48fc-8724-b863-aa45595ba7e3"
horo: 4
typography:
  partition: dna
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "bda3a648-b20a-8c56-ac1d-f4260496c015"
  stages:
    - stage: path
      stageUuid: "b7b3eb75-ff34-8f42-b03c-095cd97132cf"
    - stage: trinity
      stageUuid: "093a4cd6-ef3a-8e22-ae5f-727a4aabde70"
    - stage: boundary
      stageUuid: "ac0e069b-faaa-8889-9d08-b60f373dde18"
    - stage: links
      stageUuid: "25213efb-ba19-82a1-80aa-5c63c577c9be"
    - stage: horo
      stageUuid: "24bcbf4e-e392-8ae3-ae72-fab1f99be52c"
    - stage: seal
      stageUuid: "0e435895-6895-87e5-b544-2736827cc9a4"
    - stage: uuid
      stageUuid: "33359eed-e84e-8b9d-a065-07ca8a0ee5bb"
version: 2
---
# dna — the inherited code encoded in the uuid chain

The **parent_id is the DNA.** An atom's **genome** is its parent_id lineage — the chain of ancestor content-uuids it descends from ([[uuid]] `parentOf`). Read along the chain, that is the heritable code: what an atom inherits.

Crucially, inheritance is **not stored beside** the atom — it is **entangled into its identity**. Because each atom's content-uuid folds in its parent ([[merge]] / [[coordinate]] cross), changing an ancestor changes *every* descendant's uuid. So lineage is **tamper-evident by architecture**: you cannot rewrite an ancestor without the whole descent line announcing it ([[tamper]] · [[proof]]). [[tag]]s and [[karma]] inherit down this same chain — "on the quantum level," ancestry is read off the uuid, not looked up.

This is the genetic reading of the [[lineage]] / [[coordinate]] tree the matrix already computes; [[quantum]]/karma stamps moral debt/credit along it.

**HONEST.** This is graph lineage over the uuid parent-chain — an **analogy** to DNA (a heritable code read along a chain), not biology.

Matter-twin: `src/dna/index.ts` (`genome` · `inherits` · `generations`). Composes [[uuid]] · [[matrix]] · [[lineage]] · [[merge]] · [[quantum]] · [[tag]] · [[karma]] · [[tamper]].

**Law — [[law]]: an atom's genome is its parent-id [[lineage]] folded into its content-[[uuid]] — change an ancestor and every descendant's uuid changes, so inheritance is tamper-evident by architecture, not stored beside the atom.**

@audit computed from the live matrix parent-chain; never hand-asserted
