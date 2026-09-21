---
name: aml
description: "Use when reasoning about aml — classifies a set of movements as **suspicious · threshold · none** (EU 2015/849 Art. 33)."
atomPath: "agents/mcp/tool/aml"
coordinate: "agents/mcp/tool/aml · 1/base · d1d9f91c"
contentUuid: "8c9b923c-d39d-5810-b875-eb1839a118fc"
diamondUuid: "6a9e7485-12f9-88f0-917f-e7290676db6a"
uuid: "d1d9f91c-9318-8ba5-a2fc-3f36127731f1"
horo: 1
typography:
  partition: agents
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "fbf74819-145b-8909-9559-17b789fac949"
  stages:
    - stage: path
      stageUuid: "e71144c1-bccc-8c6b-b577-3f0be94e698f"
    - stage: trinity
      stageUuid: "3216bc0a-5833-8d10-93d6-9e2f92f87d4a"
    - stage: boundary
      stageUuid: "d8c4d62e-9cfc-8f0a-b244-bf31a36b86e3"
    - stage: links
      stageUuid: "9911cefe-c5b4-868e-a097-6f496de56936"
    - stage: horo
      stageUuid: "fd2e09d4-d006-8eb6-b4d8-357576614e29"
    - stage: seal
      stageUuid: "26de185c-498c-8efa-8e74-5d7ee025c382"
    - stage: uuid
      stageUuid: "eb451cb0-08b9-89b6-91cc-5aecd11bdbe8"
version: 2
---
# agents/mcp/tool/aml — whether a report is OWED, never whether money is clean

`erpax.aml.report` classifies a set of movements as **suspicious · threshold · none** (EU 2015/849
Art. 33). Laundering is an offence a court finds; a report is an obligation a rule triggers, and
only the second is decidable from declared facts.

**A `none` verdict travels with its boundary attached.** The handler puts the sentence *"No trigger
fired. This is NOT a finding that the movements are clean"* in the response body, because an MCP
caller does not read a SKILL and a bare `none` reads as an all-clear.

Structuring — movements just below a threshold, inside one window, together clearing it — is
classed **suspicious rather than threshold**, and the tool reports `holdBeforeExecuting` beside it,
which is the Art. 33 obligation to hold where possible.

**Why this is a child atom and not a line in a barrel.** The tools barrel states the convention in
its own docstring — *each area file matches the `erpax.<area>.*` tool-name prefix* — and
`checkMcpBarrelWired` enforces it by mapping the file name to the namespace. One builder spanning
five namespaces reached none of them, and the gate was right to say so: the name is the message.

**Honest boundary.** Every tool here is a **pure computation over arguments the caller supplies**.
None reads a tenant's rows, so none asserts a tenant — `_guards` is for tools that do, and adding
it where nothing is read would be theatre. And the tool computes what the law OBLIGES given facts
someone else established; it never establishes them.

Composes: [[aml]] · [[agents/mcp/tool]] · [[rules]]/ask.
