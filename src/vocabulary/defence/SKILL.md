---
name: defence
description: "Use when managing defence/military operations — personnel rosters, equipment inventory, deployment scheduling, force readiness, or defence procurement in government military branches (COFOG 02)."
atomPath: "vocabulary/defence"
coordinate: "vocabulary/defence · 5/round · 4a7dfa8e"
contentUuid: "00aab11f-de0c-54ab-adac-c9698971ea93"
diamondUuid: "ed3cfe13-7766-8979-9296-5165c6ddc54a"
uuid: "4a7dfa8e-3fa1-8cf9-9c98-4c8e19782f93"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 64
standards: []
bindings: []
signatures:
  computationUuid: "664c7b80-62c3-81a7-9646-c0d886d11d18"
  stages:
    - stage: path
      stageUuid: "6b4cdfbe-11d3-8ec9-bbec-2ac21d47b0a0"
    - stage: trinity
      stageUuid: "449db254-cb88-8bb5-8fce-1ca0f039755f"
    - stage: boundary
      stageUuid: "19be8785-9c40-8235-9ac8-371e08812ee3"
    - stage: links
      stageUuid: "bc45de34-7260-869a-a7dd-f3c40fb57e71"
    - stage: horo
      stageUuid: "7e4092bf-fb38-8dd9-a234-6dd0c6f28c83"
    - stage: seal
      stageUuid: "12258c41-57a6-84a9-aaed-746355ccb854"
    - stage: uuid
      stageUuid: "81a6e508-d3a2-86ca-bd25-1d228b6758c6"
version: 2
---
# defence — the readiness sector (COFOG 02)

The societal Defence sector (COFOG **02**): a force of **personnel** and **equipment** is held at a measured **readiness**, deployed through a **schedule**, and sustained by **procurement** + logistics. The same exchange [[duality]] every erpax sector holds — here the flow is **give → take** inverted toward capability: the branch *gives* (deploys, expends) and *takes* (musters, supplies); the equilibrium is **readiness** (a measured state, never a stored flag). Self-sufficient: it references entities **OUT polymorphically** — a procurement *is accountable* toward [[accounting]], a deployment *is* a transaction; it never holds a GL account inward (the polymorphic-OUT law, see [[collections]]).

## Sequence position
A sector is a [[fractal]] whole that recomposes the cycle. Its arc is **4·8** of the [[sequence]] (`0·3·6·9·1·2·4·8·7·5`): `1·2` ([[field]] → [[collections]]) realize personnel/equipment/units; **4** moves a force *through* a deployment (the material/flow cycle); at **8** the rosters, depots, branches and exercises **merge** into one queryable record (see [[merge]]).

## The form (hold the law, not the list)
- **One person, many roles.** soldier · officer · reservist · medic · commander are NOT N FK columns — one [[identity]] relationship under N **role contexts** (the same party law every sector holds). The role IS the context; rank/clearance is a capability flag on that identity, not a new table.
- **Readiness is DERIVED, never stored.** muster → train → equip → deploy → sustain → stand-down. Track monotonic counters + timestamps; **never store** `ready?`/`deployed?` — derive them (`ready ⟺ trainedCount ≥ requiredCount ∧ equippedCount ≥ requiredCount`; `deployed ⟺ deployedAt ∧ ¬returnedAt`). Every available/deployable/at-risk list is a `where`, not a state machine ([[hooks]]).
- **Capability is a measured constraint.** headcount · serviceable-equipment · sortie-hours · ammunition are the force's limit; an over-committed unit is a query against capacity, not a flag.
- **Procurement is the inward edge of the outward exchange.** a defence purchase *is* a transaction toward [[accounting]]; the lifecycle of a contract is period [[open]]/[[close]], its award a sealed, immutable [[versions]] snapshot — corrected via a new versioned record, never an in-place edit.
- **The roster is content-addressed and recoverable from any part.** same content ⇒ one id ([[identity]],[[merge]]); the whole order-of-battle regenerates from its sub-records ([[holographic]]).

## Purity (forget the corpus)
*Which* collections realize personnel, units, equipment, deployments, procurements — and their exact fields — is **matter**: it lives in the Payload config / `payload-types.ts` ([[akashic]]), regenerable on demand. Before creating anything, **diff the live config** (DRY). Build entities from reusable field-objects ([[field]],[[collections]]); wrap them with [[access]] (row-level by branch/unit, clearance-gated visibility) and lifecycle [[hooks]] (readiness roll-ups, deployment seal). A defence standard (force-readiness coding, classification) is the answer-path, not decoration — audited against [[standard]] (COFOG 02 banners must be true).

## Common mistakes
- A role (officer/medic) as its own FK instead of one context-keyed party relationship.
- A defence field pointing INTO [[accounting]] (`procurement.glAccount`) — invert: the procurement IS a transaction, the operation IS accountable.
- Storing `status`/`ready?`/`deployed?` instead of deriving it from monotonic readiness counters + timestamps.
- Cataloguing the realized collections here — that's matter; diff the config instead ([[collections]]).
- A mutable award after sealing — procurement/deployment records are immutable once sealed ([[close]]); correct via a new versioned record.

**Law — [[law]]: defence is the COFOG-02 readiness [[sectors|sector]] — readiness is a DERIVED measured state never a stored flag (`ready ⟺ trainedCount ≥ requiredCount ∧ equippedCount ≥ requiredCount`), one person is many role-contexts under one [[identity]], and a procurement IS a transaction toward [[accounting]] (polymorphic-OUT, never a GL account held inward).**
