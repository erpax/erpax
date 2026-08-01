---
name: echo
description: "Use when a path restates itself — a meaning-word repeated within one path means the path says the same thing twice and cannot be immediately realised. Computes every such path (framework namespace excluded), ratchets to zero. Run: tsx src/rules/echo/index.ts"
atomPath: "rules/echo"
coordinate: "rules/echo · 1/base · 153e2c11"
contentUuid: "acd9077d-25f8-5119-9927-67f0e2865203"
diamondUuid: "8baf06fd-838d-8bca-afe9-34604db62bc3"
uuid: "153e2c11-3cff-8112-b328-d36336c6f4f7"
horo: 1
typography:
  partition: rules
  bondDegree: 12
standards:
  - "ISO/IEC 25010:2023 §5.6 — modularity/understandability: a name conveys its meaning"
bindings: []
signatures:
  computationUuid: "2b873322-80f3-8086-b122-eb715458412a"
  stages:
    - stage: path
      stageUuid: "86b2bd9b-0ba8-8b6e-b55b-a5b228235656"
    - stage: trinity
      stageUuid: "900e6196-ad6f-8abf-8fda-aed490b0cab9"
    - stage: boundary
      stageUuid: "085d78fa-4918-890b-9a51-9fbe8a7e26b8"
    - stage: links
      stageUuid: "3eaacceb-432a-85b9-97d8-2f2d2dffdbbb"
    - stage: horo
      stageUuid: "49cc30d0-0194-8c25-9df0-a18978f60976"
    - stage: seal
      stageUuid: "2f06f82d-ead7-8b1d-b24e-4e2f8d304621"
    - stage: uuid
      stageUuid: "6025805f-71b1-8db0-a287-7a685ccdfea2"
version: 2
---
# echo — a path that restates itself has not folded its meaning

The law: **every word matters in a path, and the path IS the message** ([[path]]). If a meaning-word repeats within one path, the path is saying the same thing twice — the meaning is not folded, and it **cannot be immediately realised**, because the reader meets the same word and learns nothing new. That is the *unfolded linear logic* the corpus already names (`ecommerce/configure/ecommerce/plugin`), now measured.

## The standout is real

```
compliance/frameworks/compliance/requirements/compliance/gaps    ↺ compliance×3
```

**`compliance` three times.** The concepts each segment ADDS are `frameworks · requirements · gaps`; `compliance` is the shared root, and it should be said **once** — as the atom's home — never re-stamped at every level. The path should fold to what is new at each step, and here two of the three words are pure echo.

225 paths restate a word in all; the triple is the one that cannot be read at a glance.

## What it must NOT flag — the framework's namespace

Next.js reserves `page.tsx`, `route.ts`, `layout.tsx` under `app/`, so `app/posts/page/page.tsx` repeats `page` by the **framework's** rule, not the corpus's. The `app/` tree is excluded — [[run]]/load learned the hard way that `src/pages` collided with Next's reserved directory, and *the framework's namespace is not in this corpus's model*. An echo gate that flags a framework convention would demand a refactoring the framework forbids.

**Honest boundary.** This proves a word **repeats**, never that the repeat is **wrong** — a legitimately-nested concept can reuse a word where it genuinely adds a level of meaning (rare, and a per-case judgement). It names **candidates for refactoring**, and the fix is to fold the path to what each segment adds — which repoints every import and reference in the same diff ([[rules]]/reference), so it is a move made deliberately, never a blind rename.

**Law — [[law]]: the path is the message, and a word said twice is a message not folded. If the meaning cannot be immediately realised because the path restates itself, refactor it to what each segment adds.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — understandability: a name conveys its meaning.

Composes: [[path]] · [[rules]] · [[law]].
