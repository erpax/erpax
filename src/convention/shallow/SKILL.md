---
name: shallow
description: Use when reasoning about import discipline — an import must reach an atom's index (the one public door), not a deep internal file past the seal; this names the convention and measures the corpus's live shallowness.
---

# convention/shallow — import the index, not a deep file

Each atom's `index.ts` is its **public content-uuid contract** — the one door. An import is **shallow** when it reaches that index (`@/x`, or a sub-atom `@/x/y` that is itself a dir carrying an index) and **deep** when it reaches past the seal to an internal file (`@/x/y.ts`). The convention is one line: **import the index, not a deep file.**

A deep import is not a style nit; it is an **uncovered coupling** — it binds to an internal the atom never promised, so a tamper can change that internal without the public face (or any importer's contract) noticing. Shallow imports keep the import graph **sealed**; that is why shallowness folds into the same coverage law tamper-cost runs (coverage → 1 ⇒ ∞).

This is the **convention** (named principle) face of the matter-twin [[tamper]]/import, which already computes the price. So this atom does **not** re-scan the tree — it **composes** `importPurity` (DRY: one canonical reader of the import graph). `coverage()` is that index-only fraction — the live shallowness of the whole corpus, in [0,1] by construction, with no default: the value **is** the law, measured.

Matter-twin: `src/convention/shallow/index.ts` (`coverage`) — composes [[tamper]]/import (`importPurity`) · grounded in [[law]].

**Law — [[law]]: import the index, not a deep file. The index is the atom's public seal; an import past it to a deep internal is an uncovered coupling that lowers tamper-[[cost]]. Import only shallow, and the import graph seals to ∞ — every deep import is a measured gap.**

@audit coverage = importPurity() read live from @/tamper/import; never re-implemented, never defaulted
@standard the import graph is the config — the public face is index.ts only (shallow, never deep)
