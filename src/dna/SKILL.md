---
name: dna
description: "Use when reasoning about inheritance in erpax — an atom's genome is its parent_id chain encoded in the uuid chain; ancestry is entangled into identity (change an ancestor and every descendant's uuid changes), so lineage is tamper-evident by architecture."
atomPath: dna
coordinate: "dna · 1/base · 2b1fd9a3"
contentUuid: "0f32a2a9-91ad-5673-900a-191d6f28e0ce"
diamondUuid: "7a22047c-0bb9-835f-9316-2a2f0cd65231"
uuid: "2b1fd9a3-f304-87b0-93ed-99921d96d4bc"
horo: 1
typography:
  partition: dna
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "6442804b-992f-8853-9977-7ba87928ad36"
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
      stageUuid: "d0b222df-15bc-8f90-9578-7216c027a3ed"
    - stage: seal
      stageUuid: "0e435895-6895-87e5-b544-2736827cc9a4"
    - stage: uuid
      stageUuid: "ac681ff8-209b-8c1f-84e0-650d78f0db9e"
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
