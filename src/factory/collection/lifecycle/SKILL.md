---
name: lifecycle
description: "Use when a collection's events should exist without per-collection code — the spine fold derives created + per-transition events from a status select, applied once at registration."
atomPath: "factory/collection/lifecycle"
coordinate: "factory/collection/lifecycle · 8/crest · 7e68c58e"
contentUuid: "ad2b499a-63a4-5551-b77f-57186f28bb9f"
diamondUuid: "ac7e62d0-c315-8505-a288-7864d63d28a7"
uuid: "7e68c58e-762e-8bad-86c9-7700210437f8"
horo: 8
typography:
  partition: factory
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "516200b7-00aa-8a46-8a33-5ee3ec5fa37d"
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
      stageUuid: "e5e44606-8f5b-8cac-9042-04fce83915cb"
    - stage: seal
      stageUuid: "1748ab97-f4c4-83d8-82ea-047d274c03e8"
    - stage: uuid
      stageUuid: "aee6a24a-2e36-8373-9ded-9c10b06cd12c"
version: 2
---
# factory/collection/lifecycle — the events a status field already implies

A collection with a `status` select has already declared its lifecycle; writing the event wiring by hand restates what the field says. The fold derives `<slug>:created` plus one event per transition and appends the producers at registration — factory-built or raw, every collection speaks with **zero per-collection code**.

A collection that wired explicit structured emits carries `EMITS_WIRED_KEY` and the fold leaves it alone: derived events are a default, never an override.

`EMITS_WIRED_KEY` is defined in [[factory]]/collection/base, where it is written, and read here. Defining it beside its reader would make base import lifecycle while lifecycle imports base — an import loop, and a loop decides initialisation order by accident ([[rules]]/cycle).

**Honest boundary.** This proves an event is EMITTED on a transition, never that anything consumes it — an unconsumed event is [[rules]]/unraised's question, not this fold's.

Composes: [[factory]] · [[chain]] · [[rules]]/cycle.
