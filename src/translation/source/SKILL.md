---
name: source
description: "Use when the translation intelligence must be trained with REAL renderings, not fabricated ones — fetches a word's community-maintained labels in every language from Wikidata (CC0), the zero-cost self-training source. Returns the concept id + description so the sense is verified before registering; returns null when no concept exists. Same pattern as the live sanctions check: a real authoritative endpoint, actually fetched, never invented."
atomPath: "translation/source"
coordinate: "translation/source · 4/weave · 2133e241"
contentUuid: "92ec3adf-3bdc-5a2c-93d2-56ffadaff5d3"
diamondUuid: "3a59bf1d-d90f-8642-bc31-5c3b8ab0f6eb"
uuid: "2133e241-96d2-8b01-98b2-923f072eb3ea"
horo: 4
typography:
  partition: translation
  bondDegree: 67
standards:
  - "Wikidata (CC0) · Wikimedia MediaWiki API · BCP-47 locale tags"
bindings: []
signatures:
  computationUuid: "ee30cb69-bdd0-82a4-aa04-46bd786313f5"
  stages:
    - stage: path
      stageUuid: "a31c9fb4-ad8a-89cf-9225-d68298d49bc9"
    - stage: trinity
      stageUuid: "22efc8a1-1bd7-8a42-8f8b-e8dc91496cd2"
    - stage: boundary
      stageUuid: "79c383fc-d759-806a-8929-e76b465155e9"
    - stage: links
      stageUuid: "7a701df4-faa8-8827-834b-e0910d855c10"
    - stage: horo
      stageUuid: "ab4ea559-c19b-84a4-b3cf-41521728ae50"
    - stage: seal
      stageUuid: "88f3b8db-7e5c-84c3-9436-ec9ed0490919"
    - stage: uuid
      stageUuid: "c9035b3e-ee49-8491-9911-d44ea49b4484"
version: 2
---
# source — real translations from Wikidata

The training source for the translation intelligence. Renderings are **fetched from free authoritative community data**, never fabricated — the same discipline as the live [[sanctions]] check: a real endpoint, actually called.

Verified live (2026‑07‑15): `heart → Q1072 → сърце / Herz / cœur / 心臓 / сердце / قلب / καρδιά` in **286 languages**, all CC0.

- **`searchConcepts(word, f, limit)`** — the top `limit` candidate senses, each with its English gloss.
- **`fetchLabels(word)`** — resolves a word to its TOP Wikidata concept and returns that concept's labels in every language, plus the `qid` and `description`.
- **`senseScore(gloss, description)`** — Jaccard over content tokens; how well a candidate's Wikidata gloss matches the atom's own meaning.
- **`harvestVerified(word, gloss, f, {limit, threshold})`** — THE SENSE GATE: searches several candidates and returns the labels of the best sense‑matching one, or `null` (leave the gap) when none clears the threshold.
- **`toValues(labels, locales)`** — filters to the locales you register; uncovered locales stay honest seed‑gaps.

Matter‑twin: `src/translation/source/index.ts`. The `fetch` is injectable, so tests are deterministic; the endpoint itself is verified reachable live.

**The sense gate — why the top match is not enough.** Live proof, top‑1 search, 2026‑07‑15: `heart→Q1072 (organ)` and `water→Q283 (compound)` are the RIGHT sense, but `law→Q16871926 (a family name)`, `balance→Q1753419 (a Van Halen album)`, `gold→family name`, `apple→Apple Inc`, `sun→Sun Microsystems`, `brain→a journal` are WRONG senses. A wrong‑sense label is worse than a seed‑gap. So `harvestVerified` registers a concept's labels **only if** a candidate's Wikidata description sense‑matches the atom's own meaning; when none does, it returns `null` — **leave the gap**, never fabricate, never guess. The verified snapshot lives in the child atom [[verified]].

**Honest boundary.** Not every corpus word has a sense‑clearing Wikidata concept (returns `null` → the human/model supplies it, or the gap stands). **CC0** — attribute to Wikidata. Registering these sense‑verified labels moves [[translation]]'s `trainingCoverage` toward 1 with real data, honestly (the [[verified]] sample: 27 concepts, 0.033 → 0.974).

**Law — [[law]]: train the translation intelligence from authoritative free data, verified by sense, never fabricated. A fetched label with a matching concept is real; a guessed one is entropy. Where no concept exists, the gap stands until a human or model fills it.**

## Standards

- **Wikidata** — the multilingual knowledge base (CC0); labels per concept.
- **Wikimedia MediaWiki API** — `wbsearchentities` + `wbgetentities`.
- **BCP‑47** — language and dialect tags.

Composes: [[translation]] · [[translate]] · [[law]].
