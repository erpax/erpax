---
name: published
description: "Use when a Payload collection should show drafts to logged-in users but only published versions to anonymous callers — the access predicate that grants `true` to a session and otherwise returns the published-only Where filter."
atomPath: authenticated/or/published
coordinate: authenticated/or/published · 5/round · ed166a2a
contentUuid: "4c19da7f-4d67-52de-adf1-1d461d3789be"
diamondUuid: "247df494-5998-8ad8-bc74-c9117de8cf05"
uuid: "ed166a2a-4a4f-8be2-bced-8df203701ca9"
horo: 5
bonds:
  in:
    - date
    - law
    - sd
  out:
    - date
    - law
    - sd
typography:
  partition: authenticated
  bondDegree: 14
  neighbors: []
standards:
  - "ISO-19011:2018 audit-trail draft-vs-published"
bindings: []
neighbors:
  wikilink:
    - access
    - auth
    - law
    - scope
  matrix:
    - date
    - law
    - sd
  backlinks:
    - date
    - law
    - sd
signatures:
  computationUuid: "f29c8e55-df66-805f-b8a9-f916277af8c8"
  stages:
    - stage: path
      stageUuid: "77e73e4e-1f3d-8153-89d4-719928b2850f"
    - stage: trinity
      stageUuid: "78eef7dd-1f75-8e5e-a07c-7ca670657db5"
    - stage: boundary
      stageUuid: "58d12806-43b8-8f18-b8d5-6d506b86f0b4"
    - stage: links
      stageUuid: "4e13624c-2aec-89da-bf29-2b800ab0ed81"
    - stage: horo
      stageUuid: "d2499c13-9ede-84a0-98bd-db4a2f8cbaa1"
    - stage: seal
      stageUuid: "3e059415-bbed-8eb7-a694-938a7978b483"
    - stage: uuid
      stageUuid: "fcef177d-5511-8b7f-9c63-b656f68092bf"
version: 2
---
# authenticated/or/published — draft for auth, published for anonymous

A two-branch [[access]] predicate. If `req.user` exists it grants full access (`true`, drafts included); otherwise it returns the `wherePublished` row filter from [[scope]], restricting anonymous callers to rows whose version status is published. Draft visibility is thus an authenticated-only privilege.

Matter-twin: `src/authenticated/or/published/index.ts` (`authenticatedOrPublished` ⇒ `true | wherePublished`). Composes [[access]] · [[auth]] · [[scope]].

**Law — [[law]]: draft visibility is authenticated-only — a session grants full [[access]], an anonymous caller is filtered to published rows via [[scope]]'s `wherePublished`.**
