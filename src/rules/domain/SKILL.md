---
name: domain
description: "Use when reasoning about domain — Four cracks in one session, and the same gap behind three of them:"
atomPath: "rules/domain"
coordinate: "rules/domain · 7/descent · d18ffd59"
contentUuid: "8e2170d7-6f7d-5a34-8720-0da991d91efe"
diamondUuid: "8563a10e-25f3-8981-9f7a-229d9e782343"
uuid: "d18ffd59-20bd-8d82-b44d-d2f5a14d0781"
horo: 7
typography:
  partition: rules
  bondDegree: 69
standards: []
bindings: []
signatures:
  computationUuid: "b853bb40-f647-899f-8b63-e4af38add6b6"
  stages:
    - stage: path
      stageUuid: "c780e4eb-ff9c-87d1-a427-3daf6d1a71a3"
    - stage: trinity
      stageUuid: "ba84438b-59bb-8b74-a583-828ed7ea4981"
    - stage: boundary
      stageUuid: "ab970c9f-915a-8ce3-9509-6ac4e218e912"
    - stage: links
      stageUuid: "12b2d5a2-4ddb-8db3-a5c2-a886711e9dd9"
    - stage: horo
      stageUuid: "89b602ba-24d2-8e28-86f9-e48c188a6e8d"
    - stage: seal
      stageUuid: "915fdf74-b3bb-8053-99e6-6f89de4bcb43"
    - stage: uuid
      stageUuid: "d5a9b298-c2af-8b9f-9172-fcb9b90b5908"
version: 2
---
# rules/domain — a law is enforced on the surfaces its checker reads, and nowhere else

Four cracks in one session, and the same gap behind three of them:

| the crack | the gap behind it |
| --- | --- |
| `theorem honest_chain_reproduces : chain rows 0 = chain rows 0` in `.lean` | [[rules]]/mirror gates that exact shape — **reading `.ts`** |
| a figure captioned `Mirror.involution_partitions`, a theorem that does not exist | [[rules]]/prose gates fabricated citations — **reading `SKILL.md`** |
| five gates recording every React atom as having no code | they read `.ts`, the corpus also has **256 `.tsx`** |
| the confirm hook failing OPEN for weeks | it is `.mjs`, and one gate reads `.mjs` |

None of these was a wrong answer. Each was an **unasked question** — the law was enforced on one surface and violated on another, and the violation reported green because nothing was looking. That is [[rules]]/unraised's defect (default-ALLOW by omission) lifted from a union member to a **file class**.

## What it measures, and what it deliberately does not

`corpusSurfaces` counts every extension under `src`. `gateSources` is the registry's own imports **union** every `src/rules/*` child. `unreadSurfaces` reports the classes with files and **no reader at all**.

It does **not** judge a gate for having a narrow domain — a narrow domain is usually right. A folder-name law reads no files; an import-cycle law rightly reads only what can carry an import. Flagging those would bury the signal under gates that are working correctly. What is reported is the sharper thing: **a class of file every law is silent about.**

## The dual — a surface that is opaque to itself

`OPAQUE` declares which extensions a text gate may skip. `opaqueSources` finds the files that
skip themselves: extension says `.ts`, bytes say binary.

One raw NUL and `grep`, `diff` and every shell tool report **nothing** for the entire file —
output identical to a file with nothing in it. Seven source files carried one, including this
corpus's own [[scalpel]], the engine every mass edit runs through:

```
src/anti/corruption/cross-entity.ts · src/instrument/index.ts · src/quantum/fold/index.ts
src/regeneration/index.ts · src/scalpel/index.ts · src/voting/index.ts · src/wave/gap/index.ts
```

Each used the byte honestly, as a key separator — `\`${a}\u0000${b}\`` — and the value is not the
defect. Written as the **escape** it is the same string to the compiler and the file stays
readable; written raw it takes the whole file out of every text search, silently.

This is the sharpest form of the law above: not *"no gate reads this class"* but *"no tool can
read this file, and the failure is a clean-looking zero"*. Zero is a **theorem** here — a
text-extension file that is not text has no legitimate form.

## The instrument committed its own defect first

The first version resolved only the registry's direct imports and reported **`.md` as blind** — while [[rules]]/prose and [[rules]]/reference plainly read it. The audit's own domain was too narrow, which is precisely what it exists to find. It was not shipped on a number known to be wrong, and the case is pinned in the test.

## Measured (2026-09-04)

40 enforcing modules · **5 blind surfaces, 23 files**: `.scss` 15 · `.mdc` 3 · `.css` 2 · `.js` 2 · `.jsonld` 1.

The asymmetry is the more useful number: **`.ts` has 8 readers, `.tsx` has 4.** That 2:1 gap is the mechanical reason five gates were blind to every React atom in the corpus.

**Honest boundary.** This proves a surface has **no reader**, never that a surface with one is **well** covered — a gate that opens `.tsx` files and checks something irrelevant counts here. Readers are detected by an extension literal in the gate's own source, so a gate resolving files through a shared helper is invisible to it and is under-counted. `OPAQUE` and `DERIVED` are DECLARED in the open, so both exemptions can be argued with. Zero is the horizon, not a theorem: `.jsonld` may legitimately need no law.

**Law — [[law]]: a law reaches exactly the file classes its checker opens. Name the surfaces no gate reads, because on those the corpus is not passing — it is silent, and silence reads as green.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — testability: a case that cannot be reached cannot be tested.

Composes: [[rules]] · [[rules]]/unraised · [[law]].
