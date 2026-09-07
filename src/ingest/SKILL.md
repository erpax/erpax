---
name: ingest
description: "Use when pulling external records into the mesh idempotently — each record is content-addressed (a uuid), so re-fetching unchanged data is a no-op and only new or changed records are upserted. planIngest splits a batch into upsert vs skip against the already-seen uuids, deduping within the batch too. The fetch and the DB write are runtime boundaries; the idempotency plan is native and tested. Serves the Google Workspace sync and any external source."
atomPath: ingest
coordinate: "ingest · 2/share · d810e573"
contentUuid: "29492526-e6bb-5fe2-a21f-35775f6cecae"
diamondUuid: "29dd5d5a-9b23-837c-a8b0-831cf1935ed0"
uuid: "d810e573-d4e7-8faf-9fd7-972093d33908"
horo: 2
typography:
  partition: ingest
  bondDegree: 40
standards:
  - "idempotent upsert by content-address (re-runnable, no cursor needed)"
bindings: []
signatures:
  computationUuid: "4e51710e-3014-84ed-9d5d-1c41a579b88d"
  stages:
    - stage: path
      stageUuid: "94b52b4d-9c52-8546-a22e-719a78a015e7"
    - stage: trinity
      stageUuid: "bf798111-aa46-8f8e-8fc9-19d438cd4ae6"
    - stage: boundary
      stageUuid: "0e0151b6-8069-8264-991c-78a1880ddbc3"
    - stage: links
      stageUuid: "8f2de1f1-f119-8a74-a3b2-11050edba2d0"
    - stage: horo
      stageUuid: "71798f5a-b735-858b-b48b-f5570e861149"
    - stage: seal
      stageUuid: "8595da88-2979-8540-8aae-229af871b5fd"
    - stage: uuid
      stageUuid: "14cace44-086b-8a6e-877c-37392f63edc2"
version: 2
---
# ingest — idempotent, content-addressed ingest (re-fetch is a no-op)

FORM: **ingest is idempotent because identity is content.** Each incoming record carries a content-uuid ([[identity]]); `planIngest(records, seen)` upserts a record IFF its uuid is not already seen — a NEW record (never seen) or a CHANGED one (changed content ⇒ new uuid) is upserted, an unchanged one is skipped. Re-running the same fetch ⇒ every uuid already seen ⇒ all skip — the fetch is a no-op, no duplicates, no coordination ([[merge]]: same content ⇒ one). The batch is deduped against itself too, so the same record appearing twice in one pull collapses to one upsert.

This is the orchestration layer over [[google/workspace]] fusion (and any source): fetch → `fuseWorkspaceResource` (content-address) → `planIngest` → upsert the plan. The FETCH (the provider call, gated by [[oauth]]) and the WRITE (the Payload upsert) are runtime boundaries; the plan — what is new, changed, or unchanged — is pure and tested. Because the dedup key is the content-uuid, two erpax instances ingesting the same source converge with no shared cursor ([[federation]]) and a partial/retried sync is always safe to re-run ([[flow]]).

Matter-twin: `src/services/ingest/index.ts` (`AddressedRecord`·`IngestPlan`·`planIngest`) + `index.test.ts`. Composes: [[identity]] · [[merge]] · [[google/workspace]] · [[oauth]] · [[flow]] · [[federation]] · [[self]].

## Standards

- idempotent upsert by content-address (re-runnable, no cursor needed)

## Common mistakes
- Tracking a per-source cursor/watermark to avoid re-processing — unnecessary; the content-uuid makes re-fetch a no-op, so a full re-pull is always safe and self-correcting.
- Upserting on every fetch — only upsert the `plan.upsert` set (changed/new); unchanged records skip, sparing the write path.
- Deduping only against the store, not the batch — `planIngest` dedups within the batch too, so one pull never double-writes the same uuid.

**Law — [[law]]: ingest is idempotent because [[identity]] is content — a record upserts IFF its content-uuid is unseen, so re-fetching unchanged data is a no-op and re-runs are always safe ([[merge]]: same content ⇒ one).**
