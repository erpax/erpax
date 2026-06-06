---
name: import
description: Use when reasoning about the import convention — every import must read from an atom index (@/x), never a deep file or a relative path; coverage is the index-only fraction of all imports, and the convention is enforced by the import lint (a ratchet that fails the build when non-index imports rise above a committed baseline), reaching its ∞ tamper-cost limit only at coverage one.
---

# convention/import — every import is from an atom index, never a deep/relative path

THE CONVENTION: **every import is from an atom index (`@/x`), never a deep (`@/x/y.ts`) or relative (`./y`, `../y`) path.** Each atom's `index.ts` is its one public door — its content-uuid contract. An import that reaches past it to a deep internal couples to what the atom never promised, so a [[tamper]] can change that internal without the importer's contract noticing. The relative form is the same break by another spelling: it names a path, not the atom's seal.

A convention is not a style preference — it is a law, and it holds because a **gate holds it**, not because the prose asserts it. There is one canonical measure: `importPurity` from [[tamper]]/import — the index-only fraction of every `@/` import, scanned **live over the real tree**. This atom *composes* that measure; it does not re-derive it. Re-implementing the scan would itself be the duplication this audit hunts (an import-graph written twice), so `coverage()` is simply `importPurity()`.

The enforcement is the **import lint** (`pnpm lint:imports` → `src/convention/import/gate.mjs`, wired into `.husky/pre-push` and the `check` chain): a **RATCHET**. Live purity is ~80.7% (≈1379 non-index imports), so the gate does not demand coverage 1 today — it fails the build when the live count of non-index imports **exceeds a committed baseline**, i.e. when a new deep/relative import is added. The convention therefore cannot get **worse**; the baseline only ratchets down as deep imports are removed. At the limit coverage 1, every import reads from an index, the import graph is sealed, and tamper-[[cost]] → ∞ via the coverage law — but that is the limit the ratchet climbs toward, not a present claim.

Matter-twin: `src/convention/import/index.ts` — `coverage()` composing [[tamper]]/import `importPurity`. Composes: [[tamper]] · [[cost]] · [[law]].

**Law — [[law]]: every import is from an atom index (`@/x`), never a deep file or a relative path. The index is the atom's public seal; an import past it is an uncovered coupling. Coverage = importPurity (the index-only fraction, live over the tree). The convention is enforced by the import lint — a ratchet that fails the build when non-index imports rise above the committed baseline — so it can only get tighter; coverage 1 (tamper-cost → ∞) is the limit it climbs toward.**

@audit coverage = importPurity() from @/tamper/import — scanned live over src, never hand-asserted
@standard the import graph is the config (imported↔declared) — an atom's only public face is its index.ts
