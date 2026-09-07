---
name: status
description: "Use when reading the quantum surface state from the CLI — superposition pending paths, last collapse, bond reciprocity. Promoted from a loose sibling to an atom because it is dispatched by PATH, which no lexical reference scan can see. Run: tsx src/quantum/status/index.ts"
atomPath: "quantum/status"
coordinate: "quantum/status · 4/weave · 110c6469"
contentUuid: "6d75fa45-c3f4-585d-9358-db761174aee4"
diamondUuid: "bdf098bc-82f0-81e7-bc16-d4a1c165c7fe"
uuid: "110c6469-59c2-8ece-b531-8adc2ecd8aa4"
horo: 4
typography:
  partition: quantum
  bondDegree: 107
standards: []
bindings: []
signatures:
  computationUuid: "60f72d16-b714-8b6e-b540-401a29910e39"
  stages:
    - stage: path
      stageUuid: "17e4090b-f037-8d1e-bedb-2c9bfcbb8c39"
    - stage: trinity
      stageUuid: "f5db7a32-11a4-8dfc-aac8-2e9f0dc7c96b"
    - stage: boundary
      stageUuid: "f2e5fb86-7805-8e8d-bc8d-f9630450706b"
    - stage: links
      stageUuid: "ec2847f2-6f46-8946-93eb-52f61c1dad96"
    - stage: horo
      stageUuid: "054b542f-5d01-8982-9b19-f541bc79527a"
    - stage: seal
      stageUuid: "ab3be850-b093-88e7-8c6a-de9fb39b138a"
    - stage: uuid
      stageUuid: "a165b885-a184-81f7-92c0-3b0ec16f961f"
quantum:
  superposition:
    - action
    - active
    - age
    - approved
    - attrition
    - career
    - creative
    - delivery
    - superposition
  collapse:
    - "Use when reading the quantum surface state from the CLI — superposition pending paths, last collapse, bond reciprocity. Promoted from a loose sibling to an atom because it is dispatched by PATH, which no lexical reference scan can see. Run: tsx src/quantum/status/index.ts"
    - "an entry point reached by path is invisible to every reference scan, so its existence must be asserted where the dispatch is declared — a target that no longer resolves is a command that silently stopped being one."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "60f72d16-b714-8b6e-b540-401a29910e39"
    contentUuid: "6d75fa45-c3f4-585d-9358-db761174aee4"
version: 2
---
# status — the entry point a reference scan cannot see

This atom was a loose `.ts` beside the quantum barrel, and it nearly got deleted as dead code.

Two live commands dispatch it — `pnpm erpax quantum` and `pnpm erpax quantum status` — but the registry invokes it as a **subprocess path** (`tsx src/quantum/status.ts`), never as an import. So an import-path scan found zero references, a symbol scan for `runQuantumStatus` found zero references, and both were correct: nothing in the corpus *imports* it. Removing it would have broken two working commands while every lexical instrument reported it unused.

[[rules]]/unfolded states this limit in its own honest boundary — a dynamically-reached symbol is invisible to a lexical scan. Here the dynamic reach is a shell string, one level further out than a computed property.

## The guard that follows from it

The useful invariant is not *"is this symbol referenced"* — that question is unanswerable for a path dispatch. It is **"does every path the CLI dispatches actually exist"**, and that is decidable: parse each `cmd` in the registry for `src/…` targets and assert the file is there. A command whose target is missing is a command that cannot run, and nothing else in the tree would report it.

The test pins both directions: every quantum dispatch target resolves, and the two `status` commands point at this atom rather than at the loose sibling it replaced.

**Honest boundary.** This proves a dispatched path **exists**, never that the command **works** — a target that resolves can still fail at runtime, and the registry's non-`src` commands (`pnpm`, `bash`) are not checked here. It closes the deletion hazard, not the correctness question.

**Law — [[law]]: an entry point reached by path is invisible to every reference scan, so its existence must be asserted where the dispatch is declared — a target that no longer resolves is a command that silently stopped being one.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — analysability: an entry point must be locatable from its declaration.

Composes: [[quantum]]/context · [[cli]] · [[rules]]/unfolded · [[law]].

<sub>content-uuid `6d75fa45-c3f4-585d-9358-db761174aee4` · account `quantum/status` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
