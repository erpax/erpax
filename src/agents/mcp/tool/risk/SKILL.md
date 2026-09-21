---
name: risk
description: "Use when reasoning about risk — measures large exposures against Tier 1 capital (CRR Art. 392/395)."
atomPath: "agents/mcp/tool/risk"
coordinate: "agents/mcp/tool/risk · 4/weave · f5b0ebac"
contentUuid: "b743832f-3032-5f78-84fe-d56d9daccd5a"
diamondUuid: "f2e40df9-ec06-8b99-814e-0239b6279cd2"
uuid: "f5b0ebac-1400-8562-b5ab-f6376a17e0fb"
horo: 4
typography:
  partition: agents
  bondDegree: 73
standards: []
bindings: []
signatures:
  computationUuid: "c349697e-895e-8e8a-9e26-4371465aead4"
  stages:
    - stage: path
      stageUuid: "b02c8749-6320-8ea9-8e7a-af0f39d4c5f4"
    - stage: trinity
      stageUuid: "1bd72922-4dc5-83d1-bcf4-265dc6e8e511"
    - stage: boundary
      stageUuid: "8152a232-1a9e-8f03-bcac-e719f54b2523"
    - stage: links
      stageUuid: "3654fc63-2e94-8da0-a03c-ec00e1e2d46a"
    - stage: horo
      stageUuid: "80800df7-884b-8a14-b5f0-becdc9302ab1"
    - stage: seal
      stageUuid: "02bc03f9-49a9-84e1-b48d-427b173f55b6"
    - stage: uuid
      stageUuid: "6d2fcc60-6a83-8f85-9e44-2036817ffe66"
version: 2
---
# agents/mcp/tool/risk — aggregated by connected client BEFORE the limit is tested

`erpax.risk.concentration` measures large exposures against Tier 1 capital (CRR Art. 392/395).

**The aggregation is the tool.** A borrower split across three names sits under the limit while the
real exposure sits over it, so exposures are grouped by connected client *before* the test — which
is what Art. 4(1)(39) means by a group of connected clients, and what a per-name check misses.

`large` (report) and `breach` (cure) come back as separate lists, because they oblige different
things and collapsing them loses which one the caller is in.

**Why this is a child atom and not a line in a barrel.** The tools barrel states the convention in
its own docstring — *each area file matches the `erpax.<area>.*` tool-name prefix* — and
`checkMcpBarrelWired` enforces it by mapping the file name to the namespace. One builder spanning
five namespaces reached none of them, and the gate was right to say so: the name is the message.

**Honest boundary.** Every tool here is a **pure computation over arguments the caller supplies**.
None reads a tenant's rows, so none asserts a tenant — `_guards` is for tools that do, and adding
it where nothing is read would be theatre. And the tool computes what the law OBLIGES given facts
someone else established; it never establishes them.

Composes: [[risk]] · [[agents/mcp/tool]] · [[rules]]/ask.
