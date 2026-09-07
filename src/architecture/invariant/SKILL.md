---
name: invariant
description: "Use when enforcing the architecture laws in code — the executable checks (single-word atoms, no prefixes, every file payload⊕vitepress or junk, locality, the ≥2-cross balance, the naming matrix) that are the matter-twin of the gate."
atomPath: "architecture/invariant"
coordinate: "architecture/invariant · 1/base · e2670d73"
contentUuid: "f44aba58-f804-5123-adf8-04b9cc44579a"
diamondUuid: "6f8306b8-541f-8ca0-b83a-8338ee669013"
uuid: "e2670d73-c439-8f0d-a989-30eced02d188"
horo: 1
typography:
  partition: architecture
  bondDegree: 44
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
  computationUuid: "e02e2e5c-3305-81cc-bc6a-a636d8a0ea6e"
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
      stageUuid: "6d95b7d0-0953-8b1e-bb3c-0c98aa0d88e0"
    - stage: seal
      stageUuid: "b36e6e32-67e1-8087-9681-3e68d6e0cf7e"
    - stage: uuid
      stageUuid: "1a383c0c-fae6-8795-906c-61689a5a15e5"
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
