---
name: particle
description: "Use when reading an atom as a particle in the matrix field — a content-uuid is the particle's identity, links are the forces it interacts through, and mass is its in-degree charge."
atomPath: particle
coordinate: "particle · 5/round · 87afa869"
contentUuid: "3e554ebf-8975-58fc-8812-59d8677a3345"
diamondUuid: "43cb02c5-e55d-84ca-96fe-55dfd4a5666a"
uuid: "87afa869-e0f3-8cf7-a188-6478dd6fbda4"
horo: 5
typography:
  partition: particle
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "bc262d57-d56c-8890-896c-2f35471ef962"
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
      stageUuid: "5dd028f4-575f-81e1-b5c6-586796556d0a"
    - stage: seal
      stageUuid: "d9803831-159a-8fb2-a7da-ad0736da7fba"
    - stage: uuid
      stageUuid: "773a185e-1b3b-8240-a5e1-d1659b84ede1"
version: 2
---
# particle — an atom is a particle

An atom **is a particle** in the [[matrix]] field: its content-[[uuid]] is the particle's identity (discrete, no-cloning), it interacts through its links — the forces ([[gravity]] mass, [[entanglement]] coupling) — and its **mass** is its in-degree (the gravitational charge). The [[quantum]] facet (`src/quantum/particle`) reads the same uuid as **wave-particle duality** — particle (identity) and wave (its digit on the ring).

**HONEST.** A graph node read as a particle — an analogy, not physics.

Matter-twin: `src/particle/index.ts` (`Particle` · `particle`). Composes [[atom]] · [[uuid]] · [[matrix]] · [[gravity]] · [[entanglement]] · [[quantum]].

@audit composed from the live matrix node + its mass; never hand-asserted
