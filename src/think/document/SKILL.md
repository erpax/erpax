---
name: document
description: "Use when a lead should be visible to everyone who can develop it — turns each open intent into a nested page under leads, and each resolved intent that names a document into a redirect from the lead's address to that document, as generated seeds loaded through the REST API."
atomPath: "think/document"
coordinate: "think/document · 5/round · 9f29c2e2"
contentUuid: "68881ac9-a03c-5383-94da-f41f017aa57f"
diamondUuid: "50eaba1f-982a-84ea-8d80-c9739475f850"
uuid: "9f29c2e2-385c-8636-b8bd-b3749f7634c8"
horo: 5
typography:
  partition: think
  bondDegree: 63
standards: []
bindings: []
signatures:
  computationUuid: "c7956022-da5d-8751-945c-f2655390b9a4"
  stages:
    - stage: path
      stageUuid: "b3944934-df70-882e-9e82-f2d2d5f1c0be"
    - stage: trinity
      stageUuid: "4e86e374-08c0-8f79-8aa7-8c664bdc827f"
    - stage: boundary
      stageUuid: "acc00a38-a26d-8185-b888-a92348e15884"
    - stage: links
      stageUuid: "d8f82b95-b8bf-8c92-aa59-017ebd3f927d"
    - stage: horo
      stageUuid: "6a4957b9-a188-88ae-8f0f-f6cd577ab3ad"
    - stage: seal
      stageUuid: "2d7a10d6-1a36-8a94-9cc6-b64e49e3e2e7"
    - stage: uuid
      stageUuid: "b2a07a99-c54a-8595-9939-3de2936561a4"
version: 2
---
# think/document — a lead is a page; a resolved lead is a redirect

An intent recorded by [[think]] lives in a cache file on one machine. That is enough for the agent
that wrote it and useless to anyone else. So the leads are documents:

- **Open** — one nested page under `leads`. Its heading is what is to be done; its body repeats the
  lead in full and, when the lead waits on something, says what (`**Develop when** …`). The page's
  description is its first paragraph, so the search collection lists every lead in one small read.
- **Resolved** — not a page. If the outcome names a document (`{ page: 'parties' }`), the lead's
  address redirects to that document, by reference. If it names none, the lead is closed and
  leaves nothing behind.

`leadRows` and `leadRedirects` derive both from the same list, so a lead is never a page and a
redirect at once. `leadPath` addresses a lead by its own text — the first words for a reader, eight
hex digits of its address for uniqueness — so the same lead is the same page in every deployment.

## Generating and loading

```
tsx src/think/document/index.ts
tsx src/seed/content/load/index.ts --url <origin> \
  --seed src/think/document/seed.generated.json \
  --redirects src/think/document/redirects.generated.json
```

[[seed]]/content's `loadRedirects` writes each redirect once, refuses one whose target page is not
loaded, and unpublishes the page that used to sit at the redirected address.

## A whole site as leads

A task like "implement this documentation site" is too large to be one request. `sitemapUrls`
reads a sitemap and `sectionLeads` turns it into one lead per section — the first path segment
under the documentation root — naming its pages and saying it has not been read:

```
tsx src/think/document/index.ts --sitemap https://payloadcms.com/sitemap.xml
```

Run on the Payload sitemap on 2026-11-13: 1,213 URLs became 33 section leads. Each section is
then read, measured against the corpus, and closed with a redirect to the document that did the
work.

## Reading

Through the search collection, like any document: `where` `{"slug":{"like":"leads-"}}`, `select`
`{"title":true,"slug":true,"meta":{"description":true}}`.

**Honest boundary.** The seeds are generated from this machine's intent store; an intent recorded
on another machine is not in them until it is recorded here or the page is written directly in
Payload. Loading never deletes: a lead that was open, loaded, and then closed with no document
stays published until someone unpublishes it. The generated files are not tracked.

**Law — [[law]]: what is still to be done is a document where everyone can read it, and what was
done is a link to where it was done.**

Composes: [[think]] · [[seed]]/content · [[law]].
