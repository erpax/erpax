---
name: workphases
description: Use when modeling the reusable work-phase (operation) catalog — the routing vocabulary (sewing/cutting/buttonholes/steaming/embroidery/dyeing/finishing) a lot is produced through, a self-referential tree with standard time.
---

# workphases — the operation catalog (the routing vocabulary, a tree)

A `work-phase` is a *kind* of process step (CONFEZIONE/sewing, TAGLIO/cutting, OCCHIELLI/buttonholes, STIRO/steaming, RICAMO/embroidery, TINTORIA/dyeing, RIFINITURA/finishing …) independent of any one [[lots|lot]] — the industry-agnostic unit a routing is composed of. It is the **catalog** the routing step [[lotworkphases]] crosses to: each step points OUT to one phase here and adds per-lot time + order. The ISA-95 sibling of [[operations]].

## The data-truth (etrima `work_phases`, N=41 854)
- **It is a TREE** — 20 329 roots ⊕ 21 525 children via the Rails `ancestry` materialized path. Modeled as a self-referential `parent` (the [[coordinate]] axis — a phase contains sub-phases). `@invariant tree`: acyclic, a phase is never its own ancestor.
- **`kind` is the operation family** — CONFEZIONE (sewing) dominates (~26k), then OCCHIELLI/RIFINITURA/TAGLIO/RICAMO/TINTORIA/STIRO. **Open vocabulary**, not a closed enum — 20 yrs of real shop-floor names (generic-naming law).
- **`archived` is 100% NULL** — a dead column. Dropped; lifecycle is `status` (active/inactive).
- `machineType`/`workSeconds`/`skillLevel` describe the standard resource + standard time the phase runs at — **the rate anchor** ([[accounting]] — pay = anchor × verified time; ISO-22400-2 standard-time).

## The cross
This catalog has no transactional funnel of its own — its balance comes from being **referenced** ([[coordinate]]: ≥2 crosses). [[lotworkphases]] crosses IN (every routing step names a phase here, 100% in etrima — [[merge]]: same phase ⇒ same id), and `parent` crosses self (the tree). The standard time set here is what each routing step's *realized* time is measured against.

Matter-twin: `src/workphases/index.ts`. Composes [[coordinate]] · [[accounting]] · [[merge]] · [[operations]] · [[lotworkphases]] · [[lots]].
