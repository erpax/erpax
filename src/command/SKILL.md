---
name: command
description: "Use when classifying or executing the imperative-verb role of an autonomous workflow — the atom a loop runs as a step's command, paired with a question gate and a computed answer; the C-set of corpus verbs."
atomPath: command
coordinate: "command · 4/weave · cb7d64ae"
contentUuid: "449fe5c1-62ac-578b-8dae-7890fdacd4cc"
diamondUuid: "9df507a7-390e-8857-858d-84e6a63ef338"
uuid: "cb7d64ae-3a7a-8d63-8228-e7a8e4f1225c"
horo: 4
typography:
  partition: command
  bondDegree: 62
standards:
  - "schema.org Action — the imperative move (here, the workflow step's verb)"
bindings: []
signatures:
  computationUuid: "b3660544-60e7-8a10-b083-b3089f6ee48b"
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
      stageUuid: "0cd19be8-b598-81c6-8975-10937dbfbc96"
    - stage: seal
      stageUuid: "a9791b38-3e93-82ad-bba5-f68e835de0e1"
    - stage: uuid
      stageUuid: "89f25d59-d3b4-8484-a1dc-0d37a15be953"
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
