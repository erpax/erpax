---
name: by
description: "Use when stamping the authoring user onto a row on first save without trusting client input — a beforeChange hook that auto-populates createdBy from the request user, only on create, only when not already set."
atomPath: "auto/populate/created/by"
coordinate: "auto/populate/created/by · 8/crest · be5dcb48"
contentUuid: "c0cb15b5-68a2-5d18-b664-9eb086c8d9ae"
diamondUuid: "a80f9d9d-44c7-86ab-9bfa-05199ab8a1e7"
uuid: "be5dcb48-844e-892f-929a-ede865f53dad"
horo: 8
typography:
  partition: auto
  bondDegree: 12
standards:
  - "SOC-2 CC4.1 monitoring-and-evaluation"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "86df6d74-2de1-88d5-84cd-e162a822821a"
  stages:
    - stage: path
      stageUuid: "2b7854ab-dfb4-8404-86b3-214533527913"
    - stage: trinity
      stageUuid: "3d62bf8c-93e8-818a-ba15-8c50b0e359f8"
    - stage: boundary
      stageUuid: "8571616d-f559-82d5-8743-f08cbaa6eb4e"
    - stage: links
      stageUuid: "b4e70854-fde4-8380-9f5f-c6b18651f703"
    - stage: horo
      stageUuid: "1ccb86b5-f6ee-8f98-a7fa-a0dda92609a2"
    - stage: seal
      stageUuid: "e89a784d-80de-8159-b2f7-b172a4cddd21"
    - stage: uuid
      stageUuid: "d54ab69f-4f59-8432-bb55-642830f3fb24"
version: 2
---
# auto/populate/created/by — authorship attribution on create

A Payload `beforeChange` [[hooks]] that records WHO authored a row, server-side, at the moment of creation. It writes `data.createdBy = req.user.id` only when the operation is `create`, a request user exists, and `createdBy` is not already set — so client-supplied authorship can never be trusted or overwritten. The companion to the tenant auto-populate, it is the [[audit]] trail's authorship leg.

Matter-twin: `src/auto/populate/created/by/index.ts` — `autoPopulateCreatedBy` (a `CollectionBeforeChangeHook`). One of the [[auto]]-populate control gates ([[hooks]]).

**Law — [[law]]: authorship is stamped by the server, never the client — `createdBy` is set once, only on create, only from the request user, and only when absent, so the [[audit]] trail's author cannot be forged.**

@audit ISO-19011:2018 audit-trail authorship-attribution
