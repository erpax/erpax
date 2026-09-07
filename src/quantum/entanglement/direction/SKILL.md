---
name: direction
description: "Use when a running agent must change course immediately — a parent publishes a content-uuid sealed direction and subscribed workers observe it on the same tick, with in-flight work holding an interrupt token that a publish invalidates. Promoted from a hyphenated sibling; 12 importers repointed. Run: tsx src/quantum/entanglement/direction/index.ts"
atomPath: "quantum/entanglement/direction"
coordinate: "quantum/entanglement/direction · 1/base · 2a9af301"
contentUuid: "de33a511-4de2-52a3-8997-ef2b9da9d42b"
diamondUuid: "56c8a211-fff9-8f28-b605-2a345552a2ad"
uuid: "2a9af301-45f1-80d5-9667-c0839da2eeb6"
horo: 1
typography:
  partition: quantum
  bondDegree: 21
standards: []
bindings: []
signatures:
  computationUuid: "14449002-5947-8746-8a97-15f5421318dc"
  stages:
    - stage: path
      stageUuid: "338e2a12-deb1-85a2-8162-62dd45a019e9"
    - stage: trinity
      stageUuid: "663e712d-3170-81d0-a0d5-25c347a8ef0b"
    - stage: boundary
      stageUuid: "25035513-6d9c-88fe-aa84-5b73b7aa6948"
    - stage: links
      stageUuid: "7a7c7d52-bf41-8f1a-8986-afaa62af43dd"
    - stage: horo
      stageUuid: "5a12f6a6-bc23-8273-bf17-b62ee1ad2e33"
    - stage: seal
      stageUuid: "38ce4063-11ea-89e6-9c22-e20df9a536c1"
    - stage: uuid
      stageUuid: "9f8a5453-5e0d-850d-8e67-b5068d1f1f48"
quantum:
  superposition:
    - collapse
    - entanglement
    - how
    - law
    - merge
    - sti
    - superposition
  collapse:
    - "Use when a running agent must change course immediately — a parent publishes a content-uuid sealed direction and subscribed workers observe it on the same tick, with in-flight work holding an interrupt token that a publish invalidates. Promoted from a hyphenated sibling; 12 importers repointed. Run: tsx src/quantum/entanglement/direction/index.ts"
    - "a hyphen names the mechanism where the path should name the concept. Fold it to what the matter IS — and verify a move by running it, because the compiler will not tell you that a relative specifier changed meaning."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "14449002-5947-8746-8a97-15f5421318dc"
    contentUuid: "de33a511-4de2-52a3-8997-ef2b9da9d42b"
version: 2
---
# direction — a course change that lands on the same tick

A worker that only notices new instructions when it next resumes is not being directed, it is being queued. This atom collapses that gap: a coordinator publishes a **sealed** direction on a path, and every subscriber on that path observes it synchronously — no resume-wait. In-flight work carries an `InterruptToken`, and a publish bumps the generation so stale tokens are invalid rather than merely old.

The seal matters as much as the speed. A direction is content-addressed, so a worker can tell that what it received is what was sent, and two workers on the same path agree without comparing notes.

## Why it is `direction`, not `direction-bus`

Every export names the payload, not the pipe — `DirectionPayload`, `SealedDirection`, `publishDirection`, `subscribeDirection`, `interruptTokenFor`. The bus is the mechanism; **direction** is the concept, and a path states concepts ([[rules]]/invisible: the path is the message).

Nesting it as `direction/bus` would have been the literal reading of the hyphen and the wrong one — it would leave `direction/` an orphan parent with no trinity of its own, inventing a level to hold a word rather than to hold meaning.

## What the move cost

Twelve importers across `apply`, `monitor`, `agent/communication` and `quantum`, all repointed in the same diff ([[rules]]/reference: a moved file carries its references). Two `@see` docstrings pointed at the old name and were carried too — a stale pointer in prose is the defect that gate exists for.

One thing bit, and it is worth recording. A blanket rewrite of `./direction-bus` → `./direction` also rewrote the import **inside the moved test**, where the correct target was `./index` — from within `direction/`, `./direction` addresses a child that does not exist. **`tsc` reported zero errors**; only running the suite found it. That is the same shape as [[quantum]]/ftl/admin's self-import and [[quantum]]/dimension's missed `.tsx` consumers: the compiler is not a reference checker, and a move is verified by execution or not at all.

**Honest boundary.** This proves a published direction is **sealed and observed on the same tick by subscribers on that path** — not that a worker *obeys* it, and not that it reaches a worker in another process. Delivery beyond the in-process bus is the transport's problem; whether the direction was wise is nobody's but the author's.

**Law — [[law]]: a hyphen names the mechanism where the path should name the concept. Fold it to what the matter IS — and verify a move by running it, because the compiler will not tell you that a relative specifier changed meaning.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — modularity: one concept, one addressable home.

Composes: [[quantum]]/entanglement · [[agent]]/communication · [[rules]]/reference · [[law]].

<sub>content-uuid `de33a511-4de2-52a3-8997-ef2b9da9d42b` · account `quantum/entanglement/direction` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
