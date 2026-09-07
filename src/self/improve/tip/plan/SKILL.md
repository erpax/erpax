---
name: plan
description: "Use when a scored gap must become one executable tip — planTrinity builds FORM ⊗ CODE ⊗ PROOF, and isPreciseTip refuses anything vaguer, so 'continue improving' can never be emitted."
atomPath: "self/improve/tip/plan"
coordinate: "self/improve/tip/plan · 2/share · 8910f1b6"
contentUuid: "82cccdda-8753-593d-b989-8832a93dedd2"
diamondUuid: "600d0083-a32a-88c1-a628-1b30d5b9ad61"
uuid: "8910f1b6-3beb-8205-b7d0-c46420fbe676"
horo: 2
typography:
  partition: self
  bondDegree: 118
standards: []
bindings: []
signatures:
  computationUuid: "6114859f-11bf-815d-ac89-8d6464d7e55a"
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
      stageUuid: "65a40f37-0731-85d0-a34a-cae8d930b212"
    - stage: seal
      stageUuid: "2c8317ad-a78d-8153-8792-06053566087b"
    - stage: uuid
      stageUuid: "d1e7c7fa-0416-8a16-a834-982ecadb9dad"
version: 2
---
# self/improve/tip/plan — one gap, one executable tip, or a refusal

The highest-scoring gap becomes a **trinity tip**: FORM is one executable sentence, CODE names the exact files or commands, PROOF names the exact green signal that would settle it.

`isPreciseTip` is the gate, and it fails closed. A tip matching `VAGUE_TIP_RE`, or carrying no concrete command, or naming no checkable proof, is **refused with its reason** rather than emitted. That refusal is the point: a loop that can emit *"continue improving"* will, and a tip nothing can contradict is a claim that reads as progress forever.

Forks dissolve — one tip per gap kind — so the loop cannot answer a single blockage three ways and call it three suggestions.

**Honest boundary.** This proves a tip is PRECISE, never that it is RIGHT. A perfectly concrete tip can point at the wrong work; precision is what makes that visible when the proof fails to go green.

Composes: [[self]] · [[rules]]/refutable · [[quantum]]/ftl.
