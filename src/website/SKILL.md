---
name: website
description: "Use when the society must be SEEN, heard, and felt — auto-seeding Payload's pages from the spec corpus, the e2e multimedia walkthroughs, and federation peers; the perceptible outward face of the content-addressed record."
atomPath: website
coordinate: "website · 4/weave · f5eb5c25"
contentUuid: "b8a86519-c38e-5fb8-9a66-3f285dc30720"
diamondUuid: "9d4fbce4-0ccc-8964-b16a-cf0816f17052"
uuid: "f5eb5c25-0b81-8ba0-9c15-21c845fd178f"
horo: 4
typography:
  partition: website
  bondDegree: 51
standards:
  - "EU-Admin-Coop-Reg-904/2010"
  - Schema.org Article + WebSite + SoftwareApplication
  - W3C HTML5 § sectioning + WCAG 2.2 §1.4.3
  - "W3C HTML5 § sectioning + WCAG 2.2 §1.4.3`"
  - "W3C-JSON-LD-1.1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "fedf1b86-9556-8c02-9fac-3ab6880fbad4"
  stages:
    - stage: path
      stageUuid: "68045f16-4ea4-865c-b7e6-fa0f280a2b5a"
    - stage: trinity
      stageUuid: "facb1c61-d1b9-8e93-b160-8b2ae1bee75e"
    - stage: boundary
      stageUuid: "1959d26d-f943-8b26-969c-8aafeba47911"
    - stage: links
      stageUuid: "61e87225-28b3-812b-926d-427b2019d0bb"
    - stage: horo
      stageUuid: "93d5c645-2326-8006-a48d-7264ca66a00a"
    - stage: seal
      stageUuid: "b8cd2559-8e44-8bc5-ae05-ef3742b2cf36"
    - stage: uuid
      stageUuid: "d2e5f40a-0db6-8129-81db-cc59314ebd5d"
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

## The page set is a formula, and its input was garbage

`seedFromSpec` is the right shape — the site's pages are **computed from the corpus**, never authored
— and its collection axis read `extractCorpus`, which returned **four** entries:

```
test · index · dunningJob · salesAuditFileJob
```

None of those is a collection. A file named `test`, a file named `index`, and two job names: parse
artefacts. So the corpus booted **231** collections and the site offered 4 pages, all fabrications,
while the formula around them worked perfectly.

The fix is not a better scrape, it is **asking the arbiter**. `shapesOf` is what
[[rules]]/collapse already trusts: `payload-types.ts`, generated **by** Payload from the live config,
so it answers about what actually booted rather than what a walk guessed.

| | before | after |
| --- | ---: | ---: |
| collection pages | 4 (all garbage) | **231** |
| chain · agent · standard-family · role | 21 · 16 · 7 · 6 | unchanged |
| **total** | 54 | **281** |

Nothing on a collection page is written down. The title is `titleFromSlug` — a formula over the
slug, so it cannot drift from it — and the body carries the slug and the **content-uuid**, which is
the page's address in the fold. A test asserts the uuid appears in the body of every page, so a page
that stopped being addressable would redden rather than render.

**Honest boundary.** `shapesOf` returns `fields` empty in this call, so a collection page states its
identity and not yet its shape — the richer body is a further read, not a claim made here. The other
four axes still come from their own registries; only the collection axis was starved. And a page set
that is a formula over sealed state can still be a formula over the WRONG sealed state — the guard is
that its arbiter is the generated face Payload writes, which is the same one the collapse gate uses.

**Law — [[law]]: nothing is authored — every Page is DERIVED from the live corpus ([[generate]]), and because each seed is content-addressed the same Page from two instances is ONE Page ([[merge]]); the website is the perceptible twin of the queryable record.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C HTML5 § sectioning + WCAG 2.2 §1.4.3`


- **W3C HTML5 §4 sectioning + WCAG 2.2 §1.4.3** — semantic `data-block` sections; accessible contrast on every seeded Page.
- **Schema.org Article + WebSite + SoftwareApplication** — JSON-LD microdata so peers and search engines ingest the citation graph (see [[standard]]).
- **Open Graph + W3C JSON-LD 1.1 + Sitemap.xml 0.9** — federation preview cards + crawlable, hreflang-localised discovery.
