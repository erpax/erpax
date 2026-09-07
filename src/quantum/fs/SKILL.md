---
name: fs
description: "Use when reasoning about the content-addressed filesystem — the quantum twin of fs where every state is an immutable content-uuid snapshot (git, IPFS, copy-on-write), append-only, deduped, reversible; the path no longer locates a mutable file but addresses an immutable moment."
atomPath: "quantum/fs"
coordinate: "quantum/fs · 7/descent · 406341fc"
contentUuid: "ec1041e0-2198-541b-ad5c-972a71856af2"
diamondUuid: "6f7d9f35-ad84-8ecf-97fd-51928934f2ac"
uuid: "406341fc-aa8d-8ca6-8981-02a8d613b07e"
horo: 7
typography:
  partition: quantum
  bondDegree: 82
standards: []
bindings: []
signatures:
  computationUuid: "b76cff34-e846-89f2-ad0d-d8d6278724b2"
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
      stageUuid: "5b89b299-b4c2-89f7-a4fc-2d4ab9a4ffff"
    - stage: seal
      stageUuid: "454f8cae-34d2-8660-b333-f02a9220cd1f"
    - stage: uuid
      stageUuid: "a9793d37-ebdf-8761-b4d6-929c8dfcb739"
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
    computationUuid: "b76cff34-e846-89f2-ad0d-d8d6278724b2"
    contentUuid: "ec1041e0-2198-541b-ad5c-972a71856af2"
version: 2
---
# quantum/fs — the content-addressed filesystem

The quantum twin of [[fs]]: a filesystem where you never overwrite, you **snapshot**. Every state of every [[file]] is content-addressed by its [[uuid]] (git's blob/tree/commit, IPFS, ZFS copy-on-write), immutable and append-only — identical content [[merge]]s to one object (dedup), nothing is erased ([[reverse]]ible, the [[love]] pole). The [[path]] stops naming a mutable file and starts addressing an immutable **moment**; history is the [[akashic]] chain, and any past layer is reconstructable.

This is [[finality]] applied to storage: a written snapshot is final — you add a new one, never mutate the old — so the store is [[tamper]]-evident by construction.

**Law — [[law]]: in the content-addressed filesystem you never overwrite — you snapshot; every state is an immutable content-[[uuid]] (identical content [[merge]]s to one, nothing is erased), so the store is [[tamper]]-evident by construction and any past moment is reconstructable.**

@see [[fs]] · [[snapshot]] · [[uuid]] · [[merge]] · [[akashic]] · [[finality]] · [[versions]] · [[reality]]

<sub>content-uuid `ec1041e0-2198-541b-ad5c-972a71856af2` · account `quantum/fs` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
