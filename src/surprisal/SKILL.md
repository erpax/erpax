---
name: surprisal
description: "Use when reasoning about the information of one event — surprisal I(p) = −log₂(p) bits. A certain event (p=1) carries zero bits; a rare event carries many. It is the bit-cost of a specific outcome, and in erpax the bit-cost of a specific forgery: forging a thing of probability p under the wired graph costs −log₂(p) bits. Additive for independent events (I(p·q)=I(p)+I(q)), so improbabilities stack like uuid-chained dimensions; expected surprisal is Shannon entropy."
atomPath: surprisal
coordinate: "surprisal · 4/weave · 1296a242"
contentUuid: "022e86ac-ae52-50af-88ad-61730cd0500f"
diamondUuid: "2231eda5-693b-8f31-9082-a9ba8927eac7"
uuid: "1296a242-dd5f-846f-abe2-15543cff7d9d"
horo: 4
typography:
  partition: surprisal
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "8cad9cea-a5f1-8614-ad27-dee6d96160a0"
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
      stageUuid: "3eb5e113-f5a3-843b-a7aa-a5f96b9d8889"
    - stage: seal
      stageUuid: "dee06257-11ca-85a2-839f-ec7bb35b10a9"
    - stage: uuid
      stageUuid: "c8dd6209-8d02-8cdc-8473-a0d19c07f907"
version: 2
---
# surprisal — the bit-cost of one event (−log₂ p)

**Surprisal** is the information of one event: **I(p) = −log₂(p) bits**. A certain event (p=1) carries zero bits; a one-in-a-million event carries ~20. It is the bit-[[cost]] of a **specific** outcome — and in erpax the bit-cost of a specific **forgery**: to forge a thing of probability p under the wired graph costs −log₂(p) bits of work ([[tamper]], the same currency as [[barrier]]'s tunnelling cost and [[anchor]]'s forge≫verify asymmetry).

Surprisal is **additive** for independent events — I(p·q) = I(p) + I(q) — so independent improbabilities **stack**, exactly the way uuid-chained dimensions stack tamper-cost: each wired dimension a forger must also satisfy multiplies the improbability, i.e. adds its bits. The expected surprisal over a whole distribution **is** [[shannon]] entropy (H = Σ pᵢ·I(pᵢ)) — surprisal is the per-event atom, Shannon the average.

Matter-twin: `src/surprisal/index.ts` (`surprisal` / `nats`).

Composes [[shannon]] · [[cost]] · [[tamper]] · [[barrier]] · [[anchor]] · [[proof]] · [[quantum]].

**Law — [[law]]: the information of an event is −log₂(p) bits — zero for a certainty, additive for independent events — so the cost to forge a thing of probability p is −log₂(p) bits, and each wired dimension a forgery must also satisfy adds its bits.**
