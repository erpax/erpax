---
name: invariant
description: "Use when enforcing the architecture laws in code — the executable checks (single-word atoms, no prefixes, every file payload⊕vitepress or junk, locality, the ≥2-cross balance, the naming matrix) that are the matter-twin of the gate."
atomPath: "architecture/invariant"
coordinate: "architecture/invariant · 1/base · 421c1988"
contentUuid: "b2d8fde8-7746-5bb7-bde4-8dc379c9bf19"
diamondUuid: "1ce436bc-4fc5-8a98-bfb2-2fc937ce7860"
uuid: "421c1988-548d-83e9-8285-9d9192c0b510"
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
  computationUuid: "36cda3c2-e1ad-8382-88b2-8c0950011bd3"
  stages:
    - stage: path
      stageUuid: "6e3a3b2e-4d9c-8bfd-8918-645115fc9912"
    - stage: trinity
      stageUuid: "ea5aa12d-f620-8f27-90e4-21195a2cacdc"
    - stage: boundary
      stageUuid: "3de53cc8-1836-8e74-a8aa-585a23a7e171"
    - stage: links
      stageUuid: "3badd720-b4ab-8995-83b3-91b6c454e19a"
    - stage: horo
      stageUuid: "d38fe572-4ce2-8455-9454-d33c3454e6bc"
    - stage: seal
      stageUuid: "b36e6e32-67e1-8087-9681-3e68d6e0cf7e"
    - stage: uuid
      stageUuid: "b1a489b3-a4ec-8498-946d-695be7c4a260"
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
