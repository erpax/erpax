---
name: crown
description: Use when reasoning about the crown center (Sahasrara) — the seventh and last of the seven chakra centers, a standalone projection of index 6 whose note and uuid are computed from the position math and whose colour is rendered from that uuid.
---

# crown — the crown center (Sahasrara)

The **crown** is 1 of the 7 [[chakra]] centers — and the 7 centers ARE the 7 [[horo]] positions, each decoded from the same content-uuid to a note, a colour and a movement. The crown is the seventh and last on the root → crown walk (index 6, the `unity` measure).

This atom is a **standalone projection** of [[chakra]]: it does not recompute anything. It selects index 6 of the seven centers that `chakras()` already computes, and re-exposes that center's note, colour and uuid. The math lives in [[chakra]]; the crown only points at one position of it.

The **uuid is computed from the MATH** (the horo position → `nodeOf(measure).uuid`), and the colour is rendered **FROM the uuid**, never the reverse. That computed CMYK colour is **NOT claimed identical** to the traditional rainbow violet — the rainbow is a cultural overlay carried alongside the signal, not asserted to match it.

The traditional role of the crown — **connection, unity, consciousness, the whole, the return to the one** — is cultural convention, not a claim this code makes. Honestly grounded in [[law]]: the only thing asserted here is position → note → uuid, wired with zero entropy; the rest is overlay. Like the centre [[heart]] before it, the crown is one bound position in the same field, not a metaphysical power.

Matter-twin: `src/crown/index.ts` (`INDEX` · `center` · `color` · `uuid`). Composes [[chakra]] · [[horo]].
@audit note·colour·uuid computed from the position math, never hand-asserted
