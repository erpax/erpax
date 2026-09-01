---
name: registry
description: "Use when a standard's canonical title, family or publisher is needed — the curated spine of facts a banner scan cannot derive, joined to fs-derived usage to build the shared catalogue."
atomPath: standards/registry
---
# standards/registry — the facts a scan cannot derive

A `@standard` banner tells you a standard is cited and where. It cannot tell you that `EN-16931` is *"Electronic invoicing — semantic data model"*, published by CEN, in the EU family. Those are **facts**, encoded once, verbatim — the same shape as the SNA/COFOG taxonomies elsewhere in the corpus.

The split is deliberate: **curated facts ⊗ fs-derived usage = the catalogue.** Usage (how often, which modules) is computed from the banners dissolved across `src/`; identity is curated here. Neither half can be derived from the other, and a catalogue built from only one of them lies in a way that reads as complete — the catalogue emitter joins them and reports what it could not cover.

**Honest boundary.** A registry row proves the corpus *knows* a standard's identity, never that the standard is cited anywhere or implemented correctly — an uncited row is exactly what the catalogue emitter reports back.

Composes: [[standards]] · [[rules]]/reference.
