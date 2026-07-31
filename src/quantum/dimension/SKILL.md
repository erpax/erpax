---
name: dimension
description: "Use when projecting the corpus across its quantum dimensions — the dimension identities, plugin surface and coverage results the realtime child streams from. Promoted from a loose sibling; the hyphenated realtime half nests as a child atom rather than a second root file. Run: tsx src/quantum/dimension/index.ts"
atomPath: "quantum/dimension"
---

# dimension — the projection axes, held as one atom

This was `dimensions.ts`, a loose `.ts` beside the quantum barrel, with a hyphenated twin (`dimension-realtime.ts`) beside it. Two files, two violations: matter at a non-atom path, and a hyphen standing in for the slash that expresses the real relationship.

The hyphen was the tell. `dimension-realtime` is not a sibling concept — it is **the realtime view of this atom**, which is what a path already says when you let it: `dimension/realtime`. A hyphen is a slash that lost its nerve ([[rules]]/invisible: matter must be addressable, and the path is the message).

## What the move had to get right

Nesting changes what a relative specifier means, and the compiler will not tell you. The realtime half imported `./dimensions` — correct as a flat sibling, and after nesting it resolves one level off. The same class of defect had just been paid for in [[quantum]]/ftl/admin, where `./index` came to mean the file itself: a self-import that typechecked cleanly and left every binding `undefined` at runtime.

So the specifiers were repointed with the move, in the same diff, and the whole tree typechecks — which is the only evidence that counts here, since neither failure surfaces as a type error.

**Honest boundary.** This proves the projection surface is **addressable and consistent** — one atom, one path, imports resolving. It says nothing about whether the dimensions themselves are the right axes; that is a modelling question no move settles.

**Law — [[law]]: a hyphen in an atom name is a nesting the path has not been allowed to express. Fold it into the parent it belongs to, and carry every relative specifier in the same diff — a move that satisfies the compiler can still change what a specifier means.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — modularity: one concept, one addressable home.

Composes: [[quantum]] · [[quantum]]/dimension/realtime · [[rules]]/invisible · [[law]].
