---
name: decide
description: "Use when the society must pick a winner among candidate solutions — the composed decision wiring the three selection laws into one: gate-CORRECT (competition, the referee is the gate not a vote), HARMONIC-preferred (logic, the self-consistent resolve first), MOST-EFFICIENT (cost, max output per spend), cheapest, deterministic by content-uuid. decide(candidates) is the single function the agent society runs to choose; the runtime dispatch it drives is the boundary."
atomPath: decide
coordinate: "decide · 2/share · f2e5262a"
contentUuid: "0e993a20-1e78-564c-8418-26567d7a0d25"
diamondUuid: "ee32d7f6-faaa-8913-92b4-b7a9321b0cfc"
uuid: "f2e5262a-5889-85ef-8e86-00640ae5d892"
horo: 2
bonds:
  in:
    - budgetvariance
    - claim
    - classroom
    - competition
    - concatenate
    - confirm
    - cost
    - decompression
    - gate
    - guardian
    - harmony
    - improve
    - law
    - logic
    - materiality
    - merge
    - peace
    - proof
    - publish
    - rosetta
    - rules
    - self
    - society
    - uuid
    - variance
  out:
    - budgetvariance
    - claim
    - classroom
    - competition
    - concatenate
    - confirm
    - cost
    - decompression
    - gate
    - guardian
    - harmony
    - improve
    - law
    - logic
    - materiality
    - merge
    - peace
    - proof
    - publish
    - rosetta
    - rules
    - self
    - society
    - uuid
    - variance
typography:
  partition: decide
  bondDegree: 75
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - competition
    - confirm
    - cost
    - decompression
    - gate
    - guardian
    - harmony
    - law
    - logic
    - merge
    - peace
    - proof
    - rules
    - self
    - society
    - uuid
  matrix:
    - budgetvariance
    - claim
    - classroom
    - competition
    - concatenate
    - confirm
    - cost
    - decompression
    - gate
    - guardian
    - harmony
    - improve
    - law
    - logic
    - materiality
    - merge
    - peace
    - proof
    - publish
    - rosetta
    - rules
    - self
    - society
    - uuid
    - variance
  backlinks:
    - budgetvariance
    - claim
    - classroom
    - competition
    - concatenate
    - confirm
    - cost
    - decompression
    - gate
    - guardian
    - harmony
    - improve
    - law
    - logic
    - materiality
    - merge
    - peace
    - proof
    - publish
    - rosetta
    - rules
    - self
    - society
    - uuid
    - variance
signatures:
  computationUuid: "9b612e3e-329e-8d26-a744-826189bf23ad"
  stages:
    - stage: path
      stageUuid: "e30bdc24-cda7-8b6c-b830-b96a3a530e7b"
    - stage: trinity
      stageUuid: "b1f3dfe2-8a50-8664-85b3-8608546644ef"
    - stage: boundary
      stageUuid: "5c31db99-0602-8c9c-a684-8f2428156c44"
    - stage: links
      stageUuid: "15472826-9719-8d8e-8f47-76d5796100cc"
    - stage: horo
      stageUuid: "2bf846a5-2e35-83ac-943f-642f4c8f2e0e"
    - stage: seal
      stageUuid: "71809d7e-cb14-892b-bc6d-d05fa2ad062e"
    - stage: uuid
      stageUuid: "c3c3989f-a878-8055-bb7a-49da58bb007f"
version: 2
---
# decide — the society's composed decision (correct · harmonic · efficient)

FORM: **the society decides by composing its three selection laws into ONE winner.** `decide(candidates)`:
1. keeps only the **CORRECT** (gate-verified) candidates — the referee is the gate ([[competition]] / [[proof]]), never a vote; if none are correct, there is no winner;
2. prefers the **HARMONIC** ones ([[logic]]: the self-consistent resolve first — they need no external coordination), falling back to all-correct only if none are harmonic;
3. among those, takes the **MOST EFFICIENT** ([[cost]]: max output per spend), breaking ties by lowest cost (the fastest, [[competition]]) then content-uuid (deterministic — same field, same choice everywhere, [[merge]]).

So the run's three laws are not three separate checks an operator juggles — they are one function the society runs to pick what advances: correctness gates, harmony orders, efficiency selects. This is the decision the agent society makes every time it convenes; the actual runtime — spawning the candidates, applying the winner's effect, paying it ([[decompression]]) — is the boundary `decide` drives. Building dominates, and `decide` is how the society chooses the best build ([[peace]] / [[society]]).

Matter co-located in `src/decide/index.ts` (`SocietyCandidate`·`decide`) over [[competition]] + [[cost]] + [[logic]]. Composes: [[competition]] · [[logic]] · [[cost]] · [[proof]] · [[decompression]] · [[merge]] · [[peace]] · [[society]] · [[self]].

## Who decides commit and push is computable — `commitDecision` · `pushDecision`

The same law, turned on the git action itself. A commit is not the author's discretion and a push is not a reviewer's whim — both are decided by **gates that already run**: the write-time seal ([[confirm]] — trinity complete, no dead links/refs, import purity) decides the **commit**; the full lanes ([[gate]] — does it LOAD, [[rules]], corpus) decide the **push**. `commitDecision(verdicts)` / `pushDecision(commitVerdicts, pushLanes)` return whether the action is **warranted** and **name who decided** — the blocking gate, or the registry when the tree is clean. It is `decide` at another scale: correctness first (a gate that says no wins), **fail-closed** (no gate ran is not a yes; only a literal pass passes, [[guardian]]), the decider an **axis, never a person**.

- **Push ⊇ commit** (`@invariant`, tested): a push folds the commit verdicts in, so a blocked commit blocks the push whatever the lanes say — you cannot push what you could not commit.
- **Honest boundary.** This computes the **warrant** and names its decider; it does **not execute** the irreversible push. Sending commits outward stays a confirmed checkpoint (the push is the review point; outward-facing action is confirmed, not automated). The decision is computable and computed — pulling the trigger is not this atom's to do.

**Law — [[law]]: the society picks one winner by composing three selection laws into ONE function — correctness gates (the [[gate]]/[[proof]] referee, never a vote), [[harmony]] orders, efficiency ([[cost]]) selects — ties broken by lowest cost then content-[[uuid]] so every node decides identically ([[merge]]); and the same referee decides commit and push — who decides is a computed axis, never discretion.**

## Common mistakes
- Selecting by efficiency before filtering correctness — correctness is absolute and first; an efficient wrong answer is not a candidate.
- Letting a disharmonic candidate win when a harmonic one exists — harmony is preferred over raw efficiency; only when no harmonic candidate is correct does the field open to all.
- Non-deterministic tie-breaks — equal efficiency and cost resolve by content-uuid, so every node decides identically ([[merge]]).
