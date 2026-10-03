---
name: gate
description: "Use when an agent must ask the gate registry instead of waiting for the push lane — erpax.gate.verdicts reads every guardian from the same arbiter the lane runs; erpax.gate.cross and erpax.gate.crosses are the gates formulated as crosses of two laws (shared population, lift against independence, absence in prose, theorem-at-zero)."
atomPath: "agents/mcp/tool/gate"
coordinate: "agents/mcp/tool/gate · 2/share · 2953cb3c"
contentUuid: "d174b910-1bec-5726-b085-3981665978ed"
diamondUuid: "535ea807-0eb3-8094-9b61-e3ce97a76eb4"
uuid: "2953cb3c-36e0-8f0e-9ea8-b8a2fdc5580f"
horo: 2
typography:
  partition: agents
  bondDegree: 292
standards: []
bindings: []
signatures:
  computationUuid: "d95ca3a5-ca22-8544-8b28-83fd9d76cde9"
  stages:
    - stage: path
      stageUuid: "73d10a30-3482-8f23-ba31-dc026c7d687a"
    - stage: trinity
      stageUuid: "a43ecd30-2a1a-855b-9f19-803064413681"
    - stage: boundary
      stageUuid: "d0c1de55-c52c-8977-adf9-eea3f8ed5226"
    - stage: links
      stageUuid: "e5183698-3e9b-8015-aca5-d204e4499b6f"
    - stage: horo
      stageUuid: "5d44d28e-bfff-860f-88ee-99b85deab424"
    - stage: seal
      stageUuid: "3ac03b26-9326-8c93-96b5-f2ca0074d1f4"
    - stage: uuid
      stageUuid: "b549e035-20e8-8dbe-87ab-5e5a430f5c3e"
version: 2
---
# agents/mcp/tool/gate — the gates, asked over MCP and formulated as crosses

Every gate in this corpus is a lane: it runs at the push, after the mistake, and an author waits for
it ([[rules]]/scope). This area turns the registry into something an agent **asks**, and formulates
the gates the way [[conjecture]] showed they compose — as **crosses** of two laws.

| tool | what it answers |
| --- | --- |
| `erpax.gate.verdicts` | every guardian — axis, violations, baseline, ok, reason — from `assertRulesHold`, the same arbiter the lane runs; `axis` narrows to one |
| `erpax.gate.cross` | one pair of measured laws: the files both flag, the lift of that intersection against independence, how conspicuously the pair is absent from prose, and whether it is a theorem at zero |
| `erpax.gate.crosses` | every pair ranked by lift, with the theorems named |

## Why a cross is a gate

[[rules]]/copy × [[rules]]/cycle was the first: a duplicated body whose two files lie in one import
tangle is strictly worse than either finding alone, and neither law sees it. Measured, it was **0 over
a non-empty population** — a wall standing where traffic passes. That shape generalises: for any two
laws, their intersection is a gate the moment both parents report violations, and `theorem: true`
names the ones that hold at zero without anyone having written them.

The number that keeps it honest is **lift**, not the shared count. Two laws that flag 30% and 40% of
the universe each will share 12% of it by chance; `crossIntersections` reports observed ÷ expected, so
≈1 reads as independent however large the count. A cross whose lift is well above 1 is two laws
seeing one defect from two sides — the kind the corpus has found by hand four times.

## What this does NOT replace

The lanes. A gate that can be skipped is prose ([[rules]] § enforcement), and an MCP door is skippable
by construction: nothing stops a push because an agent did not call `erpax.gate.verdicts`. This is the
surface that lets the question be asked **before** the push, so the lane refuses less often — the
[[confirm]] hook plays the same role at the write. `verdicts` reuses the lane's own `assertRulesHold`
(5-minute cache), never a second measurement, so the two surfaces cannot disagree.

## Honest boundary

`cross` and `crosses` reach only the laws `lawPopulations` measures — copy · cycle · concentration ·
mirror · unfolded — because those are the laws that expose a file-addressed population; a law that
reports counts without files cannot be intersected. Every tool here is a full-tree scan and says so
in its description. A theorem at zero is true of the tree **now**; it is not registered as a ratchet by
this area, and the `prose` field is `null` for a pair nothing has written about rather than a guessed
zero.

**Law — [[law]]: a gate is a question before it is a wall. Offer every guardian as a tool from the
lane's own arbiter, and formulate the gates as crosses — two laws, one intersection, the lift that
says whether they met by chance — so the walls that hold at zero are found by enumeration, not by
the fourth accident.**

Composes: [[rules]] · [[conjecture]] · [[guardian]] · [[seal]] · [[mcp]] · [[law]].
