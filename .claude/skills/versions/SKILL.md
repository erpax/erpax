---
name: versions
description: Use when enabling or debugging Payload versions, drafts, autosave, or scheduled publish — version history, draft/published status, restoring versions, or controlling how many versions are kept.
---

# versions — drafts, autosave, history

Enable per collection/global via `versions`. Each save can create a version; documents gain a draft/published lifecycle.

## Config
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
