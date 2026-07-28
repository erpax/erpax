---
name: published
description: "Use when a Payload collection should show drafts to logged-in users but only published versions to anonymous callers — the access predicate that grants `true` to a session and otherwise returns the published-only Where filter."
atomPath: "authenticated/or/published"
coordinate: "authenticated/or/published · 8/crest · 8328e394"
contentUuid: "6128b47d-492e-5b1a-b4dd-1243d07930c5"
diamondUuid: "d70cef79-ca84-8780-ae9e-d0cf222806bc"
uuid: "8328e394-2f9f-8493-bd33-4d2645f3e8d7"
horo: 8
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
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "ISO/IEC-29119"
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
  computationUuid: "3f808256-0c07-8ac7-ba8e-29b3229f9dc1"
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
      stageUuid: "e89ca775-fca9-8c89-af0a-ab3abd25407b"
    - stage: seal
      stageUuid: "3e059415-bbed-8eb7-a694-938a7978b483"
    - stage: uuid
      stageUuid: "78151728-6370-863f-b56e-c82ff3c63e48"
version: 2
---
# authenticated/or/published — draft for auth, published for anonymous

A two-branch [[access]] predicate. If `req.user` exists it grants full access (`true`, drafts included); otherwise it returns the `wherePublished` row filter from [[scope]], restricting anonymous callers to rows whose version status is published. Draft visibility is thus an authenticated-only privilege.

Matter-twin: `src/authenticated/or/published/index.ts` (`authenticatedOrPublished` ⇒ `true | wherePublished`). Composes [[access]] · [[auth]] · [[scope]].

**Law — [[law]]: draft visibility is authenticated-only — a session grants full [[access]], an anonymous caller is filtered to published rows via [[scope]]'s `wherePublished`.**
