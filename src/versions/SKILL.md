---
name: versions
description: "Use when enabling or debugging Payload versions, drafts, autosave, or scheduled publish — version history, draft/published status, restoring versions, or controlling how many versions are kept."
atomPath: versions
coordinate: "versions · 5/round · 90b99353"
contentUuid: "edb99a38-5751-523d-b785-e6ca6917b2a4"
diamondUuid: "2e0b0406-8f60-81d2-b484-f231888a3614"
uuid: "90b99353-0b76-8112-9745-0e275947e8a7"
horo: 5
typography:
  partition: versions
  bondDegree: 116
standards: []
bindings: []
signatures:
  computationUuid: "e6a2be53-77aa-8e37-b7a2-151a4891e6fb"
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
      stageUuid: "24a39cb2-48ed-8263-8dc9-cce86182fb95"
    - stage: seal
      stageUuid: "0394d9a9-3d98-84f9-a470-d96c53b0e150"
    - stage: uuid
      stageUuid: "0ebd694f-1941-824a-9e8e-5564b5e2375b"
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
