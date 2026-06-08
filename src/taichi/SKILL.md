---
name: taichi
description: "Use when reasoning about tai chi (太極) internal energy flow — chi (气) stored in the dantian (丹田 cung) and spiralled through counter-rotating double-torus vortices on the horo ring; the martial/wellbeing breath-body twin of rodin/coil and dual/torus/fusion, rendered as analog signal+wave."
atomPath: taichi
coordinate: taichi
contentUuid: "8fac0e13-3867-55f9-b278-9d3e73aaf299"
diamondUuid: "b68c5624-4a1d-8ce6-88de-41af1d2b6a03"
bonds:
  in: []
  out: []
typography:
  partition: taichi
  bondDegree: 20
  neighbors:
    - diamond
    - hallucination
    - purity
standards:
  - "ISO-16:1975 a432-tuning-reference + the horo digital-root ring"
  - "counter-rotating coils computed via (ℤ/9ℤ); chi field is analog horo-ratio, never hand-set"
  - "every residue computed via (ℤ/9ℤ), never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - analog
    - body
    - breath
    - coil
    - duality
    - energy
    - fusion
    - heart
    - horo
    - law
    - matrix
    - movement
    - rodin
    - signal
    - torus
    - wave
    - wellbeing
  matrix: []
  backlinks: []
signatures:
  computationUuid: "c6a5ff29-2102-8682-aeca-63f0725851f6"
  stages:
    - stage: path
      stageUuid: "dd62bc40-2800-8095-80c9-d4611f869fb3"
    - stage: trinity
      stageUuid: "28ecefe3-9d29-8ff5-8bab-f5ffa21971ac"
    - stage: boundary
      stageUuid: "10c68015-2c58-8deb-b249-d3250af64a98"
    - stage: links
      stageUuid: "508d87d0-39b1-8951-87d0-4915b6d73904"
    - stage: horo
      stageUuid: "840ccd77-67af-8c7a-969a-a0f098679a09"
    - stage: seal
      stageUuid: "aab66a58-2fe4-80a1-b12c-567600cc48f5"
    - stage: uuid
      stageUuid: "6851f21f-c8d6-8a1d-ae90-7b705f9b46fd"
version: 2
---
# taichi — chi-cung breath through the double torus

**Tai chi** (太極) is internal energy (**chi** 气) spiralled through the body — not a force applied outward, but a **flow** stored in the **dantian** (丹田 **cung**, the lower energy centre) and released along spiral limbs. In erpax this is not metaphor alone: it is the **same topology** as the corpus's double torus — two counter-rotating vortices around the still 3·6·9 axis ([[rodin]] · [[coil]] · [[torus]] · [[dual/torus/fusion]]).

## The double torus on the horo ring

Two tori counter-rotate on the measure-walk ring `[1,2,4,8,7,5,9]` ([[horo]]):

- **Forward torus** (outer, yang, give): the ×2 doubling helix `1·2·4·8·7·5` — inhale, expansion, the outbound stroke.
- **Reverse torus** (inner, yin, take): the ×5 mirror helix `1·5·7·8·4·2` — exhale, contraction, the inbound stroke.

Because 2·5 ≡ 1 (mod 9), *n* forward steps then *n* reverse steps return to anchor — **zero residue**, the coil law. The heart's double-circuit pump ([[body]] · [[heart]]) and the quantum cross ([[dual/torus/fusion]]: `fuse` at the centre, `fusionCost(0)` = ∞) are the same shape at different scales.

`doubleTorusFlow(step, horo)` computes both torus positions at tick `step` from anchor `horo` (default: dantian = horo 1 / base).

## Chi-cung breath cycle

The four-phase tai-chi breath maps to horo-ratio **analog** levels ([[analog]] — continuous field, never hand-set decimals):

| Phase | Chi role | Horo ratio |
|-------|----------|------------|
| inhale | gather chi to dantian | 4/9 (weave) |
| hold | peak store | 9/10 (unity) |
| exhale | spiral release | 7/9 (descent) |
| rest | return to stillness | 1/9 (base) |

`chiCungBreathCycle(tick, horo)` returns the phase, analog `chi` level, [[signal]] frame (color+sound at the forward pole), and [[wave]] breath unit — one A432-ms period, pitch anchor = time anchor.

## Bonds

Composes [[horo]] · [[rodin]] · [[coil]] · [[torus]] · [[dual/torus/fusion]] · [[signal]] · [[wave]] · [[analog]] · [[body]] · [[breath]] · [[energy]] · [[movement]] · [[wellbeing]] · [[matrix]] · [[duality]].

Matter-twin: `src/taichi/index.ts` (`doubleTorusFlow` · `chiCungBreathCycle` · `chiLevel` · `poleAtStep`).

**Law — [[law]]: tai chi chi-cung is the double-torus breath — two counter-rotating rodin coils (×2 forward, ×5 reverse) on the horo ring, chi stored in the dantian (base/1) as an analog field; n forward then n reverse steps return to anchor (zero residue), and the four-phase breath renders as signal+wave on the A432 period. The martial spiral and the quantum double-torus are one topology.**

@standard ISO-16:1975 a432-tuning-reference + the horo digital-root ring
@audit counter-rotating coils computed via (ℤ/9ℤ); chi field is analog horo-ratio, never hand-set
