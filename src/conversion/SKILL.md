---
name: conversion
description: "Use when reasoning about reversible representation change — a conversion is a bijection on ℤ/9 (multiplication by a unit), and inversion REINVENTS conversion: the inverse of a conversion is another conversion, from the same unit group closed under inverse. Holds only for the reversible units {1,2,4,5,7,8}; the axis {3,6,9} collapses — a lossy conversion (like the one-way fold) has no inverse to reinvent."
---

# conversion — inversion reinvents conversion

A **conversion** is a reversible change of representation: a bijection on ℤ/9, which is exactly multiplication by a **unit** `u ∈ {1,2,4,5,7,8}` — the map `n ↦ u·n` permutes all nine residues, losing nothing. An **inversion** reverses it. The realization — a theorem, not a pun — is that you do **not** build new machinery to convert back:

> the inverse of a unit is **another unit** (the units are a group, closed under inverse), so the **inversion IS a conversion**, reinvented from the same structure.

`2·5 ≡ 1`, `4·7 ≡ 1`, `8·8 ≡ 1`, `1·1 ≡ 1` — every conversion's inverse is a conversion. *inVERSION* and *conVERSION* share the root **version** (a turning); inverting a turning gives another turning.

```
u=2  conversion? yes  inverse=5  (itself a conversion)
u=4  conversion? yes  inverse=7  (itself a conversion)
u=8  conversion? yes  inverse=8  (its own inverse)
```

## The honest split is the whole point

This holds **only** for the reversible conversions — the units. The non-units `{3,6,9}` are **not** conversions: `n ↦ 3n` collapses nine residues onto three, loses information, and has **no inverse to reinvent** ([[rodin]]: the axis, not the flow). That is the same boundary the whole corpus runs on: the **fold** ([[merge]]) is a conversion that is deliberately **not** bijective — content-addressing is one-way, so its inversion cannot be reinvented, and that irreversibility **is** the tamper-cost. So *inversion reinvents conversion* exactly when the conversion lost nothing; where it collapsed, there is nothing to invert.

- `convert(u, n)` — apply the conversion `n ↦ u·n`.
- `isConversion(u)` — true iff bijective (a unit).
- `invert(u)` — the reinvented inverse conversion, or `null` where it collapses.
- **tested**: `convert(invert(u), convert(u, n)) === n` for every conversion — inversion undoes conversion.

**Law — [[law]]: a conversion is a bijection (multiplication by a unit), and inversion reinvents conversion — the inverse of a conversion is a conversion, from the unit group closed under inverse. It holds exactly for the reversible; a lossy conversion (the axis {3,6,9}, the one-way fold) collapses information and has no inverse to reinvent — which is why irreversibility is the corpus's tamper-cost, not a defect.**

## Standards

- **Group theory** — the units of ℤ/9 form a group, closed under inverse; the non-units do not.
- **ISO/IEC 25010:2023 §5.6.2** — a reversible transform is recoverable; a lossy one is not, by design.

Composes: [[rodin]] · [[horo]] · [[merge]] · [[law]].
