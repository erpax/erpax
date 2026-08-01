---
name: computer
description: "Use when reasoning about computer as a schema.org vocabulary word — the single word collided from the schema.org terms that contain it, content-addressed into the corpus."
atomPath: computer
coordinate: "computer · 8/crest · 6fa3dcee"
contentUuid: "7f4d535a-4919-521c-8197-8f8622936626"
diamondUuid: "607df6ee-07a8-89f4-afae-004bbb61e13a"
uuid: "6fa3dcee-c7f8-8f0a-9435-a205d17fe623"
horo: 8
typography:
  partition: computer
  bondDegree: 98
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "281b47d0-f920-8e33-aa1d-c361463872e1"
  stages:
    - stage: path
      stageUuid: "99b5b1e3-04ec-8a6c-9e05-ce3772b23a0c"
    - stage: trinity
      stageUuid: "47640182-c4dd-89ab-9227-c67dd9599b30"
    - stage: boundary
      stageUuid: "0b105708-66ee-86b4-be2a-3cd4d8959824"
    - stage: links
      stageUuid: "9c17304a-cae2-82f4-9068-21f6aab04831"
    - stage: horo
      stageUuid: "01b6711c-0072-81d2-b6ff-29ef4a9e3375"
    - stage: seal
      stageUuid: "ee2541f7-c8d9-8680-8067-b36807c6a489"
    - stage: uuid
      stageUuid: "340559c9-70f2-89fd-9ea1-4454c76b1667"
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
