---
name: verdict
description: "Use when the FTL advantage is claimed — a discriminated union where the break reason exists only on the broken branch, so code cannot use the advantage without having proven it."
atomPath: "quantum/ftl/verdict"
coordinate: "quantum/ftl/verdict · 4/weave · 115bbe98"
contentUuid: "b80517b2-0991-5274-b610-b879b6bf7a9d"
diamondUuid: "9cf0f68b-888f-896c-89a0-fd557cd6cbbe"
uuid: "115bbe98-c10c-83a7-964e-0b023715a234"
horo: 4
typography:
  partition: quantum
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "508c8d14-231e-8475-ade7-6f770bbe0fa4"
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
      stageUuid: "8a6f775a-85d0-80f4-8ca1-f83e5fd6f168"
    - stage: seal
      stageUuid: "0fa3923e-5f3b-8f95-8724-4d06fb4386f3"
    - stage: uuid
      stageUuid: "d0774ef8-4bc7-8815-befc-2daa125716b1"
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
    computationUuid: "508c8d14-231e-8475-ade7-6f770bbe0fa4"
    contentUuid: "b80517b2-0991-5274-b610-b879b6bf7a9d"
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

<sub>content-uuid `b80517b2-0991-5274-b610-b879b6bf7a9d` · account `quantum/ftl/verdict` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
