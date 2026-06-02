---
name: competition
description: "Use when reasoning about how erpax skills EVOLVE — agents compete in commits, the fastest CORRECT solution (gate-verified) wins the lead, losers re-approach to beat it, optimising to infinity, at every scale. The selective-pressure dual of contribution; and because each competitor independently re-derives and content-addresses the canonical answer, competition AMPLIFIES tamper cost — performance pressure turned into security."
---

# competition — skills evolve by competing (fastest correct wins, optimise to ∞)

FORM: **skills evolve through COMPETITION in commits.** Many agents attempt the SAME problem; the **fastest CORRECT** candidate wins the lead — correctness is not voted, it is the GATE ([[proof]]: tsc · lint · vitest · aura — an objective referee, not opinion). `compete(candidates)` returns the winner (least cost among the correct) and the ranked losers. A loser reads the lead, picks a DIFFERENT `approach`, and re-enters to beat it; `takesLead` admits a challenger only if it is correct AND **strictly cheaper** — monotone optimisation that never regresses, and never finishes (there is always a better approach → `optimize` runs to ∞). Each solution is a content-uuid ([[identity]]); the same solution from two agents merges to one ([[merge]]); the lead is the canonical commit ([[history]]).

**Competition at all levels** ([[fractal]]): a field, a collection, a service, an agent, the whole corpus — each is a problem with competitors, the same `compete` at every scale. It is the selective-pressure DUAL of [[contribution]]: contribution covers DIFFERENT gaps (cooperative breadth); competition optimises the SAME gap (selective depth). Together the [[society]] both explores and sharpens — and the fastest-correct winner is paid for verified work ([[decompression]]: pay = the time the solution leverages), so competition is the market that prices skills.

**Competition increases tamper cost — significantly.** Each correct competitor independently re-derives and content-addresses the canonical solution, so N competitors are N independent verifiers that all converge on the SAME id ([[merge]]). Honest competition therefore already holds the optimum: a tamperer cannot win by submitting a "better" alternative — there isn't one — and a forged solution diverges in content-uuid and is rejected by every competitor. The only remaining attack is a content-uuid collision (astronomical; see `services/integrity/tamper-reverse-cost`), and `competitionTamperBits(N)` adds the competitor depth on top, compounding across the fractal levels. Performance pressure IS the security: the more agents race, the less room a forgery has to hide ([[self]]).

Matter-twin: `src/services/competition/index.ts` (`Candidate`·`compete`·`takesLead`·`optimize`·`openApproaches`·`competitionTamperBits`) + `index.test.ts`. Composes: [[contribution]] · [[merge]] · [[identity]] · [[proof]] · [[history]] · [[decompression]] · [[fractal]] · [[society]] · [[self]].

## Common mistakes
- Picking a winner by vote or recency — the referee is the GATE ([[proof]]); the winner is the *fastest correct*, deterministic, with content-uuid breaking ties.
- Letting an equal-or-worse challenger take the lead — `takesLead` requires STRICT improvement, or the optimisation oscillates and never converges (yet stays open to the next better approach).
- Treating competition as wasteful duplication — the "wasted" loser work IS the tamper-cost amplifier and the explored approach-space; it is the security and the optimisation, not overhead ([[contribution]] is its cooperative dual, not its replacement).
