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
