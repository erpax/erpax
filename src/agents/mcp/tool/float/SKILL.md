---
name: float
description: "Use when reasoning about float — reconciles a counted float — a bank drawer, a casino tray, an armoury, a public till — against its opening balance and its movements."
atomPath: "agents/mcp/tool/float"
coordinate: "agents/mcp/tool/float · 4/weave · 43f653af"
contentUuid: "784df2bf-40c7-52a2-8806-150100b7eb57"
diamondUuid: "633ee010-bb4e-8873-b285-4b1a2f8e46f1"
uuid: "43f653af-2101-8e3a-b345-7099e409aaf5"
horo: 4
typography:
  partition: agents
  bondDegree: 36
standards: []
bindings: []
signatures:
  computationUuid: "78f7b273-c7c1-81c8-b35b-60873648f0b8"
  stages:
    - stage: path
      stageUuid: "2d04e087-c75f-8d1f-941e-90e5c99998a5"
    - stage: trinity
      stageUuid: "0caa28f9-fa50-8df4-bd94-3665e3f346bd"
    - stage: boundary
      stageUuid: "3e065fcb-4a7f-85f7-99bf-d0e24b2201b6"
    - stage: links
      stageUuid: "aac03c76-44ba-8e71-8391-6cc45f889e59"
    - stage: horo
      stageUuid: "f6c1479e-3565-8a1a-aada-65d2912d972c"
    - stage: seal
      stageUuid: "d188bfc7-0047-8bf2-8933-d8d4f1de41f3"
    - stage: uuid
      stageUuid: "ca649eb1-258d-8189-abfe-fa9c2ef00a1d"
version: 2
---
# agents/mcp/tool/float — the total is DERIVED from a count, and cannot be supplied

`erpax.float.reconcile` reconciles a counted float — a bank drawer, a casino tray, an armoury, a
public till — against its opening balance and its movements.

**There is deliberately no `total` parameter.** A caller who can state a total can state the one
that balances, and the count stops being evidence. The total is derived from the count of units,
and the tool's own test asserts the absence of that parameter.

An **illegal unit voids the count even when the arithmetic is right**: a 25-euro note in a till that
holds no such denomination is a finding, not a rounding. Variance is signed, because an over and a
short are different findings with different cures.

**Why this is a child atom and not a line in a barrel.** The tools barrel states the convention in
its own docstring — *each area file matches the `erpax.<area>.*` tool-name prefix* — and
`checkMcpBarrelWired` enforces it by mapping the file name to the namespace. One builder spanning
five namespaces reached none of them, and the gate was right to say so: the name is the message.

**Honest boundary.** Every tool here is a **pure computation over arguments the caller supplies**.
None reads a tenant's rows, so none asserts a tenant — `_guards` is for tools that do, and adding
it where nothing is read would be theatre. And the tool computes what the law OBLIGES given facts
someone else established; it never establishes them.

Composes: [[float]] · [[agents/mcp/tool]] · [[rules]]/ask.
