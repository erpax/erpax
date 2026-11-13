---
name: optimization
description: "Use when making erpax discoverable — search engine optimization (SEO); the canonical keyword and GitHub-topic strategy plus an on-page relevance scorer that the README and npm package draw from."
atomPath: "search/engine/optimization"
coordinate: "search/engine/optimization · 4/weave · b7bca24f"
contentUuid: "c87a44c2-e087-5c77-9c4f-ca86fe732e95"
diamondUuid: "66698f08-9fa2-8ecf-bc0c-47cc71dc53f2"
uuid: "b7bca24f-7aa7-8b26-97bc-71dbdffa21db"
horo: 4
typography:
  partition: search
  bondDegree: 12
standards:
  - "schema.org + Open Graph discoverability; on-page keyword coverage"
bindings: []
signatures:
  computationUuid: "83ad2ba1-aea0-8463-b2d7-3d54501b55d4"
  stages:
    - stage: path
      stageUuid: "8a5a6a4c-8367-87c4-86ec-99be94514db8"
    - stage: trinity
      stageUuid: "e0e47baa-0207-8f2c-8fb1-a6eb6426bce2"
    - stage: boundary
      stageUuid: "52391c4c-72fc-8b5b-902e-f6debfdc6033"
    - stage: links
      stageUuid: "0dcdd28e-acff-821e-b43c-7bded7d1d8de"
    - stage: horo
      stageUuid: "16279f9b-ad56-8f1a-be91-43c21cb2cb3e"
    - stage: seal
      stageUuid: "dc173685-2dfc-8cff-9d2b-5bdf2f881784"
    - stage: uuid
      stageUuid: "3960ee59-5ce5-8a4c-b3ae-3fbbc48b0166"
version: 2
---
# search/engine/optimization — SEO

Making content discoverable by the [[search]] engine — **search engine optimization**. This atom holds the **canonical erpax keyword/topic strategy** (produced by the README team) and an on-page **relevance** scorer; the README and the npm package draw their keywords from here, so the SEO surface has a single source of truth.

- `KEYWORDS` — the searchable phrases that truthfully describe erpax (erp · accounting · double-entry · payload-cms · cloudflare · multi-tenant · content-addressed · tamper-evident · standards-compliance · typescript).
- `TOPICS` — the GitHub topics for discoverability.
- `relevance(text)` ∈ [0,1] — the fraction of the keyword set present in a text (a simple on-page coverage signal).

SEO is honest discoverability: the keywords are true, not stuffed — they describe what erpax actually is ([[search]]/engine `rank` rewards the closest match, not the loudest).

Matter-twin: `src/search/engine/optimization/index.ts` (`KEYWORDS` · `TOPICS` · `relevance`). Composes [[search]] · [[keyword]] · [[keywords]] · [[rank]] · discover.

@standard schema.org + Open Graph discoverability; on-page keyword coverage
