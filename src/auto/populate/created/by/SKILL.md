---
name: by
description: "Use when stamping the authoring user onto a row on first save without trusting client input — a beforeChange hook that auto-populates createdBy from the request user, only on create, only when not already set."
atomPath: "auto/populate/created/by"
coordinate: "auto/populate/created/by · 5/round · 410069fd"
contentUuid: "3e5498d7-5985-516a-8903-5095ff08f045"
diamondUuid: "c141f4ba-b7dd-8e7a-80ee-b9bcdc8a0eeb"
uuid: "410069fd-0437-889e-b86d-e94188ace311"
horo: 5
bonds:
  in:
    - audit
    - auto
    - created
    - hooks
    - law
    - user
  out:
    - audit
    - auto
    - hooks
    - law
    - user
typography:
  partition: auto
  bondDegree: 15
  neighbors: []
standards:
  - "SOC-2 CC4.1 monitoring-and-evaluation"
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink:
    - audit
    - auto
    - hooks
    - law
    - user
  matrix:
    - audit
    - auto
    - hooks
    - law
    - user
  backlinks:
    - audit
    - auto
    - hooks
    - law
    - user
signatures:
  computationUuid: "13f6112c-b628-89ba-9ab3-1939536538d0"
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
      stageUuid: "90e18934-0ca8-896d-9719-df33aafb542a"
    - stage: seal
      stageUuid: "e89a784d-80de-8159-b2f7-b172a4cddd21"
    - stage: uuid
      stageUuid: "059058ba-44c5-8889-a8ea-6542c60931f5"
version: 2
---
# auto/populate/created/by — authorship attribution on create

A Payload `beforeChange` [[hooks]] that records WHO authored a row, server-side, at the moment of creation. It writes `data.createdBy = req.user.id` only when the operation is `create`, a request user exists, and `createdBy` is not already set — so client-supplied authorship can never be trusted or overwritten. The companion to the tenant auto-populate, it is the [[audit]] trail's authorship leg.

Matter-twin: `src/auto/populate/created/by/index.ts` — `autoPopulateCreatedBy` (a `CollectionBeforeChangeHook`). One of the [[auto]]-populate control gates ([[hooks]]).

**Law — [[law]]: authorship is stamped by the server, never the client — `createdBy` is set once, only on create, only from the request [[user]], and only when absent, so the [[audit]] trail's author cannot be forged.**

@audit ISO-19011:2018 audit-trail authorship-attribution
