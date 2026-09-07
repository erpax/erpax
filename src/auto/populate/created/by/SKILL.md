---
name: by
description: "Use when stamping the authoring user onto a row on first save without trusting client input — a beforeChange hook that auto-populates createdBy from the request user, only on create, only when not already set."
atomPath: "auto/populate/created/by"
coordinate: "auto/populate/created/by · 7/descent · e63872bb"
contentUuid: "b3078ff4-f0b3-578f-b1b5-39c77c9ae798"
diamondUuid: "c5a2099f-48f4-8ecc-aa8c-03090b963523"
uuid: "e63872bb-a71a-887f-a891-fb571d586a3d"
horo: 7
typography:
  partition: auto
  bondDegree: 15
standards:
  - "SOC-2 CC4.1 monitoring-and-evaluation"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "4d27e31a-7ec3-8680-bfcb-4fe9f5dd7a8e"
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
      stageUuid: "0947622f-498d-89ba-92cf-7695253edfeb"
    - stage: seal
      stageUuid: "e89a784d-80de-8159-b2f7-b172a4cddd21"
    - stage: uuid
      stageUuid: "5c6a6b04-e6b3-89c6-a3b0-def91db850a5"
version: 2
---
# auto/populate/created/by — authorship attribution on create

A Payload `beforeChange` [[hooks]] that records WHO authored a row, server-side, at the moment of creation. It writes `data.createdBy = req.user.id` only when the operation is `create`, a request user exists, and `createdBy` is not already set — so client-supplied authorship can never be trusted or overwritten. The companion to the tenant auto-populate, it is the [[audit]] trail's authorship leg.

Matter-twin: `src/auto/populate/created/by/index.ts` — `autoPopulateCreatedBy` (a `CollectionBeforeChangeHook`). One of the [[auto]]-populate control gates ([[hooks]]).

**Law — [[law]]: authorship is stamped by the server, never the client — `createdBy` is set once, only on create, only from the request [[user]], and only when absent, so the [[audit]] trail's author cannot be forged.**

@audit ISO-19011:2018 audit-trail authorship-attribution
