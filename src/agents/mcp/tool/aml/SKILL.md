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
