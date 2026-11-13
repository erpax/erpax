---
name: load
description: "Use when the corpus documents should live in Payload instead of in an agent's context — reads each atom's SKILL document, derives nested page rows, and writes them through the REST SDK against any reachable deployment, so a reader later finds one page by slug and selects its markdown."
---
# seed/content/load — the documents go where they can be asked for

A file loaded into an agent's context is paid for on every turn. Measured on one long session:
the rule files cost about 150,000 tokens per turn, re-read 380 times, while every tool result of
the whole session together was under 300,000. The same text as a nested page costs what one
answer costs.

## Loading

```
ERPAX_AUTHORIZATION='<Authorization header value>' \
  tsx src/seed/content/load/index.ts --url https://host --packs rules,law [--tenant <id>]
  tsx src/seed/content/load/index.ts --url https://host --seed src/payload/local/seed.generated.json
```

`overSdk(sdk, config)` presents `@payloadcms/sdk` as the slice of the Local API that
[[seed]]/content's loaders write through, so the same `loadPages` runs in a test, in a script and
against production. `loadCorpus` reads documents with `skillReader`, derives rows with
`pageRows`, and is idempotent by content address — a second run writes nothing.

## Reading

The search collection is the reading route: one flat row per document with its title, slug, SEO
description and body as markdown. The gateway at `/api/mcp` exposes the same collection the REST
API does — there is one API, reached two ways.

- **REST SDK** — `sdk.find({ collection: 'search', where: { slug: { equals: 'rules-copy' } }, select: { title: true, markdown: true }, limit: 1 })`
- **MCP** — the find tool for `search`, with `where` `{"slug":{"equals":"rules-copy"}}` and
  `select` `{"title":true,"markdown":true}`.
- **Which document?** — `where` `{"slug":{"like":"skills-"}}`, `select`
  `{"title":true,"slug":true,"meta":{"description":true}}`: every skill with its "Use when" line.

Measured on the Payload skill's query reference: 6.5 KB through search against 45 KB for the page
itself, and the text came back identical to the source (6,110 characters, 18 code fences).

**Honest boundary.** This loads and it does not decide who may read: pages follow the collection's
own access rule, so a draft or another tenant's page is not returned. The credential is the
caller's and is never stored. A document changed in the admin after loading is overwritten by the
next load of a changed source, because the seed address — not the stored body — decides. And a
loaded page is a COPY: the SKILL file remains the source until the corpus is edited in Payload.

**Law — [[law]]: a document an agent may need is not a document every agent must carry. Put it
where it can be asked for by name, and return it as text.**

Composes: [[seed]]/content · [[preset]] · [[law]].
