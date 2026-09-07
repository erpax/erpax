---
name: published
description: "Use when a Payload collection should show drafts to logged-in users but only published versions to anonymous callers — the access predicate that grants `true` to a session and otherwise returns the published-only Where filter."
atomPath: "authenticated/or/published"
coordinate: "authenticated/or/published · 2/share · 04d5e669"
contentUuid: "fb1ff296-71c4-557e-af3c-3ca76b9a28b4"
diamondUuid: "25226904-915e-81f7-9ec8-e7adb8d293e7"
uuid: "04d5e669-8b29-8825-a6e6-4b4739c30987"
horo: 2
typography:
  partition: authenticated
  bondDegree: 14
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "83b2ae86-6d1f-89b7-b6dd-f87bc33e4253"
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
      stageUuid: "0aae02d6-fb8d-8167-9a71-23d12795f513"
    - stage: seal
      stageUuid: "3e059415-bbed-8eb7-a694-938a7978b483"
    - stage: uuid
      stageUuid: "ccf4c7e0-ce47-8ba7-824f-1ebe6073277b"
version: 2
---
# authenticated/or/published — draft for auth, published for anonymous

A two-branch [[access]] predicate. If `req.user` exists it grants full access (`true`, drafts included); otherwise it returns the `wherePublished` row filter from [[scope]], restricting anonymous callers to rows whose version status is published. Draft visibility is thus an authenticated-only privilege.

Matter-twin: `src/authenticated/or/published/index.ts` (`authenticatedOrPublished` ⇒ `true | wherePublished`). Composes [[access]] · [[auth]] · [[scope]].

**Law — [[law]]: draft visibility is authenticated-only — a session grants full [[access]], an anonymous caller is filtered to published rows via [[scope]]'s `wherePublished`.**
