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
