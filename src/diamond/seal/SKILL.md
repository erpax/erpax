---
name: seal
description: "Use when reaching the sealing half of the diamond — the receipt that makes a diamond signed rather than merely computed — through its own namespace; the face re-exports the diamond barrel while the matter is still being lifted out of the hub."
atomPath: "diamond/seal"
coordinate: "diamond/seal · 8/crest · d1a1c092"
contentUuid: "75900701-9f3d-53cc-9a55-33918154967e"
diamondUuid: "8eb7768f-8188-8e5e-98d2-538abefc0121"
uuid: "d1a1c092-8bfd-8139-8198-a234a75ae948"
horo: 8
typography:
  partition: diamond
  bondDegree: 190
standards: []
bindings: []
signatures:
  computationUuid: "de48ff95-12a6-8444-aa51-95a66ffef7ab"
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
      stageUuid: "bc868e57-6af2-832e-a4ae-012a6e48d3cf"
    - stage: seal
      stageUuid: "ae568656-3716-8baf-af77-a0b7ad3acb85"
    - stage: uuid
      stageUuid: "6f1ccdff-d0c5-8905-9cf7-3ee265f4db11"
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
