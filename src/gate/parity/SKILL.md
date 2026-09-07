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
