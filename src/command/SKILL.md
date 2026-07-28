---
name: command
description: "Use when classifying or executing the imperative-verb role of an autonomous workflow — the atom a loop runs as a step's command, paired with a question gate and a computed answer; the C-set of corpus verbs."
atomPath: command
coordinate: "command · 2/share · 5b28fc6f"
contentUuid: "a9867306-40a8-5019-9590-cc4694384499"
diamondUuid: "426931a8-5b15-866d-bee6-ff33d9848b03"
uuid: "5b28fc6f-b832-8f1f-ab72-fedc19fbd955"
horo: 2
bonds:
  in:
    - answer
    - collapse
    - concatenate
    - dry
    - generate
    - law
    - merge
    - migrate
    - question
    - relocate
    - self
    - sequence
    - society
    - step
    - train
    - workflow
  out:
    - answer
    - collapse
    - concatenate
    - dry
    - generate
    - law
    - merge
    - migrate
    - question
    - relocate
    - self
    - sequence
    - society
    - step
    - train
    - workflow
typography:
  partition: command
  bondDegree: 59
  neighbors: []
standards:
  - "schema.org Action — the imperative move (here, the workflow step's verb)"
bindings: []
neighbors:
  wikilink:
    - answer
    - collapse
    - concatenate
    - dry
    - generate
    - law
    - merge
    - migrate
    - question
    - relocate
    - self
    - sequence
    - society
    - step
    - train
    - workflow
  matrix:
    - answer
    - collapse
    - concatenate
    - dry
    - generate
    - law
    - merge
    - migrate
    - question
    - relocate
    - self
    - sequence
    - society
    - step
    - train
    - workflow
  backlinks:
    - answer
    - collapse
    - concatenate
    - dry
    - generate
    - law
    - merge
    - migrate
    - question
    - relocate
    - self
    - sequence
    - society
    - step
    - train
    - workflow
signatures:
  computationUuid: "2deedd2b-d986-8a01-a33f-45978f2babc8"
  stages:
    - stage: path
      stageUuid: "86b7c25f-ffa4-82bb-87d5-ef2bece45476"
    - stage: trinity
      stageUuid: "aca68b55-0a6e-8949-a9a8-f45fb82d5c9b"
    - stage: boundary
      stageUuid: "b960e722-ae51-8a13-afb8-291ca008bfb2"
    - stage: links
      stageUuid: "0e41bc50-7a1e-817e-a6c2-34cb8b78e58f"
    - stage: horo
      stageUuid: "3377e63c-f7f2-8f69-84f5-7312b998699f"
    - stage: seal
      stageUuid: "a9791b38-3e93-82ad-bba5-f68e835de0e1"
    - stage: uuid
      stageUuid: "f3b84f54-fda8-86c8-8441-d81ead697218"
version: 2
---
# command — the imperative verb an autonomous workflow executes

The **COMMAND** role of an autonomous [[workflow]]. A [[step]]'s `command` is the atom a loop **executes** — the side-effecting move ([[generate]], [[collapse]], [[merge]], [[migrate]], [[train]], [[relocate]], …). Paired with a [[question]] (the gate it then asks) and an [[answer]] (the computed fix applied on a NO), it concatenates into a completely autonomous workflow ([[concatenate]]).

`COMMANDS` names the **C-set** — the corpus verbs classified into this role. Each entry is a *real atom*: the role is a **reference, never a copy** ([[dry]]). The `CommandAtom{ run }` contract lives with the runner ([[concatenate]]); this atom is the role membership and its classification, gated so every command resolves to a corpus atom.

The three roles are the breath of a step: **command** (the move, inhale) · [[question]] (the gate, exhale) · [[answer]] (the computed resolution on NO). Together they are the autonomous loop — no human, because the answer is computed ([[self]]-sufficiency).

Matter-twin: `src/command/index.ts` (`COMMANDS` · `Command` · `isCommand`). Composes [[concatenate]] · [[question]] · [[answer]] · [[step]] · [[sequence]] · [[society]] · [[self]].

**Law — [[law]]: a command is the imperative side-effecting verb of a [[workflow]] step — a reference to a real corpus atom (never a copy), paired with a [[question]] gate and a computed [[answer]] — gated so every command resolves to an atom.**

@standard schema.org Action — the imperative move (here, the workflow step's verb)
@audit the C-set is gated for groundedness — every command resolves to a corpus atom
