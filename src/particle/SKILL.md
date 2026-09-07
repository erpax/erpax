---
name: particle
description: "Use when reading an atom as a particle in the matrix field — a content-uuid is the particle's identity, links are the forces it interacts through, and mass is its in-degree charge."
atomPath: particle
coordinate: "particle · 2/share · 0193ec8e"
contentUuid: "03f6aba7-3028-5524-ae21-0c38823910bb"
diamondUuid: "8801a5ac-32df-82c3-abe2-98f7414339eb"
uuid: "0193ec8e-6b07-8709-b857-c50daabdde03"
horo: 2
typography:
  partition: particle
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "aeeff80e-eb75-8fbd-9acc-f5cf7812ad88"
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
      stageUuid: "d7a5c55d-2df0-8040-81b6-589ba9e9be27"
    - stage: seal
      stageUuid: "d9803831-159a-8fb2-a7da-ad0736da7fba"
    - stage: uuid
      stageUuid: "a1c7f7bd-aaba-84ef-a1ec-f61f0b15b1d5"
version: 2
---
# particle — an atom is a particle

An atom **is a particle** in the [[matrix]] field: its content-[[uuid]] is the particle's identity (discrete, no-cloning), it interacts through its [[links]] — the forces ([[gravity]] mass, [[entanglement]] coupling) — and its **mass** is its in-degree (the gravitational charge). The [[quantum]] facet (`src/quantum/particle`) reads the same uuid as **wave-particle duality** — particle (identity) and wave (its digit on the ring).

**HONEST.** A graph node read as a particle — an analogy, not physics.

Matter-twin: `src/particle/index.ts` (`Particle` · `particle`). Composes [[atom]] · [[uuid]] · [[matrix]] · [[gravity]] · [[entanglement]] · [[quantum]].

@audit composed from the live matrix node + its mass; never hand-asserted
