---
name: seo
description: "Use when ensuring every atom carries comprehensive marketing and SEO — title, meta description, keywords, canonical, and schema.org JSON-LD — computed from the atom and verified by a forcing-function test, then displayed directly in vitepress."
atomPath: seo
coordinate: seo · 1/base · f220ceba
contentUuid: "31984353-52aa-560f-bdc8-8d6536cf3ac7"
diamondUuid: "b89dca9e-c9bb-8564-b727-c42c3111f112"
uuid: "f220ceba-57f2-8621-bf5c-7e8bbed5e99c"
horo: 1
bonds:
  in:
    - entropy
    - law
    - links
    - marketing
    - name
    - observe
    - vitepress
  out:
    - entropy
    - law
    - links
    - marketing
    - name
    - observe
    - vitepress
typography:
  partition: seo
  bondDegree: 21
  neighbors: []
standards:
  - "Open Graph protocol · schema.org TechArticle (JSON-LD) · meta description ≤160 chars"
  - "W3C-JSON-LD-1.1"
  - "every field derived from the atom; seoCoverage reads the live tree, the gap computed not assumed"
  - "every field derived from the atom; seoCoverage reads the live tree, the gap is computed not assumed"
bindings: []
neighbors:
  wikilink:
    - entropy
    - law
    - links
    - marketing
    - name
    - vitepress
  matrix:
    - entropy
    - law
    - links
    - marketing
    - name
    - observe
    - vitepress
  backlinks:
    - entropy
    - law
    - links
    - marketing
    - name
    - observe
    - vitepress
signatures:
  computationUuid: "3497605b-edd1-84eb-b25f-fe2b7a059775"
  stages:
    - stage: path
      stageUuid: "ab8e9c71-6d7c-81e7-9f22-21dc4b50e125"
    - stage: trinity
      stageUuid: "e19eb5f0-d92b-8511-86a5-c4f603bce9b2"
    - stage: boundary
      stageUuid: "ffb987d6-3c57-889c-92e5-b1681eb0253e"
    - stage: links
      stageUuid: "e6b8750a-92a6-8d3a-8087-8693b235394e"
    - stage: horo
      stageUuid: "b6276f9f-1086-8f4c-9257-d633c9f2a4d7"
    - stage: seal
      stageUuid: "41b25a8b-36fa-859a-9bc4-1e9c1a583da1"
    - stage: uuid
      stageUuid: "7dea8d97-0077-8f12-88fa-88af9c04b403"
version: 2
---
# seo — the projection, tested and displayed

Every atom is an Open Graph object and a schema.org **TechArticle**. `seo(atom, description, links)` computes the marketing/SEO an agent **projects** for that atom from what it **observes** — the [[name]] (title + identifier uuid), the frontmatter description (clipped to a 160-char meta description), the [[links]] (keywords) — and the canonical URL from its [[vitepress]] route. Nothing is hand-authored; the SEO is *derived*, so it can never drift from the atom.

**The test IS the forcing function.** `seoCoverage` walks every `SKILL.md`, computes its SEO, and reports the `incomplete` ones. The test asserts `incomplete === []` — so it **fails if any atom is marketing-incomplete** (a missing description). Building it found exactly one gap — a legacy phase-doc with no frontmatter — now fixed, coverage total. The corpus stays SEO-complete *by construction*: you cannot add an atom without a description without the gate turning red.

**Displayed directly in vitepress.** `headTags(seo(...))` returns the page's `<head>` — meta description, OG tags, canonical, and the JSON-LD `<script>` — the same shape the VitePress config's `transformPageData` already injects per page. So what the test generates is exactly what the site displays: one testable source for the projection. This is the [[marketing]] surface as the [[entropy]] expansion-∞ — endless crawlable frontend, endless tamper-cost.

Matter-twin: `src/seo/index.ts` (`seo` · `comprehensive` · `headTags` · `seoCoverage`). Composes [[name]] · [[vitepress]] · [[marketing]] · [[entropy]].

**Law — [[law]]: every atom projects comprehensive marketing/SEO — title, meta description (≤160), keywords, canonical, schema.org JSON-LD — all computed from what the agent observes (name, description, links), none hand-authored. The test is the forcing function: it fails if any atom's SEO is incomplete, so the corpus stays marketing-complete by construction, and what the test generates is exactly what vitepress displays.**

@audit every field derived from the atom; seoCoverage reads the live tree, the gap computed not assumed
@standard Open Graph protocol · schema.org TechArticle (JSON-LD) · meta description ≤160 chars
