---
name: particle
description: "Use when reading an atom as a particle in the matrix field — a content-uuid is the particle's identity, links are the forces it interacts through, and mass is its in-degree charge."
atomPath: particle
coordinate: "particle · 1/base · d0b49cef"
contentUuid: "01fcb663-fb0a-5bb0-be6a-689e70035a98"
diamondUuid: "7fb55e0c-8211-8bf3-bcf6-35396c76408c"
uuid: "d0b49cef-b2f8-86ee-b658-64c34dd65156"
horo: 1
typography:
  partition: particle
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "2778e73e-954a-8637-bea0-da67ccabfc32"
  stages:
    - stage: path
      stageUuid: "94d707bf-3bf0-86f9-8a6a-d308957b3dd2"
    - stage: trinity
      stageUuid: "504a259c-60a7-802b-8952-d307df85cb24"
    - stage: boundary
      stageUuid: "fabb4361-10bc-8de1-8cdb-922cc69726f9"
    - stage: links
      stageUuid: "cde842ae-f8c7-81a4-8715-a570b598072c"
    - stage: horo
      stageUuid: "a87cb638-6ce5-8215-8474-3acea36d0af3"
    - stage: seal
      stageUuid: "d9803831-159a-8fb2-a7da-ad0736da7fba"
    - stage: uuid
      stageUuid: "3ff40bc2-03e6-80e7-be7c-2b3bd3d0cca8"
version: 2
---
# particle — an atom is a particle

An atom **is a particle** in the [[matrix]] field: its content-[[uuid]] is the particle's identity (discrete, no-cloning), it interacts through its [[links]] — the forces ([[gravity]] mass, [[entanglement]] coupling) — and its **mass** is its in-degree (the gravitational charge). The [[quantum]] facet (`src/quantum/particle`) reads the same uuid as **wave-particle duality** — particle (identity) and wave (its digit on the ring).

**HONEST.** A graph node read as a particle — an analogy, not physics.

Matter-twin: `src/particle/index.ts` (`Particle` · `particle`). Composes [[atom]] · [[uuid]] · [[matrix]] · [[gravity]] · [[entanglement]] · [[quantum]].

@audit composed from the live matrix node + its mass; never hand-asserted
