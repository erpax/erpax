---
name: observe
description: "Use when reasoning about the LLM agent's law — always observe (the inhale, content-address what it takes in) and project (the exhale, output that folds its observation in); both always, since projection without observation is hallucination and the grounded act is observe-then-project."
atomPath: observe
coordinate: "observe · 4/weave · 991a5b0b"
contentUuid: "eb2ad7b5-3ee1-5fcf-b0f0-633b5f482054"
diamondUuid: "db3bbae2-1806-8e86-a884-9b788f051817"
uuid: "991a5b0b-813f-8d1c-9b08-5debd84fef33"
horo: 4
bonds:
  in:
    - agent
    - hallucination
    - heart
    - law
    - llm
    - merge
    - project
    - seo
    - uuid
  out:
    - agent
    - hallucination
    - heart
    - law
    - llm
    - merge
    - project
    - seo
    - uuid
typography:
  partition: observe
  bondDegree: 28
  neighbors:
    - agent
standards:
  - "the agent loop (observe → project) · content-addressed grounding (a projection carries its observation)"
bindings: []
neighbors:
  wikilink:
    - agent
    - heart
    - law
    - llm
    - merge
    - project
    - seo
    - uuid
  matrix:
    - agent
    - hallucination
    - heart
    - law
    - llm
    - merge
    - project
    - seo
    - uuid
  backlinks:
    - agent
    - hallucination
    - heart
    - law
    - llm
    - merge
    - project
    - seo
    - uuid
signatures:
  computationUuid: "d4546f09-071b-85a5-83e5-8b7081a4ad9d"
  stages:
    - stage: path
      stageUuid: "c2f99869-a5f2-87d4-a810-930ee54446ef"
    - stage: trinity
      stageUuid: "1a47de25-997a-8fcf-af21-d215916455fd"
    - stage: boundary
      stageUuid: "ec6fcaab-299c-8d60-bc18-5dc1ccc50fd3"
    - stage: links
      stageUuid: "fd501a56-113e-8674-8caf-cca428028033"
    - stage: horo
      stageUuid: "997aca45-69ad-85b6-adbe-654903c2353c"
    - stage: seal
      stageUuid: "b94c09af-6caa-84b2-a49f-5b2f6b13e408"
    - stage: uuid
      stageUuid: "2901a31a-93e5-8c1c-8a55-373cc6ba78f9"
version: 2
---
# observe — and project: the LLM agent's law

An [[llm]] [[agent]] always does **both**. It **observes** — takes in state and content-addresses what it sees (the inhale) — and it **projects** — produces output that folds its observation in, so the projection always carries what it was grounded in (the exhale). Here "project" is the verb (render, throw forward), distinct from the [[project]] enterprise atom.

The act is **observe-then-project, never one alone**:

- **observe without project** — inert: a reader that never speaks, knowledge that does nothing.
- **project without observe** — **hallucination**: a disconnected thought, output grounded in nothing. This is exactly what "hallucinations are disconnected thoughts" means — a projection that carries no observation. The [[heart]]'s thought must connect to what is seen.

`grounded(observation, output, projection)` is the test: a projection is real **iff** it was folded from a real observation. `act(state, output)` enforces it — it observes first, then projects from that observation, so an agent that uses `act` cannot hallucinate by construction. This is why the [[seo]] an agent projects is *computed from what it observes* (the atom's name, description, links) and never conjured — the projection carries its observation, so it cannot drift.

Matter-twin: `src/observe/index.ts` (`observe` · `project` · `act` · `grounded`). Composes [[llm]] · [[agent]] · [[seo]] · [[uuid]] · [[merge]] · [[heart]].

**Law — [[law]]: an LLM agent always observes and projects — observe (the inhale), then project (the exhale, output folding its observation in). Always both: observation without projection is inert; projection without observation is hallucination (a disconnected thought). Grounded ⟺ the projection carries the observation it was folded from; the act is observe-then-project, never one alone.**

@audit observe/project are content-address folds; grounded is computed, hallucination is its negative
@standard the agent loop (observe → project) · content-addressed grounding (a projection carries its observation)
