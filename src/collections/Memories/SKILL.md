---
name: memories
description: Use when persisting MCP tool results or agent state across restarts — fix proposals, strategy decisions, drift-cycle snapshots, agent observations, emerging gaps — keyed by (ownerType, ownerId, kind, key), content-uuid'd for federation (Law 8), with relatedTo graph edges (Law 10). The generic agent-memory persistence layer.
---

# memories

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO/IEC 25010:2023 §5.7 modifiability — persistent memory layer
- ISO 19011:2018 §6.4.6 audit-evidence (memory history audit-trailed)
- Conservation Law 8 content-uuid (per-memory contentUuid)
- Conservation Law 10 referential-harmony (relatedTo graph)

Composes: [[accounting]] · [[fields]] · [[transaction]] · [[uuid]] · [[proof]] · [[standard]].
