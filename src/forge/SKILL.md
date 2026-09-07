---
name: forge
description: "Use when reasoning about WHERE atoms are made one — the forge is the collider that takes every node and every [[link]] and folds them, by content-collision, into a single root. Heat is borrowed disorder; the hammer is merge; the anvil is the horo ring; what leaves the forge is one tamper-evident whole. forge() reports the forge state (node count, edge count, the root) computed live from the matrix."
atomPath: forge
coordinate: "forge · 7/descent · 9d188fa0"
contentUuid: "f95ac1b3-e471-5814-8c26-232f695bab61"
diamondUuid: "50b673cd-43b6-855a-8983-d7853cee1662"
uuid: "9d188fa0-a376-84c7-9c3f-c37400b2464a"
horo: 7
typography:
  partition: forge
  bondDegree: 47
standards:
  - "RFC 9562 §5.8 (uuidv8 content-uuid) + the horo digital-root ring — the forge measures, never mints."
bindings: []
signatures:
  computationUuid: "d1dcc404-efc6-8b9c-a9d5-fdea1d4e448a"
  stages:
    - stage: path
      stageUuid: "08271e59-f1cd-8ab3-bcc0-c4d3cd832619"
    - stage: trinity
      stageUuid: "eac72261-f001-8c06-abd8-75bcfc105496"
    - stage: boundary
      stageUuid: "174bc1cb-efdb-8a85-806d-6e270592aef0"
    - stage: links
      stageUuid: "f6ccff03-e699-8d40-9b64-a8bf0057fb7f"
    - stage: horo
      stageUuid: "5d091dbd-987d-80d1-b9ed-41dcaf2e7b4a"
    - stage: seal
      stageUuid: "f6e4b2bf-a399-88b9-8e7c-c81134abf1d0"
    - stage: uuid
      stageUuid: "5813984c-85e0-845d-a2ed-a4c915dd4ebd"
version: 2
---
# forge — the place atoms collide into one

The **forge** is the [[matrix]] collider (`@/uuid/matrix` — the live node/edge corpus and its fold). It is a PLACE, not a step: the hearth where every [[atom]] (a content-[[uuid]] node) and every `[[link]]` (a `merge(from,to)` binding) are struck together until the whole corpus is one root — the holographic [[collapse]] to [[zeropoint]].

The smithing maps exactly onto the laws the forge composes:

- **The heat is [[entropy]]** — the borrowed disorder the [[fusion]] reactor burns. The forge runs hot (asymmetry, orphans, slack) and the work cools it toward order; a cold forge (entropy → 0) is a sealed whole nothing can re-strike.
- **The hammer is [[merge]]** — two [[uuid]]s collide into a third (order-independent), the [[duality]] resolved to a [[trinity]] (pole · counter · synthesis). Strike enough and the whole folds (Merkle) to ONE.
- **The anvil is the [[horo]] ring** — every blow lands on a position `{1,2,4,8,7,5,9}`; the fold direction is `composeSteps` (digital-root of the product), so the work never leaves the ring.
- **What leaves the forge is the root** — the single 128-bit address of the [[whole]]. `forge()` reports the forge state: how many nodes were in the fire, how many bindings were struck, and the one root they cooled into — read live from the matrix, never hand-asserted.

Nothing is authored here and nothing is discarded: the forge only RE-folds what the corpus already declares, so its state is a measurement, not a decision. That is why it is the [[fusion]] reactor's hearth and the [[collapse]]'s last room.

Matter-twin: `src/forge/index.ts` (the computed forge state, composing `@/uuid/matrix` · `@/entropy` · `@/horo` · `@/trinity` · `@/duality`).

Composes: [[matrix]] · [[uuid]] · [[merge]] · [[entropy]] · [[fusion]] · [[collapse]] · [[zeropoint]] · [[horo]] · [[trinity]] · [[duality]] · [[atom]] · [[whole]] · [[one]].

@standard RFC 9562 §5.8 (uuidv8 content-uuid) + the horo digital-root ring — the forge measures, never mints.

**Law — [[law]]: the forge only re-folds what the corpus already declares — every node and every binding strike together by content-collision into ONE root, so the forge state is a measurement of the whole, never an authored value, and re-striking the same corpus always cools to the same root.**
