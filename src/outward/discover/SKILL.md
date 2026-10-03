---
name: discover
description: "Use when reasoning about discover — outward/witness crosses five domains and every one of them was **hand-picked**."
atomPath: "outward/discover"
coordinate: "outward/discover · 5/round · 8f7455b4"
contentUuid: "de8afb4f-75c1-5a43-a6f6-13592198c88f"
diamondUuid: "34ca7162-60e1-885d-b4e2-129bb73f33e7"
uuid: "8f7455b4-fff7-8b3c-b5d0-6f7831eb4b2d"
horo: 5
typography:
  partition: outward
  bondDegree: 33
standards:
  - "ISO 19011:2018 §6.4 — audit evidence: a candidate cross must name the fields it rests on"
  - "OpenAPI 3 / Swagger 2 — the machine-readable surface being read"
bindings: []
signatures:
  computationUuid: "22e8df9d-c352-85be-bf48-4a7f67526b70"
  stages:
    - stage: path
      stageUuid: "e240f762-520c-8c70-9c11-7bd3013a8ea3"
    - stage: trinity
      stageUuid: "eb200802-333c-8dd9-8d46-06996d23ed8a"
    - stage: boundary
      stageUuid: "98e8b0e9-12fb-8baf-a461-43c58c99f653"
    - stage: links
      stageUuid: "cd24ebb8-996e-8525-ad30-9d4a22d2ae88"
    - stage: horo
      stageUuid: "7fc3919a-9f55-8f79-8c42-f4b8f0fca5a0"
    - stage: seal
      stageUuid: "e400d00d-c2a0-8b8b-9118-321924d7b0ae"
    - stage: uuid
      stageUuid: "4c4bc797-dcb4-86d2-8e70-444655d57627"
version: 2
---
# outward/discover — APIs → schemas → methods → cross formulas, each step derived from the last

[[outward]]/witness crosses five domains and every one of them was **hand-picked**. That is the
frozen-rosetta defect this corpus names: a basis typed once reports what its author remembered, not
what exists. This derives the crosses instead.

## The chain, measured live 2026-09-28

| step | how | result |
| --- | --- | ---: |
| 1 · discover APIs | `api.apis.guru/v2/list.json`, keyless | **2,529** |
| 2 · discover schemas | fetch each `swaggerUrl` | Swagger 2 + OpenAPI 3 |
| 3 · discover methods | operations whose params/responses carry a quantity | **62** over 7 APIs |
| 4 · discover cross formulas | every pair sharing a question AND a comparable answer | 64 → **33** |

A candidate needs **both halves**: a shared input (they answer about the same thing) and a shared
output quantity (their answers are comparable). Sharing only an output is two APIs reporting unrelated
temperatures; sharing only an input is two different questions about one place.

## Two corrections without which the number is a lie

**A reader blind to a dialect reports ABSENCE, not an error.** The first version walked only
`properties` / `items` / `schema`, so an OpenAPI 3 response body — which hides under
`content['application/json'].schema` — read as empty, and so did every `$ref` into
`components/schemas`. Nearly every real spec uses both, so **7 of 9 live APIs came back with 0
methods** and the crosses came out at zero. It now follows same-document `$ref`s, traverses every
object value rather than a whitelist of keys, and reads path-level parameters and OpenAPI 3 request
bodies.

**An echo is not a comparison.** Every geo API returns the latitude it was given, so `latitude` and
`longitude` appeared in `compares` for every geo pair — and comparing them verifies only that two
services can quote an argument back. Excluding any compared quantity that is also part of the shared
question took **64 candidates to 33**, and the survivors compare `temperature`, `humidity`, `instant`.

## Honest boundary

**`QUANTITY` is DECLARED, and it is the weak link.** OpenAPI almost never carries units, so two fields
both named `temperature` are *probably* the same quantity and nothing in the schema says so. The map
is written in the open so it can be argued with; a spec that does declare units should be preferred
over it.

**Discovery is not provability.** The richest crosses this found — `meteosource × weatherbit`,
`stormglass` — all require API keys, which this session does not handle, so they are derived and
**not executed**. The crosses actually proven live are the keyless ones in [[outward]]/witness. A
registry can tell you a cross exists; it cannot tell you that you may run it.

**Candidate selection is not a finding.** One run reported 0 crosses because the name filter matched
`airbyte`, `airport` and `amadeus` on the letters `air` and the slice filled with them before reaching
any weather API. The pipeline was correct and starving — which is [[rules]]/probe's law arriving at a
selector once again.

A derived cross is a **candidate**: it says two services claim to answer one question in one
quantity, never that either is right, and never that they are independent — the shared-upstream
problem [[outward]]/witness measures is invisible at the schema layer.

**Law — [[law]]: do not author the crosses. Discover what answers what, and let the pairs fall out —
then say plainly which ones you may actually run.**

## The words that are not quantities

`from` · `to` · `base` · `symbol` mapped to **currency**. Two APIs in one registry prove both readings,
verbatim from their specs: `interzoid.com:convertcurrency`'s `from` is *"Currency symbol for the
converted from amount"*; `opentargets.io`'s — GENOMICS — is *"How many initial results should be
skipped"*. Narrowing the pattern dropped the true reading with the false one, so `QUANTITY` is DATA, a
`?` marks a word ambiguous **by role**, and the corroborating vocabulary is computed from the quantity's
own alternatives. No description ⇒ refused. That rule made the next collision cost one character:
Google's `alt` ("Data format for the response") was crossing ad-exchange APIs on ALTITUDE — 101 methods
/ 3 crosses → 49 / **0**.

