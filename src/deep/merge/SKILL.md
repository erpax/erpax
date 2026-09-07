---
name: merge
description: "Use when overlaying one plain object onto another without mutation — a recursive deep merge where nested objects fuse key-by-key, arrays and scalars are replaced wholesale, and the source value wins on every collision."
atomPath: "deep/merge"
coordinate: "deep/merge · 8/crest · d4562c22"
contentUuid: "101f7bdb-bbe0-5806-89c7-7506ce631a14"
diamondUuid: "6f1a3848-d9da-8b13-87e1-4be91223cced"
uuid: "d4562c22-de63-8269-8cff-b96706a86e6c"
horo: 8
typography:
  partition: deep
  bondDegree: 5332
standards:
  - structural recursion over plain objects; arrays are opaque leaves
bindings: []
signatures:
  computationUuid: "233eb466-9b42-857f-9b21-0f9575b2fc46"
  stages:
    - stage: path
      stageUuid: "f189872f-a5ec-88f3-8236-f2cc945ea37a"
    - stage: trinity
      stageUuid: "a033621c-a8c7-8047-b704-fa64c3770c4c"
    - stage: boundary
      stageUuid: "d5a2812a-fb67-88d5-b76c-fdf7c1f7f2ad"
    - stage: links
      stageUuid: "6e5b2792-650c-8276-81c1-5d01e4fa0b8c"
    - stage: horo
      stageUuid: "91febcf9-e245-8c75-b585-7ba1be74d867"
    - stage: seal
      stageUuid: "aa05d4bd-45b1-8ebd-9038-9c485d0e1823"
    - stage: uuid
      stageUuid: "fdd35093-a3b1-8335-bde3-ce2b7e6aa178"
version: 2
---
# deep/merge — recursive non-mutating object overlay

The primitive overlay: `deepMerge(target, source)` returns a NEW object (the target is never mutated) where nested plain objects are fused recursively and every other value — scalars and arrays alike — is replaced wholesale by the source. The category test `isObject` is deliberately narrow: it accepts anything `typeof === 'object'` that is not an array, so arrays are treated as opaque leaves (never element-merged) and the source array overwrites the target array. On a key collision the source always wins; disjoint keys from both sides survive. This is the value-level [[merge]] that the config layer leans on to layer defaults beneath overrides.

Matter-twin: `src/deep/merge/index.ts` (`deepMerge` default export ⊕ `isObject`). Composes [[merge]] · [[dry]].

**Law — [[merge]]: the deep merge is non-mutating and source-wins — nested plain objects fuse recursively while arrays and scalars are replaced wholesale, so layering defaults beneath overrides needs no hand-copied tree.**

@standard structural recursion over plain objects; arrays are opaque leaves
@audit semantics asserted against the live index.ts; never hand-asserted
