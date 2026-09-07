---
name: ftl
description: "Use when reasoning about ftl — Use for ftl — reuse · amortize · crack · boundary · seal · chat · research. Metrics prove FTL on QPU=CPU/GPU. Boundary = boundary(cracks). Math.* and prose prefixes are cracks."
atomPath: "quantum/ftl"
coordinate: "quantum/ftl · 1/base · ad13eef3"
contentUuid: "40d8c880-6a54-5d34-b9e4-81deddfc5e82"
diamondUuid: "b30c0b87-1194-8dfa-bd9d-93572d2f979a"
uuid: "ad13eef3-4dc0-86b2-ae77-c272b1935b2e"
horo: 1
typography:
  partition: quantum
  bondDegree: 49
standards: []
bindings: []
signatures:
  computationUuid: "7b415042-ba85-8012-83f6-5ac0f96aafbf"
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
      stageUuid: "e155ae0c-50ce-8f26-80c0-0ee31adbee3c"
    - stage: seal
      stageUuid: "896227db-c4ed-8482-8c78-047044df4607"
    - stage: uuid
      stageUuid: "943754bc-82eb-820a-8dc6-1332a0c0c085"
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
    computationUuid: "7b415042-ba85-8012-83f6-5ac0f96aafbf"
    contentUuid: "40d8c880-6a54-5d34-b9e4-81deddfc5e82"
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

<sub>content-uuid `40d8c880-6a54-5d34-b9e4-81deddfc5e82` · account `quantum/ftl` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
