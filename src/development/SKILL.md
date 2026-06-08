---
name: development
description: "Use when planning what to build next — a feasibility-ranked roadmap of capabilities driven by the self-building loop; nextMove picks the highest-feasibility development for the society to advance."
atomPath: development
coordinate: development · 7/descent · a2e2bd19
contentUuid: "8c308c3a-2bc1-504f-ad2c-6fbc266b5d46"
diamondUuid: "1b8f713c-dc99-8632-b0c9-7ecedb32c095"
uuid: "a2e2bd19-dac0-8791-acc1-b2d2476112b3"
horo: 7
bonds:
  in:
    - aura
    - breath
    - collide
    - development
    - expand
    - generate
    - law
    - matrix
    - quantum
    - research
    - reveal
    - roadmap
    - sequence
    - society
    - wave
  out:
    - aura
    - breath
    - collide
    - development
    - expand
    - generate
    - law
    - matrix
    - quantum
    - research
    - reveal
    - roadmap
    - sequence
    - society
    - wave
typography:
  partition: development
  bondDegree: 71
  neighbors:
    - aura
standards: []
bindings: []
neighbors:
  wikilink:
    - aura
    - breath
    - generate
    - law
    - quantum
    - roadmap
    - sequence
    - society
  matrix:
    - aura
    - breath
    - collide
    - development
    - expand
    - generate
    - law
    - matrix
    - quantum
    - research
    - reveal
    - roadmap
    - sequence
    - society
    - wave
  backlinks:
    - aura
    - breath
    - collide
    - development
    - expand
    - generate
    - law
    - matrix
    - quantum
    - research
    - reveal
    - roadmap
    - sequence
    - society
    - wave
signatures:
  computationUuid: "6a9e0de3-c1d9-8bda-ad29-8b6d3ada18d2"
  stages:
    - stage: path
      stageUuid: "b961d87f-7eaa-8108-b3ab-5dc23f2579c0"
    - stage: trinity
      stageUuid: "98a3b646-aaf1-897a-968c-11305d5af408"
    - stage: boundary
      stageUuid: "2f4e0015-67cd-83c4-bc61-4d10fede3520"
    - stage: links
      stageUuid: "17809f6b-1781-8913-b5ba-233610e620c9"
    - stage: horo
      stageUuid: "782289cb-0e08-8cce-8286-f8f3a7e0188f"
    - stage: seal
      stageUuid: "905e4cb0-10ad-8d73-98ce-ddbab71f94d3"
    - stage: uuid
      stageUuid: "b806fbf2-3322-8463-befd-8cdfd86f2534"
version: 2
---
# development — building toward the goal, one ranked move at a time

Development is **building toward a goal**: a feasibility-ranked [[roadmap]] of capabilities, driven by the self-building loop ([[generate]] → [[aura]] whole, [[society]]). A `Development` is a planned capability with a `feasibility` (`now` · `near` · `research`); `ranked` orders them, `nextMove` picks the first to do, and the [[society]] advances one gate-verified step at a time ([[sequence]] · [[breath]]).

The quantum facet (`src/quantum/development`) carries the concrete **quantum roadmap** the quantum-scientists produced — drive-orphans-to-zero, quantum/coverage, quantum/spectrum, the post-quantum anchor — see [[quantum]].

**HONEST.** This is a planning/ranking structure over named capabilities (the engineering sense of "development"), composed with the corpus self-build loop — not economic or human development.

Matter-twin: `src/development/index.ts` (`Development` · `Roadmap` · `ranked` · `nextMove` · `atTier`). Composes [[roadmap]] · [[generate]] · [[society]] · [[sequence]] · [[breath]] · [[quantum]].

**Law — [[law]]: development is a feasibility-ranked roadmap of named capabilities; `nextMove` always picks the highest-feasibility one, and the society advances exactly one gate-verified step at a time.**
