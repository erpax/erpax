---
name: invariant
description: "Use when enforcing the architecture laws in code — the executable checks (single-word atoms, no prefixes, every file payload⊕vitepress or junk, locality, the ≥2-cross balance, the naming matrix) that are the matter-twin of the gate."
atomPath: "architecture/invariant"
coordinate: "architecture/invariant · 5/round · ff6696f7"
contentUuid: "b0c22be8-1883-5c7e-b479-c0ef055b0820"
diamondUuid: "cf5216e9-a289-89a4-8f06-47735f9e3aa3"
uuid: "ff6696f7-0ecf-88f7-95cc-4f322b269cf4"
horo: 5
typography:
  partition: architecture
  bondDegree: 24
standards:
  - "BCP-47"
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EU-765/2008"
  - "ISO-19011"
  - "ISO-27001"
  - "ISO-27002"
  - "ISO-27037"
  - "ISO-37000"
  - "ISO/IEC 25010:2023 quality-model"
  - "ISO/IEC 25010:2023 quality-model`"
  - "ISO/IEC-12207"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-27002:2022"
  - MCP
  - "NIST-FIPS-180-4"
  - "RFC-5545"
  - "RFC-8785"
  - "RFC-9562"
  - "US-CTA-2021"
  - "W3C-JSON-LD-1.1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ae81589b-53d3-82d7-b7f6-5057ba03083f"
  stages:
    - stage: path
      stageUuid: "6e3a3b2e-4d9c-8bfd-8918-645115fc9912"
    - stage: trinity
      stageUuid: "ea5aa12d-f620-8f27-90e4-21195a2cacdc"
    - stage: boundary
      stageUuid: "3de53cc8-1836-8e74-a8aa-585a23a7e171"
    - stage: links
      stageUuid: "32e4c258-985d-88da-b3fa-0eaea5cfa70c"
    - stage: horo
      stageUuid: "42ca6433-055b-87a5-aff0-06182b43260e"
    - stage: seal
      stageUuid: "6f0e277e-1f54-84be-b31e-883e193a3f0e"
    - stage: uuid
      stageUuid: "4d97a928-1e72-8268-af95-62a03488383a"
version: 2
---
# invariant — the architecture, enforced

The architecture invariants are the **executable form of the laws** — the matter-twin of the [[gate]]. Where the gate atom states *what verification is* (check · message · heal), this is the running `checks.ts` that **holds the corpus to the dissolution architecture** so a violation is a hard FAIL, never a warn (green means *"obeys the law"*, not *"compiles"*).

What it enforces (the [[sequence]] made strict):

- **single-word atoms, no grouping prefixes** — location is the derived word-path, not a `collections/`/`services/` container ([[dissolve]]).
- **every file is an atom or junk** — matter (`index.*`) ⊕ form (`SKILL.md`); what fits neither [[payload]] nor [[vitepress]] is purged.
- **locality + the ≥2-cross [[balance]]** — a folder communicates only through its [[coordinate]] cross (parent · prev · next); a non-neighbour link is a violation, and a folder with fewer than two crosses is unbalanced.
- **the naming matrix** — strict file names inside each folder (`index.ts` matter · `SKILL.md` form · reference fields · hook files); an off-matrix name is junk.

Each violation is content-addressed: its **message names the failing [[coordinate]]** (path · uuid · broken neighbour), so the same fault anywhere dedups to one verdict ([[merge]]) and folds into the matrix root (tamper-evident), renderable as [[aura]]. The check runs at `onInit` and in the test layer — the corpus proves its own shape.

Operational memory IS these invariants enforced on the live tree ([[memory/architecture]]) — the executable checks are what the lattice remembers, not a side store.

Composes [[gate]] · [[standard]] · [[coordinate]] · [[balance]] · [[dissolve]] · [[merge]] · [[identity]] · [[sequence]] · [[memory/architecture]] · [[diamond]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 25010:2023 quality-model`
