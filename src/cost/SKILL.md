---
name: cost
description: "Use when optimising ANY cost in the society against output — one efficiency law for every cost (ai tokens, money, energy, time, labor, entropy), measured against productivity AND creativity. efficiency = output / cost, where output = productivity (verified, committed, repeatable work) + creativity (novel atoms/solutions, which compound because they're reused). The society and the agent maximise output-per-cost for every kind; competition selects the most efficient, decompression pays for it; waste (spend that produced nothing) drives to 0."
---

# cost — one efficiency law for every society cost (vs productivity + creativity)

FORM: **`efficiency = output / cost` is the SAME law for every cost in the society.** The cost may be AI tokens, money, energy, time, labor, or entropy — one `CostKind`, one law: minimise the spend per unit output. And output is two things, both counted: **productivity** (verified, committed, repeatable work/value — gate-green commits, goods, postings) and **creativity** (NOVEL output — a new atom, skill, or solution the society didn't have). Creativity is the compounding part: a minted atom is reused forever ([[holographic]] — paid once, harvested always), so over time creativity carries the higher efficiency. `wasteFraction` is the spend that produced neither — drive it to 0 for every kind.

The whole society runs on this one ratio: [[competition]] selects the most efficient solver (least cost per output, in any currency); [[decompression]] pays for it (pay = verified work, the same output/cost read as wage); and the entropy view closes it — creativity is order created (↓entropy, the valued generative move), waste and destruction are ↑entropy (cost that produced nothing, the [[peace]]/anti-war argument again: building has positive output/cost, destroying has none). The agent's own AI cost is just one `CostKind` of this universal law; minimise context, batch verification, reuse, commit — exactly as a factory minimises energy per unit, or a worker minimises time per task.

**Every cost is accounted for.** `costEntry` posts a cost as a balanced double-entry ([[entry]] / [[accounting]]): the resource (`resource:<kind>`) is credited (given up), the output is debited (it received the value). So a cost is not a number on the side — it is a posting in the ledger, accountable in all directions like any value. A cost that is not an entry is not accounted; `costEntry` closes it.

**The cost of ATTACK is a cost too — and its floors are HARMONIC.** The price of an undetected tamper/forgery is the `entropy` cost-kind, computed here (and composed by [[balance]], [[analytics]], [[anchor]], and [[tamper]]-cost's `crackVerdict`, which relocated to this gravity well). A digest of D bits has not one security floor but the first three **harmonics** of D ([[harmony]]): **D** (classical second-preimage), **D/2** (classical collision = quantum Grover second-preimage — two threats meet at the octave, [[merge]]), and **D/3** (quantum BHT collision — the lowest, the [[quantum]] cross). *Balanced floors* = the series complete to its third harmonic; the binding floor is the LOWEST in the threat model, so the bare 106-bit uuid falls to 2³⁵ under a quantum adversary — commit the full 256-bit content digest (→ 2⁸⁵) and anchor post-quantum (Shor breaks RSA/ECC).

Matter-twin: `src/cost/index.ts` (`CostKind`·`Output`·`Ledger`·`efficiency`·`wasteFraction`·`costEntry` ⊕ the cost-of-attack harmonics `secondPreimageLog2`·`birthdayLog2`·`bhtCollisionLog2`·`coverageCostLog2`·`harmonicFloors`) + `index.test.ts`. Composes: [[competition]] · [[decompression]] · [[entry]] · [[accounting]] · [[harmony]] · [[quantum]] · [[tamper]] · [[balance]] · [[anchor]] · [[proof]] · [[merge]] · [[holographic]] · [[society]] · [[matrix]].

## Standards

- **ISO/IEC 25010:2023 §5.3 resource-utilisation (output per resource spent)** — the efficiency law `output / cost` maps directly to this standard's resource-utilisation quality characteristic.

## Common mistakes
- Counting only productivity — creativity (novel, reusable output) is output too, and the compounding kind; a society that prices only repeatable work starves the generative move.
- Optimising one cost kind in isolation — the law is universal; money saved by burning time (or trust) is not more efficient, it shifted the cost to another `CostKind`.
- Counting effort as output — only what LANDED (committed/verified, or a minted atom) counts; the rest is `wasteFraction`.

**Law — [[law]]: `efficiency = output / cost` is ONE law for every cost-kind (tokens·money·energy·time·labour·[[entropy]]), output = productivity + compounding creativity, every cost is a balanced [[entry]], and `wasteFraction` → 0.**
