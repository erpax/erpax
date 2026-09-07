---
name: lifecycle
description: "Use when a collection's events should exist without per-collection code — the spine fold derives created + per-transition events from a status select, applied once at registration."
atomPath: "factory/collection/lifecycle"
coordinate: "factory/collection/lifecycle · 7/descent · 1301a4ff"
contentUuid: "b5c52292-af88-5e69-abbe-a5dd153e450b"
diamondUuid: "e28ea0c2-90fe-809e-afa3-4384d4dca33a"
uuid: "1301a4ff-c71f-88cd-bc2e-1f64410e9aac"
horo: 7
typography:
  partition: factory
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "4a0236e9-ef0c-8628-8103-3a5570981fc1"
  stages:
    - stage: path
      stageUuid: "2c061c3f-b520-841c-a0c4-74114c1b7218"
    - stage: trinity
      stageUuid: "6f0a333c-cab7-844b-8af2-d8db418933dc"
    - stage: boundary
      stageUuid: "2192fcde-4b8f-88e3-8b2e-ac666e99bea2"
    - stage: links
      stageUuid: "07cf8dd3-c37f-86b0-9cb4-83ed3815953b"
    - stage: horo
      stageUuid: "455acbe6-753e-8020-ab47-1d04c24fa808"
    - stage: seal
      stageUuid: "1748ab97-f4c4-83d8-82ea-047d274c03e8"
    - stage: uuid
      stageUuid: "d8bebfd3-518c-8c3a-96f5-568ca50e7ca2"
version: 2
---
# factory/collection/lifecycle — the events a status field already implies

A collection with a `status` select has already declared its lifecycle; writing the event wiring by hand restates what the field says. The fold derives `<slug>:created` plus one event per transition and appends the producers at registration — factory-built or raw, every collection speaks with **zero per-collection code**.

A collection that wired explicit structured emits carries `EMITS_WIRED_KEY` and the fold leaves it alone: derived events are a default, never an override.

`EMITS_WIRED_KEY` is defined in [[factory]]/collection/base, where it is written, and read here. Defining it beside its reader would make base import lifecycle while lifecycle imports base — an import loop, and a loop decides initialisation order by accident ([[rules]]/cycle).

**Honest boundary.** This proves an event is EMITTED on a transition, never that anything consumes it — an unconsumed event is [[rules]]/unraised's question, not this fold's.

Composes: [[factory]] · [[chain]] · [[rules]]/cycle.
