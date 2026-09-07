---
name: optimization
description: "Use when making erpax discoverable — search engine optimization (SEO); the canonical keyword and GitHub-topic strategy plus an on-page relevance scorer that the README and npm package draw from."
atomPath: "search/engine/optimization"
coordinate: "search/engine/optimization · 5/round · ca0dbe58"
contentUuid: "4b4cca58-2984-5c52-980c-4ab37280ccbc"
diamondUuid: "2eb445cc-0658-8900-8d6c-b8deeeaaee68"
uuid: "ca0dbe58-d3f7-8f2d-b47f-e853017db1fb"
horo: 5
typography:
  partition: search
  bondDegree: 15
standards:
  - "schema.org + Open Graph discoverability; on-page keyword coverage"
bindings: []
signatures:
  computationUuid: "fa25dc8a-8005-8257-9b01-3659d83e28e5"
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
      stageUuid: "7e71e381-19c8-8013-b950-630c9a41fa16"
    - stage: seal
      stageUuid: "dc173685-2dfc-8cff-9d2b-5bdf2f881784"
    - stage: uuid
      stageUuid: "ec7938f0-1f9a-80e8-82ac-6a3ac1a69890"
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
