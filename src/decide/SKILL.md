---
name: decide
description: "Use when the society must pick a winner among candidate solutions — the composed decision wiring the three selection laws into one: gate-CORRECT (competition, the referee is the gate not a vote), HARMONIC-preferred (logic, the self-consistent resolve first), MOST-EFFICIENT (cost, max output per spend), cheapest, deterministic by content-uuid. decide(candidates) is the single function the agent society runs to choose; the runtime dispatch it drives is the boundary."
atomPath: decide
coordinate: decide · 4/weave · 3d07e328
contentUuid: "82850011-1cd2-5afc-82ba-f8645cb082d0"
diamondUuid: "225b2ad0-f150-81cb-881d-23f5fcd92137"
uuid: "3d07e328-586b-83bb-8744-7e9b0cd9d4b3"
horo: 4
bonds:
  in:
    - budgetvariance
    - classroom
    - competition
    - concatenate
    - cost
    - decompression
    - gate
    - harmony
    - law
    - logic
    - materiality
    - merge
    - peace
    - proof
    - self
    - society
    - uuid
    - variance
  out:
    - budgetvariance
    - classroom
    - competition
    - concatenate
    - cost
    - decompression
    - gate
    - harmony
    - law
    - logic
    - materiality
    - merge
    - peace
    - proof
    - self
    - society
    - uuid
    - variance
typography:
  partition: decide
  bondDegree: 54
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - competition
    - cost
    - decompression
    - gate
    - harmony
    - law
    - logic
    - merge
    - peace
    - proof
    - self
    - society
    - uuid
  matrix:
    - budgetvariance
    - classroom
    - competition
    - concatenate
    - cost
    - decompression
    - gate
    - harmony
    - law
    - logic
    - materiality
    - merge
    - peace
    - proof
    - self
    - society
    - uuid
    - variance
  backlinks:
    - budgetvariance
    - classroom
    - competition
    - concatenate
    - cost
    - decompression
    - gate
    - harmony
    - law
    - logic
    - materiality
    - merge
    - peace
    - proof
    - self
    - society
    - uuid
    - variance
signatures:
  computationUuid: "8235ded0-c6c7-8705-9272-8ccd953cdad9"
  stages:
    - stage: path
      stageUuid: "e30bdc24-cda7-8b6c-b830-b96a3a530e7b"
    - stage: trinity
      stageUuid: "b1f3dfe2-8a50-8664-85b3-8608546644ef"
    - stage: boundary
      stageUuid: "bfc91b27-bc84-8f12-9b42-00d83ea20f87"
    - stage: links
      stageUuid: "b3636052-6fe6-84bb-885b-6f5a4655d589"
    - stage: horo
      stageUuid: "fdb3553f-46b7-8d32-ac02-909d97237150"
    - stage: seal
      stageUuid: "a71e6871-50b3-8535-a33d-4e3f641b4bfe"
    - stage: uuid
      stageUuid: "359c5887-65c0-8d99-8d5d-6a94fa91aca8"
version: 2
---
# decide — the society's composed decision (correct · harmonic · efficient)

FORM: **the society decides by composing its three selection laws into ONE winner.** `decide(candidates)`:
1. keeps only the **CORRECT** (gate-verified) candidates — the referee is the gate ([[competition]] / [[proof]]), never a vote; if none are correct, there is no winner;
2. prefers the **HARMONIC** ones ([[logic]]: the self-consistent resolve first — they need no external coordination), falling back to all-correct only if none are harmonic;
3. among those, takes the **MOST EFFICIENT** ([[cost]]: max output per spend), breaking ties by lowest cost (the fastest, [[competition]]) then content-uuid (deterministic — same field, same choice everywhere, [[merge]]).

So the run's three laws are not three separate checks an operator juggles — they are one function the society runs to pick what advances: correctness gates, harmony orders, efficiency selects. This is the decision the agent society makes every time it convenes; the actual runtime — spawning the candidates, applying the winner's effect, paying it ([[decompression]]) — is the boundary `decide` drives. Building dominates, and `decide` is how the society chooses the best build ([[peace]] / [[society]]).

Matter-twin: `src/services/decide/index.ts` (`SocietyCandidate`·`decide`) over `services/competition` + `services/cost` + `services/logic` + `index.test.ts`. Composes: [[competition]] · [[logic]] · [[cost]] · [[proof]] · [[decompression]] · [[merge]] · [[peace]] · [[society]] · [[self]].

**Law — [[law]]: the society picks one winner by composing three selection laws into ONE function — correctness gates (the [[gate]]/[[proof]] referee, never a vote), [[harmony]] orders, efficiency ([[cost]]) selects — ties broken by lowest cost then content-[[uuid]] so every node decides identically ([[merge]]).**

## Common mistakes
- Selecting by efficiency before filtering correctness — correctness is absolute and first; an efficient wrong answer is not a candidate.
- Letting a disharmonic candidate win when a harmonic one exists — harmony is preferred over raw efficiency; only when no harmonic candidate is correct does the field open to all.
- Non-deterministic tie-breaks — equal efficiency and cost resolve by content-uuid, so every node decides identically ([[merge]]).
