---
name: merge
description: "Use when overlaying one plain object onto another without mutation — a recursive deep merge where nested objects fuse key-by-key, arrays and scalars are replaced wholesale, and the source value wins on every collision."
atomPath: "deep/merge"
coordinate: "deep/merge · 4/weave · 9d93040f"
contentUuid: "3460ce22-c405-5695-bdb3-775cb4415ea6"
diamondUuid: "7c51ebb8-fe72-8952-9e88-42cb04448c77"
uuid: "9d93040f-7403-8d16-bbb5-c60bafb8123f"
horo: 4
typography:
  partition: deep
  bondDegree: 5326
standards:
  - structural recursion over plain objects; arrays are opaque leaves
bindings: []
signatures:
  computationUuid: "8a2363ba-01fc-8d9c-b191-1f0e0dadd81f"
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
      stageUuid: "5dce8474-f701-8e17-876e-865e265a27d3"
    - stage: seal
      stageUuid: "aa05d4bd-45b1-8ebd-9038-9c485d0e1823"
    - stage: uuid
      stageUuid: "0bbb4d41-6860-8080-aeba-6a4ab81a5096"
version: 2
---
# deep/merge — recursive non-mutating object overlay

The primitive overlay: `deepMerge(target, source)` returns a NEW object (the target is never mutated) where nested plain objects are fused recursively and every other value — scalars and arrays alike — is replaced wholesale by the source. The category test `isObject` is deliberately narrow: it accepts anything `typeof === 'object'` that is not an array, so arrays are treated as opaque leaves (never element-merged) and the source array overwrites the target array. On a key collision the source always wins; disjoint keys from both sides survive. This is the value-level [[merge]] that the config layer leans on to layer defaults beneath overrides.

Matter-twin: `src/deep/merge/index.ts` (`deepMerge` default export ⊕ `isObject`). Composes [[merge]] · [[dry]].

**Law — [[merge]]: the deep merge is non-mutating and source-wins — nested plain objects fuse recursively while arrays and scalars are replaced wholesale, so layering defaults beneath overrides needs no hand-copied tree.**

@standard structural recursion over plain objects; arrays are opaque leaves
@audit semantics asserted against the live index.ts; never hand-asserted
