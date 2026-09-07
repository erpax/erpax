---
name: by
description: "Use when stamping the authoring user onto a row on first save without trusting client input — a beforeChange hook that auto-populates createdBy from the request user, only on create, only when not already set."
atomPath: "auto/populate/created/by"
coordinate: "auto/populate/created/by · 8/crest · c525679e"
contentUuid: "08a4713f-83d9-5a6a-883d-a292bd2a1885"
diamondUuid: "8fc4b87d-9ec6-8c0a-b410-8bb3701bdba1"
uuid: "c525679e-bae9-88ef-a9b2-312037a51228"
horo: 8
typography:
  partition: auto
  bondDegree: 15
standards:
  - "SOC-2 CC4.1 monitoring-and-evaluation"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "182ce58b-5f6b-852b-a910-b8e24247e792"
  stages:
    - stage: path
      stageUuid: "2b7854ab-dfb4-8404-86b3-214533527913"
    - stage: trinity
      stageUuid: "3d62bf8c-93e8-818a-ba15-8c50b0e359f8"
    - stage: boundary
      stageUuid: "8571616d-f559-82d5-8743-f08cbaa6eb4e"
    - stage: links
      stageUuid: "5a17be39-ec30-859e-b8e6-0056e340056c"
    - stage: horo
      stageUuid: "fcb1c6f0-f753-8199-9d71-6c6e4994431b"
    - stage: seal
      stageUuid: "e89a784d-80de-8159-b2f7-b172a4cddd21"
    - stage: uuid
      stageUuid: "f4e186c4-6596-8b0e-b48b-d407fc63555e"
version: 2
---
# auto/populate/created/by — authorship attribution on create

A Payload `beforeChange` [[hooks]] that records WHO authored a row, server-side, at the moment of creation. It writes `data.createdBy = req.user.id` only when the operation is `create`, a request user exists, and `createdBy` is not already set — so client-supplied authorship can never be trusted or overwritten. The companion to the tenant auto-populate, it is the [[audit]] trail's authorship leg.

Matter-twin: `src/auto/populate/created/by/index.ts` — `autoPopulateCreatedBy` (a `CollectionBeforeChangeHook`). One of the [[auto]]-populate control gates ([[hooks]]).

**Law — [[law]]: authorship is stamped by the server, never the client — `createdBy` is set once, only on create, only from the request [[user]], and only when absent, so the [[audit]] trail's author cannot be forged.**

@audit ISO-19011:2018 audit-trail authorship-attribution
