---
name: engineering
description: "Use when an engineering standard (ISO/IEC 25010 quality model) must move from cited to enforced — maps each quality concern to the erpax gate that enforces it, and names the cited-but-ungated concerns as the solutions to reverse-engineer next."
atomPath: engineering
---

# engineering — reverse-engineer the standards into the gates that enforce them

The corpus **cites** ISO/IEC 25010:2023 (the product-quality model) **207×** — but a citation is prose, and prose is read and maybe obeyed ([[rules]]: a law is obeyed only when a gate blocks its violation). This atom is the engineering-quality twin of [[access]]/standard (which did it for the legal surface): it maps each 25010 quality **concern** to the erpax gate that already enforces it, computes what is enforced vs merely cited, and names the unenforced concerns as the **solutions to reverse-engineer**.

## The mapping — a standard, reverse-engineered into a gate

| 25010 concern | clause | enforcing gate |
| --- | --- | --- |
| modularity | §5.6.2 | [[rules]]/cycle · [[rules]]/confine |
| testability | §5.5 | [[rules]]/refutable |
| analysability | §5.6 | [[rules]]/reference |
| understandability | §5.6 | [[rules]]/echo |
| reusability | §5.6 | [[rules]]/unfolded |
| naming | §5.6 | [[law]]/folder |
| functional-completeness | §5.1 | [[law]]/folder (the trinity) |
| time-behaviour | §5.2 | [[timeout]] |
| interaction-capability | §5.4 | [[rules]]/ask — a required field with nothing computed is poor user-error-protection |
| **compatibility** | §5.3 | **— no gate: reverse-engineer next** |

"Improve the standard" = move a concern from cited to gate-enforced. "Reverse-engineer into a new solution" = a concern cited with no gate is a gate waiting to be written — `engineeringConformance` computes the citation coverage and `assertEngineeringEnforced` ratchets the ungated count DOWN.

## Computed vs declared — the honest split

The **citations** are COMPUTED (every `25010 §5.x` in the corpus → its atom, via a source scan). The concern→gate **map is DECLARED**, keyed by concern NAME rather than §-number — because the corpus's own §-citations are inconsistent (the same clause is cited for different concerns), so the concern is the only honest key. The map is arguable in the open (the [[rules]]/audience split), never inferred.

**Honest boundary.** This proves a concern is **gate-enforced somewhere**, not that every atom citing it is individually gated — a per-site enforcement check is finer than this atom claims. And the map covers the quality concerns erpax has gates for; a 25010 characteristic outside the map (safety, security-in-depth) is a gap in the map, not proof of conformance.

**Law — [[law]]: an engineering standard is enforced or it is decoration. Every cited ISO/IEC 25010 quality concern maps to a gate that blocks its violation, or it is a solution still to reverse-engineer — the ungated count ratchets to zero.**

## Standards

- **ISO/IEC 25010:2023 §5** — product quality model.
- **ISO-19011:2018 §6.4** — a cited standard is evidence only if it leads to its enforcement.

Composes: [[rules]] · [[access]] · [[law]].
