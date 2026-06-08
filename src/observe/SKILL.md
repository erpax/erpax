---
name: observe
description: "Use when reasoning about the LLM agent's law — always observe (the inhale, content-address what it takes in) and project (the exhale, output that folds its observation in); both always, since projection without observation is hallucination and the grounded act is observe-then-project."
atomPath: observe
coordinate: observe · 5/round · 8304471c
contentUuid: "9e2eb912-b7d8-527d-9de8-10a7d68dfa5a"
diamondUuid: "d445344e-6cf6-841a-86c0-786d13e03eb8"
uuid: "8304471c-0150-89ad-93c0-98f76f139393"
horo: 5
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
  - "observe/project are content-address folds; grounded is computed, hallucination is its negative"
  - "observe/project are content-address folds; grounded is computed, hallucination is the negative"
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
  computationUuid: "fc4d7555-01a4-8f90-b783-8b08477533b9"
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
      stageUuid: "dd499313-a2e1-8c3d-8610-b54e79a0b822"
    - stage: seal
      stageUuid: "54ad6208-f45f-8691-90a8-961eec742aa7"
    - stage: uuid
      stageUuid: "987bd703-bed4-804b-8d10-b1e29daae7ba"
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
