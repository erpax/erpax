---
name: seal
description: "Use when reaching the sealing half of the diamond — the receipt that makes a diamond signed rather than merely computed — through its own namespace; the face re-exports the diamond barrel while the matter is still being lifted out of the hub."
atomPath: "diamond/seal"
coordinate: "diamond/seal · 4/weave · 6596c406"
contentUuid: "6785fc68-62cf-51b9-b05a-f5264b3c0754"
diamondUuid: "a4906ec0-3ae5-84a4-b5d1-da7577de9eee"
uuid: "6596c406-8cbb-8c46-b283-b61c604d7d1f"
horo: 4
typography:
  partition: diamond
  bondDegree: 156
standards: []
bindings: []
signatures:
  computationUuid: "fd9e7663-eaaf-8ddc-9b43-005916318ed5"
  stages:
    - stage: path
      stageUuid: "2c36d2b0-a7e0-8c2f-bcc7-362be3266d3a"
    - stage: trinity
      stageUuid: "e86757b5-2ac5-83ac-b0dd-2dd88cd6598f"
    - stage: boundary
      stageUuid: "11756d5b-6a85-8aa6-a581-4633334bce3d"
    - stage: links
      stageUuid: "ba517c4a-01ca-894b-b1bd-352c8ec725d3"
    - stage: horo
      stageUuid: "43b30d43-054c-85fd-a7dd-1f52296d96a5"
    - stage: seal
      stageUuid: "ae568656-3716-8baf-af77-a0b7ad3acb85"
    - stage: uuid
      stageUuid: "58e8e071-92d6-87bf-bbf3-e9aa36d7054d"
version: 2
---
# diamond/seal — the seal face of [[diamond]]

`index.ts` re-exports the parent barrel, so `@/diamond/seal` offers exactly what `@/diamond`
offers today. **The matter has not moved yet**: this atom is the namespace a hub split named for
the sealing half of the diamond — what makes a diamond signed rather than merely computed, and its own `test.ts` pins the FACE so a caller importing through this path keeps
working while the extraction is finished.

Stated rather than dressed up: until the seal matter is lifted out of the parent, this is a
namespaced view, not a separate implementation ([[rules]]/concentration — matter belongs in the
child, and here it still sits in the hub).

Composes: [[diamond]].
