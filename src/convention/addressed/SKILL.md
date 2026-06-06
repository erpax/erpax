---
name: addressed
description: Use when an atom needs an identity — the convention is that identity is content-addressed as a v8 uuid derived from what the atom IS, never an arbitrary external name; this atom measures the corpus's live content-address coverage = addressed / total over the real tree.
---

# convention/addressed — identity is content-addressed (a uuid)

Every atom's identity is a **content-uuid** — a v8 uuid (RFC 9562 §5.8) derived from what the atom *is*, not an external name handed to it. An atom is **addressed** when the matrix has minted it a valid content-uuid; an atom that exists in the tree but carries no such uuid has no content-address yet. This atom states one rule and computes its own compliance, and it does not re-implement the corpus walk or the uuid coil — it **composes** the canonical ones:

- **total** = `walkSkills('src').length` from [[aura]] — every atom that carries a `SKILL.md` (the one canonical corpus walk, shared by every gate; never a parallel walk).
- **addressed** = those whose leaf word resolves through `nodeOf` from [[matrix]] to a node whose `uuid` matches the v8 content-uuid form (version nibble 8, variant 10x). It composes `nodeOf`; it never re-derives the uuid.
- **coverage** = `addressed / total` — in [0,1] by construction (0 ≤ addressed ≤ total, total > 0). It reaches **1** exactly when every atom in the tree carries a content-uuid.

The matrix (`src/uuid/matrix/matrix.generated.ts`) is a generated **cache that DRIFTS**; the live walk is the source of truth. So coverage drops below 1 precisely when an atom exists in the tree but the matrix has not yet minted its content-uuid — a freshly-added atom is unaddressed until `pnpm matrix:generate`. This warns wide (the gap is visible) without failing narrow, and the gap closes on regeneration.

Pure math, no default: the corpus is non-empty by architecture (thousands of atoms carry a `SKILL.md`), and `addressed` is a subset count of the very same walk, so the ratio never needs a clamp or a fallback — and `coverage()` filters one walk, so numerator and denominator can never disagree. coverage → 1 ⟺ a fully content-addressed corpus ⟺ infinitely-expanding tamper-[[cost]].

A content-address is the inverse of an arbitrary name: the same content always yields the same uuid, so identity cannot be forged without changing the content — which is why a route IS a uuid's name ([[coordinate]]) and the whole corpus folds to one 128-bit root ([[matrix]]).

Entangled with — [[matrix]] · [[aura]] · [[coordinate]] · [[uuid]] · [[law]]

Matter-twin: `src/convention/addressed/index.ts` (`coverage` · `isAddressed`) — composes [[aura]] (`walkSkills` · `leafOf`) and [[matrix]] (`nodeOf`); the prior art is [[coordinate]] (path-as-address — a route is a uuid's name).

@standard RFC 9562 §5.8 (uuidv8 content-uuid) + §4.1 variant — identity derived from content

**Law — [[law]]: identity is content-addressed. An atom's identity is a v8 uuid derived from what it IS, never an arbitrary external name, and an atom the matrix has not minted is a measured gap. Address every atom by its content and the corpus seals identity to ∞ — coverage = addressed / total = 1.**
