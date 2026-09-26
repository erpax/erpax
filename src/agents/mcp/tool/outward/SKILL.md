---
name: outward
description: "Use when reasoning about outward — outward content-addresses every external answer and outward/leads fuses those receipts to , so the corpus can already compute *what changed* and *what to look at next*."
atomPath: "agents/mcp/tool/outward"
coordinate: "agents/mcp/tool/outward · 5/round · 3a9e16c3"
contentUuid: "531b3629-9b45-5b11-83a7-94ef6016768e"
diamondUuid: "4d5c937c-b11c-8ecc-af24-621cb276b98e"
uuid: "3a9e16c3-d163-8dc3-9a8d-34b7ae4083b1"
horo: 5
typography:
  partition: agents
  bondDegree: 51
standards: []
bindings: []
signatures:
  computationUuid: "bc7626ab-4306-8621-8eb0-9085c0c0679b"
  stages:
    - stage: path
      stageUuid: "080b3a72-630d-89f2-bc30-e3093a88ca12"
    - stage: trinity
      stageUuid: "cb3feb5d-a430-8972-9886-0047e66c9081"
    - stage: boundary
      stageUuid: "3807bb79-fddd-8ea6-bf8c-0cc8a3c0277a"
    - stage: links
      stageUuid: "9dc3460c-a898-8981-b136-2929e086526e"
    - stage: horo
      stageUuid: "0ad1fbbb-8571-8516-8f93-633b59665f66"
    - stage: seal
      stageUuid: "0093f2a9-6be4-888d-b68c-82b5a932e3af"
    - stage: uuid
      stageUuid: "7bd892d3-201f-8f23-94a0-b50b379c3986"
version: 2
---
# agents/mcp/tool/outward — the boundary, asked without a human in the loop

[[outward]] content-addresses every external answer and [[outward]]/leads fuses those receipts to
`nextAsk`, so the corpus can already compute *what changed* and *what to look at next*. Until now
both were reachable only from a shell. These two tools put them on the MCP surface, which is what
makes the loop autonomous: an agent asks the boundary directly.

| tool | answers | writes |
| --- | --- | --- |
| `erpax.outward.leads` | the leads (`moved` + `fresh`), the unreachable rails, and the coverage | only with `write: true` |
| `erpax.outward.next` | the single next lead nothing has answered | never |

## Two refusals the descriptions carry, not just this page

A caller reads the tool description, not the SKILL, so the description is where an honest boundary
has to live — and a test asserts both are in it:

- **`UNREACHABLE IS NOT A LEAD.`** A rail that is down keeps its prior receipt and is reported in
  its own field, never as evidence that something changed. Conflating the two would turn someone
  else's outage into news.
- **`next` is the first UNCOVERED lead in harvest order, not the most important one.** There is no
  priority model here; ordering leads by consequence would need a model of what each rail feeds, and
  the tool says so rather than implying a ranking it does not have.

## Asking cannot change the answer

`erpax.outward.next` takes **no parameters** and writes nothing: asking what is next must not move
what is next. `erpax.outward.leads` advances the receipt book only under an explicit `write: true`,
so a query is a query. Both are asserted.

**Honest boundary.** These ask the 12 rails the three registries wire, and [[outward]]/coverage
catalogues **178** endpoints of which 44 are covered — so 134 remain silent and no lead can arrive
from them through any surface, MCP included. A harvest does live network I/O, so a call costs real
seconds and can return `unreachable` for reasons that have nothing to do with erpax. And coverage
records that a lead was **answered**, never that the answer was right.

Composes: [[outward]]/leads · [[mcp]]/tool · [[quantum]]/chat.
