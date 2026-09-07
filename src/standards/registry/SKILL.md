---
name: registry
description: "Use when a standard's canonical title, family or publisher is needed — the curated spine of facts a banner scan cannot derive, joined to fs-derived usage to build the shared catalogue."
atomPath: "standards/registry"
coordinate: "standards/registry · 2/share · 158909f2"
contentUuid: "5ef04683-851c-5389-a636-3ee9b96e162f"
diamondUuid: "caa66d42-0e35-88e8-8b11-b274b975bdb7"
uuid: "158909f2-4674-8f58-91ca-662e957eb4c7"
horo: 2
typography:
  partition: standards
  bondDegree: 31
standards:
  - "3986 …`"
  - "ISO-19011:2018 audit-evidence (a curated register of cited norms)"
  - "ISO/IEC-25010:2023 §5.1 functional-completeness"
  - "banner against every registered matcher: 777 citations across 416 distinct heads"
bindings: []
signatures:
  computationUuid: "b27fd1eb-11b7-8f33-9e07-f046d1eb5851"
  stages:
    - stage: path
      stageUuid: "9d2a0781-409a-824e-b4d5-4245013bc8cd"
    - stage: trinity
      stageUuid: "258590a4-5400-8881-9929-6c5643e42b68"
    - stage: boundary
      stageUuid: "1108fe1f-6c19-8339-8bd7-ef2685e1b8b0"
    - stage: links
      stageUuid: "14e7d49b-d238-88f2-b37f-9155b78f5e2e"
    - stage: horo
      stageUuid: "bb9388a7-0725-8c56-965a-8c5380e58cab"
    - stage: seal
      stageUuid: "656dc0b0-4214-8a40-a75c-89b31d85cb4a"
    - stage: uuid
      stageUuid: "90e5aa31-17f4-8df7-a2bd-2d01f84602f8"
version: 2
---
# standards/registry — the facts a scan cannot derive

A `@standard` banner tells you a standard is cited and where. It cannot tell you that `EN-16931` is *"Electronic invoicing — semantic data model"*, published by CEN, in the EU family. Those are **facts**, encoded once, verbatim — the same shape as the SNA/COFOG taxonomies elsewhere in the corpus.

The split is deliberate: **curated facts ⊗ fs-derived usage = the catalogue.** Usage (how often, which modules) is computed from the banners dissolved across `src/`; identity is curated here. Neither half can be derived from the other, and a catalogue built from only one of them lies in a way that reads as complete — the catalogue emitter joins them and reports what it could not cover.

**Honest boundary.** A registry row proves the corpus *knows* a standard's identity, never that the standard is cited anywhere or implemented correctly — an uncited row is exactly what the catalogue emitter reports back.

Composes: [[standards]] · [[rules]]/reference.
