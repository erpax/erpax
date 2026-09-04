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
