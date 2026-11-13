---
name: status
description: "Use when reading the quantum surface state from the CLI — superposition pending paths, last collapse, bond reciprocity. Promoted from a loose sibling to an atom because it is dispatched by PATH, which no lexical reference scan can see. Run: tsx src/quantum/status/index.ts"
atomPath: "quantum/status"
coordinate: "quantum/status · 1/base · 3600268d"
contentUuid: "68db21c3-cbe4-5ab4-b550-7b0e5955e4d6"
diamondUuid: "3a479079-abc5-88bf-82ff-d9bdb98f1023"
uuid: "3600268d-fc70-8b4a-bc5c-24d1bb94c57d"
horo: 1
typography:
  partition: quantum
  bondDegree: 32
standards: []
bindings: []
signatures:
  computationUuid: "41b31d8a-ed1f-860c-b13b-14f59fa6801d"
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
      stageUuid: "ec2242fe-2f4a-8c9e-a964-d6dd23165bec"
    - stage: seal
      stageUuid: "ab3be850-b093-88e7-8c6a-de9fb39b138a"
    - stage: uuid
      stageUuid: "f07a879d-21f0-882f-9ed9-82dc9ce232c1"
quantum:
  superposition:
    - field
    - force
    - legal
    - medical
    - quantum
    - resolution
    - status
    - study
    - work
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
    computationUuid: "41b31d8a-ed1f-860c-b13b-14f59fa6801d"
    contentUuid: "68db21c3-cbe4-5ab4-b550-7b0e5955e4d6"
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

<sub>content-uuid `68db21c3-cbe4-5ab4-b550-7b0e5955e4d6` · account `quantum/status` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
