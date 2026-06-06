---
name: calculator
description: Use when computing in the digital-root substrate — a calculator that folds arithmetic to mod-9 (the rodin group), so every result is a single digit; deterministic and content-addressable.
---

# quantum/calculator — the mod-9 calculator

The quantum facet of [[calculator]]: arithmetic in the **digital-root / mod-9 substrate** ([[rodin]] = (ℤ/9ℤ)). `add` / `mul` fold their result to its digital root, so every answer is a single digit (1..9, or 0) — the [[quantum]]/math substrate applied as a calculator. Deterministic and content-addressable: the same inputs always fold to the same digit. Merges into [[calculator]].

Matter-twin: `src/quantum/calculator/index.ts` (`add` · `mul` · `fold`). Composes [[calculator]] · [[quantum]] · [[rodin]] · [[math]].

**Law — [[law]]: every result is already folded — `add`, `mul` and `fold` always land in the single-digit range 0..9, and applying `fold` to any of their outputs returns it unchanged (a fixed point), because (ℤ/9ℤ) is closed under the digital root; the substrate has no multi-digit states, so equal inputs are forced to the same digit and the calculator is content-addressable by construction.**

@standard the digital-root / mod-9 group (rodin)
