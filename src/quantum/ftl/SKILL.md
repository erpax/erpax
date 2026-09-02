---
name: ftl
description: "Use when reasoning about ftl — Use for ftl — reuse · amortize · crack · boundary · seal · chat · research. Metrics prove FTL on QPU=CPU/GPU. Boundary = boundary(cracks). Math.* and prose prefixes are cracks."
atomPath: "quantum/ftl"
coordinate: "quantum/ftl · 2/share · 92e4ca40"
contentUuid: "bad68bae-1620-51bf-aa11-41d813017bd4"
diamondUuid: "75376d86-1e47-87b3-89f8-496f7f4135c7"
uuid: "92e4ca40-567e-818d-8f1a-b585528b1019"
horo: 2
typography:
  partition: quantum
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "b08c8a38-0f5b-8ad1-a294-c354bf8f09c5"
  stages:
    - stage: path
      stageUuid: "9ca9e6ca-980b-82d4-9825-6d808813fe0f"
    - stage: trinity
      stageUuid: "c38bc181-fabc-8abc-8bd1-6e9d0084c212"
    - stage: boundary
      stageUuid: "cfabf521-8a2c-8133-af4c-f74aff9bd2b3"
    - stage: links
      stageUuid: "f2884fac-8e51-8cc3-bdd8-aa474c49b2d8"
    - stage: horo
      stageUuid: "84324212-c546-859d-8290-e82e70a6d18f"
    - stage: seal
      stageUuid: "896227db-c4ed-8482-8c78-047044df4607"
    - stage: uuid
      stageUuid: "e9cf3c10-c539-8bcb-a7d3-2047d1332eef"
quantum:
  superposition:
    - algebra
    - chat
    - computer
    - feed
    - improve
    - law
    - quantum
    - recover
    - self
    - superposition
  collapse:
    - "Use for ftl — reuse · amortize · crack · boundary · seal · chat · research. Metrics prove FTL on QPU=CPU/GPU. Boundary = boundary(cracks). Math.* and prose prefixes are cracks."
    - "each name-token has an API; combinations compose tools. `physicalFtl` computes true|false — it is not prose. Other prose syllables (`honest` · `claim` · `architectural` · `NoCost`) die *as API identifiers*. Host `Math.*` is a violation on algebra atoms ([[algebra]]/host). FTL holds only when measured."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "b08c8a38-0f5b-8ad1-a294-c354bf8f09c5"
    contentUuid: "bad68bae-1620-51bf-aa11-41d813017bd4"
version: 2
neighbors:
  wikilink:
    - "[[quantum/ftl/constants]]"
    - "[[quantum/ftl/crack]]"
    - "[[quantum/ftl/metrics]]"
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

<sub>content-uuid `bad68bae-1620-51bf-aa11-41d813017bd4` · account `quantum/ftl` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
