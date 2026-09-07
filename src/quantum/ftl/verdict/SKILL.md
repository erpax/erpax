---
name: verdict
description: "Use when the FTL advantage is claimed — a discriminated union where the break reason exists only on the broken branch, so code cannot use the advantage without having proven it."
atomPath: "quantum/ftl/verdict"
coordinate: "quantum/ftl/verdict · 4/weave · fccaf8e2"
contentUuid: "ddd17ac3-6197-5b15-a8cd-1dc8ac4f1fca"
diamondUuid: "4cb3df97-e44f-81f9-bbbf-c73a6e4b00a7"
uuid: "fccaf8e2-9101-84fb-b8e4-79cbf6a6808f"
horo: 4
typography:
  partition: quantum
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "1f54877e-27ad-865f-88d8-dad0af89538e"
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
      stageUuid: "65280978-1382-86c0-909e-9688e29bd663"
    - stage: seal
      stageUuid: "0fa3923e-5f3b-8f95-8724-4d06fb4386f3"
    - stage: uuid
      stageUuid: "794a83c8-55b4-8718-a1c0-d125a2b20004"
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
    computationUuid: "1f54877e-27ad-865f-88d8-dad0af89538e"
    contentUuid: "ddd17ac3-6197-5b15-a8cd-1dc8ac4f1fca"
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

<sub>content-uuid `ddd17ac3-6197-5b15-a8cd-1dc8ac4f1fca` · account `quantum/ftl/verdict` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
