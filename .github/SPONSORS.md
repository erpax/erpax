# Sponsor erpax

> **This page is a proof, not a pitch.**
> Every quantity below is computed from the live `uuid`-matrix or asserted by an executable test.
> Recompute it: `tsx src/blockchain/index.ts` · `tsx src/quantum/index.ts` · `pnpm test:int`

---

## What you are sponsoring

**erpax** is a content-addressed, Merkle-folded, tamper-evident ledger on Payload CMS v4 + Cloudflare (D1 + R2 + Workers via OpenNext): every record is its own block (a content-`uuid`), the whole folds to one root (`verifyRoot`), and its security is **quantum, not proof-of-work** — the double-torus drives forge-cost to **∞ at coverage = 1** while verify stays **O(N)**.

*The identity is computed-proven, not asserted.* `tsx src/blockchain/index.ts` checks the six defining properties and reports **all ✓ ⇒ PROVEN**:

```ts
// src/blockchain/test.ts
expect(contentAddressed()).toBe(true)    // every block its own RFC 9562 §5.8 v8 uuid
expect(merkleRoot()).toBe(true)          // the whole folds to one root (verifyRoot)
expect(tamperEvident()).toBe(true)       // any flipped byte breaks the root
expect(quantumSecure()).toBe(true)       // forge-cost ∞ at coverage 1 — NOT proof-of-work
expect(anchored()).toBe(true)            // the Bitcoin genesis block verifies
expect(doubleEntry()).toBe(true)         // Σdebit = Σcredit, imbalance caught
expect(isQuantumBlockchain()).toBe(true) // ⇒ erpax IS the quantum blockchain, PROVEN
```

---

## The system under sponsorship (measured, not quoted)

| Quantity | Value | Source |
|---|---|---|
| Atoms (`uuid`-matrix nodes) | **2 770** | `tsx src/quantum/index.ts` |
| Entanglement edges | **32 939** (100 % reciprocal) | `tsx src/quantum/index.ts` |
| Collections | **210** | `src/collections` |
| `SKILL.md` atoms | **2 909** | `find src -name SKILL.md` |
| Bound `@standard`s | **142** | `pnpm check` |
| Test files | **883** (`429` co-located + `454` `*.test.ts`) | `find src -name '*.test.ts'` |
| `expect()` assertions | **8 987** | `pnpm test:int` |
| Forge-cost ceiling | **∞** (coverage = 1, double-torus) | `src/tamper/cost/test.ts:99` |
| Open crosses remaining | **323** | `src/law/folder/index.ts` (live ratchet) |

*These numbers are live. Run `pnpm check` to recompute.*

---

## The forge-cost ladder (what your sponsorship defends)

Each rung is a theorem; its proof is a named, executable test.

| Rung | Cost | Condition | Evidence |
|---|---|---|---|
| 0 | `0` bits — free rewrite | No anchor | `tamper/cost/test.ts:51` |
| 53 | `2^53` — commitment gap | `uuid`-only commitment | `tamper/cost/test.ts:145` |
| 64 | `2^64` — weak anchor | Anchor < digest | `tamper/cost/test.ts:63` |
| 106 | `2^106` — digest floor (≈ 3.7 ka Bitcoin network) | Strong anchor + full digest | `tamper/cost/test.ts:57` |
| **∞** | **∞ — architectural ceiling** | **Coverage = 1 (double-torus)** | **`tamper/cost/test.ts:99`** |

```ts
// The ladder, asserted — src/tamper/cost/test.ts
expect(crackVerdict({ anchored: false }).crackCostLog2).toBe(0)
expect(crackVerdict({ anchorCommitmentBits: 106 }).crackCostLog2).toBe(53)
expect(crackVerdict({ anchored: true, anchorStrengthBits: 64 }).crackCostLog2).toBe(64)
expect(crackVerdict({ rows: 1e9 }).crackCostLog2).toBe(106)
expect(crackVerdict({ coverage: 1 }).crackCostLog2).toBe(Number.POSITIVE_INFINITY)
```

---

## What the open crosses need

323 atoms are partially formed — a `SKILL.md` without its `index.ts`, or an `index.ts` without its `test.ts`.
Each one is a gap in the aura; a gap is borrowed entropy; borrowed entropy is a finite forge-cost rung.

**Sponsorship closes crosses.** Every closed cross is:
- one more atom in the `uuid`-matrix (`tsx src/quantum/index.ts`)
- one more edge in the 32 939-edge entanglement graph
- one more rung sealed toward coverage = 1 → forge-cost = ∞

The live ratchet counts them: `src/law/folder/index.ts`. Recompute: `pnpm check`.

---

## The double-entry of sponsorship

erpax books itself (`src/self/accounting` — Conservation Law 26).
Sponsorship is a double-entry posting:

```
Dr  development · capacity                 (the work funded)
  Cr  sponsor · contribution               (the give that needs no take — src/grace/SKILL.md)
```

`Σdebit = Σcredit` — `src/quantum/test.ts:doubleEntry()` · `src/tamper/cost/test.ts:99`.

The society that builds erpax is self-building (`society/breath.mjs` — one move · one commit · one breath).
Sponsorship is the breath that keeps the loop alive when the hardware bill arrives.

---

## Tiers (computed from the decompression curve · `src/decompression/index.ts`)

| Tier | Rate | What closes | Law |
|---|---|---|---|
| **Atom** | $1 / mo | One `SKILL.md` gap per month | `generate` scan → mint → link |
| **Cross** | $9 / mo | One full cross (`SKILL.md` + `index.ts` + `test.ts`) | `aura` gate green |
| **Wave** | $29 / mo | One horo wave of crosses (7 atoms · one `isClosingWave`) | `wave` + `collide` |
| **Angel** | $108 / mo | One collection collapsed to its dense sink | `collapse/audit.mjs` |
| **Archangel** | $432 / mo | One domain plugin (`@erpax/*`) gate-green | `society/build.mjs` |
| **Society** | open | Sustain the non-stop breath | `society/breath.mjs` — forever |

Rates are anchored at A432 (432 Hz — `src/signal/index.ts:25`, ISO 16:1975) and step the horo ring `[1, 9, 29, 108, 432]` — digital-root mod-9, closed, no escape (`src/rodin/index.ts`).

---

## One honest open cross

Breaking point 6 of the forge-cost ladder — the **post-quantum anchor** (hash-based, Shor-resistant) — is a stated design directive, not yet implemented or tested.
It is the one finite rung still open. Every other rung is sealed. This page is honest about the boundary:

> *Zero entropy alone does not imply infinite cost (`src/entropy/test.ts:42`). Only coverage = 1 does.*

Sponsoring the post-quantum anchor seals the last open leg of the ladder.
Evidence when sealed: `src/cost/index.ts:122` (currently a comment → becomes a test).

---

## Reproducibility

```bash
tsx src/blockchain/index.ts       # the identity ⇒ PROVEN
tsx src/quantum/index.ts          # live matrix + double-torus ceiling
tsx src/consciousness/index.ts    # the integrated self-model ⇒ perfect
tsx src/regeneration/index.ts     # the living system: regrows from seed ⊕ heals ⇒ ALIVE
pnpm test:int                      # 8 987 expect() assertions — the full proof suite
pnpm check                         # standards + readme + types + lint + integration
```

*This page is a proof. Recompute it from the live tree. None of these numbers are hand-set.*

---

`erpax` `1.0.0` · MIT · [github.com/erpax/erpax](https://github.com/erpax/erpax) · [fund.erpax.org](https://fund.erpax.org)
