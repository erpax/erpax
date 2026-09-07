---
name: parity
description: "Use when reasoning about parity — runs — **18 lanes**, the authority. Two other files claim to run the gate and each was written by hand:"
atomPath: "gate/parity"
coordinate: "gate/parity · 1/base · b8a3efd3"
contentUuid: "155913cf-f1ce-557f-8d4f-179a24bea8d2"
diamondUuid: "75a538b6-5c73-80a1-938a-4eb61d74fb5d"
uuid: "b8a3efd3-8411-87da-929a-c9066446c1f9"
horo: 1
typography:
  partition: gate
  bondDegree: 12
standards:
  - "ISO/IEC 25010:2023 §5.6 maintainability — one truth, one address"
bindings: []
signatures:
  computationUuid: "e7046d8b-cb23-81cc-8ff2-811789780ebf"
  stages:
    - stage: path
      stageUuid: "2263c180-81f0-8b90-b718-06cb329fcaa4"
    - stage: trinity
      stageUuid: "f580b5ab-098f-8339-89de-86d8f1c2de25"
    - stage: boundary
      stageUuid: "9165b278-91dc-805c-ac42-15c23f4abdf9"
    - stage: links
      stageUuid: "35dd4921-9086-81c7-b905-e5ce4e99b9aa"
    - stage: horo
      stageUuid: "4f75bcf4-9dc6-837d-be74-c56dc545858f"
    - stage: seal
      stageUuid: "fbea4f49-eb33-8b57-810c-35cee8ba86be"
    - stage: uuid
      stageUuid: "492e7a58-73f6-8801-8159-9cb54de51e61"
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
