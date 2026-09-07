---
name: lifecycle
description: "Use when a collection's events should exist without per-collection code — the spine fold derives created + per-transition events from a status select, applied once at registration."
atomPath: "factory/collection/lifecycle"
coordinate: "factory/collection/lifecycle · 4/weave · cdfa07a9"
contentUuid: "717bcca6-2f4d-596b-b460-47cb11f69498"
diamondUuid: "9073a062-e474-8752-a000-67041a10a762"
uuid: "cdfa07a9-91cf-85a5-96a5-72576c97a10b"
horo: 4
typography:
  partition: factory
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "54ddf37f-6800-8ecd-b28f-82e5c4c043e6"
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
      stageUuid: "b611c1a8-f2c5-89e3-baeb-9a1436961453"
    - stage: seal
      stageUuid: "1748ab97-f4c4-83d8-82ea-047d274c03e8"
    - stage: uuid
      stageUuid: "74523a62-9519-8b3a-9f63-c01f3cb47e85"
version: 2
---
# factory/collection/lifecycle — the events a status field already implies

A collection with a `status` select has already declared its lifecycle; writing the event wiring by hand restates what the field says. The fold derives `<slug>:created` plus one event per transition and appends the producers at registration — factory-built or raw, every collection speaks with **zero per-collection code**.

A collection that wired explicit structured emits carries `EMITS_WIRED_KEY` and the fold leaves it alone: derived events are a default, never an override.

`EMITS_WIRED_KEY` is defined in [[factory]]/collection/base, where it is written, and read here. Defining it beside its reader would make base import lifecycle while lifecycle imports base — an import loop, and a loop decides initialisation order by accident ([[rules]]/cycle).

**Honest boundary.** This proves an event is EMITTED on a transition, never that anything consumes it — an unconsumed event is [[rules]]/unraised's question, not this fold's.

Composes: [[factory]] · [[chain]] · [[rules]]/cycle.
