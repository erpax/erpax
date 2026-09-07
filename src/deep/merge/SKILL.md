---
name: merge
description: "Use when overlaying one plain object onto another without mutation — a recursive deep merge where nested objects fuse key-by-key, arrays and scalars are replaced wholesale, and the source value wins on every collision."
atomPath: "deep/merge"
coordinate: "deep/merge · 2/share · 6f9e113f"
contentUuid: "64438343-6c8d-5a30-a6ef-2c9cbbc3ee5e"
diamondUuid: "a025fc91-2ba6-87b3-ae5d-a4bae1f52f37"
uuid: "6f9e113f-d117-8bc4-9985-3b87317699eb"
horo: 2
typography:
  partition: deep
  bondDegree: 5332
standards:
  - structural recursion over plain objects; arrays are opaque leaves
bindings: []
signatures:
  computationUuid: "a2917736-02d3-8f47-bb00-c490d4cf78e3"
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
      stageUuid: "b7d18325-a517-86c8-8c61-d7a623440e8c"
    - stage: seal
      stageUuid: "aa05d4bd-45b1-8ebd-9038-9c485d0e1823"
    - stage: uuid
      stageUuid: "c70a6cc5-4390-8329-b469-e02ea4d536ee"
version: 2
---
# deep/merge — recursive non-mutating object overlay

The primitive overlay: `deepMerge(target, source)` returns a NEW object (the target is never mutated) where nested plain objects are fused recursively and every other value — scalars and arrays alike — is replaced wholesale by the source. The category test `isObject` is deliberately narrow: it accepts anything `typeof === 'object'` that is not an array, so arrays are treated as opaque leaves (never element-merged) and the source array overwrites the target array. On a key collision the source always wins; disjoint keys from both sides survive. This is the value-level [[merge]] that the config layer leans on to layer defaults beneath overrides.

Matter-twin: `src/deep/merge/index.ts` (`deepMerge` default export ⊕ `isObject`). Composes [[merge]] · [[dry]].

**Law — [[merge]]: the deep merge is non-mutating and source-wins — nested plain objects fuse recursively while arrays and scalars are replaced wholesale, so layering defaults beneath overrides needs no hand-copied tree.**

@standard structural recursion over plain objects; arrays are opaque leaves
@audit semantics asserted against the live index.ts; never hand-asserted
