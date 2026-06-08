---
name: invariant
description: "Use when enforcing the architecture laws in code — the executable checks (single-word atoms, no prefixes, every file payload⊕vitepress or junk, locality, the ≥2-cross balance, the naming matrix) that are the matter-twin of the gate."
atomPath: architecture/invariant
coordinate: architecture/invariant · 2/share · bfa891e1
contentUuid: "7d3406fa-6f40-54ad-9b28-ef8c2562aa2d"
diamondUuid: "ca11d0eb-88e2-8db0-9b4b-c1413df09b89"
uuid: "bfa891e1-ae89-81a5-9467-b5b580ee8371"
horo: 2
bonds:
  in:
    - architecture
    - aura
    - balance
    - coordinate
    - diamond
    - dissolve
    - gate
    - identity
    - merge
    - payload
    - sequence
    - standard
    - vitepress
  out:
    - architecture
    - aura
    - balance
    - coordinate
    - diamond
    - dissolve
    - gate
    - identity
    - merge
    - payload
    - sequence
    - standard
    - vitepress
typography:
  partition: architecture
  bondDegree: 44
  neighbors:
    - aura
    - diamond
standards:
  - "BCP-47"
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "EU-765/2008"
  - "ILO-C001"
  - "ISO-19011"
  - "ISO-19011:2018 §6.4 audit-evidence-invariants"
  - "ISO-27001"
  - "ISO-27002"
  - "ISO-27037"
  - "ISO-37000"
  - "ISO/IEC 25010:2023 quality-model"
  - "ISO/IEC-12207"
  - "ISO/IEC-25010"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-27002:2022"
  - MCP
  - "NIST-FIPS-180-4"
  - "RFC-5545"
  - "RFC-8785"
  - "RFC-9562"
  - "US-CTA-2021"
  - "W3C-JSON-LD-1.1"
bindings: []
neighbors:
  wikilink:
    - architecture
    - aura
    - balance
    - coordinate
    - diamond
    - dissolve
    - gate
    - identity
    - merge
    - payload
    - sequence
    - standard
    - vitepress
  matrix:
    - architecture
    - aura
    - balance
    - coordinate
    - diamond
    - dissolve
    - gate
    - identity
    - merge
    - payload
    - sequence
    - standard
    - vitepress
  backlinks:
    - architecture
    - aura
    - balance
    - coordinate
    - diamond
    - dissolve
    - gate
    - identity
    - merge
    - payload
    - sequence
    - standard
    - vitepress
signatures:
  computationUuid: "e10dae8e-d95a-8db7-9cdc-d0ff2421f047"
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
      stageUuid: "f0266603-2f32-8a59-8a4a-67a6f21ac4fb"
    - stage: seal
      stageUuid: "6f0e277e-1f54-84be-b31e-883e193a3f0e"
    - stage: uuid
      stageUuid: "c5b47ef0-33de-8d05-91fb-9481c83dc1b2"
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
