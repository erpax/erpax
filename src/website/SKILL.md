---
name: website
description: "Use when the society must be SEEN, heard, and felt — auto-seeding Payload's pages from the spec corpus, the e2e multimedia walkthroughs, and federation peers; the perceptible outward face of the content-addressed record."
atomPath: website
coordinate: "website · 8/crest · 12549822"
contentUuid: "6c7efb62-dcd5-56e0-8d0e-3364f67619a7"
diamondUuid: "8f5f706b-3c51-8c8e-9299-d931135a84e0"
uuid: "12549822-bceb-8dfb-b60e-58915f403ef2"
horo: 8
typography:
  partition: website
  bondDegree: 39
standards:
  - "EU-Admin-Coop-Reg-904/2010"
  - Schema.org Article + WebSite + SoftwareApplication
  - W3C HTML5 § sectioning + WCAG 2.2 §1.4.3
  - "W3C HTML5 § sectioning + WCAG 2.2 §1.4.3`"
  - "W3C-JSON-LD-1.1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ad0dcb4d-206b-855d-b8d8-39de3d563fc3"
  stages:
    - stage: path
      stageUuid: "68045f16-4ea4-865c-b7e6-fa0f280a2b5a"
    - stage: trinity
      stageUuid: "facb1c61-d1b9-8e93-b160-8b2ae1bee75e"
    - stage: boundary
      stageUuid: "f723342d-4910-88da-b835-d194b8a073d5"
    - stage: links
      stageUuid: "a2495a38-6e54-86b0-8e40-e235fff7ebbe"
    - stage: horo
      stageUuid: "87ca5d41-1e1e-8b88-ade6-6861c0adc095"
    - stage: seal
      stageUuid: "b8cd2559-8e44-8bc5-ae05-ef3742b2cf36"
    - stage: uuid
      stageUuid: "dfea15a6-b2b2-8887-91df-9174ba8fe155"
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
