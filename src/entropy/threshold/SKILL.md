---
name: threshold
description: "Use when composing multiple keys — n keys are strong only when they are n independent draws. n keys from one seed carry ONE seed's entropy; breaking it breaks all n. assertIndependentSources rejects any two shares sharing an admitted source address, which is what converts n masks on one seed into n independent secrets. Folding and entanglement diffuse admitted entropy and raise forge-cost but add ZERO, and a claim otherwise is refused as an over-claim. m-of-n reconstruction is a compass, not shipped."
atomPath: "entropy/threshold"
coordinate: "entropy/threshold · 2/share · 1b26c40b"
contentUuid: "29590c09-c75c-5ffb-9b0d-ec8a589d1a76"
diamondUuid: "dc188ef6-64e0-8689-8e78-418a8dedd0a5"
uuid: "1b26c40b-a82b-822a-b4e4-2f2e06330030"
horo: 2
typography:
  partition: entropy
  bondDegree: 23
standards:
  - "NIST SP 800-57 Part 1 r5 §5.6.1 — comparable key strengths"
  - "NIST SP 800-90B — entropy sources"
  - "NIST-SP-800-57"
bindings: []
signatures:
  computationUuid: "dbd36574-fb75-8e21-a761-24d6e120fe8e"
  stages:
    - stage: path
      stageUuid: "b57d8cc0-106c-8d3d-af83-a2b14da75492"
    - stage: trinity
      stageUuid: "bf27989d-ab7e-8e39-aa5b-2bf014a5b4b8"
    - stage: boundary
      stageUuid: "5f782215-a278-8b6b-9396-89185676074a"
    - stage: links
      stageUuid: "c107dd85-c3ef-8900-b9ce-accaf666369d"
    - stage: horo
      stageUuid: "6a9758fc-fcdb-8e8d-903a-c34adc251b4e"
    - stage: seal
      stageUuid: "fa4b3f39-a65e-8ad6-81d4-6867b74199b7"
    - stage: uuid
      stageUuid: "70318bff-5578-8eab-945e-7c9f29371f78"
version: 2
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
