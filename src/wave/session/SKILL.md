---
name: session
description: "Use when walking a wave plan hop by hop with receipts — opens a session over a plan, emits a uuid-chained receipt per completed wave, and refuses to report ready until every wave is actually done. The actor is folded into the receipt's address, never stored in clear."
atomPath: "wave/session"
coordinate: "wave/session · 5/round · b5b7ff7d"
contentUuid: "ae775498-676c-52c4-b3ad-e496cbaaed00"
diamondUuid: "2fb683de-0ec5-81e7-beb4-c7b3e4f39294"
uuid: "b5b7ff7d-7c81-88d1-8e7c-2fcbe9361991"
horo: 5
typography:
  partition: wave
  bondDegree: 69
standards: []
bindings: []
signatures:
  computationUuid: "4ec5431d-f08d-86eb-826d-146021ea7b2c"
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
      stageUuid: "40196415-4d0c-8652-acfa-51a9014d1637"
    - stage: seal
      stageUuid: "2cf04081-e520-8338-9fb3-d80b1bf9cd0a"
    - stage: uuid
      stageUuid: "f146aa18-40a3-85f7-8bb8-10b3f53a7f93"
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
