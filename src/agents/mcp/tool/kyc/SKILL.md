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
