---
name: load
description: "Use when the corpus documents should live in Payload instead of in an agent's context — reads each atom's SKILL document, derives nested page rows, and writes them through the REST SDK against any reachable deployment, so a reader later finds one page by slug and selects its markdown."
atomPath: "seed/content/load"
coordinate: "seed/content/load · 4/weave · 43c236e6"
contentUuid: "1e2d7c70-b394-51eb-bb02-dc428d5ff5b0"
diamondUuid: "6e233e7f-d149-8436-8043-37ace50935ba"
uuid: "43c236e6-1598-8bc3-9551-813c032049eb"
horo: 4
typography:
  partition: seed
  bondDegree: 18
standards:
  - "9110 http-semantics authorization"
bindings: []
signatures:
  computationUuid: "aec85aba-6b15-83ce-9c51-e9fdb35e86d1"
  stages:
    - stage: path
      stageUuid: "55675506-9d66-8d12-be50-5189ac06b312"
    - stage: trinity
      stageUuid: "04b09630-b6a6-8235-b33d-f1ba4b2eec2e"
    - stage: boundary
      stageUuid: "e5a0a876-870e-8b9d-b0be-9c1d9b4cff82"
    - stage: links
      stageUuid: "0f017edb-ab29-8f67-8c9a-9dcc05fcc7d4"
    - stage: horo
      stageUuid: "2f34853c-6098-8176-809e-a0dbce6aed3b"
    - stage: seal
      stageUuid: "5756b2c3-63bf-80fc-9344-bb2b806eef26"
    - stage: uuid
      stageUuid: "f75a11a1-c734-802b-a2ba-4e265cc9469a"
version: 2
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
