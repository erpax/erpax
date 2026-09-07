---
name: particle
description: "Use when reading an atom as a particle in the matrix field — a content-uuid is the particle's identity, links are the forces it interacts through, and mass is its in-degree charge."
atomPath: particle
coordinate: "particle · 4/weave · 2b430636"
contentUuid: "e01f982f-c693-563d-93f6-6dbb1882e0ee"
diamondUuid: "6d949eb5-2f97-86f1-8fbf-cf06f784ac73"
uuid: "2b430636-ee66-861c-bcf9-700aeefcd5de"
horo: 4
typography:
  partition: particle
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "7b7ce1c4-2c99-8841-ab50-648539084b02"
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
      stageUuid: "370e64ce-f34c-827f-9df0-fa22256f2360"
    - stage: seal
      stageUuid: "d9803831-159a-8fb2-a7da-ad0736da7fba"
    - stage: uuid
      stageUuid: "6d1bb1f5-d981-804f-8035-a29855efc113"
version: 2
---
# particle — an atom is a particle

An atom **is a particle** in the [[matrix]] field: its content-[[uuid]] is the particle's identity (discrete, no-cloning), it interacts through its [[links]] — the forces ([[gravity]] mass, [[entanglement]] coupling) — and its **mass** is its in-degree (the gravitational charge). The [[quantum]] facet (`src/quantum/particle`) reads the same uuid as **wave-particle duality** — particle (identity) and wave (its digit on the ring).

**HONEST.** A graph node read as a particle — an analogy, not physics.

Matter-twin: `src/particle/index.ts` (`Particle` · `particle`). Composes [[atom]] · [[uuid]] · [[matrix]] · [[gravity]] · [[entanglement]] · [[quantum]].

@audit composed from the live matrix node + its mass; never hand-asserted
