---
name: document
description: "Use when a lead should be visible to everyone who can develop it — turns each open intent into a nested page under leads, and each resolved intent that names a document into a redirect from the lead's address to that document, as generated seeds loaded through the REST API."
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
