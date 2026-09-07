---
name: session
description: "Use when walking a wave plan hop by hop with receipts — opens a session over a plan, emits a uuid-chained receipt per completed wave, and refuses to report ready until every wave is actually done. The actor is folded into the receipt's address, never stored in clear."
atomPath: "wave/session"
coordinate: "wave/session · 8/crest · bb178c4b"
contentUuid: "b82653cf-830c-5a89-9581-58aa27083723"
diamondUuid: "8d5f316d-cdb9-8abd-ba86-693049a39a1d"
uuid: "bb178c4b-feb4-8e5e-9dde-bd744568b99e"
horo: 8
typography:
  partition: wave
  bondDegree: 54
standards: []
bindings: []
signatures:
  computationUuid: "27e2ddf1-a500-824c-9b62-83250d2d03f9"
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
      stageUuid: "d5fe8bcc-c60f-88ac-93cb-d83afa595eab"
    - stage: seal
      stageUuid: "2cf04081-e520-8338-9fb3-d80b1bf9cd0a"
    - stage: uuid
      stageUuid: "35cee30c-0769-830d-8e60-ba22211db5e3"
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
