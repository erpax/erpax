---
name: lifecycle
description: "Use when a collection's events should exist without per-collection code — the spine fold derives created + per-transition events from a status select, applied once at registration."
atomPath: "factory/collection/lifecycle"
coordinate: "factory/collection/lifecycle · 4/weave · 47b05183"
contentUuid: "c94914b5-cedf-58e8-9fcd-8359fef0d961"
diamondUuid: "1c31f8d8-f4e7-85f8-89de-6497e3d609fc"
uuid: "47b05183-9e30-8b0e-bce4-ac4e7dac014a"
horo: 4
typography:
  partition: factory
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "566e35b8-274e-8aa9-bf36-915eb62dbe74"
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
      stageUuid: "0ca6ea35-48cb-8c75-b86d-531c09b6628e"
    - stage: seal
      stageUuid: "1748ab97-f4c4-83d8-82ea-047d274c03e8"
    - stage: uuid
      stageUuid: "5fca5fda-68c6-819e-b2fd-c080a5555e4c"
version: 2
---
# factory/collection/lifecycle — the events a status field already implies

A collection with a `status` select has already declared its lifecycle; writing the event wiring by hand restates what the field says. The fold derives `<slug>:created` plus one event per transition and appends the producers at registration — factory-built or raw, every collection speaks with **zero per-collection code**.

A collection that wired explicit structured emits carries `EMITS_WIRED_KEY` and the fold leaves it alone: derived events are a default, never an override.

`EMITS_WIRED_KEY` is defined in [[factory]]/collection/base, where it is written, and read here. Defining it beside its reader would make base import lifecycle while lifecycle imports base — an import loop, and a loop decides initialisation order by accident ([[rules]]/cycle).

**Honest boundary.** This proves an event is EMITTED on a transition, never that anything consumes it — an unconsumed event is [[rules]]/unraised's question, not this fold's.

Composes: [[factory]] · [[chain]] · [[rules]]/cycle.
