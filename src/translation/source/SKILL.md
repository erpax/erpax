---
name: source
description: "Use when the translation intelligence must be trained with REAL renderings, not fabricated ones — fetches a word's community-maintained labels in every language from Wikidata (CC0), the zero-cost self-training source. Returns the concept id + description so the sense is verified before registering; returns null when no concept exists. Same pattern as the live sanctions check: a real authoritative endpoint, actually fetched, never invented."
atomPath: "translation/source"
coordinate: "translation/source · 7/descent · 39b1cd89"
contentUuid: "f83c1442-5a5e-5135-b468-cf0b00e53e58"
diamondUuid: "87d88dbd-e647-88bc-8de9-624137e6e5db"
uuid: "39b1cd89-e7a9-8a05-9c54-00e0ae5b38a4"
horo: 7
typography:
  partition: translation
  bondDegree: 67
standards:
  - "Wikidata (CC0) · Wikimedia MediaWiki API · BCP-47 locale tags"
bindings: []
signatures:
  computationUuid: "d74dafa3-1268-89d2-96dc-04d614c9ef50"
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
      stageUuid: "7c535675-de52-80f6-9632-f1d6b8399787"
    - stage: seal
      stageUuid: "88f3b8db-7e5c-84c3-9436-ec9ed0490919"
    - stage: uuid
      stageUuid: "6f057400-2d1b-8161-9541-4a2ba28c3e3b"
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
