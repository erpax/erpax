---
name: capacity
description: "Use when reasoning about erpax's production hardware — the Cloudflare edge (Worker isolate, D1, R2, Durable Objects) has hard limits, and CLOUDFLARE_LIMITS declares them with sources. productionCapacity(cwd) computes erpax's demand vs each; the decisive one is the 80MB skill index against the 3MB Worker script limit (27× over), deployable only because it is never bundled. assertFitsProduction refuses a deploy where the worker entry imports the index — the discipline made a theorem. Models the ceiling; the actual built artifact needs a build to measure."
---

# capacity — the production hardware, computed against erpax's demand

erpax has no servers of its own. Its **hardware is the Cloudflare edge** — a Worker isolate (the CPU + RAM), D1 (the disk), R2 (the object store), Durable Objects (the stateful cores). That hardware has hard ceilings, and "does erpax fit" is not a matter of taste — it is arithmetic over the real limits.

## The decisive number

```
skills.index.ts   ~80 MB   vs   3 MB   Worker gzipped script limit   →   27× over
```

The corpus skill index is **80 MB**. A Worker script may be **3 MB compressed**. If that file ever reached the shipped bundle, the deploy would be **rejected by the edge** — not slow, *impossible*. erpax is deployable for exactly one reason: it **never bundles it**. [[skill]]/router keeps the index a build-time artifact; [[agent]]/skill-context's `realiseSkillsForPath` loads sealed excerpts lazily at runtime. The 80 MB is on the disk, never in the isolate.

`workerImportsSkillIndex(cwd)` makes that discipline a **theorem, not a habit**: it reads the worker entry points (`payload.config.ts`, `next.config.ts`, `open-next.config.ts`) and asks whether any of them imports the index. Today: no — `assertFitsProduction` passes, the bundle fits. The day someone adds `import … from '@/skill/router/skills.index'` for convenience, the gate refuses the deploy **before** the edge does, with the reason spelled out.

## The model — declared, arguable, sourced

`CLOUDFLARE_LIMITS` is the production ceiling written once, in the open, each with its source: Worker 3 MB script / 128 MB memory / 30 s CPU; D1 10 GB per database, **100 columns per table** (the cap that forced `search_rels` into a content-uuid group); Durable Object 128 MB; KV 25 MB value; R2 unbounded. `productionCapacity(cwd)` computes erpax's demand against each and reports headroom.

## The second D1 cap — measured, and it fits

D1's other hard limit is **100 columns per table**, the one that forced `search_rels` into a content-uuid group. `widestD1Table` reads the committed drizzle snapshot — the *actual* generated schema — and finds the widest: **`_invoices_v` at 86 / 100.** Zero of 988 tables exceed the cap.

This is the corpus's own *trust the theorem, not the eye* law paid again. The `payload-types` interface field-count *looks* alarming — `InternalAuditFunction` has 139 fields, `AuditCommitteeMinute` 121 — but that is a heuristic that **over-counts**: an array or relation looks like a field yet becomes its **own** D1 table. The snapshot is the theorem; it says erpax fits with 14 columns of headroom, and `assertFitsProduction` now gates it.

**Honest boundary.** This proves the shipped bundle **excludes the one file that would blow it** and reads the **real per-table column count** from the committed snapshot — it does not measure the *actual* built `.open-next` bundle (that needs a build) nor the D1 database *size* in GB (that needs live data). It closes the two failures decidable from the source — the import and the schema — and names the rest as build-time measurements. A soft limit (D1 size, CPU ms) is a scaling concern, not a deploy blocker, reported but not gated.

**Law — [[law]]: the hardware is finite and its limits are known. erpax fits the Cloudflare edge because it never ships the 80 MB index — and that is now computed at the entry points, not trusted to discipline.**

## Standards

- **Cloudflare Workers / D1 / R2 / Durable Objects platform limits (2025)** — the production ceiling.
- **ISO/IEC 25010:2023 §5.7** — resource utilisation: demand within the platform's capacity.

Composes: [[cloudflare]] · [[skill]] · [[agent]] · [[law]].
