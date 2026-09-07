---
name: published
description: "Use when a Payload collection should show drafts to logged-in users but only published versions to anonymous callers — the access predicate that grants `true` to a session and otherwise returns the published-only Where filter."
atomPath: "authenticated/or/published"
coordinate: "authenticated/or/published · 2/share · 29920f40"
contentUuid: "6c113e4a-abca-5b25-b97b-1ad43a51399e"
diamondUuid: "63c50b13-2e93-8129-8ad2-c49c66c79494"
uuid: "29920f40-fc18-88ce-8995-c621ae977f62"
horo: 2
typography:
  partition: authenticated
  bondDegree: 14
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "b805ddb5-7d03-8e43-8c54-0e4a02ef0956"
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
      stageUuid: "abb1bb40-cb3c-87d2-bbdb-e0379d5696c4"
    - stage: seal
      stageUuid: "3e059415-bbed-8eb7-a694-938a7978b483"
    - stage: uuid
      stageUuid: "376b7f57-5246-897f-953e-bff64488208e"
version: 2
---
# authenticated/or/published — draft for auth, published for anonymous

A two-branch [[access]] predicate. If `req.user` exists it grants full access (`true`, drafts included); otherwise it returns the `wherePublished` row filter from [[scope]], restricting anonymous callers to rows whose version status is published. Draft visibility is thus an authenticated-only privilege.

Matter-twin: `src/authenticated/or/published/index.ts` (`authenticatedOrPublished` ⇒ `true | wherePublished`). Composes [[access]] · [[auth]] · [[scope]].

**Law — [[law]]: draft visibility is authenticated-only — a session grants full [[access]], an anonymous caller is filtered to published rows via [[scope]]'s `wherePublished`.**
