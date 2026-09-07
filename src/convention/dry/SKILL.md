---
name: dry
description: "Use when checking whether the corpus stays DRY — the computed convention that no reference is duplicated, every one folded to a single source, measured live as coverage = atoms / (atoms + residue) over the real tree."
atomPath: "convention/dry"
coordinate: "convention/dry · 4/weave · 2e0a614b"
contentUuid: "3c4933dc-845c-5364-9205-f9a2a6e74f64"
diamondUuid: "b1abb8ef-0f5a-8b1c-aa80-ff8781416215"
uuid: "2e0a614b-cfc7-8a4c-857c-ae180eb52e7e"
horo: 4
typography:
  partition: convention
  bondDegree: 109
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "33afb0a9-47f6-8568-9a82-5acec568c487"
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
      stageUuid: "1c06e65a-96cd-822c-9f7f-c1e5b44a57c0"
    - stage: seal
      stageUuid: "304b13dc-3c90-87d4-8b1f-ada85e465b65"
    - stage: uuid
      stageUuid: "6c489052-5897-8c4b-97d6-aae820af4e14"
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
