---
name: seal
description: "Use when reaching the sealing half of the diamond — the receipt that makes a diamond signed rather than merely computed — through its own namespace; the face re-exports the diamond barrel while the matter is still being lifted out of the hub."
atomPath: "diamond/seal"
coordinate: "diamond/seal · 2/share · 5350b250"
contentUuid: "5180b6a0-05c2-586f-b04a-c9df62935aae"
diamondUuid: "07327302-ef70-8ec5-b3a4-025f1ce46379"
uuid: "5350b250-ea1e-8e6f-97b2-b6af36db25dd"
horo: 2
typography:
  partition: diamond
  bondDegree: 194
standards: []
bindings: []
signatures:
  computationUuid: "ddf36624-cfe8-8080-b9b0-90d1aa3a8325"
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
      stageUuid: "b228e7fb-dc84-8d72-a0ba-bfe67afc2f20"
    - stage: seal
      stageUuid: "ae568656-3716-8baf-af77-a0b7ad3acb85"
    - stage: uuid
      stageUuid: "b0eb9e6b-ea6e-8a9d-9b22-af68c44e9451"
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
