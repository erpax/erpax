---
name: dry
description: "Use when checking whether the corpus stays DRY — the computed convention that no reference is duplicated, every one folded to a single source, measured live as coverage = atoms / (atoms + residue) over the real tree."
atomPath: "convention/dry"
coordinate: "convention/dry · 7/descent · ab69c843"
contentUuid: "fc916c63-2da5-5a85-ab3b-970bebcae258"
diamondUuid: "d2263097-2641-8fa3-8af3-4e353b4c00bd"
uuid: "ab69c843-a85e-8109-92be-f01c0811ebc3"
horo: 7
typography:
  partition: convention
  bondDegree: 109
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "6ab18626-7e42-8262-896b-45523f224f9e"
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
      stageUuid: "02e45c51-b296-850a-ab1c-e58603cad1dd"
    - stage: seal
      stageUuid: "304b13dc-3c90-87d4-8b1f-ada85e465b65"
    - stage: uuid
      stageUuid: "dba08bfa-4d35-8d5a-bed1-ad50d0363905"
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
