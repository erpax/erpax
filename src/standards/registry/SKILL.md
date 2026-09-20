---
name: registry
description: "Use when a standard's canonical title, family or publisher is needed — the curated spine of facts a banner scan cannot derive, joined to fs-derived usage to build the shared catalogue."
atomPath: "standards/registry"
coordinate: "standards/registry · 4/weave · 548dcd62"
contentUuid: "0d274c40-4072-5e38-8f47-64f55cff6cdc"
diamondUuid: "b8c701bb-56e3-88e4-b2e8-a015f257010b"
uuid: "548dcd62-78f0-8f31-9a3f-f577a780de32"
horo: 4
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
  computationUuid: "30093373-0de2-8e2c-8aa1-372ce9d397d9"
  stages:
    - stage: path
      stageUuid: "9d2a0781-409a-824e-b4d5-4245013bc8cd"
    - stage: trinity
      stageUuid: "258590a4-5400-8881-9929-6c5643e42b68"
    - stage: boundary
      stageUuid: "99a6f65f-28e2-8602-94af-fda5b64da626"
    - stage: links
      stageUuid: "14e7d49b-d238-88f2-b37f-9155b78f5e2e"
    - stage: horo
      stageUuid: "68da818e-64ca-8587-b7a5-c617cc19e2b6"
    - stage: seal
      stageUuid: "656dc0b0-4214-8a40-a75c-89b31d85cb4a"
    - stage: uuid
      stageUuid: "91e46d21-655c-8b8a-b006-109b28e659ba"
version: 2
---
# standards/registry — the facts a scan cannot derive

A `@standard` banner tells you a standard is cited and where. It cannot tell you that `EN-16931` is *"Electronic invoicing — semantic data model"*, published by CEN, in the EU family. Those are **facts**, encoded once, verbatim — the same shape as the SNA/COFOG taxonomies elsewhere in the corpus.

The split is deliberate: **curated facts ⊗ fs-derived usage = the catalogue.** Usage (how often, which modules) is computed from the banners dissolved across `src/`; identity is curated here. Neither half can be derived from the other, and a catalogue built from only one of them lies in a way that reads as complete — the catalogue emitter joins them and reports what it could not cover.

**Honest boundary.** A registry row proves the corpus *knows* a standard's identity, never that the standard is cited anywhere or implemented correctly — an uncited row is exactly what the catalogue emitter reports back.

Composes: [[standards]] · [[rules]]/reference.
