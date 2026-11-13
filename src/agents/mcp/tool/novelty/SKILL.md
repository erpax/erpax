---
name: novelty
description: "Use when reasoning about novelty — conjecture enumerates crosses between laws the corpus already holds: pairs of atoms that are each widely cited and never drawn together."
atomPath: "agents/mcp/tool/novelty"
coordinate: "agents/mcp/tool/novelty · 7/descent · 2b24e1b2"
contentUuid: "df6632b6-3d21-5703-9f63-ad7d0fa191f7"
diamondUuid: "572a9739-ef40-811e-87bc-c84cfe700da3"
uuid: "2b24e1b2-abb7-84bb-a446-c08eee251f9f"
horo: 7
typography:
  partition: agents
  bondDegree: 6
standards:
  - MCP
  - "MCP 0.6 — tools/list + tools/call result shape {content:[{type,text}]}"
  - "Shannon (1948) — surprise is −log₂ p, in bits"
bindings: []
signatures:
  computationUuid: "e8f0cdc4-7d8e-8803-87cd-900a3d3ac2a8"
  stages:
    - stage: path
      stageUuid: "8aa65608-91b4-82c2-8876-badde15b0b52"
    - stage: trinity
      stageUuid: "689fbca3-15a3-8c1a-8887-1c72b446bfb6"
    - stage: boundary
      stageUuid: "0877f191-374d-8bf5-aa99-224d192abea6"
    - stage: links
      stageUuid: "16c0c1ad-a1a4-8c6f-82d5-8ce1606eddbb"
    - stage: horo
      stageUuid: "e727ac73-450c-8f26-bc2c-527a935bd496"
    - stage: seal
      stageUuid: "015cf91d-29c2-8017-b3bf-092a11507c94"
    - stage: uuid
      stageUuid: "852f53da-6539-8ac2-be7a-d9e9e3f9c627"
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

Composes: [[conjecture]] · mcp/tool · [[rules]]/refutable.
