---
name: published
description: "Use when a Payload collection should show drafts to logged-in users but only published versions to anonymous callers — the access predicate that grants `true` to a session and otherwise returns the published-only Where filter."
atomPath: "authenticated/or/published"
coordinate: "authenticated/or/published · 7/descent · d6fc3609"
contentUuid: "7e5a68d6-4d72-5e58-bb37-3c5a647ef403"
diamondUuid: "f217a164-7916-874a-9c4c-e5afa357a4cf"
uuid: "d6fc3609-dfac-8d95-8c62-06fa44c4921c"
horo: 7
typography:
  partition: authenticated
  bondDegree: 14
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "30d42150-967d-87f0-8d22-dcca3c0101a4"
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
      stageUuid: "732a1608-bb0f-8a0d-aff4-30351e507a09"
    - stage: seal
      stageUuid: "3e059415-bbed-8eb7-a694-938a7978b483"
    - stage: uuid
      stageUuid: "fc491919-6365-882a-9615-e4e389ef2430"
version: 2
---
# authenticated/or/published — draft for auth, published for anonymous

A two-branch [[access]] predicate. If `req.user` exists it grants full access (`true`, drafts included); otherwise it returns the `wherePublished` row filter from [[scope]], restricting anonymous callers to rows whose version status is published. Draft visibility is thus an authenticated-only privilege.

Matter-twin: `src/authenticated/or/published/index.ts` (`authenticatedOrPublished` ⇒ `true | wherePublished`). Composes [[access]] · [[auth]] · [[scope]].

**Law — [[law]]: draft visibility is authenticated-only — a session grants full [[access]], an anonymous caller is filtered to published rows via [[scope]]'s `wherePublished`.**
