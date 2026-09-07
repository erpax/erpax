---
name: observe
description: "Use when reasoning about the LLM agent's law — always observe (the inhale, content-address what it takes in) and project (the exhale, output that folds its observation in); both always, since projection without observation is hallucination and the grounded act is observe-then-project."
atomPath: observe
coordinate: "observe · 5/round · b638394f"
contentUuid: "e7a4d268-d4ef-5c51-9955-bd15747469a7"
diamondUuid: "8fb1652c-29a0-8e66-a31a-8dc47ab9b16e"
uuid: "b638394f-8093-8b38-8771-1acdaf0aa0e9"
horo: 5
typography:
  partition: observe
  bondDegree: 28
standards:
  - "the agent loop (observe → project) · content-addressed grounding (a projection carries its observation)"
bindings: []
signatures:
  computationUuid: "8e4c6be0-9937-82f6-b92f-ab6ac98819f6"
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
      stageUuid: "32e752b3-39bf-8e31-84a6-fb13ab6171ed"
    - stage: seal
      stageUuid: "b94c09af-6caa-84b2-a49f-5b2f6b13e408"
    - stage: uuid
      stageUuid: "9dbca5c1-aa0b-8b70-8c28-a6ad142b1aa5"
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
