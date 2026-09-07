---
name: reduction
description: "Use when constructing a Clay attempt rather than asserting one — the tools between theorem's reduce verdict and duel's door: proposeReduction measures a candidate against the graph WITHOUT editing it, reductionFrontier names the exact links still ungrounded (the fix list reduce only implied), problemFrontiers gives all seven as work items, jointReduction builds the 'solved at once' claim and reports that its frontier is all seven because no reduction between any two is known, and roundFromReduction bridges a FULLY GROUNDED reduction into a duel round — nothing here can set corpusSolves, which stays the literal false."
atomPath: "millennium/reduction"
coordinate: "millennium/reduction · 5/round · 6f3fae7c"
contentUuid: "f0e9c908-ecf5-5abf-94c4-4afeddb58fca"
diamondUuid: "9d77b366-6a13-8b38-a6d7-b64694c2e606"
uuid: "6f3fae7c-1a64-8d2d-8d66-b55927651bd7"
horo: 5
typography:
  partition: millennium
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "54762796-80f0-835d-bf02-c14a1ae450fc"
  stages:
    - stage: path
      stageUuid: "4ef3d421-e880-8ef7-95cf-fc34c28bd35c"
    - stage: trinity
      stageUuid: "5c928496-1987-861b-baf6-9400ec24a475"
    - stage: boundary
      stageUuid: "0b7b229c-4b88-8bbf-ae62-3dd1fc120a59"
    - stage: links
      stageUuid: "fb825514-7c15-8993-b1a9-a7f8e696a366"
    - stage: horo
      stageUuid: "9a296a4d-ef40-8f9e-baa3-c55150a982d3"
    - stage: seal
      stageUuid: "2a2b67a2-0ea8-8015-a6c0-9da7d27e1718"
    - stage: uuid
      stageUuid: "89791d58-0e65-82f1-8032-2161768e669e"
version: 2
---
# millennium/reduction — make the attempt constructible, not the claim louder

[[theorem]]'s `reduce` already answers *does this ground out*, and returns the bare `assertions` blocking it. What did not exist is everything between that verdict and an attempt:

| missing | now |
| --- | --- |
| propose a reduction without editing the graph | `proposeReduction(claim, composes, extra?)` — measured against a copy |
| the links still open, as work | `reductionFrontier(claim)` — named, ordered, countable |
| all seven as items rather than a mood | `problemFrontiers()` |
| "solved at once", measured | `jointReduction()` — one claim composing all seven |
| proof → a duel round | `roundFromReduction(r)` — `proved` **only** when fully grounded |

**Closing a link moves the frontier.** Ground one of two steps and the frontier shrinks to exactly the other; ground both and it reduces. That is the whole point: a claim that "rests on authority" now comes back with the precise edges whose grounding would flip it, so the next move is nameable instead of rhetorical.

## Why "at once" is the harder claim — computed, not argued

Solving the seven together means proving they **reduce to one result**. `jointReduction` builds that node and reports its frontier: **all seven**, because no reduction between any two of them is known. A single edge closed there would be a landmark in its own right. The tool does not weaken the claim — it turns it into a list, and says which item.

## What these tools refuse to do

`roundFromReduction` sets `proved` **only** when the reduction fully grounds and is acyclic; an open reduction yields `proved: false`, so an attempt built on one **cannot survive** the door. And `refuted` is **never** derived: failing to prove is not disproving (Popper), so refutation stays the refuter's move, found by counterexample.

Nothing here can write the register. `corpusSolves` is the literal type `false` in [[millennium]] and stays so whatever any reduction says — asserted in this suite too. These tools remove the **excuse**, not the bar.

## Honest boundary

This makes an attempt **constructible and checkable**; it does not construct one. Every `base: true` node is a claim that some proof exists elsewhere — the tool trusts that flag and never verifies the proof behind it, so a graph seeded with a false base grounds a false claim. It measures **structure**, not truth, which is the same boundary [[theorem]] states about itself.

**Law — [[law]]: a Clay attempt is constructed, not asserted — propose a reduction, read its frontier, close a link; only a grounded reduction becomes a round, and no reduction may write the register.**

Composes: [[millennium]] · [[theorem]] · [[duel]] · [[constitution]] · [[law]].
