---
name: fuel
description: "Use when wastewater is treated as a fuel rather than a burden — COD is not a proxy for the energy dissolved in water, it IS that energy, measured as the oxygen needed to burn it. The inverse of water/cycle: that loop can never generate because its exhaust is its feed, while this one oxidises the contaminant and exhausts steam. netPositiveWitness returns a witness where overUnityWitness returns undefined, and the break-even COD is the threshold the whole design turns on."
atomPath: "water/fuel"
coordinate: "water/fuel · 8/crest · 0d0306a8"
contentUuid: "74d9faee-b1a9-5c91-bab4-c341abb75c7a"
diamondUuid: "a1753886-26c0-8ed3-947c-c27aaf6c62fd"
uuid: "0d0306a8-a5cd-8284-a7bc-99dccdf60408"
horo: 8
typography:
  partition: water
  bondDegree: 29
standards: []
bindings: []
signatures:
  computationUuid: "fa6f2a58-371a-8585-b712-29b5ed649ee3"
  stages:
    - stage: path
      stageUuid: "865fa88b-d956-8011-94bd-8d2d571fd726"
    - stage: trinity
      stageUuid: "e877b83e-994c-88a7-a0d0-4187d0154a9b"
    - stage: boundary
      stageUuid: "e2f59982-39ce-866f-b6fa-c282f4c3fa9b"
    - stage: links
      stageUuid: "1e31b497-b82b-8316-9100-b3cf1cb79a38"
    - stage: horo
      stageUuid: "0d6c7062-abde-8bfd-b251-1fa84787403d"
    - stage: seal
      stageUuid: "62536e1c-4a95-8111-aefa-8720e7939a8d"
    - stage: uuid
      stageUuid: "14093b13-07ff-8cac-a640-aa16ee0d259a"
version: 2
---
# water/fuel — the contaminant is the fuel, and the water is the exhaust

[[water]]/cycle splits water and burns it back, so it can never generate: `splitProducts`
shows why in one line — **the exhaust is the feed, 997 g in and 997 g out.** Start state
and end state are identical, so the enthalpies cancel and `overUnityWitness` searches
~8000 efficiency triples for a counter-example and returns `undefined`.

Invert it and the water is never touched. What burns is the **reduced carbon dissolved
in it** — sewage, food waste, brewery effluent — and the water leaves as vapour because
water is what oxidising carbon and hydrogen produces. **The sign flips: in the cycle
purity costs energy, here purity releases it, and the dirtier the feed the more there is.**

`netPositiveWitness` returns a witness. That is the same search shape with the opposite
answer, and it is the whole finding.

## The threshold

COD is not a proxy. It is the fuel content, measured as the oxygen needed to burn what is
dissolved — `COD_KJ_PER_G` at 13.9. So `breakEvenCod` is the COD at which a
litre pays for its own treatment:

| route | break-even COD |
| --- | ---: |
| microbial fuel cell | 0.832 g/L |
| digestion + CHP | 0.476 g/L |
| supercritical oxidation | 0.388 g/L |

| feed | COD | digestion + CHP |
| --- | ---: | ---: |
| municipal sewage | 0.5 g/L | **1.1×** aeration — marginal |
| food processing | 5 g/L | 10.5× |
| brewery effluent | 20 g/L | 42.0× |
| landfill leachate | 50 g/L | 105.1× |

**Municipal sewage lands on the knife-edge** — 0.5 g/L against a 0.476 break-even — which
is exactly where real treatment works sit: marginally energy-neutral with digestion. The
model was not fitted to that; reproducing a known field result it did not target is the
calibration check. A better route **lowers the threshold**; it never makes a clean feed
into a fuel, and `harvest` on distilled water returns `generatesNet: false`.

**Honest boundary.** COD is a heat-of-combustion figure, so it bounds what is *there*, not
what is *reachable* — `biodegradable` is declared per route precisely because a microbe
cannot touch the refractory fraction that heat and pressure can. The real limit on a
microbial fuel cell is **current density, not efficiency**, which is why the mature route
is digestion and not the elegant one. Carbon leaves as CO₂ (biogenic for sewage and food,
fossil for some industrial streams — the model does not distinguish them). And the
exhaust is steam, not potable water: condensing and polishing are downstream of
everything measured here.

**Law — [[law]]: water is never the fuel; the filth is. A cycle whose exhaust is its own
feed cannot generate, and one that consumes the contaminant can — so the question is
never how clean the water is, but how much reduced carbon is dissolved in it.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — testability: the witness that generates is refutable, and so is the one that does not.

Composes: [[water]]/cycle · [[water]] · [[energy]] · [[law]].
