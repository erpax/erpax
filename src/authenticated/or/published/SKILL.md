---
name: published
description: "Use when a Payload collection should show drafts to logged-in users but only published versions to anonymous callers — the access predicate that grants `true` to a session and otherwise returns the published-only Where filter."
atomPath: "authenticated/or/published"
coordinate: "authenticated/or/published · 1/base · 7d9b9aa3"
contentUuid: "9f638ba1-04b1-5fe4-abd1-99138535badf"
diamondUuid: "ff5e9e95-07f3-8d85-b0dd-a9958ff57dff"
uuid: "7d9b9aa3-81e2-8b83-af79-bda19057f64f"
horo: 1
typography:
  partition: authenticated
  bondDegree: 14
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "a5cbb5f7-6b20-80d1-a14f-a300c3f9a7de"
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
      stageUuid: "3b72b5cc-70cc-896d-9418-187655187532"
    - stage: seal
      stageUuid: "3e059415-bbed-8eb7-a694-938a7978b483"
    - stage: uuid
      stageUuid: "e4e941b6-1028-8294-8108-74ab4da0adc3"
version: 2
---
# authenticated/or/published — draft for auth, published for anonymous

A two-branch [[access]] predicate. If `req.user` exists it grants full access (`true`, drafts included); otherwise it returns the `wherePublished` row filter from [[scope]], restricting anonymous callers to rows whose version status is published. Draft visibility is thus an authenticated-only privilege.

Matter-twin: `src/authenticated/or/published/index.ts` (`authenticatedOrPublished` ⇒ `true | wherePublished`). Composes [[access]] · [[auth]] · [[scope]].

**Law — [[law]]: draft visibility is authenticated-only — a session grants full [[access]], an anonymous caller is filtered to published rows via [[scope]]'s `wherePublished`.**
