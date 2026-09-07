---
name: unavoidable
description: "Use when hardening erpax toward infinite tamper-cost — why every security lever must be gate-FORCED (a stray fails, exit 2), never merely advisory. The cost is the minimum across dimensions, so the weakest avoidable gap is the cheapest forgery; only the unavoidable raises the floor."
atomPath: "vocabulary/unavoidable"
coordinate: "vocabulary/unavoidable · 7/descent · 1be85792"
contentUuid: "bd24a580-3653-5efd-8861-7d00e032c5b1"
diamondUuid: "d3cbb58e-c68b-8060-9984-86b1b22e1b5c"
uuid: "1be85792-1900-8512-81aa-42100d1c7797"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 78
standards: []
bindings: []
signatures:
  computationUuid: "ee1768b1-da6e-8222-aedc-079495a9623d"
  stages:
    - stage: path
      stageUuid: "4cd21f86-acd9-8b1b-ab4e-a3aed890b06f"
    - stage: trinity
      stageUuid: "43f46222-c63f-88d7-8f64-63f32a664c08"
    - stage: boundary
      stageUuid: "caf3ad55-c479-8394-9d67-d054bdf6f5fb"
    - stage: links
      stageUuid: "3554cbf8-bb95-8751-b33b-2f11c963c6d2"
    - stage: horo
      stageUuid: "99dad058-2d5f-80b5-8684-ab9981430af6"
    - stage: seal
      stageUuid: "1b3dfe0b-9ffe-8224-b359-b3d884ccb9b8"
    - stage: uuid
      stageUuid: "1485ea43-1105-8135-9343-14ff54514816"
version: 2
---
# unavoidable — every lever forced, because the cost is the minimum

The tamper-[[cost]] of the whole is the **minimum** across its dimensions ([[bottleneck]]): a chain is only as strong as its cheapest forgery. So an enforcement that an [[agent]] can *avoid* raises nothing — the forger simply takes the avoided path. To drive cost → ∞, every lever must be **unavoidable**: the [[gate]] FAILS unless the dimension sits at its maximum, so no agent (human or autonomous) can leave a cheap path open. A "should" is worthless; only an exit-2 hook is unavoidable. The template is **md-purity** — writing is now unavoidable IN [[atom]]s ([[trinity]]): a stray `.md` exits 2, so an agent's words *must* fold into a SKILL.md. The same move applied to every lever IS the path to the limit. Measure the live distance with [[analytics]] (max-tamper-cost: the weakest link, the levers, the gap to ∞).

The levers, each of which must become unavoidable:

- **coverage → 1** — `coverageCostLog2` is +∞ *only* at coverage exactly 1; below it the cost is finite. The orphan collections (a plural store with no singular model) and the link-orphans cap it, and today they are merely *advisory* ([[aura]]/[[balance]] report them; the gate does not fail). Make orphans unavoidable to leave: the gate fails unless every plural [[collections|collection]] has its singular model and every [[atom]] is reciprocally linked.
- **full-digest commitment** — the weakest link today is a chosen-content birthday collision on the bare 106-bit [[uuid]] (≈2⁵³) versus the full 256-bit content digest (≈2¹²⁸). The [[anchor]] must commit the full digest; make it impossible to anchor the truncated uuid.
- **content-addressed writes** — zero [[entropy]] means the [[identity]] is *computed* from content (no setter) and every dimension is uuid-chained; an un-wired field is a free rewrite.
- **reciprocal entanglement (the cross)** — debit⊕credit, [[payload]]⊕[[vitepress]], both directions: every edge mutual ([[coordinate]] · [[merge]]). Already unavoidable — reciprocity 1, directed-link entropy 0; the gate catches a one-way edge.
- **conservation as a precondition** — each machine-checked invariant (Σ balances, double-entry [[entry]]) *multiplies* the forger's work; a balanced entry must be required to WRITE, not audited after ([[conservation]]).
- **append-only** — a writer who can rewrite committed history pays nothing (the un-anchored free-rewrite is cost 0); immutability of committed rows + an anchored chain root must be schema-level ([[append]]), not convention.

∞ is a **limit**, not a number: you approach it by driving every coverage axis → 1 and closing every avoidable path, never literally reaching it — the floor never drops below the 256-bit second-preimage. The discipline is one rule applied everywhere: turn each *should* into a gate that fails. ([[law]] · [[proof]].)

## Standards
- the erpax main law — zero entropy via uuid-wiring every dimension ⇒ infinite tamper-cost
