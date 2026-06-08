---
name: defence
description: "Use when managing defence/military operations — personnel rosters, equipment inventory, deployment scheduling, force readiness, or defence procurement in government military branches (COFOG 02)."
atomPath: defence
coordinate: defence · 4/weave · 661fb374
contentUuid: "f90d85f2-4be3-5af1-bcbe-d5a889f4a3bc"
diamondUuid: "37f2cf2f-09fe-8da3-b4e4-f7dfb3ae4eee"
uuid: "661fb374-8d0f-8e58-b86b-d128025c7767"
horo: 4
bonds:
  in:
    - access
    - accounting
    - akashic
    - close
    - collections
    - duality
    - establishment
    - fields
    - fractal
    - holographic
    - hooks
    - identity
    - law
    - merge
    - methods
    - open
    - sectors
    - sequence
    - standard
    - versions
    - war
  out:
    - access
    - accounting
    - akashic
    - close
    - collections
    - duality
    - establishment
    - fields
    - fractal
    - holographic
    - hooks
    - identity
    - law
    - merge
    - methods
    - open
    - sectors
    - sequence
    - standard
    - versions
    - war
typography:
  partition: defence
  bondDegree: 64
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - akashic
    - close
    - collections
    - duality
    - fields
    - fractal
    - holographic
    - hooks
    - identity
    - law
    - merge
    - open
    - sectors
    - sequence
    - standard
    - versions
  matrix:
    - access
    - accounting
    - akashic
    - close
    - collections
    - duality
    - establishment
    - fields
    - fractal
    - holographic
    - hooks
    - identity
    - law
    - merge
    - methods
    - open
    - sectors
    - sequence
    - standard
    - versions
    - war
  backlinks:
    - access
    - accounting
    - akashic
    - close
    - collections
    - duality
    - establishment
    - fields
    - fractal
    - holographic
    - hooks
    - identity
    - law
    - merge
    - methods
    - open
    - sectors
    - sequence
    - standard
    - versions
    - war
signatures:
  computationUuid: "db5eda61-8693-84c1-9c41-62373a47c0ae"
  stages:
    - stage: path
      stageUuid: "2ad817f1-2c88-8309-a1c9-350123761be0"
    - stage: trinity
      stageUuid: "f02cc9d2-f0ba-8f7e-a025-b66026e0277f"
    - stage: boundary
      stageUuid: "c50a6ea1-3534-8d55-819e-3a783ef73448"
    - stage: links
      stageUuid: "24bc1159-b806-812d-9c53-d124afd0e320"
    - stage: horo
      stageUuid: "ff4fa853-3844-83f9-80db-35045b9da24b"
    - stage: seal
      stageUuid: "d886e78d-fc3a-8589-abc7-e3c6513c7f24"
    - stage: uuid
      stageUuid: "a5c02562-a4ef-8067-9fae-090cf4cfb8f8"
version: 2
---
# defence — the readiness sector (COFOG 02)

The societal Defence sector (COFOG **02**): a force of **personnel** and **equipment** is held at a measured **readiness**, deployed through a **schedule**, and sustained by **procurement** + logistics. The same exchange [[duality]] every erpax sector holds — here the flow is **give → take** inverted toward capability: the branch *gives* (deploys, expends) and *takes* (musters, supplies); the equilibrium is **readiness** (a measured state, never a stored flag). Self-sufficient: it references entities **OUT polymorphically** — a procurement *is accountable* toward [[accounting]], a deployment *is* a transaction; it never holds a GL account inward (the polymorphic-OUT law, see [[collections]]).

## Sequence position
A sector is a [[fractal]] whole that recomposes the cycle. Its arc is **4·8** of the [[sequence]] (`0·3·6·9·1·2·4·8·7·5`): `1·2` ([[fields]] → [[collections]]) realize personnel/equipment/units; **4** moves a force *through* a deployment (the material/flow cycle); at **8** the rosters, depots, branches and exercises **merge** into one queryable record (see [[merge]]).

## The form (hold the law, not the list)
- **One person, many roles.** soldier · officer · reservist · medic · commander are NOT N FK columns — one [[identity]] relationship under N **role contexts** (the same party law every sector holds). The role IS the context; rank/clearance is a capability flag on that identity, not a new table.
- **Readiness is DERIVED, never stored.** muster → train → equip → deploy → sustain → stand-down. Track monotonic counters + timestamps; **never store** `ready?`/`deployed?` — derive them (`ready ⟺ trainedCount ≥ requiredCount ∧ equippedCount ≥ requiredCount`; `deployed ⟺ deployedAt ∧ ¬returnedAt`). Every available/deployable/at-risk list is a `where`, not a state machine ([[hooks]]).
- **Capability is a measured constraint.** headcount · serviceable-equipment · sortie-hours · ammunition are the force's limit; an over-committed unit is a query against capacity, not a flag.
- **Procurement is the inward edge of the outward exchange.** a defence purchase *is* a transaction toward [[accounting]]; the lifecycle of a contract is period [[open]]/[[close]], its award a sealed, immutable [[versions]] snapshot — corrected via a new versioned record, never an in-place edit.
- **The roster is content-addressed and recoverable from any part.** same content ⇒ one id ([[identity]],[[merge]]); the whole order-of-battle regenerates from its sub-records ([[holographic]]).

## Purity (forget the corpus)
*Which* collections realize personnel, units, equipment, deployments, procurements — and their exact fields — is **matter**: it lives in the Payload config / `payload-types.ts` ([[akashic]]), regenerable on demand. Before creating anything, **diff the live config** (DRY). Build entities from reusable field-objects ([[fields]],[[collections]]); wrap them with [[access]] (row-level by branch/unit, clearance-gated visibility) and lifecycle [[hooks]] (readiness roll-ups, deployment seal). A defence standard (force-readiness coding, classification) is the answer-path, not decoration — audited against [[standard]] (COFOG 02 banners must be true).

## Common mistakes
- A role (officer/medic) as its own FK instead of one context-keyed party relationship.
- A defence field pointing INTO [[accounting]] (`procurement.glAccount`) — invert: the procurement IS a transaction, the operation IS accountable.
- Storing `status`/`ready?`/`deployed?` instead of deriving it from monotonic readiness counters + timestamps.
- Cataloguing the realized collections here — that's matter; diff the config instead ([[collections]]).
- A mutable award after sealing — procurement/deployment records are immutable once sealed ([[close]]); correct via a new versioned record.

**Law — [[law]]: defence is the COFOG-02 readiness [[sectors|sector]] — readiness is a DERIVED measured state never a stored flag (`ready ⟺ trainedCount ≥ requiredCount ∧ equippedCount ≥ requiredCount`), one person is many role-contexts under one [[identity]], and a procurement IS a transaction toward [[accounting]] (polymorphic-OUT, never a GL account held inward).**
