---
name: by
description: "Use when stamping the authoring user onto a row on first save without trusting client input — a beforeChange hook that auto-populates createdBy from the request user, only on create, only when not already set."
atomPath: auto/populate/created/by
coordinate: auto/populate/created/by · 2/share · 453e4e42
contentUuid: "d71944eb-637b-564a-9456-f042f1562674"
diamondUuid: "4ae722bc-a4d5-8b7f-9a99-57f28389de1e"
uuid: "453e4e42-1a7a-8470-95e3-f3a335f74f69"
horo: 2
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
  - "ISO-19011:2018 audit-trail authorship-attribution"
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
  computationUuid: "bfc74420-f479-8189-b2cc-00d0e1d2fc7a"
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
      stageUuid: "daadc93e-bfab-8ab9-834e-1ecbac971b35"
    - stage: seal
      stageUuid: "e89a784d-80de-8159-b2f7-b172a4cddd21"
    - stage: uuid
      stageUuid: "077d3d70-0bb0-8844-be8b-9362dc89c61a"
version: 2
---
# auto/populate/created/by — authorship attribution on create

A Payload `beforeChange` [[hooks]] that records WHO authored a row, server-side, at the moment of creation. It writes `data.createdBy = req.user.id` only when the operation is `create`, a request user exists, and `createdBy` is not already set — so client-supplied authorship can never be trusted or overwritten. The companion to the tenant auto-populate, it is the [[audit]] trail's authorship leg.

Matter-twin: `src/auto/populate/created/by/index.ts` — `autoPopulateCreatedBy` (a `CollectionBeforeChangeHook`). One of the [[auto]]-populate control gates ([[hooks]]).

**Law — [[law]]: authorship is stamped by the server, never the client — `createdBy` is set once, only on create, only from the request [[user]], and only when absent, so the [[audit]] trail's author cannot be forged.**

@audit ISO-19011:2018 audit-trail authorship-attribution
