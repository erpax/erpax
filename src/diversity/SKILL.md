---
name: diversity
description: Use when reasoning about diversity as a schema.org vocabulary word — the single word collided from the schema.org terms that contain it, content-addressed into the corpus.
---

# diversity

A schema.org component word, collided out of schema.org compounds — fused from diversityPolicy · diversityStaffingReport ([[sti]] · [[collapse]] · [[merge]]).

Entangled with — [[policy]] · [[staffing]] · [[report]]

Attested in schema.org — diversityPolicy · diversityStaffingReport

**Law — [[law]]: diversity is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words

## The math (matter-twin)

Four pure functions over an abundance vector (counts of each class present):

- `richness(abundances)` — count of classes with abundance > 0.
- `shannon(abundances)` — Shannon entropy H = −Σ pᵢ·ln(pᵢ) over the nonzero proportions (natural log; a single class gives 0). Standard: Shannon (1948).
- `simpson(abundances)` — Simpson diversity = 1 − Σ pᵢ². Standard: Simpson (1949).
- `evenness(abundances)` — Pielou's J = H / ln(S) where S is richness; returns 1 when S ≤ 1. Standard: Pielou (1966).

The `simpson = 1 − herfindahl` duality: Σ pᵢ² is exactly the Herfindahl–Hirschman concentration index. So `simpson` and `herfindahl` (from the decentralization atom) are the same quantity seen from opposite poles — diversity and concentration are one phenomenon, split by the double-entry sign.
