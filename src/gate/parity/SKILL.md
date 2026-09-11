---
name: parity
description: "Use when reasoning about parity — runs — **18 lanes**, the authority. Two other files claim to run the gate and each was written by hand:"
atomPath: "gate/parity"
coordinate: "gate/parity · 8/crest · 2da9b2f6"
contentUuid: "b6320425-5320-55f7-abf7-7bc1e2562611"
diamondUuid: "4952f3ae-5d5c-8504-9ced-3954e1514f4b"
uuid: "2da9b2f6-2220-8cdb-b339-7ecfb9053e21"
horo: 8
typography:
  partition: gate
  bondDegree: 12
standards:
  - "ISO/IEC 25010:2023 §5.6 maintainability — one truth, one address"
bindings: []
signatures:
  computationUuid: "27070b8e-b610-8215-ae8d-22bac32974c5"
  stages:
    - stage: path
      stageUuid: "2263c180-81f0-8b90-b718-06cb329fcaa4"
    - stage: trinity
      stageUuid: "f580b5ab-098f-8339-89de-86d8f1c2de25"
    - stage: boundary
      stageUuid: "9165b278-91dc-805c-ac42-15c23f4abdf9"
    - stage: links
      stageUuid: "9e510444-d7da-8e0a-9964-f5dbeb59ff6c"
    - stage: horo
      stageUuid: "ddb9d58b-2fd4-8fd9-bb18-d8c66203a54e"
    - stage: seal
      stageUuid: "fbea4f49-eb33-8b57-810c-35cee8ba86be"
    - stage: uuid
      stageUuid: "ec0e85d5-5a0c-8b0b-9d34-b64a3c3222f8"
version: 2
---
# gate/parity — three definitions of one gate, and only one of them is the gate

`pnpm check` runs `GATE_LANES` — **18 lanes**, the authority. Two other files claim to run the
gate and each was written by hand:

| surface | lanes of the 18 it runs |
| --- | ---: |
| `.husky/pre-push` | 4 |
| `.github/workflows/ci.yml` | 5 |
| **both** | **0** |

The pre-push header says *"Same checks as `pnpm run check`"* and names *"lint / tsc / vitest"* among
what "still fails the gate". It runs **none of those three**. That sentence is the defect this
corpus already gates in prose — [[rules]]/command: *a step that cannot run reports the same green as
a step that passed* — living in the file that is supposed to be the last gate before a push.

## What the drift cost, measured

Thirty consecutive CI runs on `main`: **0 green**. Every one of those pushes passed the hook,
because the hook does not run the lanes that were failing. `cloudflare.yml` deploys on
`workflow_run: CI` and refuses a non-green conclusion, so every deploy in that window is
**`skipped`** — the corpus had not shipped, and nothing local said so.

A drift like that is not noticed by looking harder. It is noticed by computing it.

## What it computes, and what it cannot

`laneGaps` asks, for every lane in `GATE_LANES`, whether each surface's **executable** text contains
that lane's command. Full-line comments are stripped first, because a lane named in a comment is
prose about the gate.

**Honest boundary.** This is a fact about TEXT, not about execution. A surface that invokes a lane
by another spelling reads as missing it — the error direction is the safe one: it over-reports a gap
and never invents coverage. An inline `#` inside a quoted string is not handled, which can only make
a surface look like it covers more, so the coverage number is a ceiling. And parity is not
sufficiency: three surfaces agreeing on a bad lane list agree on a bad gate.

`GATE_SURFACES` is DECLARED — a new surface that claims to run the gate is invisible here until it
is named, which is the standing cost of the approach and is stated rather than hidden.

**Law — [[law]]: a gate has one definition. Every surface that claims to run it either runs that
definition or names, in the open, the lanes it does not — because a hand-written second list drifts
silently, and the drift is invisible from inside either one.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: one truth, one address.
- **ISO 19011:2018 §6.4** — audit evidence: a check that did not run produced none.

Composes: [[gate]] · [[rules]]/command · [[rules]]/copy · [[law]].

## Notes from the code

Long docstrings live here; the code keeps one line and a pointer ([[rules]]/word-matter — a comment
earns its place, and a file that is 60% commentary is prose with code in it).

### `GATE_SURFACES` — declared, and not exported

It cannot be derived. Discovering "files that invoke the gate" answers a different question: it
finds `.github/workflows/cloudflare.yml`, misses `.husky/pre-push`, and moves the drift `31 → 32`.
The list is a JUDGEMENT about which surfaces must agree with the authority, not a fact about which
files mention it — so it stays declared.

It is not EXPORTED, because an exported data literal is seal-debt the constants audit counts
([[matrix]]), and a two-element list consumed inside its own atom does not need to be one. Its test
declares the surfaces it expects rather than importing this list and asserting the implementation
agrees with itself — that comparison was a tautology ([[rules]]/mirror) and could not fail.

### `executableText` — why a comment is not a lane

A lane named only in a comment is prose about the gate, not the gate. Both surfaces comment with
`#`, and this strips a line whose first non-space character is one. An inline `#` inside a quoted
string is NOT handled, which can only make a surface look like it covers MORE than it does — so the
count is a ceiling on coverage, never a floor.

### `laneGaps` — a fact about text

A lane is "run" by a surface when the surface's executable text contains the lane's COMMAND. That is
a fact about text, not about execution: a surface could invoke the lane by another spelling and be
reported as missing it. The direction of that error is the safe one — it over-reports a gap and
never invents coverage.
