---
name: observe
description: "Use when reasoning about the LLM agent's law — always observe (the inhale, content-address what it takes in) and project (the exhale, output that folds its observation in); both always, since projection without observation is hallucination and the grounded act is observe-then-project."
atomPath: observe
coordinate: "observe · 8/crest · 95cf651f"
contentUuid: "a402efbf-6c3a-5668-a945-d6614c8e4e83"
diamondUuid: "48b16463-c9b3-826f-855e-9691f1b3a24a"
uuid: "95cf651f-7267-8124-8abc-e226feebb86c"
horo: 8
typography:
  partition: observe
  bondDegree: 28
standards:
  - "the agent loop (observe → project) · content-addressed grounding (a projection carries its observation)"
bindings: []
signatures:
  computationUuid: "eadb95eb-bbc6-8b2d-87c4-5b0c37348ddf"
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
      stageUuid: "24e46a7d-4612-8141-a475-a81d677de038"
    - stage: seal
      stageUuid: "b94c09af-6caa-84b2-a49f-5b2f6b13e408"
    - stage: uuid
      stageUuid: "a4efc94d-2e4f-89e1-b6dd-95426d760754"
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
