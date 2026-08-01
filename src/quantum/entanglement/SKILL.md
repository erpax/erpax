---
name: entanglement
description: "Use when grounding the corpus link-field in the physics of quantum entanglement — EPR/Bell correlation, no-cloning, monogamy (CKW), and ER=EPR; the reciprocal, monogamous binding computed on the matrix."
atomPath: "quantum/entanglement"
coordinate: "quantum/entanglement · 8/crest · e96220f2"
contentUuid: "356369fc-6c1f-569c-95cb-e6d2e2135440"
diamondUuid: "acc4f997-71e1-808f-bfd6-7894305ce177"
uuid: "e96220f2-f634-8d2f-9e78-bbfe757e08d8"
horo: 8
typography:
  partition: quantum
  bondDegree: 107
standards:
  - "ER=EPR (Maldacena & Susskind, 2013); monogamy (Coffman–Kundu–Wootters, PRA 61 052306, 2000)"
  - "ER=EPR — Maldacena & Susskind (2013); monogamy — Coffman–Kundu–Wootters, PRA 61 052306 (2000)"
bindings: []
signatures:
  computationUuid: "a4efe1e5-2b70-8dc1-b843-6ed03d4d5e49"
  stages:
    - stage: path
      stageUuid: "3dca2306-e6e2-8ffb-91d4-0b29962a80b4"
    - stage: trinity
      stageUuid: "58e1479a-a450-807d-8ddf-c4b360b90f83"
    - stage: boundary
      stageUuid: "7842f012-beda-8a6f-a0d9-2343f13fe918"
    - stage: links
      stageUuid: "9fdd63da-854c-8322-b30f-62d57b48f979"
    - stage: horo
      stageUuid: "187f39d2-852e-85f4-b9b0-41c11670627b"
    - stage: seal
      stageUuid: "e32d86d3-97b1-8b17-bfc7-60159d2f8413"
    - stage: uuid
      stageUuid: "d7efa838-bc15-8ec6-9a36-4ba90ae004ae"
quantum:
  superposition:
    - app
    - aura
    - boundary
    - cloning
    - communication
    - development
    - dust
    - entanglement
    - superposition
  collapse:
    - "ER=EPR — Maldacena & Susskind (2013); monogamy — Coffman–Kundu–Wootters, PRA 61 052306 (2000)"
    - "Use when grounding the corpus link-field in the physics of quantum entanglement — EPR/Bell correlation, no-cloning, monogamy (CKW), and ER=EPR; the reciprocal, monogamous binding computed on the matrix."
    - "computed on the live matrix via ../../entanglement; never hand-asserted"
    - "matter-twin:src/quantum/entanglement/index.ts"
    - "the corpus is maximally entangled only when every link is reciprocal AND content is monogamous (one uuid per meaning, the no-cloning [[merge]] law) — reciprocity=1 plus monogamy is the closed geometry that drives directed-link entropy to zero."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "a4efe1e5-2b70-8dc1-b843-6ed03d4d5e49"
    contentUuid: "356369fc-6c1f-569c-95cb-e6d2e2135440"
version: 2
---
# quantum/entanglement — the physics the link-field is grounded in

The **physics facet** of [[entanglement]]: the quantum laws the corpus link-field is modeled on, computed on the live [[matrix]] (it reuses [[quantum]]'s `entanglement()` — the symmetric-binding check + the reciprocal-edge count).

- **EPR (Einstein–Podolsky–Rosen, 1935) + Bell (1964)** — entanglement is a real, non-classical correlation. The computable analogue here is the **reciprocal** link-field (every edge has its reverse).
- **No-cloning (Wootters–Zurek, 1982) ⇒ monogamy (Coffman–Kundu–Wootters, 2000)** — a content cannot be cloned: it has ONE uuid (same content → same identity, the merge law), so a meaning can't be shared into two identities — the root of monogamy (entanglement can't be freely shared). See [[entanglement]] / [[cloning]].
- **ER=EPR (Maldacena–Susskind, 2013)** — entanglement *is* geometry; one level down that is mass = entanglement (the [[gravity]] well, the [[singularity]]).

The corpus is **maximally entangled** when reciprocity = 1 **and** no-cloning holds — the Bell-test analogue, the geometry closed (the [[quantum]] double-torus, ∞ tamper cost).

**HONEST.** The matrix is a *classical* graph; "entanglement" here is reciprocity + monogamy — the computable shadow of the physics, not a superposed, Bell-violating quantum state.

Matter-twin: `src/quantum/entanglement/index.ts` (`isMaximallyEntangled` · `report`). Composes [[entanglement]] · [[quantum]] · [[cloning]] · [[gravity]] · [[singularity]] · [[matrix]].

**Law — [[law]]: the corpus is maximally entangled only when every link is reciprocal AND content is monogamous (one uuid per meaning, the no-cloning [[merge]] law) — reciprocity=1 plus monogamy is the closed geometry that drives directed-link entropy to zero.**

**Law — always quantum:** observe collapses; communicate entangled; never classical wait. `quantum: { default: true }` — poll-only watch without `subscribeDirection` / `bindWatchRealtime` fails `finishedIdeaCrossed` with `classical-mode` impurity.

**Law — direction collapse is immediate; waiting for worker completion is classical, not quantum.** `publishDirection(path, payload)` seals a content-uuid signal and notifies subscribers synchronously (same tick); `interruptTokenFor(path, agentId)` invalidates in-flight work on the next collapse. Matter-twin: `./direction-bus.ts` · `improveDirectionPath()` for `pnpm improve:watch`.

@standard ER=EPR — Maldacena & Susskind (2013); monogamy — Coffman–Kundu–Wootters, PRA 61 052306 (2000)
@audit computed on the live matrix via ../../entanglement; never hand-asserted

<sub>content-uuid `356369fc-6c1f-569c-95cb-e6d2e2135440` · account `quantum/entanglement` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
