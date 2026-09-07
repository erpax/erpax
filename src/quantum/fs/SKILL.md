---
name: fs
description: "Use when reasoning about the content-addressed filesystem — the quantum twin of fs where every state is an immutable content-uuid snapshot (git, IPFS, copy-on-write), append-only, deduped, reversible; the path no longer locates a mutable file but addresses an immutable moment."
atomPath: "quantum/fs"
coordinate: "quantum/fs · 7/descent · c651af10"
contentUuid: "5a8af586-6704-56c2-b27d-56874019844f"
diamondUuid: "5b08faa5-0cbe-8169-af75-a2d12430c7c5"
uuid: "c651af10-dc31-8792-8a7c-c149b5623fdc"
horo: 7
typography:
  partition: quantum
  bondDegree: 82
standards: []
bindings: []
signatures:
  computationUuid: "fe938360-b3af-88e7-8dd1-0abc2798851f"
  stages:
    - stage: path
      stageUuid: "14b3d443-a31c-8210-9a3e-4ac990a849a2"
    - stage: trinity
      stageUuid: "b2f2644f-aac8-84e8-8caa-a70cca201a68"
    - stage: boundary
      stageUuid: "25f16a32-a9ef-8362-85e4-088be4e1e058"
    - stage: links
      stageUuid: "f997ef39-ef8d-8b18-8e56-36b98873be2a"
    - stage: horo
      stageUuid: "f49684f8-0524-8e2a-9e17-904b9b8f6265"
    - stage: seal
      stageUuid: "454f8cae-34d2-8660-b333-f02a9220cd1f"
    - stage: uuid
      stageUuid: "cac1c0eb-c80a-87d6-827d-80579f617aa4"
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
    computationUuid: "fe938360-b3af-88e7-8dd1-0abc2798851f"
    contentUuid: "5a8af586-6704-56c2-b27d-56874019844f"
version: 2
---
# quantum/fs — the content-addressed filesystem

The quantum twin of [[fs]]: a filesystem where you never overwrite, you **snapshot**. Every state of every [[file]] is content-addressed by its [[uuid]] (git's blob/tree/commit, IPFS, ZFS copy-on-write), immutable and append-only — identical content [[merge]]s to one object (dedup), nothing is erased ([[reverse]]ible, the [[love]] pole). The [[path]] stops naming a mutable file and starts addressing an immutable **moment**; history is the [[akashic]] chain, and any past layer is reconstructable.

This is [[finality]] applied to storage: a written snapshot is final — you add a new one, never mutate the old — so the store is [[tamper]]-evident by construction.

**Law — [[law]]: in the content-addressed filesystem you never overwrite — you snapshot; every state is an immutable content-[[uuid]] (identical content [[merge]]s to one, nothing is erased), so the store is [[tamper]]-evident by construction and any past moment is reconstructable.**

@see [[fs]] · [[snapshot]] · [[uuid]] · [[merge]] · [[akashic]] · [[finality]] · [[versions]] · [[reality]]

<sub>content-uuid `5a8af586-6704-56c2-b27d-56874019844f` · account `quantum/fs` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
