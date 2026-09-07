---
name: parity
description: "Use when reasoning about parity — runs — **18 lanes**, the authority. Two other files claim to run the gate and each was written by hand:"
atomPath: "gate/parity"
coordinate: "gate/parity · 2/share · 60979de2"
contentUuid: "b2e21dd9-ad49-548b-98f3-aa4e7210ce6f"
diamondUuid: "02732e73-a7ae-8153-88c2-81db1e306026"
uuid: "60979de2-47f7-832e-b2ce-42b0b497fc73"
horo: 2
typography:
  partition: gate
  bondDegree: 9
standards:
  - "ISO/IEC 25010:2023 §5.6 maintainability — one truth, one address"
bindings: []
signatures:
  computationUuid: "f5ba37ff-5e28-8d37-aaf0-fa6d3ce51721"
  stages:
    - stage: path
      stageUuid: "2263c180-81f0-8b90-b718-06cb329fcaa4"
    - stage: trinity
      stageUuid: "f580b5ab-098f-8339-89de-86d8f1c2de25"
    - stage: boundary
      stageUuid: "69891b99-5646-81a8-a399-812376f14425"
    - stage: links
      stageUuid: "35dd4921-9086-81c7-b905-e5ce4e99b9aa"
    - stage: horo
      stageUuid: "4691c0c6-ecd4-875e-b98f-dfb6c2c35308"
    - stage: seal
      stageUuid: "fbea4f49-eb33-8b57-810c-35cee8ba86be"
    - stage: uuid
      stageUuid: "e560eb31-b33f-8870-a227-dc19b53e5bd1"
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
