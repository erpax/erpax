---
name: verdict
description: "Use when the FTL advantage is claimed — a discriminated union where the break reason exists only on the broken branch, so code cannot use the advantage without having proven it."
atomPath: "quantum/ftl/verdict"
coordinate: "quantum/ftl/verdict · 1/base · eb5d16b7"
contentUuid: "a93e05f0-0b3c-531e-ac48-c37ceddf8a87"
diamondUuid: "b033fb8a-6b21-806d-94af-766aac1f6732"
uuid: "eb5d16b7-b0b8-8fdb-afce-7b4a2f5264f2"
horo: 1
typography:
  partition: quantum
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "ed07644c-69fb-88a8-a4a4-9c87e223b6ec"
  stages:
    - stage: path
      stageUuid: "1ece1962-8a1c-8c6e-996d-dea12dde8c6c"
    - stage: trinity
      stageUuid: "9477125d-bf56-8916-acbc-17ecbea6f10b"
    - stage: boundary
      stageUuid: "db88b6b7-55fd-8b93-a325-400660df1b18"
    - stage: links
      stageUuid: "d97ba5a8-c4ed-8ae2-bb2c-e25e16df9da0"
    - stage: horo
      stageUuid: "d5c899ec-5af0-8453-a617-503d340afe8f"
    - stage: seal
      stageUuid: "0fa3923e-5f3b-8f95-8724-4d06fb4386f3"
    - stage: uuid
      stageUuid: "f78092ba-0f6e-82ca-8986-c418ba3159e7"
quantum:
  superposition:
    - ftl
    - quantum
    - readme
    - rules
    - skill
    - superposition
  collapse:
    - "Use when the FTL advantage is claimed — a discriminated union where the break reason exists only on the broken branch, so code cannot use the advantage without having proven it."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "ed07644c-69fb-88a8-a4a4-9c87e223b6ec"
    contentUuid: "a93e05f0-0b3c-531e-ac48-c37ceddf8a87"
version: 2
---
# quantum/ftl/verdict — a claim you cannot use without proving

`{ holds: boolean, why: string }` lets code read the reason without ever checking the claim, and lets code USE the advantage without establishing it. That is an unrefuted claim in runtime form — the space [[rules]]/refutable says a lie is safe in.

| branch | carries |
| --- | --- |
| `FtlHolds` | `holds: true` · the fold — **nothing to explain** |
| `FtlBroken` | `holds: false` · `why` — the break, named |

`why` is unreachable until you have proven the advantage does **not** hold. `withFtl` takes `FtlHolds`, so a report that has not been narrowed will not compile where the advantage is required: *"we have it"* can no longer be assumed at a call site where it was never established.

The compiler refused three places the moment this landed — one in [[readme]]/compute, two in the ftl proof itself.

**A gate is stronger than prose because it executes; a type is stronger than a gate because it cannot be run past.**

**Honest boundary.** The type proves the claim was CHECKED, never that the check is right — `ftl()` still decides whether reuse, amortization and the crack set actually hold, and a wrong computation produces a confidently-typed wrong verdict. This closes the door where a proven claim and an unproven one were interchangeable.

Composes: [[quantum]]/ftl · [[rules]]/refutable · [[skill]]/wire.

<sub>content-uuid `a93e05f0-0b3c-531e-ac48-c37ceddf8a87` · account `quantum/ftl/verdict` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
