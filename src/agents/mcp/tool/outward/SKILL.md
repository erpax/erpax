---
name: outward
description: "Use when reasoning about outward — outward content-addresses every external answer and outward/leads fuses those receipts to , so the corpus can already compute *what changed* and *what to look at next*."
atomPath: "agents/mcp/tool/outward"
coordinate: "agents/mcp/tool/outward · 5/round · 3a9e16c3"
contentUuid: "92c84f9b-5cae-5100-92f2-6338127f7301"
diamondUuid: "22805141-54d9-8961-99b0-c617e2954bf1"
uuid: "3a9e16c3-d163-8dc3-9a8d-34b7ae4083b1"
horo: 5
typography:
  partition: agents
  bondDegree: 63
standards: []
bindings: []
signatures:
  computationUuid: "6c503a97-1cb4-8c1c-91c7-128c3d9a4b70"
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
      stageUuid: "f81a02a6-241e-8300-9760-ba0837776ef7"
    - stage: seal
      stageUuid: "0093f2a9-6be4-888d-b68c-82b5a932e3af"
    - stage: uuid
      stageUuid: "799addd7-decf-8f30-a7e8-3bcdee53141d"
version: 2
---
# agents/mcp/tool/outward — the boundary, asked without a human in the loop

[[outward]] content-addresses every external answer and [[outward]]/leads fuses those receipts to
`nextAsk`, so the corpus can already compute *what changed* and *what to look at next*. Until now
both were reachable only from a shell. These tools put them on the MCP surface, which is what
makes the loop autonomous: an agent asks the boundary directly — and the family is a trinity
([[family]]): a measure, its involution, and the act.

| tool | leg | answers | writes |
| --- | --- | --- | --- |
| `erpax.outward.leads` | measure | the leads (`moved` + `fresh`), the unreachable rails, and the coverage | never |
| `erpax.outward.upstream` | involute | the boundary from the other seat — what Payload **publishes** (templates · examples · packages) that this tree does not hold, via [[payload]]/upstream | never |
| `erpax.outward.record` | act | the same harvest, **written** — the receipts the next `leads` compares against | always |
| `erpax.outward.next` | act | the single next lead nothing has answered | never |

`leads` once carried the write behind a `write: true` flag. `erpax.family.roles` — the involute leg
that asks a declared role against the shape of its body — reported it as the one lie on the surface:
a measure whose handler writes. The write moved to `record`, the leg that says it writes.

`leads` asks *what did the world say that we recorded differently*; `upstream` asks the dual, *what
does the world offer that we never recorded at all*. A gap it reports is a candidate, never a debt —
D1 over Postgres is a choice — and a directory GitHub refuses is refused by name, not read as empty.

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
