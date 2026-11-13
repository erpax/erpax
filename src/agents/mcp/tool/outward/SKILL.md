---
name: outward
description: "Use when reasoning about outward — outward content-addresses every external answer and outward/leads fuses those receipts to , so the corpus can already compute *what changed* and *what to look at next*."
atomPath: "agents/mcp/tool/outward"
coordinate: "agents/mcp/tool/outward · 1/base · 77b9d8b7"
contentUuid: "f3364c5a-8adb-5ecc-af9b-843666fd831b"
diamondUuid: "5bde12e1-de0c-848a-b575-363e47c344d3"
uuid: "77b9d8b7-ee18-8185-99b3-785449fd1a8d"
horo: 1
typography:
  partition: agents
  bondDegree: 64
standards: []
bindings: []
signatures:
  computationUuid: "1aaff20f-625f-8151-b477-54c9eeefc40e"
  stages:
    - stage: path
      stageUuid: "080b3a72-630d-89f2-bc30-e3093a88ca12"
    - stage: trinity
      stageUuid: "cb3feb5d-a430-8972-9886-0047e66c9081"
    - stage: boundary
      stageUuid: "f4d6501d-96dc-8676-9596-0ecd61e2a6aa"
    - stage: links
      stageUuid: "6160f62f-8cf2-84ac-8cbd-d584ebdc0532"
    - stage: horo
      stageUuid: "4ee685fb-e1e7-8bbc-9ec9-70a18dcc25b5"
    - stage: seal
      stageUuid: "0093f2a9-6be4-888d-b68c-82b5a932e3af"
    - stage: uuid
      stageUuid: "229649b9-91ad-88c2-84d5-79309625e351"
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

Composes: [[outward]]/leads · mcp/tool · [[quantum]]/chat.
