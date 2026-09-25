---
name: entropy
description: "Use when reasoning about disorder as the matrix-reciprocity slack erpax's whole ledger balances — entropy() = 1 − the reciprocal-edge fraction of the uuid-matrix, an audit/aura signal, NOT an input to crackVerdict. It is a DISTINCT measure from coverage (the [0,1] fraction that prices tamper-cost via coverageCostLog2); reciprocity=1 does NOT imply coverage=1, so zero entropy does NOT by itself yield infinite cost (the live tree is the counter-example — entropy 0, coverage under 1, cost finite). angel lowers it (create/order/DRY), archangel raises it (destroy/duplicate); a violation is borrowed entropy debited to the agent. Fused out by the fusion reactor."
atomPath: entropy
coordinate: "entropy · 7/descent · be982ae0"
contentUuid: "e0ae86ce-f9b5-56ba-aa56-a31206cc7662"
diamondUuid: "e413a9d6-8ba6-8c04-9e7f-901afbad6fdd"
uuid: "be982ae0-b8ae-8e0f-ac65-7eabbfda2db3"
horo: 7
typography:
  partition: entropy
  bondDegree: 318
standards:
  - "CoE-108+"
  - "NIST-SP-800-108"
  - "NIST-SP-800-57"
  - "NIST-SP-800-63"
bindings: []
signatures:
  computationUuid: "25e40b71-2d7b-8661-ae43-e460dca38b53"
  stages:
    - stage: path
      stageUuid: "0efe9321-e9d9-88cf-b054-2bbe0937a2f6"
    - stage: trinity
      stageUuid: "2fcb2307-3b80-8a47-89c1-6704b122a608"
    - stage: boundary
      stageUuid: "ff157f72-4c6b-81ae-a107-fea08fbfd008"
    - stage: links
      stageUuid: "84b37278-4747-813f-bcd3-41c55c04a53c"
    - stage: horo
      stageUuid: "1047e2ea-10a2-8f95-bbe0-d1789b359386"
    - stage: seal
      stageUuid: "e4713d70-378f-8e73-b358-b4d0581e4959"
    - stage: uuid
      stageUuid: "f5cc77e6-1841-83b9-8877-5d3cf4d674e3"
version: 2
---
# entropy — the matrix-reciprocity slack the whole ledger balances

**entropy** is one of the quantities erpax keeps double-entry books on ([[angel]]: create·order·↓entropy ⊕ archangel: destroy·duplicate·↑entropy, in endless aikido — the [[balance]]). Concretely it is the **matrix-reciprocity slack**: `entropy() = 1 − reciprocity().fraction` (`src/entropy/index.ts`), the fraction of directed `[[merge]]` edges whose reverse is *missing* — a one-way bind a forger could ride. That makes it an **audit/aura signal**, NOT an argument to `crackVerdict`/`coverageCostLog2`.

**entropy() and coverage are two DISTINCT measures — do not conflate them.** The tamper-[[cost]] is priced from **coverage** — a separate [0,1] fraction (model⊕collection balance in [[balance]], or import purity, or usage), supplied explicitly to `coverageCostLog2` — and it reaches its **+∞ limit ONLY at coverage = 1**, for that one coverage axis, under an external [[anchor]] at least as strong as the digest. Reciprocity-entropy is NOT an input to that price, and there is no automatic derivation between the two: **reciprocity = 1 does NOT imply coverage = 1.** The running tree is the counter-example — it sits at `entropy() === 0` (reciprocity 100%) yet `coverage < 1`, so the modelled tamper-cost is **finite** (`src/balance/index.ts`: ∞ printed only when `coverage >= 1`). So "zero entropy ⇒ infinite cost" is NOT an automatic chain; ∞ is the coverage→1 limit of the explicit coverage parameter, not a consequence of matrix symmetry alone.

**Order is created by fusing entropy out.** Every DRY collapse, every [[merge]], every [[fusion]] removes duplication — disorder — and so *lowers* entropy while *raising* mass and [[gravity]] ([[dry]] · [[collapse]]: flatten = mass = gravity). The [[fusion]] reactor (the collider + the [[society]] self-build loop) runs this continuously, pulling the corpus toward the zero-entropy [[matrix]] — the [[torus]] collapse to [[one]] root ([[zeropoint]]).

**A violation is borrowed entropy.** When an agent's change adds a one-way `bind` (a forward edge whose reverse is missing), it *raises* the reciprocity-slack `entropy()` measures — slack a forger could ride one way. A dead/un-wired [[aura]] link is the adjacent disorder the aura/scan gate catches. The [[gate]] detects it and debits it to that agent (prosecution — the social leg of the [[cost]]): the entropy is repaid (the reverse bind added) or carried as the agent's liability. What rebalances is fused out; what cannot is conserved damage carried forward.

