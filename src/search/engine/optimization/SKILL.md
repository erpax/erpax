---
name: optimization
description: "Use when making erpax discoverable — search engine optimization (SEO); the canonical keyword and GitHub-topic strategy plus an on-page relevance scorer that the README and npm package draw from."
atomPath: "search/engine/optimization"
coordinate: "search/engine/optimization · 5/round · 7641eb8d"
contentUuid: "be914129-1226-5454-b888-d4a9ae6fe1d8"
diamondUuid: "201107fd-1eee-8b68-9de8-361a18985678"
uuid: "7641eb8d-7d58-85f8-91e4-d6ccfb219750"
horo: 5
typography:
  partition: search
  bondDegree: 15
standards:
  - "schema.org + Open Graph discoverability; on-page keyword coverage"
bindings: []
signatures:
  computationUuid: "2278fcb3-0d5c-8655-883b-625d41a38d09"
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
      stageUuid: "a6899637-36ce-8c36-b098-d1862ddd2e4e"
    - stage: seal
      stageUuid: "dc173685-2dfc-8cff-9d2b-5bdf2f881784"
    - stage: uuid
      stageUuid: "c16da582-f1d1-8cb3-a50b-cd3f22d17e3f"
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
