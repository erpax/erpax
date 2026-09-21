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
