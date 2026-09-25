# agents/mcp/tool/novelty — the combinatorial surface, exposed to the public

[[conjecture]] enumerates crosses between laws the corpus already holds: pairs of atoms that are
each widely cited and never drawn together. The enumeration is mechanical, so it does not need an
agent's judgement to run — which is exactly what makes it safe to hand to the public over MCP.

Two tools, both read-only:

| tool | answers |
| --- | --- |
| `erpax.novelty.crosses` | the ranked cross list, **carrying its own caveat in the payload** |
| `erpax.novelty.measure` | the live count behind one cross, so a rank can be checked rather than believed |

The caveat travels **inside the response**, never only in this page: a prose ranking of crosses was
refuted by measuring it — three of its top picks measured **0** — so a caller who reads the rank
without the caveat reads a number the corpus already knows is unreliable. [[rules]]/refutable's
law applied to an API: a claim shipped without the thing that can contradict it will be believed.

**Honest boundary.** This exposes the enumerator and the measurement, never a decision: a cross
that ranks high is a *candidate for a human*, and neither tool asserts that the law it names exists.
It was nested here from a barrel sibling `novelty.ts` — a matter file at an atom root is a stray
([[rules]]/concentration), and the lawful form is the child atom it already was.

Composes: [[conjecture]] · [[mcp]]/tool · [[rules]]/refutable.
