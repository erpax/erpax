---
name: kyc
description: "Use when reasoning about kyc — answers the one question the directive actually asks: **what level of customer due diligence is owed**, given facts someone else established."
atomPath: "agents/mcp/tool/kyc"
coordinate: "agents/mcp/tool/kyc · 4/weave · 266801a8"
contentUuid: "ebc869a0-fab4-5fbf-bf3c-a0017385ab1a"
diamondUuid: "76455d6a-2cea-8c18-8374-e13e573d7b8d"
uuid: "266801a8-8a9a-8b67-9647-0c7077310d71"
horo: 4
typography:
  partition: agents
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "aaee6357-3e3f-89f3-a74d-eb8dcda11b9e"
  stages:
    - stage: path
      stageUuid: "63c2831c-bad2-8108-af2e-72b7b3cbb97c"
    - stage: trinity
      stageUuid: "f0739de5-42a6-86e6-a592-9c4a2f92842a"
    - stage: boundary
      stageUuid: "a6ce1263-4283-8bae-a44e-9bf5e1d9ae3d"
    - stage: links
      stageUuid: "ee0e2a3e-ab0f-810e-9d7c-a722015d5edd"
    - stage: horo
      stageUuid: "942ea9fa-98a5-8fbd-9ed9-2357b78b47d7"
    - stage: seal
      stageUuid: "38f92221-c474-84bd-81f5-9f60974efff5"
    - stage: uuid
      stageUuid: "1ceb7085-09ad-8f2b-a08c-3f72c252c3a7"
version: 2
---
# agents/mcp/tool/kyc — the diligence LEVEL, not a verdict on a person

`erpax.kyc.diligence` answers the one question the directive actually asks: **what level of
customer due diligence is owed**, given facts someone else established. It does not decide whether
a customer is honest, and no argument it accepts could express that.

**Enhanced dominates.** A politically exposed person or a high-risk third country mandates EDD
under Art. 18–24, and no lower-risk finding reduces it — a caller who sends `politicallyExposed`
together with `lowRiskProduct` gets `enhanced`, over the wire exactly as in the atom.

The tool returns **which evidence items are missing**, never a bare verdict: a level with no list
tells the caller they failed without telling them what to do. Completeness is a property of the
item SET — the tool never inspects what an item contains.

**Why this is a child atom and not a line in a barrel.** The tools barrel states the convention in
its own docstring — *each area file matches the `erpax.<area>.*` tool-name prefix* — and
`checkMcpBarrelWired` enforces it by mapping the file name to the namespace. One builder spanning
five namespaces reached none of them, and the gate was right to say so: the name is the message.

**Honest boundary.** Every tool here is a **pure computation over arguments the caller supplies**.
None reads a tenant's rows, so none asserts a tenant — `_guards` is for tools that do, and adding
it where nothing is read would be theatre. And the tool computes what the law OBLIGES given facts
someone else established; it never establishes them.

Composes: [[kyc]] · [[agents/mcp/tool]] · [[rules]]/ask.
