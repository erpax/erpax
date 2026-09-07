---
name: optimization
description: "Use when making erpax discoverable — search engine optimization (SEO); the canonical keyword and GitHub-topic strategy plus an on-page relevance scorer that the README and npm package draw from."
atomPath: "search/engine/optimization"
coordinate: "search/engine/optimization · 1/base · e8e6e7cf"
contentUuid: "3f1ba98e-1ec7-5508-ac28-96192287070f"
diamondUuid: "b3d949b2-0381-87d4-aa36-f994592d28f3"
uuid: "e8e6e7cf-d5ed-8d0b-9ec3-ea6f6375269c"
horo: 1
typography:
  partition: search
  bondDegree: 15
standards:
  - "schema.org + Open Graph discoverability; on-page keyword coverage"
bindings: []
signatures:
  computationUuid: "8b6c8099-3dca-8ebd-bfb5-b9accaad302c"
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
      stageUuid: "efcf87a1-c47b-8f9f-b677-307d063b842d"
    - stage: seal
      stageUuid: "dc173685-2dfc-8cff-9d2b-5bdf2f881784"
    - stage: uuid
      stageUuid: "19dd7f35-53d7-8ad3-a0af-45312f4fd6e1"
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
