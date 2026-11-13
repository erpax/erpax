---
name: gap
description: "Use when computing held-vs-required skill gaps — matches held competencies against job/task requirements and scores on the SFIA 1-7 scale. The pure required − held function (recruiting, performance review, agent task-routing)."
atomPath: "competency/gap"
coordinate: "competency/gap · 1/base · bf6268d8"
contentUuid: "0f107b19-fe4f-579b-b246-0274ca8b6417"
diamondUuid: "b819021e-72ff-8bb8-9352-211aa4e8c686"
uuid: "bf6268d8-f014-85bc-972c-36f4ff48501c"
horo: 1
typography:
  partition: competency
  bondDegree: 33
standards:
  - "ISO 30405:2016 essential-vs-optional (mandatory gating)"
  - "ISO 30405:2016 essential-vs-optional (mandatory gating)`"
  - SFIA
  - "SFIA 8 responsibility-levels-1-7 (the shared held/required scale)"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e452cd6a-6c4d-8cb8-a7c3-98aadfff9699"
  stages:
    - stage: path
      stageUuid: "12f44faa-9fa9-86c8-b8ef-e5b572270824"
    - stage: trinity
      stageUuid: "eeca39e4-9931-8e65-b1fa-c76f7f695ce3"
    - stage: boundary
      stageUuid: "6902e0f6-b94a-89b1-a16c-0b6f22e4ca01"
    - stage: links
      stageUuid: "cc0562f0-ef6f-8515-b8c1-55271297625c"
    - stage: horo
      stageUuid: "91f74f6d-0b87-8c84-842a-7136614e2bc0"
    - stage: seal
      stageUuid: "bc69c28b-e57f-804a-bb90-fd2577c02d6a"
    - stage: uuid
      stageUuid: "320b722d-6298-8a40-bfba-79fb3b2fbc4e"
version: 2
---
# competency-gap — required − held, on the shared scale

The gap law: `gap = max(0, required − held)` per competency, met when `gap === 0`. One pure function (no I/O, no persistence — trivially testable, stateless) that scores a held competency set against a required set and returns per-line gaps plus `meetsAllMandatory` and a `matchScore` (fraction met, 1 when nothing is required).

The [[merge]] made executable: the SAME function scores a human hire against a job AND an AI agent against a task, because both are held-vs-required on the identical SFIA 1-7 [[standard]]. Human↔agent is one [[duality]] over a single measure; collapsing the prefix (`human`/`agent` competency → one competency) is the merge run on the naming axis. Each held/required line is a typed [[field]] pair (competency + proficiency); the competency set itself is read from [[collections]], scored here, the gap persisted in [[accounting]] (or routed) by the caller — never inside this leaf.

Sequence position **7** — a compute/measure surface (like the pure-form calculators), no state of its own.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 30405:2016 essential-vs-optional (mandatory gating)`


- **SFIA 8 responsibility-levels-1-7 (the shared held/required scale)** — both human and agent proficiency maps onto SFIA levels 1–7.
- **ISO 30405:2016 essential-vs-optional (mandatory gating)** — the `mandatory` flag gates a match; a mandatory gap > 0 blocks `meetsAllMandatory`.

## Common mistakes
- Making it a collection or letting it touch the DB — it is a pure function; persist only its *result*.
- Treating mandatory gaps as advisory — a mandatory line with `gap > 0` blocks the match (`meetsAllMandatory === false`).
- Inventing a second scale for agents — humans and agents share the one SFIA scale; that shared scale IS the merge.

**Law — [[law]]: the gap is the pure stateless function `max(0, required − held)` per competency, met only at zero, with any mandatory gap > 0 blocking the whole match — it computes, it never persists.**
