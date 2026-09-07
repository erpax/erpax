---
name: versions
description: "Use when enabling or debugging Payload versions, drafts, autosave, or scheduled publish — version history, draft/published status, restoring versions, or controlling how many versions are kept."
atomPath: versions
coordinate: "versions · 1/base · d20a5610"
contentUuid: "a4956b18-b14c-5e01-b25f-ff0b7b12f025"
diamondUuid: "bba2767c-b1ff-8b66-94e4-37c6210c6957"
uuid: "d20a5610-be15-8d9e-9409-8e8bd75ea77e"
horo: 1
typography:
  partition: versions
  bondDegree: 116
standards: []
bindings: []
signatures:
  computationUuid: "62cc7613-77ca-8dfd-a098-82ae88ad2252"
  stages:
    - stage: path
      stageUuid: "5c2cde25-082b-8409-844f-f8335c7036cd"
    - stage: trinity
      stageUuid: "edc21d79-e862-80f0-910a-b8646638ac28"
    - stage: boundary
      stageUuid: "4f4a40cc-8bba-8f4a-9f94-efbd276d3909"
    - stage: links
      stageUuid: "9e25457a-2bdb-877e-b052-4842b4ea2923"
    - stage: horo
      stageUuid: "23f6f08f-8972-8ded-b3d1-b74e0548a1b9"
    - stage: seal
      stageUuid: "0394d9a9-3d98-84f9-a470-d96c53b0e150"
    - stage: uuid
      stageUuid: "e6046437-3aac-8998-8a20-054b034eb3e9"
version: 2
---
# versions — drafts, autosave, history

Enable per collection/global via `versions`. Each save can create a version; documents gain a draft/published lifecycle.

## The versioning cross — all is versioned

Payload's per-collection `versions:` flag (below) is the **narrow view** — only the content collections opt in. The **universal view**: *all* is versioned, because every content-uuid'd entity already is one. A version is just a **content-addressed leaf** ([[uuid]]) — and the *same* leaf reads three ways (the cross, sibling to the [[access]] role×capability cross):

- **VERSION** — the content-uuid IS the version id. Change the content ⇒ a new leaf; identical content ⇒ the same leaf (a no-op write is not a new version, and two replicas agree — [[merge]]).
- **TAMPER-COST** — the leaf is forge-evident; forging version *N* means rewriting the *N* prior leaves too, so a deeper history is a costlier forgery ([[tamper/cost]]). At full coverage the cost is ∞ — the [[localize]] fusion law. It is the [[angel]]/archangel entropy ledger: each version is one more debit a tamper must pay.
- **ANALYTICS** — the leaf is a timestamped change-event, the raw data-point of the change-stream (aggregates, [[horo]] bands, the [[akashic]]/[[proof]] trail).

`src/versions/cross` is the matter-twin: `versionCross({ content, tenantId, seq, … }) → { uuid, prevUuid, tamper, event }` composes the three existing services (content-uuid · tamper-cost · the event tuple) with **no new storage**. "Another cross of tampering costs and analytics" — the content-uuid is the join point of both axes.

## Payload versions (the narrow view) — config
```ts
versions: {
  maxPerDoc: 100,                 // 0 = unlimited
  drafts: {
    autosave: { interval: 800 },  // ms; or true
    schedulePublish: true,        // publish at a future date
    validate: false,              // validate drafts?
  },
}
```
`versions: true` enables history without drafts. `drafts: true` enables the draft/published split.

## Behavior & API
- `_status` field: `'draft' | 'published'`.
- Read drafts: pass `draft: true` to find/findByID (returns latest draft if newer).
- Operations: version list, `findVersionByID`, `restoreVersion`, `publish`/`unpublish`.
- Access: `readVersions` access controls who sees history (see [[access]]).

## Common mistakes
- Expecting public reads to return drafts — they return published unless `draft: true`.
- Unbounded `maxPerDoc: 0` on high-churn collections → table bloat.
- Forgetting drafts change default read behavior in the frontend (filter `_status`).

**Law — [[law]]: all is versioned because every content-uuid'd entity already is — a version is a content-addressed leaf ([[uuid]]: change content ⇒ new leaf, identical content ⇒ same leaf, [[merge]]), read three ways (version · [[tamper]]-cost · analytics) with no new storage.**
