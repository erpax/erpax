---
name: website
description: "Use when the society must be SEEN, heard, and felt — auto-seeding Payload's pages from the spec corpus, the e2e multimedia walkthroughs, and federation peers; the perceptible outward face of the content-addressed record."
atomPath: website
coordinate: "website · 1/base · 9a2ffa25"
contentUuid: "4a09d33e-8c10-5c6c-aa37-330bb41249d6"
diamondUuid: "286f6819-3431-84cd-8af2-6286464a883b"
uuid: "9a2ffa25-e14c-8d1f-995b-76fd45d34d23"
horo: 1
typography:
  partition: website
  bondDegree: 42
standards:
  - "EU-Admin-Coop-Reg-904/2010"
  - Schema.org Article + WebSite + SoftwareApplication
  - W3C HTML5 § sectioning + WCAG 2.2 §1.4.3
  - "W3C HTML5 § sectioning + WCAG 2.2 §1.4.3`"
  - "W3C-JSON-LD-1.1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "1e1135de-f58c-8eb1-8ebc-e8bdad5abdcb"
  stages:
    - stage: path
      stageUuid: "68045f16-4ea4-865c-b7e6-fa0f280a2b5a"
    - stage: trinity
      stageUuid: "facb1c61-d1b9-8e93-b160-8b2ae1bee75e"
    - stage: boundary
      stageUuid: "f723342d-4910-88da-b835-d194b8a073d5"
    - stage: links
      stageUuid: "60510437-5bd7-8311-8135-02d6c48f5353"
    - stage: horo
      stageUuid: "e5a850a1-13c2-8e55-9aae-74384427374e"
    - stage: seal
      stageUuid: "b8cd2559-8e44-8bc5-ae05-ef3742b2cf36"
    - stage: uuid
      stageUuid: "9fb60677-a708-8239-b66c-b2ec9c95d24b"
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

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C HTML5 § sectioning + WCAG 2.2 §1.4.3`


- **W3C HTML5 §4 sectioning + WCAG 2.2 §1.4.3** — semantic `data-block` sections; accessible contrast on every seeded Page.
- **Schema.org Article + WebSite + SoftwareApplication** — JSON-LD microdata so peers and search engines ingest the citation graph (see [[standard]]).
- **Open Graph + W3C JSON-LD 1.1 + Sitemap.xml 0.9** — federation preview cards + crawlable, hreflang-localised discovery.
