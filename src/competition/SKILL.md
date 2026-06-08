---
name: competition
description: "Use when reasoning about how erpax skills EVOLVE — agents compete in commits, the fastest CORRECT solution (gate-verified) wins the lead, losers re-approach to beat it, optimising to infinity, at every scale. The selective-pressure dual of contribution; and because each competitor independently re-derives and content-addresses the canonical answer, competition AMPLIFIES tamper cost — performance pressure turned into security."
atomPath: competition
coordinate: competition · 2/share · bb22262d
contentUuid: "5f252b32-b9e5-596f-828e-ea31b55aa853"
diamondUuid: "66c59467-d303-87fe-81c5-101b328c2611"
uuid: "bb22262d-24f7-8dbc-a009-2161ae25e8d7"
horo: 2
bonds:
  in:
    - classroom
    - contribution
    - cost
    - decide
    - decompression
    - education
    - fractal
    - history
    - identity
    - law
    - logic
    - merge
    - network
    - peace
    - proof
    - routing
    - self
    - society
    - zeropoint
  out:
    - classroom
    - contribution
    - cost
    - decide
    - decompression
    - education
    - fractal
    - history
    - identity
    - law
    - logic
    - merge
    - network
    - peace
    - proof
    - routing
    - self
    - society
    - zeropoint
typography:
  partition: competition
  bondDegree: 57
  neighbors: []
standards:
  - "ISO/IEC 25010:2023 §5.2 performance-efficiency (fastest-correct selection)"
bindings: []
neighbors:
  wikilink:
    - contribution
    - decompression
    - fractal
    - history
    - identity
    - law
    - merge
    - proof
    - self
    - society
  matrix:
    - classroom
    - contribution
    - cost
    - decide
    - decompression
    - education
    - fractal
    - history
    - identity
    - law
    - logic
    - merge
    - network
    - peace
    - proof
    - routing
    - self
    - society
    - zeropoint
  backlinks:
    - classroom
    - contribution
    - cost
    - decide
    - decompression
    - education
    - fractal
    - history
    - identity
    - law
    - logic
    - merge
    - network
    - peace
    - proof
    - routing
    - self
    - society
    - zeropoint
signatures:
  computationUuid: "f558156f-06bc-836f-8692-16a05d0ec571"
  stages:
    - stage: path
      stageUuid: "fa6c9ca3-e81f-8762-85d6-675365bb307e"
    - stage: trinity
      stageUuid: "84a9b260-0dc7-82c7-b065-c958942dee18"
    - stage: boundary
      stageUuid: "b95c4ff9-f549-8212-b294-ae0058bb30cc"
    - stage: links
      stageUuid: "e27e41bb-1005-8c37-bc27-dea38ef3aa46"
    - stage: horo
      stageUuid: "27736562-24c1-801a-ba85-abe00d0cd82a"
    - stage: seal
      stageUuid: "c25262c4-3d12-828d-84be-eda6bc32be9f"
    - stage: uuid
      stageUuid: "734f13a9-64e9-8738-bafa-6f0d81718442"
version: 2
---
# competition — skills evolve by competing (fastest correct wins, optimise to ∞)

FORM: **skills evolve through COMPETITION in commits.** Many agents attempt the SAME problem; the **fastest CORRECT** candidate wins the lead — correctness is not voted, it is the GATE ([[proof]]: tsc · lint · vitest · aura — an objective referee, not opinion). `compete(candidates)` returns the winner (least cost among the correct) and the ranked losers. A loser reads the lead, picks a DIFFERENT `approach`, and re-enters to beat it; `takesLead` admits a challenger only if it is correct AND **strictly cheaper** — monotone optimisation that never regresses, and never finishes (there is always a better approach → `optimize` runs to ∞). Each solution is a content-uuid ([[identity]]); the same solution from two agents merges to one ([[merge]]); the lead is the canonical commit ([[history]]).

**Competition at all levels** ([[fractal]]): a field, a collection, a service, an agent, the whole corpus — each is a problem with competitors, the same `compete` at every scale. It is the selective-pressure DUAL of [[contribution]]: contribution covers DIFFERENT gaps (cooperative breadth); competition optimises the SAME gap (selective depth). Together the [[society]] both explores and sharpens — and the fastest-correct winner is paid for verified work ([[decompression]]: pay = the time the solution leverages), so competition is the market that prices skills.

**Competition increases tamper cost — significantly.** Each correct competitor independently re-derives and content-addresses the canonical solution, so N competitors are N independent verifiers that all converge on the SAME id ([[merge]]). Honest competition therefore already holds the optimum: a tamperer cannot win by submitting a "better" alternative — there isn't one — and a forged solution diverges in content-uuid and is rejected by every competitor. The only remaining attack is a content-uuid collision (astronomical; see `services/integrity/tamper-reverse-cost`), and `competitionTamperBits(N)` adds the competitor depth on top, compounding across the fractal levels. Performance pressure IS the security: the more agents race, the less room a forgery has to hide ([[self]]).

Matter-twin: `src/services/competition/index.ts` (`Candidate`·`compete`·`takesLead`·`optimize`·`openApproaches`·`competitionTamperBits`) + `index.test.ts`. Composes: [[contribution]] · [[merge]] · [[identity]] · [[proof]] · [[history]] · [[decompression]] · [[fractal]] · [[society]] · [[self]].

## Standards

- **ISO/IEC 25010:2023 §5.2 performance-efficiency (fastest-correct selection)** — the competition model: the winner is the fastest correct candidate (least cost among gate-verified solutions).

## Common mistakes
- Picking a winner by vote or recency — the referee is the GATE ([[proof]]); the winner is the *fastest correct*, deterministic, with content-uuid breaking ties.
- Letting an equal-or-worse challenger take the lead — `takesLead` requires STRICT improvement, or the optimisation oscillates and never converges (yet stays open to the next better approach).
- Treating competition as wasteful duplication — the "wasted" loser work IS the tamper-cost amplifier and the explored approach-space; it is the security and the optimisation, not overhead ([[contribution]] is its cooperative dual, not its replacement).

**Law — [[law]]: the fastest CORRECT candidate wins (correctness is the gate, [[proof]], not a vote); a challenger takes the lead only if strictly cheaper — monotone optimisation to ∞ where every independent verifier converging on one [[identity]] amplifies tamper-cost.**
