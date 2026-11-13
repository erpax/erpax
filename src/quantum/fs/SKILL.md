---
name: fs
description: "Use when reasoning about the content-addressed filesystem — the quantum twin of fs where every state is an immutable content-uuid snapshot (git, IPFS, copy-on-write), append-only, deduped, reversible; the path no longer locates a mutable file but addresses an immutable moment."
atomPath: "quantum/fs"
coordinate: "quantum/fs · 7/descent · 550961dc"
contentUuid: "12fa92ec-9015-58ff-8ed9-dede1a5d21b3"
diamondUuid: "91988bf1-fb16-8966-8c1b-fcb5e799a23c"
uuid: "550961dc-d9e7-8190-abe0-c812b27e2da0"
horo: 7
typography:
  partition: quantum
  bondDegree: 48
standards: []
bindings: []
signatures:
  computationUuid: "22f607d6-8ae3-8ed2-94f6-9cdc660db696"
  stages:
    - stage: path
      stageUuid: "14b3d443-a31c-8210-9a3e-4ac990a849a2"
    - stage: trinity
      stageUuid: "b2f2644f-aac8-84e8-8caa-a70cca201a68"
    - stage: boundary
      stageUuid: "17baa33e-19c8-840c-acb8-94b4e51b74c7"
    - stage: links
      stageUuid: "010a37dc-242e-872a-969b-dd0498692e58"
    - stage: horo
      stageUuid: "c8839503-2b11-8782-8b80-a96bb3556a5f"
    - stage: seal
      stageUuid: "454f8cae-34d2-8660-b333-f02a9220cd1f"
    - stage: uuid
      stageUuid: "f05ade7b-7fa7-8d29-b217-fddf168e7472"
quantum:
  superposition:
    - akashic
    - api
    - deploy
    - fs
    - law
    - love
    - merge
    - path
    - superposition
  collapse:
    - "Use when reasoning about the content-addressed filesystem — the quantum twin of fs where every state is an immutable content-uuid snapshot (git, IPFS, copy-on-write), append-only, deduped, reversible; the path no longer locates a mutable file but addresses an immutable moment."
    - "[[akashic]]"
    - "[[fs]]"
    - "[[merge]]"
    - "[[reality]]"
    - "[[uuid]]"
    - "[[versions]]"
    - finality
    - "in the content-addressed filesystem you never overwrite — you snapshot; every state is an immutable content-[[uuid]] (identical content [[merge]]s to one, nothing is erased), so the store is [[tamper]]-evident by construction and any past moment is reconstructable."
    - snapshot
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "22f607d6-8ae3-8ed2-94f6-9cdc660db696"
    contentUuid: "12fa92ec-9015-58ff-8ed9-dede1a5d21b3"
version: 2
---
# quantum/fs — the content-addressed filesystem

The quantum twin of [[fs]]: a filesystem where you never overwrite, you **snapshot**. Every state of every file is content-addressed by its [[uuid]] (git's blob/tree/commit, IPFS, ZFS copy-on-write), immutable and append-only — identical content [[merge]]s to one object (dedup), nothing is erased (reverseible, the [[love]] pole). The [[path]] stops naming a mutable file and starts addressing an immutable **moment**; history is the [[akashic]] chain, and any past layer is reconstructable.

This is finality applied to storage: a written snapshot is final — you add a new one, never mutate the old — so the store is [[tamper]]-evident by construction.

**Law — [[law]]: in the content-addressed filesystem you never overwrite — you snapshot; every state is an immutable content-[[uuid]] (identical content [[merge]]s to one, nothing is erased), so the store is [[tamper]]-evident by construction and any past moment is reconstructable.**

@see [[fs]] · snapshot · [[uuid]] · [[merge]] · [[akashic]] · finality · [[versions]] · [[reality]]

<sub>content-uuid `12fa92ec-9015-58ff-8ed9-dede1a5d21b3` · account `quantum/fs` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
