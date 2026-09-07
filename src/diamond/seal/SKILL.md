---
name: seal
description: "Use when reaching the sealing half of the diamond — the receipt that makes a diamond signed rather than merely computed — through its own namespace; the face re-exports the diamond barrel while the matter is still being lifted out of the hub."
atomPath: "diamond/seal"
coordinate: "diamond/seal · 7/descent · 556f352e"
contentUuid: "d6da5fae-a239-5da4-88ba-9521fc5df6aa"
diamondUuid: "b4ff1540-0b16-842a-84c8-d4c344d9bfa0"
uuid: "556f352e-de4b-8042-9867-64aa23fc2cde"
horo: 7
typography:
  partition: diamond
  bondDegree: 194
standards: []
bindings: []
signatures:
  computationUuid: "a6b34012-5956-8b0b-b03f-2ca817faaeb0"
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
      stageUuid: "fbc2fdc5-c421-8ca5-b070-57506f5e7503"
    - stage: seal
      stageUuid: "ae568656-3716-8baf-af77-a0b7ad3acb85"
    - stage: uuid
      stageUuid: "ffc999ae-0ef7-80d8-b546-e69f10a43434"
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
