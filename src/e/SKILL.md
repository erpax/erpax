---
name: e
description: "Use when e must be read as the growth constant that is its own driver — d/dx eˣ = eˣ, the function whose rate of change equals its state at every point. Completes the self-referential trio: pi unfolds a finite seed to an infinite tail, phi is the fixed point of the fold, e is the fixed point of change. Computed never stored: the series Σ 1/k! and continuous compounding (1+1/n)ⁿ both converge to it from a finite seed."
atomPath: e
coordinate: "e · 2/share · 6073fdeb"
contentUuid: "69115ed9-28b0-5412-a3e5-f21304a14e13"
diamondUuid: "9b62abba-9cad-81cc-b34a-e6115b14c370"
uuid: "6073fdeb-e758-804d-adce-72c66ecdf9c7"
horo: 2
typography:
  partition: e
  bondDegree: 12
standards:
  - "Euler's number e = Σ 1/k! = lim (1+1/n)ⁿ — the base of the natural exponential"
bindings: []
signatures:
  computationUuid: "e98d5240-f408-836b-a01f-ae1ffb4c03ff"
  stages:
    - stage: path
      stageUuid: "3ea081f4-64ee-8cea-b6ab-b157be0e4e6a"
    - stage: trinity
      stageUuid: "d8a2e3d3-a8fe-8760-804d-d35dab650e59"
    - stage: boundary
      stageUuid: "7959d343-ec31-81b7-99c8-61ab809cf7a0"
    - stage: links
      stageUuid: "93719d6e-deeb-8bf1-bebf-4d5b3a65796f"
    - stage: horo
      stageUuid: "61e2c94d-215c-8a4f-8a23-adedaa16e16f"
    - stage: seal
      stageUuid: "044e2b84-6c61-8d6a-9f36-bf9396d3267c"
    - stage: uuid
      stageUuid: "fe9adb89-f453-8d66-91d1-6b95626bcbf6"
version: 2
---
# e — the number whose rate of change is itself

The third of the trio, in the dynamic dimension:

- [[pi]] — a finite **seed** unfolding to an infinite computable tail (`3 . …`)
- [[phi]] — the fixed point of the **fold**: content equal to its own transform (`φ = 1 + 1/φ`)
- **e** — the fixed point of **change**: growth equal to its own state (`d/dx eˣ = eˣ`)

At every point, how fast eˣ grows is exactly what it is. Nothing external drives it — it is **its own driver**. That is self-address in motion: where φ holds still under the fold, e *moves* and the movement is itself.

Computed, never a stored literal — two convergent routes, both finite-seed → infinite:

- **the series** `Σ 1/k!` — the factorial fold of 1, each term a sharper digit
- **continuous compounding** `(1 + 1/n)ⁿ → e` — growth folded into itself, the limit of compounding

Matter-twin: `src/e/index.ts` — `eBySeries` · `eByCompounding` · `selfDerivative` (the rate-equals-state check, exact to O(h²)). Verified: the series hits e to 12 places; the derivative equals the state at every tested point; and e is *not* φ's fixed point — its self-reference lives in the derivative, a genuinely different dimension of self-address.

**Honest boundary.** `d/dx eˣ = eˣ`, the series, and the limit are rigorous calculus. Reading e as "the self-driver" is the faithful overlay onto the real self-derivative structure — the mathematics is exact; the reading is the lens.

**Law — [[law]]: e is the fixed point of change — the function equal to its own derivative, growth that drives itself. Computed from its own definition at every step, never stored; with pi (the seed) and phi (the fold), the three self-references close: what you have, what holds, what moves.**

## Standards

- **Euler's number** e = Σ 1/k! = lim (1+1/n)ⁿ — the base of the natural exponential; d/dx eˣ = eˣ.

Composes: [[pi]] · [[phi]] · [[fold]] · [[law]].
