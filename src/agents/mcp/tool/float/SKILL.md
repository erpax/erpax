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
