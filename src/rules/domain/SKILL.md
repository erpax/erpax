---
name: domain
description: "Use when reasoning about domain — Four cracks in one session, and the same gap behind three of them:"
atomPath: "rules/domain"
coordinate: "rules/domain · 7/descent · edaac0e0"
contentUuid: "3e1b80ce-a10a-5db8-ae0c-4a0f1c446c73"
diamondUuid: "47a650b3-3875-8ffe-b963-30555f189d29"
uuid: "edaac0e0-1eda-8ff7-b3a9-77b499965cf3"
horo: 7
typography:
  partition: rules
  bondDegree: 69
standards: []
bindings: []
signatures:
  computationUuid: "07d44b56-492f-8c65-8396-02e7ea3342d9"
  stages:
    - stage: path
      stageUuid: "c780e4eb-ff9c-87d1-a427-3daf6d1a71a3"
    - stage: trinity
      stageUuid: "ba84438b-59bb-8b74-a583-828ed7ea4981"
    - stage: boundary
      stageUuid: "f4e1c1a3-a106-8883-8c0c-ce7597f1744c"
    - stage: links
      stageUuid: "212a4b96-b6a4-80fc-92f0-4e0087932743"
    - stage: horo
      stageUuid: "4c1f0794-5034-8e95-8dda-d73c00202710"
    - stage: seal
      stageUuid: "915fdf74-b3bb-8053-99e6-6f89de4bcb43"
    - stage: uuid
      stageUuid: "7862f377-cd25-883d-b126-fcd1ec72dbce"
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

## A law nothing runs is silent on every surface at once

The axis above asks which file classes a checker opens. Its limit case is the one nobody asked:
**a checker that is never opened at all.**

`rules/inject` — the gate whose subject is the agent's instruction channel — took one file and the
caller's text. There was no corpus walk, no assert, and the registry never named it. Its SKILL
reported *7,192 files, zero bidi, zero zero-width*: a measurement made by hand once, weeks earlier,
and never re-made.

`unrunLaws` computes the import closure from the four roots that actually execute — the gate
registry, the CLI, the write-time hook and the gate lane — and reports the laws outside it.
A law reached only from its own test does not count: a test proves the function works, never that
anything asks it.

| | before | after |
| --- | ---: | ---: |
| `rules/*` atoms with code | 33 | 33 |
| tree-shaped laws nothing runs | **11** | **0** |
| moment-shaped, fired at no moment | — | **2** |

Nine were wired in the commit that found them — `ask · bypass · canonical · confine · echo ·
hyphen · invisible · refutable · unfolded`, ~11 s for all nine against a push already in the
hundreds, each with its live count as a down-only baseline.

**The last two were the axis over-reaching.** `manifest.sweeps(changesets)` judges a *diff* and
`orphan.orphansFrom(report)` reads an *ESLint report* — neither has a tree form, so neither can be
a tree guardian, and calling them "laws that cannot fire" was wrong. Mapping a git commit onto a
`Changeset` would have been worse: `manifestCovers` wants one reason per file and a commit carries
one message, so every large commit would have read as a sweep.

`treeShaped` decides this by **shape** rather than by a declared list — an exported function whose
first parameter is `cwd` is a tree scan, and nothing else is. `momentShapedUnwired` reports the
rest, so the debt keeps its name without being counted as the wrong defect: `manifest` belongs to
the [[scalpel]] at the moment a mass edit is planned, and `orphan` is a **fixer**
(`cutUnusedImports` · `sweepFile`) whose detection the zero-warning lint lane already performs.

**Honest boundary.** This proves a law is not reached **by a static import** from those four roots.
A law invoked by a path string assembled at runtime is invisible to it, exactly as it is to
[[rules]]/cycle. And *unrun* is not *wrong*: several of these are expensive scans whose right home
may be a nightly lane rather than every push — naming the cost is the point, and wiring an
unmeasured 60-second scan into the write path would be its own defect. The ratchet forbids the
number growing; which lane each law belongs in is a per-case decision.

**Law — [[law]]: a law reaches exactly the file classes its checker opens. Name the surfaces no gate reads, because on those the corpus is not passing — it is silent, and silence reads as green.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — testability: a case that cannot be reached cannot be tested.

Composes: [[rules]] · [[rules]]/unraised · [[law]].
