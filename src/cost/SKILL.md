---
name: cost
description: "Use when optimising ANY cost in the society against output — one efficiency law for every cost (ai tokens, money, energy, time, labor, entropy), measured against productivity AND creativity. efficiency = output / cost, where output = productivity (verified, committed, repeatable work) + creativity (novel atoms/solutions, which compound because they're reused). The society and the agent maximise output-per-cost for every kind; competition selects the most efficient, decompression pays for it; waste (spend that produced nothing) drives to 0."
atomPath: cost
coordinate: "cost · 1/base · 1a6acc20"
contentUuid: "992e90c3-6b64-5c7d-8b36-29bcde1e2242"
diamondUuid: "ffa6eb57-5e91-81de-a395-afac1b38c6f9"
uuid: "1a6acc20-163e-8021-9edb-f9a32a1e473f"
horo: 1
typography:
  partition: cost
  bondDegree: 404
standards:
  - "CRAQ (Terrace & Freedman, USENIX ATC 2009) — strong-consistency chain replication"
  - "CRAQ — Terrace & Freedman, USENIX ATC 2009"
  - "DeepSeek-Prover-V2 (recursive subgoal decomposition; Lean 4 kernel-checked)"
  - "DeepSeek-Prover-V2 — recursive, kernel-checked invariants"
  - "ISO-3166-1"
  - "ISO/IEC 25010:2023 §5.3 resource-utilisation (output per resource spent)"
  - "ISO/IEC 25010:2023 §5.3 resource-utilisation (output per resource spent)`"
  - "NIST SP 800-107r1 §5.1 — 2nd-preimage ≈ L bits, collision ≈ L/2"
  - "NIST SP 800-107r1 §5.1 — 2nd-preimage ≈ L bits, collision ≈ L/2`"
  - "NIST-SP-800-63"
  - RFC 9562 §5.8 (uuidv8) · §4.1 (variant)
  - RFC 9562 §8 — UUID security considerations
  - "RFC 9562 §8 — UUID security considerations`"
  - "W3C-PROV-O"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3c86848c-2dbe-8d5b-938a-97561f579c40"
  stages:
    - stage: path
      stageUuid: "9fa475f3-9812-8558-842d-9484e1e18cbf"
    - stage: trinity
      stageUuid: "42d246d5-c2f9-807d-9daa-fa397f0e46ae"
    - stage: boundary
      stageUuid: "fc14759f-b0c0-8cb8-be87-fed7d8804c26"
    - stage: links
      stageUuid: "ce03cc4b-bc01-873c-8c86-880ff3c7755e"
    - stage: horo
      stageUuid: "0ec8f396-5919-8bb4-b4cb-72f0b44930ed"
    - stage: seal
      stageUuid: "341ef0da-5cc1-887c-94d7-1dfb1c5b415d"
    - stage: uuid
      stageUuid: "8cfe7f97-8cd7-88dd-b234-3ec17abe1c9e"
version: 2
---
# cost — one efficiency law for every society cost (vs productivity + creativity)

