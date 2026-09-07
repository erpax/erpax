---
name: by
description: "Use when stamping the authoring user onto a row on first save without trusting client input — a beforeChange hook that auto-populates createdBy from the request user, only on create, only when not already set."
atomPath: "auto/populate/created/by"
coordinate: "auto/populate/created/by · 5/round · eccb3da5"
contentUuid: "2b777b83-4b70-51f9-8aa0-b7805c8a603e"
diamondUuid: "9c8d1e42-8761-8197-98ed-636e426b7def"
uuid: "eccb3da5-d08b-8fd8-b089-ed7db071b8f0"
horo: 5
typography:
  partition: auto
  bondDegree: 15
standards:
  - "SOC-2 CC4.1 monitoring-and-evaluation"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "9e3c4ca5-472c-8177-9aaa-d1e9964a9ef0"
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
      stageUuid: "c05a49be-0421-8ec0-b455-bc46edb2ffc4"
    - stage: seal
      stageUuid: "e89a784d-80de-8159-b2f7-b172a4cddd21"
    - stage: uuid
      stageUuid: "73aa7e9e-b6d7-88dd-8398-473ff6797d59"
version: 2
---
# auto/populate/created/by — authorship attribution on create

A Payload `beforeChange` [[hooks]] that records WHO authored a row, server-side, at the moment of creation. It writes `data.createdBy = req.user.id` only when the operation is `create`, a request user exists, and `createdBy` is not already set — so client-supplied authorship can never be trusted or overwritten. The companion to the tenant auto-populate, it is the [[audit]] trail's authorship leg.

Matter-twin: `src/auto/populate/created/by/index.ts` — `autoPopulateCreatedBy` (a `CollectionBeforeChangeHook`). One of the [[auto]]-populate control gates ([[hooks]]).

**Law — [[law]]: authorship is stamped by the server, never the client — `createdBy` is set once, only on create, only from the request [[user]], and only when absent, so the [[audit]] trail's author cannot be forged.**

@audit ISO-19011:2018 audit-trail authorship-attribution
