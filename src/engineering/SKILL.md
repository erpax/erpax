---
name: engineering
description: "Use when an engineering standard (ISO/IEC 25010 quality model) must move from cited to enforced — maps each quality concern to the erpax gate that enforces it, and names the cited-but-ungated concerns as the solutions to reverse-engineer next."
atomPath: engineering
coordinate: "engineering · 1/base · dbbc781e"
contentUuid: "caa76ea3-f53a-526f-a9b3-7b5a9359a31b"
diamondUuid: "ba6f0e82-1108-8b51-a0ca-388c2c3e230f"
uuid: "dbbc781e-9ab9-8abe-8cb8-eb890f8ce1dc"
horo: 1
typography:
  partition: engineering
  bondDegree: 37
standards:
  - "ISO/IEC 25010:2023 §5 — product quality model (functional suitability … maintainability)"
bindings: []
signatures:
  computationUuid: "75dcfd5d-bbdd-8e72-ba49-9cb397f7a49f"
  stages:
    - stage: path
      stageUuid: "95807699-b9b4-8136-b8f6-132233e1c55d"
    - stage: trinity
      stageUuid: "37343966-6f4d-8174-968b-d7a1ff9f7bca"
    - stage: boundary
      stageUuid: "05478494-1933-8d22-90cf-e75b9d06585f"
    - stage: links
      stageUuid: "e442d965-f220-886c-a479-1b634244ea44"
    - stage: horo
      stageUuid: "1d98cdd4-9d7e-8043-86ce-a812d4e5756e"
    - stage: seal
      stageUuid: "6d10faea-e4f7-8985-a9db-cf1037b733bb"
    - stage: uuid
      stageUuid: "af1b65d2-c1a8-877c-a2b3-df34f4111370"
version: 2
---
# engineering — reverse-engineer the standards into the gates that enforce them

The corpus **cites** ISO/IEC 25010:2023 (the product-quality model) **207×** — but a citation is prose, and prose is read and maybe obeyed ([[rules]]: a law is obeyed only when a gate blocks its violation). This atom is the engineering-quality twin of [[access]]/standard (which did it for the legal surface): it maps each 25010 quality **concern** to the erpax gate that already enforces it, computes what is enforced vs merely cited, and names the unenforced concerns as the **solutions to reverse-engineer**.

## The trinities — the engineer types, three told as three

The nine ISO/IEC 25010 characteristics are organised in **three trinities** on the corpus's own **form · code · proof** axes — the same law that makes every atom one thing told three ways. A trinity is **sealed** when all three of its characteristics are gate-enforced; an unsealed trinity names the gate still to design (`sealEngineeringTrinities`).

| trinity | characteristic | clause | enforcing gate |
| --- | --- | --- | --- |
| **form** — what the system presents | functional-suitability | §5.1 | [[law]]/folder (the trinity) |
| | interaction-capability | §5.4 | [[rules]]/ask |
| | compatibility | §5.3 | [[rules]]/compatibility — an atom colliding with a framework namespace |
| **code** — how the system runs | performance-efficiency | §5.2 | [[timeout]] |
| | reliability | §5.5 | [[rules]]/refutable |
| | security | §5.6 | [[access]]/standard |
| **proof** — how the system endures | maintainability | §5.7 | [[rules]]/cycle (· echo · unfolded · reference · confine) |
| | flexibility | §5.8 | [[rules]]/canonical |
| | safety | §5.9 | [[accounting]] (the double-entry balance invariant) |

**all three trinities are sealed** — every one of the nine characteristics carries a gate, so `engineeringDesignBacklog` is EMPTY: the engineering surface of the quantum ERP is complete. The last to seal was FORM, via [[rules]]/compatibility (§5.3). "Improve the standard" = move a characteristic from cited to gate-enforced; `assertEngineeringEnforced` holds the ungated count at 0 — a THEOREM (full enforcement), so any ungated concern added later is a regression that fails closed.

## Computed vs declared — the honest split

The **citations** are COMPUTED (every `25010 §5.x` in the corpus → its atom, via a source scan). The concern→gate **map is DECLARED**, keyed by concern NAME rather than §-number — because the corpus's own §-citations are inconsistent (the same clause is cited for different concerns), so the concern is the only honest key. The map is arguable in the open (the [[rules]]/audience split), never inferred.

**Honest boundary.** This proves a characteristic is **gate-enforced somewhere**, not that every atom citing it is individually gated — a per-site enforcement check is finer than this atom claims. And a mapped gate enforces a **proxy** of its characteristic (rules/ask covers user-error-protection, not all of interaction-capability), so a sealed trinity means its concerns are each gated, never that the ISO characteristic is exhaustively met.

**Law — [[law]]: an engineering standard is enforced or it is decoration. Every cited ISO/IEC 25010 quality concern maps to a gate that blocks its violation, or it is a solution still to reverse-engineer — the ungated count ratchets to zero.**

## Standards

- **ISO/IEC 25010:2023 §5** — product quality model.
- **ISO-19011:2018 §6.4** — a cited standard is evidence only if it leads to its enforcement.

Composes: [[rules]] · [[access]] · [[law]].
