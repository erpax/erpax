---
name: development
description: "Use when planning what to build next — a feasibility-ranked roadmap of capabilities driven by the self-building loop; nextMove picks the highest-feasibility development for the society to advance."
atomPath: development
coordinate: "development · 2/share · 352be7eb"
contentUuid: "5c796804-f99b-5c87-8c3f-90c3dc55b21b"
diamondUuid: "38be8eac-bd1a-8983-a6f2-2964273a1438"
uuid: "352be7eb-8eff-8712-959b-d59f0312ec3e"
horo: 2
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
  computationUuid: "d25b786d-d01d-8800-8ec4-4c1ab0aa8fa9"
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
      stageUuid: "2edf8e54-ab40-8cb9-ae7d-b533361ad628"
    - stage: seal
      stageUuid: "685c8484-8916-88dc-9745-05402d2764c5"
    - stage: uuid
      stageUuid: "65cc2a04-111b-8197-9e74-0e64b349d9b1"
version: 2
---
# development — building toward the goal, one ranked move at a time

Development is **building toward a goal**: a feasibility-ranked [[roadmap]] of capabilities, driven by the self-building loop ([[generate]] → [[aura]] whole, [[society]]). A `Development` is a planned capability with a `feasibility` (`now` · `near` · `research`); `ranked` orders them, `nextMove` picks the first to do, and the [[society]] advances one gate-verified step at a time ([[sequence]] · [[breath]]).

The quantum facet (`src/quantum/development`) carries the concrete **quantum roadmap** the quantum-scientists produced — drive-orphans-to-zero, quantum/coverage, quantum/spectrum, the post-quantum anchor — see [[quantum]].

**HONEST.** This is a planning/ranking structure over named capabilities (the engineering sense of "development"), composed with the corpus self-build loop — not economic or human development.

Matter-twin: `src/development/index.ts` (`Development` · `Roadmap` · `ranked` · `nextMove` · `atTier`). Composes [[roadmap]] · [[generate]] · [[society]] · [[sequence]] · [[breath]] · [[quantum]].

**Law — [[law]]: development is a feasibility-ranked roadmap of named capabilities; `nextMove` always picks the highest-feasibility one, and the society advances exactly one gate-verified step at a time.**
