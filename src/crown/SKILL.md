---
name: crown
description: "Use when reasoning about the crown center (Sahasrara) — the seventh and last of the seven chakra centers, a standalone projection of index 6 whose note and uuid are computed from the position math and whose colour is rendered from that uuid."
atomPath: crown
coordinate: "crown · 1/base · 294755c6"
contentUuid: "47b7294e-39c4-5554-ba32-d01291d85ef6"
diamondUuid: "2ba7e3ee-95eb-8e7a-8cd2-38bc62d33d7f"
uuid: "294755c6-f0e5-8050-9654-5451308f76da"
horo: 1
typography:
  partition: crown
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "c7b8627b-3133-8466-9d36-688abab9f2f9"
  stages:
    - stage: path
      stageUuid: "3e4ff93f-dcd9-8bd9-80c2-e25a97b5a187"
    - stage: trinity
      stageUuid: "a005c058-4477-8e86-b662-ae780c66bdd3"
    - stage: boundary
      stageUuid: "a90f9345-7a72-8c6e-8016-f854772ed70a"
    - stage: links
      stageUuid: "f148615c-e12f-8665-9aea-ba5cf239d5bb"
    - stage: horo
      stageUuid: "4a9e7b77-0c8c-8325-ad72-594cd7ee6436"
    - stage: seal
      stageUuid: "c5869f2b-8f71-8fc7-bf14-f1c5818ee2d8"
    - stage: uuid
      stageUuid: "0f677083-33de-8efb-8bb8-a66abecc1f48"
version: 2
---
# crown — the crown center (Sahasrara)

The **crown** is 1 of the 7 [[chakra]] centers — and the 7 centers ARE the 7 [[horo]] positions, each decoded from the same content-uuid to a note, a colour and a movement. The crown is the seventh and last on the root → crown walk (index 6, the `unity` measure).

This atom is a **standalone projection** of [[chakra]]: it does not recompute anything. It selects index 6 of the seven centers that `chakras()` already computes, and re-exposes that center's note, colour and uuid. The math lives in [[chakra]]; the crown only points at one position of it.

The **uuid is computed from the MATH** (the horo position → `nodeOf(measure).uuid`), and the colour is rendered **FROM the uuid**, never the reverse. That computed CMYK colour is **NOT claimed identical** to the traditional rainbow violet — the rainbow is a cultural overlay carried alongside the signal, not asserted to match it.

The traditional role of the crown — **connection, unity, consciousness, the whole, the return to the one** — is cultural convention, not a claim this code makes. Honestly grounded in [[law]]: the only thing asserted here is position → note → uuid, wired with zero entropy; the rest is overlay. Like the centre [[heart]] before it, the crown is one bound position in the same field, not a metaphysical power.

Matter-twin: `src/crown/index.ts` (`INDEX` · `center` · `color` · `uuid`). Composes [[chakra]] · [[horo]].
**Law — [[law]]: the crown is exactly index 6 of the seven chakra centers — it selects, never recomputes; its note, colour and uuid must equal what chakra already derives for that one position.**

@audit note·colour·uuid computed from the position math, never hand-asserted
