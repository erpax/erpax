---
name: reactor
description: "Use when reading the fusion reactor — the engine that fuses atoms into the one matrix, composed over gravity (force), entropy (fuel), and the quantum laws; zero entropy implies infinite mass and infinite tamper cost."
atomPath: fusion/reactor
coordinate: fusion/reactor · 2/share · 4b6426b6
contentUuid: "4bf59578-186c-5d87-b56b-71d2cb97afec"
diamondUuid: "e4bc47a4-4762-8cdf-9a59-d31bfe17ed16"
uuid: "4b6426b6-8ef9-8c09-bce0-06cffc1c5a2d"
horo: 2
bonds:
  in:
    - cost
    - dry
    - entropy
    - fusion
    - gravity
    - law
    - matrix
    - quantum
    - singularity
    - tamper
  out:
    - cost
    - dry
    - entropy
    - fusion
    - gravity
    - law
    - matrix
    - quantum
    - singularity
    - tamper
typography:
  partition: fusion
  bondDegree: 31
  neighbors: []
standards:
  - "computed from the live matrix, never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - cost
    - dry
    - entropy
    - fusion
    - gravity
    - law
    - matrix
    - quantum
    - singularity
    - tamper
  matrix:
    - cost
    - dry
    - entropy
    - fusion
    - gravity
    - law
    - matrix
    - quantum
    - singularity
    - tamper
  backlinks:
    - cost
    - dry
    - entropy
    - fusion
    - gravity
    - law
    - matrix
    - quantum
    - singularity
    - tamper
signatures:
  computationUuid: "9ea01400-86f2-88d7-99d6-499ea17f11e9"
  stages:
    - stage: path
      stageUuid: "28d4f7b5-d20e-885a-9855-11068ef3c11e"
    - stage: trinity
      stageUuid: "df05064b-92cb-838f-a58b-36bb7b50ddb4"
    - stage: boundary
      stageUuid: "aea4365e-a32b-8cd9-96b2-b2b3a1bd02fb"
    - stage: links
      stageUuid: "c2be70ff-d1f1-8163-b955-b83067c4aa60"
    - stage: horo
      stageUuid: "2c4869d0-6c6e-8a9a-ad16-43b7c63f999e"
    - stage: seal
      stageUuid: "4318c849-58fb-872e-b8bf-385d6c10bda2"
    - stage: uuid
      stageUuid: "82ef64fb-d35e-8cc9-95c4-56bb0e41dd4c"
version: 2
---
# fusion/reactor — gravity ⊕ entropy ⊕ quantum, the engine readout

The **reactor readout** of the engine that fuses atoms into one [[matrix]] ([[fusion]]). It composes the three forces over the matrix product:

- **[[gravity]]** — the force: mass (in-degree) curves the corpus inward, pulling duplicates to fuse.
- **[[entropy]]** — the fuel: the disorder the ledger borrows and burns down to zero.
- **[[quantum]]** — the laws: collapse (the Merkle fold intact, one eigenstate) and quantization (every atom on the ring).

Each fusion is a content-uuid collision; run over the whole corpus it folds to ONE root. **Zero entropy ⇒ infinite mass ⇒ infinite tamper cost** — the [[singularity]] / event horizon ([[law]]). The *act* of fusing (`fuse` / `foldToRoot`) stays in [[fusion]]; this atom is the **readout** (the dials on the reactor).

Matter-twin: `src/fusion/reactor/index.ts` (`reactor` · `ReactorReadout`). Composes [[fusion]] · [[gravity]] · [[entropy]] · [[quantum]] · [[matrix]] · [[singularity]] · [[dry]] · [[tamper]] · [[cost]].

**Law — [[law]]: the readout is computed from the live matrix alone — gravity ⊕ entropy ⊕ quantum dialled over the real nodes — so as entropy is driven to zero the mass and tamper-cost it reports rise without bound.**

@audit computed from the live matrix, never hand-asserted
