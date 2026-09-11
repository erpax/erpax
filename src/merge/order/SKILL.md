---
name: order
description: "Use when reasoning about order — erpax folds content-uuids to a root in two different ways, and both are correct for what they answer:"
atomPath: "merge/order"
coordinate: "merge/order · 1/base · 3b809762"
contentUuid: "e7bf67c7-1a9d-5a31-85c2-6d8317cc900e"
diamondUuid: "1dc6d637-a26e-8ec5-a186-1e462fa89019"
uuid: "3b809762-b79a-87de-8713-f2610248e1c4"
horo: 1
typography:
  partition: merge
  bondDegree: 66
standards: []
bindings: []
signatures:
  computationUuid: "cfadc01d-cb63-8601-a411-64cecc8ec38c"
  stages:
    - stage: path
      stageUuid: "fc5613e5-63d4-8c3e-9f61-95c29fd5fa66"
    - stage: trinity
      stageUuid: "4679185a-37a9-8659-b410-c63461e40774"
    - stage: boundary
      stageUuid: "4061a16b-4c2d-80cb-bbf5-8080f53a4d70"
    - stage: links
      stageUuid: "ea60428b-240d-8842-ab5b-e1dd707f86f0"
    - stage: horo
      stageUuid: "1cbb77df-230e-8ccc-8270-bb3325da8513"
    - stage: seal
      stageUuid: "be0a3fe8-9231-8f0c-8fe9-a5dc2d1ca7d3"
    - stage: uuid
      stageUuid: "eb85a680-04c6-8089-bbd1-7da3b8751487"
version: 2
---
# merge/order — a root addresses a SET or a SEQUENCE, and the two are never interchangeable

erpax folds content-uuids to a root in two different ways, and both are correct for what they answer:

| | folds | moves under permutation? | answers |
| --- | --- | --- | --- |
| `setRoot` | sorted, then reduced | **no** | *who* is in the collection |
| `sequenceRoot` | pairwise up the tree | **yes** | *in what order* |

Using one where the other belongs is silent. A set-root over ordered rows stops being tamper-evident **under reordering** — the exact attack a chained receipt exists to catch. A sequence-root over an unordered collection makes the address an accident of traversal.

This is [[quantum]]/interval's `timelike_order_absolute` one level up. There the question was which separations have a frame-independent **order**; here it is which collections have a representation-independent **address**. Same shape, same answer: **declare the order, or the seal is sealing an accident.**

## The collision it found

```
foldToRoot   sequence   src/merge/index.ts     pairwise — any transposition moves it
foldToRoot   set        src/fusion/index.ts    sorted   — no permutation moves it
```

**One name, two semantics, different answers for the same input.** An importer reaching for `@/fusion` instead of `@/merge` gets a different root in silence, and both docstrings read as authoritative — `fusion`'s even says *"Order-independent BY CONSTRUCTION"*. That is duplication as camouflage: while one law sits in two private corners, nothing can show a third place is missing it.

`fusion` now **delegates** to `setRoot`, so there is one implementation per semantics. The shared **name** remains and `rootCollisions` gates it at 1 — the rename is its own wave, because it must not drop a name from either atom's face ([[rules]]/face).

## Parsed, and narrowed twice

The name alone over-reaches: `digitalRoot` is mod-9 arithmetic, `root` in [[quantum]]/math is an arithmetic root, and `rootSites` is this atom's own listing function. A **body** heuristic was tried next and silently dropped `partitionRoot`, `merkleRoot` and `realityRoot`, which delegate their fold — a false negative, the worse direction.

The precise distinction is the **argument**: an arithmetic root takes a `number`, and a content-address root takes a collection. Read from the signature, by the grammar.

Only **declared** kinds collide. Two undeclared roots sharing a name are not evidence of a conflict, and guessing their kinds to manufacture one would be the fabrication these gates exist to refuse.

## Measured (2026-09-04)

14 content-address roots · **6 declared, 8 undeclared** · **1 name collision.**

The 8 stay undeclared until each is read: the tag is a claim about what the root **means**, and writing `set` on a sequence root would be worse than leaving it silent.

**Honest boundary.** This proves a root **declares** its kind, never that the declaration is **true** — a mislabelled root passes, and only reading the body catches that. It finds roots by an exported name ending in `Root`, so a fold named otherwise is invisible to it. And a collision between two *undeclared* roots is undetectable here by construction.

**Law — [[law]]: a root says whether it addresses the members or the order. A set-root cannot see a reordering, a sequence-root cannot survive one, and a name that means both is a seal nobody can rely on.**

## Standards

- **RFC 9562 §5.8** — content-address: same content, same address.
- **ISO 19011:2018 §6.4** — audit evidence: a receipt must detect the tamper it claims to.

Composes: [[merge]] · [[quantum]]/interval · [[rules]]/face · [[law]].
