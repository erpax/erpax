---
name: versions
description: "Use when enabling or debugging Payload versions, drafts, autosave, or scheduled publish — version history, draft/published status, restoring versions, or controlling how many versions are kept."
atomPath: versions
coordinate: "versions · 4/weave · 42687f7a"
contentUuid: "5e0dcdb9-8c78-5b2a-b150-19f7ec97aba9"
diamondUuid: "abbe2ed3-ec0a-80e0-99e2-922120632fbc"
uuid: "42687f7a-2b34-8315-9900-f362b8f1fc67"
horo: 4
typography:
  partition: versions
  bondDegree: 116
standards: []
bindings: []
signatures:
  computationUuid: "99ea069f-1e15-8422-92e3-2bc5c6b2b385"
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
      stageUuid: "c7ebcfb5-7153-8222-a6ff-21e2f8e07c48"
    - stage: seal
      stageUuid: "0394d9a9-3d98-84f9-a470-d96c53b0e150"
    - stage: uuid
      stageUuid: "264b70cb-7526-8ed9-b5e1-5d38f705a95a"
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
