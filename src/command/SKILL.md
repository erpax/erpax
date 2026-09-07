---
name: command
description: "Use when classifying or executing the imperative-verb role of an autonomous workflow — the atom a loop runs as a step's command, paired with a question gate and a computed answer; the C-set of corpus verbs."
atomPath: command
coordinate: "command · 4/weave · 909ef6ca"
contentUuid: "366e89f7-6550-5aee-8d93-0935c7ee8ba2"
diamondUuid: "53c44c5c-a69c-8202-9b26-6b6925a60db6"
uuid: "909ef6ca-72fd-80e3-8132-735d426a5ee5"
horo: 4
typography:
  partition: command
  bondDegree: 62
standards:
  - "schema.org Action — the imperative move (here, the workflow step's verb)"
bindings: []
signatures:
  computationUuid: "6ab3c541-374d-8c02-ae0a-58437ba262cb"
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
      stageUuid: "7d4fe24f-7a71-86ec-b3c1-9707ed8c1546"
    - stage: seal
      stageUuid: "a9791b38-3e93-82ad-bba5-f68e835de0e1"
    - stage: uuid
      stageUuid: "23a5672e-b15d-82e4-bb03-3ad4f91bb10a"
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
