---
name: diffusion
description: "Use when reasoning about HOW a small market becomes big over time — the time-axis the static market product is missing. Adoption spreads as a contagion (Bass: rate = (p + q·F)·(1−F)·m; word-of-mouth q≈0.38 far exceeds advertising p≈0.03), filling the adopter sequence innovators → early-adopters → majority → laggards. Trendsetters are the seed the imitation engine amplifies; the chasm is where that engine stalls and most small markets stay small."
atomPath: diffusion
coordinate: diffusion · 8/crest · da56f2b1
contentUuid: "199c9bc6-376c-5752-abe8-112953ef4995"
diamondUuid: "8e3302f2-086f-8650-9f4f-40a2ec34ca5e"
uuid: "da56f2b1-934c-8a36-a3c0-e83de9fe31f9"
horo: 8
bonds:
  in:
    - awareness
    - bottleneck
    - breath
    - cohort
    - desire
    - distribution
    - friction
    - habit
    - market
    - network
    - power
    - proof
    - segment
    - signal
    - status
    - trend
  out:
    - awareness
    - bottleneck
    - breath
    - cohort
    - desire
    - distribution
    - friction
    - habit
    - market
    - network
    - power
    - proof
    - segment
    - signal
    - status
    - trend
typography:
  partition: diffusion
  bondDegree: 50
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - awareness
    - bottleneck
    - breath
    - cohort
    - desire
    - distribution
    - friction
    - habit
    - market
    - network
    - power
    - proof
    - segment
    - signal
    - status
    - trend
  matrix:
    - awareness
    - bottleneck
    - breath
    - cohort
    - desire
    - distribution
    - friction
    - habit
    - market
    - network
    - power
    - proof
    - segment
    - signal
    - status
    - trend
  backlinks:
    - awareness
    - bottleneck
    - breath
    - cohort
    - desire
    - distribution
    - friction
    - habit
    - market
    - network
    - power
    - proof
    - segment
    - signal
    - status
    - trend
signatures:
  computationUuid: "48c48660-9f83-8551-9cb7-e7c625447cdd"
  stages:
    - stage: path
      stageUuid: "ffb36692-907c-8eb6-9063-d922328772cd"
    - stage: trinity
      stageUuid: "8d2dd7ed-42ae-8626-9aaf-ad56c731455f"
    - stage: boundary
      stageUuid: "6290dadf-8fea-8d47-a215-1dc5bc8bc11d"
    - stage: links
      stageUuid: "80ad7b96-be63-8c3a-a009-feafb5795db4"
    - stage: horo
      stageUuid: "b141dc53-a10b-8806-b23e-18f0239a77b0"
    - stage: seal
      stageUuid: "35d1a57e-b015-8b48-9190-47e770e9677c"
    - stage: uuid
      stageUuid: "ed886144-214e-82e5-8d76-f8bbc6d4dd62"
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
