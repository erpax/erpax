---
name: optimization
description: "Use when making erpax discoverable — search engine optimization (SEO); the canonical keyword and GitHub-topic strategy plus an on-page relevance scorer that the README and npm package draw from."
atomPath: search/engine/optimization
coordinate: search/engine/optimization · 4/weave · b6239a26
contentUuid: "31c65ebf-ebe3-5172-b51a-ff694d319f39"
diamondUuid: "92e0717a-cb39-888f-946f-68d36c2b487a"
uuid: "b6239a26-5b87-88b7-bb31-f65d1acf7a14"
horo: 4
bonds:
  in:
    - discover
    - engine
    - keyword
    - keywords
    - rank
    - search
  out:
    - discover
    - keyword
    - keywords
    - rank
    - search
typography:
  partition: search
  bondDegree: 15
  neighbors: []
standards:
  - "schema.org + Open Graph discoverability; on-page keyword coverage"
bindings: []
neighbors:
  wikilink:
    - discover
    - keyword
    - keywords
    - rank
    - search
  matrix:
    - discover
    - keyword
    - keywords
    - rank
    - search
  backlinks:
    - discover
    - keyword
    - keywords
    - rank
    - search
signatures:
  computationUuid: "9da9ea0d-55c0-8f69-8719-4da54e6e901f"
  stages:
    - stage: path
      stageUuid: "8a5a6a4c-8367-87c4-86ec-99be94514db8"
    - stage: trinity
      stageUuid: "e0e47baa-0207-8f2c-8fb1-a6eb6426bce2"
    - stage: boundary
      stageUuid: "52391c4c-72fc-8b5b-902e-f6debfdc6033"
    - stage: links
      stageUuid: "fa63c35c-125c-88b0-ac77-3c523c444a60"
    - stage: horo
      stageUuid: "f6e9a270-7b33-8825-887f-9dbc02d75249"
    - stage: seal
      stageUuid: "a1f39b6d-2ed3-8662-92f5-6e2172c245eb"
    - stage: uuid
      stageUuid: "155eec69-5326-846e-a698-a4b984ba9b51"
version: 2
---
# search/engine/optimization — SEO

Making content discoverable by the [[search]] engine — **search engine optimization**. This atom holds the **canonical erpax keyword/topic strategy** (produced by the README team) and an on-page **relevance** scorer; the README and the npm package draw their keywords from here, so the SEO surface has a single source of truth.

- `KEYWORDS` — the searchable phrases that truthfully describe erpax (erp · accounting · double-entry · payload-cms · cloudflare · multi-tenant · content-addressed · tamper-evident · standards-compliance · typescript).
- `TOPICS` — the GitHub topics for discoverability.
- `relevance(text)` ∈ [0,1] — the fraction of the keyword set present in a text (a simple on-page coverage signal).

SEO is honest discoverability: the keywords are true, not stuffed — they describe what erpax actually is ([[search]]/engine `rank` rewards the closest match, not the loudest).

Matter-twin: `src/search/engine/optimization/index.ts` (`KEYWORDS` · `TOPICS` · `relevance`). Composes [[search]] · [[keyword]] · [[keywords]] · [[rank]] · [[discover]].

@standard schema.org + Open Graph discoverability; on-page keyword coverage
