---
name: competition
description: "Use when reasoning about how erpax skills EVOLVE — agents compete in commits, the fastest CORRECT solution (gate-verified) wins the lead, losers re-approach to beat it, optimising to infinity, at every scale. The selective-pressure dual of contribution; and because each competitor independently re-derives and content-addresses the canonical answer, competition AMPLIFIES tamper cost — performance pressure turned into security."
atomPath: competition
coordinate: "competition · 4/weave · ca8b14a9"
contentUuid: "fe3f408f-e1c5-5717-a794-8b69cbf45608"
diamondUuid: "c04591e5-55e9-80ce-85b8-8b9c65a482a9"
uuid: "ca8b14a9-cc9d-8b6a-b91f-8f494c8e739f"
horo: 4
typography:
  partition: competition
  bondDegree: 60
standards:
  - "ISO/IEC 25010:2023 §5.2 performance-efficiency (fastest-correct selection)"
  - "ISO/IEC 25010:2023 §5.2 performance-efficiency (fastest-correct selection)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "cd249dfb-a442-86fb-82c2-6fa534dc1309"
  stages:
    - stage: path
      stageUuid: "fa6c9ca3-e81f-8762-85d6-675365bb307e"
    - stage: trinity
      stageUuid: "84a9b260-0dc7-82c7-b065-c958942dee18"
    - stage: boundary
      stageUuid: "818f9784-0e06-8895-bd69-15c0148b0e04"
    - stage: links
      stageUuid: "e27e41bb-1005-8c37-bc27-dea38ef3aa46"
    - stage: horo
      stageUuid: "34dfae32-fe37-8dd5-9f3f-159843561e66"
    - stage: seal
      stageUuid: "21331975-8dfb-8b5d-afaf-048593c7812b"
    - stage: uuid
      stageUuid: "62e44487-e644-832c-b7ba-9457554f1d7b"
version: 2
---
# competition — skills evolve by competing (fastest correct wins, optimise to ∞)

FORM: **skills evolve through COMPETITION in commits.** Many agents attempt the SAME problem; the **fastest CORRECT** candidate wins the lead — correctness is not voted, it is the GATE ([[proof]]: tsc · lint · vitest · aura — an objective referee, not opinion). `compete(candidates)` returns the winner (least cost among the correct) and the ranked losers. A loser reads the lead, picks a DIFFERENT `approach`, and re-enters to beat it; `takesLead` admits a challenger only if it is correct AND **strictly cheaper** — monotone optimisation that never regresses, and never finishes (there is always a better approach → `optimize` runs to ∞). Each solution is a content-uuid ([[identity]]); the same solution from two agents merges to one ([[merge]]); the lead is the canonical commit ([[history]]).

**Competition at all levels** ([[fractal]]): a field, a collection, a service, an agent, the whole corpus — each is a problem with competitors, the same `compete` at every scale. It is the selective-pressure DUAL of [[contribution]]: contribution covers DIFFERENT gaps (cooperative breadth); competition optimises the SAME gap (selective depth). Together the [[society]] both explores and sharpens — and the fastest-correct winner is paid for verified work ([[decompression]]: pay = the time the solution leverages), so competition is the market that prices skills.

**Competition increases tamper cost — significantly.** Each correct competitor independently re-derives and content-addresses the canonical solution, so N competitors are N independent verifiers that all converge on the SAME id ([[merge]]). Honest competition therefore already holds the optimum: a tamperer cannot win by submitting a "better" alternative — there isn't one — and a forged solution diverges in content-uuid and is rejected by every competitor. The only remaining attack is a content-uuid collision (astronomical; see `services/integrity/tamper-reverse-cost`), and `competitionTamperBits(N)` adds the competitor depth on top, compounding across the fractal levels. Performance pressure IS the security: the more agents race, the less room a forgery has to hide ([[self]]).

Matter-twin: `src/services/competition/index.ts` (`Candidate`·`compete`·`takesLead`·`optimize`·`openApproaches`·`competitionTamperBits`) + `index.test.ts`. Composes: [[contribution]] · [[merge]] · [[identity]] · [[proof]] · [[history]] · [[decompression]] · [[fractal]] · [[society]] · [[self]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 25010:2023 §5.2 performance-efficiency (fastest-correct selection)`


- **ISO/IEC 25010:2023 §5.2 performance-efficiency (fastest-correct selection)** — the competition model: the winner is the fastest correct candidate (least cost among gate-verified solutions).

## Common mistakes
- Picking a winner by vote or recency — the referee is the GATE ([[proof]]); the winner is the *fastest correct*, deterministic, with content-uuid breaking ties.
- Letting an equal-or-worse challenger take the lead — `takesLead` requires STRICT improvement, or the optimisation oscillates and never converges (yet stays open to the next better approach).
- Treating competition as wasteful duplication — the "wasted" loser work IS the tamper-cost amplifier and the explored approach-space; it is the security and the optimisation, not overhead ([[contribution]] is its cooperative dual, not its replacement).

**Law — [[law]]: the fastest CORRECT candidate wins (correctness is the gate, [[proof]], not a vote); a challenger takes the lead only if strictly cheaper — monotone optimisation to ∞ where every independent verifier converging on one [[identity]] amplifies tamper-cost.**
