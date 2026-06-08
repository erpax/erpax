---
name: website
description: "Use when the society must be SEEN, heard, and felt — auto-seeding Payload's pages from the spec corpus, the e2e multimedia walkthroughs, and federation peers; the perceptible outward face of the content-addressed record."
atomPath: website
coordinate: website · 8/crest · 8a787f0d
contentUuid: "ec2ef4ab-8a56-55d2-9d6f-97c9c6627420"
diamondUuid: "129fa981-08fc-8042-ae29-adc1fe1f70b0"
uuid: "8a787f0d-e2e7-8963-be80-c0d3de823b8a"
horo: 8
bonds:
  in:
    - akashic
    - civilization
    - dashboard
    - duality
    - flow
    - fractal
    - generate
    - holographic
    - law
    - merge
    - sequence
    - society
    - standard
  out:
    - akashic
    - civilization
    - dashboard
    - duality
    - flow
    - fractal
    - generate
    - holographic
    - law
    - merge
    - sequence
    - society
    - standard
typography:
  partition: website
  bondDegree: 39
  neighbors: []
standards:
  - "EU-Admin-Coop-Reg-904/2010"
  - Schema.org Article + WebSite + SoftwareApplication
  - W3C HTML5 § sectioning + WCAG 2.2 §1.4.3
  - "W3C-JSON-LD-1.1"
bindings: []
neighbors:
  wikilink:
    - akashic
    - civilization
    - duality
    - flow
    - fractal
    - generate
    - holographic
    - law
    - merge
    - sequence
    - society
    - standard
  matrix:
    - akashic
    - civilization
    - dashboard
    - duality
    - flow
    - fractal
    - generate
    - holographic
    - law
    - merge
    - sequence
    - society
    - standard
  backlinks:
    - akashic
    - civilization
    - dashboard
    - duality
    - flow
    - fractal
    - generate
    - holographic
    - law
    - merge
    - sequence
    - society
    - standard
signatures:
  computationUuid: "6895c6ed-5390-8431-9127-187fdbc205cf"
  stages:
    - stage: path
      stageUuid: "68045f16-4ea4-865c-b7e6-fa0f280a2b5a"
    - stage: trinity
      stageUuid: "facb1c61-d1b9-8e93-b160-8b2ae1bee75e"
    - stage: boundary
      stageUuid: "1ae04c7d-11f4-8196-9826-85006befe0e5"
    - stage: links
      stageUuid: "a2495a38-6e54-86b0-8e40-e235fff7ebbe"
    - stage: horo
      stageUuid: "a799c7db-6b5c-8cce-904d-3a4fdb2e08d5"
    - stage: seal
      stageUuid: "b200ed2e-2819-83e9-9ec4-54b0ae835c4b"
    - stage: uuid
      stageUuid: "7385c894-cf0d-833e-8ceb-23353d7e0299"
version: 2
---
# website — the record made perceptible

FORM: **the society's whole record rendered into a surface a human can browse.** The codebase is queryable but mute; the website is its face — every CollectionSpec, Chain, Agent, Role, and Standard becomes a Page, so the [[akashic]] record is not just read by agents but seen, heard, and felt by people. Nothing is authored; every Page is DERIVED ([[generate]]) from the live corpus, the filesystem the only source.

The capability seeds Payload's `pages` collection from three sources, one [[flow]] of HTML into the surface:

1. **e2e multimedia** — `seedFromE2e` walks `marketing/<workflow>.<locale>.html` (Playwright-recording output) into one `PageSeed` per locale.
2. **spec corpus** — `seedFromSpec` renders one Page per collection / chain / agent / role / standard-family, each body carrying the citation graph + MCP try-it actions.
3. **federation** — `importMediaBundle` / `exportMediaBundle` round-trip the seeds as an `.ndjson` bundle peers broadcast and ingest.

Because each seed is content-addressed, the same Page authored by two instances is ONE Page ([[merge]], [[holographic]]: the whole graph is recoverable from any seed). The website is the perceptible twin of the queryable record — the [[duality]] of read (agents) and seen (people) — and the [[civilization]]-scale outward organ of the [[society]]: every culture publishes its own record the same way. SEO is itself a coupled vortex (`seo-vortex.ts`): every published Page carries ≥2 inbound + ≥2 outbound Schema.org edges, so discovery is a [[fractal]] citation graph, not flat metadata.

Sequence position: **8** (crest — the inward record manifested outward), on the ring 0·3·6·9·1·2·4·8·7·5 (see [[sequence]]).

**Law — [[law]]: nothing is authored — every Page is DERIVED from the live corpus ([[generate]]), and because each seed is content-addressed the same Page from two instances is ONE Page ([[merge]]); the website is the perceptible twin of the queryable record.**

## Standards

- **W3C HTML5 §4 sectioning + WCAG 2.2 §1.4.3** — semantic `data-block` sections; accessible contrast on every seeded Page.
- **Schema.org Article + WebSite + SoftwareApplication** — JSON-LD microdata so peers and search engines ingest the citation graph (see [[standard]]).
- **Open Graph + W3C JSON-LD 1.1 + Sitemap.xml 0.9** — federation preview cards + crawlable, hreflang-localised discovery.
