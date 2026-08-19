---
name: bg
description: "Use for the two Bulgarian rails erpax actually codes against — БНБ daily exchange rates (CODE/RATIO/RATE XML) and Търговски Регистър company lookup (name/status JSON). Contracts pin what the client parses; both live endpoints have since moved, which is the finding this layer exists to surface."
atomPath: outward/bg
---

# outward/bg — the two Bulgarian rails, contracted

Both declare `clientImplemented: true` in [[country]]/api, so both are promises that
erpax parses their answers — and both were **unproven** until now
([[outward]]/coverage).

| rail | what the client parses | live state 2026-08-19 |
| --- | --- | --- |
| БНБ | `CODE` · `RATIO` · `RATE` from `StERFCDownload.aspx?download=xml` | **serves HTML, not XML** |
| TR | `name` · `status` from `/api/public/companies/{eik}` | **HTTP 404** |

## Both integrations are broken in production

That is the finding. `bgBnbRate()` regexes XML elements out of what is now an HTML
page, and the TR lookup calls a path that no longer exists. Neither failure was
visible before, because nothing ever asked.

So the fixtures here are **reconstructed from the parser's expectation, not captured**
— each says so in its own header — and `covered` means the parser now has a
**refutable specification**, *not* that the integration works. The offline contract
pins what erpax was built to read; the online lane reports that the world stopped
sending it. Keeping those two claims separate is the entire point ([[outward]]).

**Honest boundary.** A reconstructed fixture is weaker evidence than a captured one:
it proves the parser is self-consistent with what the code believes, and cannot prove
that belief ever matched the authority. When either endpoint is rediscovered, the
fixture should be **replaced with a real capture** and this note deleted.

**Law — [[law]]: a contract pins what the client parses; only a capture proves the
world ever sent it. Never let the first stand in for the second.**

Composes: [[outward]] · [[country]] · [[currency]].
