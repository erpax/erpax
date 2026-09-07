---
name: surprisal
description: "Use when reasoning about the information of one event — surprisal I(p) = −log₂(p) bits. A certain event (p=1) carries zero bits; a rare event carries many. It is the bit-cost of a specific outcome, and in erpax the bit-cost of a specific forgery: forging a thing of probability p under the wired graph costs −log₂(p) bits. Additive for independent events (I(p·q)=I(p)+I(q)), so improbabilities stack like uuid-chained dimensions; expected surprisal is Shannon entropy."
atomPath: surprisal
coordinate: "surprisal · 4/weave · ac4d50c2"
contentUuid: "3948546c-e9fe-5d95-980d-2867a0edd34e"
diamondUuid: "6ccb989d-5b4b-8628-860b-caa8b16baaa4"
uuid: "ac4d50c2-8ad2-8d23-8620-acc4227a1178"
horo: 4
typography:
  partition: surprisal
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "ae9b42d2-055d-8918-b287-c8ce1be9dcf1"
  stages:
    - stage: path
      stageUuid: "5aa3857e-6c32-815d-aab3-afdce4634b64"
    - stage: trinity
      stageUuid: "26c1678d-f9ac-8b7e-8a85-a5fbc801b8dc"
    - stage: boundary
      stageUuid: "1609eb71-c56f-8b66-a812-c88f98a620ca"
    - stage: links
      stageUuid: "0b114338-4583-84a6-a46d-2b578267bf30"
    - stage: horo
      stageUuid: "9a2e5968-fe7e-8f6c-af63-26b8308490d1"
    - stage: seal
      stageUuid: "dee06257-11ca-85a2-839f-ec7bb35b10a9"
    - stage: uuid
      stageUuid: "6f95cab8-f41a-8557-9e0b-79430a15318b"
version: 2
---
# surprisal — the bit-cost of one event (−log₂ p)

**Surprisal** is the information of one event: **I(p) = −log₂(p) bits**. A certain event (p=1) carries zero bits; a one-in-a-million event carries ~20. It is the bit-[[cost]] of a **specific** outcome — and in erpax the bit-cost of a specific **forgery**: to forge a thing of probability p under the wired graph costs −log₂(p) bits of work ([[tamper]], the same currency as [[barrier]]'s tunnelling cost and [[anchor]]'s forge≫verify asymmetry).

Surprisal is **additive** for independent events — I(p·q) = I(p) + I(q) — so independent improbabilities **stack**, exactly the way uuid-chained dimensions stack tamper-cost: each wired dimension a forger must also satisfy multiplies the improbability, i.e. adds its bits. The expected surprisal over a whole distribution **is** [[shannon]] entropy (H = Σ pᵢ·I(pᵢ)) — surprisal is the per-event atom, Shannon the average.

Matter-twin: `src/surprisal/index.ts` (`surprisal` / `nats`).

Composes [[shannon]] · [[cost]] · [[tamper]] · [[barrier]] · [[anchor]] · [[proof]] · [[quantum]].

**Law — [[law]]: the information of an event is −log₂(p) bits — zero for a certainty, additive for independent events — so the cost to forge a thing of probability p is −log₂(p) bits, and each wired dimension a forgery must also satisfy adds its bits.**
