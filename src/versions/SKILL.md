---
name: versions
description: "Use when enabling or debugging Payload versions, drafts, autosave, or scheduled publish — version history, draft/published status, restoring versions, or controlling how many versions are kept."
atomPath: versions
coordinate: "versions · 7/descent · e3348ad3"
contentUuid: "892f5777-5e19-52f9-b656-479a69db7860"
diamondUuid: "7994efe5-f97e-8e0f-ab42-d0b0a3749786"
uuid: "e3348ad3-c5fd-8798-8f70-0a0e98c1e4bb"
horo: 7
typography:
  partition: versions
  bondDegree: 0
standards: []
bindings: []
signatures:
  computationUuid: "48af16d6-e5be-818b-b6c0-551dc59ca572"
  stages:
    - stage: path
      stageUuid: "5c2cde25-082b-8409-844f-f8335c7036cd"
    - stage: trinity
      stageUuid: "4a19559c-a492-8472-b479-f399767d9409"
    - stage: boundary
      stageUuid: "146b523f-8e0d-8543-98bf-34b085bcbe8e"
    - stage: links
      stageUuid: "9e25457a-2bdb-877e-b052-4842b4ea2923"
    - stage: horo
      stageUuid: "cc2cf0f1-9f3f-89d9-92ba-5b1ba21beee4"
    - stage: seal
      stageUuid: "9460ac6a-c9a4-8f6e-aad3-7313ea7f664f"
    - stage: uuid
      stageUuid: "bffceb96-be27-854f-8834-eccdce1f0fa4"
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
