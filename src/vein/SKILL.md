---
name: vein
description: "Use when reasoning about erpax's return vessel — the one-way organ. Venous valves enforce unidirectional flow back to the heart (a ratchet, the append-only return), the veins hold ~70% of blood volume (a capacitance reservoir), and with the artery they close the reciprocal loop. Three properties are computed and mapped — a structural isomorphism — onto erpax's append-only chain and reciprocal wiring."
atomPath: vein
coordinate: "vein · 2/share · 2ee46cd8"
contentUuid: "b450969c-bf38-5274-be4a-a477873843ff"
diamondUuid: "8d1f4233-bbdd-8cab-aa25-b9b6c1c9069a"
uuid: "2ee46cd8-9e47-8236-8fe4-ac8a7b8f30d7"
horo: 2
typography:
  partition: vein
  bondDegree: 26
standards:
  - venous valves prevent regurgitation; veins are capacitance vessels holding ≈70% of blood volume
  - venous valves prevent regurgitation; veins hold ≈70% of blood volume (capacitance)
bindings: []
signatures:
  computationUuid: "92c20772-0eb4-8257-ab4a-8a0a93373b02"
  stages:
    - stage: path
      stageUuid: "8e27d494-4602-8dd5-8e14-bc4ea2a9e638"
    - stage: trinity
      stageUuid: "f69f484a-f247-8a85-8ffa-b766a06195f5"
    - stage: boundary
      stageUuid: "c6db4f9e-bf2c-8b1e-b853-52491c85b263"
    - stage: links
      stageUuid: "a48af593-96c7-8a3b-9949-d617f819cdbb"
    - stage: horo
      stageUuid: "9edb8841-6b53-8a8f-8270-80fd78678125"
    - stage: seal
      stageUuid: "d8582646-2198-81c4-abb1-fa28d544862e"
    - stage: uuid
      stageUuid: "7b6a606f-a101-80af-8074-9b1625234c7e"
version: 2
---
# vein — the one-way return (the append-only path)

A vein carries blood *to* the [[heart]] — the return half of the circuit. Three properties of the living vein map — as a *structural isomorphism*, each computed in the matter-twin — onto erpax:

## 1. One-way valve — the ratchet
Because venous pressure is low and gravity pulls against return, **one-way (unidirectional) valves prevent backflow** — they pass forward flow and block regurgitation (Vein, Wikipedia; LibreTexts). This is the **append-only ratchet**: value moves toward closure and never reverses — the audit chain that records forward and forbids rewrite ([[receipt]]'s uuid-chain).

## 2. Capacitance — the reservoir
At any moment **~70% of the total blood volume rests in the veins**; their thin walls and wide lumens make them **capacitance vessels** that expand to hold and contract to mobilise (NumberAnalytics; LibreTexts). This is the **reservoir where the corpus sits at rest** — the bulk of the volume held, drawn on as demand rises.

## 3. Reciprocal return — the closed loop
[[artery]] out **+** vein back = the **closed circuit**: what is delivered is returned, conserved. Every outbound link has its return — the all-directions reciprocity erpax requires ([[conservation]]; the closed loop the [[heart]] proves). An artery without its vein is a leak; a link without its reciprocal is a gap.

**HONEST.** A structural isomorphism between cited venous physiology and a computed construct — not a claim that erpax has valves; each boolean (`oneWay` · `capacitance` · `returnsReciprocal`) is computed live (a unidirectional valve · volume distribution · loop mass balance).

Matter-twin: `src/vein/index.ts` (`valve` · `oneWay` · `flowThrough` · `VENOUS_FRACTION` · `capacitance` · `returnsReciprocal` · `veinReturn` · `returns`). Composes [[heart]] · [[artery]] · [[receipt]] · [[conservation]].

**Law — [[law]]: the vein is the one-way return — valves forbid backflow (the append-only ratchet), it holds ~70% of the volume (the capacitance reservoir), and with the artery it closes the reciprocal loop (every outbound link has its return, conserved).**

@standard venous valves prevent regurgitation; veins are capacitance vessels holding ≈70% of blood volume
