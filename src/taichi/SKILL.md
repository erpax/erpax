---
name: taichi
description: "Use when reasoning about tai chi (太極) internal energy flow — chi (气) stored in the dantian (丹田 cung) and spiralled through counter-rotating double-torus vortices on the horo ring; the martial/wellbeing breath-body twin of rodin/coil and dual/torus/fusion, rendered as analog signal+wave."
atomPath: taichi
coordinate: "taichi · 4/weave · 0c1b9639"
contentUuid: "4f9e23ff-896b-58cd-8631-78516109f814"
diamondUuid: "fcb1b550-cf71-8c6e-8f68-b55e25ab3fa1"
uuid: "0c1b9639-4958-885c-89bf-4250c42d5795"
horo: 4
typography:
  partition: taichi
  bondDegree: 51
standards:
  - "ISO-16:1975 a432-tuning-reference + the horo digital-root ring"
bindings: []
signatures:
  computationUuid: "78247660-d87f-882c-b5b6-801bedf3f5a6"
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
      stageUuid: "9f3085ba-2c2d-8daf-8e94-6f358c2831f5"
    - stage: seal
      stageUuid: "080dbe7f-61ab-826d-8e4d-928cf79f749d"
    - stage: uuid
      stageUuid: "54c98161-43fe-8108-a19f-801e14383aa7"
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
