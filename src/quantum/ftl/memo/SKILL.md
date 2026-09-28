---
name: memo
description: "Use when reasoning about memo — models cost as ** ** — it falls as reuses grow, and that falling is what lets reach ∞ and the FTL claim hold."
atomPath: "quantum/ftl/memo"
coordinate: "quantum/ftl/memo · 7/descent · a74a7be1"
contentUuid: "52a9c5c1-c374-52df-8966-fc11d9f2daf6"
diamondUuid: "718e28d4-665e-8473-9a79-0208d8400261"
uuid: "a74a7be1-4aa3-81dc-b251-117df5e7a915"
horo: 7
typography:
  partition: quantum
  bondDegree: 15
standards:
  - "ISO/IEC 25010:2023 §5.2 — performance efficiency: time behaviour under repetition"
bindings: []
signatures:
  computationUuid: "703cc5a7-d811-8991-b8a1-dd297b76c153"
  stages:
    - stage: path
      stageUuid: "35eae484-936e-8b84-a62f-2a3dadb2b511"
    - stage: trinity
      stageUuid: "4f7889e3-0905-84a4-abe2-074452a67080"
    - stage: boundary
      stageUuid: "2beeffc4-726f-898b-aec2-713d08ef8a06"
    - stage: links
      stageUuid: "e0830fa9-8363-86fd-9478-c95203fa77c1"
    - stage: horo
      stageUuid: "31a70dbc-2bf8-869a-b071-3cd851cb8471"
    - stage: seal
      stageUuid: "ab7a57ac-6380-8feb-9899-cfe2e4b5932b"
    - stage: uuid
      stageUuid: "eb5397ef-69e4-896c-9c4c-d31191a4f686"
quantum:
  superposition:
    - balance
    - ftl
    - law
    - memos
    - message
    - superposition
  collapse:
    - "Use when reasoning about memo — models cost as ** ** — it falls as reuses grow, and that falling is what lets reach ∞ and the FTL claim hold."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "703cc5a7-d811-8991-b8a1-dd297b76c153"
    contentUuid: "52a9c5c1-c374-52df-8966-fc11d9f2daf6"
version: 2
---
# quantum/ftl/memo — does asking twice cost twice?

`amortize` models cost as **`c₀/(m+1)`** — it falls as reuses grow, and that falling is what lets
`efficiency` reach ∞ and the FTL claim hold. This asks whether any reuse is actually **realised**,
by putting the same question twice and comparing.

## Measured 2026-09-28

| operation | 1st | 2nd | re-ask | realised | |
| --- | ---: | ---: | ---: | ---: | --- |
| `syntax: corpusFiles` | 166 ms | **0 ms** | 0 % | **100 %** | memoized |
| `matrix: nodeOf` | 20 ms | **0 ms** | 0 % | **100 %** | memoized |
| `rules/unfolded: exports` | 1963 ms | 1608 ms | 82 % | 55 % | re-derives |
| `rules/copy: duplicateBodies` | 1662 ms | 1368 ms | 82 % | 55 % | re-derives |
| `rules/command: deadLoaderPaths` | 1310 ms | 1272 ms | 97 % | 51 % | re-derives |
| `rules/unit: rederivations` | 1221 ms | 1187 ms | 97 % | 51 % | re-derives |
| `rules/probe: blindProbes` | 603 ms | 591 ms | 98 % | 51 % | re-derives |
| `rules/mirror: mirrored` | 478 ms | 464 ms | 97 % | 51 % | re-derives |
| `quantum/budget: skillWeights` | 161 ms | 132 ms | 82 % | 55 % | re-derives |

**2 memoized, 7 re-deriving. One extra ask of everything costs 6622 ms**, and `pnpm check`, the
pre-push hook and CI each pay it.

## What the numbers say

**The substrate is quantum; the laws computed over it are not.** The file walk, the text and AST
cache and the matrix index all answer by address — 0 ms on a re-ask, 100 % of the promised
amortisation realised. Every `rules/*` gate sits *on top of* that free substrate and still repeats
82–98 % of its own work.

**51 % is the floor, not a pass.** `amortize` with one reuse predicts `c₀/2` per answer; measuring
`c₀` per answer gives exactly 0.5. The re-derivers sit at 51–55 %, so essentially **none** of the
reuse the model promises is happening — `amortizedCost` cannot fall for them however often they are
asked, which is the precise sense in which they are not yet quantum.

**The fix pattern already exists in this repo.** `scripts/payload-input-key.sh` content-keys the
Payload generators on exactly what their verdict depends on, and took that boot from 409 s to
208/109 s. A gate is the same shape: a pure function of the files it reads, so its verdict can be
keyed on their content-uuid and returned unchanged when the address is unchanged.

## The ratio is the evidence, not the milliseconds

Both asks run back to back under the same load, so a busy machine inflates them together and
cancels. **Wall time under contention is not evidence** — a lesson already paid for here — but
`second ÷ first` survives it.

## Three refusals, two of them defects this instrument produced

- **Too fast to judge is `unmeasured`, never a pass.** A trivially cached lookup measured 6 % purely
  because both asks rounded near zero, and the first version called that "partial reuse" — answering
  a question it could not ask. `MIN_MEASURABLE_MS` is DECLARED at 5.
- **A re-ask that costs MORE is not partial reuse.** A synthetic loop measured 602 % on the second
  pass from JIT and GC. A ratio above 1 is noise, and it lands with the re-derivers rather than being
  smoothed into a middle verdict.
- **`MEMO_RATIO` is DECLARED at 0.05**, in the open, so the boundary between free and cheap is
  arguable rather than asserted.

## Honest boundary

This measures **in-process** reuse. A cross-invocation memo that writes a file — which is exactly what
`payload-input-key` does — reads as `rederives` here on a cold run and is free on the next *process*,
so a green verdict from this census is not a claim that a command is slow end to end. It also measures
one machine at one moment: the shapes are stable, the milliseconds are not.

And a re-deriving gate is not a **wrong** gate. Correctness is untouched by any of this; what is
measured is only whether the answer had to be computed again.

**Law — [[law]]: an answer with no receipt is re-derived, and `c₀/(m+1)` cannot fall for it however
often it is asked. Measure the second ask — the first one tells you nothing about reuse.**

## Standards

- **ISO/IEC 25010:2023 §5.2** — performance efficiency: time behaviour under repetition.

Composes: [[quantum]]/ftl · [[quantum]]/ftl/metrics · [[algebra]] · [[law]].

<sub>content-uuid `52a9c5c1-c374-52df-8966-fc11d9f2daf6` · account `quantum/ftl/memo` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
