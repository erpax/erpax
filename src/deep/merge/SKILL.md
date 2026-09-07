---
name: merge
description: "Use when overlaying one plain object onto another without mutation — a recursive deep merge where nested objects fuse key-by-key, arrays and scalars are replaced wholesale, and the source value wins on every collision."
atomPath: "deep/merge"
coordinate: "deep/merge · 5/round · fdb38273"
contentUuid: "809e6c31-c53a-51fc-af69-5c31b6131609"
diamondUuid: "9b5f29a5-8b04-867c-8c78-4b30a30cd285"
uuid: "fdb38273-1a49-8179-895e-33b8ee28d259"
horo: 5
typography:
  partition: deep
  bondDegree: 5244
standards:
  - structural recursion over plain objects; arrays are opaque leaves
bindings: []
signatures:
  computationUuid: "cf0036e1-24c7-85f7-94c4-c0822f1c9486"
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
      stageUuid: "11e98eca-5e90-813e-a93e-af3e7b6fa4d6"
    - stage: seal
      stageUuid: "aa05d4bd-45b1-8ebd-9038-9c485d0e1823"
    - stage: uuid
      stageUuid: "df3b892c-3996-8b7d-9e2d-2685f865e617"
version: 2
---
# deep/merge — recursive non-mutating object overlay

The primitive overlay: `deepMerge(target, source)` returns a NEW object (the target is never mutated) where nested plain objects are fused recursively and every other value — scalars and arrays alike — is replaced wholesale by the source. The category test `isObject` is deliberately narrow: it accepts anything `typeof === 'object'` that is not an array, so arrays are treated as opaque leaves (never element-merged) and the source array overwrites the target array. On a key collision the source always wins; disjoint keys from both sides survive. This is the value-level [[merge]] that the config layer leans on to layer defaults beneath overrides.

Matter-twin: `src/deep/merge/index.ts` (`deepMerge` default export ⊕ `isObject`). Composes [[merge]] · [[dry]].

**Law — [[merge]]: the deep merge is non-mutating and source-wins — nested plain objects fuse recursively while arrays and scalars are replaced wholesale, so layering defaults beneath overrides needs no hand-copied tree.**

@standard structural recursion over plain objects; arrays are opaque leaves
@audit semantics asserted against the live index.ts; never hand-asserted
