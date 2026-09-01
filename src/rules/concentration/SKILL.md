---
name: concentration
description: "rules/concentration — detect logic concentrated in hub index.ts vs child atoms."
atomPath: rules/concentration
---
# rules/concentration

rules/concentration — detect logic concentrated in hub index.ts vs child atoms.

Extracted from `rules/concentration.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[rules]].
