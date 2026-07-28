---
name: gap
description: "Use when computing held-vs-required skill gaps — matches held competencies against job/task requirements and scores on the SFIA 1-7 scale. The pure required − held function (recruiting, performance review, agent task-routing)."
atomPath: "competency/gap"
coordinate: "competency/gap · 7/descent · 641c869a"
contentUuid: "bffa53bc-7457-5af5-8d68-5300a53c4d1b"
diamondUuid: "7f6b4f8c-a4e2-87ce-9469-be99e6533042"
uuid: "641c869a-fe23-823c-a03c-f01d1c3c0ede"
horo: 7
bonds:
  in:
    - accounting
    - collections
    - competency
    - decompression
    - duality
    - fields
    - law
    - merge
    - standard
    - train
    - training
  out:
    - accounting
    - collections
    - decompression
    - duality
    - fields
    - law
    - merge
    - standard
    - train
    - training
typography:
  partition: competency
  bondDegree: 30
  neighbors: []
standards:
  - "ISO 30405:2016 essential-vs-optional (mandatory gating)"
  - "ISO 30405:2016 essential-vs-optional (mandatory gating)`"
  - SFIA
  - "SFIA 8 responsibility-levels-1-7 (the shared held/required scale)"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - collections
    - duality
    - fields
    - law
    - merge
    - standard
  matrix:
    - accounting
    - collections
    - decompression
    - duality
    - fields
    - law
    - merge
    - standard
    - train
    - training
  backlinks:
    - accounting
    - collections
    - decompression
    - duality
    - fields
    - law
    - merge
    - standard
    - train
    - training
signatures:
  computationUuid: "9cf7a00e-3519-85b9-9889-3a053519bd97"
  stages:
    - stage: path
      stageUuid: "12f44faa-9fa9-86c8-b8ef-e5b572270824"
    - stage: trinity
      stageUuid: "eeca39e4-9931-8e65-b1fa-c76f7f695ce3"
    - stage: boundary
      stageUuid: "4689aec8-7094-89ff-ae8e-9eaaacedcbb5"
    - stage: links
      stageUuid: "a8e1adfc-6846-8cbf-bb1e-c1c4cc729fdd"
    - stage: horo
      stageUuid: "8dd0bd07-5f26-84ec-87db-aee54d1aa3a1"
    - stage: seal
      stageUuid: "bc69c28b-e57f-804a-bb90-fd2577c02d6a"
    - stage: uuid
      stageUuid: "b97a6bde-ec68-8015-a633-b58b1021644f"
version: 2
---
# competency-gap — required − held, on the shared scale

The gap law: `gap = max(0, required − held)` per competency, met when `gap === 0`. One pure function (no I/O, no persistence — trivially testable, stateless) that scores a held competency set against a required set and returns per-line gaps plus `meetsAllMandatory` and a `matchScore` (fraction met, 1 when nothing is required).

The [[merge]] made executable: the SAME function scores a human hire against a job AND an AI agent against a task, because both are held-vs-required on the identical SFIA 1-7 [[standard]]. Human↔agent is one [[duality]] over a single measure; collapsing the prefix (`human`/`agent` competency → one competency) is the merge run on the naming axis. Each held/required line is a typed [[fields]] pair (competency + proficiency); the competency set itself is read from [[collections]], scored here, the gap persisted in [[accounting]] (or routed) by the caller — never inside this leaf.

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
