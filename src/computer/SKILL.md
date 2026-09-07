---
name: computer
description: "Use when reasoning about computer as a schema.org vocabulary word — the single word collided from the schema.org terms that contain it, content-addressed into the corpus."
atomPath: computer
coordinate: "computer · 4/weave · cfc6e08f"
contentUuid: "5ab5888d-cc8a-5536-8b8f-c70374a4a17e"
diamondUuid: "827b5ed3-db8d-83e0-aa01-9b85d6caaa13"
uuid: "cfc6e08f-d22e-8e17-8d3d-de2df1dce370"
horo: 4
typography:
  partition: computer
  bondDegree: 92
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "e1491d85-72cd-860e-8763-01c903cfd4ab"
  stages:
    - stage: path
      stageUuid: "99b5b1e3-04ec-8a6c-9e05-ce3772b23a0c"
    - stage: trinity
      stageUuid: "47640182-c4dd-89ab-9227-c67dd9599b30"
    - stage: boundary
      stageUuid: "73d2e140-74f6-870a-9895-0e23d3457b9f"
    - stage: links
      stageUuid: "9c17304a-cae2-82f4-9068-21f6aab04831"
    - stage: horo
      stageUuid: "b12be8f0-e337-89df-baaa-f65fbd950d15"
    - stage: seal
      stageUuid: "ee2541f7-c8d9-8680-8067-b36807c6a489"
    - stage: uuid
      stageUuid: "c1aa5cfa-ceb1-8510-905b-71663a1735b6"
version: 2
---
# computer — the machine and its parts

A schema.org component word, collided out of schema.org compounds — fused from ComputerLanguage · ComputerStore ([[sti]] · [[collapse]] · [[merge]]). Here it also names the **machine the parts compose**: hardware facets plus software, each nested under `computer/<part>` as a pivot to the canonical top-level atom ([[merge]] at path scale — zero duplication).

**Computer science here is executable, not glossary.** Nested CS atoms (`computer/algorithm` · `computer/complexity` · `computer/graph` · `computer/queue` · `computer/stack` · `computer/finite` · `computer/memory`) export real logic (`index.ts`) and proofs (`test.ts`). Prompt→erpax: `realiseSkillsForPath('computer/…')` loads the SKILL excerpt plus live exports — agents run `classifyComplexity`, `adjacencyFromAtom`, `FifoQueue`, `binarySearch`, `SEAL_CHECK_FSM`, and bounded `AddressSpace` instead of reading prose definitions.

## Parts — hardware · software

| part | role | nested path | canonical |
|---|---|---|---|
| [[processor]] | executes instructions | [[computer/processor]] | `@/processor` |
| [[memory]] | holds working state | [[computer/memory]] | `@/memory/quantum` |
| [[storage]] | persists bytes | [[computer/storage]] | `@/storage` |
| [[screen]] | renders output | [[computer/screen]] | `@/screen` |
| [[network]] | connects externally | [[computer/network]] | `@/network` |
| [[component]] | renders atoms on screen | [[computer/component]] | `@/component` |
| [[hardware]] | physical machine facet | [[computer/hardware]] | `@/hardware` |
| [[software]] | programs the machine | [[computer/software]] | `@/software` |

Matter-twin: `src/computer/index.ts` (`PARTS` · `hardwareParts` · `softwareParts` · `allHealthy` · `failing` · `operates`). The machine **operates** ⟺ every part's live verdict holds.

Entangled with — [[language]] · [[store]] · [[hardware]] · [[software]] · [[processor]] · [[memory]] · [[storage]] · [[screen]] · [[network]] · [[component]]

Attested in schema.org — ComputerLanguage · ComputerStore

**Law — [[law]]: computer is one schema.org word AND the machine its parts compose — each part nested at `computer/<part>` pivots to the canonical atom, deduped, never duplicated; the whole operates ⟺ every part holds.**

**Law — [[law]]: computer science here is executable, not glossary — every CS nested atom ships logic in `index.ts`, proofs in `test.ts`, and a path ledger hook; literary folders without use cases violate the one law.**

@standard schema.org — the type vocabulary, collided to single words
