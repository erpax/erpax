---
name: session
description: "Use when walking a wave plan hop by hop with receipts — opens a session over a plan, emits a uuid-chained receipt per completed wave, and refuses to report ready until every wave is actually done. The actor is folded into the receipt's address, never stored in clear."
atomPath: "wave/session"
coordinate: "wave/session · 2/share · 505a2493"
contentUuid: "d132ca79-7bcb-52e1-94fd-af8507bec4d7"
diamondUuid: "1e32abee-07ad-8561-bbbc-cc6a81549f85"
uuid: "505a2493-b513-8477-876c-68b9d11bd59a"
horo: 2
typography:
  partition: wave
  bondDegree: 54
standards: []
bindings: []
signatures:
  computationUuid: "22f0154e-bf79-8b4c-9c60-ab925397f590"
  stages:
    - stage: path
      stageUuid: "2cd3553f-3da7-8a93-af06-61d34426ef3c"
    - stage: trinity
      stageUuid: "c949c6b2-f934-8b16-acb3-ec56bb54af19"
    - stage: boundary
      stageUuid: "1fe2d28c-f73c-82ff-814a-00bc58ef60b0"
    - stage: links
      stageUuid: "d48b4682-dae7-8846-8cee-08e87f1c7138"
    - stage: horo
      stageUuid: "3acc7076-4301-8c8b-9807-2ed2008806f3"
    - stage: seal
      stageUuid: "2cf04081-e520-8338-9fb3-d80b1bf9cd0a"
    - stage: uuid
      stageUuid: "899e637e-f5e6-8f8d-819e-1220df2424a7"
version: 2
---
# wave/session — readiness is earned, not assumed

A session walks a wave plan one hop at a time and emits a **uuid-chained receipt** per
completed wave: the first links to `GENESIS`, each addresses its own payload, and a
different actor produces a different address. The actor is therefore **evidence you
can verify**, not a plaintext label anyone could write.

The property that matters is negative: `isWaveSessionReady` is `false` until **every**
wave has actually been completed. A partially-walked plan reporting ready would be a
receipt for work never done — the exact shape of claim this corpus exists to refuse
([[rules]]/refutable). Completing the same wave twice does not invent progress either.

An **empty** plan is trivially complete and balanced, which is the honest answer: there
was nothing to walk.

**Honest boundary.** A receipt proves a hop was recorded, with what payload and in what
order — never that the work inside the wave was done correctly. It is a chain of
custody, not an audit of the contents.

Composes: [[wave]] · [[wave]]/load · [[audit]] · [[identity]].
