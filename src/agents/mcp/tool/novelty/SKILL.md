---
name: novelty
description: "Use when reasoning about novelty — conjecture enumerates crosses between laws the corpus already holds: pairs of atoms that are each widely cited and never drawn together."
atomPath: "agents/mcp/tool/novelty"
coordinate: "agents/mcp/tool/novelty · 1/base · 36c654d3"
contentUuid: "da78c70e-a4ad-53d8-9e13-1a567bd4830e"
diamondUuid: "5bc777cd-9041-8f17-95e4-4b56a38e0c73"
uuid: "36c654d3-66e0-8f2b-a1ff-62d10a6a9ee0"
horo: 1
typography:
  partition: agents
  bondDegree: 9
standards:
  - MCP
  - "MCP 0.6 — tools/list + tools/call result shape {content:[{type,text}]}"
  - "Shannon (1948) — surprise is −log₂ p, in bits"
bindings: []
signatures:
  computationUuid: "f66526f1-7dfe-8a2c-a75d-c5e9fd9b8c24"
  stages:
    - stage: path
      stageUuid: "8aa65608-91b4-82c2-8876-badde15b0b52"
    - stage: trinity
      stageUuid: "689fbca3-15a3-8c1a-8887-1c72b446bfb6"
    - stage: boundary
      stageUuid: "96eabec9-4870-8715-a390-1abd7508f767"
    - stage: links
      stageUuid: "f26c41ea-7e5f-8c45-b635-4d8962960ba9"
    - stage: horo
      stageUuid: "4027637c-0db1-8eb7-b126-ee9349f73d4b"
    - stage: seal
      stageUuid: "015cf91d-29c2-8017-b3bf-092a11507c94"
    - stage: uuid
      stageUuid: "d40d7555-83ba-8f4d-998b-64f136c8572e"
version: 2
---
# agents/mcp/tool/novelty — the combinatorial surface, exposed to the public

[[conjecture]] enumerates crosses between laws the corpus already holds: pairs of atoms that are
each widely cited and never drawn together. The enumeration is mechanical, so it does not need an
agent's judgement to run — which is exactly what makes it safe to hand to the public over MCP.

Two tools, both read-only:

| tool | answers |
| --- | --- |
| `erpax.novelty.crosses` | the ranked cross list, **carrying its own caveat in the payload** |
| `erpax.novelty.measure` | the live count behind one cross, so a rank can be checked rather than believed |

The caveat travels **inside the response**, never only in this page: a prose ranking of crosses was
refuted by measuring it — three of its top picks measured **0** — so a caller who reads the rank
without the caveat reads a number the corpus already knows is unreliable. [[rules]]/refutable's
law applied to an API: a claim shipped without the thing that can contradict it will be believed.

**Honest boundary.** This exposes the enumerator and the measurement, never a decision: a cross
that ranks high is a *candidate for a human*, and neither tool asserts that the law it names exists.
It was nested here from a barrel sibling `novelty.ts` — a matter file at an atom root is a stray
([[rules]]/concentration), and the lawful form is the child atom it already was.

Composes: [[conjecture]] · [[mcp]]/tool · [[rules]]/refutable.
