---
name: threshold
description: "Use when composing multiple keys — n keys are strong only when they are n independent draws. n keys from one seed carry ONE seed's entropy; breaking it breaks all n. assertIndependentSources rejects any two shares sharing an admitted source address, which is what converts n masks on one seed into n independent secrets. Folding and entanglement diffuse admitted entropy and raise forge-cost but add ZERO, and a claim otherwise is refused as an over-claim. m-of-n reconstruction is a compass, not shipped."
atomPath: "entropy/threshold"
---

# entropy/threshold — n keys are strong only when they are n independent draws

Folded under [[entropy]] beside [[entropy]]/source, because that is what it composes: it takes **admitted draws** and reasons about what they add up to. (`src/threshold` is a schema.org vocabulary word — `freeShippingThreshold` — and taking it would contradict that atom's law.)

## The arithmetic *is* the security argument

```
folded     n keys from 1 admitted seed   →  256 bits, whatever n is
composed   n keys from n admitted seeds  →  n × 256 bits
```

`assertIndependentSources` is what turns the first into the second. It rejects any two shares whose attested source address is equal — and the test that matters shows *why the eye is not enough*:

> Two shares derived from **one** seed with different key schedules have **different material**. They look independent. `assertIndependentSources` refuses them anyway, because an attacker who breaks that seed holds both.

## Folding adds zero, and says so

The horo fold and the entanglement graph **diffuse** admitted entropy and **raise forge-cost**. They manufacture no randomness — a reversible encoding cannot: if it could, running it twice would create more and running it backwards would destroy some.

`ENTROPY_ADDED_BY_FOLD` is `0`, and `assertNoEntropyOverClaim` **refuses** a contrary claim rather than arguing with it.

## What ships, and what does not

`composeAll` is n-of-n XOR over independent draws — the one-time-pad construction, where every share is required and the math is a single operation. There is no field arithmetic to get wrong.

**m-of-n is deliberately absent.** Shamir over a prime field is where implementations go wrong, and rolling it here is exactly what a careful spec forbids. It is declared a **compass**:

```
threshold.independence        VERDICT
threshold.composition         VERDICT
threshold.foldAddsNoEntropy   VERDICT
threshold.mOfN                COMPASS  closedBy: a vetted Shamir implementation, pinned by version
```

So the gap shows up **in the integrity metric** instead of being papered over with custom math.

## Honest boundary

`n × 256` holds **only** for n independent admitted draws, and it is arithmetic over source addresses — not a measurement of the underlying randomness, which [[entropy]]/source establishes at its own boundary. Independence here means *distinct admitted seed*; it does not prove two hardware draws are statistically independent, which no local test can.

**Law — [[law]]: multi-key strength is real only when the keys are independent draws. n keys from one seed carry one seed's entropy; folding and entanglement raise forge-cost and add none.**

## Standards

- **NIST SP 800-57 Part 1 r5 §5.6.1** — comparable key strengths.
- **NIST SP 800-90B** — entropy sources.

Composes: [[entropy]] · [[convention]] · [[law]].
