---
name: plan
description: "Use when a scored gap must become one executable tip — planTrinity builds FORM ⊗ CODE ⊗ PROOF, and isPreciseTip refuses anything vaguer, so 'continue improving' can never be emitted."
atomPath: "self/improve/tip/plan"
coordinate: "self/improve/tip/plan · 4/weave · f65a989b"
contentUuid: "8025c7c8-d0d5-586d-819d-5e6bbade5d20"
diamondUuid: "2664a16a-94c1-8433-92b9-2afbc6a0572c"
uuid: "f65a989b-f6a8-8d70-8edb-6a4f5e963c0e"
horo: 4
typography:
  partition: self
  bondDegree: 118
standards: []
bindings: []
signatures:
  computationUuid: "2b7d5e37-56ff-8b33-a60f-68f11cfa3460"
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
      stageUuid: "943519d3-cb19-8001-9b0e-2853b5b64588"
    - stage: seal
      stageUuid: "2c8317ad-a78d-8153-8792-06053566087b"
    - stage: uuid
      stageUuid: "b713d959-2e02-8b89-9ddb-b47150537905"
version: 2
---
# self/improve/tip/plan — one gap, one executable tip, or a refusal

The highest-scoring gap becomes a **trinity tip**: FORM is one executable sentence, CODE names the exact files or commands, PROOF names the exact green signal that would settle it.

`isPreciseTip` is the gate, and it fails closed. A tip matching `VAGUE_TIP_RE`, or carrying no concrete command, or naming no checkable proof, is **refused with its reason** rather than emitted. That refusal is the point: a loop that can emit *"continue improving"* will, and a tip nothing can contradict is a claim that reads as progress forever.

Forks dissolve — one tip per gap kind — so the loop cannot answer a single blockage three ways and call it three suggestions.

**Honest boundary.** This proves a tip is PRECISE, never that it is RIGHT. A perfectly concrete tip can point at the wrong work; precision is what makes that visible when the proof fails to go green.

Composes: [[self]] · [[rules]]/refutable · [[quantum]]/ftl.
