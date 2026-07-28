---
name: dry
description: "Use when checking whether the corpus stays DRY — the computed convention that no reference is duplicated, every one folded to a single source, measured live as coverage = atoms / (atoms + residue) over the real tree."
atomPath: "convention/dry"
coordinate: "convention/dry · 4/weave · d8d7a529"
contentUuid: "bd5272b1-39d4-52ba-91c5-10a0c8d790b6"
diamondUuid: "024ed682-214d-8e2f-9690-086fc09dd375"
uuid: "d8d7a529-fb32-8f69-bf9c-9ecda7ddc949"
horo: 4
bonds:
  in:
    - analytics
    - calculator
    - cleaning
    - collapse
    - collide
    - collider
    - command
    - complete
    - concatenate
    - convention
    - dry
    - entropy
    - expand
    - field
    - fusion
    - gravity
    - laundry
    - law
    - lawful
    - math
    - merge
    - migrate
    - op
    - quaternary
    - reactor
    - singularity
    - sti
    - strength
    - tamper
    - test
    - vocabulary
  out:
    - analytics
    - calculator
    - cleaning
    - collapse
    - collide
    - collider
    - command
    - complete
    - concatenate
    - convention
    - dry
    - entropy
    - expand
    - field
    - fusion
    - gravity
    - laundry
    - law
    - lawful
    - math
    - merge
    - migrate
    - op
    - quaternary
    - reactor
    - singularity
    - sti
    - strength
    - tamper
    - test
    - vocabulary
typography:
  partition: convention
  bondDegree: 109
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - collapse
    - cost
    - dry
    - gravity
    - law
    - matrix
    - merge
    - uuid
  matrix:
    - analytics
    - calculator
    - cleaning
    - collapse
    - collide
    - collider
    - command
    - complete
    - concatenate
    - convention
    - dry
    - entropy
    - expand
    - field
    - fusion
    - gravity
    - laundry
    - law
    - lawful
    - math
    - merge
    - migrate
    - op
    - quaternary
    - reactor
    - singularity
    - sti
    - strength
    - tamper
    - test
    - vocabulary
  backlinks:
    - analytics
    - calculator
    - cleaning
    - collapse
    - collide
    - collider
    - command
    - complete
    - concatenate
    - convention
    - dry
    - entropy
    - expand
    - field
    - fusion
    - gravity
    - laundry
    - law
    - lawful
    - math
    - merge
    - migrate
    - op
    - quaternary
    - reactor
    - singularity
    - sti
    - strength
    - tamper
    - test
    - vocabulary
signatures:
  computationUuid: "b79280c6-3c41-8b78-b49b-83586491d3dd"
  stages:
    - stage: path
      stageUuid: "f16a4d18-bd62-8760-b46b-7ede514743b6"
    - stage: trinity
      stageUuid: "099e17da-db36-8fd0-a8bd-dd731c810088"
    - stage: boundary
      stageUuid: "89a2579e-ed4e-8671-a18a-5a8bf061af4e"
    - stage: links
      stageUuid: "0f088d3d-86cb-83e6-8b24-16d331c6f813"
    - stage: horo
      stageUuid: "4c463b7e-b7e5-840d-8fec-52605637721d"
    - stage: seal
      stageUuid: "304b13dc-3c90-87d4-8b1f-ada85e465b65"
    - stage: uuid
      stageUuid: "3830888a-34f9-8b2a-bafe-e8a77c89cf5c"
version: 2
---
# convention/dry — no duplication, every reference folded to one source

The DRY convention, written as a self-measuring atom. It states one rule and computes its own compliance — it does not re-implement the dry-clean, it **composes** the canonical kernels:

- **atoms** = `UUID_MATRIX_NODES.length` from [[matrix]] ([[uuid]]) — every concept that has already been folded to one content-addressed source.
- **dup** = `residue().length` from [[dry]] — the un-folded residue still on disk (`.bak` / `.orig` / `_attic` / `.fuse_hidden` / `~`), each a reference that escaped the collision.
- **coverage** = `atoms / (atoms + dup)` — in [0,1] by construction (dup ≥ 0, atoms > 0). It reaches **1** exactly when there is zero residue: every reference folded to one source.

Pure math, no default: the corpus is non-empty by architecture (the [[matrix]] always carries the root), and residue is a count, so the ratio never needs a clamp or a fallback. The only thing that pulls coverage below 1 is an un-collided duplicate — which is precisely the duplication this convention forbids. coverage → 1 ⟺ perfect DRY ⟺ infinitely-expanding tamper-[[cost]] ([[collapse]] · [[merge]] · [[gravity]]).

Entangled with — [[dry]] · [[matrix]] · [[collapse]] · [[merge]]

Matter-twin: [[dry]] — the computed dry-clean kernel (`residue`) this convention measures.

@standard schema.org — the type vocabulary, collided to single words

**Law — [[law]]: no duplication — every reference folded to one source; the corpus is DRY iff coverage = atoms / (atoms + residue) = 1, and any residue is duplication driving tamper-cost below infinity.**
