---
name: lifecycle
description: "Use when a collection's events should exist without per-collection code — the spine fold derives created + per-transition events from a status select, applied once at registration."
atomPath: factory/collection/lifecycle
---
# factory/collection/lifecycle — the events a status field already implies

A collection with a `status` select has already declared its lifecycle; writing the event wiring by hand restates what the field says. The fold derives `<slug>:created` plus one event per transition and appends the producers at registration — factory-built or raw, every collection speaks with **zero per-collection code**.

A collection that wired explicit structured emits carries `EMITS_WIRED_KEY` and the fold leaves it alone: derived events are a default, never an override.

`EMITS_WIRED_KEY` is defined in [[factory]]/collection/base, where it is written, and read here. Defining it beside its reader would make base import lifecycle while lifecycle imports base — an import loop, and a loop decides initialisation order by accident ([[rules]]/cycle).

**Honest boundary.** This proves an event is EMITTED on a transition, never that anything consumes it — an unconsumed event is [[rules]]/unraised's question, not this fold's.

Composes: [[factory]] · [[chain]] · [[rules]]/cycle.
