---
name: surprisal
description: "Use when reasoning about the information of one event — surprisal I(p) = −log₂(p) bits. A certain event (p=1) carries zero bits; a rare event carries many. It is the bit-cost of a specific outcome, and in erpax the bit-cost of a specific forgery: forging a thing of probability p under the wired graph costs −log₂(p) bits. Additive for independent events (I(p·q)=I(p)+I(q)), so improbabilities stack like uuid-chained dimensions; expected surprisal is Shannon entropy."
atomPath: surprisal
coordinate: "surprisal · 4/weave · fdeea09a"
contentUuid: "bb07bfe5-ae7a-50ce-a486-b7fb4ce1d29b"
diamondUuid: "499d2a93-0daa-80e9-b912-10a411e4ee2c"
uuid: "fdeea09a-7a5b-80a2-9330-b472dc5f2b25"
horo: 4
typography:
  partition: surprisal
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "11381135-342a-8c33-9b21-8fd147f0925d"
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
      stageUuid: "78ea033d-430c-8528-9eac-fe817b2b8778"
    - stage: seal
      stageUuid: "dee06257-11ca-85a2-839f-ec7bb35b10a9"
    - stage: uuid
      stageUuid: "f4973c01-a451-80b0-a544-31d0fb6fed8b"
version: 2
---
# surprisal — the bit-cost of one event (−log₂ p)

**Surprisal** is the information of one event: **I(p) = −log₂(p) bits**. A certain event (p=1) carries zero bits; a one-in-a-million event carries ~20. It is the bit-[[cost]] of a **specific** outcome — and in erpax the bit-cost of a specific **forgery**: to forge a thing of probability p under the wired graph costs −log₂(p) bits of work ([[tamper]], the same currency as [[barrier]]'s tunnelling cost and [[anchor]]'s forge≫verify asymmetry).

Surprisal is **additive** for independent events — I(p·q) = I(p) + I(q) — so independent improbabilities **stack**, exactly the way uuid-chained dimensions stack tamper-cost: each wired dimension a forger must also satisfy multiplies the improbability, i.e. adds its bits. The expected surprisal over a whole distribution **is** [[shannon]] entropy (H = Σ pᵢ·I(pᵢ)) — surprisal is the per-event atom, Shannon the average.

Matter-twin: `src/surprisal/index.ts` (`surprisal` / `nats`).

Composes [[shannon]] · [[cost]] · [[tamper]] · [[barrier]] · [[anchor]] · [[proof]] · [[quantum]].

**Law — [[law]]: the information of an event is −log₂(p) bits — zero for a certainty, additive for independent events — so the cost to forge a thing of probability p is −log₂(p) bits, and each wired dimension a forgery must also satisfy adds its bits.**
