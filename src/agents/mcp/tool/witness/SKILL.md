---
name: witness
description: "Use when reasoning about witness — Two tools, and the second exists because the first was hand-picked."
atomPath: "agents/mcp/tool/witness"
coordinate: "agents/mcp/tool/witness · 7/descent · 5c1d3fc1"
contentUuid: "c9a500e3-8b12-57df-aae1-989fa58f2e57"
diamondUuid: "381408e7-b181-802b-8f47-e5233f8f90aa"
uuid: "5c1d3fc1-2847-860b-a394-f049935576ef"
horo: 7
typography:
  partition: agents
  bondDegree: 17
standards:
  - MCP
  - "MCP 0.6 — tools/list + tools/call result shape {content:[{type,text}]}"
bindings: []
signatures:
  computationUuid: "78086c1a-6dc2-8576-9cb6-c329fcdc5b53"
  stages:
    - stage: path
      stageUuid: "4be04fdc-e524-805d-8512-02d9daa087a6"
    - stage: trinity
      stageUuid: "0a5698cf-4a3f-8f2d-896e-a1a5d56d271b"
    - stage: boundary
      stageUuid: "cff1e95b-2239-82fa-8174-d1c866c0ad17"
    - stage: links
      stageUuid: "16059a73-28e0-8298-bda3-68ff9716e41a"
    - stage: horo
      stageUuid: "14fb3e11-a215-8a81-8653-ddec089fec81"
    - stage: seal
      stageUuid: "58ec8738-2494-8f82-9a45-1cd7b3877b0e"
    - stage: uuid
      stageUuid: "9dc0e21d-b729-81b9-93c7-81b1d6ff8b60"
version: 2
---
# agents/mcp/tool/witness — the cross-domain proof, and the discovery of which crosses exist

Two tools, and the second exists because the first was hand-picked.

`erpax.witness.cross` runs one named cross and judges it — `corroborated | divergent | single |
silent` — with the independent leg a **theorem** wherever one exists: `√(μ/r)` for orbital speed,
arbitrage-free closure for a rate table, `cos H = −tanφ·tanδ` for day length, the great-circle
distance as a hard floor for a route. A single source is reported as a **claim**, never as evidence.

`erpax.witness.discover` derives the crosses from the world's own machine-readable schemas — 2,529
APIs in the APIs.guru registry — so the surface is not limited to the five anyone here thought of.
See [[outward]]/discover for the chain and both of the corrections that made its number real.

## Why `tolerance` is a required parameter

Because it decides the verdict, and it belongs to the question rather than to this atom. 2 °C is close
for a forecast and absurd for a distance, and the live route cross was only "corroborated" because the
tolerance was declared at 900 km — the honest statement there is the **ratio** 1.215, not agreement.
A tool that chose the tolerance itself would be manufacturing its own verdicts.

## Honest boundary

Corroboration is not truth, and agreement is not independence: Open-Meteo and MET Norway agreed to
0.7 °C live, and both ingest ECMWF, so that row is two views of one model. The tool says so rather
than counting it as two witnesses.

Discovery is not provability. The richest derived crosses — `meteosource × weatherbit`, `stormglass` —
require API keys, which this session does not handle, so they are found and **not run**. The crosses
actually proven live are the keyless ones.

**Law — [[law]]: one source is a claim, two are evidence, and two sharing an upstream are one source
wearing two names. Anchor a cross on something derived, and never let the tool pick the tolerance.**

## Standards

- **MCP 0.6** — `tools/list` + `tools/call` result shape.
- **ISO 19011:2018 §6.4** — audit evidence.

Composes: [[outward]]/witness · [[outward]]/discover · [[law]].
