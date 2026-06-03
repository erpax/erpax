---
name: sectors
description: Use when taxonomising any part of society — SNA institutional sectors, ISIC economic activities, COFOG government functions, ICNPO civil society, SDG outcomes. The one societal coordinate system every party, connection, transaction and tenant references.
---

# sectors

The one societal coordinate system: every part of society — a ministry, hospital, school, farm, court, union, church, NGO, household, firm — is NOT a new collection but a coordinate on ONE self-referential taxonomy. This is the [[merge]] law run on the naming axis — a per-part prefix collapses into a `sector` code, not a table — so the whole society sits on one graph. A party, a connection, a [[transaction]], a tenant all reference their `sector`; that reference is the [[fields]] relationship that makes the graph whole ([[whole]]). The taxonomy is complete-in-itself while empty: all parts are defined through the [[identity]] element (the blank coordinate) even when no row exists yet ([[holographic]] — the whole recoverable from the standards stack alone).

The parts are NAMED and ENCODED, never invented, by the canonical UN/EU classification stack (the [[standard]] answer-path): SNA-2008 institutional sectors (S.11–S.15), ISIC Rev.4 / NACE Rev.2 economic activity, COFOG government functions, ICNPO civil society, COICOP household consumption, SDG outcomes, ISO-3166 geography. Apply the standard and the coordinate follows. The hierarchy is self-referential (`parent` → `sectors`) — the same [[fractal]] form at every depth (division → group → class). Status transitions (active → merged → retired) ride the [[event]] audit chain via [[hooks]] and the collection is gated by [[access]] for tenant isolation; it lives as a Payload collection ([[collections]]).

Sequence position **0** — the root coordinate. Sectors is the societal [[identity]] element on the `0·3·6·9·1·2·4·8·7·5` ring: the 0 every party departs from and every flow returns to ([[duality]]: code↔society). Everything else in erpax is a use of this frame against the [[accounting]] ledger; sectors is the frame itself.

## Standards

The answer-path principle: applying this skill *implements* these standards — placing a part of society on this taxonomy IS classifying it under the canonical UN/EU stack. Each `@standard` banner on `index.ts` must be true to the field it sits on, not decoration.

- **UN SNA-2008** — System of National Accounts, institutional sectors S.11 non-financial / S.12 financial corporations · S.13 general government · S.14 households · S.15 NPISH. The top partition of society (`institutionalSector`).
- **UN ISIC Rev.4** + **EU NACE Rev.2** — international / European standard industrial classification of economic activity (`isicCode`, `naceCode`); NACE is interoperable with ISIC at the four-digit level.
- **UN COFOG** — Classification of the Functions of Government, 10 divisions, for the S.13 public part (`cofogDivision`).
- **UN/Johns-Hopkins ICNPO** — International Classification of Non-Profit Organizations, civil-society / S.15 NPISH (`icnpoGroup`).
- **UN COICOP** — household consumption functions (the S.14 expenditure view).
- **UN 2030 Agenda — SDGs** — the 17 Sustainable Development Goals; society's outcome axis (`sdgGoal`, 1–17).
- **ISO 3166-1:2020** — country codes; geographic scope (`countryCode`, blank = supranational/global, the [[identity]] blank).
- **ISO 19011:2018** — audit-trail; the transparent societal ledger over status transitions.
- **ISO 27001 A.5.23** — cloud-service tenant isolation; sector data is gated per tenant ([[access]]).

Composes: [[defence]] · [[health]].
