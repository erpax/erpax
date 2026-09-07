---
name: diffusion
description: "Use when reasoning about HOW a small market becomes big over time — the time-axis the static market product is missing. Adoption spreads as a contagion (Bass: rate = (p + q·F)·(1−F)·m; word-of-mouth q≈0.38 far exceeds advertising p≈0.03), filling the adopter sequence innovators → early-adopters → majority → laggards. Trendsetters are the seed the imitation engine amplifies; the chasm is where that engine stalls and most small markets stay small."
atomPath: "vocabulary/diffusion"
coordinate: "vocabulary/diffusion · 5/round · fbe65a4b"
contentUuid: "5b34ba5d-46f2-5a22-9b80-111b64a8d7aa"
diamondUuid: "4078a919-b8ed-8d4a-b68a-bbdceb5ed217"
uuid: "fbe65a4b-7c17-8086-b730-f5fe326be42b"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 52
standards: []
bindings: []
signatures:
  computationUuid: "e9d4cbec-cdb5-8521-b7a4-3c094c72fc65"
  stages:
    - stage: path
      stageUuid: "1ac3d2f6-6ca6-83ac-9f02-e5a326723178"
    - stage: trinity
      stageUuid: "64700774-47fd-855d-ad0f-faa1854b347b"
    - stage: boundary
      stageUuid: "e1784c12-0ee3-8d38-971c-651f40166288"
    - stage: links
      stageUuid: "9702f09a-9167-8309-82c9-79d3eb00d2a6"
    - stage: horo
      stageUuid: "823c52f6-77b8-8427-944b-bfe6a27a0e47"
    - stage: seal
      stageUuid: "b98c3ff1-6d6b-8094-832c-1d9280d75d93"
    - stage: uuid
      stageUuid: "7b77f4f5-8ec2-8886-a17c-54ca14cfc3ad"
version: 2
---
# diffusion — how a market fills over time (the dynamic the product law is missing)

[[market]] is a *snapshot* — the product of atoms at one instant. **diffusion** is its **time axis**: how a small market becomes big, or stalls and dies. A market does not fill uniformly; it fills as a **contagion**, each adopter lowering the [[awareness]] and [[proof]] cost for the next.

**The Bass law.** New adoption at time `t` splits into two engines:

```
adoption_rate(t) = ( p + q·F(t) ) · ( 1 − F(t) ) · m
```

`F(t)` = fraction already adopted, `m` = market potential, **`p`** = the *innovation* coefficient (external push: advertising, [[distribution]]), **`q`** = the *imitation* coefficient (internal pull: word-of-mouth, [[signal]]). Empirically **`q ≈ 0.38` far exceeds `p ≈ 0.03`** — imitation dwarfs advertising, so adoption traces an **S-curve** (cumulative) and a **bell** (rate). *Word of mouth is the engine; advertising only lights the match.*

**The adopter sequence** ([[cohort]]s on the curve, [[segment]]s by psychology — Rogers): innovators `2.5%` → early adopters `13.5%` → early majority `34%` → late majority `34%` → laggards `16%`. The first two — **the 16% "trendsetters"** ([[trend]] · [[power]]) — are the `p`-seed *and* the first carriers of `q`. This is *why* "make it accessible to those who lead trends" works: they ignite the imitation engine the other 84% run on. It is also why it is not enough — the seed is not the crossing.

**The chasm — the [[bottleneck]] of diffusion** (Moore). The `q`-engine **stalls** between early adopters and the early majority, because the two value different things: early adopters buy the *vision* and pay to be first ([[status]]⁺); the majority is **reference-oriented** — it adopts only on [[proof]] from peers *it* recognizes, and early-adopter word-of-mouth **does not transfer across the gap** (different reference group, different value domain). The chasm is where most small markets *stay* small. Crossing it needs a **beachhead [[segment]]** + the **whole product** for that one segment + proof from inside the majority's own reference group — not louder `p`. (Oatly crossed it baristas → Starbucks; Google Glass and Clubhouse died in it.)

**Saturation.** As `F → 1` the `(1 − F)` term → 0: every market stops growing (laggards last). Growth is borrowed from the unconverted, and it runs out — which is why the curve is bounded and why durable revenue must come from [[habit]], not fresh adoption.

**The breath, run on the curve** ([[breath]]): **inhale** = seed the 16% at high [[friction]] (harvest [[status]]⁺, ignite `q`); **exhale** = cross the chasm — lower friction, build the whole product, let [[habit]] hold the majority as status fades. Skip the inhale and there is no `q`-seed; skip the exhale (stay scarce) and you die at 16%. Where [[desire]] itself grows with adoption, the curve is reshaped by a [[network]] effect.

**The twin (DreamCraft3D).** DeepSeek's diffusion-model line (DreamCraft3D) runs *generative* diffusion — noise → structure over denoising steps; erpax `diffusion` runs *adoption* diffusion — non-adopter → adopter over the S-curve. One diffusion form on two domains: an iterative contagion toward a target distribution. Minted by the R&D society (`agent/research`, mint seq 0).

## Standards

- **Bass, Frank M. (1969)** — *"A New Product Growth for Model Consumer Durables,"* Management Science 15(5). The `p`/`q` adoption law. Meta-analytic norms `p ≈ 0.03`, `q ≈ 0.38` (Sultan, Farley & Lehmann 1990; *Principles of Marketing Engineering* averages `p = 0.035`, `q = 0.390`).
- **Rogers, Everett M. (1962)** — *Diffusion of Innovations.* The five adopter categories and the `2.5 / 13.5 / 34 / 34 / 16` split.
- **Moore, Geoffrey A. (1991)** — *Crossing the Chasm.* The discontinuity between early adopters and the pragmatist majority; the beachhead + whole-product + reference mechanism for crossing.

Composes [[market]] · [[trend]] · [[cohort]] · [[segment]] · [[awareness]] · [[proof]] · [[friction]] · [[status]] · [[habit]] · [[bottleneck]] · [[breath]] · [[network]] · [[signal]] · [[power]] · [[distribution]] · [[desire]].
