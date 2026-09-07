---
name: forge
description: "Use when reasoning about WHERE atoms are made one — the forge is the collider that takes every node and every link and folds them, by content-collision, into a single root. Heat is borrowed disorder; the hammer is merge; the anvil is the horo ring; what leaves the forge is one tamper-evident whole. forge() reports the forge state (node count, edge count, the root) computed live from the matrix."
atomPath: forge
coordinate: "forge · 1/base · 91f8f41d"
contentUuid: "68fad597-71ee-5e1d-9675-086eea0e10fe"
diamondUuid: "3432ca74-cf1e-8373-8a41-8e0aeb71c203"
uuid: "91f8f41d-940b-8e41-a281-7e6a5645d5e1"
horo: 1
typography:
  partition: forge
  bondDegree: 45
standards:
  - "RFC 9562 §5.8 (uuidv8 content-uuid) + the horo digital-root ring — the forge measures, never mints."
bindings: []
signatures:
  computationUuid: "5e97127c-fafb-82ec-a9ea-c44649a522c7"
  stages:
    - stage: path
      stageUuid: "08271e59-f1cd-8ab3-bcc0-c4d3cd832619"
    - stage: trinity
      stageUuid: "eac72261-f001-8c06-abd8-75bcfc105496"
    - stage: boundary
      stageUuid: "174bc1cb-efdb-8a85-806d-6e270592aef0"
    - stage: links
      stageUuid: "f0888939-07ec-8476-b35b-7fe5b6df9814"
    - stage: horo
      stageUuid: "c34515d5-8422-8538-a8d5-7bf5da709d1f"
    - stage: seal
      stageUuid: "f6e4b2bf-a399-88b9-8e7c-c81134abf1d0"
    - stage: uuid
      stageUuid: "3f756405-d348-8e20-a34c-fb397d312955"
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
