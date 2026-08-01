---
name: optimization
description: "Use when making erpax discoverable — search engine optimization (SEO); the canonical keyword and GitHub-topic strategy plus an on-page relevance scorer that the README and npm package draw from."
atomPath: "search/engine/optimization"
coordinate: "search/engine/optimization · 7/descent · 5f50cca7"
contentUuid: "44c938ac-1244-58ee-b93a-d0220bf56032"
diamondUuid: "50089538-39ae-8b06-a8e4-a75d67f59dd0"
uuid: "5f50cca7-3b03-8076-bd08-d21a6ad931bb"
horo: 7
typography:
  partition: search
  bondDegree: 15
standards:
  - "schema.org + Open Graph discoverability; on-page keyword coverage"
bindings: []
signatures:
  computationUuid: "0aa3d145-4c1d-87c3-bcaa-7064fd9631b0"
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
      stageUuid: "67a2d981-1757-8f3d-a31b-e2843b4cdff9"
    - stage: seal
      stageUuid: "dc173685-2dfc-8cff-9d2b-5bdf2f881784"
    - stage: uuid
      stageUuid: "a0275226-2265-8124-95ca-048b07b4df2e"
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
