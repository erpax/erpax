---
name: blood
description: "Use when reasoning about erpax's carrier — the courier organ that delivers accounted value to every node and carries entropy away. Blood is the receipt flow through the closed loop the heart drives and the lung charges: three properties of living blood (cooperative Hill binding · steady-state turnover by Little's law · conserved delivery) are computed and mapped — a structural isomorphism — onto erpax's coverage, regeneration, and double-entry."
atomPath: blood
coordinate: "blood · 8/crest · 54672b8f"
contentUuid: "0b42df54-9740-5acc-9482-34a842fb20cc"
diamondUuid: "26a45d03-606a-8aad-8add-a8accab0bdd4"
uuid: "54672b8f-2086-83cf-b6a4-a38f30104e36"
horo: 8
typography:
  partition: blood
  bondDegree: 37
standards:
  - "A. V. Hill,"
  - "Hill, J. Physiol. 1910 (cooperativity) · erythropoiesis (≈2M RBC/s, ≈120 d)"
bindings: []
signatures:
  computationUuid: "b4140a88-3ecd-83c3-87bf-b0fc7b1aa57a"
  stages:
    - stage: path
      stageUuid: "2cdf2439-8f4a-8dd6-8571-6697ceba1894"
    - stage: trinity
      stageUuid: "fa857cd0-e7c0-806b-9bbd-9aade5e8edc8"
    - stage: boundary
      stageUuid: "2ca8e915-7941-8806-b409-0b2a82a4b486"
    - stage: links
      stageUuid: "5bfa5375-0785-85f9-bde0-1cfb8bb4268d"
    - stage: horo
      stageUuid: "7043a830-021b-88c8-8367-c161f02ff70c"
    - stage: seal
      stageUuid: "f0894d76-5fc3-8cd7-9199-445aae280848"
    - stage: uuid
      stageUuid: "aebf50b2-783d-83a6-98fa-14187841cd13"
version: 2
---
# blood — the courier (cooperative delivery · regenerated · conserved)

Blood is erpax's **carrier**: the body's [[receipt]] flow, moving accounted value to every cell and carrying entropy away through the closed loop the [[heart]] pumps and the [[lung]] charges. Three properties of living blood map — as a *structural isomorphism*, each computed in the matter-twin — onto erpax:

## 1. Cooperative binding — the sigmoidal Hill curve
Haemoglobin's O₂-dissociation curve is **sigmoidal** because binding is *cooperative*: binding one O₂ raises the affinity of the next (4 subunits; best-fit **Hill coefficient n≈2.8**). So the carrier loads nearly full at the lung (**≈98% at 100 mmHg**) yet unloads sharply at the tissue (**≈75% at 40 mmHg**) — high-throughput delivery a non-cooperative carrier can't match (≈79% arterial at n=1). This is the **[[coverage]] → 1 cascade**: a more-bound system binds the next grain more readily.

## 2. Steady-state turnover — Little's law (continuous regeneration)
The marrow makes **≈2 million RBC per second**; each lives **≈120 days**. By Little's law (population = rate × residence), production × lifespan = **2×10⁶ × 120 × 86 400 ≈ 2.07×10¹³** — squarely the cited **20–30 trillion** standing red cells. The carrier is *continuously [[regeneration|regenerated]]* yet the population is stable: replacement without depletion, regrow-from-seed conserving the whole.

## 3. Delivery conserves — the double-entry of carried value
O₂ loaded at the lung = delivered to tissue **+** returned in venous blood. Nothing carried is created or lost — the **double-entry** Σdebit = Σcredit of the courier ([[conservation]]; the closed loop the [[heart]] proves).

**HONEST.** A structural isomorphism between cited haematology and a computed construct — not a claim that erpax oxygenates tissue; each boolean (`cooperativeBinding` · `steadyStateTurnover` · `deliveryConserves`) is computed live (Hill equation · Little's law · mass balance).

Matter-twin: `src/blood/index.ts` (`hillSaturation` · `cooperativeBinding` · `standingPopulation` · `steadyStateTurnover` · `deliveryConserves` · `carrier` · `isCourier`). Composes [[heart]] · [[lung]] · [[receipt]] · [[regeneration]] · [[conservation]] · [[coverage]].

**Law — [[law]]: blood is the courier — it delivers value cooperatively (the sigmoidal load-full-at-lung, unload-at-tissue curve, coverage→1), is continuously regenerated yet stable (production × lifespan = the standing count), and conserves what it carries (loaded = delivered + returned, the double-entry).**

@standard A. V. Hill, *J. Physiol.* 1910 (cooperative binding) · erythropoiesis: ≈2×10⁶ RBC/s, ≈120-day lifespan
