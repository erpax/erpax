---
name: import
description: Use when reasoning about the import convention — every import must read from an atom index (@/x), never a deep file or a relative path; coverage is the index-only fraction of all imports, and the convention holds by construction only when that fraction reaches one.
---

# convention/import — every import is from an atom index, never a deep/relative path

THE CONVENTION: **every import is from an atom index (`@/x`), never a deep (`@/x/y.ts`) or relative (`./y`, `../y`) path.** Each atom's `index.ts` is its one public door — its content-uuid contract. An import that reaches past it to a deep internal couples to what the atom never promised, so a [[tamper]] can change that internal without the importer's contract noticing. The relative form is the same break by another spelling: it names a path, not the atom's seal.

A convention is not a style preference — it is a law that holds **by construction** exactly when its coverage reaches 1. There is one canonical measure of this one: `importPurity` from [[tamper]]/import — the index-only fraction of every `@/` import, scanned **live over the real tree**. This atom therefore *composes* that measure; it does not re-derive it. Re-implementing the scan would itself be the duplication this audit hunts (an import-graph written twice), so `coverage()` is simply `importPurity()`. At coverage 1 every import reads from an index, the import graph is sealed, and the convention is followed with zero entropy (and tamper-[[cost]] → ∞ via the same coverage law).

Matter-twin: `src/convention/import/index.ts` — `coverage()` composing [[tamper]]/import `importPurity`. Composes: [[tamper]] · [[cost]] · [[law]].

**Law — [[law]]: every import is from an atom index (`@/x`), never a deep file or a relative path. The index is the atom's public seal; an import past it is an uncovered coupling. Coverage = importPurity (the index-only fraction, live over the tree) and the convention holds by construction only at coverage 1.**

@audit coverage = importPurity() from @/tamper/import — scanned live over src, never hand-asserted
@standard the import graph is the config (imported↔declared) — an atom's only public face is its index.ts