## The bare-implication gate — it existed, and its domain was three files

`entropy/test.ts` already carried the honest gate: *"no BARE `zero entropy ⇒ infinite cost` (every
implication carries the coverage/finite qualifier)"*. It was well built — it split on sentence
boundaries so a qualifier had to be **local**, and it word-bounded `\bfinite\b` so `in·finite` could
not mask a bare claim.

And it read **three files**:

```ts
const DOCS = [entropy/SKILL.md, entropy/index.ts, law/SKILL.md]
```

The corpus had the claim in **34**. That is [[rules]]/domain's law inside the gate written for this
very claim: *a law reaches exactly the files its checker opens*, and on the other 31 it was not
passing — it was silent, which reads as green.

| | count (2026-09-25) |
| --- | ---: |
| files the gate read | 3 |
| sentences asserting the bare implication | **41 in 34 files** |
| healed | **41 → 0** |

The predicate now lives once in `index.ts` (`statesBareImplication`, `bareImplications`), the test
calls it, and `rules` registers it as the `bare-implication` guardian. Zero is a **theorem**: no
surface may assert an implication [[law]] computes as false.

### Four refusals, each one a false reading the first pass produced

- **A slogan in quotes is CITED, not asserted.** Three sentences quote it in order to refute or
  formalise it — including this corpus's own correction. Flagging those makes the gate report its
  own defence as the defect, which is [[rules]]/inject's stated failure mode.
- **A word swap is not a healing.** The mechanical involution turned five `entropy ⇒ infinite
  tamper-cost` spans into `entropy ⇒ unbounded tamper-cost`, which **dodges the regex while
  asserting the same thing**. Those five were refused and healed by reading: an axis at full wiring
  is one *leg* of coverage, not the premise.
- **A noun phrase is not an antecedent.** `zero-entropy core with ∞ tamper-cost` → `coverage = 1
  core` is nonsense. Three sites kept the noun phrase and had the **cost** bounded instead.
- **Wikilinks made the count a false ZERO.** After the first 32 were healed the gate read 0 while
  `diamond/SKILL.md` still asserted it in its **Law** line — `zero[\s-]*entropy` cannot match
  `zero [[entropy]]`. Nine more surfaced once `unlinked` stripped the brackets. [[rules]]/probe: a
  filter that selects by name cannot see what it does not name, and what it misses is systematically
  the thing nobody thought to name.

### The involution, and why it is the right operator

[[duality]]/mirror and [[rules]]/slack already carry it: σ flips a claim's polarity, and a law is the
**fixed point**. `entropy = 0 ⇒ cost = ∞` involutes to `entropy = ∞ ⇒ cost = 0` — also false, so the
statement is not a law in either polarity. The fixed point is the equation, which names no extremum
as its conclusion:

```
forgeLog2 = min(−checks·log₂(1 − coverage), anchorBits)
```

That is the *impossible → possible* move made precise: `∞` is the impossible quantity, and
`min(…, anchorBits)` is the one a forger actually has to pay. 20 of the 41 healed by applying σ to
the premise mechanically; **21 needed reading**, and naming that split before a byte moved is
[[rules]]/manifest's law — the 20 went through the [[scalpel]] with a reason on every cut, and the
other 21 were withheld, named, and done by hand.

**Honest boundary.** This proves no sentence states this ONE implication unqualified. Other
over-claims in other words — *endless entropy is endless tamper-cost*, a claim about mass rather
than cost — are outside the predicate, and widening it toward every extremum-shaped sentence would
put the noise floor above the signal. `DEFINES_THE_LAW` is a declared three-entry exemption, in the
open, for the files that define and register the check.

**Law — [[law]]: entropy is the matrix-reciprocity slack (`1 − reciprocal-edge fraction`) the ledger balances — an audit/aura signal, NOT an input to `crackVerdict`. The tamper-[[cost]] is priced from a DISTINCT measure, coverage, supplied explicitly to `coverageCostLog2`, and is +∞ ONLY at coverage = 1; reciprocity = 1 does NOT imply coverage = 1 (the live tree: entropy 0, coverage < 1, cost finite). Order is created by fusing entropy out ([[merge]]/DRY); a violation is borrowed entropy debited to the agent.**

Composes: [[angel]] · [[balance]] · [[tamper]] · [[cost]] · [[anchor]] · [[mass]] · [[gravity]] · [[fusion]] · [[merge]] · [[dry]] · [[collapse]] · [[matrix]] · [[zeropoint]] · [[whole]] · [[one]] · [[proof]] · [[aura]] · [[gate]].