## A schema that describes a dead API

`opentargets.io`'s registry entry serves a 2019 REST spec whose endpoints now 404. `fetchJson` takes an
optional body and `discoverGraphql` reads an introspection result into the same shape: **20 root-query
methods, 0 quantities** — honest, since `QUANTITY` is weather/forex/geo and genomics shares none of it.
Fixing the transport replaced a fabricated cross with a true zero.

## Arrays and hashes are answers too

`temperature`, `[{temperature}]` hourly and `{"Sofia":{temperature}}` were one thing. A quantity carries
its **shape** and a cross states the **relation** the shapes force: `direct` runnable, `reduce` needs an
aggregation, `align` needs a common index, `key` needs a shared key space. `meteosource × weatherbit`:
**25 crosses, 0 runnable** — 8 reduce, 17 align. The count did not change; the output stopped calling
them comparisons.

**Honest boundary.** `type: object` with named properties is a record, not a map. The shape is the
outermost container, so a list inside a map loses its inner multiplicity. `relationOf` says what must
happen, never how. `discoverGraphql` reads one level, root QUERY only. The ambiguity table is DECLARED.

## A schema that describes a dead API

The registry's entry for `opentargets.io` serves a **2019** REST spec (`19.02.1`). Open Targets has
since moved to GraphQL, and those endpoints are gone:

```
GET https://api.opentargets.io/v3/platform/public/search        → 000 (host gone)
GET https://api.platform.opentargets.org/platform/public/search → 404
```

So the pipeline was reading a schema confidently and describing three endpoints that answer nothing —
a measurement with no subject, which is this corpus's recurring defect with the polarity reversed: not
a check that cannot fire, but a check firing on something that no longer exists.

The live API is one path answering POST, describing itself only when asked. `fetchJson` was GET-only,
which is why it read as dead (`HTTP 400`) — and why the qpu MCP probe had to be hand-rolled in a
throwaway script instead of using corpus machinery. One optional `body` argument makes it POST, and
`discoverGraphql` reads an introspection result into the same `DiscoveredMethod` shape, so a POST-only
API joins the one cross machinery rather than needing a second.

```
opentargets.io live: 20 root-query methods — target · disease · drug · variant · study · credibleSet …
                     carrying a quantity: 0
```

**Zero, and that is the honest answer.** `QUANTITY` is a weather/forex/geo vocabulary; genomics shares
no quantity with it, so Open Targets crosses with nothing. Fixing the transport did not manufacture a
cross — it replaced a fabricated one with a true zero, and the count went DOWN.

**Honest boundary.** `discoverGraphql` reads ONE level: a root field's arguments and the fields of the
type it returns. A GraphQL response shape is chosen by the caller, so going deeper would be this
function inventing a query nobody asked for. It reads the root QUERY type only — mutations are not
discovered, deliberately, since calling one has effects. And the ambiguity table is DECLARED in the
open with one entry: every other collision of this class is still unnamed, and the corroboration is a
regex over prose, which is weaker than a `units` extension and stronger than the name alone.

## Arrays and hashes are answers too

`leafFields` flattened every schema to a bag of leaf NAMES, so three different answers to one question
became one:

| the schema says | the reader recorded |
| --- | --- |
| `temperature` | `temperature` |
| `[{ temperature }]` — an hourly series | `temperature` |
| `{ "Sofia": { temperature } }` — keyed by city | `temperature` |

Two methods "sharing a quantity" were then reported as comparable when one answers a number and the
other answers two hundred. So a quantity now carries its **shape** — `scalar` · `list` · `map` — and a
cross states the **relation** the two shapes force:

- `direct` — both scalar: runnable as it stands.
- `reduce` — a list against a scalar: the list must be aggregated or indexed first, and a mean is not a
  max is not the first element. That choice is a model, not a default.
- `align` — two lists: element-wise ONLY once a common index exists. Hour 3 of one series is not hour 3
  of the other unless something says so.
- `key` — a map on either side: the two must agree on a key space before anything is compared.

A hash outranks a list because a map of lists must be keyed before anything can be reduced, and the
WIDEST shape a quantity was seen in wins: a body carrying `temperature` at the top level and again
inside an hourly array answers it as a list, and reporting the scalar would promise a single value the
caller has to dig out of many.

### What it changed, measured

`meteosource.com × weatherbit.io`, the richest real pair in the registry:

| | |
| --- | ---: |
| crosses found | 25 |
| **runnable as they stand (`direct`)** | **0** |
| owing an aggregation (`reduce`) | 8 |
| owing a common index (`align`) | 17 |

Every one of those 25 was previously reported as a comparable quantity. Not one of them is: eight are a
single reading against a series, seventeen are two series with no shared index. The count did not
change — what changed is that the output no longer claims they are comparisons.

`type: object` with NAMED properties is a **record**, not a map. Calling it a hash would make every
response body one, and the distinction is what `additionalProperties` exists to state.

**Honest boundary.** The shape is the outermost container on the path, so a list nested inside a map is
reported as a map and the inner multiplicity is not carried — a reader who keys it still has a list to
reduce. `relationOf` names what must happen before a comparison, never how: choosing the aggregation or
the index is the modelling decision this refuses to make silently. And a `direct` relation proves the
shapes agree, never that the two numbers mean the same thing — that is what the quantity table claims,
with the weakness argued above.

## Standards

- **OpenAPI 3 · Swagger 2** — the machine-readable surface being read.
- **ISO 19011:2018 §6.4** — audit evidence: a candidate names the fields it rests on.

Composes: [[outward]]/witness · [[conjecture]] · [[rules]]/probe · [[law]].
