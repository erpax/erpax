---
name: discover
description: "Use when reasoning about discover — outward/witness crosses five domains and every one of them was **hand-picked**."
atomPath: "outward/discover"
coordinate: "outward/discover · 1/base · db6d66cc"
contentUuid: "ba0ff761-53db-5865-a68a-5c4bf6c3af40"
diamondUuid: "39d8cc81-5120-88e3-b6f8-99c6faf5130b"
uuid: "db6d66cc-cb71-8376-aca1-a3785b455576"
horo: 1
typography:
  partition: outward
  bondDegree: 33
standards:
  - "ISO 19011:2018 §6.4 — audit evidence: a candidate cross must name the fields it rests on"
  - "OpenAPI 3 / Swagger 2 — the machine-readable surface being read"
bindings: []
signatures:
  computationUuid: "5fc17b99-a98e-8bff-9474-a6b0d7ee9e25"
  stages:
    - stage: path
      stageUuid: "e240f762-520c-8c70-9c11-7bd3013a8ea3"
    - stage: trinity
      stageUuid: "eb200802-333c-8dd9-8d46-06996d23ed8a"
    - stage: boundary
      stageUuid: "ac0cb92e-10a5-84ed-a969-e3803d43dc71"
    - stage: links
      stageUuid: "cd24ebb8-996e-8525-ad30-9d4a22d2ae88"
    - stage: horo
      stageUuid: "b0c1f0ce-242f-879d-b713-3edfda55d684"
    - stage: seal
      stageUuid: "e400d00d-c2a0-8b8b-9118-321924d7b0ae"
    - stage: uuid
      stageUuid: "1dafc63d-544d-8882-b692-d907e4219091"
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

## Standards

- **OpenAPI 3 · Swagger 2** — the machine-readable surface being read.
- **ISO 19011:2018 §6.4** — audit evidence: a candidate names the fields it rests on.

Composes: [[outward]]/witness · [[conjecture]] · [[rules]]/probe · [[law]].
