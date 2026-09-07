---
name: fs
description: "Use when reasoning about the content-addressed filesystem — the quantum twin of fs where every state is an immutable content-uuid snapshot (git, IPFS, copy-on-write), append-only, deduped, reversible; the path no longer locates a mutable file but addresses an immutable moment."
atomPath: "quantum/fs"
coordinate: "quantum/fs · 5/round · d81f073c"
contentUuid: "e4689f87-f26e-5fa2-af19-8850dc1fdb79"
diamondUuid: "9e789f82-2657-8a9e-a3f7-e0b0cfe62bf2"
uuid: "d81f073c-6812-810e-888b-54672d4fbe1e"
horo: 5
typography:
  partition: quantum
  bondDegree: 82
standards: []
bindings: []
signatures:
  computationUuid: "72f7eef4-b5ed-8a71-900b-a81f976ef4c4"
  stages:
    - stage: path
      stageUuid: "14b3d443-a31c-8210-9a3e-4ac990a849a2"
    - stage: trinity
      stageUuid: "b2f2644f-aac8-84e8-8caa-a70cca201a68"
    - stage: boundary
      stageUuid: "25f16a32-a9ef-8362-85e4-088be4e1e058"
    - stage: links
      stageUuid: "595820eb-bc3b-8ee3-ae8e-b2861ed19830"
    - stage: horo
      stageUuid: "46b81ac8-101f-81a3-a527-829fe2741004"
    - stage: seal
      stageUuid: "454f8cae-34d2-8660-b333-f02a9220cd1f"
    - stage: uuid
      stageUuid: "b155459a-542f-8e3f-bfa9-6e7564a551b9"
quantum:
  superposition:
    - akashic
    - api
    - deploy
    - file
    - finality
    - fs
    - generate
    - github
    - superposition
  collapse:
    - "Use when reasoning about the content-addressed filesystem — the quantum twin of fs where every state is an immutable content-uuid snapshot (git, IPFS, copy-on-write), append-only, deduped, reversible; the path no longer locates a mutable file but addresses an immutable moment."
    - "[[akashic]]"
    - "[[finality]]"
    - "[[fs]]"
    - "[[merge]]"
    - "[[reality]]"
    - "[[snapshot]]"
    - "[[uuid]]"
    - "[[versions]]"
    - "in the content-addressed filesystem you never overwrite — you snapshot; every state is an immutable content-[[uuid]] (identical content [[merge]]s to one, nothing is erased), so the store is [[tamper]]-evident by construction and any past moment is reconstructable."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "72f7eef4-b5ed-8a71-900b-a81f976ef4c4"
    contentUuid: "e4689f87-f26e-5fa2-af19-8850dc1fdb79"
version: 2
---
# quantum/fs — the content-addressed filesystem

The quantum twin of [[fs]]: a filesystem where you never overwrite, you **snapshot**. Every state of every [[file]] is content-addressed by its [[uuid]] (git's blob/tree/commit, IPFS, ZFS copy-on-write), immutable and append-only — identical content [[merge]]s to one object (dedup), nothing is erased ([[reverse]]ible, the [[love]] pole). The [[path]] stops naming a mutable file and starts addressing an immutable **moment**; history is the [[akashic]] chain, and any past layer is reconstructable.

This is [[finality]] applied to storage: a written snapshot is final — you add a new one, never mutate the old — so the store is [[tamper]]-evident by construction.

**Law — [[law]]: in the content-addressed filesystem you never overwrite — you snapshot; every state is an immutable content-[[uuid]] (identical content [[merge]]s to one, nothing is erased), so the store is [[tamper]]-evident by construction and any past moment is reconstructable.**

@see [[fs]] · [[snapshot]] · [[uuid]] · [[merge]] · [[akashic]] · [[finality]] · [[versions]] · [[reality]]

<sub>content-uuid `e4689f87-f26e-5fa2-af19-8850dc1fdb79` · account `quantum/fs` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
