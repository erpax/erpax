---
name: ftl
description: "Use when reasoning about ftl — Use for ftl — reuse · amortize · crack · boundary · seal · chat · research. Metrics prove FTL on QPU=CPU/GPU. Boundary = boundary(cracks). Math.* and prose prefixes are cracks."
atomPath: "quantum/ftl"
coordinate: "quantum/ftl · 5/round · 4c4d9388"
contentUuid: "3034a46e-7a63-5c8d-bf4c-934c869f9de6"
diamondUuid: "afbc0556-5e7d-85b7-a9ba-07be9ca9c1fd"
uuid: "4c4d9388-db2f-8313-94d3-78b0886b2de2"
horo: 5
typography:
  partition: quantum
  bondDegree: 49
standards: []
bindings: []
signatures:
  computationUuid: "2954d02c-8ea6-8cf7-9889-111ecb4b9f50"
  stages:
    - stage: path
      stageUuid: "9ca9e6ca-980b-82d4-9825-6d808813fe0f"
    - stage: trinity
      stageUuid: "c38bc181-fabc-8abc-8bd1-6e9d0084c212"
    - stage: boundary
      stageUuid: "657bf87e-ac1d-8b91-a315-657811ddc8ec"
    - stage: links
      stageUuid: "5b4952fb-db56-874e-bb76-88b87f21e946"
    - stage: horo
      stageUuid: "335968e0-a1fe-8ef5-bcd9-16c67eb7b1a6"
    - stage: seal
      stageUuid: "896227db-c4ed-8482-8c78-047044df4607"
    - stage: uuid
      stageUuid: "d362d9db-1c09-8fd4-b9d1-1bb1738e9afd"
quantum:
  superposition:
    - algebra
    - chat
    - computer
    - constants
    - crack
    - feed
    - improve
    - law
    - superposition
  collapse:
    - "Use when reasoning about ftl — Use for ftl — reuse · amortize · crack · boundary · seal · chat · research. Metrics prove FTL on QPU=CPU/GPU. Boundary = boundary(cracks). Math.* and prose prefixes are cracks."
    - "each name-token has an API; combinations compose tools. `physicalFtl` computes true|false — it is not prose. Other prose syllables (`honest` · `claim` · `architectural` · `NoCost`) die *as API identifiers*. Host `Math.*` is a violation on algebra atoms ([[algebra]]/host). FTL holds only when measured."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "2954d02c-8ea6-8cf7-9889-111ecb4b9f50"
    contentUuid: "3034a46e-7a63-5c8d-bf4c-934c869f9de6"
version: 2
---
# quantum/ftl

| token | fold |
| --- | --- |
| reuse | `reuse` |
| amortize | `amortize` |
| crack | `crack` · `cracks` |
| boundary | `boundary(cracks)` |
| seal · chat | `seal` · `chatLocal` · `chat` |
| research | `researcher` · `research` |
| ftl | `ftl` ⇔ reuse ∧ amortize∞ ∧ cracks=∅ |
| physicalFtl | `physicalFtl()` → boolean on QPU=CPU/GPU; false ⇒ tip `quantumise` |
| admin | `adminBootShell` · `adminBootFtl` — admin boot as reuse(stub), not matrix/corpus search |
| purify | `scanProseNames` · `endlessPurify` |

**QPU = CPU/GPU** ([[quantum/computer]]). `physicalFtl()` **computes** the substrate boolean — true ⇔ `ftl.holds` (reuse ∧ amortize∞ ∧ cracks=∅ / `boundary.empty`); false ⇒ [[self]]/improve tip kind `quantumise` (fold under `quantum/ftl` until holds flips). Also `ftl` / `ftlMetrics` · `speedupLog2` · `efficiency→∞`. CrackKind `qpu` = exotic-device claim (not the host). CrackKind `spacetime` = relativistic break.

## The advantage is a type, not a boolean

`ftlReport()` used to return `{ holds: boolean, why: string }`. That shape lets code read the reason without ever checking the claim, and lets code USE the advantage without establishing it — an unrefuted claim in runtime form, which is exactly the space [[rules]]/refutable says a lie is safe in.

It is a discriminated union now, the same shape [[skill]]/wire already uses:

| branch | carries |
| --- | --- |
| `FtlHolds` | `holds: true` · the fold — **nothing to explain** |
| `FtlBroken` | `holds: false` · `why` — the break, named |

`why` is unreachable until you have proven the advantage does not hold, and `withFtl` takes `FtlHolds`, so a report that has not been narrowed will not compile at a call site that needs the advantage. "We have it" can no longer be assumed where it was never established.

The compiler refused three places the moment the type landed — one in [[readme]]/compute, two in this atom's own proof. **A gate is stronger than prose because it executes; a type is stronger than a gate because it cannot be run past.**

**Law — [[law]]: each name-token has an API; combinations compose tools. `physicalFtl` computes true|false — it is not prose. Other prose syllables (`honest` · `claim` · `architectural` · `NoCost`) die *as API identifiers*. Host `Math.*` is a violation on algebra atoms ([[algebra]]/host). FTL holds only when measured.**

Composes [[quantum/computer]] · [[quantum/chat]] · [[algebra]] · [[wave/feed]].

<sub>content-uuid `3034a46e-7a63-5c8d-bf4c-934c869f9de6` · account `quantum/ftl` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
