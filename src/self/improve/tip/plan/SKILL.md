---
name: plan
description: "Use when a scored gap must become one executable tip — planTrinity builds FORM ⊗ CODE ⊗ PROOF, and isPreciseTip refuses anything vaguer, so 'continue improving' can never be emitted."
atomPath: "self/improve/tip/plan"
coordinate: "self/improve/tip/plan · 1/base · 2796cb9e"
contentUuid: "28a23c1a-30ba-5481-8ebe-cfb116979797"
diamondUuid: "5446098b-9e12-8afc-b491-03be7c1f34c8"
uuid: "2796cb9e-ca8e-8b84-b7d4-acbfa2285d62"
horo: 1
typography:
  partition: self
  bondDegree: 118
standards: []
bindings: []
signatures:
  computationUuid: "d6c154e6-5487-8606-b319-0f0e4b573c2d"
  stages:
    - stage: path
      stageUuid: "51153109-f4a6-88ff-b6b4-2fbac640b4d1"
    - stage: trinity
      stageUuid: "fc02d803-6be5-871d-807e-b1f67ea6ea64"
    - stage: boundary
      stageUuid: "4a615b89-5789-8e86-a77b-be7d05079137"
    - stage: links
      stageUuid: "f42782a2-462b-8573-8e91-77b8c17424c9"
    - stage: horo
      stageUuid: "bc16f498-3811-8fdd-ae7c-a6404cd2e830"
    - stage: seal
      stageUuid: "2c8317ad-a78d-8153-8792-06053566087b"
    - stage: uuid
      stageUuid: "930f979a-2e90-8338-8c01-2ee72020cd8c"
version: 2
---
# self/improve/tip/plan — one gap, one executable tip, or a refusal

The highest-scoring gap becomes a **trinity tip**: FORM is one executable sentence, CODE names the exact files or commands, PROOF names the exact green signal that would settle it.

`isPreciseTip` is the gate, and it fails closed. A tip matching `VAGUE_TIP_RE`, or carrying no concrete command, or naming no checkable proof, is **refused with its reason** rather than emitted. That refusal is the point: a loop that can emit *"continue improving"* will, and a tip nothing can contradict is a claim that reads as progress forever.

Forks dissolve — one tip per gap kind — so the loop cannot answer a single blockage three ways and call it three suggestions.

**Honest boundary.** This proves a tip is PRECISE, never that it is RIGHT. A perfectly concrete tip can point at the wrong work; precision is what makes that visible when the proof fails to go green.

Composes: [[self]] · [[rules]]/refutable · [[quantum]]/ftl.
