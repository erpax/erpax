# css/variables — the breakpoints, at an address

Six numbers, and they lived in `src/cssVariables.js` — a file at the ROOT of `src`, which belongs to
no atom. [[rules]]/invisible names that class: no lawful path, no content-uuid, no node in the
[[matrix]], so nothing deduplicates it.

## What a root-level file costs, measured

The [[mesh]] folds every file to its atom, and a file at `src/` root folds to the pseudo-atom `.` —
the same `.` that holds `payload.config.ts`, which lawfully namespace-imports all 231 collections
([[rules]]/confine: the config IS the confinement). So one component climbing `../../../` to reach
six numbers was welded to the entire collection registry.

`media/image/media` was that one importer. Removing the edge `media/image/media → .` shrinks the
runtime strongly-connected component by **23 atoms** — the largest single-edge cut available in it,
for a file with one caller and no logic.

That is the shape worth remembering: the cycle was not held together by a hard architectural knot.
It was held by matter with no address.

**Honest boundary.** This is the breakpoint table and nothing else. It does not read the Tailwind
config, so "keep in sync" is a human obligation the comment states and no gate enforces — the
numbers here are a copy, and a copy is exactly what [[rules]]/copy would flag if the Tailwind side
were TypeScript this corpus parsed.

**Law — [[law]]: matter at the root of `src` belongs to no atom, so every importer of it is coupled
to everything else that lives there. Give it an address.**

## Standards

- **W3C CSS Media Queries Level 4** — width breakpoints.

Composes: [[css]] · [[rules]]/invisible · [[law]].
