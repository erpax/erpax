---
name: verified
description: "Use when you need the real, sense-checked multilingual renderings the translation intelligence is trained on — a snapshot of 27 unambiguous concept atoms (anatomy, nature, matter) harvested live from Wikidata (CC0) and admitted only because a candidate's description sense-matched the atom's meaning. Every rendering cites a Qid; nothing is fabricated; the wrong senses and the uncertain ones are left as honest gaps."
---

# verified — the sense-verified Wikidata renderings snapshot

The **training set** the translation intelligence learns from — real CC0 labels, sense-checked, never fabricated. Produced by the sense gate in [[source]] (`harvestVerified`) over 27 unambiguous single-word concept atoms and frozen here as a snapshot (like a sealed CC0 dump).

- **`VERIFIED_RENDERINGS`** — a real `TranslationTable`: `en` is the atom word (the source); every other locale is Wikidata's community label for the **sense-matched** Qid. 762 non-en renderings across 27 concepts, min 28 / max 30 locales each.
- **`VERIFIED_PROVENANCE`** — the audit trail: for each concept the CC0 Wikidata `qid`, the English `description` it matched, and the `score` it cleared.

**Coverage moved, honestly.** `trainingCoverage(VERIFIED_RENDERINGS, supportedLocales)`: **0.033 → 0.974** — from the en-only seed to 762 verified renderings. Seeded into the `translations` collection by [[translations]]/seed.

**The gate did its job.** It admitted the right senses (`heart→Q1072 organ`, `water→Q283 compound`, `star→Q523 astronomical object`, `blood→Q7873 body fluid` — NOT the family-name the top-1 search returns) and left honest **seed-gaps** where it could not be sure: `brain` and `chest` (no sense-clearing candidate in the search) and `eye` (Q7364, 0.091) · `sugar` (Q11002, 0.100) where the correct Qid scored below threshold. A gap is better than a wrong sense.

**Law — [[law]]: a registered rendering is real only if it is traceable to a CC0 Qid AND a sense that matches the atom's meaning. The snapshot is frozen, provenanced, and green by construction (every uuid recomputes from source); where the sense was unsure, the gap stands.**

## Standards

- **Wikidata (CC0)** — the multilingual labels; every rendering cites its `qid`.
- **BCP-47** — the locale tags of the 30 supported locales.
- **RFC 9562 §5.8** — the content-uuid each rendering is addressed by.

Composes: [[source]] · [[translation]] · [[translations]] · [[law]].
