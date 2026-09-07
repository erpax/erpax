---
name: published
description: "Use when a Payload collection should show drafts to logged-in users but only published versions to anonymous callers — the access predicate that grants `true` to a session and otherwise returns the published-only Where filter."
atomPath: "authenticated/or/published"
coordinate: "authenticated/or/published · 1/base · 49fe6ee1"
contentUuid: "43a93930-27dc-5a1f-a1a5-69ad60842c6f"
diamondUuid: "2f4263ba-af41-8159-b83f-ef2b2a463c92"
uuid: "49fe6ee1-6c5b-855c-8df4-20da465ebaad"
horo: 1
typography:
  partition: authenticated
  bondDegree: 14
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "ca730531-aaac-8a50-8da2-d54ed364deb2"
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
      stageUuid: "d7ed0c3d-e7d4-8b8d-ad5b-0e5a161db0e1"
    - stage: seal
      stageUuid: "3e059415-bbed-8eb7-a694-938a7978b483"
    - stage: uuid
      stageUuid: "c5444cc7-6acc-854b-baff-3f4f5d626c65"
version: 2
---
# authenticated/or/published — draft for auth, published for anonymous

A two-branch [[access]] predicate. If `req.user` exists it grants full access (`true`, drafts included); otherwise it returns the `wherePublished` row filter from [[scope]], restricting anonymous callers to rows whose version status is published. Draft visibility is thus an authenticated-only privilege.

Matter-twin: `src/authenticated/or/published/index.ts` (`authenticatedOrPublished` ⇒ `true | wherePublished`). Composes [[access]] · [[auth]] · [[scope]].

**Law — [[law]]: draft visibility is authenticated-only — a session grants full [[access]], an anonymous caller is filtered to published rows via [[scope]]'s `wherePublished`.**
