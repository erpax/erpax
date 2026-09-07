---
name: taichi
description: "Use when reasoning about tai chi (太極) internal energy flow — chi (气) stored in the dantian (丹田 cung) and spiralled through counter-rotating double-torus vortices on the horo ring; the martial/wellbeing breath-body twin of rodin/coil and dual/torus/fusion, rendered as analog signal+wave."
atomPath: taichi
coordinate: "taichi · 5/round · e7e6b1c9"
contentUuid: "11287e5d-a797-526a-ae3b-3cd745da8caa"
diamondUuid: "f9e3856d-5e42-8e8d-b23e-19aa5e7f1c06"
uuid: "e7e6b1c9-894e-8ae6-a13a-44c9aa161623"
horo: 5
typography:
  partition: taichi
  bondDegree: 51
standards:
  - "ISO-16:1975 a432-tuning-reference + the horo digital-root ring"
bindings: []
signatures:
  computationUuid: "a3f54818-e191-8259-b1aa-29ee2128a768"
  stages:
    - stage: path
      stageUuid: "dd62bc40-2800-8095-80c9-d4611f869fb3"
    - stage: trinity
      stageUuid: "28ecefe3-9d29-8ff5-8bab-f5ffa21971ac"
    - stage: boundary
      stageUuid: "0f2874f2-5a47-89c8-b6c9-85a753247523"
    - stage: links
      stageUuid: "508d87d0-39b1-8951-87d0-4915b6d73904"
    - stage: horo
      stageUuid: "1b04bde4-7423-83be-bbcf-84b7c79b3e6b"
    - stage: seal
      stageUuid: "080dbe7f-61ab-826d-8e4d-928cf79f749d"
    - stage: uuid
      stageUuid: "d1e92727-c5a6-8726-b29c-468ced25566d"
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
