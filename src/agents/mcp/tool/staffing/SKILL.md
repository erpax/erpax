---
name: staffing
description: "Use when reasoning about staffing — folds a declared position into everything it already implied: the job description, the competency gap, the training plan **in the order it must run**, the access capability, and…"
atomPath: "agents/mcp/tool/staffing"
coordinate: "agents/mcp/tool/staffing · 1/base · 83c1f714"
contentUuid: "23bf224c-6f31-55e2-87f2-b3fcb89b4088"
diamondUuid: "1d5bf427-ad70-8c7a-9501-1d07053acfef"
uuid: "83c1f714-8e33-8826-9f70-b6ec8a3b98f8"
horo: 1
typography:
  partition: agents
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "8c14e93a-66f8-8087-a74f-95fb3669de66"
  stages:
    - stage: path
      stageUuid: "22ce2d5e-fbe9-8753-ac2c-59ea1af5b6a4"
    - stage: trinity
      stageUuid: "c82a2216-6925-8e39-a780-73ee10fcb1db"
    - stage: boundary
      stageUuid: "c37ad794-34d0-871a-bda3-fc311003f5c0"
    - stage: links
      stageUuid: "e9c72a04-0a78-8645-8c67-e6e0b1c51a38"
    - stage: horo
      stageUuid: "1a752c7b-0b89-8e11-96e8-6b8c570fc991"
    - stage: seal
      stageUuid: "1d231925-767c-8454-a2c1-a482cd2fc7fd"
    - stage: uuid
      stageUuid: "61a70299-365c-8132-8387-51e8d8e6b2ea"
version: 2
---
# agents/mcp/tool/staffing — two inputs, five faces that were never separate questions

`erpax.staffing.position` folds a declared position into everything it already implied: the job
description, the competency gap, the training plan **in the order it must run**, the access
capability, and the cost at the caller's own anchor rate.

The bank supplies two things — the position and what is required — and everything downstream is
derivation, not a further question. That is [[rules]]/ask applied to an org chart: a field the law,
the tier or the rate determines is not something a human should retype.

**Why this is a child atom and not a line in a barrel.** The tools barrel states the convention in
its own docstring — *each area file matches the `erpax.<area>.*` tool-name prefix* — and
`checkMcpBarrelWired` enforces it by mapping the file name to the namespace. One builder spanning
five namespaces reached none of them, and the gate was right to say so: the name is the message.

**Honest boundary.** Every tool here is a **pure computation over arguments the caller supplies**.
None reads a tenant's rows, so none asserts a tenant — `_guards` is for tools that do, and adding
it where nothing is read would be theatre. And the tool computes what the law OBLIGES given facts
someone else established; it never establishes them.

Composes: [[staffing]] · [[agents/mcp/tool]] · [[rules]]/ask.
