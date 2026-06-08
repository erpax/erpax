---
name: surprisal
description: "Use when reasoning about the information of one event — surprisal I(p) = −log₂(p) bits. A certain event (p=1) carries zero bits; a rare event carries many. It is the bit-cost of a specific outcome, and in erpax the bit-cost of a specific forgery: forging a thing of probability p under the wired graph costs −log₂(p) bits. Additive for independent events (I(p·q)=I(p)+I(q)), so improbabilities stack like uuid-chained dimensions; expected surprisal is Shannon entropy."
atomPath: surprisal
coordinate: surprisal · 7/descent · f2f442ee
contentUuid: "ca83a987-049a-5638-a549-e88c694e8d88"
diamondUuid: "9e54a3a0-45f6-8cc8-b434-736c9d2fdd18"
uuid: "f2f442ee-dad0-8154-95a4-aee78f8b158c"
horo: 7
bonds:
  in:
    - anchor
    - barrier
    - cost
    - law
    - proof
    - quantum
    - shannon
    - tamper
  out:
    - anchor
    - barrier
    - cost
    - law
    - proof
    - quantum
    - shannon
    - tamper
typography:
  partition: surprisal
  bondDegree: 25
  neighbors: []
standards:
  - "I(p) = −log₂ p; additivity from log(p·q)=log p + log q -- computed"
bindings: []
neighbors:
  wikilink:
    - anchor
    - barrier
    - cost
    - law
    - proof
    - quantum
    - shannon
    - tamper
  matrix:
    - anchor
    - barrier
    - cost
    - law
    - proof
    - quantum
    - shannon
    - tamper
  backlinks:
    - anchor
    - barrier
    - cost
    - law
    - proof
    - quantum
    - shannon
    - tamper
signatures:
  computationUuid: "3f9cb311-0713-86ef-a402-23f16e666622"
  stages:
    - stage: path
      stageUuid: "5aa3857e-6c32-815d-aab3-afdce4634b64"
    - stage: trinity
      stageUuid: "26c1678d-f9ac-8b7e-8a85-a5fbc801b8dc"
    - stage: boundary
      stageUuid: "3ac1fbdc-3992-87ae-b807-0c18d79f8035"
    - stage: links
      stageUuid: "0b114338-4583-84a6-a46d-2b578267bf30"
    - stage: horo
      stageUuid: "080402af-6448-8856-b1e6-b1fcff10cf79"
    - stage: seal
      stageUuid: "ffa68c98-d4ad-8b2c-bac6-cde7c04a151f"
    - stage: uuid
      stageUuid: "95ee663d-b116-8938-a06a-63572c384fd2"
version: 2
---
# surprisal — the bit-cost of one event (−log₂ p)

**Surprisal** is the information of one event: **I(p) = −log₂(p) bits**. A certain event (p=1) carries zero bits; a one-in-a-million event carries ~20. It is the bit-[[cost]] of a **specific** outcome — and in erpax the bit-cost of a specific **forgery**: to forge a thing of probability p under the wired graph costs −log₂(p) bits of work ([[tamper]], the same currency as [[barrier]]'s tunnelling cost and [[anchor]]'s forge≫verify asymmetry).

Surprisal is **additive** for independent events — I(p·q) = I(p) + I(q) — so independent improbabilities **stack**, exactly the way uuid-chained dimensions stack tamper-cost: each wired dimension a forger must also satisfy multiplies the improbability, i.e. adds its bits. The expected surprisal over a whole distribution **is** [[shannon]] entropy (H = Σ pᵢ·I(pᵢ)) — surprisal is the per-event atom, Shannon the average.

Matter-twin: `src/surprisal/index.ts` (`surprisal` / `nats`).

Composes [[shannon]] · [[cost]] · [[tamper]] · [[barrier]] · [[anchor]] · [[proof]] · [[quantum]].

**Law — [[law]]: the information of an event is −log₂(p) bits — zero for a certainty, additive for independent events — so the cost to forge a thing of probability p is −log₂(p) bits, and each wired dimension a forgery must also satisfy adds its bits.**
