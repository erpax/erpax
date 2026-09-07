---
name: fs
description: "Use when reasoning about the content-addressed filesystem — the quantum twin of fs where every state is an immutable content-uuid snapshot (git, IPFS, copy-on-write), append-only, deduped, reversible; the path no longer locates a mutable file but addresses an immutable moment."
atomPath: "quantum/fs"
coordinate: "quantum/fs · 4/weave · 702f3b36"
contentUuid: "bbdf5b45-bb6f-5559-a6c3-4e8d8c48e402"
diamondUuid: "8900f1e7-26bd-8f60-8f82-021128c2e9db"
uuid: "702f3b36-7500-8ac4-857d-f285ada4a37e"
horo: 4
typography:
  partition: quantum
  bondDegree: 82
standards: []
bindings: []
signatures:
  computationUuid: "6e072e4d-dc6d-8796-952e-02cea71d9e98"
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
      stageUuid: "12ccdf8a-810c-828b-888c-f93ed584bb07"
    - stage: seal
      stageUuid: "454f8cae-34d2-8660-b333-f02a9220cd1f"
    - stage: uuid
      stageUuid: "f6c19971-08b8-8026-afd8-490862fbee2a"
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
    computationUuid: "6e072e4d-dc6d-8796-952e-02cea71d9e98"
    contentUuid: "bbdf5b45-bb6f-5559-a6c3-4e8d8c48e402"
version: 2
---
# quantum/fs — the content-addressed filesystem

The quantum twin of [[fs]]: a filesystem where you never overwrite, you **snapshot**. Every state of every [[file]] is content-addressed by its [[uuid]] (git's blob/tree/commit, IPFS, ZFS copy-on-write), immutable and append-only — identical content [[merge]]s to one object (dedup), nothing is erased ([[reverse]]ible, the [[love]] pole). The [[path]] stops naming a mutable file and starts addressing an immutable **moment**; history is the [[akashic]] chain, and any past layer is reconstructable.

This is [[finality]] applied to storage: a written snapshot is final — you add a new one, never mutate the old — so the store is [[tamper]]-evident by construction.

**Law — [[law]]: in the content-addressed filesystem you never overwrite — you snapshot; every state is an immutable content-[[uuid]] (identical content [[merge]]s to one, nothing is erased), so the store is [[tamper]]-evident by construction and any past moment is reconstructable.**

@see [[fs]] · [[snapshot]] · [[uuid]] · [[merge]] · [[akashic]] · [[finality]] · [[versions]] · [[reality]]

<sub>content-uuid `bbdf5b45-bb6f-5559-a6c3-4e8d8c48e402` · account `quantum/fs` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
