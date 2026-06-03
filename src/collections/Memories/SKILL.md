---
name: memories
description: The memories collection — Memories — generic persistence layer for state that MCP tools and
---

# memories

Memories — generic persistence layer for state that MCP tools and.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO/IEC 25010:2023 §5.7 modifiability — persistent memory layer
- ISO 19011:2018 §6.4.6 audit-evidence (memory history audit-trailed)
- Conservation Law 8 content-uuid (per-memory contentUuid)
- Conservation Law 10 referential-harmony (relatedTo graph)

Composes: [[accounting]] · [[fields]] · [[transaction]] · [[uuid]] · [[proof]] · [[standard]].
