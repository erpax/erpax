---
name: particle
description: "Use when reading an atom as a particle in the matrix field — a content-uuid is the particle's identity, links are the forces it interacts through, and mass is its in-degree charge."
atomPath: particle
coordinate: "particle · 5/round · 3e8fd7cb"
contentUuid: "46ab7b35-3c6e-53d7-94e7-6f632c646ecf"
diamondUuid: "15f60776-9f60-8bdc-9def-b1aa051cda11"
uuid: "3e8fd7cb-6da9-8955-a686-0d97d5817f01"
horo: 5
typography:
  partition: particle
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "021d1a5e-3e51-861a-b415-efa073c77b6b"
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
      stageUuid: "fe77a515-0fd7-8f9f-94f6-7ff2c1274a4d"
    - stage: seal
      stageUuid: "d9803831-159a-8fb2-a7da-ad0736da7fba"
    - stage: uuid
      stageUuid: "8610104c-a275-8ec5-8bae-9ef96e0769a4"
version: 2
---
# particle — an atom is a particle

An atom **is a particle** in the [[matrix]] field: its content-[[uuid]] is the particle's identity (discrete, no-cloning), it interacts through its [[links]] — the forces ([[gravity]] mass, [[entanglement]] coupling) — and its **mass** is its in-degree (the gravitational charge). The [[quantum]] facet (`src/quantum/particle`) reads the same uuid as **wave-particle duality** — particle (identity) and wave (its digit on the ring).

**HONEST.** A graph node read as a particle — an analogy, not physics.

Matter-twin: `src/particle/index.ts` (`Particle` · `particle`). Composes [[atom]] · [[uuid]] · [[matrix]] · [[gravity]] · [[entanglement]] · [[quantum]].

@audit composed from the live matrix node + its mass; never hand-asserted