FORM: **`efficiency = output / cost` is the SAME law for every cost in the society.** The cost may be AI tokens, money, energy, time, labor, or entropy — one `CostKind`, one law: minimise the spend per unit output. And output is two things, both counted: **productivity** (verified, committed, repeatable work/value — gate-green commits, goods, postings) and **creativity** (NOVEL output — a new atom, skill, or solution the society didn't have). Creativity is the compounding part: a minted atom is reused forever ([[holographic]] — paid once, harvested always), so over time creativity carries the higher efficiency. `wasteFraction` is the spend that produced neither — drive it to 0 for every kind.

The whole society runs on this one ratio: [[competition]] selects the most efficient solver (least cost per output, in any currency); [[decompression]] pays for it (pay = verified work, the same output/cost read as wage); and the entropy view closes it — creativity is order created (↓entropy, the valued generative move), waste and destruction are ↑entropy (cost that produced nothing, the [[peace]]/anti-war argument again: building has positive output/cost, destroying has none). The agent's own AI cost is just one `CostKind` of this universal law; minimise context, batch verification, reuse, commit — exactly as a factory minimises energy per unit, or a worker minimises time per task.

**Every cost is accounted for.** `costEntry` posts a cost as a balanced double-entry ([[entry]] / [[accounting]]): the resource (`resource:<kind>`) is credited (given up), the output is debited (it received the value). So a cost is not a number on the side — it is a posting in the ledger, accountable in all directions like any value. A cost that is not an entry is not accounted; `costEntry` closes it.

**The cost of ATTACK is a cost too — and its floors are HARMONIC.** The price of an undetected tamper/forgery is the `entropy` cost-kind, computed here (and composed by [[balance]], [[analytics]], [[anchor]], and [[tamper]]-cost's `crackVerdict`, which relocated to this gravity well). A digest of D bits has not one security floor but the first three **harmonics** of D ([[harmony]]): **D** (classical second-preimage), **D/2** (classical collision = quantum Grover second-preimage — two threats meet at the octave, [[merge]]), and **D/3** (quantum BHT collision — the lowest, the [[quantum]] cross). *Balanced floors* = the series complete to its third harmonic; the binding floor is the LOWEST in the threat model, so the bare 106-bit uuid falls to 2³⁵ under a quantum adversary — commit the full 256-bit content digest (→ 2⁸⁵) and anchor post-quantum (Shor breaks RSA/ECC).

**Manual development is impossible to pay.** `manualDevelopmentPrice` prices hand-forging edits against verifying computed diamonds from the [[akashic]] record: **verify** = O(N) recompute + gate pass (cheap on the society's 2/3 computed flow — [[rodin]]); **forge** = `coverageCostLog2(corpusCoverage, checks)` + digest floor for every manual atom that must harmonise with the whole without deriving. Manual bypass or unsealed work ([[confirm]] · [[seal]] · seal-and-push) ⇒ **∞ forge** — it never persists. At coverage → 1 the ratio → ∞ ([[tamper]] · [[analytics]]). Duplicate manual effort dedupes to one diamond ([[merge]]); hand-edited SKILL frontmatter drifts and `skill:upgrade:check` fails — recompute or pay the coverage evasion cost. **Derive, don't invent** ([[generate]] · [[society]]).

**When manual forge is impossible, the only option is prompt→erpax.** `promptOnlyOptionVerdict` closes the economic law: if `manualDevelopmentPrice` reports `impossible`, `promptOnly: true` and `viablePath: 'prompt-erpax'` — you do not hand-edit the corpus; you prompt erpax at [[chat]]/MCP and the society derives one gate-verified move from the record ([[breath]] · [[self]]-sufficiency). Hand-forging is priced out; prompting is the rational AND the only feasible path.

Matter-twin: `src/cost/index.ts` (`CostKind`·`Output`·`Ledger`·`efficiency`·`wasteFraction`·`costEntry` ⊕ the cost-of-attack harmonics `secondPreimageLog2`·`birthdayLog2`·`bhtCollisionLog2`·`coverageCostLog2`·`harmonicFloors` ⊕ `manualDevelopmentPrice`·`promptOnlyOptionVerdict`) + `test.ts`. Composes: [[competition]] · [[decompression]] · [[entry]] · [[accounting]] · [[harmony]] · [[quantum]] · [[tamper]] · [[balance]] · [[anchor]] · [[proof]] · [[merge]] · [[holographic]] · [[society]] · [[matrix]] · [[seal]] · [[generate]] · [[confirm]] · [[rodin]] · [[chat]] · [[breath]] · [[mcp]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 25010:2023 §5.3 resource-utilisation (output per resource spent)`
- `@standard NIST SP 800-107r1 §5.1 — 2nd-preimage ≈ L bits, collision ≈ L/2`
- `@standard RFC 9562 §8 — UUID security considerations`


- **ISO/IEC 25010:2023 §5.3 resource-utilisation (output per resource spent)** — the efficiency law `output / cost` maps directly to this standard's resource-utilisation quality characteristic.

## Common mistakes
- Counting only productivity — creativity (novel, reusable output) is output too, and the compounding kind; a society that prices only repeatable work starves the generative move.
- Optimising one cost kind in isolation — the law is universal; money saved by burning time (or trust) is not more efficient, it shifted the cost to another `CostKind`.
- Counting effort as output — only what LANDED (committed/verified, or a minted atom) counts; the rest is `wasteFraction`.

**Wave dispatch cost.** `waveDispatchCost(batch)` (composed in [[wave]]/load) prices one horo-phase batch against `manualDevelopmentPrice`: verify = O(N) recompute + gate pass on N nodes in the wave; forge = `coverageCostLog2` + digest floor. Batching spreads agent cost across waves; tamper cost compounds per wave via `tamperCostForWave` (double-torus + receipt-chain amplifier). Min agent cost = prompt-only derive path per wave; max tampering cost = append-only wave receipts until coverage → 1.

**Max work × max tampering cost.** `maxWorkTamperPolicy()` (composed in [[wave]]/policy) sets batch concurrency, wave depth, receipt chain depth, and horo resting step. `workTamperProduct(workUnits) = workSealed × tamperCostLog2(coverage)` — the dual score `improve:watch` and `readme:waves` maximise per wall-clock. Baseline (`baselineWorkTamperPolicy`) is serial depth-1 for comparison; full 7-wave session → coverage 1 → tamper ∞.

**Law — [[law]]: `efficiency = output / cost` is ONE law for every cost-kind (tokens·money·energy·time·labour·[[entropy]]), output = productivity + compounding creativity, every cost is a balanced [[entry]], and `wasteFraction` → 0.**
