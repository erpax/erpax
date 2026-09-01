---
name: probe
description: "Use when gateTypecheck needs a compile-load target — the minimal uuid-substrate probe, deliberately importing nothing that imports it back."
atomPath: confirm/probe
---
# confirm/probe — the smallest thing that proves the substrate compiles

`gateTypecheck` asks one question: does the uuid substrate still compile and load? It answers it by importing this atom, which touches [[guardian]] and [[seal]] and nothing else.

The point is what it does NOT import. A probe that loaded the gate stack would import the module that spawns it, and the answer would be about the probe's own recursion rather than the substrate ([[rules]]/cycle: an import loop makes initialisation order an accident).

Composes: [[confirm]] · [[guardian]] · [[seal]].
