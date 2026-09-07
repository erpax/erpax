---
name: plan
description: "Use when a scored gap must become one executable tip — planTrinity builds FORM ⊗ CODE ⊗ PROOF, and isPreciseTip refuses anything vaguer, so 'continue improving' can never be emitted."
atomPath: "self/improve/tip/plan"
coordinate: "self/improve/tip/plan · 2/share · d5988872"
contentUuid: "62dd3e88-5603-572b-9cfe-431b505cbb0a"
diamondUuid: "c62e2d78-61c0-86d3-884b-c25ebb83ebd3"
uuid: "d5988872-c9ec-805a-ba58-90d8f2ee237e"
horo: 2
typography:
  partition: self
  bondDegree: 118
standards: []
bindings: []
signatures:
  computationUuid: "87377a76-13ac-883e-ab5b-37afe5aa253b"
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
      stageUuid: "91d4c07d-9fcd-86fb-8212-d1a4a794e96d"
    - stage: seal
      stageUuid: "2c8317ad-a78d-8153-8792-06053566087b"
    - stage: uuid
      stageUuid: "fad2e19a-2811-891b-99ba-b879b919c776"
version: 2
---
# self/improve/tip/plan — one gap, one executable tip, or a refusal

The highest-scoring gap becomes a **trinity tip**: FORM is one executable sentence, CODE names the exact files or commands, PROOF names the exact green signal that would settle it.

`isPreciseTip` is the gate, and it fails closed. A tip matching `VAGUE_TIP_RE`, or carrying no concrete command, or naming no checkable proof, is **refused with its reason** rather than emitted. That refusal is the point: a loop that can emit *"continue improving"* will, and a tip nothing can contradict is a claim that reads as progress forever.

Forks dissolve — one tip per gap kind — so the loop cannot answer a single blockage three ways and call it three suggestions.

**Honest boundary.** This proves a tip is PRECISE, never that it is RIGHT. A perfectly concrete tip can point at the wrong work; precision is what makes that visible when the proof fails to go green.

Composes: [[self]] · [[rules]]/refutable · [[quantum]]/ftl.
