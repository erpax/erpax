---
name: particle
description: "Use when reading an atom as a particle in the matrix field — a content-uuid is the particle's identity, links are the forces it interacts through, and mass is its in-degree charge."
atomPath: particle
coordinate: particle · 7/descent · c7e7d503
contentUuid: "fcbc1930-0ba3-58f6-b0b6-bc9d04bf1d2b"
diamondUuid: "b56e9177-994d-86e4-af20-b1a633bf90c7"
uuid: "c7e7d503-46b8-873b-bf10-ff24cf3c8b9a"
horo: 7
bonds:
  in:
    - atom
    - entanglement
    - generator
    - gravity
    - links
    - matrix
    - particle
    - photon
    - quantum
    - uuid
    - void
  out:
    - atom
    - entanglement
    - generator
    - gravity
    - links
    - matrix
    - particle
    - photon
    - quantum
    - uuid
    - void
typography:
  partition: particle
  bondDegree: 40
  neighbors: []
standards:
  - "composed from the live matrix node + its mass; never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - atom
    - entanglement
    - gravity
    - links
    - matrix
    - quantum
    - uuid
  matrix:
    - atom
    - entanglement
    - generator
    - gravity
    - links
    - matrix
    - particle
    - photon
    - quantum
    - uuid
    - void
  backlinks:
    - atom
    - entanglement
    - generator
    - gravity
    - links
    - matrix
    - particle
    - photon
    - quantum
    - uuid
    - void
signatures:
  computationUuid: "6ade5136-5f1b-84ca-bfd7-d912f2e72b72"
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
      stageUuid: "1dc68ee7-0456-83b9-8caa-9d4037ff3bae"
    - stage: seal
      stageUuid: "ede13c17-75cb-8524-997b-3be5a0b24079"
    - stage: uuid
      stageUuid: "bc6b1f4b-483a-8ac9-b9d3-c5ca905ad56e"
version: 2
---
# particle — an atom is a particle

An atom **is a particle** in the [[matrix]] field: its content-[[uuid]] is the particle's identity (discrete, no-cloning), it interacts through its [[links]] — the forces ([[gravity]] mass, [[entanglement]] coupling) — and its **mass** is its in-degree (the gravitational charge). The [[quantum]] facet (`src/quantum/particle`) reads the same uuid as **wave-particle duality** — particle (identity) and wave (its digit on the ring).

**HONEST.** A graph node read as a particle — an analogy, not physics.

Matter-twin: `src/particle/index.ts` (`Particle` · `particle`). Composes [[atom]] · [[uuid]] · [[matrix]] · [[gravity]] · [[entanglement]] · [[quantum]].

@audit composed from the live matrix node + its mass; never hand-asserted
